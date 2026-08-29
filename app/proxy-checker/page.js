"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./proxy-checker.module.css";

export default function ProxyCheckerPage() {
 const [type, setType] = useState("socks5");
 const [host, setHost] = useState("");
 const [port, setPort] = useState("");
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const [checking, setChecking] = useState(false);
 const [result, setResult] = useState(null);
 const [realIp, setRealIp] = useState("");

 useEffect(() => {
 fetch("https://api.ipify.org?format=json")
 .then((res) => res.json())
 .then((data) => data.ip && setRealIp(data.ip))
 .catch(() => {});
 }, []);

 const runCheck = async (e) => {
 e.preventDefault();
 setChecking(true);
 setResult(null);
 try {
 const res = await fetch("/api/proxy-checker", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({ type, host, port: Number(port), username, password }),
 });
 const data = await res.json();
 setResult(data);
 } catch {
 setResult({ ok: false, error: "Could not reach the checker service" });
 } finally {
 setChecking(false);
 }
 };

 const anonymityVerdict = () => {
 if (!result?.ok) return null;
 if (!realIp) return { label: "Exit IP: " + result.exitIp, good: true };
 if (result.exitIp === realIp) {
 return { label: "Warning: exit IP matches your real IP, this proxy is not anonymizing", good: false };
 }
 return { label: `Anonymity OK: real IP (${realIp}) is hidden, exit IP is ${result.exitIp}`, good: true };
 };

 const verdict = anonymityVerdict();

 return (
 <>
 <Navbar />

 <div className={styles.container}>
 <div className={styles.mainContent}>
 <section className={styles.heroSection}>
 <h1 className={styles.title}>
 <span className={styles.gradientText}>Free Proxy Checker</span>
 </h1>
 <p className={styles.subtitle}>
 Test any SOCKS5 or HTTP proxy in seconds: connectivity, exit IP, latency, and whether your real IP is hidden.
 </p>

 <div className={styles.card}>
 <form onSubmit={runCheck} className={styles.form}>
 <div className={styles.row}>
 <div className={styles.field}>
 <label className={styles.label}>Protocol</label>
 <select
 className={styles.input}
 value={type}
 onChange={(e) => setType(e.target.value)}
 >
 <option value="socks5">SOCKS5</option>
 <option value="http">HTTP</option>
 </select>
 </div>
 <div className={styles.fieldGrow}>
 <label className={styles.label}>Proxy Host</label>
 <input
 className={styles.input}
 type="text"
 placeholder="e.g. api.proxybase.xyz"
 value={host}
 onChange={(e) => setHost(e.target.value)}
 required
 />
 </div>
 <div className={styles.fieldPort}>
 <label className={styles.label}>Port</label>
 <input
 className={styles.input}
 type="number"
 placeholder="1080"
 min="1"
 max="65535"
 value={port}
 onChange={(e) => setPort(e.target.value)}
 required
 />
 </div>
 </div>

 <div className={styles.row}>
 <div className={styles.fieldGrow}>
 <label className={styles.label}>Username (optional)</label>
 <input
 className={styles.input}
 type="text"
 autoComplete="off"
 value={username}
 onChange={(e) => setUsername(e.target.value)}
 />
 </div>
 <div className={styles.fieldGrow}>
 <label className={styles.label}>Password (optional)</label>
 <input
 className={styles.input}
 type="password"
 autoComplete="new-password"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 />
 </div>
 </div>

 <button className={styles.checkButton} type="submit" disabled={checking}>
 {checking ? "Checking proxy…" : "Check Proxy"}
 </button>
 </form>

 {result && (
 <div className={styles.resultWrap}>
 {result.ok ? (
 <div className={styles.resultOk}>
 <div className={styles.resultStatus}>Working</div>
 <div className={styles.resultGrid}>
 <div className={styles.resultItem}>
 <span className={styles.resultLabel}>Exit IP</span>
 <span className={styles.resultValue}>{result.exitIp}</span>
 </div>
 <div className={styles.resultItem}>
 <span className={styles.resultLabel}>Latency</span>
 <span className={styles.resultValue}>{result.latencyMs} ms</span>
 </div>
 </div>
 {verdict && (
 <div className={verdict.good ? styles.verdictGood : styles.verdictBad}>
 {verdict.label}
 </div>
 )}
 </div>
 ) : (
 <div className={styles.resultFail}>
 <div className={styles.resultStatus}>Failed</div>
 <p className={styles.resultError}>{result.error}</p>
 </div>
 )}
 </div>
 )}
 </div>
 </section>

 <section className={styles.seoSection}>
 <div className={styles.sectionHeader}>
 <span className={styles.sectionLabel}>Guide</span>
 <h2>How a Proxy Checker Works</h2>
 </div>
 <div className={styles.seoGrid}>
 <div className={styles.seoCard}>
 <h3>What does a proxy checker test?</h3>
 <p>
 This tool routes a request through your proxy to an echo service and reports four things: whether the proxy accepts connections, which IP the target sees (the exit IP), how long the round trip took (latency), and whether the exit IP differs from your real IP, which is the core anonymity test.
 </p>
 </div>
 <div className={styles.seoCard}>
 <h3>Why is my proxy failing the check?</h3>
 <p>
 The most common causes: wrong port (SOCKS5 gateways often run on 1080), a username/password mismatch, the proxy host only allowing certain source IPs, or the proxy's upstream being offline. If the proxy connects but the request stalls, the exit node is likely overloaded.
 </p>
 </div>
 <div className={styles.seoCard}>
 <h3>What counts as good latency?</h3>
 <p>
 Anything under 500 ms is fine for browsing and API calls. 500–1500 ms works but will feel slow for scraping at scale. Above 2000 ms, the proxy is too slow for most automation workloads. Look for a node closer to your target sites.
 </p>
 </div>
 <div className={styles.seoCard}>
 <h3>Proxies that pass this check every time</h3>
 <p>
 ProxyBase sells residential SOCKS5 by the gigabyte for crypto: no KYC, credentials delivered through an API, built for AI agents and scrapers. Grab a package at the <a href="/mpp" style={{ color: "var(--accent-primary)" }}>crypto store</a> and paste the credentials into the checker above.
 </p>
 </div>
 </div>
 </section>
 </div>
 </div>

 <Footer />
 </>
 );
}
