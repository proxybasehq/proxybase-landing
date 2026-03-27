import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ip = searchParams.get('ip');

  if (!ip) {
    return NextResponse.json({ error: 'IP is required' }, { status: 400 });
  }

  try {
    // The fields=66846719 parameter ensures we get the exact same data format
    // Proxying this request server-side avoids CORS and Mixed-Content (HTTP on HTTPS) errors.
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=66846719`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'ProxyBase-Whois-Aggregator/1.0'
      }
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch from ip-api' }, 
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Internal server error while fetching IP data' }, 
      { status: 500 }
    );
  }
}
