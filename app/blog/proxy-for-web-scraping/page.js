import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need residential proxies for web scraping?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Only when the target rejects datacenter IPs. Start with datacenter exits for low-protection pages and APIs. Move to residential for sites with bot management, and to mobile for the smaller set of endpoints that reject residential ranges as well.",
      },
    },
    {
      "@type": "Question",
      name: "How many proxy IPs do I need for a scraper?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Concurrency drives the number, not the size of the site. One exit can handle a few simultaneous requests before rate limits or reputation checks kick in. If you need twenty parallel workers, plan for enough distinct exits to keep per-IP concurrency low. Session-based rotation gives you a pool without maintaining a list.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between socks5 and socks5h?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "socks5 resolves the hostname on your machine and sends the resulting IP to the proxy. socks5h sends the hostname to the proxy and lets the exit node resolve it. Use socks5h for scraping unless you have a specific reason not to, because it keeps DNS resolution and connection origin on the same side.",
      },
    },
    {
      "@type": "Question",
      name: "Can Playwright or Puppeteer use an authenticated SOCKS5 proxy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not directly. Chromium does not implement SOCKS5 username and password authentication, so the browser cannot send the credentials your session requires. Run a loopback HTTP-to-SOCKS5 bridge that holds the upstream credentials, then point Playwright or Puppeteer at the local HTTP proxy address.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a scraping proxy cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Residential and mobile exits are usually billed per gigabyte. ProxyBase marketplace pricing starts at $3 per GB. Ten thousand pages at an average of 150 KB is about 1.5 GB, or roughly $4.50. Failed requests and retries consume bandwidth too, so cap your retry policy before you blame the proxy bill.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my scraper still get blocked with a proxy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A new IP changes the ASN and reputation signal. It does not fix a stale TLS fingerprint, a missing header set, or a request rate that looks automated. Rotating on every request can make things worse by destroying session state. Fix the request pattern first, then add exits.",
      },
    },
  ],
};

export const metadata = {
  title: "Proxy for Web Scraping (2026): Types, Rotation & Setup | ProxyBase",
  description:
    "A working guide to proxies for web scraping: when datacenter IPs fail, how residential and mobile exits differ, sticky vs rotating sessions, and SOCKS5 setup in Python, curl, and Playwright.",
  keywords:
    "proxy for web scraping, web scraping proxy, best proxy for web scraping, proxies for scraping, residential proxy for scraping, rotating proxy, socks5 proxy web scraping, playwright proxy, puppeteer proxy, python requests proxy, proxy cost per gb, no kyc proxy, proxybase",
  alternates: {
    canonical: "/blog/proxy-for-web-scraping",
  },
  openGraph: {
    title: "Proxy for Web Scraping (2026): Types, Rotation & Setup",
    description:
      "When datacenter IPs fail, how residential and mobile exits differ, why sticky sessions beat per-request rotation, and working SOCKS5 setup examples.",
    url: "https://proxybase.xyz/blog/proxy-for-web-scraping",
    type: "article",
  },
};

export default function ProxyForWebScraping() {
  return (
    <>
      <Navbar />

      <article className="section" style={{ minHeight: "80vh", paddingTop: "120px", paddingBottom: "80px" }}>
        <div className="section-inner" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>

          <div className="blog-breadcrumbs" style={{ marginBottom: "2rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            <Link href="/" style={{ color: "var(--accent-primary)", textDecoration: "none" }}>Home</Link>
            <span style={{ margin: "0 8px" }}>/</span>
            <Link href="/blog" style={{ color: "var(--accent-primary)", textDecoration: "none" }}>Blog</Link>
            <span style={{ margin: "0 8px" }}>/</span>
            <span>Proxy for Web Scraping</span>
          </div>

          <div className="section-header" style={{ textAlign: "left", alignItems: "flex-start", marginBottom: "3rem" }}>
            <span className="section-label">Scraping Infrastructure</span>
            <h1 className="section-title" style={{ fontSize: "2.8rem", marginBottom: "1rem", lineHeight: "1.2" }}>
              Proxy for Web Scraping: What Gets Blocked and What Actually Works
            </h1>
            <div className="author-meta" style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--accent-primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: "bold" }}>
                P
              </div>
              <div>
                <div style={{ fontWeight: "600", color: "var(--text-primary)" }}>ProxyBase Team</div>
                <div>November 2026 &bull; 9 min read</div>
              </div>
            </div>
          </div>

          <div className="blog-content" style={{ color: "var(--text-secondary)", lineHeight: "1.8", fontSize: "1.1rem" }}>

            <p style={{ marginBottom: "1.5rem" }}>
              Your scraper handles the first few hundred pages, then the 403s start. The parser is fine. The request format is fine. What changed is how the target treats the IP your request left from.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              A scraping proxy is an egress problem. The parser is rarely the part that broke. Which exit you choose, how you keep a session coherent, and what the per-GB bill looks like decide whether the crawl finishes.
            </p>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>What the target sees before it reads your request</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Every request arrives with an IP, and that IP belongs to an Autonomous System. Comcast and Deutsche Telekom are eyeball networks. AWS, Hetzner, and DigitalOcean are hosting networks. That classification is public, and bot management stacks query it before they look at your cookies.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              Alongside the ASN, the target can look at IP reputation, request rate, header order, TLS fingerprint, and whether the session makes sense. A proxy changes the first two signals. It does not repair the other four. That distinction matters because buying more IPs is the most common way to waste money on a scraper that has a fingerprint problem.
            </p>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>Choose the exit type before you choose a provider</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              There are three exit types worth comparing, and they trade trust against cost. Start with the cheapest one that clears the target, not with the most expensive one in the catalog.
            </p>

            <div className="matrix-table-container" style={{ marginBottom: "1.5rem" }}>
              <table className="compare-matrix-table">
                <thead>
                  <tr>
                    <th>Exit type</th>
                    <th>What the target sees</th>
                    <th>Where it works</th>
                    <th>Cost shape</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="metric-name">Datacenter</td>
                    <td>Hosting ASN</td>
                    <td>Low-protection pages, public APIs, internal mirrors</td>
                    <td>Lowest per GB or per IP</td>
                  </tr>
                  <tr>
                    <td className="metric-name">Residential</td>
                    <td>ISP-assigned home connection</td>
                    <td>Ecommerce, search results, sites with bot management</td>
                    <td>Per GB, higher than datacenter</td>
                  </tr>
                  <tr>
                    <td className="metric-name">Mobile</td>
                    <td>Carrier-grade NAT, shared by many phones</td>
                    <td>Endpoints that reject residential ranges too</td>
                    <td>Highest per GB, limited supply</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ marginBottom: "1.5rem" }}>
              Moving everything to mobile is an easy way to turn a $50 crawl into a $500 one. Use residential where datacenter fails, and mobile only for the subset that fails residential.
            </p>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>Use a session, not a fresh IP per request</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Two rotation strategies cover most scraping jobs. Sticky sessions hold one exit for a window, which keeps cookies, rate limits, and pagination coherent. Rotating sessions change the exit per request or per few requests, which spreads load across a pool.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              Use sticky sessions for anything with state: logins, carts, paginated results, multi-step forms. Use rotation for broad crawls where each URL is independent. Rotating on every request inside a checkout flow is a reliable way to look like an account takeover.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              For the mechanics behind that choice, including per-connection rotation and manual sticky rotation, see the <Link href="/blog/rotating-proxy" style={{ color: "var(--accent-primary)" }}>rotating proxy guide</Link>.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              With ProxyBase, country and session type are set when you open the session. They are not encoded in the SOCKS5 username, and the gateway does not parse suffix syntax. The username is the session ID and the password is your session token.
            </p>

            <div className="cli-install-cmd" style={{ whiteSpace: "pre-wrap", padding: "1.5rem", borderRadius: "8px", background: "var(--bg-code)", color: "#a5b4fc", fontFamily: "monospace", fontSize: "0.95rem", marginBottom: "2.5rem" }}>
              {`import requests

API     = "https://api.proxybase.xyz/v2"
TOKEN   = "sk_your_session_token"   # from POST /v2/auth/verify
GATEWAY = "api.proxybase.xyz:1082"  # v2 buyer SOCKS5 gateway

# Open a sticky session. Country is a body field, not part of the username.
r = requests.post(
    f"{API}/sessions",
    headers={"Authorization": f"Bearer {TOKEN}"},
    json={
        "country": "US",
        "network_type": "residential",
        "session_type": "sticky",
        "spend_cap_microcredits": 5_000_000,
    },
    timeout=15,
)
r.raise_for_status()
session_id = r.json()["session_id"]

# socks5h hands DNS resolution to the exit node.
proxy = f"socks5h://{session_id}:{TOKEN}@{GATEWAY}"
proxies = {"http": proxy, "https": proxy}

# Check the exit country before you crawl.
print(requests.get("https://api.ipify.org?format=json", proxies=proxies, timeout=10).json())

crawl = requests.Session()
crawl.proxies.update(proxies)

for url in start_urls:
    response = crawl.get(url, timeout=20)
    response.raise_for_status()
    parse(response.text)`}
            </div>

            <p style={{ marginBottom: "1.5rem" }}>
              The warmup call is worth keeping in production. Log the exit IP and country on every session start, and stop if they do not match the session you requested. A wrong exit caught at startup costs one request. The same exit discovered halfway through a crawl costs you a partial dataset.
            </p>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>Set up SOCKS5 in Python and curl</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              In Python, requests needs PySocks for SOCKS proxies. Install it with <code>pip install requests[socks]</code>, then pass the proxy URL in the same format shown above. Keep the <code>socks5h://</code> prefix. Plain <code>socks5://</code> resolves DNS on your machine, so your resolver sees every hostname even though the connection itself is proxied.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              With curl, the equivalent flag is <code>--socks5-hostname</code>:
            </p>
            <div className="cli-install-cmd" style={{ whiteSpace: "pre-wrap", padding: "1.5rem", borderRadius: "8px", background: "var(--bg-code)", color: "#a5b4fc", fontFamily: "monospace", fontSize: "0.95rem", marginBottom: "2.5rem" }}>
              {`curl --socks5-hostname "$SESSION_ID:$TOKEN@api.proxybase.xyz:1082" \\
  https://example.com`}
            </div>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>Browser automation is the exception</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Playwright and Puppeteer drive Chromium, and most Selenium scraping setups do too. Chromium does not implement SOCKS5 username and password authentication. If you pass credentials in a SOCKS5 proxy URL, the browser will not send them. This is the same limitation that makes Chrome extensions and desktop clients use a local relay.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              The workaround is a loopback HTTP-to-SOCKS5 bridge. The bridge listens on <code>127.0.0.1</code>, accepts plain HTTP proxy requests from the browser, and performs the authenticated SOCKS5 handshake upstream. The browser only sees a local HTTP proxy.
            </p>
            <div className="cli-install-cmd" style={{ whiteSpace: "pre-wrap", padding: "1.5rem", borderRadius: "8px", background: "var(--bg-code)", color: "#a5b4fc", fontFamily: "monospace", fontSize: "0.95rem", marginBottom: "2.5rem" }}>
              {`const browser = await chromium.launch({
  proxy: { server: "http://127.0.0.1:8899" },
});`}
            </div>
            <p style={{ marginBottom: "1.5rem" }}>
              Run one bridge per session. Sharing a single bridge across rotating sessions defeats the point, because every browser tab will exit from the same upstream.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              For the Playwright, Puppeteer, and Selenium configuration details, see the <Link href="/blog/playwright-proxy" style={{ color: "var(--accent-primary)" }}>browser automation proxy guide</Link>.
            </p>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>Do the per-GB math before you commit</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Residential and mobile exits are billed by traffic. A typical HTML page is somewhere between 50 KB and 300 KB, so measure your own average instead of guessing. At 150 KB per page, 10,000 pages is about 1.5 GB. At $3 per GB, that crawl costs roughly $4.50.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              The number that surprises people is retries. Failed requests, blocked responses, and assets fetched through the proxy all count. Cap retries at two or three attempts, and set the session spend cap so a loop cannot drain the balance overnight. ProxyBase lets you set <code>spend_cap_microcredits</code> when the session is created.
            </p>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>Five failure modes worth fixing before you buy more IPs</h2>
            <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
              <li style={{ marginBottom: "10px" }}>
                DNS resolved locally. A plain <code>socks5://</code> URL leaks every hostname to your resolver. Use <code>socks5h://</code>.
              </li>
              <li style={{ marginBottom: "10px" }}>
                Rotation on every request. New IPs mid-flow break cookies, carts, and pagination. Match the rotation strategy to the job.
              </li>
              <li style={{ marginBottom: "10px" }}>
                High concurrency on one exit. Twenty workers behind one IP look like an attack. Keep per-IP concurrency low or add exits.
              </li>
              <li style={{ marginBottom: "10px" }}>
                Blind retries on 403. Retrying the same request with the same fingerprint produces the same block and a larger bill. Change something or stop.
              </li>
              <li style={{ marginBottom: "10px" }}>
                No exit logging. If you cannot say which IP and country a failed request used, you cannot tell a proxy problem from a target-side rule.
              </li>
            </ul>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>What a proxy does not do</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              A proxy changes where a request comes from. It does not change what you are allowed to do. Respect the target&apos;s terms and robots rules, do not use a proxy to bypass authentication or a paywall, and do not collect personal data without a lawful basis. If the plan only works when the target believes you are someone else, a proxy is not the missing piece.
            </p>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>Frequently Asked Questions</h2>

            <h3 style={{ color: "var(--text-primary)", fontSize: "1.25rem", marginTop: "2rem", marginBottom: "0.75rem" }}>Do I need residential proxies for web scraping?</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              Only when the target rejects datacenter IPs. Start with datacenter exits for low-protection pages and APIs. Move to residential for sites with bot management, and to mobile for the smaller set of endpoints that reject residential ranges as well.
            </p>

            <h3 style={{ color: "var(--text-primary)", fontSize: "1.25rem", marginTop: "2rem", marginBottom: "0.75rem" }}>How many proxy IPs do I need?</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              Concurrency drives the number, not the size of the site. One exit can handle a few simultaneous requests before rate limits or reputation checks kick in. If you need twenty parallel workers, plan for enough distinct exits to keep per-IP concurrency low.
            </p>

            <h3 style={{ color: "var(--text-primary)", fontSize: "1.25rem", marginTop: "2rem", marginBottom: "0.75rem" }}>What is the difference between socks5 and socks5h?</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              <code>socks5</code> resolves the hostname on your machine and sends the resulting IP to the proxy. <code>socks5h</code> sends the hostname to the proxy and lets the exit node resolve it. Use <code>socks5h</code> for scraping so DNS resolution and connection origin stay on the same side.
            </p>

            <h3 style={{ color: "var(--text-primary)", fontSize: "1.25rem", marginTop: "2rem", marginBottom: "0.75rem" }}>Can Playwright or Puppeteer use an authenticated SOCKS5 proxy?</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              Not directly. Chromium does not implement SOCKS5 username and password authentication. Run a loopback HTTP-to-SOCKS5 bridge that holds the upstream credentials, then point the browser at the local HTTP proxy address.
            </p>

            <h3 style={{ color: "var(--text-primary)", fontSize: "1.25rem", marginTop: "2rem", marginBottom: "0.75rem" }}>How much does a scraping proxy cost?</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              Residential and mobile exits are usually billed per gigabyte. ProxyBase marketplace pricing starts at $3 per GB. Ten thousand pages at an average of 150 KB is about 1.5 GB, or roughly $4.50. Retries and failed requests consume bandwidth too.
            </p>

            <h3 style={{ color: "var(--text-primary)", fontSize: "1.25rem", marginTop: "2rem", marginBottom: "0.75rem" }}>Why does my scraper still get blocked with a proxy?</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              A new IP changes the ASN and reputation signal. It does not fix a stale TLS fingerprint, a missing header set, or a request rate that looks automated. Fix the request pattern first, then add exits.
            </p>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.5rem", marginTop: "3rem", marginBottom: "1rem" }}>Related reading</h2>
            <ul style={{ paddingLeft: "1.5rem", marginBottom: "2.5rem" }}>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/blog/residential-proxy-vs-datacenter" style={{ color: "var(--accent-primary)" }}>
                  Residential vs datacenter proxies: what detection actually sees
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/blog/proxy-errors-troubleshooting" style={{ color: "var(--accent-primary)" }}>
                  Proxy error codes and connection failures, fixed
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/proxy-for-ai-agents" style={{ color: "var(--accent-primary)" }}>
                  Proxy setup for AI agents and scraping workloads
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/no-kyc-proxy" style={{ color: "var(--accent-primary)" }}>
                  Why proxy providers ask for ID, and how to buy without it
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/compare/oxylabs" style={{ color: "var(--accent-primary)" }}>
                  Oxylabs alternatives compared by price and KYC
                </Link>
              </li>
            </ul>

            <div style={{ display: "flex", gap: "16px", marginTop: "3rem" }}>
              <Link href="/markets" className="btn-primary" style={{ textDecoration: "none" }}>Browse Residential Proxies</Link>
              <Link href="/no-kyc-proxy" className="btn-secondary" style={{ textDecoration: "none" }}>See No-KYC Setup</Link>
            </div>

          </div>

        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Footer />
    </>
  );
}
