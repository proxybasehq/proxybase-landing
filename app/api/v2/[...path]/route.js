import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BACKEND = (process.env.BACKEND_API_URL || "https://api.proxybase.xyz").replace(/\/+$/, "");

const PASSTHROUGH_HEADERS = ["authorization", "content-type", "accept", "accept-language"];
const RESPONSE_HEADERS = ["content-type", "cache-control", "x-accel-buffering"];

async function proxy(req, ctx, method) {
  const { path: segments } = await ctx.params;
  const pathname = "/v2/" + segments.map(encodeURIComponent).join("/");
  const url = BACKEND + pathname + (req.nextUrl ? req.nextUrl.search : "");

  const headers = new Headers();
  for (const name of PASSTHROUGH_HEADERS) {
    const value = req.headers.get(name);
    if (value) headers.set(name, value);
  }
  if (process.env.BACKEND_API_KEY) headers.set("x-api-key", process.env.BACKEND_API_KEY);

  let body;
  if (method !== "GET" && method !== "HEAD") {
    body = await req.arrayBuffer();
  }

  let upstream;
  try {
    upstream = await fetch(url, {
      method,
      headers,
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(120_000),
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Backend unreachable: ${err.name === "TimeoutError" ? "timeout" : err.message}` },
      { status: 502 }
    );
  }

  const respHeaders = new Headers();
  for (const name of RESPONSE_HEADERS) {
    const value = upstream.headers.get(name);
    if (value) respHeaders.set(name, value);
  }
  // EventSource requires no content-encoding buffering for live events.
  respHeaders.set("connection", "keep-alive");

  return new Response(upstream.body, { status: upstream.status, headers: respHeaders });
}

export const GET = (req, ctx) => proxy(req, ctx, "GET");
export const POST = (req, ctx) => proxy(req, ctx, "POST");
export const PUT = (req, ctx) => proxy(req, ctx, "PUT");
export const PATCH = (req, ctx) => proxy(req, ctx, "PATCH");
export const DELETE = (req, ctx) => proxy(req, ctx, "DELETE");
export const OPTIONS = async () =>
  new Response(null, {
    status: 204,
    headers: {
      allow: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    },
  });
