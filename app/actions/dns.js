'use server';

import dns from 'node:dns/promises';

const PRIMARY_RECORD_TYPES = [
  'A',
  'AAAA',
  'MX',
  'TXT',
  'NS',
  'CNAME',
  'SOA',
  'CAA',
  'SRV',
  'NAPTR',
  'PTR',
];

/**
 * Server Action: Exhaustively dumps ALL DNS records for a given domain,
 * including resolveAny, explicit record resolution, DMARC/subdomain records, and DoH metadata.
 * @param {string} rawDomain
 * @returns {Promise<{ domain: string, records: Record<string, any>, subdomains: Record<string, any>, errors: Record<string, string>, metadata: Record<string, any> }>}
 */
export async function dumpAllDnsRecords(rawDomain) {
  if (!rawDomain || typeof rawDomain !== 'string') {
    return { domain: '', records: {}, subdomains: {}, errors: { INPUT: 'Invalid domain provided' } };
  }

  // Clean domain input (remove http://, https://, www., paths, ports, query params)
  const domain = rawDomain
    .trim()
    .toLowerCase()
    .replace(/^(https?:\/\/)?(www\.)?/, '')
    .split('/')[0]
    .split('?')[0]
    .split('#')[0]
    .split(':')[0];

  if (!domain) {
    return { domain: '', records: {}, subdomains: {}, errors: { INPUT: 'Please provide a valid domain name' } };
  }

  const records = {};
  const errors = {};
  const subdomains = {};

  // 1. Try resolveAny first to retrieve all records with TTLs where supported
  try {
    const anyResult = await dns.resolveAny(domain);
    if (Array.isArray(anyResult) && anyResult.length > 0) {
      anyResult.forEach((rec) => {
        const type = rec.type || 'UNKNOWN';
        if (!records[type]) records[type] = [];
        records[type].push(rec);
      });
    }
  } catch (err) {
    // resolveAny might fail or be blocked by DNS server, proceed to explicit resolution
  }

  // 2. Query all primary record types concurrently
  const promises = PRIMARY_RECORD_TYPES.map(async (type) => {
    try {
      const data = await dns.resolve(domain, type);
      return { type, data, success: true };
    } catch (err) {
      return { type, error: err.code || err.message, success: false };
    }
  });

  const results = await Promise.allSettled(promises);

  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      const { type, data, error, success } = result.value;
      if (success) {
        // If we don't already have records for this type from resolveAny, set them
        if (!records[type] || records[type].length === 0) {
          records[type] = data;
        }
      } else if (error && error !== 'ENODATA' && error !== 'ENOTFOUND') {
        errors[type] = error;
      }
    }
  });

  // 3. Query critical subdomains (DMARC, WWW)
  try {
    const dmarcData = await dns.resolveTxt(`_dmarc.${domain}`);
    if (dmarcData && dmarcData.length > 0) {
      subdomains['_dmarc'] = { TXT: dmarcData };
    }
  } catch (_) {}

  try {
    const wwwData = await dns.resolve(`www.${domain}`);
    if (wwwData && wwwData.length > 0) {
      subdomains['www'] = { A: wwwData };
    }
  } catch (_) {}

  // 4. Query Cloudflare DoH to fetch DNSSEC validation & status flags
  let dohMeta = null;
  try {
    const dohRes = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=A`, {
      headers: { accept: 'application/dns-json' },
      next: { revalidate: 60 }
    });
    if (dohRes.ok) {
      const dohJson = await dohRes.json();
      dohMeta = {
        status: dohJson.Status === 0 ? 'NOERROR' : `STATUS_${dohJson.Status}`,
        dnssecValidated: dohJson.AD || false,
        recursionDesired: dohJson.RD || false,
        recursionAvailable: dohJson.RA || false,
      };
    }
  } catch (_) {}

  return { domain, records, subdomains, errors, metadata: dohMeta };
}
