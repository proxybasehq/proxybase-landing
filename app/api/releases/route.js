import { NextResponse } from 'next/server'

const CLI_REPO = 'https://api.github.com/repos/proxybasehq/proxybase-cli/releases/latest'
const GUI_REPO = 'https://api.github.com/repos/proxybasehq/proxybase-gui/releases/latest'

const GH_HEADERS = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'ProxyBase',
}

let cached = null
let cacheTime = 0
const CACHE_TTL = 60 * 1000

/* ── Rust target triple → { os, arch } ── */
const TARGET_MAP = {
  'aarch64-apple-darwin': { os: 'macos', arch: 'aarch64' },
  'x86_64-apple-darwin': { os: 'macos', arch: 'x86_64' },
  'x86_64-pc-windows-msvc': { os: 'windows', arch: 'x86_64' },
  'i686-pc-windows-msvc': { os: 'windows', arch: 'i686' },
  'aarch64-pc-windows-msvc': { os: 'windows', arch: 'aarch64' },
  'x86_64-unknown-linux-gnu': { os: 'linux', arch: 'x86_64', libc: 'gnu' },
  'x86_64-unknown-linux-musl': { os: 'linux', arch: 'x86_64', libc: 'musl' },
  'aarch64-unknown-linux-gnu': { os: 'linux', arch: 'aarch64', libc: 'gnu' },
  'aarch64-unknown-linux-musl': { os: 'linux', arch: 'aarch64', libc: 'musl' },
  'armv7-unknown-linux-gnueabihf': { os: 'linux', arch: 'armv7', libc: 'gnu' },
}

/* ── Architecture parsed from a release asset filename ── */
function archFromName(lower) {
  if (/(^|[^a-z0-9])(aarch64|arm64)([^a-z0-9]|$)/.test(lower)) return 'aarch64'
  if (/(^|[^a-z0-9])(x86_64|amd64|x64)([^a-z0-9]|$)/.test(lower)) return 'x86_64'
  if (/(^|[^a-z0-9])(armv7|armhf|arm32)([^a-z0-9]|$)/.test(lower)) return 'armv7'
  if (/(^|[^a-z0-9])(i686|i386|ia32)([^a-z0-9]|$)/.test(lower)) return 'i686'
  return null
}

/* ── GUI extension → { os, arch } ── */
function classifyGuiAsset(name) {
  const lower = name.toLowerCase()
  const arch = archFromName(lower)
  if (lower.endsWith('.dmg')) return { os: 'macos', arch: arch || 'universal' }
  if (lower.endsWith('.msi') || lower.endsWith('.exe')) {
    return { os: 'windows', arch: arch || 'x86_64' }
  }
  // Tauri names Linux bundles by architecture:
  //   ProxyBase_<ver>_amd64.deb / ProxyBase_<ver>_arm64.deb
  //   ProxyBase-<ver>-1.x86_64.rpm / ProxyBase-<ver>-1.aarch64.rpm
  //   ProxyBase_<ver>_amd64.AppImage / ProxyBase_<ver>_aarch64.AppImage
  // Default to x86_64 for older assets that carried no arch in the name.
  if (lower.endsWith('.deb') || lower.endsWith('.rpm') || lower.endsWith('.appimage')) {
    return { os: 'linux', arch: arch || 'x86_64' }
  }
  // Tauri's universal APK bundles the supported ABIs.
  if (lower.endsWith('.apk')) return { os: 'android', arch: 'universal' }
  return null
}

/* ── CLI filename → { os, arch } ── */
function classifyCliAsset(name) {
  // pattern: proxybase-cli-{target}.{tar.gz|zip}
  const match = name.match(/^proxybase-cli-(.+)\.(tar\.gz|zip)$/)
  if (!match) return null
  const target = match[1]
  return TARGET_MAP[target] || null
}

function parseRelease(raw) {
  return {
    version: raw.tag_name || raw.name || 'unknown',
    published_at: raw.published_at || null,
    assets: raw.assets.map((a) => ({
      name: a.name,
      url: a.browser_download_url,
      size: a.size,
      content_type: a.content_type,
    })),
  }
}

function categorizeAssets(assets, type) {
  const classify = type === 'cli' ? classifyCliAsset : classifyGuiAsset

  return assets.map((asset) => {
    const meta = classify(asset.name)
    return meta ? { ...asset, ...meta } : asset
  })
}

export async function GET() {
  const now = Date.now()
  if (cached && now - cacheTime < CACHE_TTL) {
    return NextResponse.json(cached)
  }

  const [cliRes, guiRes] = await Promise.allSettled([
    fetch(CLI_REPO, { headers: GH_HEADERS, cache: 'no-store' }),
    fetch(GUI_REPO, { headers: GH_HEADERS, cache: 'no-store' }),
  ])

  const result = { fetched_at: new Date().toISOString() }

  if (cliRes.status === 'fulfilled' && cliRes.value.ok) {
    const raw = await cliRes.value.json()
    result.cli = parseRelease(raw)
    result.cli.assets = categorizeAssets(result.cli.assets, 'cli')
  } else {
    result.cli = null
  }

  if (guiRes.status === 'fulfilled' && guiRes.value.ok) {
    const raw = await guiRes.value.json()
    result.gui = parseRelease(raw)
    result.gui.assets = categorizeAssets(result.gui.assets, 'gui')
  } else {
    result.gui = null
  }

  if (!result.cli && !result.gui) {
    if (cached) return NextResponse.json(cached)
    return NextResponse.json({ error: 'Failed to fetch releases' }, { status: 502 })
  }

  cached = result
  cacheTime = now
  return NextResponse.json(result)
}
