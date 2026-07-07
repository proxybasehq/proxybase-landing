import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
    title: "Sell Internet Data & Earn Passive Income Online — ProxyBase",
    description: "Sell your unused internet data and earn money automatically. Share your bandwidth securely with ProxyBase's open-source node. KYC-free, $1 minimum payout.",
    keywords: "sell internet data, sell bandwidth, earn money from internet, passive income app, make money online, proxybase, honeygain alternative",
    alternates: {
        canonical: "/earn/sell-internet",
    },
};

export default function SellInternetPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Sell Internet Data & Earn Money Automatically",
        "description": "Monetize your unused internet bandwidth securely. Turn your phone, laptop, or server into a passive income node.",
        "url": "https://proxybase.xyz/earn/sell-internet"
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
                            100% Passive Income Node
                        </div>
                        <h1>Sell Internet Data & Earn Money Automatically</h1>
                        <p className="hero-subtitle">
                            Sell unused internet data from your phone, laptop, or home server. Earn up to $1.80–$3.00/GB passively while our open-source client runs quietly in the background.
                        </p>
                        <div className="hero-actions">
                            <a href="/markets" className="btn-primary">Download ProxyBase Client</a>
                            <a href="#explainers" className="btn-secondary">Learn How It Works ↓</a>
                        </div>
                    </div>
                </section>

                {/* TRUSTED LOGOS */}
                <section style={{ padding: "40px 24px 20px", textAlignment: "center", borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-secondary)" }}>
                    <div style={{ maxWidth: "var(--max-width)", margin: "0 auto", textAlign: "center" }}>
                        <p style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "20px", fontWeight: 700 }}>
                            Proxy Sourcing Ecosystem Backed by Industry Mentions
                        </p>
                        <div style={{ display: "flex", gap: "40px", justifyContent: "center", flexWrap: "wrap", alignItems: "center", opacity: 0.65 }}>
                            <span style={{ fontSize: "1.2rem", fontWeight: "900", color: "var(--text-primary)" }}>Forbes</span>
                            <span style={{ fontSize: "1.2rem", fontWeight: "900", color: "var(--text-primary)" }}>Entrepreneur</span>
                            <span style={{ fontSize: "1.2rem", fontWeight: "900", color: "var(--text-primary)" }}>Yahoo Finance</span>
                            <span style={{ fontSize: "1.2rem", fontWeight: "900", color: "var(--text-primary)" }}>Benzinga</span>
                            <span style={{ fontSize: "1.2rem", fontWeight: "900", color: "var(--text-primary)" }}>Hackernoon</span>
                            <span style={{ fontSize: "1.2rem", fontWeight: "900", color: "var(--text-primary)" }}>IBT</span>
                        </div>
                    </div>
                </section>

                {/* THE UNTAPPED ASSET */}
                <section className="compare-intro-section" id="explainers">
                    <div className="section-header" style={{ marginBottom: "48px", textAlign: "center" }}>
                        <span className="section-label">Passive Income Secret</span>
                        <h2>Most People Don't Know They Can Sell Unused Internet</h2>
                        <p className="section-desc" style={{ maxWidth: "700px", margin: "0 auto" }}>
                            You've tried app after app promising easy money, only to end up clicking ads or answering surveys for pennies.
                            With bandwidth sharing, your unused network becomes an automatic utility.
                        </p>
                    </div>

                    <div className="intro-card-grid">
                        <div className="intro-card pb-card">
                            <div className="card-brand-header">
                                <span className="brand-logo-dot active" />
                                <h3>Why Bandwidth Sharing?</h3>
                            </div>
                            <p className="brand-desc">
                                Internet plans come with unlimited or high-cap bandwidth. Most of the time, 80% of your download/upload speed is sitting idle. By running a ProxyBase node, you securely rent out this unused channel to developers and AI research swarms.
                            </p>
                            <ul className="brand-bullets">
                                <li>⚡ Runs quietly in the background without affecting speed</li>
                                <li>⚡ Zero daily tasks, quizzes, or video ads required</li>
                                <li>⚡ Automated conversion of idle bytes into real cash yield</li>
                            </ul>
                        </div>

                        <div className="intro-card ir-card">
                            <div className="card-brand-header">
                                <span className="brand-logo-dot legacy" />
                                <h3>The ProxyBase Guarantee</h3>
                            </div>
                            <p className="brand-desc">
                                Unlike closed-source apps like Honeygain (which restrict payouts to $20.00 and run blackbox proprietary code), ProxyBase gives you total control. Run fully open-source clients, set sandboxed port rules, and cash out at just $1.00.
                            </p>
                            <ul className="brand-bullets">
                                <li>⚡ 100% open-source clients (Rust CLI & Tauri GUI)</li>
                                <li>⚡ Wallet-native, KYC-free instant withdrawals</li>
                                <li>⚡ Cashout starting at $1.00 in stablecoins</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* HOW MUCH CAN YOU EARN */}
                <section className="compare-matrix-section" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                    <div className="section-header">
                        <span className="section-label">Earnings Calculator</span>
                        <h2>How Much Money Can You Make?</h2>
                        <p className="section-desc">ProxyBase offers dynamic market rates based on supply and demand, delivering up to 30x higher yields than typical platforms.</p>
                    </div>

                    <div className="matrix-table-container">
                        <table className="compare-matrix-table">
                            <thead>
                                <tr>
                                    <th>Region / Connection Type</th>
                                    <th className="highlight-col">ProxyBase Yield (per GB)</th>
                                    <th>Honeygain Yield (per GB)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="metric-name">United States — Mobile (4G/5G)</td>
                                    <td className="highlight-col text-emerald font-weight-bold">$3.00 / GB (30x higher)</td>
                                    <td>$0.10 / GB</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">United States — Residential (Wi-Fi)</td>
                                    <td className="highlight-col text-emerald font-weight-bold">$1.80 / GB (18x higher)</td>
                                    <td>$0.10 / GB</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">United Kingdom — Residential</td>
                                    <td className="highlight-col text-emerald font-weight-bold">$2.10 / GB (21x higher)</td>
                                    <td>$0.10 / GB</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Germany — Residential</td>
                                    <td className="highlight-col text-emerald font-weight-bold">$1.92 / GB (19.2x higher)</td>
                                    <td>$0.10 / GB</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Canada — Residential</td>
                                    <td className="highlight-col text-emerald font-weight-bold">$2.04 / GB (20.4x higher)</td>
                                    <td>$0.10 / GB</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Minimum Withdrawal Limit</td>
                                    <td className="highlight-col text-emerald font-weight-bold">$1.00 (Instant Stablecoins)</td>
                                    <td className="text-danger">$20.00 (PayPal)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 3 STEPS TO START */}
                <section className="compare-deepdive-section" id="steps">
                    <div className="section-header">
                        <span className="section-label">Quick Onboarding</span>
                        <h2>Start Selling Bandwidth in 3 Simple Steps</h2>
                        <p className="section-desc">Get set up and begin generating automated yield in under 5 minutes.</p>
                    </div>

                    <div className="deepdive-grid">
                        <div className="deepdive-card">
                            <div className="icon-wrapper">📥</div>
                            <h3>1. Get the App</h3>
                            <p>
                                Download our native, open-source GUI client for Windows, macOS, or Linux, or download the headless Rust CLI daemon for server boxes.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <div className="icon-wrapper">🌐</div>
                            <h3>2. Connect & Share</h3>
                            <p>
                                Run the app in the background. It bridges SOCKS5 traffic through an encrypted yamux tunnel. Your private local ports remain entirely untouched.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <div className="icon-wrapper">💰</div>
                            <h3>3. Cash Out Real Money</h3>
                            <p>
                                Track your microcredits real-time. Once your account balance passes $1.00, trigger an instant transfer to your crypto wallet.
                            </p>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="compare-deepdive-section" style={{ background: "var(--bg-secondary)" }}>
                    <div className="section-header">
                        <span className="section-label">Got Questions?</span>
                        <h2>Frequently Asked Questions</h2>
                        <p className="section-desc">Everything you need to know about selling internet bandwidth on ProxyBase.</p>
                    </div>

                    <div className="deepdive-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
                        <div className="deepdive-card">
                            <h3>What is the best app to sell internet data?</h3>
                            <p>
                                ProxyBase is the premium, developer-focused choice. While consumer apps like Honeygain pay a flat $0.10/GB and force a high $20 cashout, ProxyBase offers open market yields up to $3.00/GB, open-source clients, and a low $1 withdrawal threshold.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <h3>Are there any privacy concerns when sharing bandwidth?</h3>
                            <p>
                                Not with ProxyBase. Unlike closed-source apps that run blackbox executables, our node software is 100% open-source on GitHub. You can verify exactly how Yamux tunnels are established and monitor routed connections.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <h3>Can I sell data from multiple devices?</h3>
                            <p>
                                Yes! You can run ProxyBase nodes on multiple machines. To maximize your yield, connect them across separate public IP addresses (e.g. your home Wi-Fi and mobile LTE/5G network).
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <h3>How much data is used daily?</h3>
                            <p>
                                Data consumption is completely demand-driven. Corporate AI developers and web scrapers query routes dynamically. ProxyBase lets you set strict daily or monthly bandwidth limits inside the client to manage your data caps.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CALL TO ACTION */}
                <section className="compare-cta-section">
                    <div className="cta-card">
                        <h2>Join the Open Bandwidth Revolution</h2>
                        <p>Stop letting your idle bandwidth go to waste. Run a secure, open-source node and cash out at $1.</p>
                        <div className="cta-buttons">
                            <a href="/markets" className="btn-primary">Get Started Now</a>
                            <a href="https://github.com/proxybasehq/proxybase-gui" className="btn-secondary" target="_blank" rel="noopener noreferrer">Explore the GitHub Repo</a>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
