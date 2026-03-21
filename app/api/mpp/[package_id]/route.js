import { Mppx, tempo } from 'mppx/nextjs'
import { fetchPackages } from '../../../lib/packages'

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'https://api.proxybase.xyz'
const AGENT_API_KEY = process.env.THIRD_PARTY_AGENT_API_KEY

const mppx = Mppx.create({
  methods: [tempo({
    currency: '0x20c0000000000000000000000000000000000000', // pathUSD on Tempo
    recipient: '0x2a8dc787453c8e369770f4d6752E171A3e75A9b3',
  })],
})

async function provisionProxy(packageId) {
  const res = await fetch(`${BACKEND_API_URL}/v1/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': AGENT_API_KEY,
    },
    body: JSON.stringify({ package_id: packageId }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Backend error' }))
    throw new Error(err.error || `Backend returned ${res.status}`)
  }

  return res.json()
}

export const GET = async (request, { params }) => {
  const { package_id } = await params

  if (!AGENT_API_KEY) {
    return Response.json(
      { error: 'MPP integration not configured' },
      { status: 503 }
    )
  }

  // Fetch packages dynamically from backend
  let packages
  try {
    packages = await fetchPackages()
  } catch {
    return Response.json(
      { error: 'Failed to fetch packages from backend' },
      { status: 502 }
    )
  }

  const pkg = packages.find((p) => p.id === package_id)
  if (!pkg) {
    return Response.json(
      {
        error: 'Invalid package_id',
        available_packages: packages.map((p) => p.id),
      },
      { status: 400 }
    )
  }

  const price = String(pkg.price_usd)

  // Gate this route behind mppx payment
  const handler = mppx.charge({ amount: price })(async () => {
    try {
      const result = await provisionProxy(package_id)
      return Response.json({
        success: true,
        order_id: result.order_id,
        package_id,
        proxy: result.proxy,
        bandwidth_bytes: result.bandwidth_bytes,
        message: 'Proxy provisioned successfully. Connect via SOCKS5.',
      })
    } catch (err) {
      return Response.json(
        { error: `Failed to provision proxy: ${err.message}` },
        { status: 502 }
      )
    }
  })

  return handler(request)
}
