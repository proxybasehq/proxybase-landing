import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
    title: "ProxyBase vs PacketStream — Side-by-Side Bandwidth Sharing Comparison",
    description: "Compare ProxyBase and PacketStream. Discover why ProxyBase's KYC-free model, $1 minimum payout, open-source clients, and 18x higher yields beat PacketStream.",
    keywords: "proxybase vs packetstream, packetstream alternative, sell bandwidth, passive income, open source proxy client, kyc free proxy, proxybase, packetstream",
    alternates: {
        canonical: "/compare/packetstream",
    },
};

export default function ComparePacketStreamPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "ProxyBase vs PacketStream Comparison",
        "description": "Comprehensive comparison of features, payouts, security, and yield rates between ProxyBase and PacketStream.",
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
                            Side-by-Side Analysis
                        </div>
                        <h1>ProxyBase vs PacketStream</h1>
                        <p className="hero-subtitle">
                            A detailed comparison between ProxyBase's high-yield open-source marketplace and PacketStream's low-yield flat-rate proxy network.
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
                                Built for maximum security and node yield. Earn up to $1.80/GB (Residential) or $3.00/GB (Mobile) in major regions, run 100% open-source audited clients, and cash out stablecoins starting at just $1.00.
                            </p>
                            <ul className="brand-bullets">
                                <li>⚡ High yields based on supply/demand (up to $1.80 - $3.00/GB in the US)</li>
                                <li>⚡ Low $1.00 minimum payout threshold with no hidden platform fees</li>
                                <li>⚡ 100% open-source GUI and CLI clients (fully auditable code)</li>
                                <li>⚡ Completely anonymous, KYC-free wallet-native authentication</li>
                             </ul>
                        </div>

                        <div className="intro-card ir-card">
                            <div className="card-brand-header">
                                <span className="brand-logo-dot legacy" />
                                <h3>PacketStream</h3>
                            </div>
                            <p className="brand-tagline">Minimalist Flat-Rate Marketplace</p>
                            <p className="brand-desc">
                                A simple peer-to-peer proxy model that lets users sell bandwidth as "Packeters". It offers a single uniform rate of $0.10/GB globally but keeps all clients closed-source and enforces standard payment accounts with flat transaction fees.
                            </p>
                            <ul className="brand-bullets">
                                <li>⚠️ Flat $0.10 per GB shared globally (very low compared to market value)</li>
                                <li>⚠️ Higher $5.00 minimum threshold with a flat 3% cashout fee</li>
                                <li>⚠️ Closed-source, proprietary binaries (cannot audit background traffic)</li>
                                <li>⚠️ Earning volume depends strictly on regional buyer demand</li>
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
                                    <td className="highlight-col text-emerald font-weight-bold">$1.80 / GB (18x higher yield)</td>
                                    <td className="text-danger">$0.10 / GB</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Seller Yield (US Mobile)</td>
                                    <td className="highlight-col text-emerald font-weight-bold">$3.00 / GB (30x higher yield)</td>
                                    <td className="text-danger">$0.10 / GB</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Minimum Payout</td>
                                    <td className="highlight-col text-emerald font-weight-bold">$1.00 (Instant microcredits)</td>
                                    <td>$5.00</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Cashout Fees</td>
                                    <td className="highlight-col text-emerald font-weight-bold">None (Standard gas only)</td>
                                    <td className="text-danger">Flat 3% payout fee</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Client Openness</td>
                                    <td className="highlight-col text-emerald font-weight-bold">100% Open Source (GitHub audited)</td>
                                    <td className="text-danger">Closed Source / Proprietary Binaries</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">KYC & Registration</td>
                                    <td className="highlight-col font-weight-bold">No KYC (Anonymous Wallet Native)</td>
                                    <td>Traditional Email/Password Accounts</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Telemetry & Dashboards</td>
                                    <td className="highlight-col font-weight-bold">Advanced Open REST/gRPC & Tauri map</td>
                                    <td>Minimalistic Web Dashboard telemetry</td>
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
                        <p className="section-desc">Why running open-source code yields higher payouts and keeps your local network safe.</p>
                    </div>

                    <div className="deepdive-grid">
                        <div className="deepdive-card">
                            <div className="icon-wrapper">🚀</div>
                            <h3>1. 18x to 30x Higher Bandwidth Yield</h3>
                            <p>
                                PacketStream pays a completely flat $0.10 per GB shared, regardless of where your node is located. Because major proxy buyers value US and EU residential addresses highly, ProxyBase routes these at premium rates, passing up to $1.80/GB for residential and $3.00/GB for mobile connections directly back to you.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <div className="icon-wrapper">🔒</div>
                            <h3>2. Open-Source vs Proprietary CLI/GUI</h3>
                            <p>
                                PacketStream is a minimalist app that requires running a closed-source daemon on Windows, macOS, or Linux. Since the daemon is proprietary, you cannot monitor what third-party API queries are executing on your hardware. ProxyBase's complete stack is open-source, giving you transparency over all yamux bridges.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <div className="icon-wrapper">💸</div>
                            <h3>3. Low $1 Minimum Payout & No Payout Fees</h3>
                            <p>
                                PacketStream imposes a $5.00 cashout limit and deducts a flat 3% platform fee from your earnings. ProxyBase allows you to cash out your balance starting at just $1.00 directly to stablecoins (USDT/USDC) with zero middleman fees.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <div className="icon-wrapper">🛡️</div>
                            <h3>4. KYC-Free Wallet Authentication</h3>
                            <p>
                                PacketStream utilizes email-based accounts that link your real-world billing/payment details to your network node. ProxyBase uses native cryptographic wallet authentication (Socks5/Web3 compatible). Your node logs are tied to an anonymous public key, preserving your home network privacy.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CALL TO ACTION */}
                <section className="compare-cta-section">
                    <div className="cta-card">
                        <h2>Stop Sharing Bandwidth for $0.10/GB</h2>
                        <p>Unlock real market rates on your home or mobile connection. Deploy a ProxyBase open-source node now.</p>
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
