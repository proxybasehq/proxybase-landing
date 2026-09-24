import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export const metadata = {
    title: "Buy SOCKS5 Proxies with Crypto — Bitcoin, USDC, USDT, ETH, SOL | ProxyBase",
    description: "Buy residential and mobile SOCKS5 proxies with crypto. Pay in USDC, USDT, BTC, ETH, or SOL — no card, no identity documents. Fixed packages or live market rates.",
    keywords: "buy proxy with crypto, buy socks5 proxy with crypto, buy socks5 proxy with bitcoin, buy proxy usdc, buy proxy usdt, buy proxy solana, buy proxy eth, crypto proxy no kyc, pay proxy with crypto, proxybase",
    alternates: {
        canonical: "/buy-with-crypto",
    },
    openGraph: {
        title: "Buy SOCKS5 Proxies with Crypto — No Card, No KYC",
        description: "Pay in Bitcoin, USDC, USDT, ETH, or SOL. Fixed prepaid packages, or live market rates billed per session. Credentials issued by the API when payment confirms.",
        url: "https://proxybase.xyz/buy-with-crypto",
        type: "website",
    },
};

export default function BuyWithCryptoPage() {
    const webPageJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Buy SOCKS5 Proxies with Crypto",
        "description": "How to buy residential and mobile SOCKS5 proxy bandwidth with cryptocurrency: fixed prepaid packages versus live market rates, supported coins, and the API flow.",
        "url": "https://proxybase.xyz/buy-with-crypto",
        "publisher": {
            "@type": "Organization",
            "name": "ProxyBase",
            "url": "https://proxybase.xyz"
        },
        "dateModified": "2026-09-24"
    };

    const breadcrumbsJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://proxybase.xyz"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Buy Proxies with Crypto",
                "item": "https://proxybase.xyz/buy-with-crypto"
            }
        ]
    };

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Which cryptocurrencies can I pay with?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "USDC, USDT, Bitcoin, Ethereum, and Solana. Stablecoins settle fastest and cost the least in network fees, so they are the better default if your agent tops up often. The full list is available from GET /v1/currencies."
                }
            },
            {
                "@type": "Question",
                "name": "Do I need to verify my identity?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. There is no email, phone number, address, or document upload. Your wallet address and API key are the whole account."
                }
            },
            {
                "@type": "Question",
                "name": "How long until credentials are issued?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Provisioning runs automatically when the transaction confirms. Stablecoins on Tempo and Solana typically confirm in seconds. Bitcoin and Ethereum wait on block confirmation, so expect minutes rather than seconds."
                }
            },
            {
                "@type": "Question",
                "name": "Can an agent buy without a human?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Registration, ordering, status polling, and rotation are all headless HTTP calls, and payment is a wallet signature, so nothing in the flow needs a browser or a card."
                }
            },
            {
                "@type": "Question",
                "name": "Does prepaid bandwidth expire?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. A fixed package keeps its full balance until you transfer the data. This is the main practical difference from monthly plans, which usually forfeit whatever you did not use by the renewal date."
                }
            },
            {
                "@type": "Question",
                "name": "Which protocols are supported?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "SOCKS5 (including authenticated SOCKS5) and HTTP/HTTPS, over residential and mobile endpoints. IP rotation is available programmatically via POST /v1/orders/{id}/rotate."
                }
            },
            {
                "@type": "Question",
                "name": "What if an invoice is underpaid?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Partial payments are recorded against the order and it stays open. Once the full amount arrives, credentials are issued, so you do not have to start a new order."
                }
            },
            {
                "@type": "Question",
                "name": "Can I earn crypto by selling bandwidth instead?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, that runs the other direction. On ProxyBase Markets you run a seller node and earn per gigabyte relayed, paid in AlphaUSD or USDC."
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <Navbar />

            <div className="compare-page-root">
                {/* HERO */}
                <section className="compare-hero">
                    <div className="hero-grid-overlay" />
                    <div className="hero-glow-1" />
                    <div className="hero-glow-2" />

                    <div className="compare-hero-content">
                        <div className="blog-breadcrumbs" style={{ marginBottom: "1.5rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                            <Link href="/" style={{ color: "var(--accent-primary)", textDecoration: "none" }}>Home</Link>
                            <span style={{ margin: "0 8px" }}>/</span>
                            <span>Buy with Crypto</span>
                        </div>

                        <div className="compare-badge">
                            Crypto-Native SOCKS5 Infrastructure
                        </div>
                        <h1>Buy SOCKS5 Proxies with Crypto — Instant, Zero KYC, API-First</h1>
                        <p className="hero-subtitle">
                            Pay for residential and mobile proxy bandwidth with Bitcoin, USDC, USDT, Ethereum, or Solana.
                            No credit cards, no identity checks, no subscriptions. There are two ways to buy, and they price
                            differently: fixed prepaid packages, or the live marketplace where rates move with supply.
                        </p>
                        <div className="hero-actions">
                            <Link href="/mpp" className="btn-primary" data-umami-event="BuyWithCrypto: Packages CTA">Buy a Fixed Package →</Link>
                            <Link href="/markets" className="btn-secondary" data-umami-event="BuyWithCrypto: Market CTA">Shop the Live Market →</Link>
                        </div>
                    </div>
                </section>

                {/* TWO WAYS TO BUY */}
                <section className="compare-intro-section" id="how-pricing-works">
                    <div className="section-header">
                        <span className="section-label">How Pricing Works</span>
                        <h2>Fixed Packages or Live Market: They Price Differently</h2>
                        <p className="section-desc">
                            ProxyBase runs two purchasing rails. Pick the one that matches how much you buy and how
                            much your price needs to be predictable.
                        </p>
                    </div>

                    <div className="intro-card-grid">
                        <div className="intro-card">
                            <div className="card-brand-header">
                                <span className="brand-logo-dot active" />
                                <h3>Fixed Packages</h3>
                            </div>
                            <p className="brand-tagline">Set prices, prepaid</p>
                            <p className="brand-desc">
                                Buy a block of bandwidth at a set price and keep it until you use it. This is the
                                simplest rail if you know roughly how much traffic you need and want the cost
                                settled up front.
                            </p>
                            <ul className="brand-bullets">
                                <li>1 GB: $10</li>
                                <li>5 GB: $50</li>
                                <li>10 GB: $100</li>
                                <li>Bandwidth does not expire</li>
                            </ul>
                            <div style={{ marginTop: "12px" }}>
                                <Link href="/mpp" style={{ color: "var(--accent-primary)", fontSize: "0.9rem" }}>Browse fixed packages →</Link>
                            </div>
                        </div>

                        <div className="intro-card">
                            <div className="card-brand-header">
                                <span className="brand-logo-dot legacy" />
                                <h3>Live Marketplace</h3>
                            </div>
                            <p className="brand-tagline">Dynamic per-GB rates set by supply</p>
                            <p className="brand-desc">
                                Open a session against the peer marketplace and pay the current per-GB rate for that
                                country and network type. Rates are set per country and category, so they vary,
                                and they can be materially lower than the fixed package rate. You pay from a
                                prepaid credit balance, billed per session.
                            </p>
                            <ul className="brand-bullets">
                                <li>US residential from ~$3.00/GB at current rates</li>
                                <li>US mobile from ~$5.00/GB</li>
                                <li>Rates move with supply, so check the live table</li>
                                <li>Billed per session from your credit balance</li>
                            </ul>
                            <div style={{ marginTop: "12px" }}>
                                <Link href="/markets" style={{ color: "var(--accent-primary)", fontSize: "0.9rem" }}>See live market rates →</Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SUPPORTED CHAINS & RAILS */}
                <section className="compare-deepdive-section" id="supported-chains">
                    <div className="section-header">
                        <span className="section-label">Supported Currencies</span>
                        <h2>Accepted Cryptocurrencies & Payment Rails</h2>
                        <p className="section-desc">
                            Pay with stablecoins through the <Link href="/what-is-mpp" style={{ color: "var(--accent-primary)" }}>Micropayments Protocol</Link>, or settle a conventional on-chain invoice.
                        </p>
                    </div>

                    <div className="matrix-table-container" style={{ marginBottom: "3rem" }}>
                        <table className="compare-matrix-table">
                            <thead>
                                <tr>
                                    <th>Currency / Network</th>
                                    <th>Settlement Speed</th>
                                    <th>Typical Network Fee</th>
                                    <th>Best Use Case</th>
                                    <th>Autonomous Agent Ready</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="metric-name font-weight-bold" style={{ color: "var(--accent-primary)" }}>
                                        USDC / USDT (Tempo & Solana)
                                    </td>
                                    <td className="text-emerald font-weight-bold">Sub-second (&lt; 2s)</td>
                                    <td className="text-emerald">&lt; $0.001</td>
                                    <td>Instant pay-as-you-go micropayments, frequent top-ups</td>
                                    <td className="text-emerald font-weight-bold">✅ Native MPP Support</td>
                                </tr>
                                <tr>
                                    <td className="metric-name font-weight-bold">Solana (SOL)</td>
                                    <td className="text-emerald">Under 15 seconds</td>
                                    <td className="text-emerald">&lt; $0.005</td>
                                    <td>Direct on-chain invoices with near-zero gas</td>
                                    <td className="text-emerald font-weight-bold">✅ REST API Invoicing</td>
                                </tr>
                                <tr>
                                    <td className="metric-name font-weight-bold">Bitcoin (BTC)</td>
                                    <td>1 Confirmation (~10-20m)</td>
                                    <td>Variable ($1.00 – $3.00)</td>
                                    <td>Maximum sovereignty & classic crypto privacy</td>
                                    <td>✅ Automated Invoicing</td>
                                </tr>
                                <tr>
                                    <td className="metric-name font-weight-bold">Ethereum (ETH & ERC-20)</td>
                                    <td>12 Blocks (~2-3m)</td>
                                    <td>Gas dependent ($1.50 – $5.00)</td>
                                    <td>Large enterprise bandwidth orders and DAO treasuries</td>
                                    <td>✅ Automated Invoicing</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="deepdive-grid">
                        <div className="deepdive-card">
                            <div className="icon-wrapper">⚡</div>
                            <h3>Micropayments Protocol (MPP)</h3>
                            <p>
                                MPP skips the invoice entirely. On Tempo and Solana, stablecoin payments confirm in
                                under two seconds, so an agent can top up mid-task rather than pre-buying a block it
                                may never finish.
                            </p>
                            <div style={{ marginTop: "12px" }}>
                                <Link href="/what-is-mpp" style={{ color: "var(--accent-primary)", fontSize: "0.9rem" }}>How MPP works →</Link>
                            </div>
                        </div>

                        <div className="deepdive-card">
                            <div className="icon-wrapper">🔒</div>
                            <h3>No identity documents</h3>
                            <p>
                                Your wallet address is the account. There is no email, no phone number, and no
                                document upload, which means nothing in our records ties your proxy sessions to a
                                legal identity.
                            </p>
                            <div style={{ marginTop: "12px" }}>
                                <Link href="/no-kyc-proxy" style={{ color: "var(--accent-primary)", fontSize: "0.9rem" }}>How no-KYC access works →</Link>
                            </div>
                        </div>

                        <div className="deepdive-card">
                            <div className="icon-wrapper">♾️</div>
                            <h3>Prepaid bandwidth doesn&apos;t expire</h3>
                            <p>
                                Most providers reset your allowance every 30 days, and whatever you did not use
                                is forfeited. Fixed packages here hold their full balance until your scraper
                                transfers the data, whether that takes a week or a year.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <div className="icon-wrapper">🤖</div>
                            <h3>Checkout an agent can complete alone</h3>
                            <p>
                                Card payments end at a 3-D Secure prompt or an SMS code, steps no autonomous agent
                                can clear. A wallet signature is something an agent can produce without a human in
                                the loop, which is what makes unattended provisioning possible.
                            </p>
                            <div style={{ marginTop: "12px" }}>
                                <Link href="/proxy-for-ai-agents" style={{ color: "var(--accent-primary)", fontSize: "0.9rem" }}>Proxies for AI agents →</Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* DEVELOPER CODE WALKTHROUGH */}
                <section className="compare-deepdive-section" id="how-it-works" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
                    <div className="section-header">
                        <span className="section-label">Developer Quickstart</span>
                        <h2>Provisioning an Agent End to End</h2>
                        <p className="section-desc">Three calls: register, order, then poll for credentials. No browser involved at any point.</p>
                    </div>

                    <div className="deepdive-grid">
                        <div className="deepdive-card" style={{ gridColumn: "1 / -1" }}>
                            <h3>Step 1: Register an agent and get an API key</h3>
                            <p>One POST request. No email verification, no password to set.</p>
                            <div style={{ background: "var(--bg-primary)", padding: "16px", borderRadius: "8px", marginTop: "12px", fontFamily: "monospace", fontSize: "0.85rem", overflowX: "auto" }}>
                                <pre style={{ margin: 0, color: "var(--accent-primary)" }}>{`curl -X POST https://api.proxybase.xyz/v1/agents

# Response:
# {
#   "agent_id": "6xAMqAGN",
#   "api_key": "pk_c8c91c8a0e5b3e2c..."
# }`}</pre>
                            </div>
                        </div>

                        <div className="deepdive-card" style={{ gridColumn: "1 / -1" }}>
                            <h3>Step 2: Create the order and get a deposit address</h3>
                            <p>Pick a package and a coin. Valid currency codes come from <code>GET /v1/currencies</code>.</p>
                            <div style={{ background: "var(--bg-primary)", padding: "16px", borderRadius: "8px", marginTop: "12px", fontFamily: "monospace", fontSize: "0.85rem", overflowX: "auto" }}>
                                <pre style={{ margin: 0, color: "var(--accent-primary)" }}>{`curl -X POST https://api.proxybase.xyz/v1/orders \\
  -H "X-API-Key: pk_c8c91c8a0e5b3e2c..." \\
  -H "Content-Type: application/json" \\
  -d '{"package_id":"us_residential_5gb","pay_currency":"sol"}'

# Response:
# {
#   "order_id": "kQx7p3Wn",
#   "payment_id": "5832461907",
#   "pay_address": "TXyz...",
#   "pay_currency": "sol",
#   "pay_amount": 0.058,
#   "price_usd": 50.00,
#   "status": "payment_pending"
# }`}</pre>
                            </div>
                        </div>

                        <div className="deepdive-card" style={{ gridColumn: "1 / -1" }}>
                            <h3>Step 3: Poll for credentials, then connect</h3>
                            <p>Once the payment confirms on-chain, the status response carries your SOCKS5 username and password.</p>
                            <div style={{ background: "var(--bg-primary)", padding: "16px", borderRadius: "8px", marginTop: "12px", fontFamily: "monospace", fontSize: "0.85rem", overflowX: "auto" }}>
                                <pre style={{ margin: 0, color: "var(--accent-primary)" }}>{`# Poll until status is "proxy_active":
curl https://api.proxybase.xyz/v1/orders/kQx7p3Wn/status \\
  -H "X-API-Key: pk_c8c91c8a0e5b3e2c..."

# Connect through the proxy:
curl --socks5-hostname username:password@api.proxybase.xyz:1080 \\
  https://api.ipify.org?format=json

# Rotate to a fresh IP on demand:
curl -X POST https://api.proxybase.xyz/v1/orders/kQx7p3Wn/rotate \\
  -H "X-API-Key: pk_c8c91c8a0e5b3e2c..."`}</pre>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PYTHON & NODE.JS INTEGRATION SNIPPET */}
                <section className="compare-deepdive-section" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                    <div className="section-header">
                        <span className="section-label">Code Examples</span>
                        <h2>Python and Node.js</h2>
                        <p className="section-desc">
                            Both examples assume credentials from the status call above. Python needs the SOCKS
                            extra installed: <code>pip install requests[socks]</code>.
                        </p>
                    </div>

                    <div className="deepdive-grid grid-2-cols">
                        <div className="deepdive-card">
                            <h3>Python (requests)</h3>
                            <div style={{ background: "var(--bg-primary)", padding: "16px", borderRadius: "8px", marginTop: "12px", fontFamily: "monospace", fontSize: "0.85rem", overflowX: "auto" }}>
                                <pre style={{ margin: 0, color: "var(--text-secondary)" }}>{`import requests

proxy = "socks5h://username:password@api.proxybase.xyz:1080"
proxies = {"http": proxy, "https": proxy}

r = requests.get("https://api.ipify.org?format=json", proxies=proxies, timeout=30)
print(r.json())`}</pre>
                            </div>
                        </div>

                        <div className="deepdive-card">
                            <h3>Node.js (axios + socks-proxy-agent)</h3>
                            <div style={{ background: "var(--bg-primary)", padding: "16px", borderRadius: "8px", marginTop: "12px", fontFamily: "monospace", fontSize: "0.85rem", overflowX: "auto" }}>
                                <pre style={{ margin: 0, color: "var(--text-secondary)" }}>{`import axios from 'axios';
import { SocksProxyAgent } from 'socks-proxy-agent';

const agent = new SocksProxyAgent(
  'socks5h://username:password@api.proxybase.xyz:1080'
);

const { data } = await axios.get('https://api.ipify.org?format=json', {
  httpAgent: agent,
  httpsAgent: agent,
});
console.log(data);`}</pre>
                            </div>
                        </div>
                    </div>
                </section>

                {/* COMPARISON TABLE */}
                <section className="compare-matrix-section" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                    <div className="section-header">
                        <span className="section-label">Provider Comparison</span>
                        <h2>Crypto Payments: ProxyBase vs. Major Providers</h2>
                        <p className="section-desc">
                            How crypto checkout, identity checks, and minimum commitments differ. Every provider here
                            accepts cards or wire. The question is whether crypto is a first-class payment path or a
                            bolt-on that still needs an account, and whether you must prove who you are before buying.
                        </p>
                    </div>

                    <div className="matrix-table-container">
                        <table className="compare-matrix-table">
                            <thead>
                                <tr>
                                    <th>Provider</th>
                                    <th>Crypto Architecture</th>
                                    <th>Mandatory KYC</th>
                                    <th>Minimum Spend</th>
                                    <th>Credit Expiration</th>
                                    <th>Programmatic IP Rotation</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="metric-name font-weight-bold" style={{ color: "var(--accent-primary)" }}>ProxyBase</td>
                                    <td className="text-emerald font-weight-bold">Crypto-Native (USDC, USDT, BTC, ETH, SOL)</td>
                                    <td className="text-emerald font-weight-bold">None (Wallet Only)</td>
                                    <td className="text-emerald font-weight-bold">Market rate from ~$3/GB, or $10 for a 1 GB package</td>
                                    <td className="text-emerald font-weight-bold">Packages never expire</td>
                                    <td className="text-emerald font-weight-bold">Yes (POST /rotate)</td>
                                </tr>
                                <tr>
                                    <td className="metric-name"><Link href="/compare/proxy-cheap" style={{ color: "inherit", textDecoration: "underline" }}>Proxy-Cheap</Link></td>
                                    <td>BTC, ETH, USDT at checkout (account required)</td>
                                    <td>Email account</td>
                                    <td>No advertised minimum</td>
                                    <td>Top-up packs up to 50 GB/mo</td>
                                    <td>Manual IP replacement</td>
                                </tr>
                                <tr>
                                    <td className="metric-name"><Link href="/compare/proxy-seller" style={{ color: "inherit", textDecoration: "underline" }}>Proxy-Seller</Link></td>
                                    <td>Checkout add-on</td>
                                    <td>Email account</td>
                                    <td>Per-plan</td>
                                    <td>Monthly or rental term</td>
                                    <td>Manual replacement</td>
                                </tr>
                                <tr>
                                    <td className="metric-name"><Link href="/compare/webshare" style={{ color: "inherit", textDecoration: "underline" }}>Webshare</Link></td>
                                    <td className="text-danger font-weight-bold">No native crypto (card/PayPal via Stripe)</td>
                                    <td>Card verification</td>
                                    <td>~$3.00/mo plans</td>
                                    <td>Monthly recurring</td>
                                    <td>Dashboard or API</td>
                                </tr>
                                <tr>
                                    <td className="metric-name"><Link href="/compare/oxylabs" style={{ color: "inherit", textDecoration: "underline" }}>Oxylabs</Link></td>
                                    <td>Cards via Stripe; wire on higher tiers</td>
                                    <td>Conditional (required for some targeting filters)</td>
                                    <td className="text-danger font-weight-bold">Plans from $30/mo (5 GB)</td>
                                    <td>Monthly</td>
                                    <td>Automatic gateway</td>
                                </tr>
                                <tr>
                                    <td className="metric-name"><Link href="/compare/brightdata" style={{ color: "inherit", textDecoration: "underline" }}>BrightData</Link></td>
                                    <td>Crypto listed in their docs; not confirmed at checkout</td>
                                    <td className="text-danger font-weight-bold">KYC required for residential</td>
                                    <td className="text-danger font-weight-bold">Pay-as-you-go from $8/GB, or $499+/mo tiers</td>
                                    <td>Monthly on volume tiers</td>
                                    <td>Rotating gateway</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="section-desc" style={{ marginTop: "1rem", fontSize: "0.85rem" }}>
                        Competitor details above were checked against each provider&apos;s published pricing and
                        documentation on 24 September 2026. Proxy vendors change prices and payment options often, so confirm current terms with the provider before you buy. ProxyBase market rates are dynamic and
                        move with supply; the fixed package prices are listed on the{" "}
                        <Link href="/mpp" style={{ color: "var(--accent-primary)" }}>package store</Link>.
                    </p>
                </section>

                {/* FAQ */}
                <section className="compare-deepdive-section" style={{ background: "var(--bg-secondary)" }}>
                    <div className="section-header">
                        <span className="section-label">FAQ</span>
                        <h2>Buying SOCKS5 Proxies with Crypto: Questions and Answers</h2>
                    </div>

                    <div className="deepdive-grid grid-2-cols">
                        <div className="deepdive-card">
                            <h3>Which cryptocurrencies can I pay with?</h3>
                            <p>
                                USDC, USDT, Bitcoin, Ethereum, and Solana. Stablecoins settle fastest and cost the
                                least in network fees, so they are the better default if your agent tops up often.
                                The full list is available from <code>GET /v1/currencies</code>.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <h3>Do I need to verify my identity?</h3>
                            <p>
                                No. There is no email, phone number, address, or document upload. Your wallet address
                                and API key are the whole account. See{" "}
                                <Link href="/no-kyc-proxy" style={{ color: "var(--accent-primary)" }}>how no-KYC access works</Link>.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <h3>How long until credentials are issued?</h3>
                            <p>
                                Provisioning runs automatically when the transaction confirms. Stablecoins on Tempo
                                and Solana typically confirm in seconds. Bitcoin and Ethereum wait on block
                                confirmation, so expect minutes rather than seconds.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <h3>Can an agent buy without a human?</h3>
                            <p>
                                Yes. Registration, ordering, status polling, and rotation are all headless HTTP
                                calls, and payment is a wallet signature, so nothing in the flow needs a browser or a
                                card. See{" "}
                                <Link href="/proxy-for-ai-agents" style={{ color: "var(--accent-primary)" }}>proxies for AI agents</Link>.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <h3>Does prepaid bandwidth expire?</h3>
                            <p>
                                No. A fixed package keeps its full balance until you transfer the data. This is the
                                main practical difference from monthly plans, which usually forfeit whatever you
                                did not use by the renewal date.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <h3>Which protocols are supported?</h3>
                            <p>
                                SOCKS5 (including authenticated SOCKS5) and HTTP/HTTPS, over residential and mobile
                                endpoints. IP rotation is available programmatically via{" "}
                                <code>POST /v1/orders/&#123;id&#125;/rotate</code>.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <h3>What if an invoice is underpaid?</h3>
                            <p>
                                Partial payments are recorded against the order and it stays open. Once the full
                                amount arrives, credentials are issued, so you do not have to start a new order.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <h3>Can I earn crypto by selling bandwidth instead?</h3>
                            <p>
                                Yes, that runs the other direction. On{" "}
                                <Link href="/markets" style={{ color: "var(--accent-primary)" }}>ProxyBase Markets</Link>{" "}
                                you run a seller node and earn per gigabyte relayed, paid in AlphaUSD or USDC.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CALL TO ACTION */}
                <section className="compare-cta-section">
                    <div className="cta-card">
                        <h2>Buy bandwidth with crypto, no card and no ID</h2>
                        <p>
                            Fixed packages from $10 for 1 GB, or pay the live market rate from about $3/GB.
                            Credentials are issued by the API as soon as the payment confirms.
                        </p>
                        <div className="cta-buttons">
                            <Link href="/mpp" className="btn-primary" data-umami-event="BuyWithCrypto: Bottom CTA">Browse Fixed Packages →</Link>
                            <Link href="/markets" className="btn-secondary" data-umami-event="BuyWithCrypto: Bottom Market CTA">See Market Rates</Link>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
