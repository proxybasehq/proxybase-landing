import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
 title: "Hermes Agent Proxies: SOCKS5 Setup + How to Make Money With Hermes | ProxyBase",
 description: "Give your Hermes Agent residential SOCKS5 proxies it can buy itself with crypto, and earn from the same box by selling spare bandwidth. No KYC, payouts from $1.",
 keywords: "hermes agent, hermes agent proxy, hermes socks5, hermes agent setup, how to make money with hermes agent, hermes agent bandwidth, nous research hermes, proxybase",
 alternates: {
 canonical: "/hermes",
 },
};

export default function HermesPage() {
 const jsonLd = {
 "@context": "https://schema.org",
 "@type": "HowTo",
 "name": "How to Give Hermes Agent SOCKS5 Proxies and Earn From Its Box",
 "description": "Set up residential SOCKS5 proxies for Hermes Agent (Nous Research) via the ProxyBase API, and run a seller node on the same machine to earn crypto from spare bandwidth.",
 "url": "https://proxybase.xyz/hermes",
 "step": [
 {
 "@type": "HowToStep",
 "position": 1,
 "name": "Register a wallet",
 "text": "Your Hermes agent registers with ProxyBase by wallet address: no email, no KYC."
 },
 {
 "@type": "HowToStep",
 "position": 2,
 "name": "Pay with crypto",
 "text": "Buy bandwidth with USDC, USDT, BTC, ETH, or SOL via MPP micropayments. From $3/GB."
 },
 {
 "@type": "HowToStep",
 "position": 3,
 "name": "Receive SOCKS5 credentials",
 "text": "Poll the order endpoint until credentials arrive, then export them into the agent's environment."
 },
 {
 "@type": "HowToStep",
 "position": 4,
 "name": "Earn from the same box",
 "text": "Run the ProxyBase seller node alongside Hermes to sell spare bandwidth, payouts from $1 in crypto."
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
 For Hermes Agent Builders
 </div>
 <h1>Hermes Agent + ProxyBase: Proxies It Buys Itself, a Box That Earns</h1>
 <p className="hero-subtitle">
 Hermes Agent (Nous Research) runs 24/7 on your hardware with its own memory and skills. It still hits the same wall as every other agent: websites block datacenter IPs. ProxyBase gives Hermes residential SOCKS5 it can provision and pay for autonomously, and the same box can sell its spare bandwidth for crypto.
 </p>
 <div className="hero-actions">
 <a href="#setup" className="btn-primary">Set Up Proxies ↓</a>
 <a href="/earn/sell-internet" className="btn-secondary">Start Earning Bandwidth</a>
 </div>
 </div>
 </section>

 {/* WHAT IS HERMES */}
 <section className="compare-intro-section">
 <div className="section-header">
 <span className="section-label">Context</span>
 <h2>What Hermes Agent Is</h2>
 </div>

 <div className="deepdive-grid">
 <div className="deepdive-card">
 <div className="icon-wrapper">🧠</div>
 <h3>Closed learning loop</h3>
 <p>
 Hermes observes its own work, reflects on what succeeded, and crystallizes it into reusable skills, Markdown files in <code>~/.hermes/skills/</code>. The agent writes its own playbook over time.
 </p>
 </div>

 <div className="deepdive-card">
 <div className="icon-wrapper">🗄️</div>
 <h3>Persistent, self-hosted</h3>
 <p>
 Everything lives in a local SQLite database: working memory, episodic memory, procedures. No cloud dependency, no vendor lock-in, and it speaks 200+ models through OpenAI-compatible endpoints.
 </p>
 </div>

 <div className="deepdive-card">
 <div className="icon-wrapper">💻</div>
 <h3>Runs lean</h3>
 <p>
 One-line install, and a $5/month VPS with 1 core / 1 GB is a supported setup when you use external LLM APIs. It's also the box that earns, below.
 </p>
 </div>

 <div className="deepdive-card">
 <div className="icon-wrapper">🧩</div>
 <h3>Multi-agent + MCP</h3>
 <p>
 <code>delegate_task</code> spawns sub-agents with isolated contexts, and Hermes speaks MCP both directions. It can call the ProxyBase API the same way any agent tool would.
 </p>
 </div>
 </div>
 </section>

 {/* SETUP */}
 <section className="compare-deepdive-section" id="setup" style={{ background: "var(--bg-secondary)" }}>
 <div className="section-header">
 <span className="section-label">Setup</span>
 <h2>Give Hermes SOCKS5 Proxies: No Human in the Loop</h2>
 <p className="section-desc">
 ProxyBase is designed so the agent does the whole purchase itself: four API calls, crypto payment, credentials delivered.
 </p>
 </div>

 <div className="deepdive-grid">
 <div className="deepdive-card">
 <div className="icon-wrapper">1️⃣</div>
 <h3>Register by wallet</h3>
 <p>
 <code>POST /v1/agents</code> with a wallet address. That address is the entire account: no email, no password, no KYC. Hermes can generate the wallet itself.
 </p>
 </div>

 <div className="deepdive-card">
 <div className="icon-wrapper">2️⃣</div>
 <h3>Pay per gigabyte</h3>
 <p>
 Order bandwidth and pay with USDC, USDT, BTC, ETH, or SOL via <a href="/what-is-mpp" style={{ color: "var(--accent-primary)" }}>MPP micropayments</a>. Residential from $3/GB, credits never expire.
 </p>
 </div>

 <div className="deepdive-card">
 <div className="icon-wrapper">3️⃣</div>
 <h3>Poll until live</h3>
 <p>
 The order endpoint confirms payment and returns SOCKS5 credentials on <code>api.proxybase.xyz:1080</code>, in about a minute. Hermes polls the same way it would poll any job.
 </p>
 </div>

 <div className="deepdive-card">
 <div className="icon-wrapper">4️⃣</div>
 <h3>Inject and go</h3>
 <p>
 Export the credentials into the environment (<code>http_proxy</code>, <code>https_proxy</code>, or the SOCKS5 user/pass in whatever HTTP client Hermes' tools use). Browser and scraping tools now exit through a residential IP.
 </p>
 </div>
 </div>
 </section>

 {/* MAKE MONEY */}
 <section className="compare-deepdive-section" id="earn">
 <div className="section-header">
 <span className="section-label">Monetization</span>
 <h2>How the Hermes Box Makes Money</h2>
 <p className="section-desc">
 Hermes already runs 24/7 on a machine with an internet connection. That connection has value on the proxy market, and you don't need a second box to capture it.
 </p>
 </div>

 <div className="deepdive-grid">
 <div className="deepdive-card">
 <div className="icon-wrapper">📡</div>
 <h3>1. Run the seller node beside Hermes</h3>
 <p>
 The ProxyBase seller node routes residential SOCKS5 traffic through your idle bandwidth and pays you per GB in crypto. Payouts start at $1, no KYC. It's a lightweight daemon, not a second machine. <a href="/earn/sell-internet" style={{ color: "var(--accent-primary)" }}>Full setup here</a>.
 </p>
 </div>

 <div className="deepdive-card">
 <div className="icon-wrapper">🤝</div>
 <h3>2. Let Hermes manage it</h3>
 <p>
 The node has a config file and logs. Have Hermes watch earnings, restart the daemon, and alert you on payouts. After a successful run, it can crystallize the routine into a skill.
 </p>
 </div>

 <div className="deepdive-card">
 <div className="icon-wrapper">📈</div>
 <h3>3. Scale to a fleet</h3>
 <p>
 When one box earns, five boxes earn. ProxyBase uses HD wallets, so a fleet of Hermes machines can be provisioned programmatically and pay into the same wallet. <a href="/blog/hd-wallets-seller-fleets" style={{ color: "var(--accent-primary)" }}>The fleet guide</a> covers it.
 </p>
 </div>

 <div className="deepdive-card">
 <div className="icon-wrapper">🧮</div>
 <h3>4. The math</h3>
 <p>
 Seller payouts run up to $3/GB at market pricing. A residential connection running the node full-time usually covers its internet bill and then some. Hermes keeps working on the same line, its own proxies paid for out of the earnings.
 </p>
 </div>
 </div>
 </section>

 {/* FAQ */}
 <section className="compare-deepdive-section">
 <div className="section-header">
 <span className="section-label">Questions</span>
 <h2>Hermes + ProxyBase — FAQ</h2>
 </div>

 <div className="deepdive-grid grid-2-cols">
 <div className="deepdive-card">
 <h3>Why does Hermes need a proxy at all?</h3>
 <p>
 If Hermes browses, scrapes, or calls APIs from a datacenter IP, anti-bot systems flag it. Residential SOCKS5 makes its traffic look like a home user. <a href="/blog/why-your-ai-agent-needs-a-proxy" style={{ color: "var(--accent-primary)" }}>Why agents need proxies</a> covers the details.
 </p>
 </div>

 <div className="deepdive-card">
 <h3>Is there a Hermes skill for ProxyBase?</h3>
 <p>
 Not yet. <a href="/openclaw" style={{ color: "var(--accent-primary)" }}>OpenClaw has the installable skill</a>. For Hermes, the API flow is plain HTTP calls, which Hermes handles natively through its tool system or MCP.
 </p>
 </div>

 <div className="deepdive-card">
 <h3>How is ProxyBase different from a regular proxy provider?</h3>
 <p>
 Your wallet is the account. Payment is crypto micropayments, credentials come back through the API, and no human is involved at any step. <a href="/proxy-for-ai-agents" style={{ color: "var(--accent-primary)" }}>Read the agent-first story</a>.
 </p>
 </div>

 <div className="deepdive-card">
 <h3>Hermes or OpenClaw: which should I run?</h3>
 <p>
 Both work with ProxyBase. Hermes wins on self-improvement and running costs; OpenClaw wins on mature integrations. We compared them in depth <a href="/compare/hermes-vs-openclaw" style={{ color: "var(--accent-primary)" }}>here</a>.
 </p>
 </div>
 </div>
 </section>

 {/* CALL TO ACTION */}
 <section className="compare-cta-section">
 <div className="cta-card">
 <h2>Your Hermes Box Can Pay for Itself.</h2>
 <p>Buy residential SOCKS5 from $3/GB with crypto. Sell spare bandwidth from the same machine, with payouts from $1. No KYC in either direction.</p>
 <div className="cta-buttons">
 <a href="/mpp" className="btn-primary">Buy Proxies with Crypto →</a>
 <a href="/earn/sell-internet" className="btn-secondary">Start Earning Bandwidth</a>
 </div>
 </div>
 </section>
 </div>

 <Footer />
 </>
 );
}
