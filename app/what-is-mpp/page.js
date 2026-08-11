import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export const metadata = {
  title: "What is MPP? Micropayments Protocol for Proxy Infrastructure | ProxyBase",
  description:
    "MPP (Micropayments Protocol) lets software agents pay for proxy access automatically — no accounts, no API keys, no human in the loop. Learn how machine-to-machine payments work and why they matter for AI agents.",
  keywords: "mpp proxy, micropayments protocol, mpp, machine to machine payments, proxy micropayments, mppx, crypto proxy payments, 402 payment required, agent payments, proxybase mpp",
  alternates: {
    canonical: "/what-is-mpp",
  },
  openGraph: {
    title: "What is MPP? Micropayments Protocol for Proxy Infrastructure | ProxyBase",
    description:
      "MPP lets software agents pay for proxy access automatically — no accounts, no API keys. Learn how machine-to-machine payments work.",
    url: "https://proxybase.xyz/what-is-mpp",
  },
};

export default function WhatIsMppPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "What is MPP? Micropayments Protocol for Proxy Infrastructure",
    "description": "MPP (Micropayments Protocol) lets software agents pay for proxy access automatically — no accounts, no API keys, no human in the loop.",
    "url": "https://proxybase.xyz/what-is-mpp",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <section className="section" style={{ minHeight: "80vh", paddingTop: "120px" }}>
        <div className="section-inner" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>
          <div className="section-header" style={{ textAlign: "left", alignItems: "flex-start" }}>
            <span className="section-label">Agent Economy</span>
            <h1 className="section-title" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
              What is MPP? Micropayments for Proxy Infrastructure
            </h1>
            <p className="section-desc" style={{ maxWidth: "100%", margin: 0, textAlign: "left" }}>
              MPP (Micropayments Protocol) lets software agents pay for proxy access automatically.
              No accounts, no API keys, no human in the loop — just a payment and a connection.
            </p>
          </div>

          <div className="terms-content" style={{ color: "var(--text-secondary)", lineHeight: "1.7", textAlign: "left" }}>
            <h2 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.8rem" }}>
              The Problem MPP Solves
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              To access a paid API or service today, you create an account, generate an API key, add a credit
              card, and get billed monthly. When a person is driving, this is fine.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              It breaks for AI agents. An LLM agent can&rsquo;t fill out a signup form. It can&rsquo;t verify an
              email address or wait for a compliance review. If your agent needs proxy access mid-task and the
              only way to get it is through a human clicking a dashboard, your pipeline isn&rsquo;t autonomous.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              MPP embeds payment directly into HTTP. An agent sends a request, receives a payment challenge,
              pays in stablecoins, and gets access in a single round-trip. No account creation, no API key
              management, no human approval.
            </p>

            <h2 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.8rem" }}>
              How MPP Works
            </h2>
            <ol style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
              <li style={{ marginBottom: "0.75rem" }}>
                Your agent makes an HTTP GET to a payment-gated endpoint (e.g.{" "}
                <code>/api/mpp/us_residential_1gb</code>).
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                Instead of blocking the request or redirecting to a login page, the server returns HTTP 402
                with payment details: amount, currency, and recipient address on-chain.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                The agent (or the <code>mppx</code> client library) submits a stablecoin transaction
                matching the payment challenge — USDC on Solana via Tempo.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                Once the transaction confirms, the server returns SOCKS5 proxy credentials. The whole
                flow takes under 3 seconds.
              </li>
            </ol>

            <div style={{
              background: "var(--bg-secondary)",
              borderRadius: "12px",
              padding: "24px",
              margin: "2rem 0",
              fontFamily: "monospace",
              fontSize: "0.9rem",
              lineHeight: 1.8,
            }}>
              <div style={{ color: "var(--text-muted)", marginBottom: "8px" }}># Agent requests proxy access</div>
              <div style={{ color: "var(--text-primary)" }}>GET /api/mpp/us_residential_1gb</div>
              <div style={{ color: "var(--text-muted)", margin: "12px 0 8px" }}># Server challenges with payment details</div>
              <div style={{ color: "var(--accent-primary)" }}>402 Payment Required</div>
              <div style={{ color: "var(--text-muted)" }}>{'{'} "amount": "3.00", "currency": "USDC", "recipient": "0x..." {'}'}</div>
              <div style={{ color: "var(--text-muted)", margin: "12px 0 8px" }}># Agent pays via mppx client → gets credentials</div>
              <div style={{ color: "var(--accent-primary)" }}>200 OK</div>
              <div style={{ color: "var(--text-muted)" }}>{'{'} "proxy": {"{"} "host": "...", "port": 1080 {"}"} {'}'}</div>
            </div>

            <h2 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.8rem" }}>
              Why MPP Matters for Proxy Infrastructure
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              Traditional proxy providers gate access behind accounts and API keys. Each layer creates
              friction an agent can&rsquo;t resolve on its own:
            </p>
            <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>
                Your agent can&rsquo;t sign up for Bright Data or Oxylabs. A human creates the account and
                submits KYC documents before a single request goes through.
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                API keys get rotated, revoked, and expire. Your agent needs logic to track key lifecycle,
                which is unrelated to the task you built it for.
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                Monthly subscriptions and manual top-ups require a person watching the balance. If your
                agent runs out of credits at 3 AM, it sits idle until you wake up and refill.
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                Enterprise providers demand contracts, KYC documents, and sales calls. An agent can&rsquo;t
                negotiate a contract or upload a passport.
              </li>
            </ul>
            <p style={{ marginBottom: "1rem" }}>
              MPP folds payment into the request itself. Your agent pays for the bandwidth it needs, when
              it needs it. The payment is the authentication. No account, no key, no human involved.
            </p>

            <h2 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.8rem" }}>
              How ProxyBase Uses MPP
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              ProxyBase exposes proxy packages through MPP-gated endpoints. Each package (1GB US residential,
              5GB Germany mobile) has a dedicated URL. When your agent hits that URL:
            </p>
            <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>
                The <code>mppx/nextjs</code> middleware intercepts the request and returns a 402 payment challenge.
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                Your agent pays the challenge in USDC via Tempo on Solana, using the <code>mppx</code> client.
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                After payment confirms, the route handler provisions a SOCKS5 proxy and returns the
                credentials in the response body.
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                Your agent connects and routes traffic through a clean residential IP. No signup.
              </li>
            </ul>

            <p style={{ marginBottom: "1rem" }}>
              Your AI agent provisions its own proxy access. If it needs a German residential IP for a
              task, it pays for one and gets one. If it needs to rotate, it pays for another. All
              programmatic, no human in the loop.
            </p>

            <div style={{
              marginTop: "3rem",
              padding: "32px",
              background: "var(--bg-secondary)",
              borderRadius: "12px",
              textAlign: "center",
            }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text-primary)" }}>
                Try MPP Proxy Access Now
              </h3>
              <p style={{ marginBottom: "1.5rem" }}>
                Buy SOCKS5 proxy bandwidth with a single HTTP request. No account, no API key, no KYC
                required. Pay with stablecoins, get credentials back instantly.
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <Link
                  href="/mpp"
                  style={{
                    display: "inline-block",
                    padding: "12px 28px",
                    background: "var(--accent-primary)",
                    color: "#fff",
                    borderRadius: "8px",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Browse MPP Packages →
                </Link>
                <Link
                  href="/blog/what-is-proxybase-mpp"
                  style={{
                    display: "inline-block",
                    padding: "12px 28px",
                    background: "transparent",
                    color: "var(--text-primary)",
                    borderRadius: "8px",
                    fontWeight: 600,
                    textDecoration: "none",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  Read the Full Story →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
