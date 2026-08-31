import { NextResponse } from "next/server";

const BACKEND_API_URL = (process.env.BACKEND_API_URL || "https://api.proxybase.xyz").replace(/\/+$/, "");

export async function GET() {
  const hasGoogle = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
  const demoMode = process.env.NODE_ENV !== "production" && !hasGoogle;

  let gatewayHost;
  try {
    gatewayHost = process.env.SOCKS5_GATEWAY_HOST || new URL(BACKEND_API_URL).hostname;
  } catch {
    gatewayHost = "api.proxybase.xyz";
  }
  const gatewayPort = Number(process.env.SOCKS5_GATEWAY_PORT || 1082);

  return NextResponse.json({
    demo_mode: demoMode,
    google_client_id: process.env.GOOGLE_CLIENT_ID || null,
    google_configured: hasGoogle,
    socks5_gateway: `${gatewayHost}:${gatewayPort}`,
    api_base: BACKEND_API_URL,
  });
}
