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
              What Is a Reverse Proxy? A Simple Definition
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              A <strong>reverse proxy</strong> is a server that sits in front of one or more backend servers
              and forwards client requests to the appropriate backend. Instead of clients connecting directly
              to your application servers, they connect to the reverse proxy, which then routes traffic, handles
              encryption, balances load, and caches responses.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              A reverse proxy is the front desk of a building. Visitors check in and get directed to the right
              office. They never see the floor plan. The reverse proxy knows which backend server handles each
              request and shields the internal layout from outsiders.
            </p>

            <h2 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.8rem" }}>
              How a Reverse Proxy Works (Step by Step)
            </h2>
            <ol style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Client sends a request</strong> — A browser, mobile app, or API client makes an HTTP
                request to your domain (e.g. <code>https://api.yourservice.com/data</code>).
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>DNS routes to the reverse proxy</strong> — Your domain&rsquo;s DNS records point to
                the reverse proxy, not your application servers. The proxy is the only server exposed to the
                public internet.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Proxy inspects the request</strong> — It checks the URL path, Host header, and other
                request attributes against its routing rules to decide which backend should handle it.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Proxy applies policies</strong> — Rate limiting, authentication, IP allow/block lists,
                and request filtering happen here before the request ever reaches your application.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Request forwarded to backend</strong> — The proxy opens a connection to the chosen
                backend server and passes the (potentially modified) request through.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Response flows back through the proxy</strong> — The backend responds. The proxy may
                cache the response, compress it, or modify headers before returning it to the client.
              </li>
            </ol>

            <h2 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.8rem" }}>
              Forward Proxy vs Reverse Proxy: The Key Difference
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
            <p style={{ marginBottom: "1rem" }}>
              The direction is the difference: <strong>forward proxies protect clients</strong> (you),
              while <strong>reverse proxies protect servers</strong> (your infrastructure). Many real-world
              setups use both — forward proxies for outbound anonymity, reverse proxies for inbound traffic
              management.
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
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Load balancing:</strong> Distribute incoming traffic across multiple backend
                servers so no single server gets overwhelmed. Common algorithms include round-robin,
                least connections, and IP hash. If one server goes down, the reverse proxy
                routes around it automatically — this is called failover or high availability.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>SSL termination:</strong> Handle HTTPS encryption and decryption at the proxy
                layer so backend servers can focus on application logic. This simplifies certificate
                management — install the cert once on the reverse proxy, not on every server. It also
                offloads CPU-intensive TLS handshakes from your application servers.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Caching:</strong> Store copies of frequently requested responses and serve them
                directly from the proxy, reducing load on backend servers and speeding up response times
                for users. A reverse proxy can cache static assets (images, CSS, JS), API responses,
                or entire HTML pages. This is what CDNs like Cloudflare do at global scale.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Security:</strong> Act as a shield between the public internet and your
                application servers. Filter malicious requests, block DDoS attacks, hide internal
                server architecture (IPs, software versions, open ports), and enforce IP allow/block
                lists. If an attacker can&rsquo;t see your origin server, they can&rsquo;t directly attack it.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Compression:</strong> Compress responses (gzip, brotli) before sending them
                to clients, reducing bandwidth costs and page load times. A reverse proxy can compress
                once and serve the compressed version from cache.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Request routing:</strong> Route requests to different backends based on URL path,
                hostname, or headers. For example: <code>/api/*</code> goes to your API servers,{" "}
                <code>/blog/*</code> goes to your CMS, and <code>/app/*</code> goes to your web app.
                This is sometimes called a <strong>layer 7 proxy</strong> or content-based routing.
              </li>
            </ul>

            <h2 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.8rem" }}>
              Common Reverse Proxy Software
            </h2>
            <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
              <li style={{ marginBottom: "0.75rem" }}><strong>Nginx</strong> — The most widely deployed reverse proxy on the internet. Handles static file serving, reverse proxying, load balancing, and SSL termination in a single lightweight process. Powers ~34% of all websites. Learn more in our <Link href="/what-is-proxybase" style={{ color: "var(--accent-primary)" }}>what is a proxy guide</Link>.</li>
              <li style={{ marginBottom: "0.75rem" }}><strong>HAProxy</strong> — Purpose-built for high-availability load balancing. Common in large-scale microservice deployments where sub-millisecond proxy latency matters.</li>
              <li style={{ marginBottom: "0.75rem" }}><strong>Cloudflare</strong> — A global reverse proxy and CDN. Sits between your domain and visitors, absorbing DDoS attacks, caching content at edge locations worldwide, and filtering bot traffic before it reaches your origin.</li>
              <li style={{ marginBottom: "0.75rem" }}><strong>AWS ALB / API Gateway</strong> — Managed reverse proxies in AWS. ALB handles layer 7 HTTP routing; API Gateway adds API key management, usage plans, and request transformation for REST and WebSocket APIs.</li>
              <li style={{ marginBottom: "0.75rem" }}><strong>Envoy</strong> — A modern L7 proxy designed for service meshes (Istio, Consul). Built for dynamic, cloud-native environments where backend servers come and go constantly.</li>
              <li style={{ marginBottom: "0.75rem" }}><strong>Caddy</strong> — A newer reverse proxy that automatically obtains and renews TLS certificates via Let&rsquo;s Encrypt. Simpler configuration than Nginx, good for smaller deployments.</li>
            </ul>

            <h2 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.8rem" }}>
              Reverse Proxy vs Load Balancer vs API Gateway
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              These terms overlap, but they&rsquo;re not the same thing:
            </p>
            <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Reverse Proxy</strong> — The broadest category. Any server that accepts client requests
                and forwards them to backends. Nginx and Apache (with mod_proxy) are reverse proxies.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>Load Balancer</strong> — A specific use of reverse proxying where the primary goal
                is distributing traffic across multiple identical backend servers. HAProxy and AWS ALB are
                purpose-built load balancers. Every load balancer is a reverse proxy, but not every reverse
                proxy is a load balancer.
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <strong>API Gateway</strong> — A reverse proxy specialized for API traffic. Adds
                API-specific features: authentication, rate limiting per API key, request/response
                transformation, and routing based on API version or path. AWS API Gateway and Kong are
                examples. An API gateway is a reverse proxy with API management layered on top.
              </li>
            </ul>

            <h2 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.8rem" }}>
              Reverse Proxies and Bot Detection
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              If you&rsquo;re building web scrapers or AI agents, reverse proxies matter to you for a different
              reason: <strong>they&rsquo;re often what runs bot detection</strong>. When you hit a target website,
              the first thing your request encounters is usually a reverse proxy — Cloudflare, Akamai, AWS
              CloudFront, or a custom Nginx/Envoy deployment. These proxies inspect incoming requests for
              signs of automation: unusual headers, TLS fingerprints, IP reputation, request patterns.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              This is why using clean residential proxies matters. If a reverse proxy sees your request coming
              from a known datacenter IP range with a mismatched TLS fingerprint, it blocks you before you ever
              reach the application. A residential IP from a provider like{" "}
              <Link href="/ai-agents" style={{ color: "var(--accent-primary)" }}>ProxyBase</Link>{" "}
              makes your traffic look like a regular home broadband user — significantly reducing the chance
              the target&rsquo;s reverse proxy flags you. Learn more about how this works in our{" "}
              <Link href="/blog/why-your-ai-agent-needs-a-proxy" style={{ color: "var(--accent-primary)" }}>
                guide on why AI agents need proxies
              </Link>.
            </p>

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
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginTop: "3rem",
              marginBottom: "2rem",
            }}>
              <Link href="/blog/residential-proxy-vs-datacenter" style={{
                display: "block",
                padding: "20px",
                background: "var(--bg-secondary)",
                borderRadius: "8px",
                textDecoration: "none",
                color: "var(--text-primary)",
                border: "1px solid var(--border-subtle)",
              }}>
                <span style={{ fontWeight: 700, fontSize: "1.05rem" }}>Residential vs Datacenter Proxies →</span>
                <p style={{ margin: "8px 0 0", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  Forward proxy types compared — which one to use for scraping and AI agents.
                </p>
              </Link>
              <Link href="/blog/why-your-ai-agent-needs-a-proxy" style={{
                display: "block",
                padding: "20px",
                background: "var(--bg-secondary)",
                borderRadius: "8px",
                textDecoration: "none",
                color: "var(--text-primary)",
                border: "1px solid var(--border-subtle)",
              }}>
                <span style={{ fontWeight: 700, fontSize: "1.05rem" }}>Why AI Agents Need Proxies →</span>
                <p style={{ margin: "8px 0 0", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  How forward and reverse proxies both matter in AI agent infrastructure.
                </p>
              </Link>
            </div>

            <div style={{
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
                web scrapers. Pay-as-you-go, no KYC, crypto-native. While you understand reverse proxies
                for your own infrastructure, ProxyBase handles the forward proxy side for your outbound traffic.
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
