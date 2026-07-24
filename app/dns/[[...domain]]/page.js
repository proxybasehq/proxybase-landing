"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { dumpAllDnsRecords } from "../../actions/dns";
import styles from "../dns.module.css";

const POPULAR_DOMAINS = [
 "proxybase.xyz",
 "google.com",
 "github.com",
 "cloudflare.com",
 "openai.com",
];

const RECORD_COLORS = {
 A: styles.typeBadgeA,
 AAAA: styles.typeBadgeAAAA,
 MX: styles.typeBadgeMX,
 TXT: styles.typeBadgeTXT,
 NS: styles.typeBadgeNS,
 CNAME: styles.typeBadgeCNAME,
 SOA: styles.typeBadgeSOA,
 CAA: styles.typeBadgeCAA,
 SRV: styles.typeBadgeSRV,
 NAPTR: styles.typeBadgeSRV,
 PTR: styles.typeBadgeSRV,
};

export default function DomainDnsPage() {
 const params = useParams();
 const router = useRouter();

 // [[...domain]] catch-all sets params.domain as an array. E.g. /dns/example.com -> ["example.com"]
 const urlDomain = params?.domain?.[0] || "";

 const [domainInput, setDomainInput] = useState(urlDomain);
 const [dnsData, setDnsData] = useState(null); // { domain, records, subdomains, errors, metadata }
 const [isSearching, setIsSearching] = useState(false);
 const [errorMessage, setErrorMessage] = useState("");
 const [activeFilter, setActiveFilter] = useState("ALL");
 const [copiedKey, setCopiedKey] = useState(null);

 const lastSearchedDomain = useRef("");

 useEffect(() => {
 if (urlDomain && lastSearchedDomain.current !== urlDomain) {
 lastSearchedDomain.current = urlDomain;
 setDomainInput(urlDomain);
 executeLookup(urlDomain);
 }
 }, [urlDomain]);

 const executeLookup = async (searchDomain) => {
 setIsSearching(true);
 setErrorMessage("");

 let cleaned = searchDomain.trim().toLowerCase();
 cleaned = cleaned.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0].split(":")[0];

 if (!cleaned) {
 setIsSearching(false);
 return;
 }

 try {
 const result = await dumpAllDnsRecords(cleaned);
 setDnsData(result);
 if (result.errors && Object.keys(result.errors).length > 0 && Object.keys(result.records).length === 0) {
 setErrorMessage(`Could not resolve DNS records for "${cleaned}". Please verify the domain name.`);
 }
 } catch (err) {
 console.error("DNS lookup error:", err);
 setErrorMessage(err.message || "Failed to query DNS records. Please try again.");
 } finally {
 setIsSearching(false);
 }
 };

 const handleSearch = (e) => {
 e.preventDefault();
 let cleanDomain = domainInput.trim().toLowerCase();
 if (!cleanDomain) {
 setErrorMessage("Please enter a domain name (e.g. proxybase.xyz)");
 return;
 }

 cleanDomain = cleanDomain.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0].split(":")[0];

 if (cleanDomain !== urlDomain) {
 router.push(`/dns/${cleanDomain}`);
 } else {
 executeLookup(cleanDomain);
 }
 };

 const copyToClipboard = (text, key) => {
 navigator.clipboard.writeText(typeof text === "object" ? JSON.stringify(text, null, 2) : String(text));
 setCopiedKey(key);
 setTimeout(() => setCopiedKey(null), 2000);
 };

 // Analyze DNS host provider from NS records
 const detectDnsHost = (nsRecords) => {
 if (!nsRecords || !Array.isArray(nsRecords) || nsRecords.length === 0) return "Authoritative DNS";
 const nsStr = nsRecords.map(item => (typeof item === 'object' ? item.value || item.address : item)).join(" ").toLowerCase();
 if (nsStr.includes("cloudflare")) return "Cloudflare DNS & CDN";
 if (nsStr.includes("awsdns") || nsStr.includes("amazondns")) return "Amazon Route 53";
 if (nsStr.includes("googledomains") || nsStr.includes("google")) return "Google Cloud DNS";
 if (nsStr.includes("registrar-servers") || nsStr.includes("namecheap")) return "Namecheap DNS";
 if (nsStr.includes("domaincontrol") || nsStr.includes("godaddy")) return "GoDaddy DNS";
 if (nsStr.includes("digitalocean")) return "DigitalOcean DNS";
 if (nsStr.includes("hetzner")) return "Hetzner Online";
 if (nsStr.includes("akamai") || nsStr.includes("linode")) return "Akamai / Linode";
 if (nsStr.includes("azure")) return "Microsoft Azure DNS";
 if (nsStr.includes("vercel")) return "Vercel DNS";
 if (nsStr.includes("netlify")) return "Netlify DNS";
 return "Authoritative Nameservers";
 };

 // Inspect TXT records for email deliverability & SEO verification
 const auditEmailSecurity = (txtRecords, dmarcSubdomain) => {
 let spf = false;
 let dmarc = false;
 const verifications = [];

 const processTxtString = (txtStr) => {
 const lower = txtStr.toLowerCase();
 if (lower.includes("v=spf1")) spf = true;
 if (lower.includes("v=dmarc1")) dmarc = true;
 if (lower.includes("google-site-verification")) verifications.push("Google Search Console");
 if (lower.includes("facebook-domain-verification")) verifications.push("Meta / Facebook");
 if (lower.includes("stripe-verification")) verifications.push("Stripe");
 if (lower.includes("bing-site-verification")) verifications.push("Bing Webmaster");
 if (lower.includes("resend")) verifications.push("Resend");
 if (lower.includes("mailgun")) verifications.push("Mailgun");
 };

 if (txtRecords && Array.isArray(txtRecords)) {
 txtRecords.forEach((t) => {
 if (typeof t === "string") processTxtString(t);
 else if (Array.isArray(t)) processTxtString(t.join(" "));
 else if (typeof t === "object" && t.entries) processTxtString(t.entries.join(" "));
 });
 }

 if (dmarcSubdomain?.TXT) {
 dmarcSubdomain.TXT.forEach((t) => {
 const s = Array.isArray(t) ? t.join(" ") : String(t);
 if (s.toLowerCase().includes("v=dmarc1")) dmarc = true;
 });
 }

 return { spf, dmarc, verifications };
 };

 const records = dnsData?.records || {};
 const subdomains = dnsData?.subdomains || {};
 const metadata = dnsData?.metadata || {};
 const recordKeys = Object.keys(records);
 const totalRecordTypes = recordKeys.length + Object.keys(subdomains).length;

 const firstIp = (() => {
 if (records.A?.[0]) return typeof records.A[0] === 'object' ? records.A[0].address : records.A[0];
 if (records.AAAA?.[0]) return typeof records.AAAA[0] === 'object' ? records.AAAA[0].address : records.AAAA[0];
 return null;
 })();

 const emailSecurity = auditEmailSecurity(records.TXT, subdomains._dmarc);
 const dnsHost = detectDnsHost(records.NS);

 // Filter records based on active tab
 const filteredRecordKeys = recordKeys.filter((type) => {
 if (activeFilter === "ALL") return true;
 if (activeFilter === "IP" && (type === "A" || type === "AAAA")) return true;
 if (activeFilter === "MAIL" && type === "MX") return true;
 if (activeFilter === "TXT" && type === "TXT") return true;
 if (activeFilter === "NS" && type === "NS") return true;
 if (activeFilter === "OTHER" && !["A", "AAAA", "MX", "TXT", "NS"].includes(type)) return true;
 return false;
 });

 return (
 <div className={styles.container}>
 <Navbar />

 <main className={styles.mainContent}>
 {/* Hero Header */}
 <section className={styles.heroSection}>
 <div className={styles.badge}>
 ⚡ Complete DNS Record Dump & Technical Audit
 </div>
 <h1 className={styles.title}>
 Domain DNS <span className={styles.gradientText}>Record Lookup</span>
 </h1>
 <p className={styles.subtitle}>
 Exhaustively dump all DNS record types (A, AAAA, MX, TXT, NS, CNAME, SOA, CAA, SRV, NAPTR, PTR), DMARC policies, and DNSSEC resolution for any domain.
 </p>

 <div className={styles.searchContainer}>
 <form onSubmit={handleSearch} className={styles.searchForm}>
 <input
 type="text"
 value={domainInput}
 onChange={(e) => setDomainInput(e.target.value)}
 placeholder="Enter domain name (e.g. proxybase.xyz or google.com)"
 className={styles.searchInput}
 autoFocus
 required
 />
 <button
 type="submit"
 className={styles.searchButton}
 disabled={isSearching}
 data-umami-event="DNS Tool: Lookup Click"
 >
 {isSearching ? "Dumping..." : "Dump All DNS Records"}
 </button>
 </form>

 <div className={styles.quickTags}>
 <span className={styles.quickTagLabel}>Quick lookup:</span>
 {POPULAR_DOMAINS.map((domain) => (
 <button
 key={domain}
 className={styles.quickTagBtn}
 onClick={() => {
 setDomainInput(domain);
 router.push(`/dns/${domain}`);
 }}
 data-umami-event={`DNS Tool: Quick Tag ${domain}`}
 >
 {domain}
 </button>
 ))}
 </div>
 </div>
 </section>

 {/* Results / Prompt Area */}
 <section className={styles.resultsSection}>
 {errorMessage && (
 <div className={styles.errorMessage}>
 ⚠️ {errorMessage}
 </div>
 )}

 {isSearching && (
 <div className={styles.dashboardBanner}>
 <div className={styles.skeletonContainer}>
 <div className={styles.skeletonLine} style={{ width: "40%" }} />
 <div className={styles.skeletonLine} style={{ width: "80%" }} />
 <div className={styles.skeletonLine} style={{ width: "60%" }} />
 </div>
 </div>
 )}

 {/* Initial State Box when NO domain is supplied */}
 {!dnsData && !isSearching && (
 <>
 <div className={styles.emptyPromptBox}>
 <div className={styles.emptyPromptIcon}>🌐</div>
 <h2 className={styles.emptyPromptTitle}>Enter a domain name to inspect DNS records</h2>
 <p className={styles.emptyPromptDesc}>
 Type a domain above (e.g. <code>proxybase.xyz</code>) or click one of the popular domains to instantly dump its A, AAAA, MX, TXT, NS, SOA, and DMARC security records.
 </p>
 <div className={styles.quickTags}>
 <span className={styles.quickTagLabel}>Try a domain now:</span>
 {POPULAR_DOMAINS.map((domain) => (
 <button
 key={domain}
 className={styles.quickTagBtn}
 onClick={() => {
 setDomainInput(domain);
 router.push(`/dns/${domain}`);
 }}
 data-umami-event={`DNS Tool: Prompt Tag ${domain}`}
 >
 {domain}
 </button>
 ))}
 </div>
 </div>

 <div className={styles.featuresGrid}>
 <div className={styles.featureCard}>
 <div className={styles.featureIcon}>🔍</div>
 <h3>Exhaustive Record Resolution</h3>
 <p>Queries A, AAAA, MX, TXT, NS, CNAME, SOA, CAA, SRV, NAPTR, PTR, and subdomain policies in parallel.</p>
 </div>

 <div className={styles.featureCard}>
 <div className={styles.featureIcon}>🛡️</div>
 <h3>DMARC & SPF Deliverability Audit</h3>
 <p>Automatically queries `_dmarc` subdomains and audits TXT authentication records for email sender reputation.</p>
 </div>

 <div className={styles.featureCard}>
 <div className={styles.featureIcon}>⚡</div>
 <h3>Programmatic API & JSON Export</h3>
 <p>Designed for engineers and AI agents. Export raw JSON dumps or query via GET `/api/dns?domain=...`.</p>
 </div>
 </div>
 </>
 )}

 {dnsData && !isSearching && (
 <>
 {/* Dashboard Health Banner */}
 <div className={styles.dashboardBanner}>
 <div className={styles.dashboardHeader}>
 <div className={styles.domainIdentity}>
 <span className={styles.domainName}>{dnsData.domain}</span>
 <span className={styles.domainStatusBadge}>
 {totalRecordTypes > 0 ? `${totalRecordTypes} DNS Record Types Dumped` : "No Records"}
 </span>
 </div>

 <div className={styles.actionButtonGroup}>
 <button
 className={styles.actionBtn}
 onClick={() => copyToClipboard({ domain: dnsData.domain, records, subdomains, metadata }, "all-json")}
 title="Copy complete raw JSON DNS dump"
 data-umami-event="DNS Tool: Copy JSON"
 >
 {copiedKey === "all-json" ? "✓ Copied JSON Dump" : "📋 Copy Full JSON Dump"}
 </button>
 <Link
 href={`/whois/${dnsData.domain}`}
 className={styles.actionBtn}
 data-umami-event="DNS Tool: WHOIS Link"
 >
 🔍 Domain WHOIS →
 </Link>
 {firstIp && (
 <Link
 href={`/ip/${firstIp}`}
 className={styles.actionBtn}
 data-umami-event="DNS Tool: IP Link"
 >
 🌐 Reverse IP →
 </Link>
 )}
 </div>
 </div>

 <div className={styles.metricsGrid}>
 <div className={styles.metricCard}>
 <div className={styles.metricLabel}>DNS Provider / Host</div>
 <div className={styles.metricValue}>
 <span className={styles.statusInfo}>{dnsHost}</span>
 </div>
 </div>

 <div className={styles.metricCard}>
 <div className={styles.metricLabel}>Email Security (SPF)</div>
 <div className={styles.metricValue}>
 {emailSecurity.spf ? (
 <span className={styles.statusGood}>✓ Active</span>
 ) : (
 <span className={styles.statusWarn}>⚠️ Missing SPF</span>
 )}
 </div>
 </div>

 <div className={styles.metricCard}>
 <div className={styles.metricLabel}>DMARC Record</div>
 <div className={styles.metricValue}>
 {emailSecurity.dmarc ? (
 <span className={styles.statusGood}>✓ Active</span>
 ) : (
 <span className={styles.statusWarn}>⚠️ Not Found</span>
 )}
 </div>
 </div>

 <div className={styles.metricCard}>
 <div className={styles.metricLabel}>DNSSEC Status</div>
 <div className={styles.metricValue}>
 {metadata.dnssecValidated ? (
 <span className={styles.statusGood}>✓ Authenticated</span>
 ) : (
 <span className={styles.statusInfo}>Standard DNS ({metadata.status || "NOERROR"})</span>
 )}
 </div>
 </div>
 </div>
 </div>

 {/* Filter Tabs */}
 <div className={styles.filterBar}>
 <button
 className={`${styles.filterPill} ${activeFilter === "ALL" ? styles.filterPillActive : ""}`}
 onClick={() => setActiveFilter("ALL")}
 >
 All Records ({totalRecordTypes})
 </button>
 <button
 className={`${styles.filterPill} ${activeFilter === "IP" ? styles.filterPillActive : ""}`}
 onClick={() => setActiveFilter("IP")}
 >
 A & AAAA IPs ({ (records.A ? 1 : 0) + (records.AAAA ? 1 : 0) })
 </button>
 <button
 className={`${styles.filterPill} ${activeFilter === "MAIL" ? styles.filterPillActive : ""}`}
 onClick={() => setActiveFilter("MAIL")}
 >
 MX Mail ({records.MX ? 1 : 0})
 </button>
 <button
 className={`${styles.filterPill} ${activeFilter === "TXT" ? styles.filterPillActive : ""}`}
 onClick={() => setActiveFilter("TXT")}
 >
 TXT & Auth ({ (records.TXT ? 1 : 0) + (subdomains._dmarc ? 1 : 0) })
 </button>
 <button
 className={`${styles.filterPill} ${activeFilter === "NS" ? styles.filterPillActive : ""}`}
 onClick={() => setActiveFilter("NS")}
 >
 NS Nameservers ({records.NS ? 1 : 0})
 </button>
 <button
 className={`${styles.filterPill} ${activeFilter === "OTHER" ? styles.filterPillActive : ""}`}
 onClick={() => setActiveFilter("OTHER")}
 >
 CNAME / SOA / CAA / SRV / Others
 </button>
 </div>

 {/* Record Cards Grid */}
 <div className={styles.recordsGrid}>
 {/* DMARC Subdomain Record Card (if present) */}
 {subdomains._dmarc && (activeFilter === "ALL" || activeFilter === "TXT") && (
 <div className={styles.recordCard}>
 <div className={styles.recordHeader}>
 <div className={styles.recordTypeGroup}>
 <span className={`${styles.typeBadge} ${styles.typeBadgeTXT}`}>_dmarc.TXT</span>
 <span className={styles.recordCountBadge}>Subdomain Policy</span>
 </div>
 <button
 className={styles.copyRecordBtn}
 onClick={() => copyToClipboard(subdomains._dmarc.TXT, "dmarc-txt")}
 >
 {copiedKey === "dmarc-txt" ? "✓ Copied" : "📋 Copy"}
 </button>
 </div>
 <div className={styles.recordContent}>
 {subdomains._dmarc.TXT.map((item, idx) => {
 const txtStr = Array.isArray(item) ? item.join(" ") : String(item);
 return (
 <div key={idx} className={styles.recordRow}>
 <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "100%" }}>
 <span className={styles.recordText}>{txtStr}</span>
 <div className={styles.recordMeta}>
 <span className={styles.seoTag}>DMARC Email Policy</span>
 </div>
 </div>
 </div>
 );
 })}
 </div>
 </div>
 )}

 {/* Standard Record Type Cards */}
 {filteredRecordKeys.map((type) => {
 const data = records[type];
 const colorClass = RECORD_COLORS[type] || styles.typeBadgeA;

 return (
 <div key={type} className={styles.recordCard}>
 <div className={styles.recordHeader}>
 <div className={styles.recordTypeGroup}>
 <span className={`${styles.typeBadge} ${colorClass}`}>{type}</span>
 <span className={styles.recordCountBadge}>
 {Array.isArray(data) ? `${data.length} entry${data.length > 1 ? "s" : ""}` : "1 record"}
 </span>
 </div>
 <button
 className={styles.copyRecordBtn}
 onClick={() => copyToClipboard(data, type)}
 title={`Copy ${type} record data`}
 >
 {copiedKey === type ? "✓ Copied" : "📋 Copy"}
 </button>
 </div>

 <div className={styles.recordContent}>
 {/* A / AAAA Record Rendering */}
 {(type === "A" || type === "AAAA") && (
 <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
 {data.map((item, idx) => {
 const ip = typeof item === 'object' ? item.address : item;
 const ttl = typeof item === 'object' ? item.ttl : null;

 return (
 <div key={idx} className={styles.recordRow}>
 <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
 <span className={styles.recordText}>{ip}</span>
 {ttl && <span className={styles.recordCountBadge}>TTL: {ttl}s</span>}
 </div>
 <Link
 href={`/ip/${ip}`}
 className={styles.seoTag}
 title="Check IP Whois and Geolocation"
 >
 IP Info →
 </Link>
 </div>
 );
 })}
 </div>
 )}

 {/* MX Record Rendering */}
 {type === "MX" && (
 <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
 {data.map((mx, idx) => {
 const exchange = typeof mx === 'object' ? mx.exchange : mx;
 const priority = typeof mx === 'object' ? mx.priority : null;
 const ttl = typeof mx === 'object' ? mx.ttl : null;

 return (
 <div key={idx} className={styles.recordRow}>
 <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
 <span className={styles.recordText}>{exchange}</span>
 <div className={styles.recordMeta}>
 {priority !== null && <span className={styles.seoTag}>Priority: {priority}</span>}
 {ttl && <span className={styles.recordCountBadge}>TTL: {ttl}s</span>}
 </div>
 </div>
 </div>
 );
 })}
 </div>
 )}

 {/* TXT Record Rendering */}
 {type === "TXT" && (
 <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
 {data.map((txtItem, idx) => {
 let txtStr = "";
 if (typeof txtItem === "string") txtStr = txtItem;
 else if (Array.isArray(txtItem)) txtStr = txtItem.join(" ");
 else if (typeof txtItem === "object" && txtItem.entries) txtStr = txtItem.entries.join(" ");
 else txtStr = JSON.stringify(txtItem);

 const isSpf = txtStr.toLowerCase().includes("v=spf1");
 const isDmarc = txtStr.toLowerCase().includes("v=dmarc1");

 return (
 <div key={idx} className={styles.recordRow}>
 <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "100%" }}>
 <span className={styles.recordText}>{txtStr}</span>
 {(isSpf || isDmarc) && (
 <div className={styles.recordMeta}>
 {isSpf && <span className={styles.seoTag}>SPF Deliverability</span>}
 {isDmarc && <span className={styles.seoTag}>DMARC Policy</span>}
 </div>
 )}
 </div>
 </div>
 );
 })}
 </div>
 )}

 {/* NS Record Rendering */}
 {type === "NS" && (
 <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
 {data.map((ns, idx) => {
 const value = typeof ns === 'object' ? ns.value || ns.address : ns;
 return (
 <div key={idx} className={styles.recordRow}>
 <span className={styles.recordText}>{value}</span>
 </div>
 );
 })}
 </div>
 )}

 {/* SOA Record Rendering */}
 {type === "SOA" && (
 (() => {
 const soaData = Array.isArray(data) ? data[0] : data;
 if (typeof soaData !== 'object' || !soaData) return null;
 return (
 <table className={styles.soaTable}>
 <tbody>
 {soaData.nsname && (
 <tr>
 <td>Primary NS:</td>
 <td>{soaData.nsname}</td>
 </tr>
 )}
 {soaData.hostmaster && (
 <tr>
 <td>Hostmaster:</td>
 <td>{soaData.hostmaster}</td>
 </tr>
 )}
 {soaData.serial && (
 <tr>
 <td>Serial:</td>
 <td>{soaData.serial}</td>
 </tr>
 )}
 {soaData.refresh && (
 <tr>
 <td>Refresh:</td>
 <td>{soaData.refresh}s</td>
 </tr>
 )}
 {soaData.retry && (
 <tr>
 <td>Retry:</td>
 <td>{soaData.retry}s</td>
 </tr>
 )}
 {soaData.expire && (
 <tr>
 <td>Expire:</td>
 <td>{soaData.expire}s</td>
 </tr>
 )}
 {soaData.minttl && (
 <tr>
 <td>Minimum TTL:</td>
 <td>{soaData.minttl}s</td>
 </tr>
 )}
 </tbody>
 </table>
 );
 })()
 )}

 {/* CNAME / CAA / SRV / Generic Rendering */}
 {!["A", "AAAA", "MX", "TXT", "NS", "SOA"].includes(type) && (
 <pre
 className={styles.recordRow}
 style={{ margin: 0, overflowX: "auto", fontSize: "0.85rem" }}
 >
 {JSON.stringify(data, null, 2)}
 </pre>
 )}
 </div>
 </div>
 );
 })}

 {filteredRecordKeys.length === 0 && !subdomains._dmarc && (
 <div
 style={{
 gridColumn: "1 / -1",
 textAlign: "center",
 padding: "40px 24px",
 background: "var(--bg-secondary)",
 borderRadius: "var(--radius-lg)",
 color: "var(--text-muted)",
 }}
 >
 No records found for filter "{activeFilter}".
 </div>
 )}
 </div>
 </>
 )}

 {/* SEO Content Section for Search Engines & Users */}
 <article className={styles.seoSection}>
 <h2>Why Complete DNS Record Dumps Matter for Technical SEO & Architecture</h2>
 <p>
 Dumping all DNS records of a domain provides a complete fingerprint of its hosting infrastructure, CDN setup,
 email security authentication, and third-party SaaS integrations.
 </p>

 <div className={styles.seoGrid}>
 <div className={styles.seoBlock}>
 <h4>Email Authentication (SPF & DMARC)</h4>
 <p>
 Dumping TXT and `_dmarc` records verifies whether email spoofing defenses (SPF, DKIM, DMARC) are active,
 protecting domain trust and email deliverability.
 </p>
 </div>

 <div className={styles.seoBlock}>
 <h4>Nameserver Latency & Core Web Vitals</h4>
 <p>
 DNS resolution speed directly impacts Time To First Byte (TTFB). Auditing NS and SOA records identifies authoritative
 DNS hosts (Cloudflare, Route 53, etc.) and TTL cache settings.
 </p>
 </div>

 <div className={styles.seoBlock}>
 <h4>Infrastructure & IP Mapping</h4>
 <p>
 A & AAAA dumps reveal load balancer IP addresses, reverse WHOIS ranges, and IPv6 readiness across global networks.
 </p>
 </div>
 </div>

 <div className={styles.ctaBox}>
 <div>
 <h3>Need to Crawl & Audit DNS & SEO Globally Without IP Blocks?</h3>
 <p>ProxyBase provides programmatic residential SOCKS5 proxies tailored for AI agents and web scrapers.</p>
 </div>
 <Link href="/ai-agents" className={styles.ctaBtn} data-umami-event="DNS Tool: Bottom CTA Click">
 Explore ProxyBase Proxies →
 </Link>
 </div>
 </article>
 </section>
 </main>

 <Footer />
 </div>
 );
}
