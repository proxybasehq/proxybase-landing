"use client";

import { useState } from "react";
import { socks5ConnectionString } from "../lib/v2Client";
import { CopyButton, Segmented } from "./ui";

function buildConnection({ gateway, sessionId, token }) {
  const [host, port = "1082"] = String(gateway || "api.proxybase.xyz:1082").split(":");
  return {
    host,
    port,
    username: sessionId,
    password: token,
    uri: socks5ConnectionString({ gateway, sessionId, token }),
  };
}

function curlSnippet(c) {
  return [
    "# Test your proxy — exit IP via the tunnel",
    `curl -x socks5h://${c.username}:${c.password}@${c.host}:${c.port} \\`,
    `  https://api.ipify.org?format=json`,
  ].join("\n");
}

function pythonSnippet(c) {
  return [
    "# pip install requests[socks]",
    "import requests",
    "",
    "proxies = {",
    "    \"http\": \"socks5h://\" + USER + \":\" + PASS + \"@HOST:PORT\",",
    "    \"https\": \"socks5h://\" + USER + \":\" + PASS + \"@HOST:PORT\",",
    "}",
    "",
    "resp = requests.get(\"https://api.ipify.org?format=json\", proxies=proxies)",
    "print(resp.json())",
  ].join("\n");
}

function nodeSnippet(c) {
  return [
    "// npm install socks-proxy-agent",
    "import { SocksProxyAgent } from \"socks-proxy-agent\";",
    "",
    `const agent = new SocksProxyAgent(\`socks5://${c.username}:${c.password}@${c.host}:${c.port}\`);`,
    "",
    "const resp = await fetch(\"https://api.ipify.org?format=json\", { agent });",
    "console.log(await resp.json());",
  ].join("\n");
}

function goSnippet(c) {
  return [
    "// go get golang.org/x/net/proxy",
    "package main",
    "",
    "import (",
    "    \"fmt\"",
    "    \"io\"",
    "    \"net/http\"",
    "    \"golang.org/x/net/proxy\"",
    ")",
    "",
    "func main() {",
    `    auth := &proxy.Auth{User: "${c.username}", Password: "${c.password}"}`,
    `    dialer, _ := proxy.SOCKS5("tcp", "${c.host}:${c.port}", auth, proxy.Direct)`,
    "    client := &http.Client{Transport: &http.Transport{Dial: dialer.Dial}}",
    `    resp, _ := client.Get("https://api.ipify.org?format=json")`,
    "    defer resp.Body.Close()",
    "    body, _ := io.ReadAll(resp.Body)",
    "    fmt.Println(string(body))",
    "}",
  ].join("\n");
}

function rustSnippet(c) {
  return [
    "// cargo add tokio-socks reqwest",
    "use tokio_socks::tcp::Socks5Stream;",
    "use tokio::io::AsyncWriteExt;",
    "",
    "#[tokio::main]",
    "async fn main() -> Result<(), Box<dyn std::error::Error>> {",
    `    let target = ("${c.host}", ${c.port}).into();`,
    `    let mut sock = Socks5Stream::connect_with_password(target, "api.ipify.org:80", "${c.username}", "${c.password}").await?;`,
    `    sock.write_all(b"GET /?format=json HTTP/1.1\\r\\nHost: api.ipify.org\\r\\nConnection: close\\r\\n\\r\\n").await?;`,
    "    Ok(())",
    "}",
  ].join("\n");
}

function envSnippet(c) {
  return [
    "# OpenClaw / agent proxy environment (.proxy-env)",
    `export SOCKS5_HOST="${c.host}"`,
    `export SOCKS5_PORT="${c.port}"`,
    `export SOCKS5_USER="${c.username}"`,
    `export SOCKS5_PASS="${c.password}"`,
    `export SOCKS5_URI="${c.uri}"`,
  ].join("\n");
}

function skillJson(c) {
  return JSON.stringify(
    {
      proxy: {
        type: "socks5",
        host: c.host,
        port: Number(c.port),
        username: c.username,
        password: c.password,
        uri: c.uri,
      },
    },
    null,
    2
  );
}

const SNIPPET_TABS = [
  { value: "curl", label: "cURL" },
  { value: "python", label: "Python" },
  { value: "node", label: "Node.js" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "env", label: "OpenClaw env" },
  { value: "json", label: "JSON" },
];

export default function Snippets({ gateway, sessionId, token }) {
  const [tab, setTab] = useState("curl");
  const c = buildConnection({ gateway, sessionId, token });

  const snippets = {
    curl: curlSnippet(c),
    python: pythonSnippet(c),
    node: nodeSnippet(c),
    go: goSnippet(c),
    rust: rustSnippet(c),
    env: envSnippet(c),
    json: skillJson(c),
  };

  return (
    <div className="console-snippets">
      <Segmented options={SNIPPET_TABS} value={tab} onChange={setTab} />
      <div className="console-codeblock">
        <div className="console-codeblock-head">
          <span>{SNIPPET_TABS.find((t) => t.value === tab)?.label}</span>
          <CopyButton text={snippets[tab]} label="Copy snippet" />
        </div>
        <pre className="console-codeblock-pre">{snippets[tab]}</pre>
      </div>
    </div>
  );
}
