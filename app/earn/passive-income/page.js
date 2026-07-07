import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
    title: "The Passive Income App That Pays Automatically — ProxyBase",
    description: "Earn passive income online by sharing your unused internet connection. ProxyBase is the free passive income app that is open-source, KYC-free, and has a $1 minimum payout.",
    keywords: "passive income app, make money while you sleep, hands off passive income, passive income online, proxybase, honeygain alternative",
    alternates: {
        canonical: "/earn/passive-income",
    },
};

export default function PassiveIncomePage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "The Passive Income App That Pays While You Sleep",
        "description": "Earn automatic, hands-off passive income from your internet connection. Fully encrypted, secure, and open-source.",
        "url": "https://proxybase.xyz/earn/passive-income"
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
                            True Hands-Off Income
                        </div>
                        <h1>The Passive Income App That Pays You Automatically</h1>
                        <p className="hero-subtitle">
                            Earn real passive income by sharing your unused internet connection. ProxyBase is a free open-source utility that runs quietly in the background — no surveys, no ads, no daily tasks.
                        </p>
                        <div className="hero-actions">
                            <a href="/markets" className="btn-primary">Download Free Client</a>
                            <a href="#matrix" className="btn-secondary">Compare Apps ↓</a>
                        </div>
                    </div>
                </section>

                {/* WHY MOST PASSIVE INCOME APPS FAIL */}
                <section className="compare-intro-section" id="why-fail">
                    <div className="section-header" style={{ marginBottom: "48px", textAlign: "center" }}>
                        <span className="section-label">Beermoney Reality</span>
                        <h2>Why Most "Passive Income" Apps Don't Work</h2>
                        <p className="section-desc" style={{ maxWidth: "700px", margin: "0 auto" }}>
                            Most free money apps that promise passive income fall short. You spend hours clicking ads, filling out boring surveys, or watching videos, only to earn cents. They are really just microtask side gigs.
                        </p>
                    </div>

                    <div className="intro-card-grid">
                        <div className="intro-card pb-card">
                            <div className="card-brand-header">
                                <span className="brand-logo-dot active" />
                                <h3>True Passive Income</h3>
                            </div>
                            <p className="brand-desc">
                                ProxyBase turns your device into a background node. Once installed, it requires zero engagement. No screen-on requirements, no quizzes, and no active daily task cycles.
                            </p>
                            <ul className="brand-bullets">
                                <li>⚡ Run it on desktop, mobile, or headless home servers</li>
                                <li>⚡ Fully automated node yields based on data consumption</li>
                                <li>⚡ Keep 100% of your earnings with instant $1 cashouts</li>
                            </ul>
                        </div>

                        <div className="intro-card ir-card">
                            <div className="card-brand-header">
                                <span className="brand-logo-dot legacy" />
                                <h3>Security You Can Verify</h3>
                            </div>
                            <p className="brand-desc">
                                Typical bandwidth apps run proprietary code that can intercept browsing traffic. ProxyBase is the first open-source client: inspect the code yourself to confirm your data remains untouched.
                            </p>
                            <ul className="brand-bullets">
                                <li>⚠️ Closed-source apps mask what connections run on your IP</li>
                                <li>⚡ ProxyBase operates on a sandboxed, open-source Yamux bridge</li>
                                <li>⚡ No tracking of local cookies, search history, or personal logs</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* THE MATRIX: PROXYBASE VS COMPETITORS */}
                <section className="compare-matrix-section" id="matrix">
                    <div className="section-header">
                        <span className="section-label">The Showdown</span>
                        <h2>ProxyBase vs. Typical Earning Apps</h2>
                        <p className="section-desc">See how ProxyBase compares side-by-side with other passive income and consumer apps.</p>
                    </div>

                    <div className="matrix-table-container">
                        <table className="compare-matrix-table">
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    <th className="highlight-col">ProxyBase.xyz</th>
                                    <th>Honeygain / Typical Apps</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="metric-name">Effort Required</td>
                                    <td className="highlight-col text-emerald font-weight-bold">Zero (Install once and let run)</td>
                                    <td className="text-danger">Hours of clicks, surveys, or active tasks</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Daily Active Time</td>
                                    <td className="highlight-col text-emerald font-weight-bold">0 Minutes</td>
                                    <td>15 to 60+ Minutes daily</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Source Code</td>
                                    <td className="highlight-col text-emerald font-weight-bold">100% Open Source (Rust/Tauri)</td>
                                    <td className="text-danger">Closed Source / Proprietary Executables</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Minimum Payout</td>
                                    <td className="highlight-col text-emerald font-weight-bold">$1.00 (Instant microcredits)</td>
                                    <td className="text-danger">$20.00+ Thresholds</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Payout Methods</td>
                                    <td className="highlight-col font-weight-bold">Stablecoins (USDT/USDC) & Crypto</td>
                                    <td>PayPal & Gift Cards</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Privacy Protection</td>
                                    <td className="highlight-col font-weight-bold">Yamux Encrypted, Zero User Logs</td>
                                    <td>Often tracks search history and metadata</td>
                                </tr>
                                <tr>
                                    <td className="metric-name">Multiple Devices</td>
                                    <td className="highlight-col font-weight-bold">Yes (Earn across all nodes)</td>
                                    <td>Often restricted to one device per household</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* BUILT FOR SECURE AUTOMATED EARNINGS */}
                <section className="compare-deepdive-section">
                    <div className="section-header">
                        <span className="section-label">Features</span>
                        <h2>Built for Real, Hands-Off Earnings</h2>
                        <p className="section-desc">ProxyBase is engineered to protect your system privacy while creating a continuous stream of yield.</p>
                    </div>

                    <div className="deepdive-grid">
                        <div className="deepdive-card">
                            <div className="icon-wrapper">💤</div>
                            <h3>1. Earn While Offline</h3>
                            <p>
                                ProxyBase works for you even when you're not actively browsing. Once set up, the client runs silently in the background, utilizing only your idle bandwidth. You earn 24/7, even while you sleep.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <div className="icon-wrapper">🔒</div>
                            <h3>2. Fully Encrypted Yamux Tunnels</h3>
                            <p>
                                All traffic routed through your node is isolated and encrypted. The ProxyBase client has no access to your local files, login credentials, or browser logs. You stay completely secure and anonymous.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <div className="icon-wrapper">💸</div>
                            <h3>3. Fast Payouts starting at $1.00</h3>
                            <p>
                                Other apps trap your money with high $20 limits. ProxyBase believes your earnings should be accessible instantly. Withdraw your microcredits directly to stablecoins whenever your balance passes $1.00.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <div className="icon-wrapper">📱</div>
                            <h3>4. Run on All Your Devices</h3>
                            <p>
                                Increase your passive yield by linking multiple devices across different IPs. ProxyBase runs on Android, Windows, macOS, Linux, and headless Docker instances.
                            </p>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="compare-deepdive-section" style={{ background: "var(--bg-secondary)" }}>
                    <div className="section-header">
                        <span className="section-label">Got Questions?</span>
                        <h2>Frequently Asked Questions</h2>
                        <p className="section-desc">Clear, honest answers about passive earning on the ProxyBase platform.</p>
                    </div>

                    <div className="deepdive-grid grid-2-cols">
                        <div className="deepdive-card">
                            <h3>Is ProxyBase a real passive income app?</h3>
                            <p>
                                Yes. ProxyBase allows you to make money online completely passively by sharing your unused internet connection. It is 100% free to install, runs in the background, and pays you directly in stablecoins (USDT/USDC).
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <h3>Is the ProxyBase app safe to run?</h3>
                            <p>
                                Yes, it is fully secure. Since our CLI daemon and Tauri desktop GUI are completely open-source, the source code is public and auditable. Unlike closed-source alternatives, you can verify exactly what traffic yamux relays through your network.
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <h3>Can I run the client on multiple devices?</h3>
                            <p>
                                Absolutely! Running the client across different machines increases your earning potential. To maximize yield rates, run them on separate networks (e.g. home fiber line, server VPS, and mobile network).
                            </p>
                        </div>

                        <div className="deepdive-card">
                            <h3>Do I need to keep the app active on my screen?</h3>
                            <p>
                                No. Once launched, ProxyBase is designed to run quietly in the background without any prompt loops or active monitoring. You can use your device normally while generating automated earnings.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CALL TO ACTION */}
                <section className="compare-cta-section">
                    <div className="cta-card">
                        <h2>Start Earning while You Sleep</h2>
                        <p>Ditch microtasks and survey apps. Run a secure, open-source bandwidth node on ProxyBase today.</p>
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
