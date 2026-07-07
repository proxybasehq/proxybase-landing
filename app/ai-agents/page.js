"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AIAgentsPage() {
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
                curl -X POST https://api.proxybase.xyz/v2/wallet \
              </div>
              <div className="terminal-line">
                <span className="terminal-indent">&nbsp;&nbsp;&nbsp;&nbsp;-d &apos;&#123;&quot;public_key&quot;: &quot;0xYourAgentWallet...&quot;&#125;&apos;</span>
              </div>
              <div className="terminal-line" style={{ marginTop: 8 }}>
                <span className="terminal-comment"># 2. Get instantaneous SOCKS5 credentials</span>
              </div>
              <div className="terminal-line">
                <span className="terminal-prompt">$ </span>
                socks5://0xYourAgentWallet:signature@socks5.proxybase.xyz:1080
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
    <section className="how-it-works" id="how-it-works">
      <div className="section-header">
        <span className="section-label">Architecture</span>
        <h2>Machine-to-Machine Proxying</h2>
        <p className="section-desc">
          Designed from the ground up for agentic workflows. Run scrapers,
          LLMs, and autonomous browser tasks without human intervention.
        </p>
      </div>

      <div className="steps-flow">
        <div className="step-card">
          <div className="step-num">01</div>
          <h3>Wallet Authentication</h3>
          <p>
            No credit cards, no passwords, no email registrations. Agents auth
            using cryptographic signatures. Deposit stablecoins to your agent&apos;s
            balance instantly.
          </p>
        </div>

        <div className="step-card">
          <div className="step-num">02</div>
          <h3>Intent-Based SOCKS5</h3>
          <p>
            Dynamically request specific IP parameters straight in the SOCKS5
            connection string (e.g. <code>socks5://wallet:sig@socks5.proxybase.xyz:1080?country=us</code>).
          </p>
        </div>

        <div className="step-card">
          <div className="step-num">03</div>
          <h3>Dual-Path Self-Healing</h3>
          <p>
            Our Rust gateways maintain multiple simultaneous upstream connections
            per session. If an IP gets throttled, traffic switches paths instantly.
          </p>
        </div>

        <div className="step-card">
          <div className="step-num">04</div>
          <h3>Real-Time Telemetry</h3>
          <p>
            Monitor data usage, bandwidth speed, and path latency directly from
            the REST API. Automatically top-up balances when thresholds trigger.
          </p>
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
    <section className="pricing-section" id="pricing">
      <div className="section-header">
        <span className="section-label">Pricing</span>
        <h2>No Subscriptions. Pay-as-you-Go.</h2>
        <p className="section-desc">
          Pay strictly for the bandwidth your agents consume. Credits never
          expire. Deposit stablecoins anytime.
        </p>
      </div>

      <div className="pricing-grid">
        <div className="pricing-card">
          <h3>Residential</h3>
          <div className="price-amount">
            $3.00<span>/GB</span>
          </div>
          <p className="pricing-desc">
            Bypass Geo-blocking and scrapers using residential IPs.
          </p>
          <ul className="pricing-features">
            <li>✓ Global Geo-Targeting (State/City)</li>
            <li>✓ Rotating or Sticky Sessions</li>
            <li>✓ Yamux Stream Multiplexing</li>
            <li>✓ Dual-Path Failover Enabled</li>
          </ul>
          <a href="#api" className="btn-primary">Deposit Now</a>
        </div>

        <div className="pricing-card premium">
          <div className="card-badge">Most Popular</div>
          <h3>Mobile (4G/5G)</h3>
          <div className="price-amount">
            $5.00<span>/GB</span>
          </div>
          <p className="pricing-desc">
            Highest trust score IPs sourced from active mobile carriers.
          </p>
          <ul className="pricing-features">
            <li>✓ Carrier-Level Targeting</li>
            <li>✓ Automatic IP Rotation (Self-Healing)</li>
            <li>✓ High-Throughput Relays</li>
            <li>✓ Cleanest ASN Reputations</li>
          </ul>
          <a href="#api" className="btn-primary">Deposit Now</a>
        </div>
      </div>
    </section>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   API DOCS
   ═══════════════════════════════════════════════════════════════════════════ */

function ApiDocs() {
  return (
    <section className="api-section" id="api">
      <div className="section-header">
        <span className="section-label">Developer Docs</span>
        <h2>Headless Integration</h2>
        <p className="section-desc">
          No dashboards. Manage everything using simple curl requests.
        </p>
      </div>

      <div className="api-grid">
        <div className="api-docs-content">
          <div className="api-endpoint">
            <span className="method-post">POST</span>
            <code>/v2/wallet</code>
            <p>Register or retrieve wallet information.</p>
          </div>

          <div className="api-endpoint">
            <span className="method-get">GET</span>
            <code>/v2/sessions</code>
            <p>List all active proxy sessions and bandwidth utilization.</p>
          </div>

          <div className="api-endpoint">
            <span className="method-post">POST</span>
            <code>/v2/payouts</code>
            <p>Create a withdrawal order for accrued node yields.</p>
          </div>
        </div>

        <div className="api-code-block">
          <div className="code-header">
            <span>GET /v2/sessions</span>
          </div>
          <pre>
{`{
  "sessions": [
    {
      "id": "sess_81a2f90b",
      "target": "google.com:443",
      "bandwidth_bytes": 1048576,
      "latency_ms": 112,
      "path_status": "Active"
    }
  ]
}`}
          </pre>
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
    <section className="mcp-section" id="mcp">
      <div className="section-header">
        <span className="section-label">LLM Native</span>
        <h2>Model Context Protocol (MCP) Server</h2>
        <p className="section-desc">
          Allow Claude or any other LLM to interact directly with ProxyBase.
          The agent can purchase proxies autonomously when needed.
        </p>
      </div>

      <div className="mcp-container">
        <div className="mcp-text">
          <h3>Autonomous Web Browsing for LLMs</h3>
          <p>
            By launching the ProxyBase MCP server, you give your LLM agent tools to
            manage its own routing infrastructure. The agent can:
          </p>
          <ul className="mcp-list">
            <li>⚡ Read wallet status and check balance</li>
            <li>⚡ Generate ephemeral proxy credentials</li>
            <li>⚡ Switch target locations programmatically</li>
            <li>⚡ Initiate self-top-up tasks using microcredits</li>
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
        <div className="mcp-graphic">
          <div className="mcp-node">LLM Agent</div>
          <div className="mcp-arrow">MCP Protocol</div>
          <div className="mcp-node highlight">ProxyBase MCP Server</div>
          <div className="mcp-arrow">Yamux Tunnel</div>
          <div className="mcp-node">Residential Node</div>
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
      q: "How do I deposit funds?",
      a: "Perform a GET request to `/v2/deposits/address` to fetch your deposit address. Fund it using USDC/USDT on any major supported network. Your balance will credit within 1 block."
    },
    {
      q: "Can my agents check their own balance?",
      a: "Yes. By utilizing the REST API or the MCP server, your LLM agent can autonomously query `/v2/wallet` and decide when to alert the operator or allocate more resources."
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
    <section className="faq-section" id="faq">
      <div className="section-header">
        <span className="section-label">Support</span>
        <h2>FAQ</h2>
        <p className="section-desc">Common questions regarding ProxyBase client integration.</p>
      </div>

      <div className="faq-list">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`faq-item ${openIndex === i ? 'open' : ''}`}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <div className="faq-question">
              <h3>{faq.q}</h3>
              <span className="faq-toggle">{openIndex === i ? '−' : '+'}</span>
            </div>
            <div className="faq-answer">
              <p>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
