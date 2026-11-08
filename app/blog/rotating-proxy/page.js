import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a rotating proxy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A rotating proxy is a single endpoint that routes each new connection through a different exit IP from a pool. You authenticate once and the provider decides which seller or IP handles the connection. The rotation policy is the important part, because per-request, per-connection, and sticky rotation produce very different behaviour.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between a rotating and a sticky session?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A rotating session matches a new exit for each connection. A sticky session holds one exit for the life of the session so cookies, carts, and login state stay coherent. Sticky is the right default for anything with state. Rotating is the right default for independent URLs.",
      },
    },
    {
      "@type": "Question",
      name: "Does a rotating session change the IP on every request?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not necessarily. ProxyBase rotating sessions match a new seller on each SOCKS5 connection, not on each HTTP request. If your client reuses a connection through keep-alive, every request on that connection uses the same exit. Send Connection: close or open a new connection to force rotation.",
      },
    },
    {
      "@type": "Question",
      name: "Can I rotate a sticky session manually?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, on ProxyBase. POST /v2/sessions/{id}/rotate moves an active sticky session to a new eligible seller in the same country and network bucket. The call costs one cent (10,000 microcredits) and returns the new exit IP. Rotating sessions cannot be manually rotated because they already choose a seller per connection.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a rotating proxy cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ProxyBase marketplace pricing starts at $3 per GB for residential and $5 per GB for mobile. Manual sticky rotation costs one cent per call. Failed requests and retries consume bandwidth, so set a spend cap on the session before running a large job.",
      },
    },
    {
      "@type": "Question",
      name: "Do rotating proxies stop my scraper from getting blocked?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rotation changes the IP and ASN signal. It does not fix a stale TLS fingerprint, a bad header set, or a request rate that looks automated. Rotating too fast can make a block more likely by destroying session state. Fix the request pattern before adding more exits.",
      },
    },
  ],
};

export const metadata = {
  title: "Rotating Residential Proxy (2026): How Rotation Works | ProxyBase",
  description:
    "Rotating proxies explained by the provider running them: per-connection vs per-request rotation, sticky sessions, manual rotation, and working SOCKS5 setup with per-GB pricing.",
  keywords:
    "rotating proxy, rotating residential proxy, proxy rotation, rotating proxies, rotating socks5 proxy, proxy rotator, sticky vs rotating proxy, rotating proxy for web scraping, residential proxy rotation, proxybase",
  alternates: {
    canonical: "/blog/rotating-proxy",
  },
  openGraph: {
    title: "Rotating Residential Proxy (2026): How Rotation Works",
    description:
      "Per-connection vs per-request rotation, sticky vs rotating sessions, manual rotation, and working SOCKS5 setup.",
    url: "https://proxybase.xyz/blog/rotating-proxy",
    type: "article",
  },
};

export default function RotatingProxyGuide() {
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
            <span>Rotating Proxy</span>
          </div>

          <div className="section-header" style={{ textAlign: "left", alignItems: "flex-start", marginBottom: "3rem" }}>
            <span className="section-label">Proxy Rotation</span>
            <h1 className="section-title" style={{ fontSize: "2.8rem", marginBottom: "1rem", lineHeight: "1.2" }}>
              Rotating Proxy: How Rotation Actually Works and When It Hurts
            </h1>
            <div className="author-meta" style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--accent-primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: "bold" }}>
                P
              </div>
              <div>
                <div style={{ fontWeight: "600", color: "var(--text-primary)" }}>ProxyBase Team</div>
                <div>November 2026 &bull; 8 min read</div>
              </div>
            </div>
          </div>

          <div className="blog-content" style={{ color: "var(--text-secondary)", lineHeight: "1.8", fontSize: "1.1rem" }}>

            <p style={{ marginBottom: "1.5rem" }}>
              Every proxy provider advertises rotation. The word hides the only decision that matters: when does the exit change, and what state does it carry across the change?
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              Get that wrong and rotation makes a working scraper worse. A cart empties, a login drops, a rate limit follows you across five IPs because the requests themselves are the problem.
            </p>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>Three things &quot;rotating&quot; can mean</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Providers use one word for three different policies. Ask which one you are buying before you compare prices.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              <strong>Per-request rotation</strong> changes the exit on every HTTP request. It spreads load aggressively, and it breaks any workflow that depends on cookies or a consistent client identity.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              <strong>Per-connection rotation</strong> changes the exit each time your client opens a new TCP connection. Keep-alive reuses one connection, so several requests may share an exit. This is what a ProxyBase rotating session does.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              <strong>Sticky rotation</strong> pins one exit for the session and changes it only when you ask, or when the seller disconnects. The exit is stable until the rotation event.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              That distinction decides which requests succeed. A client that reuses connections on a rotating session is effectively running a sticky session, whether the provider calls it that or not.
            </p>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>What rotation solves, and what it does not</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Rotation changes the IP and the ASN behind it. That helps when a target rate-limits an address, blocks a datacenter range, or applies a per-IP quota. A fresh residential exit can reset those counters.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              It does not change your TLS fingerprint, your header order, your request rate, or your account permissions. If those are the signals getting you blocked, more IPs will not help. Rotation schedules exits; it does not change what you are allowed to do.
            </p>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>Match the rotation policy to the workload</h2>

            <div className="matrix-table-container" style={{ marginBottom: "1.5rem" }}>
              <table className="compare-matrix-table">
                <thead>
                  <tr>
                    <th>Workload</th>
                    <th>Use</th>
                    <th>Why</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="metric-name">Login, cart, multi-step form</td>
                    <td>Sticky</td>
                    <td>Cookies and state must come from one origin</td>
                  </tr>
                  <tr>
                    <td className="metric-name">Paginated crawl</td>
                    <td>Sticky</td>
                    <td>Pagination tokens and rate limits are per session</td>
                  </tr>
                  <tr>
                    <td className="metric-name">Independent URLs at scale</td>
                    <td>Rotating</td>
                    <td>No shared state, so spread the load</td>
                  </tr>
                  <tr>
                    <td className="metric-name">Retry after a block</td>
                    <td>Rotate once</td>
                    <td>A new exit resets the IP signal without changing the request</td>
                  </tr>
                  <tr>
                    <td className="metric-name">Long-lived agent session</td>
                    <td>Sticky, rotate on failure</td>
                    <td>Identity stability matters more than load spread</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ marginBottom: "1.5rem" }}>
              If you are unsure, start sticky. A sticky session can be rotated deliberately. A rotating session cannot be made sticky retroactively, and a broken login flow is harder to debug than a slow crawl.
            </p>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>Open a rotating session</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              With ProxyBase, the rotation policy is a field on the session. Country and network type are also set here, not in the credential string. The username is the session ID and the password is your session token.
            </p>

            <div className="cli-install-cmd" style={{ whiteSpace: "pre-wrap", padding: "1.5rem", borderRadius: "8px", background: "var(--bg-code)", color: "#a5b4fc", fontFamily: "monospace", fontSize: "0.95rem", marginBottom: "2.5rem" }}>
              {`import requests

API     = "https://api.proxybase.xyz/v2"
TOKEN   = "sk_your_session_token"   # from POST /v2/auth/verify
GATEWAY = "api.proxybase.xyz:1082"

r = requests.post(
    f"{API}/sessions",
    headers={"Authorization": f"Bearer {TOKEN}"},
    json={
        "country": "US",
        "network_type": "residential",
        "session_type": "rotating",
        "spend_cap_microcredits": 5_000_000,
    },
    timeout=15,
)
r.raise_for_status()
session_id = r.json()["session_id"]

proxy = f"socks5h://{session_id}:{TOKEN}@{GATEWAY}"
proxies = {"http": proxy, "https": proxy}

# A new SOCKS5 connection gets a new seller.
# Connection: close prevents keep-alive from pinning one exit.
for url in urls:
    response = requests.get(
        url,
        proxies=proxies,
        headers={"Connection": "close"},
        timeout=20,
    )
    print(response.status_code)`}
            </div>

            <p style={{ marginBottom: "1.5rem" }}>
              The top-level <code>requests.get</code> call already opens a fresh connection per call. The trap is a <code>requests.Session</code> object, which pools connections and therefore pins the exit until the pool recycles. Keep the Session for cookies if you need them, but send <code>Connection: close</code> when you want a new exit.
            </p>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>Rotate a sticky session on purpose</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              A sticky session holds one seller. When that seller starts returning blocks, you can move the session to a new eligible seller in the same country and network bucket without opening a new session.
            </p>

            <div className="cli-install-cmd" style={{ whiteSpace: "pre-wrap", padding: "1.5rem", borderRadius: "8px", background: "var(--bg-code)", color: "#a5b4fc", fontFamily: "monospace", fontSize: "0.95rem", marginBottom: "2.5rem" }}>
              {`curl -X POST "$API/sessions/$SESSION_ID/rotate" \\
  -H "Authorization: Bearer $TOKEN"`}
            </div>

            <p style={{ marginBottom: "1.5rem" }}>
              The response includes the previous seller, the new seller, and the new exit IP. The call costs one cent (10,000 microcredits). If the rotation fails, you are not charged. Only sticky sessions can be rotated this way, because rotating sessions already pick a seller per connection.
            </p>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>Verify the exit instead of trusting the label</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Log the exit IP before a job and after each rotation. If you asked for US residential, assert on the country returned by an echo endpoint. A session that silently falls back to another bucket is worse than a failed request, because it corrupts the dataset without an error.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              With curl, the flag is <code>--socks5-hostname</code>. With Python, keep the <code>socks5h://</code> prefix. Both hand DNS resolution to the exit node, so your resolver and your connection origin stay on the same side.
            </p>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>What rotation costs</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Rotation itself is mostly free in per-GB pricing. ProxyBase residential starts at $3 per GB and mobile at $5 per GB. The manual sticky-rotation call costs one cent. The expensive part is retries: a blocked request that you repeat three times bills three times.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              Set a spend cap when you open the session, and cap retries at two or three attempts. If a request fails twice on two different exits, the problem is probably not the IP.
            </p>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>Five rotation mistakes that get scrapers blocked</h2>
            <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
              <li style={{ marginBottom: "10px" }}>
                Rotating on every request inside a stateful flow. Cookies and carts do not survive a new exit.
              </li>
              <li style={{ marginBottom: "10px" }}>
                Assuming a rotating session rotates per request. Keep-alive can pin one exit for a whole batch.
              </li>
              <li style={{ marginBottom: "10px" }}>
                Rotating before changing the request. If the fingerprint or rate is the problem, every exit fails the same way.
              </li>
              <li style={{ marginBottom: "10px" }}>
                Pushing high concurrency through one exit. Twenty workers behind one IP look like an attack.
              </li>
              <li style={{ marginBottom: "10px" }}>
                Never logging the exit. Without the IP and country, you cannot tell a proxy problem from a target rule.
              </li>
            </ul>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>What rotation does not authorize</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              A new IP changes where a request comes from. It does not change what you are allowed to do. Respect the target&apos;s terms and robots rules, do not use rotation to bypass authentication or a paywall, and do not collect personal data without a lawful basis. If the plan only works while the target believes you are someone else, rotation is not the missing piece.
            </p>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>Frequently Asked Questions</h2>

            <h3 style={{ color: "var(--text-primary)", fontSize: "1.25rem", marginTop: "2rem", marginBottom: "0.75rem" }}>What is a rotating proxy?</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              A single endpoint that routes new connections through different exit IPs from a pool. You authenticate once and the provider selects the seller. The rotation policy decides when the exit changes.
            </p>

            <h3 style={{ color: "var(--text-primary)", fontSize: "1.25rem", marginTop: "2rem", marginBottom: "0.75rem" }}>What is the difference between rotating and sticky?</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              Rotating matches a new exit per connection. Sticky holds one exit for the session so cookies, carts, and login state stay coherent. Use sticky for stateful work and rotating for independent URLs.
            </p>

            <h3 style={{ color: "var(--text-primary)", fontSize: "1.25rem", marginTop: "2rem", marginBottom: "0.75rem" }}>Does a rotating session change the IP on every request?</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              Not necessarily. ProxyBase rotating sessions match a new seller per SOCKS5 connection. Keep-alive reuses the connection, so several requests can share one exit. Send <code>Connection: close</code> or open a new connection to rotate.
            </p>

            <h3 style={{ color: "var(--text-primary)", fontSize: "1.25rem", marginTop: "2rem", marginBottom: "0.75rem" }}>Can I rotate a sticky session manually?</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              Yes. <code>POST /v2/sessions/{`{id}`}/rotate</code> moves an active sticky session to a new seller in the same country and network bucket. It costs one cent and returns the new exit IP. Rotating sessions cannot be manually rotated.
            </p>

            <h3 style={{ color: "var(--text-primary)", fontSize: "1.25rem", marginTop: "2rem", marginBottom: "0.75rem" }}>How much does a rotating proxy cost?</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              ProxyBase starts at $3 per GB for residential and $5 per GB for mobile. Manual sticky rotation is one cent per call. Retries and failed requests consume bandwidth too.
            </p>

            <h3 style={{ color: "var(--text-primary)", fontSize: "1.25rem", marginTop: "2rem", marginBottom: "0.75rem" }}>Do rotating proxies stop blocks?</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              They reset the IP and ASN signal. They do not fix a stale TLS fingerprint, a bad header set, or an automated request rate. Fix the request pattern first, then rotate.
            </p>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.5rem", marginTop: "3rem", marginBottom: "1rem" }}>Related reading</h2>
            <ul style={{ paddingLeft: "1.5rem", marginBottom: "2.5rem" }}>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/blog/proxy-for-web-scraping" style={{ color: "var(--accent-primary)" }}>
                  Proxy for web scraping: exit types, setup, and per-GB math
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/blog/residential-proxy-vs-datacenter" style={{ color: "var(--accent-primary)" }}>
                  Residential vs datacenter proxies: what detection actually sees
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/no-kyc-proxy" style={{ color: "var(--accent-primary)" }}>
                  Buying proxies without KYC
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/compare/oxylabs" style={{ color: "var(--accent-primary)" }}>
                  Oxylabs alternatives compared by price and KYC
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/markets" style={{ color: "var(--accent-primary)" }}>
                  Browse residential and mobile proxy markets
                </Link>
              </li>
            </ul>

            <div style={{ display: "flex", gap: "16px", marginTop: "3rem" }}>
              <Link href="/markets" className="btn-primary" style={{ textDecoration: "none" }}>Browse Rotating Proxies</Link>
              <Link href="/blog/proxy-for-web-scraping" className="btn-secondary" style={{ textDecoration: "none" }}>Read the Scraping Guide</Link>
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
