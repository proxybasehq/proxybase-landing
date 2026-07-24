import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
    title: "Sell Internet Bandwidth & Earn Passive Income — ProxyBase",
    description: "Learn how to sell your unused internet bandwidth for passive income. ProxyBase is the KYC-free, open-source bandwidth sharing app — $1 minimum payout, up to $3/GB.",
    keywords: "sell internet bandwidth, how to sell internet bandwidth, make money sharing internet, share internet earn money, bandwidth sharing app, best bandwidth sharing app, passive income sharing internet, sell unused internet, sell bandwidth online, passive income app, honeygain alternative, earnapp alternative, proxybase",
    alternates: {
        canonical: "/earn/sell-internet",
    },
};

export default function SellInternetPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Sell Internet Bandwidth for Passive Income",
        "description": "Turn your unused internet bandwidth into passive income by running ProxyBase's open-source node. No KYC required, $1 minimum payout.",
        "url": "https://proxybase.xyz/earn/sell-internet",
        "step": [
            {
                "@type": "HowToStep",
                "position": 1,
                "name": "Download the app",
                "text": "Download the free ProxyBase client for Windows, macOS, Linux, or Android."
            },
            {
                "@type": "HowToStep",
                "position": 2,
                "name": "Share your bandwidth",
                "text": "Run the app in the background. It securely routes SOCKS5 traffic through your idle connection."
            },
            {
                "@type": "HowToStep",
                "position": 3,
                "name": "Cash out",
                "text": "Withdraw your earnings instantly to your crypto wallet starting at $1.00."
            }
        ]
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
                            Passive Income — No KYC Required
                        </div>
                        <h1>Sell Your Internet Bandwidth & Earn Passive Income</h1>
                        <p className="hero-subtitle">
                            Learn how to sell internet bandwidth and make money sharing internet from your phone, laptop, or home server. ProxyBase pays up to $1.80–$3.00/GB — 18x more than Honeygain and EarnApp. Open-source, KYC-free, $1 minimum cashout.
                        </p>
                        <div className="hero-actions">
                            <a href="/markets" className="btn-primary">Start Earning Now</a>
                            <a href="#how-to-sell" className="btn-secondary">How It Works ↓</a>
                        </div>
                    </div>
                </section>

                {/* HOW TO SELL INTERNET BANDWIDTH — THE GUIDE */}
                <section className="compare-intro-section" id="how-to-sell">
                    <div className="section-header" style={{ marginBottom: "48px", textAlign: "center" }}>
                        <span className="section-label">Step-by-Step Guide</span>
                        <h2>How to Sell Internet Bandwidth for Passive Income</h2>
                        <p className="section-desc" style={{ maxWidth: "700px", margin: "0 auto" }}>
                            Your internet connection is an untapped asset. Most plans come with unlimited data, but 80% of your bandwidth sits idle. Here's how to turn that into real income — no clicking ads, no surveys, no daily tasks.
                        </p>
                    </div>

                    <div className="intro-card-grid">
                        <div className="intro-card pb-card">
                            <div className="card-brand-header">
                                <span className="brand-logo-dot active" />
                                <h3>What Is Bandwidth Sharing?</h3>
                            </div>
                            <p className="brand-desc">
                                Bandwidth sharing apps connect your unused internet to businesses that need residential IPs — AI developers running web scraping jobs, ad verification companies, and researchers who need real consumer IP addresses instead of flagged datacenter IPs. You share your connection; they pay for access. That's it.
                            </p>
                            <ul className="brand-bullets">
                                <li>⚡ Runs silently in the background on any device</li>
                                <li>⚡ No effect on your browsing speed or latency</li>
                                <li>⚡ Set daily bandwidth limits to stay within your data cap</li>
                            </ul>
                        </div>

                        <div className="intro-card ir-card">
                            <div className="card-brand-header">
                                <span className="brand-logo-dot legacy" />
                                <h3>Why ProxyBase Pays More</h3>
                            </div>
                            <p className="brand-desc">
                                Most bandwidth sharing apps like Honeygain and EarnApp pay a flat, low rate regardless of demand. ProxyBase operates a marketplace where AI developers and scrapers bid for bandwidth in real time. US residential IPs are the most in-demand — earning you up to $3.00/GB compared to Honeygain's $0.10/GB.
                            </p>
                            <ul className="brand-bullets">
                                <li>⚡ Market-driven rates: up to $3.00/GB vs $0.10/GB on other apps</li>
                                <li>⚡ 100% open-source clients (Rust CLI & Tauri GUI)</li>
                                <li>⚡ KYC-free: no identity verification, no documents</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 3 STEPS */}
                <section className="compare-deepdive-section" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
                    <div className="section-header">
                        <span className="section-label">Quick Start</span>
                        <h2>Start Selling Bandwidth in 3 Simple Steps</h2>
                        <p className="section-desc">Set up in under 5 minutes. No technical skills needed.</p>
                    </div>

                    <div className="deepdive-grid">
                        <div className="deepdive-card">
                            <div className="icon-wrapper">📥</div>
                            <h3>1. Download the App</h3>
                            <p>
                                Get the free, open-source ProxyBase client for Windows, macOS, Linux, or Android. The app is lightweight (written in Rust) and requires zero configuration to start.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <div className="icon-wrapper">🌐</div>
                            <h3>2. Share Your Unused Bandwidth</h3>
                            <p>
                                Run the app in the background. It bridges secure SOCKS5 traffic through an encrypted yamux tunnel. Your personal files, browsing history, and local network stay completely private.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <div className="icon-wrapper">💰</div>
                            <h3>3. Cash Out at $1.00</h3>
                            <p>
                                Track your earnings in real time. Once you reach $1.00, withdraw instantly to your crypto wallet in stablecoins (USDT/USDC). No waiting for $20 minimums like other apps.
                            </p>
                        </div>
                    </div>
                </section>

                {/* HOW MUCH CAN YOU EARN — EXPANDED TABLE */}
                <section className="compare-matrix-section" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                    <div className="section-header">
                        <span className="section-label">Earnings Comparison</span>
                        <h2>How Much Money Can You Make Sharing Internet?</h2>
                        <p className="section-desc">ProxyBase delivers up to 30x higher payouts than traditional bandwidth sharing apps. Here's the comparison.</p>
                    </div>

                    <div className="matrix-table-container">
                        <table className="compare-matrix-table">
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    <th className="highlight-col">ProxyBase</th>
                                    <th>Honeygain</th>
                                    <th>EarnApp</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="metric-name">US Residential Rate (per GB)</td>
                                    <td className="highlight-col text-emerald font-weight-bold">$1.80 – $3.00 / GB</td>
                                    <td>$0.10 / GB</td>
                                    <td>~$0.10 / GB (time-based)</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Mobile (4G/5G) Rate</td>
                                    <td className="highlight-col text-emerald font-weight-bold">Up to $3.00 / GB</td>
                                    <td>$0.10 / GB</td>
                                    <td>Same as residential</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Minimum Payout</td>
                                    <td className="highlight-col text-emerald font-weight-bold">$1.00 (Stablecoins)</td>
                                    <td className="text-danger">$20.00 (PayPal)</td>
                                    <td className="text-danger">$2.50 manual / $10.00 auto</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Source Code</td>
                                    <td className="highlight-col text-emerald font-weight-bold">100% Open Source</td>
                                    <td className="text-danger">Closed Source</td>
                                    <td className="text-danger">Closed Source (Bright Data)</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Identity Verification</td>
                                    <td className="highlight-col text-emerald font-weight-bold">None (KYC-Free)</td>
                                    <td>Email required</td>
                                    <td className="text-danger">Bright Data compliance checks</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Payout Method</td>
                                    <td className="highlight-col font-weight-bold">USDT, USDC, Crypto</td>
                                    <td>PayPal, gift cards</td>
                                    <td>PayPal, Amazon gift cards</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Multi-Device Support</td>
                                    <td className="highlight-col text-emerald font-weight-bold">Unlimited (separate IPs)</td>
                                    <td>1 device per IP</td>
                                    <td>1 device per IP</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Bandwidth Caps</td>
                                    <td className="highlight-col font-weight-bold">None (set your own limit)</td>
                                    <td>15 GB/month cap</td>
                                    <td>Speed-tiered caps</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* ALL BANDWIDTH SHARING APPS COMPARED */}
                <section className="compare-deepdive-section" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
                    <div className="section-header">
                        <span className="section-label">App Comparison</span>
                        <h2>Best Bandwidth Sharing Apps Compared</h2>
                        <p className="section-desc">A quick overview of every major bandwidth sharing app and how ProxyBase stacks up.</p>
                    </div>

                    <div className="deepdive-grid">
                        <div className="deepdive-card">
                            <h3>ProxyBase vs. Honeygain</h3>
                            <p>
                                Honeygain is the most popular bandwidth sharing app but pays a flat $0.10/GB with a $20 minimum payout. ProxyBase pays up to 30x more with a $1 cashout, is fully open-source, and requires no KYC.
                            </p>
                            <a href="/compare/honeygain" style={{ color: "var(--accent-primary)", fontWeight: 600 }}>Full comparison →</a>
                        </div>

                        <div className="deepdive-card">
                            <h3>ProxyBase vs. EarnApp</h3>
                            <p>
                                EarnApp is backed by Bright Data and pays based on time connected rather than data used — capping your earnings at ~$0.0138/hour in the US. ProxyBase pays per GB actually routed, with no hourly caps.
                            </p>
                            <a href="/compare/earnapp" style={{ color: "var(--accent-primary)", fontWeight: 600 }}>Full comparison →</a>
                        </div>

                        <div className="deepdive-card">
                            <h3>ProxyBase vs. Pawns.app</h3>
                            <p>
                                Pawns.app (IPRoyal Pawns) pays $0.20/GB for bandwidth sharing. ProxyBase pays up to 9x more for the same residential traffic, with instant crypto payouts instead of waiting for PayPal thresholds.
                            </p>
                            <a href="/compare/pawns" style={{ color: "var(--accent-primary)", fontWeight: 600 }}>Full comparison →</a>
                        </div>

                        <div className="deepdive-card">
                            <h3>ProxyBase vs. PacketStream</h3>
                            <p>
                                PacketStream offers $0.10/GB with a $5 minimum payout and supports PayPal only. ProxyBase offers higher rates, lower minimums, and stablecoin payouts with fully auditable open-source code.
                            </p>
                            <a href="/compare/packetstream" style={{ color: "var(--accent-primary)", fontWeight: 600 }}>Full comparison →</a>
                        </div>

                        <div className="deepdive-card">
                            <h3>ProxyBase vs. TraffMonetizer</h3>
                            <p>
                                TraffMonetizer pays for bandwidth sharing but operates on closed-source binaries with unpredictable rates. ProxyBase offers transparent, market-driven pricing with open-source clients you can audit.
                            </p>
                            <a href="/compare/traffmonetizer" style={{ color: "var(--accent-primary)", fontWeight: 600 }}>Full comparison →</a>
                        </div>

                        <div className="deepdive-card">
                            <h3>Also Consider: ProxyBase for Proxy Buyers</h3>
                            <p>
                                Need residential proxies instead of selling bandwidth? ProxyBase is a full marketplace. Buy pay-as-you-go residential and mobile proxies with crypto — no KYC, credits never expire.
                            </p>
                            <a href="/mpp" style={{ color: "var(--accent-primary)", fontWeight: 600 }}>Browse proxy packages →</a>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="compare-deepdive-section" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                    <div className="section-header">
                        <span className="section-label">Got Questions?</span>
                        <h2>Frequently Asked Questions About Selling Bandwidth</h2>
                        <p className="section-desc">Everything you need to know about selling your internet bandwidth safely and profitably.</p>
                    </div>

                    <div className="deepdive-grid grid-2-cols">
                        <div className="deepdive-card">
                            <h3>How do I sell my internet bandwidth?</h3>
                            <p>
                                Download the free ProxyBase app, run it in the background, and let it securely share your unused internet connection with trusted business partners. Track your earnings in real time and cash out starting at $1.00 in stablecoins.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <h3>What is the best app to sell internet data?</h3>
                            <p>
                                ProxyBase is the highest-paying bandwidth sharing app for tech-savvy users. While Honeygain and EarnApp pay flat rates around $0.10/GB, ProxyBase's marketplace model pays up to $3.00/GB for US residential IPs — and you can cash out at just $1.00.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <h3>Can I really make money sharing my internet?</h3>
                            <p>
                                Yes. While it won't replace a full-time job, users typically earn $15–$40/month per device depending on location and demand. US and UK residential IPs earn the most. Running multiple devices on separate IPs multiplies your income.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <h3>Is selling my bandwidth safe?</h3>
                            <p>
                                With ProxyBase, yes. Our client is 100% open-source on GitHub — you can audit exactly how it works. All traffic is routed through encrypted Yamux tunnels in a sandboxed environment. We never access your personal files, browser history, or local network.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <h3>How much data does bandwidth sharing use?</h3>
                            <p>
                                Data usage is demand-driven. Corporate AI developers and web scrapers query routes dynamically. ProxyBase lets you set strict daily or monthly bandwidth limits so you never exceed your data cap. On average, a residential node transfers 1–5 GB/day.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <h3>Can I sell bandwidth from multiple devices?</h3>
                            <p>
                                Yes. Connect multiple machines to the same wallet — each device on a separate public IP address multiplies your earnings. ProxyBase runs on Android, Windows, macOS, Linux, and headless Docker instances.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <h3>Why do businesses pay for my internet bandwidth?</h3>
                            <p>
                                Companies need residential IP addresses for web scraping, ad verification, market research, and AI training data collection. Datacenter IPs are easily flagged and blocked. Your home IP looks like a real consumer — making it far more valuable for legitimate business use cases.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <h3>What payout methods are available?</h3>
                            <p>
                                ProxyBase pays in stablecoins (USDT, USDC) and major cryptocurrencies via instant on-chain transfers starting at $1.00. No PayPal delays, no gift card restrictions — your earnings are yours, instantly.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CALL TO ACTION */}
                <section className="compare-cta-section">
                    <div className="cta-card">
                        <h2>Stop Letting Your Bandwidth Go to Waste</h2>
                        <p>Join thousands of users earning passive income by sharing their internet. Open-source, KYC-free, $1 cashout.</p>
                        <div className="cta-buttons">
                            <a href="/markets" className="btn-primary">Start Selling Bandwidth</a>
                            <a href="https://github.com/proxybasehq/proxybase-gui" className="btn-secondary" target="_blank" rel="noopener noreferrer">Inspect the Source Code</a>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
