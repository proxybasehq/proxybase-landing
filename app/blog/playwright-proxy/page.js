import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does Playwright support SOCKS5 proxies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Playwright can use an unauthenticated SOCKS5 proxy because Chromium supports the protocol without credentials. It cannot use an authenticated SOCKS5 proxy, because Chromium does not implement SOCKS5 username and password authentication. Put a loopback HTTP-to-SOCKS5 bridge in front of the session if the proxy requires a login.",
      },
    },
    {
      "@type": "Question",
      name: "Can Puppeteer use a proxy with a username and password?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes for HTTP and HTTPS proxies. Launch Chromium with the proxy host and port, then call page.authenticate with the credentials before the first navigation. page.authenticate answers an HTTP 407 challenge, so it does nothing for a SOCKS5 proxy that requires a login.",
      },
    },
    {
      "@type": "Question",
      name: "Why does Chromium ignore proxy credentials in the URL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Chromium does not read userinfo from a proxy URL. Credentials must be passed as separate fields in Playwright, or through page.authenticate in Puppeteer. Embedding user:pass in --proxy-server or a proxy server string commonly produces ERR_NO_SUPPORTED_PROXIES.",
      },
    },
    {
      "@type": "Question",
      name: "How do I rotate proxies in Playwright?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A Playwright browser context has its own proxy, and pages inside a context share that exit. To rotate, create a new context with a new proxy or bridge address, or launch a new browser per session. Do not expect a new page inside the same context to change the exit IP.",
      },
    },
    {
      "@type": "Question",
      name: "Why does my proxy work in curl but not in Chromium?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "curl and Python support authenticated SOCKS5. Chromium does not. If the provider hands you a SOCKS5 endpoint with a username and password, curl will connect and the browser will fail with ERR_SOCKS_CONNECTION_FAILED. Use an HTTP proxy or a loopback bridge for the browser.",
      },
    },
    {
      "@type": "Question",
      name: "Does a proxy make headless Chrome undetectable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. A proxy changes the IP and ASN. Detection also looks at the TLS fingerprint, the WebDriver surface, fonts, canvas output, header order, and request rate. Rotating exits without changing those signals gives you a fresh IP that gets blocked the same way.",
      },
    },
  ],
};

export const metadata = {
  title: "Playwright Proxy Setup (2026): Auth, SOCKS5 & Rotation | ProxyBase",
  description:
    "Working proxy setup for Playwright, Puppeteer, and Selenium. Why Chromium ignores SOCKS5 credentials, how to authenticate an HTTP proxy, and how to rotate exits per browser context.",
  keywords:
    "playwright proxy, puppeteer proxy, selenium proxy, playwright proxy authentication, puppeteer proxy auth, playwright socks5, puppeteer socks5, browser automation proxy, proxy per browser context, chromium socks5 authentication, proxybase",
  alternates: {
    canonical: "/blog/playwright-proxy",
  },
  openGraph: {
    title: "Playwright Proxy Setup (2026): Auth, SOCKS5 & Rotation",
    description:
      "Why Chromium ignores SOCKS5 credentials, how to authenticate an HTTP proxy, and how to rotate exits per browser context.",
    url: "https://proxybase.xyz/blog/playwright-proxy",
    type: "article",
  },
};

export default function PlaywrightProxyGuide() {
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
            <span>Playwright Proxy Setup</span>
          </div>

          <div className="section-header" style={{ textAlign: "left", alignItems: "flex-start", marginBottom: "3rem" }}>
            <span className="section-label">Browser Automation</span>
            <h1 className="section-title" style={{ fontSize: "2.8rem", marginBottom: "1rem", lineHeight: "1.2" }}>
              Playwright Proxy Setup: What Chromium Supports and What It Does Not
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
              The proxy works in curl. You paste the same endpoint into Playwright and the page fails with a connection error. Nothing is wrong with the proxy or the browser code. Chromium handles proxy authentication differently from command-line clients, and that difference decides your setup.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              Chromium can authenticate to an HTTP proxy. It cannot authenticate to a SOCKS5 proxy. If your provider gives you a SOCKS5 username and password, the browser needs a local bridge or an HTTP endpoint.
            </p>

            <div className="matrix-table-container" style={{ marginBottom: "1.5rem" }}>
              <table className="compare-matrix-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>HTTP proxy auth</th>
                    <th>SOCKS5, no auth</th>
                    <th>SOCKS5 with auth</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="metric-name">Playwright / Chromium</td>
                    <td>Yes, separate fields</td>
                    <td>Yes</td>
                    <td>No, use a bridge</td>
                  </tr>
                  <tr>
                    <td className="metric-name">Puppeteer / Chromium</td>
                    <td>Yes, page.authenticate</td>
                    <td>Yes</td>
                    <td>No, use a bridge</td>
                  </tr>
                  <tr>
                    <td className="metric-name">Selenium / Chrome</td>
                    <td>Yes, usually via extension or bridge</td>
                    <td>Yes</td>
                    <td>No, use a bridge</td>
                  </tr>
                  <tr>
                    <td className="metric-name">curl / Python requests</td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>Playwright proxy setup, two ways</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              For an HTTP proxy, pass the server and credentials as separate fields. Playwright ignores credentials embedded in the server URL, so the username and password must be their own keys.
            </p>

            <div className="cli-install-cmd" style={{ whiteSpace: "pre-wrap", padding: "1.5rem", borderRadius: "8px", background: "var(--bg-code)", color: "#a5b4fc", fontFamily: "monospace", fontSize: "0.95rem", marginBottom: "2.5rem" }}>
              {`const browser = await chromium.launch({
  proxy: {
    server: "http://proxy.example.com:8080",
    username: "user",
    password: "pass",
  },
});`}
            </div>

            <p style={{ marginBottom: "1.5rem" }}>
              For an authenticated SOCKS5 session, launch the browser against a loopback HTTP-to-SOCKS5 bridge. The bridge listens on <code>127.0.0.1</code>, accepts a plain HTTP proxy connection from Chromium, and performs the SOCKS5 handshake upstream with your credentials. Chromium only sees a local HTTP proxy.
            </p>

            <div className="cli-install-cmd" style={{ whiteSpace: "pre-wrap", padding: "1.5rem", borderRadius: "8px", background: "var(--bg-code)", color: "#a5b4fc", fontFamily: "monospace", fontSize: "0.95rem", marginBottom: "2.5rem" }}>
              {`const context = await browser.newContext({
  proxy: { server: "http://127.0.0.1:8899" },
});`}
            </div>

            <p style={{ marginBottom: "1.5rem" }}>
              Playwright supports a proxy per browser context. Pages inside one context share that proxy, so a new page does not give you a new exit. Create a new context when you want a new session, and run one bridge per session so the upstream credentials do not get mixed.
            </p>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>Puppeteer needs two pieces</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Puppeteer sets the proxy at launch and authenticates at the page level. Put only the scheme, host, and port in the launch argument. Credentials go through <code>page.authenticate</code> before the first navigation.
            </p>

            <div className="cli-install-cmd" style={{ whiteSpace: "pre-wrap", padding: "1.5rem", borderRadius: "8px", background: "var(--bg-code)", color: "#a5b4fc", fontFamily: "monospace", fontSize: "0.95rem", marginBottom: "2.5rem" }}>
              {`const browser = await puppeteer.launch({
  args: ["--proxy-server=http://proxy.example.com:8080"],
});

const page = await browser.newPage();
await page.authenticate({ username: "user", password: "pass" });
await page.goto("https://example.com");`}
            </div>

            <p style={{ marginBottom: "1.5rem" }}>
              Three details trip people up. Embedded credentials in <code>--proxy-server</code> produce <code>ERR_NO_SUPPORTED_PROXIES</code>. Authentication is applied per page, but Chrome caches the first credentials for the browser, so a second page with different credentials will still use the first. And a failed authentication often resolves with a 407 response instead of throwing, so check the status.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              For SOCKS5, Puppeteer has the same limit as Playwright. Use <code>--proxy-server=socks5://host:port</code> only when the proxy needs no login. With a login, point Chrome at the loopback bridge instead.
            </p>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>Selenium exposes the same Chromium limit</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Selenium passes Chrome&apos;s proxy flags through ChromeOptions. The browser behind it is still Chromium, so authenticated SOCKS5 fails the same way. Proxy authentication in Chrome usually needs an extension or a local authenticating proxy. The loopback bridge avoids both and keeps the credentials out of the browser profile.
            </p>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>Rotate exits with contexts, not pages</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              Browser rotation is a context-level decision. One context, one exit. If you open ten pages in the same context, all ten leave through the same bridge and the same upstream session.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              Create a session and a bridge for each worker, create one Playwright context per worker, and close the context when the job finishes. Puppeteer can do something similar with browser contexts in recent versions, but separate browsers are the safer default when you need isolated credentials.
            </p>

            <div className="cli-install-cmd" style={{ whiteSpace: "pre-wrap", padding: "1.5rem", borderRadius: "8px", background: "var(--bg-code)", color: "#a5b4fc", fontFamily: "monospace", fontSize: "0.95rem", marginBottom: "2.5rem" }}>
              {`for (const worker of workers) {
  const context = await browser.newContext({
    proxy: { server: worker.bridgeUrl },
  });

  const page = await context.newPage();
  await page.goto("https://api.ipify.org?format=json");
  const exit = await page.textContent("body");
  console.log(worker.id, exit);

  await context.close();
}`}
            </div>

            <p style={{ marginBottom: "1.5rem" }}>
              Chromium does not send loopback addresses through a proxy by default. Verify the exit against an external IP echo, not against a local service. If the echo returns the same IP for every worker, the bridge or the upstream session is being shared.
            </p>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>What the proxy will not fix</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              A proxy changes the IP and the ASN. It does not change the TLS fingerprint, the WebDriver surface, the font list, the canvas output, or the request rate. Headless Chromium fails some of those checks before the page finishes loading, and a residential exit only makes the IP part look better.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              Fix the browser surface first, then rotate. A new IP that gets blocked in two seconds is a more expensive way to fail.
            </p>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>What a browser session costs</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              ProxyBase residential starts at $3 per GB and mobile at $5 per GB. A browser burns more bandwidth than a raw HTTP client because it fetches images, fonts, and scripts. Budget two to five times the page size you measured with curl, and set a spend cap on the session before the first run.
            </p>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>Frequently Asked Questions</h2>

            <h3 style={{ color: "var(--text-primary)", fontSize: "1.25rem", marginTop: "2rem", marginBottom: "0.75rem" }}>Does Playwright support SOCKS5 proxies?</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              It supports unauthenticated SOCKS5 because Chromium understands the protocol without credentials. It does not support authenticated SOCKS5. Use a loopback HTTP-to-SOCKS5 bridge when the session requires a username and password.
            </p>

            <h3 style={{ color: "var(--text-primary)", fontSize: "1.25rem", marginTop: "2rem", marginBottom: "0.75rem" }}>Can Puppeteer use a proxy with a username and password?</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              Yes for HTTP and HTTPS proxies. Launch with <code>--proxy-server</code>, then call <code>page.authenticate</code> before navigating. It answers an HTTP 407 challenge, so it cannot authenticate a SOCKS5 proxy.
            </p>

            <h3 style={{ color: "var(--text-primary)", fontSize: "1.25rem", marginTop: "2rem", marginBottom: "0.75rem" }}>Why does Chromium ignore proxy credentials in the URL?</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              Chromium does not read userinfo from a proxy URL. Pass credentials as separate fields in Playwright, or through <code>page.authenticate</code> in Puppeteer. Embedded credentials commonly produce <code>ERR_NO_SUPPORTED_PROXIES</code>.
            </p>

            <h3 style={{ color: "var(--text-primary)", fontSize: "1.25rem", marginTop: "2rem", marginBottom: "0.75rem" }}>How do I rotate proxies in Playwright?</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              Create a new browser context with a new proxy or bridge address for each session. Pages inside one context share the exit. Closing and recreating the context is the rotation event.
            </p>

            <h3 style={{ color: "var(--text-primary)", fontSize: "1.25rem", marginTop: "2rem", marginBottom: "0.75rem" }}>Why does my proxy work in curl but not in Chromium?</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              curl and Python support authenticated SOCKS5. Chromium does not. A SOCKS5 endpoint with a username and password connects in curl and fails in the browser with <code>ERR_SOCKS_CONNECTION_FAILED</code>.
            </p>

            <h3 style={{ color: "var(--text-primary)", fontSize: "1.25rem", marginTop: "2rem", marginBottom: "0.75rem" }}>Does a proxy make headless Chrome undetectable?</h3>
            <p style={{ marginBottom: "1.5rem" }}>
              No. Detection also looks at the TLS fingerprint, the WebDriver surface, fonts, canvas output, header order, and request rate. Rotating exits without changing those signals gives you a fresh IP that gets blocked the same way.
            </p>

            <h2 style={{ color: "var(--text-primary)", fontSize: "1.5rem", marginTop: "3rem", marginBottom: "1rem" }}>Related reading</h2>
            <ul style={{ paddingLeft: "1.5rem", marginBottom: "2.5rem" }}>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/blog/proxy-for-web-scraping" style={{ color: "var(--accent-primary)" }}>
                  Proxy for web scraping: exit types, setup, and per-GB math
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/blog/rotating-proxy" style={{ color: "var(--accent-primary)" }}>
                  Rotating proxy: per-connection vs sticky rotation
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/blog/openclaw-bot-protections" style={{ color: "var(--accent-primary)" }}>
                  Bot protection checks that a proxy cannot fix
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/no-kyc-proxy" style={{ color: "var(--accent-primary)" }}>
                  Buying proxies without KYC
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/markets" style={{ color: "var(--accent-primary)" }}>
                  Browse residential and mobile proxy markets
                </Link>
              </li>
            </ul>

            <div style={{ display: "flex", gap: "16px", marginTop: "3rem" }}>
              <Link href="/markets" className="btn-primary" style={{ textDecoration: "none" }}>Browse Browser-Ready Proxies</Link>
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
