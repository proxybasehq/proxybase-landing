import { NextResponse } from "next/server";
import { parseSessionCookie, SESSION_COOKIE } from "../../../lib/serverCrypto";

export async function GET(req) {
  const claims = parseSessionCookie(req.cookies.get(SESSION_COOKIE)?.value);
  if (!claims) {
    return NextResponse.json({ user: null });
  }
  return NextResponse.json({
    user: {
      google_id: claims.google_id,
      email: claims.email,
      name: claims.name,
      avatar: claims.avatar || null,
    },
  });
}
