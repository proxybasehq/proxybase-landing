import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
    title: "ProxyBase OpenClaw Skill — Unlock the Internet for Your AI",
    description: "The easiest way to let your AI agents access the internet securely without getting blocked.",
};

export default function OpenClawPage() {
    return (
        <>
            <Navbar />

            <section className="openclaw-hero">
                <div className="hero-badge">
                    <span className="badge-dot" />
                    For Non-Technical Users
                </div>
                <h1 className="gradient-text">Unlock the Internet<br />for your AI</h1>
                <p>
                    AI assistants are smart, but they get blocked when trying to read websites like Yahoo Finance or check local prices. ProxyBase gives your AI a "real human disguise" (a residential connection) so it can browse anywhere without getting stopped by security challenges.
                </p>
            </section>

            <section className="openclaw-features">
                <div className="feature-card">
                    <div className="feature-icon">🛡️</div>
                    <h3>Never Get Blocked</h3>
                    <p>Websites block AI bots all the time. Our proxies make your AI look like a normal human browsing from a home internet connection.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">⚡</div>
                    <h3>Dead Simple</h3>
                    <p>No complicated dashboard, no subscriptions, no credit card required. Just talk to your AI and tell it to get a proxy. It's ready in seconds.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">💰</div>
                    <h3>Pay As You Go</h3>
                    <p>Pay exactly for what you need using Cryptocurrency. $10 gives your AI 1GB of premium browsing bandwidth that never expires.</p>
                </div>
            </section>

            <section className="openclaw-install" id="install">
                <div className="section-header">
                    <span className="section-label">Installation</span>
                    <h2 className="section-title">How To Install</h2>
                    <p className="section-desc">Just one command to install the skill in your OpenClaw environment.</p>
                </div>

                <div className="terminal">
                    <div className="terminal-header">
                        <span className="terminal-dot" style={{ background: "#ff5f57" }}></span>
                        <span className="terminal-dot" style={{ background: "#ffbd2e" }}></span>
                        <span className="terminal-dot" style={{ background: "#28c840" }}></span>
                        <span className="terminal-title">terminal</span>
                    </div>
                    <div className="terminal-body" style={{ whiteSpace: "normal" }}>
                        <div className="terminal-line" style={{ whiteSpace: "nowrap" }}>
                            <span className="terminal-comment"># Paste this into your terminal where you run ClawHQ:</span>
                        </div>
                        <div className="terminal-line" style={{ marginTop: "10px", whiteSpace: "nowrap" }}>
                            <span className="terminal-prompt">$ </span>
                            npx clawhub@latest install proxybase-openclaw-skill --force
                        </div>
                        <div className="terminal-line" style={{ marginTop: "24px", color: "#94a3b8" }}>
                            <strong>Why --force?</strong> The skill asks for permission to make external connections to give you the proxy. This is completely normal and expected, but OpenClaw warns you just to be safe.
                        </div>
                    </div>
                </div>
            </section>

            <section className="chat-showcase">
                <div className="section-header">
                    <span className="section-label">See It In Action</span>
                    <h2 className="section-title">Talk to Your AI</h2>
                    <p className="section-desc">Once installed, you can just talk to your AI naturally. Here's a real example of what that looks like.</p>
                </div>

                <div className="chat-container">
                    <div className="message user">
                        <p>npx clawhub@latest install proxybase-openclaw-skill --force</p>
                    </div>
                    <div className="message ai">
                        <p>That was flagged as suspicious — are you sure you want to force-install it? Just want to double-check before overriding the safety warning.</p>
                        <p>If you've already reviewed the code or trust the source, I'll run it. But if not, I'd really recommend we inspect it first. What do you say?</p>
                    </div>
                    <div className="message user">
                        <p>i know the code is fine</p>
                    </div>
                    <div className="message ai">
                        <p>Done! Skill installed to <code>skills/proxybase-openclaw-skill</code>.</p>
                        <p>Want me to take a look at what it does, or are you already familiar with it? And — still waiting on that name for me 😄</p>
                    </div>
                    <div className="message user">
                        <p>yes, I need 1 gb proxy</p>
                    </div>
                    <div className="message ai">
                        <p>Your order is created! Here are the payment details:</p>
                        <p>🌐 <strong>ProxyBase — 1 GB US Residential Proxy</strong></p>
                        <p>- Price: $10.00 USD<br />
                            - Send exactly: 13.929377 USDT (TRC20)<br />
                            - To address: <code>TVZytxrpRRnMMgHSRiFVeswwTE3fD4cNUS</code><br />
                            - Expires: ~05:50 UTC (about 11 minutes from now)</p>
                        <p>Once you've sent the payment, let me know and I'll poll for confirmation. Or if you want, I can set up automatic polling right now...</p>
                    </div>
                    <div className="message user">
                        <p>create a new order with usdcsol</p>
                    </div>
                    <div className="message ai">
                        <p>Here's your new order:</p>
                        <p>🌐 <strong>ProxyBase — 1 GB US Residential Proxy (USDC on Solana)</strong></p>
                        <p>- Price: $10.00 USD<br />
                            - Send exactly: 10.630188 USDC (SOL)<br />
                            - To address: <code>8V4gDs1bNM8qbp4gskMM8V3qCC4HxR8PhwJXCmPqMnvM</code><br />
                            - Expires: ~05:51 UTC (about 10 minutes)<br />
                            - Order ID: <code>W6z16paP</code></p>
                        <p>Let me know once you've sent the payment and I'll check the status!</p>
                    </div>
                    <div className="message user">
                        <p>yes, I made the payment</p>
                    </div>
                    <div className="message ai">
                        <p>Payment confirmed — your proxy is live! 🎉</p>
                        <p>🌐 <strong>SOCKS5 Proxy Active</strong><br />
                            - Host: api.proxybase.xyz:1080<br />
                            - Bandwidth: 0 / 1024 MB (1 GB)<br />
                            - Never expires — only consumed by usage</p>
                        <p>I've saved the credentials to env files. To use it:</p>
                        <pre>
                            # Auto-route all traffic through the proxy:
                            source skills/proxybase-openclaw-skill/state/.proxy-env
                        </pre>
                        <p>Want me to test it, or is there anything else you need?</p>
                    </div>
                    <div className="message user">
                        <p>please test it</p>
                    </div>
                    <div className="message ai">
                        <p>Working perfectly! ✅</p>
                        <p>- Your real IP: 89.167.79.98<br />
                            - Proxied IP: 172.56.219.95 (US residential)</p>
                        <p>Two different IPs — the proxy is routing traffic through a US residential address as expected. You're good to go! 🚀</p>
                    </div>
                    <div className="message user">
                        <p>can you use this proxy to access yahoo finance and then tell me the news</p>
                    </div>
                    <div className="message ai">
                        <p>Proxy worked great for fetching Yahoo Finance! Here's the latest news...</p>
                        <p>📰 <strong>Yahoo Finance Top News (via proxy)</strong></p>
                        <p>🏪 "Giant Snack Company Closes Key Distribution Centers, Lays Off Hundreds" (TheStreet)<br />
                            📉 "3 Investing Moves I'm Making Right Now to Prepare for a Recession" (Motley Fool)<br />
                            🍽️ "Cava Shares Surge on Upbeat Outlook — Can the Stock's Momentum Continue?" (Motley Fool)</p>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
