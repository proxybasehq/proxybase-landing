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
      <div className="section-inner-container">
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
      <div className="section-inner-container">
        <div className="section-header">
          <span className="section-label">Pricing</span>
          <h2>No Subscriptions. Pay-as-you-Go.</h2>
          <p className="section-desc">
            Pay strictly for the bandwidth your agents consume. Credits never
            expire. Deposit stablecoins anytime.
          </p>
        </div>

        <div className="pricing-grid-2">
          <div className="price-card">
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

          <div className="price-card featured">
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
    <section className="api-section" id="api">
      <div className="section-inner-container">
        <div className="section-header">
          <span className="section-label">Developer Docs</span>
          <h2>Headless API Reference</h2>
          <p className="section-desc">
            Full programmatic control for autonomous agents and scrapers. Manage wallets, query telemetry, and route SOCKS5 tunnels via simple REST and socket requests.
          </p>
        </div>

        <div className="api-content">
          {/* STICKY SIDEBAR NAV */}
          <div className="api-sidebar">
            <ul className="api-nav">
              <li>
                <a href="#auth" className={activeTab === 'auth' ? 'active' : ''} onClick={() => setActiveTab('auth')}>
                  1. Authentication
                </a>
              </li>
              <li>
                <a href="#wallet" className={activeTab === 'wallet' ? 'active' : ''} onClick={() => setActiveTab('wallet')}>
                  2. Wallet & Balance
                </a>
              </li>
              <li>
                <a href="#sessions" className={activeTab === 'sessions' ? 'active' : ''} onClick={() => setActiveTab('sessions')}>
                  3. Active Sessions
                </a>
              </li>
              <li>
                <a href="#socks5" className={activeTab === 'socks5' ? 'active' : ''} onClick={() => setActiveTab('socks5')}>
                  4. SOCKS5 Gateway
                </a>
              </li>
              <li>
                <a href="#payouts" className={activeTab === 'payouts' ? 'active' : ''} onClick={() => setActiveTab('payouts')}>
                  5. Yield Payouts
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
                <span className="api-path">https://api.proxybase.xyz/v2</span>
              </div>
              <h3>Cryptographic Agent Authentication</h3>
              <p>
                All ProxyBase API endpoints require stateless authentication using ED25519 or ECDSA cryptographic signatures. Instead of managing fragile API keys or OAuth tokens, autonomous AI agents sign requests directly using their private wallet key.
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
                        <td><code>X-Agent-Wallet</code></td>
                        <td>string</td>
                        <td><span className="api-required">Required</span></td>
                        <td>The public hex address of your agent wallet (e.g., <code>0x71C...8932</code>).</td>
                      </tr>
                      <tr>
                        <td><code>X-Agent-Signature</code></td>
                        <td>string</td>
                        <td><span className="api-required">Required</span></td>
                        <td>Hex-encoded cryptographic signature of the unix timestamp string.</td>
                      </tr>
                      <tr>
                        <td><code>X-Timestamp</code></td>
                        <td>integer</td>
                        <td><span className="api-required">Required</span></td>
                        <td>Current unix timestamp in milliseconds. Requests older than 30s are rejected.</td>
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
{`curl -X GET https://api.proxybase.xyz/v2/wallet \\
  -H "X-Agent-Wallet: 0x71C8375628293746582937465829374658293746" \\
  -H "X-Timestamp: 1720339200000" \\
  -H "X-Agent-Signature: 3045022100a8...f9e202207b1c..."`}
                </pre>
              </div>
            </div>

            {/* 2. WALLET & BALANCE */}
            <div className="api-endpoint" id="wallet">
              <div className="api-method-badge">
                <span className="method-post">POST</span>
                <span className="api-path">/v2/wallet</span>
              </div>
              <h3>Register or Retrieve Wallet Balance</h3>
              <p>
                Registers a new agent wallet address on the ProxyBase routing grid or retrieves current real-time stablecoin balances, microcredit allocations, and active proxy utilization tiers.
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
                        <td><code>public_key</code></td>
                        <td>string</td>
                        <td><span className="api-required">Required</span></td>
                        <td>The cryptographic public key or wallet address of the agent.</td>
                      </tr>
                      <tr>
                        <td><code>webhook_url</code></td>
                        <td>string</td>
                        <td>Optional</td>
                        <td>HTTPS endpoint to receive asynchronous balance threshold alerts.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="code-block">
                <div className="code-block-header">
                  <span>POST /v2/wallet — Response</span>
                  <span className="code-block-lang">json</span>
                </div>
                <pre>
{`{
  "status": "success",
  "wallet": "0x71C8375628293746582937465829374658293746",
  "balance_usdc": 45.50,
  "credits_available": 4550000,
  "active_sessions": 3,
  "tier": "Residential_Mobile_Hybrid"
}`}
                </pre>
              </div>
            </div>

            {/* 3. ACTIVE SESSIONS */}
            <div className="api-endpoint" id="sessions">
              <div className="api-method-badge">
                <span className="method-get">GET</span>
                <span className="api-path">/v2/sessions</span>
              </div>
              <h3>List Active Proxy Sessions & Telemetry</h3>
              <p>
                Returns live telemetry on all active SOCKS5 proxy streams connected to your agent wallet, including real-time bandwidth consumption, destination target hosts, latency metrics, and path health.
              </p>

              <div className="api-params">
                <h4>Query Parameters</h4>
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
                        <td><code>limit</code></td>
                        <td>integer</td>
                        <td>Optional</td>
                        <td>Maximum number of sessions to return (default: 50, max: 250).</td>
                      </tr>
                      <tr>
                        <td><code>status</code></td>
                        <td>string</td>
                        <td>Optional</td>
                        <td>Filter by session state: <code>Active</code>, <code>Idle</code>, or <code>Terminated</code>.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="code-block">
                <div className="code-block-header">
                  <span>GET /v2/sessions?status=Active — Response</span>
                  <span className="code-block-lang">json</span>
                </div>
                <pre>
{`{
  "sessions": [
    {
      "id": "sess_81a2f90b",
      "target": "api.openai.com:443",
      "bandwidth_bytes": 1048576,
      "latency_ms": 94,
      "node_country": "US",
      "path_status": "Active"
    },
    {
      "id": "sess_49c3e12a",
      "target": "scholar.google.com:443",
      "bandwidth_bytes": 5242880,
      "latency_ms": 112,
      "node_country": "GB",
      "path_status": "Active"
    }
  ],
  "total_active_bandwidth_mb": 6.29
}`}
                </pre>
              </div>
            </div>

            {/* 4. SOCKS5 GATEWAY */}
            <div className="api-endpoint" id="socks5">
              <div className="api-method-badge">
                <span className="method-get">SOCKS5</span>
                <span className="api-path">socks5://socks5.proxybase.xyz:1080</span>
              </div>
              <h3>Intent-Based SOCKS5 Proxy Gateway</h3>
              <p>
                Connect your AI agents directly to the headless ProxyBase routing grid using standard SOCKS5 protocols. Specify geolocation, session rotation, and carrier preferences dynamically inside the connection username string.
              </p>

              <div className="api-params">
                <h4>Connection String Parameters</h4>
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
                        <td><code>country</code></td>
                        <td>string</td>
                        <td>Optional</td>
                        <td>2-letter ISO country code for geolocation targeting (e.g., <code>us</code>, <code>gb</code>, <code>de</code>).</td>
                      </tr>
                      <tr>
                        <td><code>state</code></td>
                        <td>string</td>
                        <td>Optional</td>
                        <td>State or region targeting for domestic residential nodes (e.g., <code>ca</code>, <code>ny</code>).</td>
                      </tr>
                      <tr>
                        <td><code>session</code></td>
                        <td>string</td>
                        <td>Optional</td>
                        <td>Custom session identifier. Maintain the same ID across requests to keep a sticky IP address.</td>
                      </tr>
                      <tr>
                        <td><code>network</code></td>
                        <td>string</td>
                        <td>Optional</td>
                        <td>Specify IP network type: <code>residential</code> (default) or <code>mobile</code>.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="code-block">
                <div className="code-block-header">
                  <span>SOCKS5 Connection Example (Python Requests / cURL)</span>
                  <span className="code-block-lang">bash</span>
                </div>
                <pre>
{`# cURL example targeting US Residential sticky session
curl -x "socks5://0xYourWallet:signature_timestamp@socks5.proxybase.xyz:1080?country=us&session=agent_task_1" \\
  https://httpbin.org/ip

# Python Requests example
import requests

proxies = {
    'http': 'socks5://0xYourWallet:sig@socks5.proxybase.xyz:1080?country=de&network=mobile',
    'https': 'socks5://0xYourWallet:sig@socks5.proxybase.xyz:1080?country=de&network=mobile'
}
response = requests.get('https://api.targetdomain.com/data', proxies=proxies)`}
                </pre>
              </div>
            </div>

            {/* 5. YIELD PAYOUTS */}
            <div className="api-endpoint" id="payouts">
              <div className="api-method-badge">
                <span className="method-post">POST</span>
                <span className="api-path">/v2/payouts</span>
              </div>
              <h3>Create Yield Withdrawal Order</h3>
              <p>
                Initiates an automated on-chain withdrawal of accrued node bandwidth earnings or excess agent balance directly to your specified cryptocurrency wallet address.
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
                        <td><code>amount_credits</code></td>
                        <td>integer</td>
                        <td><span className="api-required">Required</span></td>
                        <td>Number of microcredits to withdraw (100,000 credits = $1.00 USD). Minimum: 100,000.</td>
                      </tr>
                      <tr>
                        <td><code>destination_address</code></td>
                        <td>string</td>
                        <td><span className="api-required">Required</span></td>
                        <td>On-chain wallet address receiving the stablecoin transfer.</td>
                      </tr>
                      <tr>
                        <td><code>network</code></td>
                        <td>string</td>
                        <td><span className="api-required">Required</span></td>
                        <td>Target blockchain: <code>polygon</code>, <code>solana</code>, <code>arbitrum</code>, or <code>ethereum</code>.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="code-block">
                <div className="code-block-header">
                  <span>POST /v2/payouts — Response</span>
                  <span className="code-block-lang">json</span>
                </div>
                <pre>
{`{
  "status": "success",
  "payout_id": "po_99283746a",
  "amount_usdc": 10.00,
  "credits_deducted": 1000000,
  "network": "polygon",
  "tx_hash": "0x3892847562938475629384756293847562938475629384756293847562938475",
  "estimated_arrival_seconds": 15
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
    <section className="mcp-section" id="mcp">
      <div className="section-inner-container">
        <div className="section-header">
          <span className="section-label">LLM Native</span>
          <h2>Model Context Protocol (MCP) Server</h2>
          <p className="section-desc">
            Allow Claude or any other LLM to interact directly with ProxyBase.
            The agent can purchase proxies autonomously when needed.
          </p>
        </div>

        <div className="mcp-grid">
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
      <div className="section-inner-container">
        <div className="section-header">
          <span className="section-label">Support</span>
          <h2>FAQ</h2>
          <p className="section-desc">Common questions regarding ProxyBase client integration.</p>
        </div>

        <div className="faq-grid">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq-item ${openIndex === i ? 'open' : ''}`}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
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
