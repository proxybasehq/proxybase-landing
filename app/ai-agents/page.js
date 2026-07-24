"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AIAgentsPage() {
 useEffect(() => {
 const handleHashScroll = () => {
 if (typeof window !== "undefined" && window.location.hash) {
 const id = window.location.hash.substring(1);
 const element = document.getElementById(id);
 if (element) {
 element.scrollIntoView({ behavior: "smooth" });
 }
 }
 };

 const timer1 = setTimeout(handleHashScroll, 100);
 const timer2 = setTimeout(handleHashScroll, 500);
 window.addEventListener("hashchange", handleHashScroll);
 return () => {
 clearTimeout(timer1);
 clearTimeout(timer2);
 window.removeEventListener("hashchange", handleHashScroll);
 };
 }, []);

 const jsonLd = {
 "@context": "https://schema.org",
 "@type": "SoftwareApplication",
 "name": "ProxyBase AI Agent Infrastructure",
 "operatingSystem": "All",
 "applicationCategory": "DeveloperApplication",
 "offers": {
 "@type": "Offer",
 "price": "5.00",
 "priceCurrency": "USD"
 },
 "description": "Programmatic SOCKS5 proxy infrastructure built exclusively for AI agents. REST API, MCP support, crypto payments.",
 "url": "https://proxybase.xyz/ai-agents",
 "image": "https://proxybase.xyz/logo.svg"
 };

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />
 <Navbar />
 <Hero />
 <HowItWorks />
 <Pricing />
 <ApiDocs />
 <McpSection />
 <Faq />
 <Footer />
 </>
 );
}


/* ═══════════════════════════════════════════════════════════════════════════
 HERO
 ═══════════════════════════════════════════════════════════════════════════ */

function Hero() {
 return (
 <section className="hero" id="hero" style={{ padding: "140px 24px 100px" }}>
 <div className="hero-bg">
 <div className="hero-grid" />
 </div>

 <div className="hero-content" style={{ maxWidth: "960px", margin: "0 auto" }}>
 <div className="hero-badge">
 <span className="badge-dot" />
 Now accepting USDC, USDT
 </div>

 <h1>
 <span className="gradient-text">AI Infrastructure</span>
 <br />
 for Agents
 </h1>

 <p className="hero-subtitle" style={{ maxWidth: "740px", margin: "0 auto 44px" }}>
 Programmatic SOCKS5 proxies built for autonomous AI agents.
 No dashboards. No humans. Just an API, a payment address,
 and instant proxy credentials.{" "}
 <a href="/proxy-for-ai-agents" style={{ color: "var(--accent-primary)", textDecoration: "underline", textUnderlineOffset: "3px" }}>Learn why AI agents need proxy infrastructure →</a>
 </p>

 <div className="hero-actions" style={{ justifyContent: "center", marginBottom: "70px" }}>
 <a href="#api" className="btn-primary" data-umami-event="Hero: Read Docs CTA" style={{ padding: "16px 36px", fontSize: "1.05rem" }}>
 Read the Docs ↓
 </a>
 <a
 href="https://github.com/proxybasehq/proxybase-mcp"
 className="btn-secondary"
 target="_blank"
 rel="noopener noreferrer"
 data-umami-event="Hero: GitHub MCP Link"
 style={{ padding: "16px 36px", fontSize: "1.05rem" }}
 >
 ★ GitHub / MCP
 </a>
 </div>

 <div className="hero-terminal" style={{ marginTop: 48, maxWidth: "840px", margin: "48px auto 0", textAlign: "left" }}>
 <div className="terminal">
 <div className="terminal-header">
 <span className="terminal-dot" />
 <span className="terminal-dot" />
 <span className="terminal-dot" />
 <span className="terminal-title">terminal proxybase</span>
 </div>
 <div className="terminal-body">
 <div className="terminal-line">
 <span className="terminal-comment"># 1. Register your AI agent (no auth required)</span>
 </div>
 <div className="terminal-line">
 <span className="terminal-prompt">$ </span>
 curl -X POST https://api.proxybase.xyz/v1/agents
 </div>
 <div className="terminal-line">
 <span className="terminal-comment"># Response: &#123;&quot;agent_id&quot;: &quot;ag_99283a&quot;, &quot;api_key&quot;: &quot;pk_7f8a9b...&quot;&#125;</span>
 </div>
 <div className="terminal-line" style={{ marginTop: 8 }}>
 <span className="terminal-comment"># 2. Create order & provision SOCKS5 proxy</span>
 </div>
 <div className="terminal-line">
 <span className="terminal-prompt">$ </span>
 curl -X POST https://api.proxybase.xyz/v1/orders \
 </div>
 <div className="terminal-line">
 <span className="terminal-indent">&nbsp;&nbsp;&nbsp;&nbsp;-H &quot;X-API-Key: pk_7f8a9b...&quot; \</span>
 </div>
 <div className="terminal-line">
 <span className="terminal-indent">&nbsp;&nbsp;&nbsp;&nbsp;-d &apos;&#123;&quot;package_id&quot;: &quot;res_5gb&quot;, &quot;pay_currency&quot;: &quot;usdcsol&quot;&#125;&apos;</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>
 );
}


/* ═══════════════════════════════════════════════════════════════════════════
 HOW IT WORKS
 ═══════════════════════════════════════════════════════════════════════════ */

function HowItWorks() {
 return (
 <section className="how-it-works" id="how-it-works" style={{ borderTop: "1px solid var(--border-subtle)", padding: "110px 24px", background: "var(--bg-secondary)" }}>
 <div className="section-inner-container">
 <div className="section-header">
 <span className="section-label">Architecture</span>
 <h2>Machine-to-Machine Proxying</h2>
 <p className="section-desc">
 Designed from the ground up for agentic workflows. Run scrapers,
 LLMs, and autonomous browser tasks without human intervention.
 </p>
 </div>

 <div className="steps-flow" style={{ marginTop: 60 }}>
 <div className="step-card" style={{ borderRadius: "var(--radius-xl)", padding: "44px 32px" }}>
 <div className="step-num">01</div>
 <h3>Wallet Authentication</h3>
 <p>
 No credit cards, no passwords, no email registrations. Agents auth
 using cryptographic signatures. Deposit stablecoins to your agent&apos;s
 balance instantly.
 </p>
 </div>

 <div className="step-card" style={{ borderRadius: "var(--radius-xl)", padding: "44px 32px" }}>
 <div className="step-num">02</div>
 <h3>Intent-Based SOCKS5</h3>
 <p>
 Dynamically request specific IP parameters straight in the SOCKS5
 connection string (e.g. <code>socks5://wallet:sig@socks5.proxybase.xyz:1080?country=us</code>).
 </p>
 </div>

 <div className="step-card" style={{ borderRadius: "var(--radius-xl)", padding: "44px 32px" }}>
 <div className="step-num">03</div>
 <h3>Dual-Path Self-Healing</h3>
 <p>
 Our Rust gateways maintain multiple simultaneous upstream connections
 per session. If an IP gets throttled, traffic switches paths instantly.
 </p>
 </div>

 <div className="step-card" style={{ borderRadius: "var(--radius-xl)", padding: "44px 32px" }}>
 <div className="step-num">04</div>
 <h3>Real-Time Telemetry</h3>
 <p>
 Monitor data usage, bandwidth speed, and path latency directly from
 the REST API. Automatically top-up balances when thresholds trigger.
 </p>
 </div>
 </div>
 </div>
 </section>
 );
}


/* ═══════════════════════════════════════════════════════════════════════════
 PRICING
 ═══════════════════════════════════════════════════════════════════════════ */

function Pricing() {
 return (
 <section className="pricing-section" id="pricing" style={{ padding: "110px 24px", borderTop: "1px solid var(--border-subtle)" }}>
 <div className="section-inner-container">
 <div className="section-header">
 <span className="section-label">Pricing</span>
 <h2>No Subscriptions. Pay-as-you-Go.</h2>
 <p className="section-desc">
 Pay strictly for the bandwidth your agents consume. Credits never
 expire. Deposit stablecoins anytime.
 </p>
 </div>

 <div className="pricing-grid-2" style={{ marginTop: 60, maxWidth: "960px", margin: "60px auto 0" }}>
 <div className="price-card" style={{ borderRadius: "var(--radius-xl)", padding: "44px 36px" }}>
 <h3 className="price-name">Residential</h3>
 <div className="price-amount">
 $3.00<span>/GB</span>
 </div>
 <p className="price-per">
 Bypass Geo-blocking and scrapers using residential IPs.
 </p>
 <ul className="price-features">
 <li>Global Geo-Targeting (State/City)</li>
 <li>Rotating or Sticky Sessions</li>
 <li>Yamux Stream Multiplexing</li>
 <li>Dual-Path Failover Enabled</li>
 </ul>
 <a href="#api" className="price-btn">Deposit Now</a>
 </div>

 <div className="price-card featured" style={{ borderRadius: "var(--radius-xl)", padding: "44px 36px" }}>
 <div className="price-tag">Most Popular</div>
 <h3 className="price-name">Mobile (4G/5G)</h3>
 <div className="price-amount">
 $5.00<span>/GB</span>
 </div>
 <p className="price-per">
 Highest trust score IPs sourced from active mobile carriers.
 </p>
 <ul className="price-features">
 <li>Carrier-Level Targeting</li>
 <li>Automatic IP Rotation (Self-Healing)</li>
 <li>High-Throughput Relays</li>
 <li>Cleanest ASN Reputations</li>
 </ul>
 <a href="#api" className="price-btn">Deposit Now</a>
 </div>
 </div>
 </div>
 </section>
 );
}


/* ═══════════════════════════════════════════════════════════════════════════
 API DOCS
 ═══════════════════════════════════════════════════════════════════════════ */

function ApiDocs() {
 const [activeTab, setActiveTab] = useState('auth');

 return (
 <section className="api-section" id="api" style={{ borderTop: "1px solid var(--border-subtle)", padding: "110px 24px", background: "var(--bg-secondary)" }}>
 <div className="section-inner-container">
 <div className="section-header">
 <span className="section-label">Developer Docs</span>
 <h2>Headless API Reference</h2>
 <p className="section-desc">
 Full programmatic control for autonomous agents and scrapers. Register agents, query bandwidth packages, provision orders, and rotate SOCKS5 proxy IPs via simple REST requests.
 </p>
 </div>

 <div className="api-content" style={{ marginTop: 60 }}>
 {/* STICKY SIDEBAR NAV */}
 <div className="api-sidebar">
 <ul className="api-nav">
 <li>
 <a href="#auth" className={activeTab === 'auth' ? 'active' : ''} onClick={() => setActiveTab('auth')}>
 1. Authentication
 </a>
 </li>
 <li>
 <a href="#register" className={activeTab === 'register' ? 'active' : ''} onClick={() => setActiveTab('register')}>
 2. Register Agent
 </a>
 </li>
 <li>
 <a href="#catalog" className={activeTab === 'catalog' ? 'active' : ''} onClick={() => setActiveTab('catalog')}>
 3. Catalog & Currencies
 </a>
 </li>
 <li>
 <a href="#orders" className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
 4. Create Order
 </a>
 </li>
 <li>
 <a href="#status" className={activeTab === 'status' ? 'active' : ''} onClick={() => setActiveTab('status')}>
 5. Status & Proxy
 </a>
 </li>
 <li>
 <a href="#topup" className={activeTab === 'topup' ? 'active' : ''} onClick={() => setActiveTab('topup')}>
 6. Top-up Bandwidth
 </a>
 </li>
 <li>
 <a href="#rotate" className={activeTab === 'rotate' ? 'active' : ''} onClick={() => setActiveTab('rotate')}>
 7. Rotate Proxy IP
 </a>
 </li>
 </ul>
 </div>

 {/* MAIN DOCS AREA */}
 <div className="api-main">
 {/* 1. AUTHENTICATION */}
 <div className="api-endpoint" id="auth">
 <div className="api-method-badge">
 <span className="method-get">AUTH</span>
 <span className="api-path">https://api.proxybase.xyz/v1</span>
 </div>
 <h3>API Key Authentication</h3>
 <p>
 The ProxyBase v1 API authenticates requests using stateless API keys. Once you register an agent via <code>POST /v1/agents</code>, you will receive a unique <code>pk_...</code> API key. Include this key in the <code>X-API-Key</code> header for all authenticated requests.
 </p>

 <div className="api-params">
 <h4>Required Headers</h4>
 <div style={{ overflowX: "auto" }}>
 <table className="api-params-table">
 <thead>
 <tr>
 <th>Header</th>
 <th>Type</th>
 <th>Status</th>
 <th>Description</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td><code>X-API-Key</code></td>
 <td>string</td>
 <td><span className="api-required">Required</span></td>
 <td>Your agent API key (e.g., <code>pk_7f8a9b0c1d2e3f...</code>).</td>
 </tr>
 <tr>
 <td><code>Content-Type</code></td>
 <td>string</td>
 <td>Optional</td>
 <td>Set to <code>application/json</code> when sending JSON request bodies.</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 <div className="code-block">
 <div className="code-block-header">
 <span>Authentication Example (cURL)</span>
 <span className="code-block-lang">bash</span>
 </div>
 <pre>
{`curl -X GET https://api.proxybase.xyz/v1/packages \\
 -H "X-API-Key: pk_7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a"`}
 </pre>
 </div>
 </div>

 {/* 2. REGISTER AGENT */}
 <div className="api-endpoint" id="register">
 <div className="api-method-badge">
 <span className="method-post">POST</span>
 <span className="api-path">/v1/agents</span>
 </div>
 <h3>Register Autonomous Agent</h3>
 <p>
 Registers a new AI agent on the ProxyBase routing grid and generates a fresh API key. No prior authentication is required. This endpoint is rate-limited to 3 registrations per IP per 60 seconds (max 10 per hour).
 </p>

 <div className="api-params">
 <h4>Request Parameters</h4>
 <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: 16 }}>
 No request body is required for agent registration.
 </p>
 </div>

 <div className="code-block">
 <div className="code-block-header">
 <span>POST /v1/agents Response</span>
 <span className="code-block-lang">json</span>
 </div>
 <pre>
{`{
 "agent_id": "ag_8f92a1b0",
 "api_key": "pk_3a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b"
}`}
 </pre>
 </div>
 </div>

 {/* 3. CATALOG & CURRENCIES */}
 <div className="api-endpoint" id="catalog">
 <div className="api-method-badge">
 <span className="method-get">GET</span>
 <span className="api-path">/v1/packages</span>
 </div>
 <h3>Query Packages & Payment Currencies</h3>
 <p>
 Fetch available proxy bandwidth packages (residential, mobile, and datacenter tiers) via <code>GET /v1/packages</code> and query supported cryptocurrency payment tickers via <code>GET /v1/currencies</code>.
 </p>

 <div className="api-params">
 <h4>Required Headers</h4>
 <div style={{ overflowX: "auto" }}>
 <table className="api-params-table">
 <thead>
 <tr>
 <th>Header</th>
 <th>Type</th>
 <th>Status</th>
 <th>Description</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td><code>X-API-Key</code></td>
 <td>string</td>
 <td><span className="api-required">Required</span></td>
 <td>Your agent API key.</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 <div className="code-block">
 <div className="code-block-header">
 <span>GET /v1/packages & GET /v1/currencies Responses</span>
 <span className="code-block-lang">json</span>
 </div>
 <pre>
{`// GET /v1/packages response:
[
 {
 "id": "res_5gb",
 "name": "Residential 5GB",
 "price_usd": 15.00,
 "bandwidth_bytes": 5368709120
 },
 {
 "id": "mob_10gb",
 "name": "Mobile 10GB",
 "price_usd": 45.00,
 "bandwidth_bytes": 10737418240
 }
]

// GET /v1/currencies response:
{
 "currencies": ["usdcsol", "usdttrc20", "btc", "eth", "sol"]
}`}
 </pre>
 </div>
 </div>

 {/* 4. CREATE ORDER */}
 <div className="api-endpoint" id="orders">
 <div className="api-method-badge">
 <span className="method-post">POST</span>
 <span className="api-path">/v1/orders</span>
 </div>
 <h3>Create Proxy Order & Provisioning</h3>
 <p>
 Creates a new proxy order for a specified package. For standard agents, this returns an automated cryptocurrency payment invoice (via NOWPayments). For recognized third-party integration partners, proxies are provisioned immediately without manual payment.
 </p>

 <div className="api-params">
 <h4>Request Body (JSON)</h4>
 <div style={{ overflowX: "auto" }}>
 <table className="api-params-table">
 <thead>
 <tr>
 <th>Parameter</th>
 <th>Type</th>
 <th>Status</th>
 <th>Description</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td><code>package_id</code></td>
 <td>string</td>
 <td><span className="api-required">Required</span></td>
 <td>ID of the bandwidth package to purchase (e.g., <code>res_5gb</code>).</td>
 </tr>
 <tr>
 <td><code>pay_currency</code></td>
 <td>string</td>
 <td>Optional</td>
 <td>Cryptocurrency ticker for payment (default: <code>usdcsol</code>).</td>
 </tr>
 <tr>
 <td><code>callback_url</code></td>
 <td>string</td>
 <td>Optional</td>
 <td>HTTPS webhook URL to receive asynchronous status updates.</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 <div className="code-block">
 <div className="code-block-header">
 <span>POST /v1/orders Response</span>
 <span className="code-block-lang">json</span>
 </div>
 <pre>
{`{
 "order_id": "ord_71a8b9c0",
 "payment_id": "5039482930",
 "pay_address": "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
 "pay_currency": "usdcsol",
 "pay_amount": 15.00,
 "price_usd": 15.00,
 "status": "payment_pending",
 "expiration_estimate_date": "2026-07-07T03:00:00Z"
}`}
 </pre>
 </div>
 </div>

 {/* 5. ORDER STATUS & PROXY */}
 <div className="api-endpoint" id="status">
 <div className="api-method-badge">
 <span className="method-get">GET</span>
 <span className="api-path">/v1/orders/&#123;order_id&#125;/status</span>
 </div>
 <h3>Poll Order Status & Proxy Credentials</h3>
 <p>
 Retrieves real-time order status, live bandwidth utilization metrics (used vs. remaining bytes), and SOCKS5 proxy connection credentials once payment is confirmed and the proxy is provisioned.
 </p>

 <div className="api-params">
 <h4>URL Path Parameters</h4>
 <div style={{ overflowX: "auto" }}>
 <table className="api-params-table">
 <thead>
 <tr>
 <th>Parameter</th>
 <th>Type</th>
 <th>Status</th>
 <th>Description</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td><code>order_id</code></td>
 <td>string</td>
 <td><span className="api-required">Required</span></td>
 <td>The masked order identifier returned when creating the order.</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 <div className="code-block">
 <div className="code-block-header">
 <span>GET /v1/orders/ord_71a8b9c0/status Response</span>
 <span className="code-block-lang">json</span>
 </div>
 <pre>
{`{
 "order_id": "ord_71a8b9c0",
 "status": "proxy_active",
 "price_usd": 15.00,
 "bandwidth_bytes": 5368709120,
 "used_bytes": 1048576,
 "remaining_bytes": 5367660544,
 "usage_percentage": 0.0195,
 "proxy": {
 "host": "api.proxybase.xyz",
 "port": 1080,
 "username": "pb_ag_71a8b9c0",
 "password": "pass_random_secure_secret"
 },
 "created_at": "2026-07-07T02:15:00Z"
}`}
 </pre>
 </div>
 </div>

 {/* 6. TOP-UP BANDWIDTH */}
 <div className="api-endpoint" id="topup">
 <div className="api-method-badge">
 <span className="method-post">POST</span>
 <span className="api-path">/v1/orders/&#123;order_id&#125;/topup</span>
 </div>
 <h3>Top Up Order Bandwidth</h3>
 <p>
 Add additional data transfer capacity to an existing active or exhausted proxy order without changing your SOCKS5 proxy credentials or connection string.
 </p>

 <div className="api-params">
 <h4>Request Body (JSON)</h4>
 <div style={{ overflowX: "auto" }}>
 <table className="api-params-table">
 <thead>
 <tr>
 <th>Parameter</th>
 <th>Type</th>
 <th>Status</th>
 <th>Description</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td><code>package_id</code></td>
 <td>string</td>
 <td><span className="api-required">Required</span></td>
 <td>ID of the bandwidth package to add to the order.</td>
 </tr>
 <tr>
 <td><code>pay_currency</code></td>
 <td>string</td>
 <td>Optional</td>
 <td>Cryptocurrency ticker for payment (default: <code>usdcsol</code>).</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>

 <div className="code-block">
 <div className="code-block-header">
 <span>POST /v1/orders/ord_71a8b9c0/topup Response</span>
 <span className="code-block-lang">json</span>
 </div>
 <pre>
{`{
 "order_id": "ord_71a8b9c0",
 "topup_payment_id": "5039483100",
 "pay_address": "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
 "pay_currency": "usdcsol",
 "pay_amount": 15.00,
 "additional_bandwidth_bytes": 5368709120,
 "additional_price_usd": 15.00,
 "status": "payment_pending"
}`}
 </pre>
 </div>
 </div>

 {/* 7. ROTATE PROXY IP */}
 <div className="api-endpoint" id="rotate">
 <div className="api-method-badge">
 <span className="method-post">POST</span>
 <span className="api-path">/v1/orders/&#123;order_id&#125;/rotate</span>
 </div>
 <h3>Rotate Proxy IP Address</h3>
 <p>
 Triggers an immediate upstream IP rotation for an active proxy order. Your SOCKS5 credentials remain identical, but your very next connection will route through a fresh residential or mobile IP address.
 </p>

 <div className="api-params">
 <h4>Request Parameters</h4>
 <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: 16 }}>
 No request body is required. Requires an active order in <code>proxy_active</code> status.
 </p>
 </div>

 <div className="code-block">
 <div className="code-block-header">
 <span>POST /v1/orders/ord_71a8b9c0/rotate Response</span>
 <span className="code-block-lang">json</span>
 </div>
 <pre>
{`{
 "order_id": "ord_71a8b9c0",
 "message": "Proxy rotated successfully. You will receive a fresh IP on your next connection.",
 "rotated": true
}`}
 </pre>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>
 );
}


/* ═══════════════════════════════════════════════════════════════════════════
 MCP SECTION
 ═══════════════════════════════════════════════════════════════════════════ */

function McpSection() {
 return (
 <section className="mcp-section" id="mcp" style={{ borderTop: "1px solid var(--border-subtle)", padding: "110px 24px" }}>
 <div className="section-inner-container">
 <div className="section-header">
 <span className="section-label">LLM Native</span>
 <h2>Model Context Protocol (MCP) Server</h2>
 <p className="section-desc">
 Allow Claude or any other LLM to interact directly with ProxyBase.
 The agent can purchase proxies autonomously when needed.
 </p>
 </div>

 <div className="mcp-grid" style={{ marginTop: 60, alignItems: "center", gap: 60 }}>
 <div className="mcp-text">
 <h3>Autonomous Web Browsing for LLMs</h3>
 <p>
 By launching the ProxyBase MCP server, you give your LLM agent tools to
 manage its own routing infrastructure. The agent can:
 </p>
 <ul className="mcp-features">
 <li>Read wallet status and check balance</li>
 <li>Generate ephemeral proxy credentials</li>
 <li>Switch target locations programmatically</li>
 <li>Initiate self-top-up tasks using microcredits</li>
 </ul>
 <a
 href="https://github.com/proxybasehq/proxybase-mcp"
 className="btn-secondary"
 style={{ marginTop: 24, display: "inline-block" }}
 target="_blank"
 rel="noopener noreferrer"
 >
 Setup MCP Server →
 </a>
 </div>
 <div className="mcp-code">
 <div className="mcp-diagram">
 <div className="mcp-node">LLM Agent</div>
 <div className="mcp-arrow">↓ MCP Protocol</div>
 <div className="mcp-node highlight">ProxyBase MCP Server</div>
 <div className="mcp-arrow">↓ Yamux Tunnel</div>
 <div className="mcp-node">Residential Node</div>
 </div>
 </div>
 </div>
 </div>
 </section>
 );
}


/* ═══════════════════════════════════════════════════════════════════════════
 FAQ
 ═══════════════════════════════════════════════════════════════════════════ */

function Faq() {
 const [openIndex, setOpenIndex] = useState(null);

 const faqs = [
 {
 q: "How do I pay for bandwidth packages?",
 a: "When you create an order via POST `/v1/orders` or top up via POST `/v1/orders/{id}/topup`, you receive a dedicated cryptocurrency invoice address (e.g., USDC on Solana). Once payment is detected on-chain, your proxy is provisioned automatically."
 },
 {
 q: "Can my agents check their own bandwidth usage?",
 a: "Yes. Your LLM agent can autonomously query GET `/v1/orders/{order_id}/status` to check real-time bandwidth utilization (used vs. remaining bytes) and decide when to trigger a top-up."
 },
 {
 q: "What is the difference between Residential and Mobile?",
 a: "Residential proxies represent stable domestic connections. Mobile proxies use cellular IP ranges, making them extremely resilient against commercial Cloudflare/Akamai bot detection systems."
 },
 {
 q: "How does the dual-path self-healing work?",
 a: "When a request is made, ProxyBase establishes two independent upstream paths. If one path fails to establish a TCP handshake or experiences latency spikes, the stream fails over instantly to the backup path with zero client-side socket breakage."
 }
 ];

 return (
 <section className="faq-section" id="faq" style={{ borderTop: "1px solid var(--border-subtle)", padding: "110px 24px", background: "var(--bg-secondary)" }}>
 <div className="section-inner-container">
 <div className="section-header">
 <span className="section-label">Support</span>
 <h2>FAQ</h2>
 <p className="section-desc">Common questions regarding ProxyBase client integration.</p>
 </div>

 <div className="faq-grid" style={{ marginTop: 48 }}>
 {faqs.map((faq, i) => (
 <div
 key={i}
 className={`faq-item ${openIndex === i ? 'open' : ''}`}
 onClick={() => setOpenIndex(openIndex === i ? null : i)}
 style={{ borderRadius: "var(--radius-lg)" }}
 >
 <div className="faq-question">
 <h3>{faq.q}</h3>
 <span className="faq-icon">+</span>
 </div>
 <div className="faq-answer">
 <p>{faq.a}</p>
 </div>
 </div>
 ))}
 </div>
 </div>
 </section>
 );
}
