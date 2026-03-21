import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchPackages, enrichPackage } from "../lib/packages";

export const metadata = {
    title: "MPP — Pay-per-Request Proxy Access | ProxyBase",
    description: "Buy SOCKS5 proxy bandwidth with a single HTTP request using the Micropayments Protocol (MPP). No accounts, no API keys — just pay and connect.",
    keywords: "mpp, micropayments, pay per request, proxy api, socks5 proxy, tempo, pathUSD, ai agent proxy",
};

export default async function MppPage() {
    let packages = [];
    try {
        const raw = await fetchPackages();
        packages = raw.map(enrichPackage);
    } catch {
        packages = [];
    }

    // Mark the largest mid-tier package per country as featured
    const featured = new Set();
    const byCountry = {};
    for (const pkg of packages) {
        if (!byCountry[pkg.country]) byCountry[pkg.country] = [];
        byCountry[pkg.country].push(pkg);
    }
    for (const group of Object.values(byCountry)) {
        const sorted = [...group].sort((a, b) => b.price_usd - a.price_usd);
        if (sorted.length >= 2) featured.add(sorted[1].id);
        else if (sorted.length === 1) featured.add(sorted[0].id);
    }
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "ProxyBase MPP",
        "operatingSystem": "All",
        "applicationCategory": "DeveloperApplication",
        "description": "Buy SOCKS5 proxy bandwidth with micropayments. No accounts needed.",
        "url": "https://proxybase.xyz/mpp",
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />

            {/* Hero */}
            <section className="mpp-hero">
                <div className="mpp-hero-bg">
                    <div className="mpp-hero-glow" />
                </div>
                <div className="mpp-hero-content">
                    <div className="hero-badge">
                        <span className="badge-dot" />
                        Micropayments Protocol
                    </div>
                    <h1>
                        <span className="gradient-text">Pay-per-Request</span>
                        <br />
                        Proxy Access
                    </h1>
                    <p className="mpp-hero-subtitle">
                        Purchase SOCKS5 proxy bandwidth with a single HTTP request using{" "}
                        <a href="https://mpp.dev" target="_blank" rel="noopener noreferrer" className="mpp-link">
                            MPP (Micropayments Protocol)
                        </a>
                        . No accounts. No API keys. Just pay with <strong>stable coins on Tempo</strong> and
                        get instant proxy credentials back.
                    </p>
                    <div className="mpp-hero-features">
                        <div className="mpp-feature-pill">
                            <span>⚡</span> Instant Provisioning
                        </div>
                        <div className="mpp-feature-pill">
                            <span>🔐</span> No Account Required
                        </div>
                        <div className="mpp-feature-pill">
                            <span>💸</span> Pay with stable coins
                        </div>
                    </div>
                </div>
            </section>

            {/* How MPP Works */}
            <section className="mpp-section">
                <div className="mpp-section-inner">
                    <div className="section-header">
                        <span className="section-label">How It Works</span>
                        <h2 className="section-title">One Request, One Payment, One Proxy</h2>
                        <p className="section-desc">
                            MPP embeds payment directly into HTTP. Your agent pays and receives proxy
                            credentials in a single round-trip — no separate payment step needed.
                        </p>
                    </div>

                    <div className="mpp-flow">
                        <div className="mpp-flow-step">
                            <div className="mpp-flow-number">1</div>
                            <div className="mpp-flow-content">
                                <h3>Request</h3>
                                <p>
                                    Your agent sends a <code>GET</code> request to the package endpoint.
                                    The server responds with a <strong>402 Payment Required</strong> challenge
                                    containing the payment details.
                                </p>
                            </div>
                        </div>
                        <div className="mpp-flow-connector" />
                        <div className="mpp-flow-step">
                            <div className="mpp-flow-number">2</div>
                            <div className="mpp-flow-content">
                                <h3>Pay</h3>
                                <p>
                                    Your agent submits a <strong>stable coins</strong> payment on Tempo matching the
                                    package price. The MPP client handles the payment flow automatically.
                                </p>
                            </div>
                        </div>
                        <div className="mpp-flow-connector" />
                        <div className="mpp-flow-step">
                            <div className="mpp-flow-number">3</div>
                            <div className="mpp-flow-content">
                                <h3>Connect</h3>
                                <p>
                                    After payment verification, the response includes your SOCKS5 proxy
                                    credentials — <strong>host, port, username, password</strong>. Connect immediately.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Packages */}
            <section className="mpp-section mpp-section-alt">
                <div className="mpp-section-inner">
                    <div className="section-header">
                        <span className="section-label">Packages</span>
                        <h2 className="section-title">Choose Your Bandwidth</h2>
                        <p className="section-desc">
                            Each package gives you a unique SOCKS5 proxy with the specified bandwidth.
                            No expiration date — use it until the bandwidth runs out.
                        </p>
                    </div>

                    <div className="mpp-packages-grid">
                        {packages.length === 0 && (
                            <p className="mpp-no-packages">Unable to load packages. Please try again later.</p>
                        )}
                        {packages.map((pkg) => (
                            <div
                                className={`mpp-package-card${featured.has(pkg.id) ? " mpp-featured" : ""}`}
                                key={pkg.id}
                            >
                                {featured.has(pkg.id) && <span className="mpp-popular-tag">Best Value</span>}
                                <div className="mpp-package-header">
                                    <span className="mpp-package-flag">{pkg.flag}</span>
                                    <span className="mpp-package-country">{pkg.country}</span>
                                    <span className="mpp-package-type">{pkg.proxy_type}</span>
                                </div>
                                <h3 className="mpp-package-name">{pkg.bandwidth}</h3>
                                <div className="mpp-package-price">{pkg.priceFormatted}</div>
                                <div className="mpp-package-endpoint">
                                    <code>/api/mpp/{pkg.id}</code>
                                </div>
                                <ul className="mpp-package-features">
                                    <li>{pkg.country} residential &amp; mobile IPs</li>
                                    <li>SOCKS5 protocol</li>
                                    <li>Unlimited concurrent sessions</li>
                                    <li>No expiration date</li>
                                    <li>Real-time bandwidth tracking</li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* API Documentation */}
            <section className="mpp-section">
                <div className="mpp-section-inner">
                    <div className="section-header">
                        <span className="section-label">API Reference</span>
                        <h2 className="section-title">Integration Guide</h2>
                        <p className="section-desc">
                            Use the <code>mppx</code> client library or make raw HTTP requests.
                            Each endpoint provisions a proxy for the specified package.
                        </p>
                    </div>

                    <div className="mpp-docs">
                        {/* Endpoint */}
                        <div className="mpp-doc-block">
                            <h3>Endpoint</h3>
                            <div className="mpp-code-block">
                                <div className="mpp-code-header">
                                    <span className="mpp-method-badge">GET</span>
                                    <span>Proxy Purchase</span>
                                </div>
                                <pre><code>{`GET https://proxybase.xyz/api/mpp/{package_id}`}</code></pre>
                            </div>
                            <div className="mpp-doc-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Parameter</th>
                                            <th>Type</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><code>package_id</code></td>
                                            <td>string</td>
                                            <td>
                                                The package to purchase. Available:{" "}
                                                {packages.map((p, i) => (
                                                    <span key={p.id}>
                                                        {i > 0 && ", "}
                                                        <code>{p.id}</code>
                                                    </span>
                                                ))}
                                                {packages.length === 0 && <em>fetch from GET /api/mpp/invalid to see list</em>}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Payment Flow */}
                        <div className="mpp-doc-block">
                            <h3>Payment Flow</h3>
                            <p className="mpp-doc-text">
                                The endpoint is gated by MPP. On first request, you receive a{" "}
                                <code>402 Payment Required</code> response with payment instructions.
                                After payment, the response includes your proxy credentials.
                            </p>

                            <div className="mpp-code-block">
                                <div className="mpp-code-header">
                                    <span>402 Response (Payment Challenge)</span>
                                </div>
                                <pre><code>{`HTTP/1.1 402 Payment Required
Content-Type: application/json

{
  "method": "tempo",
  "amount": "10",
  "currency": "0x20c0...0000",
  "recipient": "0x2a8d...A9b3"
}`}</code></pre>
                            </div>

                            <div className="mpp-code-block">
                                <div className="mpp-code-header">
                                    <span>200 Response (After Payment)</span>
                                </div>
                                <pre><code>{`HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "order_id": "dx8jnk3q",
  "package_id": "us_residential_1gb",
  "proxy": {
    "host": "api.proxybase.xyz",
    "port": 1080,
    "username": "pb_a1b2c3d4e5f6g7h8",
    "password": "9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c"
  },
  "bandwidth_bytes": 1073741824,
  "message": "Proxy provisioned successfully. Connect via SOCKS5."
}`}</code></pre>
                            </div>
                        </div>

                        {/* Client Example */}
                        <div className="mpp-doc-block">
                            <h3>Client Example (TypeScript)</h3>
                            <p className="mpp-doc-text">
                                Use the <code>mppx</code> client library to handle the payment flow automatically.
                            </p>
                            <div className="mpp-code-block">
                                <div className="mpp-code-header">
                                    <span>Install</span>
                                </div>
                                <pre><code>{`npm install mppx`}</code></pre>
                            </div>
                            <div className="mpp-code-block">
                                <div className="mpp-code-header">
                                    <span>Usage</span>
                                </div>
                                <pre><code>{`import { Client } from 'mppx/client'

const client = Client.create()

// Purchase a 1GB US residential proxy
const response = await client.fetch(
  'https://proxybase.xyz/api/mpp/us_residential_1gb'
)

const data = await response.json()
console.log(data.proxy)
// {
//   host: "api.proxybase.xyz",
//   port: 1080,
//   username: "pb_a1b2c3d4e5f6g7h8",
//   password: "9f8e7d6c5b4a..."
// }`}</code></pre>
                            </div>
                        </div>

                        {/* Using the Proxy */}
                        <div className="mpp-doc-block">
                            <h3>Using Your Proxy</h3>
                            <p className="mpp-doc-text">
                                Once you receive the credentials, connect via SOCKS5 from any language or tool.
                            </p>
                            <div className="mpp-code-block">
                                <div className="mpp-code-header">
                                    <span>curl</span>
                                </div>
                                <pre><code>{`curl --socks5 pb_a1b2c3d4e5f6g7h8:9f8e7d6c@api.proxybase.xyz:1080 \\
  https://lemontv.xyz/api/ip`}</code></pre>
                            </div>
                            <div className="mpp-code-block">
                                <div className="mpp-code-header">
                                    <span>Python</span>
                                </div>
                                <pre><code>{`import requests

proxies = {
    "http": "socks5://pb_a1b2c3d4e5f6g7h8:9f8e7d6c@api.proxybase.xyz:1080",
    "https": "socks5://pb_a1b2c3d4e5f6g7h8:9f8e7d6c@api.proxybase.xyz:1080",
}

r = requests.get("https://lemontv.xyz/api/ip", proxies=proxies)
print(r.json())`}</code></pre>
                            </div>
                            <div className="mpp-code-block">
                                <div className="mpp-code-header">
                                    <span>Node.js</span>
                                </div>
                                <pre><code>{`import { SocksProxyAgent } from 'socks-proxy-agent'

const agent = new SocksProxyAgent(
  'socks5://pb_a1b2c3d4e5f6g7h8:9f8e7d6c@api.proxybase.xyz:1080'
)

const res = await fetch('https://lemontv.xyz/api/ip', { agent })
console.log(await res.json())`}</code></pre>
                            </div>
                        </div>

                        {/* How Server Side Works */}
                        <div className="mpp-doc-block">
                            <h3>Server Implementation</h3>
                            <p className="mpp-doc-text">
                                For developers building MPP-powered services, here&apos;s how ProxyBase implements
                                the payment-gated endpoint using <code>mppx/nextjs</code>:
                            </p>
                            <div className="mpp-code-block">
                                <div className="mpp-code-header">
                                    <span>app/api/mpp/[package_id]/route.js</span>
                                </div>
                                <pre><code>{`import { Mppx, tempo } from 'mppx/nextjs'

const mppx = Mppx.create({
  methods: [tempo({
    currency: '0x20c0...0000', // pathUSD on Tempo
    recipient: '0x2a8d...A9b3',
  })],
})

export const GET =
  mppx.charge({ amount: '10' })(
    async () => {
      // Payment verified — provision the proxy
      const result = await provisionProxy(package_id)
      return Response.json({
        proxy: result.proxy,
        bandwidth_bytes: result.bandwidth_bytes,
      })
    }
  )`}</code></pre>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="mpp-section mpp-section-cta">
                <div className="mpp-section-inner">
                    <div className="mpp-cta-content">
                        <h2>Ready to Get Started?</h2>
                        <p>
                            Purchase a proxy package right now. No signup required.
                            Just send a request with payment and receive your credentials.
                        </p>
                        <div className="mpp-cta-actions">
                            <a
                                href="https://mpp.dev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                            >
                                Learn about MPP →
                            </a>
                            <a href="/#api" className="btn-secondary">
                                REST API Docs
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
