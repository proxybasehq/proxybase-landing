import { NextResponse } from 'next/server'
import { detectBotProtection } from '@/app/lib/antibot/vendors'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function normalizeUrl(input) {
  const trimmed = input.trim()
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  const url = new URL(withProtocol)

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('Only http and https URLs are allowed')
  }

  return url.toString()
}

export async function POST(request) {
  try {
    const { url } = await request.json()

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Missing url' }, { status: 400 })
    }

    const targetUrl = normalizeUrl(url)

    const res = await fetch(targetUrl, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'user-agent':
          'Mozilla/5.0 (compatible; AntibotDetector/1.0; +https://proxybase.xyz)',
        'accept':
          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      cache: 'no-store',
    })

    const body = await res.text()

    const headersText = Array.from(res.headers.entries())
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n')

    const detectionInput = [
      `URL: ${targetUrl}`,
      `STATUS: ${res.status}`,
      headersText,
      body,
    ].join('\n\n')

    const result = detectBotProtection(detectionInput)

    return NextResponse.json({
      url: targetUrl,
      status: res.status,
      ok: res.ok,
      matches: result.matches,
      challengeMatches: result.challengeMatches,
      hasProtection: result.matches.length > 0,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
