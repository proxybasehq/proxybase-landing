import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import styles from "./handbook.module.css";
import { CopyHandbookLinkButton } from "./HandbookActions";

export const metadata = {
  title: "Residential Proxy Pool Handbook: Architecture & Ethical Sourcing Standards | ProxyBase",
  description:
    "Download the ProxyBase Residential Proxy Pool Handbook (PDF). 11 pages on Tier A+ peer node sourcing, Yamux sandboxing, and how our outbound-only WebSocket relay works.",
  keywords:
    "residential proxy handbook, residential proxy pool handbook, ethical proxy sourcing, proxy whitepaper, residential proxy architecture, socks5 proxy pool, peer-to-peer proxy network, proxy compliance standards, yamux proxy routing, proxybase handbook, download proxy handbook",
  alternates: {
    canonical: "/residential-proxy-handbook",
  },
  openGraph: {
    title: "ProxyBase Residential Proxy Pool Handbook: Standards & Architecture Whitepaper",
    description:
      "How we source residential IPs with consent and pay the people whose bandwidth we route. The official 11-page technical whitepaper, free to download.",
    url: "https://proxybase.xyz/residential-proxy-handbook",
    type: "article",
    siteName: "ProxyBase",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProxyBase Residential Proxy Pool Handbook (PDF)",
    description:
      "How we source residential IPs with consent and pay the people whose bandwidth we route. The official 11-page technical whitepaper, free to download.",
  },
};

const handbookFaqs = [
  {
    q: "What is the ProxyBase Residential Proxy Pool Handbook?",
    a: "It's an 11-page engineering whitepaper published by the ProxyBase Trust & Infrastructure Team. It documents how we source, verify, and isolate nodes in our peer-to-peer residential proxy network, including our Tier A+ opt-in criteria, the Yamux multiplexing architecture, and how peer compensation works.",
  },
  {
    q: "How does ProxyBase ensure residential proxies are ethically sourced?",
    a: "Every residential IP comes from a consenting individual (a Seller Node) who installed a sandboxed client to share idle bandwidth for money. We don't use hidden SDKs, bundled terms of service, or unpaid proxy models.",
  },
  {
    q: "What is the difference between Tier A+ and Tier B/C proxy pools?",
    a: "Tier A+ meets all four of our user-centric pillars: explicit consent, clear technical disclosure, ongoing awareness, and direct payment. Tier B gets consent deceptively, through bundled terms or an extension the user forgot about. Tier C is botnets and malware. We source from Tier A+ Seller Nodes and audited ISP partnerships only; Tier B and Tier C acquisition is banned.",
  },
  {
    q: "Does running a ProxyBase seller node expose the host's local home network?",
    a: "No. Seller Nodes connect outbound-only to the ProxyBase Relay Core over WebSocket tunnels, multiplexed with Yamux. Because the connection only ever goes outbound, host devices never open an inbound listening port on their home routers. Each request runs in its own sandboxed stream with no access to the filesystem, browser storage, or other devices on the LAN.",
  },
  {
    q: "Why are residential proxies critical for autonomous AI agents?",
    a: "Your agent gets blocked when its requests leave from a datacenter range. Cloudflare, Akamai, and DataDome flag AWS, GCP, and DigitalOcean IPs quickly, and that happens before anything looks at your credentials. Consensual residential proxies carry genuine consumer ISP reputation instead, so far fewer requests hit a CAPTCHA or an IP block.",
  },
  {
    q: "Where can I download the official Residential Proxy Pool Handbook PDF?",
    a: "Use the download button on this page, or grab the PDF directly at https://proxybase.xyz/ProxyBase_Residential_Proxy_Pool_Handbook.pdf. It's free, with no registration or personal information required.",
  },
];

export default function ResidentialProxyHandbookPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": "https://proxybase.xyz/residential-proxy-handbook#article",
        "headline": "ProxyBase Residential Proxy Pool Handbook: Node Procurement, Relay Architecture & Ethical Policies",
        "name": "ProxyBase Residential Proxy Pool Handbook",
        "description": "Engineering whitepaper on Tier A+ residential proxy sourcing, Yamux sandboxed routing, and how seller nodes get paid for bandwidth.",
        "url": "https://proxybase.xyz/residential-proxy-handbook",
        "inLanguage": "en-US",
        "author": {
          "@type": "Organization",
          "name": "ProxyBase Trust & Infrastructure Team",
          "url": "https://proxybase.xyz",
        },
        "publisher": {
          "@type": "Organization",
          "name": "ProxyBase",
          "url": "https://proxybase.xyz",
          "logo": {
            "@type": "ImageObject",
            "url": "https://proxybase.xyz/logo.svg",
          },
        },
        "datePublished": "2026-01-15T00:00:00Z",
        "dateModified": new Date().toISOString(),
      },
      {
        "@type": "DigitalDocument",
        "@id": "https://proxybase.xyz/ProxyBase_Residential_Proxy_Pool_Handbook.pdf",
        "name": "ProxyBase Residential Proxy Pool Handbook (PDF)",
        "encodingFormat": "application/pdf",
        "url": "https://proxybase.xyz/ProxyBase_Residential_Proxy_Pool_Handbook.pdf",
        "description": "The 11-page PDF: how ProxyBase sources residential IPs with consent, routes them over Yamux, and compensates seller nodes.",
        "inLanguage": "en-US",
        "fileSize": "536KB",
        "numberOfPages": 11,
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://proxybase.xyz",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Resources",
            "item": "https://proxybase.xyz/ai-agents#pricing",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Residential Proxy Pool Handbook",
            "item": "https://proxybase.xyz/residential-proxy-handbook",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": handbookFaqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className={styles.handbookPage}>
        {/* HERO SECTION */}
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.breadcrumbs}>
              <Link href="/">Home</Link>
              <span>/</span>
              <span>Resources</span>
              <span>/</span>
              <span>Residential Proxy Pool Handbook</span>
            </div>

            <div className={styles.pillBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              <span>Official Whitepaper • 2026 Edition</span>
            </div>

            <h1 className={styles.heroTitle}>
              ProxyBase Residential Proxy Pool Handbook
            </h1>

            <p className={styles.heroSubtitle}>
              How we source consenting Seller Nodes, isolate every stream, and pay the people whose bandwidth your traffic runs through.
            </p>

            <div className={styles.heroActions}>
              <a
                href="/ProxyBase_Residential_Proxy_Pool_Handbook.pdf"
                download="ProxyBase_Residential_Proxy_Pool_Handbook.pdf"
                className={styles.btnDownloadPrimary}
                data-umami-event="Handbook: Hero Download PDF"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Handbook (PDF • 536 KB)
              </a>

              <a href="#summary" className={styles.btnOutline}>
                Read Executive Summary ↓
              </a>

              <Link href="/console" className={styles.btnOutline} data-umami-event="Handbook: Hero Console CTA">
                Launch Proxy Console →
              </Link>
            </div>

            <div className={styles.trustBar}>
              <div className={styles.trustItem}>
                <span className={styles.trustItemDot}>✓</span>
                <span>Tier A+ Opt-In Standard</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustItemDot}>✓</span>
                <span>Yamux Sandboxed (Zero Open Inbound Ports)</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustItemDot}>✓</span>
                <span>Unaltered Data Relay</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustItemDot}>✓</span>
                <span>Free Public Whitepaper</span>
              </div>
            </div>
          </div>
        </header>

        {/* EXECUTIVE SUMMARY & DOCUMENT METADATA */}
        <section id="summary" className={`${styles.section} ${styles.sectionBorder}`}>
          <div className={styles.container}>
            <div className={styles.summaryGrid}>
              <div className={styles.summaryContentCard}>
                <div>
                  <span className={styles.sectionLabel}>Executive Summary</span>
                  <h2 style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "16px" }}>
                    Why We Published Our Sourcing Standards
                  </h2>
                  <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "16px" }}>
                    Residential proxies route through real people&rsquo;s home connections, which makes them the easiest kind of proxy to run unethically. Every pool we manage has to meet the same four standards: the user opts in, the user can see what is happening, each session is isolated, and the user gets paid.
                  </p>
                  <p style={{ color: "var(--text-secondary)", lineHeight: "1.7" }}>
                    The handbook explains how nodes are sourced, verified, sandboxed, and operated across our peer-to-peer SOCKS5 and WebSocket network, and what we do to keep host performance and privacy intact. It is the same document we hand to partners who ask how the pool works.
                  </p>
                </div>

                <div className={styles.summaryQuote}>
                  &ldquo;Our residential pool is built entirely from nodes whose owners opted in and can verify it. Demand for residential bandwidth from agents and data pipelines keeps growing; the consent standard does not move because of it.&rdquo;
                  <div className={styles.quoteAuthor}>— ProxyBase Trust & Infrastructure Team</div>
                </div>
              </div>

              {/* METADATA SIDEBAR CARD */}
              <div className={styles.metaCard}>
                <div className={styles.metaHeader}>
                  <div className={styles.pdfIconBox}>PDF</div>
                  <div>
                    <h3 className={styles.metaTitle}>Residential Proxy Pool Handbook</h3>
                    <div className={styles.metaSubtitle}>Version 2026.1 • Official Release</div>
                  </div>
                </div>

                <ul className={styles.metaList}>
                  <li className={styles.metaRow}>
                    <span className={styles.metaLabel}>Document Type</span>
                    <span className={styles.metaValue}>Technical Whitepaper</span>
                  </li>
                  <li className={styles.metaRow}>
                    <span className={styles.metaLabel}>Length</span>
                    <span className={styles.metaValue}>11 Pages (Full Color)</span>
                  </li>
                  <li className={styles.metaRow}>
                    <span className={styles.metaLabel}>File Size</span>
                    <span className={styles.metaValue}>536 KB</span>
                  </li>
                  <li className={styles.metaRow}>
                    <span className={styles.metaLabel}>Format</span>
                    <span className={styles.metaValue}>Searchable Vector PDF</span>
                  </li>
                  <li className={styles.metaRow}>
                    <span className={styles.metaLabel}>Sourcing Model</span>
                    <span className={styles.metaValue} style={{ color: "#16a34a" }}>Tier A+ Consensual</span>
                  </li>
                  <li className={styles.metaRow}>
                    <span className={styles.metaLabel}>Publisher</span>
                    <span className={styles.metaValue}>ProxyBase Infrastructure</span>
                  </li>
                </ul>

                <div className={styles.metaActions}>
                  <a
                    href="/ProxyBase_Residential_Proxy_Pool_Handbook.pdf"
                    download="ProxyBase_Residential_Proxy_Pool_Handbook.pdf"
                    className={styles.btnDownloadPrimary}
                    style={{ width: "100%", justifyContent: "center", padding: "14px 20px", fontSize: "0.95rem" }}
                    data-umami-event="Handbook: Card Download PDF"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download Handbook (PDF)
                  </a>

                  <a
                    href="/ProxyBase_Residential_Proxy_Pool_Handbook.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnOutline}
                    style={{ width: "100%", justifyContent: "center", padding: "10px 18px", fontSize: "0.875rem" }}
                    data-umami-event="Handbook: Card Open Tab"
                  >
                    Open PDF in New Tab ↗
                  </a>

                  <CopyHandbookLinkButton pdfUrl="/ProxyBase_Residential_Proxy_Pool_Handbook.pdf" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THE 4 PILLARS */}
        <section className={`${styles.section} ${styles.sectionBorder}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Ethical Sourcing Framework</span>
              <h2 className={styles.sectionTitle}>The 4 User-Centric Pillars of ProxyBase</h2>
              <p className={styles.sectionDesc}>
                We grade every residential proxy sourcing method we know of, ours included, against four rules.
              </p>
            </div>

            <div className={styles.pillarsGrid}>
              <div className={styles.pillarCard}>
                <span className={styles.pillarNumber}>01</span>
                <h3 className={styles.pillarTitle}>Explicit User Consent</h3>
                <p className={styles.pillarDesc}>
                  Consent has to be affirmative and specific. A seller joins through the ProxyBase client or an audited partner app, and no relay traffic moves through a device before they do.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <span className={styles.pillarNumber}>02</span>
                <h3 className={styles.pillarTitle}>Clear Technical Disclosure</h3>
                <p className={styles.pillarDesc}>
                  Sellers get a plain-language explanation of what the software does: only idle outbound bandwidth is used, each session is isolated in its own Yamux stream, and they can pause or quit whenever they want.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <span className={styles.pillarNumber}>03</span>
                <h3 className={styles.pillarTitle}>Continuous User Awareness</h3>
                <p className={styles.pillarDesc}>
                  A seller should be able to see what is happening at any time, not just at signup. The node dashboard shows active relays and how much bandwidth has moved.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <span className={styles.pillarNumber}>04</span>
                <h3 className={styles.pillarTitle}>Direct Financial Reward</h3>
                <p className={styles.pillarDesc}>
                  Sellers get paid for what they share. An automated ledger credits their account for every megabyte routed through their node, payable in crypto or fiat.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* NODE CLASSIFICATION MATRIX TABLE */}
        <section className={`${styles.section} ${styles.sectionBorder}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Sourcing Standards</span>
              <h2 className={styles.sectionTitle}>Residential Proxy Acquisition Standards</h2>
              <p className={styles.sectionDesc}>
                How we grade sourcing across the industry, and why we do not buy from Tier B or Tier C pools.
              </p>
            </div>

            <div className={styles.matrixWrapper}>
              <table className={styles.matrixTable}>
                <thead>
                  <tr>
                    <th style={{ width: "15%" }}>Tier</th>
                    <th style={{ width: "25%" }}>Pillars Verified</th>
                    <th style={{ width: "35%" }}>Acquisition Method</th>
                    <th style={{ width: "25%" }}>ProxyBase Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={styles.highlightRow}>
                    <td>
                      <span className={`${styles.tierBadge} ${styles.tierAPlus}`}>Tier A+</span>
                    </td>
                    <td>
                      <ul className={styles.criteriaList}>
                        <li className={styles.criteriaYes}>✓ Direct Financial Reward</li>
                        <li className={styles.criteriaYes}>✓ Clear Technical Information</li>
                        <li className={styles.criteriaYes}>✓ Continuous User Awareness</li>
                        <li className={styles.criteriaYes}>✓ Explicit Opt-in Consent</li>
                      </ul>
                    </td>
                    <td>
                      Sellers install the ProxyBase client or a verified partner app to monetize idle bandwidth. They can see the relays, control participation, and get automatic payouts.
                    </td>
                    <td>
                      <strong style={{ color: "#15803d" }}>Core Sourcing (Majority)</strong>
                      <div style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginTop: "4px" }}>
                        Primary foundation of our residential pool.
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span className={`${styles.tierBadge} ${styles.tierA}`}>Tier A</span>
                    </td>
                    <td>
                      <ul className={styles.criteriaList}>
                        <li className={styles.criteriaNo}>✗ No Financial Reward</li>
                        <li className={styles.criteriaYes}>✓ Clear Technical Information</li>
                        <li className={styles.criteriaYes}>✓ Continuous User Awareness</li>
                        <li className={styles.criteriaYes}>✓ Explicit Opt-in Consent</li>
                      </ul>
                    </td>
                    <td>
                      A partner app asks the user for explicit permission to use the device as an exit node, usually in exchange for free premium features or funding open-source work.
                    </td>
                    <td>
                      <strong style={{ color: "#0369a1" }}>Audited Integrations Only</strong>
                      <div style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginTop: "4px" }}>
                        Vetted against direct ISP capacity.
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span className={`${styles.tierBadge} ${styles.tierB}`}>Tier B</span>
                    </td>
                    <td>
                      <ul className={styles.criteriaList}>
                        <li className={styles.criteriaNo}>✗ No Financial Reward</li>
                        <li className={styles.criteriaNo}>✗ Obscured Information</li>
                        <li className={styles.criteriaNo}>✗ No Ongoing Awareness</li>
                        <li className={styles.criteriaYes}>✓ Deceptive &ldquo;Consent&rdquo;</li>
                      </ul>
                    </td>
                    <td>
                      An app or browser extension buries the proxy exit function in a long, bundled Terms of Service, so users click agree without realizing their device is a proxy.
                    </td>
                    <td>
                      <strong style={{ color: "#b45309" }}>Strictly Prohibited</strong>
                      <div style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginTop: "4px" }}>
                        Banned across the ProxyBase network.
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span className={`${styles.tierBadge} ${styles.tierC}`}>Tier C</span>
                    </td>
                    <td>
                      <ul className={styles.criteriaList}>
                        <li className={styles.criteriaNo}>✗ No Financial Reward</li>
                        <li className={styles.criteriaNo}>✗ Zero Information</li>
                        <li className={styles.criteriaNo}>✗ Zero Awareness</li>
                        <li className={styles.criteriaNo}>✗ Zero Consent</li>
                      </ul>
                    </td>
                    <td>
                      Malware and botnets turn infected machines into exit relays. The owner never knows.
                    </td>
                    <td>
                      <strong style={{ color: "#b91c1c" }}>Banned & Filtered</strong>
                      <div style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginTop: "4px" }}>
                        Flagged and dropped by telemetry checks.
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* RELAY ARCHITECTURE */}
        <section className={`${styles.section} ${styles.sectionBorder}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Technical Deep Dive</span>
              <h2 className={styles.sectionTitle}>The ProxyBase Relay Procedure</h2>
              <p className={styles.sectionDesc}>
                How a request travels from an agent, through the relay core, and out of a consenting seller node.
              </p>
            </div>

            <div className={styles.architectureGrid}>
              <div className={styles.architectureStep}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepBadge}>Step 1 • Ingress</span>
                  <span className={styles.stepIcon}>🤖</span>
                </div>
                <h3 className={styles.stepTitle}>Buyer & AI Agent</h3>
                <p className={styles.stepDesc}>
                  Agents connect over SOCKS5, the REST API, or MCP (Model Context Protocol). Billing runs on micro-credits or crypto, with no KYC.
                </p>
              </div>

              <div className={styles.architectureStep}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepBadge}>Step 2 • Orchestration</span>
                  <span className={styles.stepIcon}>⚡</span>
                </div>
                <h3 className={styles.stepTitle}>ProxyBase Relay Core</h3>
                <p className={styles.stepDesc}>
                  The core verifies the session&rsquo;s challenge signature, runs anti-abuse filters, routes the stream over multiplexed WebSockets to an available residential node, and credits the seller&rsquo;s reward.
                </p>
              </div>

              <div className={styles.architectureStep}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepBadge}>Step 3 • Egress</span>
                  <span className={styles.stepIcon}>🏠</span>
                </div>
                <h3 className={styles.stepTitle}>Consenting Seller Node</h3>
                <p className={styles.stepDesc}>
                  The seller&rsquo;s device makes the outbound request over its own consumer ISP connection, so the destination server sees a residential IP.
                </p>
              </div>
            </div>

            <div className={styles.techCallout}>
              <div className={styles.techCalloutIcon}>🔒</div>
              <div className={styles.techCalloutContent}>
                <h4>Yamux Multiplexing & Outbound-Only Sandboxing</h4>
                <p>
                  Seller Nodes open outbound-only WebSocket tunnels to the relay core. Yamux multiplexing gives each session its own sandboxed byte channel, and the host never opens an inbound port on its router. Port scanners and LAN neighbors have nothing to reach.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MANAGEMENT POLICIES */}
        <section className={`${styles.section} ${styles.sectionBorder}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Operations & Safety</span>
              <h2 className={styles.sectionTitle}>Core Proxy Management Policies</h2>
              <p className={styles.sectionDesc}>
                What protects sellers and buyers on every transaction.
              </p>
            </div>

            <div className={styles.policiesGrid}>
              <div className={styles.policyCard}>
                <h3 className={styles.policyTitle}>
                  <span>🛡️</span> 1. Host Sandboxing & Zero LAN Access
                </h3>
                <p className={styles.policyDesc}>
                  Traffic runs inside sandboxed streams. The client cannot reach local storage, system files, browser session caches, or any other device on the host&rsquo;s home network.
                </p>
              </div>

              <div className={styles.policyCard}>
                <h3 className={styles.policyTitle}>
                  <span>⚡</span> 2. Idle-Only Bandwidth Throttling
                </h3>
                <p className={styles.policyDesc}>
                  Rate limiters keep the host&rsquo;s connection out of the way. Relaying backs off when the seller is gaming, streaming, or on a video call, and only uses idle headroom.
                </p>
              </div>

              <div className={styles.policyCard}>
                <h3 className={styles.policyTitle}>
                  <span>📦</span> 3. Pure Unaltered Data Relay
                </h3>
                <p className={styles.policyDesc}>
                  The destination server receives the request byte-for-byte. We do not inject headers or scripts, tamper with payloads, or replace ads.
                </p>
              </div>

              <div className={styles.policyCard}>
                <h3 className={styles.policyTitle}>
                  <span>⚖️</span> 4. Proactive Abuse & Endpoint Filtering
                </h3>
                <p className={styles.policyDesc}>
                  Automated protocol inspection runs continuously. SMTP spam ports, sensitive endpoints, and credential-abuse patterns get blocked before they reach a seller node.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TABLE OF CONTENTS (ALL 11 PAGES) */}
        <section className={`${styles.section} ${styles.sectionBorder}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Full Content Outline</span>
              <h2 className={styles.sectionTitle}>Handbook Table of Contents</h2>
              <p className={styles.sectionDesc}>
                What is in the 11 pages:
              </p>
            </div>

            <div className={styles.chapterList}>
              <div className={styles.chapterItem}>
                <span className={styles.chapterPageBadge}>Page 1–2</span>
                <div className={styles.chapterContent}>
                  <h4>Cover & Introduction to Residential Proxy Sourcing</h4>
                  <p>
                    Why we published our sourcing standards, and what we mean by consent-driven residential proxy infrastructure.
                  </p>
                </div>
              </div>

              <div className={styles.chapterItem}>
                <span className={styles.chapterPageBadge}>Page 3–4</span>
                <div className={styles.chapterContent}>
                  <h4>Importance of Ethical Residential IP Procurement</h4>
                  <p>
                    Why consumer ISP addresses need stricter handling than datacenter subnets, how seller devices participate, and what goes wrong in gray-market pools.
                  </p>
                </div>
              </div>

              <div className={styles.chapterItem}>
                <span className={styles.chapterPageBadge}>Page 5</span>
                <div className={styles.chapterContent}>
                  <h4>Standards for Residential Proxy Acquisition (Tier Matrix)</h4>
                  <p>
                    The four-tier grading system (Tier A+, Tier A, Tier B, Tier C) scored on consent, ongoing awareness, technical disclosure, and direct payment.
                  </p>
                </div>
              </div>

              <div className={styles.chapterItem}>
                <span className={styles.chapterPageBadge}>Page 6–7</span>
                <div className={styles.chapterContent}>
                  <h4>A Closer Look at the 4 User-Centric Pillars</h4>
                  <p>
                    What the consent prompt actually says, how Yamux stream sandboxing is disclosed, what the node dashboard shows, and how payouts are calculated.
                  </p>
                </div>
              </div>

              <div className={styles.chapterItem}>
                <span className={styles.chapterPageBadge}>Page 8</span>
                <div className={styles.chapterContent}>
                  <h4>ProxyBase Residential Proxy Acquisition & Relay Procedure</h4>
                  <p>
                    The full path a request takes: AI agent SOCKS5 request &rarr; ProxyBase Relay Core &rarr; Multiplexed WebSocket &rarr; Consenting Seller Node exit.
                  </p>
                </div>
              </div>

              <div className={styles.chapterItem}>
                <span className={styles.chapterPageBadge}>Page 9</span>
                <div className={styles.chapterContent}>
                  <h4>ProxyBase&rsquo;s Residential Proxy Management Policies</h4>
                  <p>
                    The four operational guarantees, with the reasoning behind each: host sandboxing, idle-only throttling, bit-for-bit unaltered relay, and endpoint filtering.
                  </p>
                </div>
              </div>

              <div className={styles.chapterItem}>
                <span className={styles.chapterPageBadge}>Page 10–11</span>
                <div className={styles.chapterContent}>
                  <h4>Conclusion, Enterprise Inquiries & Integration Resources</h4>
                  <p>
                    Where the network is headed, plus contacts for high-volume enterprise pipelines and verified SDK partnerships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DOWNLOAD CARD SECTION */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.downloadHeroCard}>
              <div className={styles.downloadCardContent}>
                <span className={styles.sectionLabel} style={{ color: "#60a5fa" }}>Direct Download</span>
                <h2 className={styles.downloadCardTitle}>
                  Get the Official Handbook
                </h2>
                <p className={styles.downloadCardDesc}>
                  The full 11-page PDF, including the architecture diagrams and the sourcing standards we hold ourselves to. Free, no email required.
                </p>

                <div className={styles.downloadCardActions}>
                  <a
                    href="/ProxyBase_Residential_Proxy_Pool_Handbook.pdf"
                    download="ProxyBase_Residential_Proxy_Pool_Handbook.pdf"
                    className={styles.btnDownloadLarge}
                    data-umami-event="Handbook: Big Bottom Download PDF"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download Handbook (PDF • 536 KB)
                  </a>

                  <a
                    href="/ProxyBase_Residential_Proxy_Pool_Handbook.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.btnReadOnline}
                    data-umami-event="Handbook: Big Bottom Read Online"
                  >
                    Read in Browser ↗
                  </a>
                </div>

                <div className={styles.fileSpecs}>
                  <span>📄 File: ProxyBase_Residential_Proxy_Pool_Handbook.pdf</span>
                  <span>•</span>
                  <span>📦 Size: 536 KB</span>
                  <span>•</span>
                  <span>⚡ License: Free Public Technical Whitepaper</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className={`${styles.section} ${styles.sectionBorder}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Frequently Asked Questions</span>
              <h2 className={styles.sectionTitle}>Questions About the Handbook</h2>
              <p className={styles.sectionDesc}>
                Questions we get about the handbook and how we source IPs.
              </p>
            </div>

            <div className={styles.faqList}>
              {handbookFaqs.map((faq, idx) => (
                <div key={idx} className={styles.faqItem}>
                  <h3 className={styles.faqQuestion}>{faq.q}</h3>
                  <p className={styles.faqAnswer}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <section className={styles.section} style={{ background: "var(--bg-secondary, #f8fafc)" }}>
          <div className={styles.container} style={{ textAlign: "center", maxWidth: "800px" }}>
            <span className={styles.sectionLabel}>Ready to Build?</span>
            <h2 style={{ fontSize: "2.4rem", fontWeight: 900, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: "16px" }}>
              Route Your Agents Through Consenting Residential IPs
            </h2>
            <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "36px" }}>
              Scrape, research, and run localized data jobs through residential IPs from sellers who opted in. Self-serve, no KYC, pay as you go with crypto or card.
            </p>

            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/console"
                className={styles.btnDownloadPrimary}
                style={{ textDecoration: "none" }}
                data-umami-event="Handbook: Footer Console CTA"
              >
                Open Proxy Console →
              </Link>
              <Link
                href="/ai-agents#pricing"
                className={styles.btnOutline}
                style={{ textDecoration: "none" }}
                data-umami-event="Handbook: Footer Pricing CTA"
              >
                View Transparent Pricing
              </Link>
              <Link
                href="/what-is-datacenter-proxy"
                className={styles.btnOutline}
                style={{ textDecoration: "none" }}
                data-umami-event="Handbook: Footer Datacenter Comparison"
              >
                Datacenter vs Residential Guide
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
