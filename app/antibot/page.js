"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./antibot.module.css";

const VENDOR_DESCRIPTIONS = {
 cloudflare:
 'Cloudflare Bot Management / CDN. Serves JS challenges, CAPTCHAs, and browser fingerprinting before allowing access.',
 datadome: "DataDome is a dedicated bot protection service. Detects headless browsers and automated traffic across web and mobile apps.",
 akamai: "Akamai Bot Manager. Uses device fingerprinting, behavioral analysis, and challenge-based detection at the edge.",
 perimeterx: "PerimeterX (now HUMAN). Uses behavioral signals and JS challenges to distinguish bots from humans in real-time.",
 hcaptcha: "hCaptcha a CAPTCHA challenge often integrated with Cloudflare or used standalone. Hard for automated agents to bypass.",
 recaptcha: "Google reCAPTCHA. The most common CAPTCHA service. V2 (checkbox) and V3 (invisible score-based) are widely deployed.",
 imperva: "Imperva/Incapsula WAF. Includes bot detection, DDoS protection, and application-layer security.",
 f5: "F5 BIG-IP / Distributed Cloud WAF. Enterprise-grade bot protection with session-based challenge mechanisms.",
 "aws-waf": "AWS WAF (Web Application Firewall). Rule-based bot control, often paired with CloudFront or ALB. Returns 403 on block.",
 cloudfront: "AWS CloudFront CDN. Not bot protection per se, but often sits in front of AWS WAF. Presence alone suggests cloud-hosted infra.",
 fastly: "Fastly CDN / WAF. Edge-compute platform with bot detection capabilities at the network edge.",
 varnish: "Varnish Cache / HTTP accelerator. Often paired with WAFs like Cloudflare or Imperva. Indicates caching layer present.",
 sucuri: "Sucuri WAF / Website Security. Cloud-based firewall and bot protection, common on WordPress and shared hosting.",
 distil: "Distil Networks (now Imperva). Browser fingerprinting and behavioral analysis for bot detection.",
 fingerprintjs: "FingerprintJS browser fingerprinting library. Often used as part of a larger bot detection stack.",
};

export default function AntibotPage() {
 const [url, setUrl] = useState("");
 const [loading, setLoading] = useState(false);
 const [result, setResult] = useState(null);

 async function onSubmit(e) {
 e.preventDefault();
 const cleanUrl = url.trim();
 if (!cleanUrl) return;

 setLoading(true);
 setResult(null);

 try {
 const res = await fetch("/api/antibot", {
 method: "POST",
 headers: { "content-type": "application/json" },
 body: JSON.stringify({ url: cleanUrl }),
 });
 const data = await res.json();
 setResult(data);
 } catch {
 setResult({ error: "Network error could not reach the detector API." });
 } finally {
 setLoading(false);
 }
 }

 return (
 <div className={styles.pageContainer}>
 <Navbar />

 <main className={styles.mainContent}>
 <section className={styles.heroSection}>
 <div className="hero-bg">
 <div className="hero-grid" />
 </div>

 <h1 className={styles.title}>
 Antibot <span className={styles.gradientText}>Detection</span>
 </h1>
 <p className={styles.subtitle}>
 Enter any URL to detect anti-bot and WAF protections.
 We fetch the page and scan response headers and body for known
 vendor fingerprints.
 </p>

 <div className={styles.searchContainer}>
 <form onSubmit={onSubmit} className={styles.searchForm}>
 <input
 type="text"
 value={url}
 onChange={(e) => setUrl(e.target.value)}
 placeholder="https://example.com"
 className={styles.searchInput}
 required
 />
 <button
 type="submit"
 className={styles.searchButton}
 disabled={loading}
 data-umami-event="Antibot: Check"
 >
 {loading ? "Checking..." : "Check"}
 </button>
 </form>
 </div>

 {loading && (
 <div className={styles.statusBar}>
 <span className={`${styles.statusDot} ${styles.loading}`} />
 <span className={styles.statusText}>Fetching and scanning…</span>
 </div>
 )}
 </section>

 <section className={styles.resultsSection}>
 {result && result.error && (
 <div className={styles.errorMessage}>{result.error}</div>
 )}

 {result && !result.error && (
 <>
 {/* Summary */}
 <div className={styles.summaryCard}>
 <div className={styles.summaryRow}>
 <span className={styles.summaryLabel}>URL</span>
 <span className={styles.summaryValue}>{result.url}</span>
 </div>
 <div className={styles.summaryRow}>
 <span className={styles.summaryLabel}>Status</span>
 <span className={styles.summaryValue}>
 HTTP {result.status}
 </span>
 </div>
 <div className={styles.summaryRow}>
 <span className={styles.summaryLabel}>Result</span>
 {result.hasProtection ? (
 <span
 className={`${styles.badge} ${styles.badgeProtected}`}
 >
 {result.matches.length} vendor
 {result.matches.length !== 1 ? "s" : ""} detected
 {result.challengeMatches.length > 0 &&
 ` ${result.challengeMatches.length} actively challenging`}
 </span>
 ) : (
 <span className={`${styles.badge} ${styles.badgeClean}`}>
 No protections detected
 </span>
 )}
 </div>
 </div>

 {/* Vendor cards */}
 {result.matches.length > 0 && (
 <div className={styles.vendorsGrid}>
 {result.matches.map((vendor) => {
 const isChallenging =
 result.challengeMatches.includes(vendor);
 return (
 <div
 key={vendor}
 className={`${styles.vendorCard} ${
 isChallenging ? styles.challenged : ""
 }`}
 >
 <div className={styles.vendorHeader}>
 <span className={styles.vendorName}>{vendor}</span>
 {isChallenging && (
 <span className={styles.challengeTag}>
 Active Challenge
 </span>
 )}
 </div>
 <p className={styles.vendorDesc}>
 {VENDOR_DESCRIPTIONS[vendor] ||
 `${vendor} bot protection detected in response.`}
 </p>
 </div>
 );
 })}
 </div>
 )}

 {result.matches.length === 0 && (
 <div className={styles.featuresGrid}>
 <div className={styles.featureCard}>
 <h3>No Protections Found</h3>
 <p>
 The site did not match any known WAF or bot protection
 fingerprints. It may be unprotected, or using a custom
 solution not in our detection database.
 </p>
 </div>
 </div>
 )}
 </>
 )}

 {/* Idle state before first search */}
 {!result && !loading && (
 <div className={styles.featuresGrid}>
 <div className={styles.featureCard}>
 <h3>🛡️ WAF Detection</h3>
 <p>
 Identifies Cloudflare, Akamai, Imperva, DataDome, PerimeterX,
 Sucuri, AWS WAF, F5, and more from response signatures.
 </p>
 </div>
 <div className={styles.featureCard}>
 <h3>🤖 Challenge Detection</h3>
 <p>
 Flags active challenge pages CAPTCHAs, JS browser checks,
 &quot;checking your browser&quot; interstitials, and access denied pages.
 </p>
 </div>
 <div className={styles.featureCard}>
 <h3>📡 CDN Fingerprinting</h3>
 <p>
 Detects CDN layers like CloudFront, Fastly, and Varnish
 that often sit in front of bot protection or rate limiting.
 </p>
 </div>
 </div>
 )}
 </section>
 </main>

 <Footer />
 </div>
 );
}
