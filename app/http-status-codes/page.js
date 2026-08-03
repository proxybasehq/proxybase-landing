import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export const metadata = {
  title: "HTTP Status Codes Reference — Complete Guide to All Response Codes | ProxyBase",
  description:
    "Complete HTTP status codes reference guide. Every 1xx, 2xx, 3xx, 4xx, and 5xx response code explained with practical examples. Debug your HTTP connections with our free headers inspector tool.",
  keywords: "HTTP status codes, HTTP response codes, HTTP error codes, 404 error, 502 bad gateway, 403 forbidden, 500 internal server error, HTTP 200, HTTP 301, status code reference",
  alternates: {
    canonical: "/http-status-codes",
  },
  openGraph: {
    title: "HTTP Status Codes Reference — Complete Guide to All Response Codes | ProxyBase",
    description:
      "Complete HTTP status codes reference guide. Every 1xx, 2xx, 3xx, 4xx, and 5xx response code explained with practical examples.",
    url: "https://proxybase.xyz/http-status-codes",
  },
};

const statusCodes = {
  "1xx — Informational": [
    { code: 100, name: "Continue", desc: "The server has received the request headers and the client should proceed to send the request body." },
    { code: 101, name: "Switching Protocols", desc: "The server agrees to switch protocols as requested by the client via the Upgrade header." },
    { code: 102, name: "Processing", desc: "The server is processing the request but no response is available yet. Used to prevent timeouts." },
    { code: 103, name: "Early Hints", desc: "Allows the server to send preliminary response headers before the final response, used for preloading resources." },
  ],
  "2xx — Success": [
    { code: 200, name: "OK", desc: "The request succeeded. Response body depends on the method: GET returns the resource, POST returns the result." },
    { code: 201, name: "Created", desc: "The request succeeded and a new resource was created. Common response to POST and PUT requests." },
    { code: 202, name: "Accepted", desc: "The request has been accepted for processing but is not yet complete. Used for async operations." },
    { code: 204, name: "No Content", desc: "The request succeeded but there is no content to send in the response body. Common for DELETE requests." },
    { code: 206, name: "Partial Content", desc: "The server is delivering only part of the resource due to a Range header sent by the client." },
  ],
  "3xx — Redirection": [
    { code: 301, name: "Moved Permanently", desc: "The resource has been permanently moved to a new URL. Search engines update their index to the new URL." },
    { code: 302, name: "Found", desc: "The resource is temporarily at a different URL. The client should continue using the original URL for future requests." },
    { code: 304, name: "Not Modified", desc: "The resource hasn&rsquo;t changed since the last request. The client can use its cached version. Saves bandwidth." },
    { code: 307, name: "Temporary Redirect", desc: "The resource is temporarily at another URL but the HTTP method must not change (unlike 302)." },
    { code: 308, name: "Permanent Redirect", desc: "Like 301 but the HTTP method must not change. The redirect is permanent." },
  ],
  "4xx — Client Errors": [
    { code: 400, name: "Bad Request", desc: "The server cannot process the request due to malformed syntax, invalid parameters, or a request that&rsquo;s too large." },
    { code: 401, name: "Unauthorized", desc: "Authentication is required and has failed or not been provided. The client must authenticate to get the requested response." },
    { code: 403, name: "Forbidden", desc: "The server understood the request but refuses to authorize it. Unlike 401, re-authenticating won&rsquo;t help — access is denied." },
    { code: 404, name: "Not Found", desc: "The server cannot find the requested resource. Often returned when a URL path doesn&rsquo;t match any known route." },
    { code: 405, name: "Method Not Allowed", desc: "The HTTP method (GET, POST, etc.) is not supported for this resource. The response includes an Allow header listing valid methods." },
    { code: 408, name: "Request Timeout", desc: "The server timed out waiting for the client to send the full request. The client may retry." },
    { code: 409, name: "Conflict", desc: "The request conflicts with the current state of the server. Common with concurrent edit conflicts." },
    { code: 410, name: "Gone", desc: "The resource is permanently gone with no forwarding address. More definitive than 404." },
    { code: 418, name: "I&rsquo;m a Teapot", desc: "An April Fools' joke from 1998 (RFC 2324). The server refuses to brew coffee because it&rsquo;s a teapot." },
    { code: 429, name: "Too Many Requests", desc: "The client has sent too many requests in a given time (rate limiting). The Retry-After header indicates when to retry." },
  ],
  "5xx — Server Errors": [
    { code: 500, name: "Internal Server Error", desc: "A generic server error. Something went wrong on the server side but no more specific information is available." },
    { code: 502, name: "Bad Gateway", desc: "A server acting as a gateway or proxy received an invalid response from an upstream server." },
    { code: 503, name: "Service Unavailable", desc: "The server is temporarily unable to handle the request, typically due to maintenance or overload. Usually temporary." },
    { code: 504, name: "Gateway Timeout", desc: "A server acting as a gateway did not receive a response from the upstream server in time." },
  ],
};

export default function HttpStatusCodesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "HTTP Status Codes Reference — Complete Guide to All Response Codes",
    "description": "Complete HTTP status codes reference guide. Every 1xx, 2xx, 3xx, 4xx, and 5xx response code explained with practical debugging examples.",
    "url": "https://proxybase.xyz/http-status-codes",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <section className="section" style={{ minHeight: "80vh", paddingTop: "120px" }}>
        <div className="section-inner" style={{ maxWidth: "900px", margin: "0 auto", textAlign: "left" }}>
          <div className="section-header" style={{ textAlign: "left", alignItems: "flex-start" }}>
            <span className="section-label">Reference</span>
            <h1 className="section-title" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
              HTTP Status Codes
            </h1>
            <p className="section-desc" style={{ maxWidth: "100%", margin: 0, textAlign: "left" }}>
              A complete reference to every HTTP response status code, organized by category.
              Use our{" "}
              <Link href="/headers" style={{ color: "var(--accent-primary)", fontWeight: 600 }}>
                HTTP headers inspector
              </Link>{" "}
              to see live status codes from your own requests.
            </p>
          </div>

          <div className="terms-content" style={{ color: "var(--text-secondary)", lineHeight: "1.7", textAlign: "left" }}>
            <p style={{ marginBottom: "2rem" }}>
              Every HTTP response starts with a three-digit status code. It tells the client
              whether the request succeeded or what went wrong. If you debug APIs, proxy chains,
              or scraping pipelines, you see these codes constantly.
            </p>

            {Object.entries(statusCodes).map(([category, codes]) => (
              <div key={category} style={{ marginBottom: "2.5rem" }}>
                <h2 style={{
                  color: "var(--text-primary)",
                  marginBottom: "1rem",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  paddingBottom: "0.5rem",
                  borderBottom: "1px solid var(--border-subtle)",
                }}>
                  {category}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {codes.map((s) => (
                    <div
                      key={s.code}
                      style={{
                        padding: "16px 20px",
                        background: "var(--bg-secondary)",
                        borderRadius: "8px",
                        borderLeft: "3px solid var(--accent-primary)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "4px" }}>
                        <code style={{
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          color: "var(--accent-primary)",
                          fontFamily: "var(--font-mono, monospace)",
                        }}>
                          {s.code}
                        </code>
                        <strong style={{ color: "var(--text-primary)" }}>{s.name}</strong>
                      </div>
                      <p style={{ margin: 0, fontSize: "0.95rem" }}>
                        {s.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div style={{
              marginTop: "3rem",
              padding: "32px",
              background: "var(--bg-secondary)",
              borderRadius: "12px",
              textAlign: "center",
            }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text-primary)" }}>
                Debug Your HTTP Headers in Real Time
              </h3>
              <p style={{ marginBottom: "1.5rem" }}>
                See every status code, request header, and response header your connection sends.
                Built for debugging proxy chains and API integrations.
              </p>
              <Link
                href="/headers"
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
                Open Headers Inspector →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
