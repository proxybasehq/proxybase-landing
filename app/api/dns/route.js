import { NextResponse } from 'next/server';
import { dumpAllDnsRecords } from '../../actions/dns';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain parameter is required' }, { status: 400 });
  }

  try {
    const data = await dumpAllDnsRecords(domain);
    return NextResponse.json(data);
  } catch (error) {
    console.error('DNS record dump failed:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to dump DNS records' },
      { status: 500 }
    );
  }
}
