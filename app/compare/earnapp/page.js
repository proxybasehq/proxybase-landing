import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
    title: "EarnApp Review & Alternative — ProxyBase vs EarnApp Comparison (2026)",
    description: "Honest EarnApp review: how much you really earn, payout limits, and Bright Data connection. ProxyBase is the best EarnApp alternative — KYC-free, $1 cashout, up to 18x higher pay per GB.",
    keywords: "earnapp review, earnapp alternative, earnapp vs honeygain, proxybase vs earnapp, sell bandwidth, passive income, bandwidth sharing app, open source proxy client, kyc free proxy, proxybase, earnapp",
    alternates: {
        canonical: "/compare/earnapp",
    },
};

export default function CompareEarnAppPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "ProxyBase vs EarnApp Comparison",
        "description": "Comprehensive comparison of features, payouts, security, and privacy between ProxyBase and EarnApp.",
        "url": "https://proxybase.xyz/compare/earnapp"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
                            Side-by-Side Analysis
                        </div>
                        <h1>ProxyBase vs EarnApp</h1>
                        <p className="hero-subtitle">
                            A technical comparison between ProxyBase's open-source, wallet-native proxy marketplace and EarnApp's closed-source, time-based residential network.
                        </p>
                        <div className="hero-actions">
                            <a href="/markets" className="btn-primary">Become a Seller</a>
                            <a href="#matrix" className="btn-secondary">Compare Features ↓</a>
                        </div>
                    </div>
                </section>

                {/* THE CORE DIFFERENCE */}
                <section className="compare-intro-section">
                    <div className="intro-card-grid">
                        <div className="intro-card pb-card">
                            <div className="card-brand-header">
                                <span className="brand-logo-dot active" />
                                <h3>ProxyBase.xyz</h3>
                            </div>
                            <p className="brand-tagline">Open-Source & Privacy-First Marketplace</p>
                            <p className="brand-desc">
                                Built with developer transparency in mind. Run 100% open-source CLI/GUI nodes, earn high yields per GB transferred (up to $1.80–$3.00/GB depending on location), and cash out starting at a low $1 threshold without KYC.
                            </p>
                            <ul className="brand-bullets">
                                <li>⚡ Completely open-source clients (Rust CLI & Tauri GUI)</li>
                                <li>⚡ Low $1.00 minimum payout threshold</li>
                                <li>⚡ 100% KYC-free, secure wallet-native withdrawals</li>
                                <li>⚡ High performance-based yield (paid per GB consumed)</li>
                            </ul>
                        </div>

                        <div className="intro-card ir-card">
                            <div className="card-brand-header">
                                <span className="brand-logo-dot legacy" />
                                <h3>EarnApp</h3>
                            </div>
                            <p className="brand-tagline">Closed-Source Enterprise Aggregator</p>
                            <p className="brand-desc">
                                Managed by Bright Data, one of the largest residential proxy networks. EarnApp pays based on hours connected to their grid under strict requirements, but operates on closed-source binaries and enforces strict enterprise-linked compliance rules.
                            </p>
                            <ul className="brand-bullets">
                                <li>⚠️ Closed-source, proprietary binaries (un-auditable traffic routing)</li>
                                <li>⚠️ Higher payout thresholds ($2.50 manual, $10.00 auto-redeem)</li>
                                <li>⚠️ Backed by Bright Data with strict identity/compliance checks</li>
                                <li>⚠️ Time-based pay structures dependent on location and speed tiers</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* COMPARISON MATRIX */}
                <section className="compare-matrix-section" id="matrix">
                    <div className="section-header">
                        <span className="section-label">Technical Breakdown</span>
                        <h2>Comparison Matrix</h2>
                        <p className="section-desc">Compare the architecture, security, and payout terms side-by-side.</p>
                    </div>

                    <div className="matrix-table-container">
                        <table className="compare-matrix-table">
                            <thead>
                                <tr>
                                    <th>Metric / Feature</th>
                                    <th className="highlight-col">ProxyBase.xyz</th>
                                    <th>EarnApp</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="metric-name">Client Openness</td>
                                    <td className="highlight-col text-emerald font-weight-bold">100% Open Source (GitHub audited)</td>
                                    <td className="text-danger">Closed Source / Proprietary Binaries</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Minimum Payout</td>
                                    <td className="highlight-col text-emerald font-weight-bold">$1.00 (Instant microcredits)</td>
                                    <td>$2.50 (Manual) / $10.00 (Auto)</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">KYC & Registration</td>
                                    <td className="highlight-col font-weight-bold">No KYC (Anonymous Wallet Native)</td>
                                    <td className="text-danger">Enforced Bright Data Compliance Audits</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Payout Structure</td>
                                    <td className="highlight-col font-weight-bold">Pay-per-GB (up to $1.80 - $3.00/GB)</td>
                                    <td>Time-based hourly rate (up to $0.0138/hr in US)</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Withdrawal Channels</td>
                                    <td className="highlight-col font-weight-bold">Stablecoins (USDT/USDC) & Cryptocurrencies</td>
                                    <td>PayPal & Amazon Gift Cards</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Speed/Bandwidth Caps</td>
                                    <td className="highlight-col font-weight-bold">None (Scale dynamically on QoS)</td>
                                    <td className="text-danger">Strict speed tiers (requires 100 Mbps or more for max rate)</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Supported Environments</td>
                                    <td className="highlight-col font-weight-bold">Windows, macOS, Linux CLI, Docker</td>
                                    <td>Windows, macOS, Linux Docker, iOS (restricted)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* ARCHITECTURAL DEEP DIVE */}
                <section className="compare-deepdive-section">
                    <div className="section-header">
                        <span className="section-label">Architectural Deep Dive</span>
                        <h2>Key Technical Differences Explained</h2>
                        <p className="section-desc">ProxyBase is built with developer-level transparency, while traditional systems lock code in proprietary containers.</p>
                    </div>

                    <div className="deepdive-grid">
                        <div className="deepdive-card">
                            <div className="icon-wrapper">🔒</div>
                            <h3>1. Open-Source vs Proprietary Client</h3>
                            <p>
                                EarnApp runs closed-source client binaries on your hardware. Because their code is proprietary, you cannot inspect or audit what web traffic is routed through your home network. ProxyBase's daemon code is fully open-source on GitHub, ensuring no spyware, no background telemetry, and strictly sandboxed TCP routing.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <div className="icon-wrapper">💸</div>
                            <h3>2. Low-Barrier Payouts</h3>
                            <p>
                                EarnApp forces you to wait until you hit a $2.50 minimum payout for manual redemption, or $10.00 for automatic transfers. ProxyBase believes your earnings belong to you. We allow instant withdrawals in crypto/stablecoins starting at just $1.00, avoiding heavy payment fees.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <div className="icon-wrapper">🛡️</div>
                            <h3>3. True Privacy and No KYC</h3>
                            <p>
                                Through its connection to Bright Data, EarnApp operates under compliance regulations that reserve the right to verify user identities. ProxyBase is fully KYC-free: connect your cryptographic wallet, download the client, and start selling bandwidth anonymously.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <div className="icon-wrapper">⚡</div>
                            <h3>4. Per-GB vs Capped Time Payments</h3>
                            <p>
                                EarnApp capped hourly pay to protect their margins, paying up to $0.0138 per active hour in the US. ProxyBase pays directly for the bandwidth you route. Highly active nodes can maximize yields without arbitrary monthly earnings caps or network speed penalties.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CALL TO ACTION */}
                <section className="compare-cta-section">
                    <div className="cta-card">
                        <h2>Ready to Sell Bandwidth Securely?</h2>
                        <p>Ditch closed-source applications and high payout barriers. Launch a ProxyBase open-source node in minutes.</p>
                        <div className="cta-buttons">
                            <a href="/markets" className="btn-primary">Become a Seller</a>
                            <a href="https://github.com/proxybasehq/proxybase-gui" className="btn-secondary" target="_blank" rel="noopener noreferrer">Inspect the Source Code</a>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
