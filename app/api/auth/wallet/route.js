import { NextResponse } from "next/server";
import { parseSessionCookie, SESSION_COOKIE, encryptString, decryptString } from "../../../lib/serverCrypto";
import { getUserByGoogleId, saveUserWallet, deleteUserWallet } from "../../../lib/userStore";

const ADDRESS_RE = /^0x[0-9a-f]{40}$/;
const PUBKEY_RE = /^0x04[0-9a-fA-F]{128}$/;
const MAX_KEYSTORE_BYTES = 64 * 1024;

function currentUser(req) {
  return parseSessionCookie(req.cookies.get(SESSION_COOKIE)?.value);
}

export async function POST(req) {
  const claims = currentUser(req);
  if (!claims) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const action = body.action;

  if (action === "load") {
    const row = await getUserByGoogleId(claims.google_id);
    if (!row) {
      return NextResponse.json({ found: false });
    }
    try {
      const keystore = decryptString(row.encrypted_keystore);
      return NextResponse.json({
        found: true,
        wallet: {
          wallet_address: row.wallet_address,
          public_key_hex: row.public_key_hex,
          keystore,
          created_at: row.created_at,
          updated_at: row.updated_at,
        },
      });
    } catch (err) {
      return NextResponse.json(
        { error: `Failed to decrypt stored wallet: ${err.message}` },
        { status: 500 }
      );
    }
  }

  if (action === "save") {
    const wallet = body.wallet;
    if (!wallet || typeof wallet !== "object") {
      return NextResponse.json({ error: "Missing wallet payload" }, { status: 400 });
    }
    const address = String(wallet.wallet_address || "").toLowerCase();
    const pubkey = String(wallet.public_key_hex || "");
    const keystore = wallet.keystore;
    if (!ADDRESS_RE.test(address)) {
      return NextResponse.json({ error: "Invalid wallet address" }, { status: 400 });
    }
    if (!PUBKEY_RE.test(pubkey)) {
      return NextResponse.json({ error: "Invalid public key (expected 0x04 + 128 hex chars)" }, { status: 400 });
    }
    if (typeof keystore !== "string" || keystore.length === 0) {
      return NextResponse.json({ error: "Missing keystore payload" }, { status: 400 });
    }
    if (Buffer.byteLength(keystore, "utf8") > MAX_KEYSTORE_BYTES) {
      return NextResponse.json({ error: "Keystore payload too large" }, { status: 400 });
    }

    try {
      await saveUserWallet({
        google_id: claims.google_id,
        email: claims.email || "",
        name: claims.name || "",
        avatar: claims.avatar || null,
        wallet_address: address,
        encrypted_keystore: encryptString(keystore),
        public_key_hex: pubkey,
      });
    } catch (err) {
      return NextResponse.json(
        { error: `Failed to store wallet: ${err.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, wallet_address: address });
  }

  if (action === "delete") {
    await deleteUserWallet(claims.google_id);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown action (use load, save, delete)" }, { status: 400 });
}
