import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { createSessionCookie, SESSION_COOKIE, SESSION_TTL_MS } from "../../../lib/serverCrypto";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const DEMO_MODE =
  process.env.NODE_ENV !== "production" &&
  (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET);

let oauthClient = null;
function getOAuthClient() {
  if (!oauthClient) {
    oauthClient = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, "");
  }
  return oauthClient;
}

function sessionResponse(claims) {
  const res = NextResponse.json({
    ok: true,
    user: { google_id: claims.google_id, email: claims.email, name: claims.name, avatar: claims.avatar || null },
  });
  res.cookies.set(SESSION_COOKIE, createSessionCookie(claims), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  });
  return res;
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  // Local development fallback: no Google credentials configured.
  if (body.demo === true) {
    if (!DEMO_MODE) {
      return NextResponse.json({ ok: false, error: "Demo sign-in is disabled" }, { status: 403 });
    }
    const email = String(body.email || "demo@proxybase.local").toLowerCase();
    const name = body.name || email.split("@")[0];
    return sessionResponse({
      google_id: `demo:${email}`,
      email,
      name,
      avatar: null,
    });
  }

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    return NextResponse.json(
      { ok: false, error: "Google OAuth is not configured (GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET)" },
      { status: 500 }
    );
  }

  const { code, redirect_uri } = body;
  if (!code || !redirect_uri) {
    return NextResponse.json({ ok: false, error: "Missing code or redirect_uri" }, { status: 400 });
  }

  try {
    const client = getOAuthClient();
    const { tokens } = await client.getToken({ code, redirect_uri });
    const idToken = tokens.id_token;
    if (!idToken) {
      return NextResponse.json({ ok: false, error: "No id_token returned by Google" }, { status: 401 });
    }
    const ticket = await client.verifyIdToken({ idToken, audience: GOOGLE_CLIENT_ID });
    const payload = ticket.getPayload();
    if (!payload || !payload.sub) {
      return NextResponse.json({ ok: false, error: "Google token payload missing subject" }, { status: 401 });
    }
    return sessionResponse({
      google_id: payload.sub,
      email: payload.email || "",
      name: payload.name || payload.email || "ProxyBase User",
      avatar: payload.picture || null,
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: `Google authentication failed: ${err.message}` }, { status: 401 });
  }
}
