import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
    title: "Buy Proxy with Crypto — Bitcoin, USDC & USDT | ProxyBase",
    description: "Buy SOCKS5 proxies with crypto. Pay with Bitcoin, USDC, USDT, ETH or SOL — no card, no KYC, no bank. Instant proxy credentials, API-first provisioning for AI agents and developers.",
    keywords: "buy proxy with crypto, buy socks5 proxy with crypto, buy socks5 proxy with bitcoin, crypto proxy, anonymous proxy crypto, pay proxy with crypto, buy proxy with usdc, buy proxy with usdt, buy proxy no kyc, proxybase",
    alternates: {
        canonical: "/buy-with-crypto",
    },
    openGraph: {
        title: "Buy Proxies with Crypto — No Card, No KYC, Instant Access",
        description: "Pay with Bitcoin, USDC, USDT, ETH or SOL and get SOCKS5 proxy credentials in under 60 seconds. Crypto-native checkout for AI agents and developers.",
        url: "https://proxybase.xyz/buy-with-crypto",
        type: "website",
    },
};

export default function BuyWithCryptoPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Buy Proxy with Crypto — Bitcoin, USDC & USDT",
        "description": "Buy SOCKS5 proxy bandwidth with cryptocurrency. No card, no KYC. Instant provisioning for AI agents and developers.",
        "url": "https://proxybase.xyz/buy-with-crypto"
    };

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Which cryptocurrencies can I use to buy proxies?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "ProxyBase accepts USDC, USDT, BTC, ETH, and SOL. Stablecoins on Tempo (Solana) are the default for pay-as-you-go bandwidth packages via the Micropayments Protocol."
                }
            },
            {
                "@type": "Question",
                "name": "Is buying proxies with crypto anonymous?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "ProxyBase requires no KYC, no email, and no identity documents. Your wallet address is your account. Payment history lives on-chain; your identity lives nowhere."
                }
            },
            {
                "@type": "Question",
                "name": "How fast do I get proxy access after paying?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Once your payment is confirmed on-chain, proxy credentials are provisioned automatically — typically under 60 seconds. No manual review, no compliance queue."
                }
            },
            {
                "@type": "Question",
                "name": "Can an AI agent buy proxies with crypto autonomously?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. The entire flow is API-first: register an agent, create an order, pay the crypto invoice, and poll for SOCKS5 credentials. An LLM agent can complete it with no human in the loop — including via the ProxyBase MCP server."
                }
            },
            {
                "@type": "Question",
                "name": "Do other proxy providers accept crypto?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A few do, but crypto is usually a bolt-on payment method next to card and bank rails. ProxyBase is crypto-native: the blockchain is the entire checkout, which is why there is no KYC and no identity layer at all."
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
                        <div className="compare-badge">
                            Crypto-Native Checkout
                        </div>
                        <h1>Buy Proxies with Crypto — No Card, No KYC, Instant Access</h1>
                        <p className="hero-subtitle">
                            Pay with Bitcoin, USDC, USDT, ETH, or SOL and get SOCKS5 proxy credentials in under 60 seconds.
                            No credit card. No bank. No identity documents. Just a wallet address and an API call —
                            the checkout your AI agent can complete on its own.
                        </p>
                        <div className="hero-actions">
                            <a href="/mpp" className="btn-primary" data-umami-event="BuyWithCrypto: Store CTA">Buy Proxies with Crypto →</a>
                            <a href="#how-it-works" className="btn-secondary">How It Works ↓</a>
                        </div>
                    </div>
                </section>

                {/* WHY CRYPTO */}
                <section className="compare-intro-section" id="why-crypto">
                    <div className="section-header" style={{ marginBottom: "48px", textAlign: "center" }}>
                        <span className="section-label">The Payment Rail</span>
                        <h2>Why Buy Proxies with Crypto?</h2>
                        <p className="section-desc" style={{ maxWidth: "700px", margin: "0 auto" }}>
                            Most proxy providers bolt crypto onto a card-and-bank checkout. ProxyBase is the reverse: crypto is the only rail, and the architecture is better for it.
                        </p>
                    </div>

                    <div className="intro-card-grid">
                        <div className="intro-card ir-card">
                            <div className="card-brand-header">
                                <span className="brand-logo-dot legacy" />
                                <h3>Traditional Proxy Checkouts</h3>
                            </div>
                            <p className="brand-desc">
                                Card payments mean a billing name, a billing address, and a processor that can flag "high-risk" proxy purchases. Providers add KYC on top to protect themselves. The result: upload your passport, wait 2–14 days for compliance review, and hope your use case gets approved.
                            </p>
                            <ul className="brand-bullets">
                                <li>⚠️ Credit card or wire transfer required</li>
                                <li>⚠️ KYC documents and compliance reviews</li>
                                <li>⚠️ Your identity linked to your proxy traffic</li>
                                <li>⚠️ Multi-day activation times</li>
                            </ul>
                        </div>

                        <div className="intro-card pb-card">
                            <div className="card-brand-header">
                                <span className="brand-logo-dot active" />
                                <h3>ProxyBase Crypto Checkout</h3>
                            </div>
                            <p className="brand-desc">
                                Your wallet address is your account. You send crypto to a payment address, the transaction is verified on-chain, and proxy credentials are provisioned automatically. There is no identity layer because the architecture never needed one — the blockchain confirms the payment, and the network routes your traffic.
                            </p>
                            <ul className="brand-bullets">
                                <li>⚡ Pay with USDC, USDT, BTC, ETH, or SOL</li>
                                <li>⚡ No name, email, phone number, or documents</li>
                                <li>⚡ Proxy access in under 60 seconds, fully automated</li>
                                <li>⚡ API-first: your agent can pay and provision on its own</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ACCEPTED CURRENCIES */}
                <section className="compare-deepdive-section" style={{ background: "var(--bg-secondary)" }}>
                    <div className="section-header">
                        <span className="section-label">Accepted</span>
                        <h2>Which Crypto Can You Pay With?</h2>
                        <p className="section-desc">Pay-as-you-go bandwidth packages with stablecoins on Tempo, or direct crypto invoices.</p>
                    </div>

                    <div className="deepdive-grid">
                        <div className="deepdive-card">
                            <div className="icon-wrapper">💵</div>
                            <h3>USDC / USDT (Tempo)</h3>
                            <p>
                                Stablecoins on the Tempo chain (Solana) power the Micropayments Protocol store. Buy SOCKS5 bandwidth packages with a single request — no accounts, no API keys, no volatility.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <div className="icon-wrapper">₿</div>
                            <h3>Bitcoin (BTC)</h3>
                            <p>
                                The classic anonymous rail. Create an order, send BTC to the invoice address, and your proxy activates when the payment confirms.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <div className="icon-wrapper">Ξ</div>
                            <h3>Ethereum (ETH)</h3>
                            <p>
                                Same flow as BTC — an on-chain invoice, automatic confirmation, instant provisioning. No account registration anywhere in the loop.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <div className="icon-wrapper">◎</div>
                            <h3>Solana (SOL)</h3>
                            <p>
                                Fast confirmations and near-zero fees make SOL the cheapest rail for small top-ups. Ideal when your agent needs to recharge bandwidth mid-task.
                            </p>
                        </div>
                    </div>
                </section>

                {/* HOW IT WORKS */}
                <section className="compare-deepdive-section" id="how-it-works" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                    <div className="section-header">
                        <span className="section-label">How It Works</span>
                        <h2>Buy a Proxy with Crypto in 3 Steps</h2>
                    </div>

                    <div className="deepdive-grid">
                        <div className="deepdive-card">
                            <div className="icon-wrapper">1</div>
                            <h3>Register Your Agent via API</h3>
                            <p>
                                One POST request. No parameters required. You get back an agent_id and API key instantly — no signup form, no email verification, no identity check.
                            </p>
                            <div style={{ background: "var(--bg-primary)", padding: "12px 16px", borderRadius: "6px", marginTop: "12px", fontFamily: "monospace", fontSize: "0.85rem" }}>
                                curl -X POST https://api.proxybase.xyz/v1/agents
                            </div>
                        </div>

                        <div className="deepdive-card">
                            <div className="icon-wrapper">2</div>
                            <h3>Create Order & Pay the Crypto Invoice</h3>
                            <p>
                                Pick a package, choose your currency, and send crypto to the invoice address. Your payment is verified on-chain. No bank, no processor, no identity check.
                            </p>
                            <div style={{ background: "var(--bg-primary)", padding: "12px 16px", borderRadius: "6px", marginTop: "12px", fontFamily: "monospace", fontSize: "0.85rem" }}>
                                curl -X POST https://api.proxybase.xyz/v1/orders \<br />
                                &nbsp;&nbsp;-H "X-API-Key: pk_..." \<br />
                                &nbsp;&nbsp;-d '{`{"package_id":"res_5gb","pay_currency":"usdcsol"}`}'
                            </div>
                        </div>

                        <div className="deepdive-card">
                            <div className="icon-wrapper">3</div>
                            <h3>Get SOCKS5 Credentials</h3>
                            <p>
                                Poll your order status. Once payment is confirmed on-chain, your proxy is provisioned automatically. Connect via SOCKS5 and start routing traffic through residential IPs.
                            </p>
                            <div style={{ background: "var(--bg-primary)", padding: "12px 16px", borderRadius: "6px", marginTop: "12px", fontFamily: "monospace", fontSize: "0.85rem" }}>
                                socks5://username:password@api.proxybase.xyz:1080
                            </div>
                        </div>
                    </div>
                </section>

                {/* COMPARISON TABLE */}
                <section className="compare-matrix-section" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                    <div className="section-header">
                        <span className="section-label">The Reality</span>
                        <h2>Crypto Payments: ProxyBase vs. Major Providers</h2>
                        <p className="section-desc">Most "crypto accepted" claims in the proxy industry come with strings attached. Compare the actual rails.</p>
                    </div>

                    <div className="matrix-table-container">
                        <table className="compare-matrix-table">
                            <thead>
                                <tr>
                                    <th>Provider</th>
                                    <th>Crypto Accepted?</th>
                                    <th>KYC Required?</th>
                                    <th>Time to Access</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="metric-name font-weight-bold" style={{ color: "var(--accent-primary)" }}>ProxyBase</td>
                                    <td className="text-emerald font-weight-bold">Crypto-native. USDC, USDT, BTC, ETH, SOL</td>
                                    <td className="text-emerald font-weight-bold">No. Wallet address only.</td>
                                    <td className="text-emerald font-weight-bold">Under 60 seconds</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Proxy-Seller</td>
                                    <td>Yes, as an add-on method</td>
                                    <td>Email registration</td>
                                    <td>Under 5 minutes</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">IPRoyal</td>
                                    <td>Yes, as an add-on method</td>
                                    <td>Minimal</td>
                                    <td>Under 5 minutes</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">BrightData</td>
                                    <td className="text-danger font-weight-bold">No</td>
                                    <td className="text-danger font-weight-bold">Yes, mandatory</td>
                                    <td>2–14 days</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Oxylabs</td>
                                    <td className="text-danger font-weight-bold">No</td>
                                    <td className="text-danger font-weight-bold">Yes, mandatory</td>
                                    <td>3–14 days</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Webshare</td>
                                    <td className="text-danger font-weight-bold">No</td>
                                    <td>Minimal</td>
                                    <td>Under 5 minutes</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* FAQ */}
                <section className="compare-deepdive-section" style={{ background: "var(--bg-secondary)" }}>
                    <div className="section-header">
                        <span className="section-label">Questions</span>
                        <h2>Buying Proxies with Crypto — FAQ</h2>
                    </div>

                    <div className="deepdive-grid grid-2-cols">
                        <div className="deepdive-card">
                            <h3>Which cryptocurrencies can I use to buy proxies?</h3>
                            <p>
                                ProxyBase accepts USDC, USDT, BTC, ETH, and SOL. Stablecoins on Tempo (Solana) are the default for pay-as-you-go bandwidth packages via the Micropayments Protocol.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <h3>Is buying proxies with crypto anonymous?</h3>
                            <p>
                                ProxyBase requires <a href="/no-kyc-proxy" style={{ color: "var(--accent-primary)" }}>no KYC</a>, no email, and no identity documents. Your wallet address is your account. Payment history lives on-chain; your identity lives nowhere.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <h3>How fast do I get proxy access after paying?</h3>
                            <p>
                                Once your payment is confirmed on-chain, proxy credentials are provisioned automatically — typically under 60 seconds. No manual review, no compliance queue.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <h3>Can an AI agent buy proxies with crypto autonomously?</h3>
                            <p>
                                Yes. The entire flow is API-first: register an agent, create an order, pay the crypto invoice, and poll for SOCKS5 credentials. An LLM agent can complete it with no human in the loop — including via the ProxyBase MCP server. See <a href="/proxy-for-ai-agents" style={{ color: "var(--accent-primary)" }}>our guide to proxies for AI agents</a>.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <h3>Do other proxy providers accept crypto?</h3>
                            <p>
                                A few do, but crypto is usually a bolt-on payment method next to card and bank rails. ProxyBase is crypto-native: the blockchain is the entire checkout, which is why there is no KYC and no identity layer at all.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <h3>Is there a minimum purchase?</h3>
                            <p>
                                No. Pay-as-you-go packages start at a few dollars of bandwidth with no monthly commitment. Credits never expire.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CALL TO ACTION */}
                <section className="compare-cta-section">
                    <div className="cta-card">
                        <h2>Pay with Crypto. Get Proxies in 60 Seconds.</h2>
                        <p>No card. No KYC. No waiting. Buy SOCKS5 proxy bandwidth with USDC, USDT, BTC, ETH, or SOL.</p>
                        <div className="cta-buttons">
                            <a href="/mpp" className="btn-primary" data-umami-event="BuyWithCrypto: Bottom CTA">Buy Proxies with Crypto →</a>
                            <a href="/ai-agents#api" className="btn-secondary">Read the API Docs</a>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
