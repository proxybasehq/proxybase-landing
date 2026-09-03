import { HDNodeWallet, Wallet, Mnemonic } from "ethers";

/* ── Wallet derivation ─────────────────────────────────────────────────── */

function fromEthersSigner(signer, extra) {
  return {
    address: signer.address.toLowerCase(),
    publicKeyHex: signer.signingKey.publicKey, // 0x04 || x || y (uncompressed SEC1)
    privateKeyHex: signer.privateKey,
    signingKey: signer.signingKey,
    ...extra,
  };
}

export function mnemonicToWallet(phrase) {
  const hd = HDNodeWallet.fromPhrase(String(phrase).trim());
  return fromEthersSigner(hd, { kind: "mnemonic", mnemonic: hd.mnemonic.phrase });
}

export function privateKeyToWallet(pkHex) {
  const wallet = new Wallet(pkHex);
  return fromEthersSigner(wallet, { kind: "private_key" });
}

export function generateMnemonic(wordCount = 12) {
  const count = wordCount === 24 ? 24 : 12;
  const entropy = new Uint8Array(count === 24 ? 32 : 16);
  crypto.getRandomValues(entropy);
  return Mnemonic.fromEntropy(entropy).phrase;
}

export function isValidMnemonic(phrase) {
  try {
    Mnemonic.fromPhrase(String(phrase).trim());
    return true;
  } catch {
    return false;
  }
}

export function isValidPrivateKey(pkHex) {
  const pk = String(pkHex || "").trim();
  if (!/^(0x)?[0-9a-fA-F]{64}$/.test(pk)) return false;
  try {
    new Wallet(pk);
    return true;
  } catch {
    return false;
  }
}

/* ── v2 auth challenge signing ─────────────────────────────────────────── */

const SECP256K1_N = BigInt("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141");

function toBigInt(value) {
  return typeof value === "bigint" ? value : BigInt(value);
}

// The backend's k256 is built with the sha256 feature (transitively via its
// default schnorr feature), so its ECDSA DigestPrimitive is SHA-256: the
// verified message is ECDSA over sha256("{addr}:{nonce}:{ts}"). The signature
// must be the raw fixed 64-byte r||s encoding (k256 Signature::to_vec()).
// (The wallet_auth.rs doc comment mentions keccak256 but the implementation
// hashes with the curve's default digest, which is SHA-256 in this build.)
export async function signChallenge(wallet, nonce, timestamp) {
  const message = `${wallet.address}:${nonce}:${timestamp}`;
  const digest = new Uint8Array(
    await crypto.subtle.digest("SHA-256", new TextEncoder().encode(message))
  );
  const sig = wallet.signingKey.sign(digest);
  let r = toBigInt(sig.r);
  let s = toBigInt(sig.s);
  // k256 rejects high-s signatures — normalize defensively.
  if (s > SECP256K1_N / 2n) s = SECP256K1_N - s;
  const rHex = r.toString(16).padStart(64, "0");
  const sHex = s.toString(16).padStart(64, "0");
  return "0x" + rHex + sHex;
}

/* ── Keystore serialization ────────────────────────────────────────────── */

export function keystoreToJson(wallet) {
  return JSON.stringify(
    wallet.kind === "mnemonic"
      ? { kind: "mnemonic", mnemonic: wallet.mnemonic }
      : { kind: "private_key", private_key: wallet.privateKeyHex }
  );
}

// Returns the wallet + the canonical keystore JSON for storage.
export function keystoreFromInput(input) {
  const text = String(input || "").trim();
  if (isValidPrivateKey(text)) {
    const wallet = privateKeyToWallet(text);
    return { wallet, keystoreJson: keystoreToJson(wallet) };
  }
  if (isValidMnemonic(text)) {
    const wallet = mnemonicToWallet(text);
    return { wallet, keystoreJson: keystoreToJson(wallet) };
  }
  throw new Error(
    "Not a valid 12/24-word recovery phrase or 64-char hex private key"
  );
}

export function walletFromKeystore(keystoreText) {
  let parsed;
  try {
    parsed = JSON.parse(keystoreText);
  } catch {
    parsed = null;
  }
  if (parsed && parsed.kind === "mnemonic") return mnemonicToWallet(parsed.mnemonic);
  if (parsed && parsed.kind === "private_key") return privateKeyToWallet(parsed.private_key);
  // Legacy: raw secret string
  return keystoreFromInput(keystoreText).wallet;
}

export function isPasswordEncryptedKeystore(keystoreText) {
  try {
    const parsed = JSON.parse(keystoreText);
    return Boolean(parsed && parsed.mode === "password");
  } catch {
    return false;
  }
}

/* ── Client-side password encryption (optional import protection) ──────── */

const PBKDF2_ITERATIONS = 310000;

function b64(bytes) {
  return Buffer.from(bytes).toString("base64");
}

function unb64(str) {
  return new Uint8Array(Buffer.from(str, "base64"));
}

export async function encryptWithPassword(plaintext, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );
  const ct = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(plaintext)
  );
  return JSON.stringify({
    mode: "password",
    v: 1,
    kdf: { name: "PBKDF2", salt: b64(salt), iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    alg: "AES-GCM",
    iv: b64(iv),
    ct: b64(new Uint8Array(ct)),
  });
}

export async function decryptWithPassword(blob, password) {
  const parsed = JSON.parse(blob);
  if (parsed.mode !== "password" || parsed.alg !== "AES-GCM") {
    throw new Error("Unsupported keystore encryption");
  }
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: unb64(parsed.kdf.salt),
      iterations: parsed.kdf.iterations,
      hash: parsed.kdf.hash,
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
  const pt = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: unb64(parsed.iv) },
    key,
    unb64(parsed.ct)
  );
  return new TextDecoder().decode(pt);
}

/* ── Formatting helpers ────────────────────────────────────────────────── */

export function microcreditsToUsd(mc) {
  const n = Number(mc || 0);
  return n / 1_000_000;
}

export function usdToMicrocredits(usd) {
  return Math.round(Number(usd || 0) * 1_000_000);
}

export function formatUsd(usd) {
  const n = Number(usd || 0);
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export function formatMicrocredits(mc) {
  return `${Number(mc || 0).toLocaleString("en-US")} µ$`;
}

export function formatBytes(bytes) {
  const n = Number(bytes || 0);
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 * 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(2)} MB`;
  return `${(n / (1024 * 1024 * 1024)).toFixed(3)} GB`;
}

export function shortAddress(address) {
  const a = String(address || "");
  return a.length > 12 ? `${a.slice(0, 6)}…${a.slice(-4)}` : a;
}

export function countryFlag(countryCode) {
  const cc = String(countryCode || "").toUpperCase();
  if (cc === "UNKNOWN") return "❓";
  if (cc === "WORLDWIDE" || !/^[A-Z]{2}$/.test(cc)) return "🌐";
  return String.fromCodePoint(...[...cc].map((c) => 127397 + c.charCodeAt(0)));
}
