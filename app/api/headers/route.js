import { NextResponse } from "next/server";

export async function GET(request) {
  // Capture all incoming request headers
  const requestHeaders = {};
  request.headers.forEach((value, key) => {
    requestHeaders[key] = value;
  });

  // Build the response with explicit headers so we can also capture them
  const response = NextResponse.json({
    request_headers: requestHeaders,
    timestamp: new Date().toISOString(),
    method: request.method,
    url: request.url,
  });

  // Add some useful response headers for proxy debugging
  response.headers.set("X-ProxyBase-Tool", "Headers Inspector");
  response.headers.set("X-Request-Time", new Date().toISOString());
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  response.headers.set("Pragma", "no-cache");

  return response;
}
