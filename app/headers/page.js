"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./headers.module.css";

export default function HeadersPage() {
  const [requestHeaders, setRequestHeaders] = useState(null);
  const [responseHeaders, setResponseHeaders] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const [showRaw, setShowRaw] = useState(false);
  const [copiedPanel, setCopiedPanel] = useState(null); // "request" | "response" | "raw"
  const [meta, setMeta] = useState({ timestamp: null, method: null, url: null });

  const fetchHeaders = useCallback(async () => {
    setStatus("loading");
    setErrorMsg("");
    setRequestHeaders(null);
    setResponseHeaders(null);

    try {
      const res = await fetch("/api/headers", {
        cache: "no-store",
        headers: {
          "X-ProxyBase-Client": "Headers Inspector",
        },
      });

      // Capture response headers
      const resHeaders = {};
      res.headers.forEach((value, key) => {
        resHeaders[key] = value;
      });
      setResponseHeaders(resHeaders);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      setRequestHeaders(data.request_headers || {});
      setMeta({
        timestamp: data.timestamp,
        method: data.method,
        url: data.url,
      });
      setStatus("success");
    } catch (err) {
      setErrorMsg(err.message || "Failed to fetch headers");
      setStatus("error");
    }
  }, []);

  // Auto-fetch on mount
  useEffect(() => {
    fetchHeaders();
  }, [fetchHeaders]);

  const copyToClipboard = async (text, panel) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPanel(panel);
      setTimeout(() => setCopiedPanel(null), 2000);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopiedPanel(panel);
      setTimeout(() => setCopiedPanel(null), 2000);
    }
  };

  const formatHeadersForCopy = (headers) => {
    return Object.entries(headers)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
  };

  const sortedEntries = (headers) => {
    if (!headers) return [];
    return Object.entries(headers).sort(([a], [b]) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    );
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <main className={styles.mainContent}>
        <section className={styles.heroSection}>
          <div className="hero-bg">
            <div className="hero-grid" />
          </div>

          <h1 className={styles.title}>
            HTTP <span className={styles.gradientText}>Headers</span> Inspector
          </h1>
          <p className={styles.subtitle}>
            Instantly see every request and response header your connection sends.
            Perfect for debugging proxies, CDNs, and network configurations.
          </p>

          <div className={styles.statusBar}>
            <span
              className={`${styles.statusDot} ${
                status === "loading"
                  ? styles.loading
                  : status === "error"
                  ? styles.error
                  : ""
              }`}
            />
            <span className={styles.statusText}>
              {status === "loading" && "Capturing headers…"}
              {status === "success" &&
                `Captured ${
                  Object.keys(requestHeaders || {}).length
                } request + ${
                  Object.keys(responseHeaders || {}).length
                } response headers`}
              {status === "error" && "Failed to capture headers"}
              {status === "idle" && "Ready"}
            </span>
          </div>

          <button
            className={styles.refreshBtn}
            onClick={fetchHeaders}
            disabled={status === "loading"}
          >
            <span className={styles.refreshIcon}>↻</span>
            {status === "loading" ? "Capturing…" : "Refresh Headers"}
          </button>
        </section>

        <section className={styles.resultsSection}>
          {status === "error" && (
            <div className={styles.errorMessage}>{errorMsg}</div>
          )}

          {(status === "success" || status === "loading") && (
            <>
              <div className={styles.headersGrid}>
                {/* Request Headers Panel */}
                <div className={styles.headerPanel}>
                  <div className={styles.panelHeader}>
                    <div className={styles.panelTitle}>
                      <span className={styles.panelIcon}>📤</span>
                      Request Headers
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {requestHeaders && (
                        <span className={styles.headerCount}>
                          {Object.keys(requestHeaders).length}
                        </span>
                      )}
                      {requestHeaders && (
                        <button
                          className={`${styles.copyBtn} ${
                            copiedPanel === "request" ? styles.copied : ""
                          }`}
                          onClick={() =>
                            copyToClipboard(
                              formatHeadersForCopy(requestHeaders),
                              "request"
                            )
                          }
                        >
                          {copiedPanel === "request" ? "✓ Copied" : "⧉ Copy"}
                        </button>
                      )}
                    </div>
                  </div>
                  <div className={styles.panelContent}>
                    {status === "loading" && (
                      <div className={styles.skeletonContainer}>
                        <div className={styles.skeletonLine} />
                        <div className={styles.skeletonLine} />
                        <div className={styles.skeletonLine} />
                        <div className={styles.skeletonLine} />
                        <div className={styles.skeletonLine} />
                      </div>
                    )}
                    {requestHeaders &&
                      sortedEntries(requestHeaders).map(([key, value]) => (
                        <div className={styles.headerRow} key={key}>
                          <span className={styles.headerKey}>{key}</span>
                          <span className={styles.headerValue}>{value}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Response Headers Panel */}
                <div
                  className={styles.headerPanel}
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className={styles.panelHeader}>
                    <div className={styles.panelTitle}>
                      <span className={styles.panelIcon}>📥</span>
                      Response Headers
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {responseHeaders && (
                        <span className={styles.headerCount}>
                          {Object.keys(responseHeaders).length}
                        </span>
                      )}
                      {responseHeaders && (
                        <button
                          className={`${styles.copyBtn} ${
                            copiedPanel === "response" ? styles.copied : ""
                          }`}
                          onClick={() =>
                            copyToClipboard(
                              formatHeadersForCopy(responseHeaders),
                              "response"
                            )
                          }
                        >
                          {copiedPanel === "response" ? "✓ Copied" : "⧉ Copy"}
                        </button>
                      )}
                    </div>
                  </div>
                  <div className={styles.panelContent}>
                    {status === "loading" && (
                      <div className={styles.skeletonContainer}>
                        <div className={styles.skeletonLine} />
                        <div className={styles.skeletonLine} />
                        <div className={styles.skeletonLine} />
                        <div className={styles.skeletonLine} />
                        <div className={styles.skeletonLine} />
                      </div>
                    )}
                    {responseHeaders &&
                      sortedEntries(responseHeaders).map(([key, value]) => (
                        <div className={styles.headerRow} key={key}>
                          <span className={styles.headerKey}>{key}</span>
                          <span className={styles.headerValue}>{value}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Raw view toggle */}
              {status === "success" && (
                <div className={styles.rawToggle}>
                  <button
                    className={`${styles.rawToggleBtn} ${
                      showRaw ? styles.active : ""
                    }`}
                    onClick={() => setShowRaw(!showRaw)}
                  >
                    {showRaw ? "Hide Raw" : "Show Raw Headers"}
                  </button>
                </div>
              )}

              {showRaw && requestHeaders && responseHeaders && (
                <div className={styles.rawBlock}>
                  <div className={styles.rawBlockHeader}>
                    <span className={styles.rawBlockTitle}>
                      Raw Headers Output
                    </span>
                    <button
                      className={`${styles.copyBtn} ${
                        copiedPanel === "raw" ? styles.copied : ""
                      }`}
                      onClick={() =>
                        copyToClipboard(
                          `=== REQUEST HEADERS ===\n${formatHeadersForCopy(
                            requestHeaders
                          )}\n\n=== RESPONSE HEADERS ===\n${formatHeadersForCopy(
                            responseHeaders
                          )}`,
                          "raw"
                        )
                      }
                    >
                      {copiedPanel === "raw" ? "✓ Copied" : "⧉ Copy All"}
                    </button>
                  </div>
                  <div className={styles.rawBlockContent}>
                    <pre>
                      {`=== REQUEST HEADERS ===\n${formatHeadersForCopy(
                        requestHeaders
                      )}\n\n=== RESPONSE HEADERS ===\n${formatHeadersForCopy(
                        responseHeaders
                      )}`}
                    </pre>
                  </div>
                </div>
              )}
            </>
          )}

          {status === "idle" && (
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <h3>🔍 Request Headers</h3>
                <p>
                  See exactly what headers your browser or proxy is sending,
                  including User-Agent, Accept, and forwarding headers.
                </p>
              </div>
              <div className={styles.featureCard}>
                <h3>📥 Response Headers</h3>
                <p>
                  View server response headers like Cache-Control, Content-Type,
                  and custom proxy headers.
                </p>
              </div>
              <div className={styles.featureCard}>
                <h3>🛡️ Proxy Debugging</h3>
                <p>
                  Verify X-Forwarded-For, Via, and other proxy-injected headers
                  to ensure your proxy chain is configured correctly.
                </p>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />

            {/* SEO Content Section */}
            <section style={{ maxWidth: "var(--max-width)", margin: "0 auto", padding: "60px 24px 80px", borderTop: "1px solid var(--border-subtle)" }}>
                <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                    <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "16px" }}>Free HTTP Headers Inspector — Debug Your Connection</h2>
                    <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "1.05rem", marginBottom: "24px" }}>
                        See every HTTP request and response header your browser or proxy sends. Essential for debugging proxy configurations, verifying IP forwarding headers, checking CDN behavior, and troubleshooting API integrations.
                    </p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "32px" }}>
                        <div style={{ padding: "20px", background: "var(--bg-secondary)", borderRadius: "8px" }}>
                            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "8px" }}>Proxy Header Verification</h3>
                            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                                Check that X-Forwarded-For, Via, X-Real-IP, and other proxy-injected headers are correctly set. Verify your proxy chain is working and no headers are leaking your origin IP to target servers.
                            </p>
                        </div>
                        <div style={{ padding: "20px", background: "var(--bg-secondary)", borderRadius: "8px" }}>
                            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "8px" }}>CDN & Security Headers</h3>
                            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                                Inspect Cache-Control, Content-Security-Policy, CORS headers, and other security-related response headers. Verify that your CDN is correctly caching content and your security policies are properly configured.
                            </p>
                        </div>
                        <div style={{ padding: "20px", background: "var(--bg-secondary)", borderRadius: "8px" }}>
                            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "8px" }}>Debugging with Proxies</h3>
                            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                                Part of ProxyBase's free network debugging suite. Need to test headers from different geographic locations? Use ProxyBase residential proxies to route traffic through IPs worldwide. <a href="/ai-agents#pricing" style={{ color: "var(--accent-primary)", fontWeight: 600 }}>See proxy pricing →</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
    </div>
  );
}
