import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export const metadata = {
  title: "What Is a Reverse Proxy? A Plain English Guide | ProxyBase",
  description:
    "Learn what a reverse proxy is, how it differs from a forward proxy, and when to use one. Covers load balancing, SSL termination, caching, and security for web applications.",
  keywords: "reverse proxy, what is a reverse proxy, reverse proxy explained, forward proxy vs reverse proxy, reverse proxy server, proxy server guide, load balancer, reverse proxy use cases",
  alternates: {
    canonical: "/what-is-reverse-proxy",
  },
  openGraph: {
    title: "What Is a Reverse Proxy? A Plain English Guide | ProxyBase",
    description:
      "Learn what a reverse proxy is, how it differs from a forward proxy, and when to use one. Covers load balancing, SSL termination, and security.",
    url: "https://proxybase.xyz/what-is-reverse-proxy",
  },
};

export default function WhatIsReverseProxy() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "What Is a Reverse Proxy? A Plain English Guide",
    "description": "Learn what a reverse proxy is, how it differs from a forward proxy, and when to use one for load balancing, SSL termination, caching, and security.",
    "url": "https://proxybase.xyz/what-is-reverse-proxy",
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
            <span className="section-label">Networking Guide</span>
            <h1 className="section-title" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
              What Is a Reverse Proxy?
            </h1>
            <p className="section-desc" style={{ maxWidth: "100%", margin: 0, textAlign: "left" }}>
              A plain English guide to how reverse proxies work, why they matter,
              and when to use one.
            </p>
          </div>

          <div className="terms-content" style={{ color: "var(--text-secondary)", lineHeight: "1.7", textAlign: "left" }}>
            <h2 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.8rem" }}>
              The Difference: Forward Proxy vs Reverse Proxy
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              A <strong>forward proxy</strong> sits in front of clients (like your browser or an AI agent)
              and routes their requests to the internet. It hides the client&rsquo;s IP address from destination
              servers. When you use ProxyBase, you&rsquo;re using a forward proxy — your requests go through a
              residential IP before reaching the target website.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              A <strong>reverse proxy</strong> sits in front of one or more servers and routes incoming
              client requests to the right backend. It hides the backend servers&rsquo; details from clients.
              Popular reverse proxies include Nginx, HAProxy, Cloudflare, and AWS Application Load Balancer.
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              margin: "2rem 0",
            }}>
              <div style={{ padding: "20px", background: "var(--bg-secondary)", borderRadius: "8px" }}>
                <h4 style={{ color: "var(--text-primary)", marginBottom: "8px" }}>Forward Proxy</h4>
                <p style={{ fontSize: "0.92rem", margin: 0 }}>
                  Client → Proxy → Internet<br />
                  Hides the client identity.<br />
                  Used for anonymity, geo-unblocking, web scraping.
                </p>
              </div>
              <div style={{ padding: "20px", background: "var(--bg-secondary)", borderRadius: "8px" }}>
                <h4 style={{ color: "var(--text-primary)", marginBottom: "8px" }}>Reverse Proxy</h4>
                <p style={{ fontSize: "0.92rem", margin: 0 }}>
                  Internet → Proxy → Server<br />
                  Hides server infrastructure.<br />
                  Used for load balancing, caching, security.
                </p>
              </div>
            </div>

            <h2 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.8rem" }}>
              What Reverse Proxies Do
            </h2>
            <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>Load balancing:</strong> Distribute incoming traffic across multiple backend
                servers so no single server gets overwhelmed. If one server goes down, the reverse proxy
                routes around it automatically.
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>SSL termination:</strong> Handle HTTPS encryption and decryption at the proxy
                layer so backend servers can focus on application logic. This simplifies certificate
                management — install the cert once on the reverse proxy, not on every server.
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>Caching:</strong> Store copies of frequently requested responses and serve them
                directly from the proxy, reducing load on backend servers and speeding up response times.
                This is what CDNs like Cloudflare do at global scale.
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>Security:</strong> Act as a shield between the public internet and your
                application servers. Filter malicious requests, block DDoS attacks, and hide internal
                server architecture (IPs, software versions, open ports).
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>Compression:</strong> Compress responses (gzip, brotli) before sending them
                to clients, reducing bandwidth costs and page load times.
              </li>
            </ul>

            <h2 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.8rem" }}>
              Common Reverse Proxy Software
            </h2>
            <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
              <li style={{ marginBottom: "0.5rem" }}><strong>Nginx</strong> — the most popular. Handles static file serving, reverse proxying, load balancing, and SSL termination in a single lightweight process.</li>
              <li style={{ marginBottom: "0.5rem" }}><strong>HAProxy</strong> — focused on high-availability load balancing. Common in large-scale microservice deployments.</li>
              <li style={{ marginBottom: "0.5rem" }}><strong>Cloudflare</strong> — a global reverse proxy and CDN. Sits between your domain and visitors, absorbing DDoS attacks and caching content at edge locations worldwide.</li>
              <li style={{ marginBottom: "0.5rem" }}><strong>AWS ALB / API Gateway</strong> — managed reverse proxies in AWS. ALB handles layer 7 HTTP routing; API Gateway handles REST and WebSocket APIs.</li>
              <li style={{ marginBottom: "0.5rem" }}><strong>Envoy</strong> — a modern L7 proxy used in service meshes (Istio, Consul). Designed for dynamic, cloud-native environments.</li>
            </ul>

            <h2 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.8rem" }}>
              When Forward and Reverse Proxies Work Together
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              In a scraping or AI agent pipeline, you chain both:
            </p>
            <p style={{ marginBottom: "1rem", fontFamily: "monospace", background: "var(--bg-secondary)", padding: "16px", borderRadius: "8px", fontSize: "0.9rem" }}>
              Your Agent → Forward Proxy (ProxyBase residential IP) → Internet → Reverse Proxy (Cloudflare/Nginx) → Target Website
            </p>
            <p style={{ marginBottom: "1rem" }}>
              The forward proxy hides who you are. The reverse proxy is what you&rsquo;re hitting —
              it&rsquo;s how the target website serves traffic, and it&rsquo;s often the thing running
              bot detection. If you build scraping or AI agent infrastructure, you need to
              understand both.
            </p>

            <div style={{
              marginTop: "3rem",
              padding: "32px",
              background: "var(--bg-secondary)",
              borderRadius: "12px",
              textAlign: "center",
            }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text-primary)" }}>
                Need Residential Forward Proxies for Your Agents?
              </h3>
              <p style={{ marginBottom: "1.5rem" }}>
                ProxyBase provides SOCKS5 residential and mobile proxies designed for AI agents and
                web scrapers. Pay-as-you-go, no KYC, crypto-native.
              </p>
              <Link
                href="/ai-agents"
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
                Explore AI Agent Proxies →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
