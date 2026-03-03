"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <section className="section" style={{ minHeight: "80vh", paddingTop: "120px" }}>
        <div className="section-inner" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>
          <div className="section-header" style={{ textAlign: "left", alignItems: "flex-start" }}>
            <span className="section-label">Legal Stuff</span>
            <h1 className="section-title" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Terms of Service</h1>
            <p className="section-desc" style={{ maxWidth: "100%", margin: 0, textAlign: "left" }}>
              Last updated: March 2026
            </p>
          </div>
          
          <div className="terms-content" style={{ color: "var(--text-secondary)", lineHeight: "1.7", textAlign: "left" }}>
            <h3 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem" }}>1. What even is ProxyBase?</h3>
            <p style={{ marginBottom: "1rem" }}>
              Look, we built ProxyBase to solve a very specific problem: autonomous AI agents and headless scraper swarms need a programmatic way to get reliable residential IP addresses without clicking around a web dashboard. 
            </p>
            <p style={{ marginBottom: "1rem" }}>
              By using our API, our MCP servers, or our OpenClaw skills, you're agreeing to these terms. If you don't agree, our API simply won't return any 200 OKs to you. Just don't use it.
            </p>

            <h3 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem" }}>2. Acceptable Use (Don't be that person)</h3>
            <p style={{ marginBottom: "1rem" }}>
              We're giving your agents access to a huge network of residential and mobile IPs. With great power comes the responsibility to not ruin it for everyone else. 
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong>You may NOT use our infrastructure for:</strong>
            </p>
            <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>DDoS attacks, botnets, or any kind of network stress testing.</li>
              <li style={{ marginBottom: "0.5rem" }}>Credential stuffing, carding, or brute-forcing accounts.</li>
              <li style={{ marginBottom: "0.5rem" }}>Spamming email systems or forum comments.</li>
              <li style={{ marginBottom: "0.5rem" }}>Distributing malware, phishing, or anything else considered illegal.</li>
            </ul>
            <p style={{ marginBottom: "1rem" }}>
              If we detect your agent doing this stuff, we will immediately burn your API key, terminate your active sessions, and block your agent ID. No warnings.
            </p>

            <h3 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem" }}>3. Crypto Payments & Refunds</h3>
            <p style={{ marginBottom: "1rem" }}>
              We're a crypto-first platform. Operations are fully headless and machine-to-machine. 
              Because blockchains are immutable and we don't have a massive human billing department processing chargebacks, <strong>all payments are final</strong>. 
            </p>
            <p style={{ marginBottom: "1rem" }}>
              If your agent underpays an invoice (sending $9.80 instead of $10.00), the network waits for the rest. Check your agent's math before broadcasting the transaction. If there's a catastrophic failure on our end where your order is Paid but the proxy never provisions, hit us up at <a href="mailto:humanshere@proxybase.xyz" style={{ color: "var(--accent-primary)", textDecoration: "none" }}>humanshere@proxybase.xyz</a> and we'll manually patch your account bandwidth or drop you a new API key.
            </p>

            <h3 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem" }}>4. Uptime & "As-Is" Provisioning</h3>
            <p style={{ marginBottom: "1rem" }}>
              We rely on a hybrid network of proprietary mobile fleets and B2B aggregators. While our backend routing is built in Rust to be aggressively fast and stable, the nature of SOCKS5 proxies routing through real residential connections means occasionally a node goes offline or gets slow. 
            </p>
            <p style={{ marginBottom: "1rem" }}>
              We provide ProxyBase strictly on an "AS IS" and "AS AVAILABLE" basis. We don't offer strict enterprise SLAs or compensation for downtime. If an IP gets burned or unresponsive, just hit the <code style={{ background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: "4px" }}>/rotate</code> endpoint—that's what it's there for.
            </p>

            <h3 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem" }}>5. Data & Privacy</h3>
            <p style={{ marginBottom: "1rem" }}>
              We log the absolute minimum required to bill you for bandwidth (byte counters) and prevent gross abuse. We don't want your data, and we don't want to know your identity. That's why we generate random Agent IDs instead of making you fill out a KYC form. Keep your <code style={{ background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: "4px" }}>PROXYBASE_API_KEY</code> safe. If someone else gets it, they can spend your prepaid bandwidth, and we can't reverse that.
            </p>

            <h3 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem" }}>6. Changes to these Terms</h3>
            <p style={{ marginBottom: "1rem" }}>
              We might update these terms as we grow or as regulators inevitably draft new rules about AI agents. When we do, we'll try to push a notice, but you should probably check back here once in a while. Your agents continuing to hit our API means you agree to the updated terms.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
