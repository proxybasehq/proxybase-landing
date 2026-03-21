const BACKEND_API_URL = process.env.BACKEND_API_URL || 'https://api.proxybase.xyz'
const AGENT_API_KEY = process.env.THIRD_PARTY_AGENT_API_KEY

let cachedPackages = null
let cacheTime = 0
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export async function fetchPackages() {
  const now = Date.now()
  if (cachedPackages && now - cacheTime < CACHE_TTL) {
    return cachedPackages
  }

  const res = await fetch(`${BACKEND_API_URL}/v1/packages`, {
    headers: { 'X-API-Key': AGENT_API_KEY },
    next: { revalidate: 300 },
  })

  if (!res.ok) {
    if (cachedPackages) return cachedPackages
    throw new Error(`Failed to fetch packages: ${res.status}`)
  }

  cachedPackages = await res.json()
  cacheTime = now
  return cachedPackages
}

const COUNTRY_FLAGS = {
  US: '\u{1F1FA}\u{1F1F8}',
  BR: '\u{1F1E7}\u{1F1F7}',
  GB: '\u{1F1EC}\u{1F1E7}',
  DE: '\u{1F1E9}\u{1F1EA}',
  JP: '\u{1F1EF}\u{1F1F5}',
  IN: '\u{1F1EE}\u{1F1F3}',
}

function formatBytes(bytes) {
  const gb = bytes / (1024 * 1024 * 1024)
  if (gb >= 1) return `${Math.round(gb)} GB`
  const mb = bytes / (1024 * 1024)
  return `${Math.round(mb)} MB`
}

export function enrichPackage(pkg) {
  return {
    ...pkg,
    flag: COUNTRY_FLAGS[pkg.country] || '\u{1F30D}',
    bandwidth: formatBytes(pkg.bandwidth_bytes),
    priceFormatted: `$${pkg.price_usd}`,
  }
}
