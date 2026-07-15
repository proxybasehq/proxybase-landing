import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
    title: "Technical Comparison: ProxyBase vs PacketStream Bandwidth Monetization",
    description: "An objective side-by-side comparison of ProxyBase and PacketStream. Learn about differences in architecture, open-source client options, payout mechanisms, and resource monetization rates.",
    keywords: "proxybase vs packetstream, bandwidth sharing, proxy architecture, residential proxy seller, open source proxy client, packetstream review",
    alternates: {
        canonical: "/compare/packetstream",
    },
};

export default function ComparePacketStreamPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "ProxyBase vs PacketStream Technical Comparison",
        "description": "An objective comparison of features, architecture, and network parameters between ProxyBase and PacketStream.",
        "url": "https://proxybase.xyz/compare/packetstream"
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
                            Technical Review
                        </div>
                        <h1>Technical Comparison: ProxyBase & PacketStream</h1>
                        <p className="hero-subtitle">
                            A detailed analysis of network architecture, open-source compliance, privacy standards, and bandwidth monetization mechanics.
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
                            <p className="brand-tagline">Open-Source Developer-Focused Network</p>
                            <p className="brand-desc">
                                Designed for network transparency and developer control. Yields adjust dynamically based on regional supply and buyer demand, supporting rates up to $1.80/GB (Residential) or $3.00/GB (Mobile). Features fully open-source clients and wallet-native verification.
                            </p>
                            <ul className="brand-bullets">
                                <li>⚡ Variable market-rate routing ($1.80/GB residential, $3.00/GB mobile in high-demand areas)</li>
                                <li>⚡ Standard $1.00 payout minimum processed directly via stablecoins</li>
                                <li>⚡ Auditable open-source GUI and CLI client configurations</li>
                                <li>⚡ Cryptographic wallet-based authentication preserving network privacy</li>
                             </ul>
                        </div>

                        <div className="intro-card ir-card">
                            <div className="card-brand-header">
                                <span className="brand-logo-dot legacy" />
                                <h3>PacketStream</h3>
                            </div>
                            <p className="brand-tagline">Minimalist Flat-Rate Marketplace</p>
                            <p className="brand-desc">
                                A simplified peer-to-peer sharing system allowing users to sell bandwidth under a single flat rate model. It relies on standard account-based credentials and proprietary software clients.
                            </p>
                            <ul className="brand-bullets">
                                <li>⚠️ Flat rate of $0.10 per GB shared across all global regions</li>
                                <li>⚠️ Standard $5.00 cashout threshold with a 3% transaction fee</li>
                                <li>⚠️ Proprietary closed-source client applications</li>
                                <li>⚠️ Traffic volume relies on centralized network allocation tables</li>
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
                                    <th>PacketStream</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="metric-name">Seller Yield (US Residential)</td>
                                    <td className="highlight-col text-emerald font-weight-bold">$1.80 / GB (Dynamic market rates)</td>
                                    <td className="text-danger">$0.10 / GB (Flat rate)</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Seller Yield (US Mobile)</td>
                                    <td className="highlight-col text-emerald font-weight-bold">$3.00 / GB (Dynamic market rates)</td>
                                    <td className="text-danger">$0.10 / GB (Flat rate)</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Minimum Payout</td>
                                    <td className="highlight-col text-emerald font-weight-bold">$1.00 (Stablecoin settlement)</td>
                                    <td>$5.00 (Traditional payout)</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Cashout Fees</td>
                                    <td className="highlight-col text-emerald font-weight-bold">None (Standard gas network transaction costs only)</td>
                                    <td className="text-danger">Flat 3% payment processor fee</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Client Openness</td>
                                    <td className="highlight-col text-emerald font-weight-bold">100% Open Source (Public repository)</td>
                                    <td className="text-danger">Closed Source / Proprietary Executables</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">KYC & Registration</td>
                                    <td className="highlight-col font-weight-bold">Cryptographic authentication (Wallet native)</td>
                                    <td>Traditional email-based account system</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Telemetry & Dashboards</td>
                                    <td className="highlight-col font-weight-bold">Open REST/gRPC endpoints & desktop logs</td>
                                    <td>Central web panel interface</td>
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
                        <p className="section-desc">Why running open-source code and routing via a dynamic marketplace impacts yields and security.</p>
                    </div>

                    <div className="deepdive-grid">
                        <div className="deepdive-card">
                            <div className="icon-wrapper">🚀</div>
                            <h3>1. Dynamic Pricing Marketplace vs. Flat-Rate Model</h3>
                            <p>
                                PacketStream allocates bandwidth under a flat pricing model ($0.10/GB) across all geographies. ProxyBase implements a demand-driven pricing engine. Since web scrapers and corporate buyers value verified US/EU residential and mobile IPs, ProxyBase allows nodes in these regions to capture premium rates, paying up to $1.80/GB for residential and $3.00/GB for mobile connections.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <div className="icon-wrapper">🔒</div>
                            <h3>2. Open-Source Auditing vs. Closed-Source Daemons</h3>
                            <p>
                                PacketStream operates via a proprietary background daemon. The closed-source nature makes it difficult to audit the exact API routing and telemetry performed on host hardware. ProxyBase CLI and GUI clients are fully open-source, allowing operators to monitor node behavior, traffic patterns, and yamux stream connections.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <div className="icon-wrapper">💸</div>
                            <h3>3. Micro-Settlements and Fee Structures</h3>
                            <p>
                                PacketStream uses traditional payment processors requiring a minimum $5.00 cashout with a flat 3% fee structure. ProxyBase relies on cryptographic stablecoin transactions (USDT/USDC), enabling micro-settlements starting at just $1.00 without platform fees, subject only to standard network gas fees.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <div className="icon-wrapper">🛡️</div>
                            <h3>4. Cryptographic Authentication vs. Traditional Accounts</h3>
                            <p>
                                PacketStream accounts link physical email and payment credentials with the routing node. ProxyBase leverages cryptographic keys and Web3-compatible wallet setups. Host identity is represented solely by a public key, ensuring node operational logs are decoupled from real-world identities.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CALL TO ACTION */}
                <section className="compare-cta-section">
                    <div className="cta-card">
                        <h2>Compare and Choose the Right Node Architecture</h2>
                        <p>Evaluate resource monetization models and deploy a node based on your security and routing requirements.</p>
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
