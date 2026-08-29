import { NextResponse } from "next/server";
import net from "net";
import tls from "tls";
import dns from "dns/promises";

const TARGET_HOST = "api.ipify.org";
const TARGET_PATH = "/?format=json";
const TIMEOUT_MS = 10000;

const HOST_RE = /^[a-zA-Z0-9.\-:[\]]+$/;

function fail(socket, message) {
  if (socket) socket.destroy();
  return { ok: false, error: message };
}

function readBytes(socket, n, timeoutMs) {
  return new Promise((resolve, reject) => {
    let buffer = Buffer.alloc(0);
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error("Proxy did not respond in time"));
    }, timeoutMs);
    const onData = (chunk) => {
      buffer = Buffer.concat([buffer, chunk]);
      if (buffer.length >= n) {
        cleanup();
        resolve({ head: buffer.subarray(0, n), rest: buffer.subarray(n) });
      }
    };
    const onError = (err) => {
      cleanup();
      reject(err);
    };
    const onClose = () => {
      cleanup();
      reject(new Error("Proxy closed the connection during handshake"));
    };
    function cleanup() {
      clearTimeout(timer);
      socket.off("data", onData);
      socket.off("error", onError);
      socket.off("close", onClose);
    }
    socket.on("data", onData);
    socket.on("error", onError);
    socket.on("close", onClose);
  });
}

function openTcp(host, port, timeoutMs) {
  return new Promise((resolve, reject) => {
    const socket = net.connect({ host, port });
    const timer = setTimeout(() => {
      socket.destroy();
      reject(new Error("Could not reach the proxy host"));
    }, timeoutMs);
    socket.once("connect", () => {
      clearTimeout(timer);
      resolve(socket);
    });
    socket.once("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

function httpsOver(socket, timeoutMs) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      socket.destroy();
      reject(new Error("Request through the proxy timed out"));
    }, timeoutMs);
    const tlsSocket = tls.connect(
      { socket, servername: TARGET_HOST },
      () => {
        tlsSocket.write(
          `GET ${TARGET_PATH} HTTP/1.1\r\nHost: ${TARGET_HOST}\r\nConnection: close\r\nUser-Agent: proxybase-proxy-checker/1.0\r\n\r\n`
        );
      }
    );
    let body = "";
    tlsSocket.on("data", (chunk) => {
      body += chunk.toString("utf8");
    });
    tlsSocket.on("end", () => {
      clearTimeout(timer);
      const jsonStart = body.indexOf("{");
      if (jsonStart === -1) {
        reject(new Error("Echo service returned no data"));
        return;
      }
      try {
        const parsed = JSON.parse(body.slice(jsonStart, body.lastIndexOf("}") + 1));
        if (parsed.ip) resolve(parsed.ip);
        else reject(new Error("Echo service returned no IP"));
      } catch {
        reject(new Error("Could not parse echo response"));
      }
    });
    tlsSocket.on("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

async function checkSocks5(host, port, username, password, destIp) {
  const socket = await openTcp(host, port, TIMEOUT_MS);
  try {
    const methods = username ? [0x02] : [0x00, 0x02];
    socket.write(Buffer.from([0x05, methods.length, ...methods]));

    const greet = await readBytes(socket, 2, TIMEOUT_MS);
    if (greet.head[0] !== 0x05) throw new Error("Not a SOCKS5 proxy");
    const method = greet.head[1];

    if (method === 0x02) {
      const userBuf = Buffer.from(username || "", "utf8");
      const passBuf = Buffer.from(password || "", "utf8");
      socket.write(
        Buffer.concat([
          Buffer.from([0x01, userBuf.length]),
          userBuf,
          Buffer.from([passBuf.length]),
          passBuf,
        ])
      );
      const auth = await readBytes(socket, 2, TIMEOUT_MS);
      if (auth.head[1] !== 0x00) throw new Error("Proxy authentication rejected");
    } else if (method === 0xff) {
      throw new Error("Proxy rejected all authentication methods");
    } else if (method !== 0x00) {
      throw new Error(`Unsupported SOCKS5 auth method: 0x${method.toString(16)}`);
    }

    const ipParts = destIp.split(".").map(Number);
    const portBuf = Buffer.alloc(2);
    portBuf.writeUInt16BE(443);
    socket.write(
      Buffer.concat([
        Buffer.from([0x05, 0x01, 0x00, 0x01]),
        Buffer.from(ipParts),
        portBuf,
      ])
    );

    const reply = await readBytes(socket, 10, TIMEOUT_MS);
    if (reply.head[1] !== 0x00) {
      const codes = {
        0x01: "general SOCKS server failure",
        0x02: "connection not allowed",
        0x03: "network unreachable",
        0x04: "host unreachable",
        0x05: "connection refused",
        0x06: "TTL expired",
        0x07: "command not supported",
        0x08: "address type not supported",
      };
      throw new Error(`SOCKS5 CONNECT failed: ${codes[reply.head[1]] || "unknown error"}`);
    }

    if (reply.rest.length > 0) socket.unshift(reply.rest);
    return await httpsOver(socket, TIMEOUT_MS);
  } catch (err) {
    socket.destroy();
    throw err;
  }
}

async function checkHttpProxy(host, port, username, password) {
  const socket = await openTcp(host, port, TIMEOUT_MS);
  try {
    let connectReq = `CONNECT ${TARGET_HOST}:443 HTTP/1.1\r\nHost: ${TARGET_HOST}:443\r\n`;
    if (username) {
      connectReq += `Proxy-Authorization: Basic ${Buffer.from(`${username}:${password || ""}`).toString("base64")}\r\n`;
    }
    connectReq += "\r\n";
    socket.write(connectReq);

    const reply = await readBytes(socket, 12, TIMEOUT_MS);
    const statusLine = reply.head.toString("latin1");
    if (!/^HTTP\/1\.[01] 200/.test(statusLine)) {
      throw new Error(`HTTP proxy CONNECT rejected (${statusLine.trim()})`);
    }

    let buffer = reply.rest;
    const headerEnd = () => buffer.indexOf("\r\n\r\n");
    while (headerEnd() === -1) {
      const more = await readBytes(socket, 1, TIMEOUT_MS);
      buffer = Buffer.concat([buffer, more.head, more.rest]);
    }
    const extra = buffer.subarray(headerEnd() + 4);
    if (extra.length > 0) socket.unshift(extra);

    return await httpsOver(socket, TIMEOUT_MS);
  } catch (err) {
    socket.destroy();
    throw err;
  }
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const { type = "socks5", host, port, username = "", password = "" } = body;

  if (!host || typeof host !== "string" || !HOST_RE.test(host)) {
    return NextResponse.json({ ok: false, error: "Invalid proxy host" }, { status: 400 });
  }
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    return NextResponse.json({ ok: false, error: "Invalid proxy port" }, { status: 400 });
  }
  if (typeof username !== "string" || username.length > 255 || typeof password !== "string" || password.length > 255) {
    return NextResponse.json({ ok: false, error: "Invalid proxy credentials" }, { status: 400 });
  }
  if (type !== "socks5" && type !== "http") {
    return NextResponse.json({ ok: false, error: "Unsupported proxy type" }, { status: 400 });
  }

  const started = Date.now();
  try {
    const destIp = (await dns.lookup(TARGET_HOST, { family: 4 })).address;
    const exitIp =
      type === "socks5"
        ? await checkSocks5(host, port, username, password, destIp)
        : await checkHttpProxy(host, port, username, password);
    return NextResponse.json({
      ok: true,
      exitIp,
      latencyMs: Date.now() - started,
    });
  } catch (err) {
    return NextResponse.json({
      ok: false,
      error: err?.message || "Proxy check failed",
      latencyMs: Date.now() - started,
    });
  }
}
