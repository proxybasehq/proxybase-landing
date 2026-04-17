import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
  }

  try {
    // Try RDAP standard API
    const response = await fetch(`https://rdap.org/domain/${domain}`, {
      headers: {
        'Accept': 'application/rdap+json',
        'User-Agent': 'ProxyBase-Whois/1.0'
      }
    });

    if (!response.ok) {
      // Sometimes rdap fails, fallback or just throw
      return NextResponse.json(
        { error: `RDAP failed: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Domain WHOIS failed:', error);
    return NextResponse.json({ error: 'Failed to fetch domain data' }, { status: 500 });
  }
}
