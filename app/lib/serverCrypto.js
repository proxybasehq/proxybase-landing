import crypto from "crypto";

const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function secretKey() {
  const secret = process.env.PB_AUTH_SECRET;
  if (secret && secret.length > 0) {
    return crypto.createHash("sha256").update(secret).digest();
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error("PB_AUTH_SECRET environment variable is required in production");
  }
  return crypto.createHash("sha256").update("proxybase-dev-insecure-secret").digest();
}

export function encryptString(plaintext) {
  const key = secretKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const ct = Buffer.concat([cipher.update(String(plaintext), "utf8"), cipher.final()]);
  return JSON.stringify({
    v: 1,
    alg: "aes-256-gcm",
    iv: iv.toString("base64"),
    tag: cipher.getAuthTag().toString("base64"),
    ct: ct.toString("base64"),
  });
}

export function decryptString(blob) {
  let parsed;
  try {
    parsed = JSON.parse(blob);
  } catch {
    throw new Error("Malformed keystore blob");
  }
  if (!parsed || parsed.v !== 1 || parsed.alg !== "aes-256-gcm") {
    throw new Error("Unsupported keystore format");
  }
  const key = secretKey();
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, Buffer.from(parsed.iv, "base64"));
  decipher.setAuthTag(Buffer.from(parsed.tag, "base64"));
  const pt = Buffer.concat([
    decipher.update(Buffer.from(parsed.ct, "base64")),
    decipher.final(),
  ]);
  return pt.toString("utf8");
}

export function createSessionCookie(claims) {
  const payload = { ...claims, exp: Date.now() + SESSION_TTL_MS };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto
    .createHmac("sha256", secretKey())
    .update(body)
    .digest("base64url");
  return `${body}.${sig}`;
}

export function parseSessionCookie(value) {
  if (!value || typeof value !== "string") return null;
  const dot = value.lastIndexOf(".");
  if (dot <= 0) return null;
  const body = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  const expected = crypto
    .createHmac("sha256", secretKey())
    .update(body)
    .digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE = "pb_session";
export { SESSION_TTL_MS };
