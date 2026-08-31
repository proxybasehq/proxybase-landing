import { Pool } from "@neondatabase/serverless";

const SCHEMA = `
  CREATE TABLE IF NOT EXISTS users (
    google_id           TEXT PRIMARY KEY,
    email               TEXT NOT NULL,
    name                TEXT NOT NULL,
    avatar              TEXT,
    wallet_address      TEXT NOT NULL,
    encrypted_keystore  TEXT NOT NULL,
    public_key_hex      TEXT NOT NULL,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

let pool = null;
let schemaReady = false;
let warnedMemory = false;
const memoryStore = new Map();

// The Neon serverless driver needs the direct (non-pooled) endpoint —
// pgbouncer-pooled hosts don't speak its WebSocket protocol.
function getDatabaseUrl() {
  const raw =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.POSTGRES_URL;
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.hostname.includes("-pooler")) {
      url.hostname = url.hostname.replace("-pooler", "");
    }
    return url.toString();
  } catch {
    return raw;
  }
}

function usingMemory() {
  const isMemory = !getDatabaseUrl() && process.env.NODE_ENV !== "production";
  if (isMemory && !warnedMemory) {
    warnedMemory = true;
    console.warn(
      "[userStore] DATABASE_URL not set — using in-memory wallet store (development only). Wallets will not persist across restarts."
    );
  }
  return isMemory;
}

function getPool() {
  if (!pool) {
    const url = getDatabaseUrl();
    if (!url) {
      throw new Error(
        "DATABASE_URL is not configured (set it to your Neon connection string)"
      );
    }
    pool = new Pool({ connectionString: url, max: 1 });
  }
  return pool;
}

async function ensureSchema() {
  if (schemaReady || usingMemory()) return;
  await getPool().query(SCHEMA);
  schemaReady = true;
}

export async function getUserByGoogleId(googleId) {
  await ensureSchema();
  if (usingMemory()) return memoryStore.get(googleId) || null;
  const { rows } = await getPool().query(
    `SELECT google_id, email, name, avatar, wallet_address, encrypted_keystore,
            public_key_hex, created_at, updated_at
     FROM users WHERE google_id = $1`,
    [googleId]
  );
  return rows[0] || null;
}

export async function saveUserWallet({
  google_id,
  email,
  name,
  avatar,
  wallet_address,
  encrypted_keystore,
  public_key_hex,
}) {
  await ensureSchema();
  if (usingMemory()) {
    const existing = memoryStore.get(google_id);
    const now = new Date().toISOString();
    const row = {
      google_id,
      email,
      name,
      avatar,
      wallet_address,
      encrypted_keystore,
      public_key_hex,
      created_at: existing?.created_at || now,
      updated_at: now,
    };
    memoryStore.set(google_id, row);
    return row;
  }
  const { rows } = await getPool().query(
    `INSERT INTO users (google_id, email, name, avatar, wallet_address, encrypted_keystore, public_key_hex)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT (google_id) DO UPDATE SET
       email              = EXCLUDED.email,
       name               = EXCLUDED.name,
       avatar             = EXCLUDED.avatar,
       wallet_address     = EXCLUDED.wallet_address,
       encrypted_keystore = EXCLUDED.encrypted_keystore,
       public_key_hex     = EXCLUDED.public_key_hex,
       updated_at         = now()
     RETURNING google_id, email, name, avatar, wallet_address, encrypted_keystore,
               public_key_hex, created_at, updated_at`,
    [google_id, email, name, avatar, wallet_address, encrypted_keystore, public_key_hex]
  );
  return rows[0] || null;
}

export async function updateUserWallet(googleId, fields) {
  const existing = await getUserByGoogleId(googleId);
  if (!existing) return null;
  return saveUserWallet({ ...existing, ...fields });
}

export async function deleteUserWallet(googleId) {
  await ensureSchema();
  if (usingMemory()) {
    memoryStore.delete(googleId);
    return;
  }
  await getPool().query("DELETE FROM users WHERE google_id = $1", [googleId]);
}
