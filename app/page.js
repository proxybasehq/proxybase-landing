"use client";

import { useState } from "react";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ProxyBase",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "5.00",
      "priceCurrency": "USD"
    },
    "description": "Programmatic SOCKS5 proxy infrastructure built exclusively for AI agents. REST API, MCP support, crypto payments.",
    "url": "https://proxybase.xyz",
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
   NAVBAR
   ═══════════════════════════════════════════════════════════════════════════ */

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar" role="navigation">
      <div className="navbar-inner">
        <a href="#" className="logo" data-umami-event="Nav: Logo Click">
          <img src="/logo.svg" alt="ProxyBase" className="logo-icon" />
          ProxyBase
        </a>

        {/* Desktop Links */}
        <ul className="nav-links">
          <li><a href="#how-it-works" data-umami-event="Nav: How It Works">How It Works</a></li>
          <li><a href="#pricing" data-umami-event="Nav: Pricing">Pricing</a></li>
          <li><a href="#api" data-umami-event="Nav: API Docs">API Docs</a></li>
          <li><a href="#mcp" data-umami-event="Nav: MCP">MCP</a></li>
          <li><a href="#faq" data-umami-event="Nav: FAQ">FAQ</a></li>
        </ul>
        <a href="#api" className="nav-cta" data-umami-event="Nav: Get API Key CTA">Get API Key →</a>

        {/* Mobile Hamburger Toggle */}
        <button
          className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          data-umami-event="Mobile Nav: Toggle Menu"
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li><a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: How It Works">How It Works</a></li>
          <li><a href="#pricing" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: Pricing">Pricing</a></li>
          <li><a href="#api" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: API Docs">API Docs</a></li>
          <li><a href="#mcp" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: MCP">MCP</a></li>
          <li><a href="#faq" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: FAQ">FAQ</a></li>
        </ul>
        <a href="#api" className="mobile-nav-cta" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: Get API Key CTA">Get API Key →</a>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════════════════ */

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <div className="hero-grid" />
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          Now accepting USDC, USDT
        </div>

        <h1>
          <span className="gradient-text">AI Infrastructure</span>
          <br />
          for Agents
        </h1>

        <p className="hero-subtitle">
          Programmatic SOCKS5 proxies built for autonomous AI agents.
          No dashboards. No humans. Just an API, a payment address,
          and instant proxy credentials.
        </p>

        <div className="hero-actions">
          <a href="#api" className="btn-primary" data-umami-event="Hero: Read Docs CTA">
            Read the Docs ↓
          </a>
          <a
            href="https://github.com/proxybasehq/proxybase-mcp"
            className="btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="Hero: GitHub MCP Link"
          >
            ★ GitHub / MCP
          </a>
        </div>

        <div className="hero-terminal">
          <div className="terminal">
            <div className="terminal-header">
              <span className="terminal-dot" />
              <span className="terminal-dot" />
              <span className="terminal-dot" />
              <span className="terminal-title">terminal — proxybase</span>
            </div>
            <div className="terminal-body">
              <div className="terminal-line">
                <span className="terminal-comment"># 1. Register your agent</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-prompt">$ </span>
                curl -X POST https://api.proxybase.xyz/v1/agents
              </div>
              <div className="terminal-line">
                <span className="terminal-comment"># 2. Get supported currencies</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-prompt">$ </span>
                curl https://api.proxybase.xyz/v1/currencies \
              </div>
              <div className="terminal-line">
                {"  "}-H <span className="terminal-string">&quot;X-API-Key: pk_...&quot;</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-comment"># 3. Create an order with chosen currency</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-prompt">$ </span>
                curl -X POST https://api.proxybase.xyz/v1/orders \
              </div>
              <div className="terminal-line">
                {"  "}-H <span className="terminal-string">&quot;X-API-Key: pk_...&quot;</span> -d{" "}
                <span className="terminal-string">
                  {"'{\"package_id\":\"us_residential_1gb\",\"pay_currency\":\"sol\"}'"}
                </span>
              </div>
              <div className="terminal-line">
                <span className="terminal-comment">
                  # → pay_address: &quot;TXyz...&quot; | socks5://pb_user:pass@api.proxybase.xyz:1080
                </span>
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
  const steps = [
    {
      icon: "🤖",
      title: "Register Agent",
      desc: "POST /v1/agents — get your API key instantly. No signups, no forms, no humans.",
    },
    {
      icon: "📦",
      title: "Choose Package",
      desc: "GET /v1/packages — browse bandwidth packages with transparent per-GB pricing.",
    },
    {
      icon: "💰",
      title: "Pay with Crypto",
      desc: "GET /v1/currencies then POST /v1/orders — select your preferred cryptocurrency to receive a payment address. Send BTC, ETH, SOL, or USDT.",
    },
    {
      icon: "🔌",
      title: "Use Your Proxy",
      desc: "Poll /v1/orders/{id}/status — once confirmed, connect via SOCKS5 with your credentials.",
    },
  ];

  return (
    <section className="section section-alt" id="how-it-works">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-label">How It Works</span>
          <h2 className="section-title">Four API Calls to a Proxy</h2>
          <p className="section-desc">
            No accounts to create, no dashboards to navigate. Your agent can
            provision a residential proxy in under 60 seconds.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step, i) => (
            <div className="step-card" key={i}>
              <div className="step-icon">{step.icon}</div>
              <div className="step-number">{i + 1}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PRICING
   ═══════════════════════════════════════════════════════════════════════════ */

function Pricing() {
  const packages = [
    {
      name: "Starter",
      bandwidth: "1 GB",
      price: 10,
      per: "$10 / GB",
      features: [
        "US residential & mobile IPs",
        "SOCKS5 protocol",
        "Real-time bandwidth tracking",
        "Unlimited concurrent sessions",
        "No expiration date",
      ],
    },
    {
      name: "Growth",
      bandwidth: "5 GB",
      price: 50,
      per: "$10 / GB",
      featured: true,
      features: [
        "Everything in Starter",
        "Best value for testing at scale",
        "Top-up anytime — same credentials",
        "Webhook notifications at 80% & 95%",
        "Priority bandwidth allocation",
      ],
    },
    {
      name: "Scale",
      bandwidth: "10 GB",
      price: 100,
      per: "$10 / GB",
      features: [
        "Everything in Growth",
        "Designed for production AI swarms",
        "Bulk bandwidth for long operations",
        "Same simple API — just bigger quota",
        "Enterprise-level throughput",
      ],
    },
  ];

  return (
    <section className="section" id="pricing">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-label">Pricing</span>
          <h2 className="section-title">Bandwidth Packages</h2>
          <p className="section-desc">
            Pay per gigabyte. No subscriptions, no commitments. Top up anytime
            with the same proxy credentials.
          </p>
        </div>

        <div className="pricing-grid">
          {packages.map((pkg, i) => (
            <div
              className={`price-card${pkg.featured ? " featured" : ""}`}
              key={i}
            >
              {pkg.featured && <span className="price-tag">Most Popular</span>}
              <h3 className="price-name">{pkg.name}</h3>
              <p className="price-bandwidth">{pkg.bandwidth} bandwidth</p>
              <div className="price-amount">
                ${pkg.price}
                <span> USD</span>
              </div>
              <p className="price-per">{pkg.per}</p>
              <ul className="price-features">
                {pkg.features.map((f, j) => (
                  <li key={j}>{f}</li>
                ))}
              </ul>
              <a href="#api" className="price-btn" data-umami-event={`Pricing: Get Started (${pkg.name})`}>
                Get Started →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   API DOCS
   ═══════════════════════════════════════════════════════════════════════════ */

function ApiDocs() {
  const endpoints = [
    {
      method: "POST",
      path: "/v1/agents",
      title: "Register Agent",
      desc: "Register a new AI agent and receive an API key. This is the first step — all other endpoints require authentication via X-API-Key header.",
      params: [],
      curlExample: `curl -X POST https://api.proxybase.xyz/v1/agents`,
      responseExample: `{
  "agent_id": "6xAMqAGN",
  "api_key": "pk_c8c91c8a0e5b3e2c..."
}`,
    },
    {
      method: "GET",
      path: "/v1/packages",
      title: "List Packages",
      desc: "List all available proxy bandwidth packages with transparent pricing. Returns package IDs needed for order creation.",
      params: [],
      headers: true,
      curlExample: `curl https://api.proxybase.xyz/v1/packages \\
  -H "X-API-Key: pk_YOUR_KEY"`,
      responseExample: `[
  {
    "id": "us_residential_1gb",
    "name": "US Residential 1GB",
    "bandwidth_bytes": 1073741824,
    "price_usd": 10.00,
    "proxy_type": "residential",
    "country": "US"
  }
]`,
    },
    {
      method: "GET",
      path: "/v1/currencies",
      title: "List Currencies",
      desc: "List all available payment currencies (cryptocurrencies) that can be used for the pay_currency field when creating an order or topping up. Call this before creating an order to know which values are valid.",
      params: [],
      headers: true,
      curlExample: `curl https://api.proxybase.xyz/v1/currencies \\\\
  -H "X-API-Key: pk_YOUR_KEY"`,
      responseExample: `{
  "currencies": ["btc", "eth", "sol", "usdttrc20", "ltc", ...]
}`,
    },
    {
      method: "POST",
      path: "/v1/orders",
      title: "Create Order",
      desc: "Purchase a proxy package. Creates a crypto payment invoice. Once the payment confirms on-chain, your SOCKS5 proxy credentials are provisioned automatically.",
      params: [
        { name: "package_id", required: true, desc: 'Package ID, e.g. "us_residential_1gb"' },
        {
          name: "pay_currency",
          required: false,
          desc: 'Crypto to pay with (default: "usdttrc20"). Use GET /v1/currencies for valid values',
        },
        { name: "callback_url", required: false, desc: "Webhook URL for status notifications" },
      ],
      headers: true,
      curlExample: `curl -X POST https://api.proxybase.xyz/v1/orders \\
  -H "X-API-Key: pk_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"package_id":"us_residential_1gb","pay_currency":"sol"}'`,
      responseExample: `{
  "order_id": "kQx7p3Wn",
  "payment_id": "5832461907",
  "pay_address": "TXyz...",
  "pay_currency": "sol",
  "pay_amount": 0.058,
  "price_usd": 10.00,
  "status": "payment_pending"
}`,
    },
    {
      method: "GET",
      path: "/v1/orders/{order_id}/status",
      title: "Check Order Status",
      desc: 'Poll the order status. Once status is "proxy_active", the response includes your SOCKS5 credentials (host, port, username, password). Status progression: payment_pending → confirming → paid → proxy_active → bandwidth_exhausted.',
      params: [],
      headers: true,
      curlExample: `curl https://api.proxybase.xyz/v1/orders/kQx7p3Wn/status \\
  -H "X-API-Key: pk_YOUR_KEY"`,
      responseExample: `{
  "order_id": "kQx7p3Wn",
  "status": "proxy_active",
  "bandwidth_bytes": 1073741824,
  "used_bytes": 52428800,
  "remaining_bytes": 1021313024,
  "usage_percentage": 4.88,
  "proxy": {
    "host": "api.proxybase.xyz",
    "port": 1080,
    "username": "pb_a1b2c3d4e5f6g7h8",
    "password": "9f8e7d6c5b4a3210"
  }
}`,
    },
    {
      method: "POST",
      path: "/v1/orders/{order_id}/topup",
      title: "Top Up Order",
      desc: "Add more bandwidth to an existing order. Your proxy credentials stay the same — only the bandwidth allowance increases. Works on active or exhausted proxies.",
      params: [
        { name: "package_id", required: true, desc: "Bandwidth package to add" },
        { name: "pay_currency", required: false, desc: 'Crypto to pay with. Use GET /v1/currencies for valid values (default: "usdttrc20")' },
      ],
      headers: true,
      curlExample: `curl -X POST https://api.proxybase.xyz/v1/orders/kQx7p3Wn/topup \\
  -H "X-API-Key: pk_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"package_id":"us_residential_1gb"}'`,
      responseExample: `{
  "order_id": "kQx7p3Wn",
  "topup_payment_id": "5832461999",
  "pay_address": "TXyz...",
  "pay_currency": "usdttrc20",
  "pay_amount": 10.15,
  "additional_bandwidth_bytes": 1073741824,
  "additional_price_usd": 10.00,
  "status": "payment_pending"
}`,
    },
    {
      method: "POST",
      path: "/v1/orders/{order_id}/rotate",
      title: "Rotate Proxy",
      desc: "Rotate the proxy to get a fresh IP address. Calls the upstream partner to invalidate the current session. Only works on orders with proxy_active status. Your next SOCKS5 connection will use a new IP.",
      params: [],
      headers: true,
      curlExample: `curl -X POST https://api.proxybase.xyz/v1/orders/kQx7p3Wn/rotate \\
  -H "X-API-Key: pk_YOUR_KEY"`,
      responseExample: `{
  "order_id": "kQx7p3Wn",
  "message": "Proxy rotated successfully. You will receive a fresh IP on your next connection.",
  "rotated": true
}`,
    },
  ];

  return (
    <section className="section api-section" id="api">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-label">API Reference</span>
          <h2 className="section-title">REST API Documentation</h2>
          <p className="section-desc">
            Base URL: <code style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--accent-primary)" }}>https://api.proxybase.xyz/v1</code>
            <br />
            Authentication: <code style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--accent-primary)" }}>X-API-Key</code> header
          </p>
        </div>

        <div className="api-content">
          <div className="api-sidebar">
            <ul className="api-nav">
              {endpoints.map((ep, i) => (
                <li key={i}>
                  <a href={`#api-${ep.path.replace(/[/{}_]/g, "-")}`} data-umami-event={`API Sidebar: ${ep.title}`}>
                    <span className={ep.method === "POST" ? "method-post" : "method-get"} style={{ fontSize: "0.7rem", padding: "2px 6px", borderRadius: "3px", marginRight: "6px" }}>
                      {ep.method}
                    </span>
                    {ep.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="api-main">
            {endpoints.map((ep, i) => (
              <div
                className="api-endpoint"
                key={i}
                id={`api-${ep.path.replace(/[/{}_]/g, "-")}`}
              >
                <div className="api-method-badge">
                  <span className={ep.method === "POST" ? "method-post" : "method-get"}>
                    {ep.method}
                  </span>
                  <span className="api-path">{ep.path}</span>
                </div>
                <h3>{ep.title}</h3>
                <p>{ep.desc}</p>

                {ep.params.length > 0 && (
                  <div className="api-params">
                    <h4>Parameters</h4>
                    <table className="api-params-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Required</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ep.params.map((p, j) => (
                          <tr key={j}>
                            <td><code>{p.name}</code></td>
                            <td>
                              {p.required ? (
                                <span className="api-required">Yes</span>
                              ) : (
                                "No"
                              )}
                            </td>
                            <td>{p.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="code-block">
                  <div className="code-block-header">
                    <span className="code-block-lang">curl</span>
                  </div>
                  <pre>{ep.curlExample}</pre>
                </div>

                <div className="code-block">
                  <div className="code-block-header">
                    <span className="code-block-lang">response</span>
                  </div>
                  <pre>{ep.responseExample}</pre>
                </div>
              </div>
            ))}
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
  const configJson = `{
  "mcpServers": {
    "proxybase": {
      "command": "/path/to/proxybase-mcp"
    }
  }
}`;

  return (
    <section className="section mcp-section" id="mcp">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-label">MCP Ready</span>
          <h2 className="section-title">Model Context Protocol</h2>
          <p className="section-desc">
            Let your AI assistant purchase and manage proxies through natural
            language. Works with Claude Desktop, Cursor, and any MCP client.
          </p>
        </div>

        <div className="mcp-grid">
          <div className="mcp-text">
            <h3>One Binary, Seven Tools</h3>
            <p>
              The ProxyBase MCP server exposes the entire proxy lifecycle as
              tools. Download the binary, point it at your MCP client, and your
              AI can provision SOCKS5 proxies autonomously.
            </p>
            <ul className="mcp-features">
              <li>register_agent — Get an API key instantly</li>
              <li>list_packages — Browse available bandwidth packages</li>
              <li>list_currencies — See valid payment currencies</li>
              <li>create_order — Generate a crypto payment invoice</li>
              <li>check_order_status — Poll until proxy is active</li>
              <li>topup_order — Add bandwidth without new credentials</li>
              <li>rotate_proxy — Get a fresh IP on your next connection</li>
            </ul>
            <a
              href="https://github.com/proxybasehq/proxybase-mcp"
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="MCP Section: GitHub CTA"
            >
              ★ Get MCP Server from GitHub
            </a>
          </div>

          <div className="mcp-code">
            <div className="terminal">
              <div className="terminal-header">
                <span className="terminal-dot" />
                <span className="terminal-dot" />
                <span className="terminal-dot" />
                <span className="terminal-title">
                  mcp-client-config.json
                </span>
              </div>
              <div className="terminal-body">
                <pre style={{ margin: 0, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.82rem", lineHeight: "1.8" }}>
                  {configJson}
                </pre>
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <div className="terminal">
                <div className="terminal-header">
                  <span className="terminal-dot" />
                  <span className="terminal-dot" />
                  <span className="terminal-dot" />
                  <span className="terminal-title">
                    platforms
                  </span>
                </div>
                <div className="terminal-body" style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                  {[
                    "Linux x86_64",
                    "Linux ARM64",
                    "macOS Intel",
                    "macOS Apple Silicon",
                    "Windows x86_64",
                  ].map((p) => (
                    <span
                      key={p}
                      style={{
                        padding: "6px 14px",
                        background: "rgba(6, 214, 160, 0.08)",
                        border: "1px solid rgba(6, 214, 160, 0.2)",
                        borderRadius: 6,
                        fontSize: "0.78rem",
                        color: "var(--accent-primary)",
                        fontWeight: 500,
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
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
      q: "What makes ProxyBase different from traditional proxy providers?",
      a: "ProxyBase is built exclusively for autonomous AI agents and M2M workflows. There's no web dashboard, no manual IP whitelisting, no human interaction required. Everything is automated through our REST API and MCP server. Your AI agent can register, purchase, and use proxies entirely programmatically.",
    },
    {
      q: "What types of proxies do you offer?",
      a: "We offer US residential and mobile SOCKS5 proxies. Our hybrid supply chain combines a proprietary B2C mobile fleet with aggregated B2B partner networks, giving you access to highly trusted residential IPs that are difficult to detect and block.",
    },
    {
      q: "How does payment work?",
      a: "We accept cryptocurrency payments (USDC, USDT and many more) via Crypto. When you create an order, you receive a payment address. Once the blockchain confirms your transaction, your proxy credentials are provisioned automatically. No invoices, no manual approval.",
    },
    {
      q: "Do proxies expire?",
      a: "No. Your proxy never expires based on time. It remains active until your purchased bandwidth is fully consumed. You can top up anytime to extend your bandwidth — the same proxy credentials continue working.",
    },
    {
      q: "Can I have multiple proxies running simultaneously?",
      a: "Yes. Each agent can create multiple orders and maintain multiple active proxies simultaneously. There's no limit on concurrent proxy sessions — perfect for AI swarms and parallel scraping operations.",
    },
    {
      q: "What happens if I send the wrong payment amount?",
      a: "If you send less than the required amount (partial payment), the system waits for the remainder within the 7 days time window. If you overpay, the excess is handled by our payment processor according to their standard policies.",
    },
    {
      q: "How is bandwidth tracked?",
      a: "Bandwidth is tracked in real-time at the byte level. The backend counts every byte passing through the SOCKS5 proxy. You can poll the order status endpoint at any time to see exact usage. If you provided a callback URL, you'll receive webhook notifications at 80% and 95% usage.",
    },
    {
      q: "What is MCP and why should I care?",
      a: "MCP (Model Context Protocol) is an open standard that lets AI assistants like Claude and Cursor interact with external tools. Our MCP server lets your AI purchase and manage proxies through natural language — no code needed. Just install the binary and your AI handles the rest.",
    },
  ];

  return (
    <section className="section" id="faq">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-label">FAQ</span>
          <h2 className="section-title">Common Questions</h2>
        </div>

        <div className="faq-grid">
          {faqs.map((faq, i) => (
            <div
              className={`faq-item${openIndex === i ? " open" : ""}`}
              key={i}
            >
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                data-umami-event={`FAQ: Toggled Question ${i + 1}`}
              >
                {faq.q}
                <span className="faq-icon">+</span>
              </button>
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

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/logo.svg" alt="ProxyBase" className="logo-icon" style={{ width: 24, height: 24 }} />
          <span className="footer-text">
            © {new Date().getFullYear()} ProxyBase. AI Infrastructure for Agents.
          </span>
        </div>
        <ul className="footer-links">
          <li>
            <a href="#api" data-umami-event="Footer: API Docs">API Docs</a>
          </li>
          <li>
            <a
              href="https://github.com/proxybasehq/proxybase-mcp"
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="Footer: GitHub"
            >
              GitHub
            </a>
          </li>
          <li>
            <a href="mailto:humanshere@proxybase.xyz" data-umami-event="Footer: Contact">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
