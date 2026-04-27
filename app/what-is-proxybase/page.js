import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "What is ProxyBase? — A Plain English Guide | ProxyBase",
  description:
    "ProxyBase is programmatic SOCKS5 proxy infrastructure designed for AI agents, autonomous systems, and web scrapers. Learn what it is, who it's for, and when to use it.",
  alternates: {
    canonical: "/what-is-proxybase",
  },
  openGraph: {
    title: "What is ProxyBase? — A Plain English Guide",
    description:
      "ProxyBase is programmatic SOCKS5 proxy infrastructure designed for AI agents, autonomous systems, and web scrapers.",
    url: "https://proxybase.xyz/what-is-proxybase",
  },
};

export default function WhatIsProxyBase() {
  return (
    <>
      <Navbar />
      <section className="section" style={{ minHeight: "80vh", paddingTop: "120px" }}>
        <div className="section-inner" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>
          <div className="section-header" style={{ textAlign: "left", alignItems: "flex-start" }}>
            <span className="section-label">About ProxyBase</span>
            <h1 className="section-title" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>What is ProxyBase?</h1>
            <p className="section-desc" style={{ maxWidth: "100%", margin: 0, textAlign: "left" }}>
              A plain English guide to understanding our proxy infrastructure.
            </p>
          </div>
          
          <div className="terms-content" style={{ color: "var(--text-secondary)", lineHeight: "1.7", textAlign: "left" }}>
            <h2 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.8rem" }}>What it is</h2>
            <p style={{ marginBottom: "1rem" }}>
              ProxyBase is a programmatic SOCKS5 proxy infrastructure designed specifically for artificial intelligence agents, autonomous systems, and advanced web scrapers. In simple terms, it is a service that provides alternative IP addresses (residential and mobile) so that your automated programs can browse the internet without being blocked, rate-limited, or identified as a single bot.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              Unlike traditional proxy services that require humans to log into a web dashboard, add a credit card, and click buttons to configure IP addresses, ProxyBase operates entirely through code. You interact with it using a REST API, Model Context Protocol (MCP) servers, or pre-built agent skills (like OpenClaw). You can generate an account, buy bandwidth using cryptocurrency, and instantly access proxies entirely via the command line or code.
            </p>

            <h2 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.8rem" }}>Who it is for</h2>
            <p style={{ marginBottom: "1rem" }}>
              ProxyBase is built for developers, AI engineers, and autonomous agent systems. It is the ideal infrastructure for:
            </p>
            <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
              <li style={{ marginBottom: "0.5rem" }}><strong>AI Agents & LLMs:</strong> Autonomous systems that need to research the web, gather data, or interact with websites that typically block data-center IP addresses.</li>
              <li style={{ marginBottom: "0.5rem" }}><strong>Web Scrapers & Data Engineers:</strong> Developers extracting large amounts of public data who need reliable residential and mobile IPs to avoid anti-bot protections.</li>
              <li style={{ marginBottom: "0.5rem" }}><strong>Machine-to-Machine Networks:</strong> Systems built to operate fully headless, handling their own provisioning, rotation, and cryptocurrency billing without human intervention.</li>
            </ul>

            <h2 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.8rem" }}>When to use it</h2>
            <p style={{ marginBottom: "1rem" }}>
              You should use ProxyBase when your automated tasks or AI agents are failing because they are being blocked or flagged by the websites they are trying to access. Typical scenarios include:
            </p>
            <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>When your AI agent needs to bypass web application firewalls (WAFs) or CAPTCHAs that block standard cloud provider IPs (like AWS, GCP, or DigitalOcean).</li>
              <li style={{ marginBottom: "0.5rem" }}>When you are building a fully autonomous system and need a provider that allows the system to create its own account and pay for its own usage via an API.</li>
              <li style={{ marginBottom: "0.5rem" }}>When you need to programmatically rotate IP addresses on demand (e.g., calling an endpoint to instantly get a fresh IP) during long-running scraping jobs.</li>
              <li style={{ marginBottom: "0.5rem" }}>When you want a specialized infrastructure that supports seamless integration into modern AI frameworks using the Model Context Protocol (MCP) or predefined skills (like OpenClaw).</li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}