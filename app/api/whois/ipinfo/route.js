import { NextResponse } from 'next/server';
import { load } from 'cheerio';
import { get as cuimpGet } from 'cuimp';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ip = searchParams.get('ip');

  if (!ip) {
    return NextResponse.json({ error: 'IP is required' }, { status: 400 });
  }

  try {
    const response = await cuimpGet(`https://ipinfo.io/${ip}`);
    const html = response.data; // cuimp returns HTML string via response.data

    const $ = load(html);
    const results = [];

    results.push({ label: 'IP Address', value: ip });

    // Reverse DNS (Hostname)
    let host = '';
    $('td').each((i, el) => {
        if ($(el).text().trim() === 'Hostname') {
            host = $(el).next('td').text().trim();
        }
    });
    if (host && host !== 'None' && host !== '-') {
      results.push({ label: 'Reverse DNS', value: host });
    }

    // Location
    const locText = $('a[href^="/countries/"]').first().text().replace(/\s+/g, ' ').trim();
    if (locText) {
      results.push({ label: 'Location', value: locText });
    }

    // ASN
    let asnRaw = '';
    $('td').each((i, el) => {
        if ($(el).text().trim() === 'ASN') {
            asnRaw = $(el).next('td').text().replace(/\s+/g, ' ').trim();
        }
    });
    // Truncate overly long RPKI extra text if it exists (usually it says something like "validROA...")
    // But the regex replace should compress it nicely. We'll split by " - " to just get the nice format
    if (asnRaw) {
      // e.g. "AS11878 - tzulo, inc." Sometimes it might have SVG text bloat.
      // Often looks like: "AS11878 - tzulo, inc."
      const cleanAsn = asnRaw.split('-').map(s => s.trim()).join(' - ');
      results.push({ label: 'ASN', value: cleanAsn });
    }

    // Company
    let companyRaw = '';
    $('td').each((i, el) => {
        if ($(el).text().trim() === 'Company') {
            companyRaw = $(el).next('td').text().replace(/\s+/g, ' ').trim();
        }
    });
    if (companyRaw) {
      results.push({ label: 'Organization', value: companyRaw });
    }

    // Privacy Badges
    const flags = [];
    $('.privacy-card-detected').each((i, el) => {
        const title = $(el).find('h3').text().replace(/\s+/g, ' ').trim();
        if (title) flags.push(title);
    });

    $('.privacy-pill').each((i, el) => {
        const title = $(el).text().replace(/\s+/g, ' ').trim();
        if (title) flags.push(title);
    });

    if (flags.length > 0) {
        const uniqueFlags = [...new Set(flags)];
        results.push({ label: 'Network Type', value: uniqueFlags.join(' • ') });
    } else {
        results.push({ label: 'Network Type', value: 'Residential / Standard' });
    }

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch or parse from IPinfo' }, 
      { status: 500 }
    );
  }
}
