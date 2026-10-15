import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import styles from "./handbook.module.css";
import { CopyHandbookLinkButton } from "./HandbookActions";

export const metadata = {
  title: "Residential Proxy Pool Handbook: Architecture & Ethical Sourcing Standards | ProxyBase",
  description:
    "Download the official ProxyBase Residential Proxy Pool Handbook (PDF). Complete technical whitepaper on Tier A+ peer node sourcing, Yamux sandboxing, outbound-only WebSocket relay architecture, and ethical bandwidth monetization.",
  keywords:
    "residential proxy handbook, residential proxy pool handbook, ethical proxy sourcing, proxy whitepaper, residential proxy architecture, socks5 proxy pool, peer-to-peer proxy network, proxy compliance standards, yamux proxy routing, proxybase handbook, download proxy handbook",
  alternates: {
    canonical: "/residential-proxy-handbook",
  },
  openGraph: {
    title: "ProxyBase Residential Proxy Pool Handbook: Standards & Architecture Whitepaper",
    description:
      "A complete guide to ethical residential proxy acquisition, sandboxed routing, and peer compensation. Download the official 11-page technical whitepaper.",
    url: "https://proxybase.xyz/residential-proxy-handbook",
    type: "article",
    siteName: "ProxyBase",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProxyBase Residential Proxy Pool Handbook (PDF)",
    description:
      "A complete guide to ethical residential proxy acquisition, sandboxed routing, and peer compensation. Download the 11-page technical whitepaper.",
  },
};

const handbookFaqs = [
  {
    q: "What is the ProxyBase Residential Proxy Pool Handbook?",
    a: "The ProxyBase Residential Proxy Pool Handbook is an 11-page engineering whitepaper and compliance standard published by the ProxyBase Trust & Infrastructure Team. It documents how ProxyBase sources, verifies, isolates, and operates its peer-to-peer residential proxy network, providing complete transparency into our Tier A+ opt-in criteria, Yamux multiplexing architecture, and fair peer compensation model.",
  },
  {
    q: "How does ProxyBase ensure residential proxies are ethically sourced?",
    a: "Every residential IP in the ProxyBase network originates exclusively from fully informed, consenting individuals (Seller Nodes) who voluntarily share idle internet bandwidth via lightweight sandboxed clients in exchange for automated monetary compensation. ProxyBase strictly rejects hidden SDKs, bundled Terms of Service, and uncompensated proxy models.",
  },
  {
    q: "What is the difference between Tier A+ and Tier B/C proxy pools?",
    a: "Tier A+ (ProxyBase's standard) guarantees all four user-centric pillars: explicit consent, continuous user awareness, clear technical disclosures, and direct financial rewards. Tier B captures consent deceptively through bundled terms or obscured extensions without ongoing awareness. Tier C consists of unauthorized botnets and malware. ProxyBase operates exclusively on Tier A+ Seller Nodes and audited direct ISP partnerships, strictly banning Tier B and Tier C acquisition.",
  },
  {
    q: "Does running a ProxyBase seller node expose the host's local home network?",
    a: "No. ProxyBase Seller Nodes utilize outbound-only WebSocket tunnels combined with Yamux stream multiplexing. Because connections are strictly outbound to the ProxyBase Relay Core, host devices never open inbound listening ports on their home routers. Requests are sandboxed with zero access to local filesystem resources, browser storage, or internal LAN devices.",
  },
  {
    q: "Why are residential proxies critical for autonomous AI agents?",
    a: "Autonomous AI agents perform complex, multi-step web navigation, market intelligence, and automated research. Cloud datacenter IPs (AWS, GCP, DigitalOcean) are easily flagged by Web Application Firewalls (Cloudflare, Akamai, Datadome). Consensual residential proxies provide genuine consumer ISP reputation, achieving pass-through rates exceeding 99% without triggering CAPTCHAs or IP blocks.",
  },
  {
    q: "Where can I download the official Residential Proxy Pool Handbook PDF?",
    a: "You can download the full, unredacted 11-page handbook directly from this page using the download button, or access the direct PDF at https://proxybase.xyz/ProxyBase_Residential_Proxy_Pool_Handbook.pdf. It is completely free and requires no registration or personal information.",
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
        "description": "Comprehensive engineering whitepaper and compliance standard detailing Tier A+ residential proxy acquisition, Yamux sandboxed routing, and peer bandwidth monetization.",
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
        "description": "The official 11-page PDF whitepaper covering ethical proxy sourcing, Yamux multiplexed routing, and peer compensation.",
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
              <span>Official Transparency & Architecture Whitepaper • 2026 Edition</span>
            </div>

            <h1 className={styles.heroTitle}>
              ProxyBase Residential Proxy Pool Handbook
            </h1>

            <p className={styles.heroSubtitle}>
              A comprehensive technical whitepaper on ethical node procurement, cryptographic stream sandboxing, and fair peer-to-peer bandwidth compensation for autonomous AI agents and high-throughput data systems.
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
                <span>Unaltered Pure Data Relay</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustItemDot}>✓</span>
                <span>100% Free Public Whitepaper</span>
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
                    Setting the Gold Standard for Residential Proxy Transparency
                  </h2>
                  <p style={{ color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "16px" }}>
                    Out of all proxy types, residential proxies stand out as the most sensitive to mistreatment and ethical violations. Because traffic routes through real consumer networks, ProxyBase procures and manages all IP pools under strict standards of user sovereignty, cryptographic isolation, transparency, and compliance.
                  </p>
                  <p style={{ color: "var(--text-secondary)", lineHeight: "1.7" }}>
                    This whitepaper is part of ProxyBase&rsquo;s company-wide transparency initiative. It provides complete visibility into our peer-to-peer SOCKS5 and WebSocket residential proxy network—explaining how nodes are sourced, verified, sandboxed, and operated without sacrificing privacy or host performance.
                  </p>
                </div>

                <div className={styles.summaryQuote}>
                  &ldquo;ProxyBase operates strictly within the boundaries of an explicitly consenting, verifiable residential proxy pool. As autonomous AI agents and high-throughput data pipelines drive unprecedented demand for residential bandwidth, strict standards of ethics, cryptographic sandboxing, and transparency remain at the core of our engineering and business operations.&rdquo;
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
                True transparency requires more than vague legal jargon. ProxyBase grades all residential proxy sourcing practices against four non-negotiable principles.
              </p>
            </div>

            <div className={styles.pillarsGrid}>
              <div className={styles.pillarCard}>
                <span className={styles.pillarNumber}>01</span>
                <h3 className={styles.pillarTitle}>Explicit User Consent</h3>
                <p className={styles.pillarDesc}>
                  Opt-in consent must be affirmative, dedicated, and unambiguous. Users explicitly choose to join the network via the ProxyBase client or audited partner apps. Activating relay traffic before consent is granted is strictly prohibited under our engineering guidelines.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <span className={styles.pillarNumber}>02</span>
                <h3 className={styles.pillarTitle}>Clear Technical Disclosure</h3>
                <p className={styles.pillarDesc}>
                  Participants receive plain-language explanations of how their devices operate: only idle outbound bandwidth is utilized, local network boundaries remain cryptographically isolated via Yamux stream sandboxing, and participation can be paused or revoked at any time.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <span className={styles.pillarNumber}>03</span>
                <h3 className={styles.pillarTitle}>Continuous User Awareness</h3>
                <p className={styles.pillarDesc}>
                  Consenting is not a one-time trick. An ethical proxy platform continuously keeps users aware of active relays through live Seller Node telemetry dashboards, transparent documentation, and real-time bandwidth consumption metrics.
                </p>
              </div>

              <div className={styles.pillarCard}>
                <span className={styles.pillarNumber}>04</span>
                <h3 className={styles.pillarTitle}>Direct Financial Reward</h3>
                <p className={styles.pillarDesc}>
                  Bandwidth contributors are legitimate economic partners. ProxyBase maintains an automated monetary reward ledger that compensates end-users directly (in crypto or fiat) for every megabyte of idle capacity routed through their node.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* NODE CLASSIFICATION MATRIX TABLE */}
        <section className={`${styles.section} ${styles.sectionBorder}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>Industry Audit Matrix</span>
              <h2 className={styles.sectionTitle}>Residential Proxy Acquisition Standards</h2>
              <p className={styles.sectionDesc}>
                How ProxyBase grades residential proxy acquisition across the industry—and why we reject deceptive Tier B and Tier C sourcing models entirely.
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
                      End-users install dedicated ProxyBase background clients or verified apps specifically to monetize idle bandwidth. Full awareness, active control, and automated payouts.
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
                      A partner application explicitly requests permission to utilize the device as an exit node (e.g. in exchange for free premium features or open-source support).
                    </td>
                    <td>
                      <strong style={{ color: "#0369a1" }}>Audited Integrations Only</strong>
                      <div style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginTop: "4px" }}>
                        Strictly vetted with direct ISP capacity.
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
                      An app or browser extension hides proxy exit functions inside dense, bundled Terms of Service. Users click &ldquo;agree&rdquo; without understanding their device is a proxy.
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
                      Malware, botnets, or silently bundled trojans silently convert infected consumer devices into exit relays without permission or knowledge.
                    </td>
                    <td>
                      <strong style={{ color: "#b91c1c" }}>Banned & Filtered</strong>
                      <div style={{ fontSize: "0.825rem", color: "var(--text-muted)", marginTop: "4px" }}>
                        Active telemetry anomaly defense.
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
                How requests travel from an autonomous AI agent through our relay core to a consenting seller node with zero router exposure.
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
                  Autonomous agents connect via SOCKS5, HTTP REST endpoints, or MCP (Model Context Protocol). Billing is handled programmatically via micro-credits or crypto with zero KYC friction.
                </p>
              </div>

              <div className={styles.architectureStep}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepBadge}>Step 2 • Orchestration</span>
                  <span className={styles.stepIcon}>⚡</span>
                </div>
                <h3 className={styles.stepTitle}>ProxyBase Relay Core</h3>
                <p className={styles.stepDesc}>
                  Validates cryptographic session challenge-signatures, applies anti-abuse protocol filters, and routes streams over multiplexed WebSockets to available residential nodes while crediting rewards.
                </p>
              </div>

              <div className={styles.architectureStep}>
                <div className={styles.stepHeader}>
                  <span className={styles.stepBadge}>Step 3 • Egress</span>
                  <span className={styles.stepIcon}>🏠</span>
                </div>
                <h3 className={styles.stepTitle}>Consenting Seller Node</h3>
                <p className={styles.stepDesc}>
                  The opted-in physical user device executes the outbound request through a genuine consumer ISP connection. The destination web server sees an authentic, unflagged residential IP address.
                </p>
              </div>
            </div>

            <div className={styles.techCallout}>
              <div className={styles.techCalloutIcon}>🔒</div>
              <div className={styles.techCalloutContent}>
                <h4>Yamux Multiplexing & Outbound-Only Sandboxing</h4>
                <p>
                  Seller Nodes establish outbound-only secure WebSocket tunnels to the ProxyBase Relay Core. By utilizing Yamux multiplexed streaming, individual sessions operate inside sandboxed byte channels. Seller hosts never open inbound listening ports on their home routers, ensuring zero exposure to LAN neighbors, port scanners, or external attack vectors.
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
                Engineered safeguards that protect bandwidth providers and buyers on every transaction.
              </p>
            </div>

            <div className={styles.policiesGrid}>
              <div className={styles.policyCard}>
                <h3 className={styles.policyTitle}>
                  <span>🛡️</span> 1. Host Sandboxing & Zero LAN Access
                </h3>
                <p className={styles.policyDesc}>
                  Traffic is strictly isolated within sandboxed execution streams. The ProxyBase client has zero access to local device storage, operating system files, browser session caches, or other local devices on the host&rsquo;s home Wi-Fi network.
                </p>
              </div>

              <div className={styles.policyCard}>
                <h3 className={styles.policyTitle}>
                  <span>⚡</span> 2. Idle-Only Bandwidth Throttling
                </h3>
                <p className={styles.policyDesc}>
                  Intelligent rate-limiters ensure host devices are never degraded. Bandwidth relaying automatically dials back during active host gaming, streaming, or video calls, utilizing exclusively idle network headroom.
                </p>
              </div>

              <div className={styles.policyCard}>
                <h3 className={styles.policyTitle}>
                  <span>📦</span> 3. Pure Unaltered Data Relay
                </h3>
                <p className={styles.policyDesc}>
                  When customers or AI agents transmit a request, the destination server receives it byte-for-byte. ProxyBase strictly forbids header injection, payload tampering, man-in-the-middle script injection, or ad replacement.
                </p>
              </div>

              <div className={styles.policyCard}>
                <h3 className={styles.policyTitle}>
                  <span>⚖️</span> 4. Proactive Abuse & Endpoint Filtering
                </h3>
                <p className={styles.policyDesc}>
                  Continuous automated protocol inspection prevents malicious behavior. Sensitive endpoints, SMTP spam ports, and credential abuse patterns are blocked before reaching residential seller nodes.
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
                Here is what is covered across all 11 pages of the official handbook:
              </p>
            </div>

            <div className={styles.chapterList}>
              <div className={styles.chapterItem}>
                <span className={styles.chapterPageBadge}>Page 1–2</span>
                <div className={styles.chapterContent}>
                  <h4>Cover & Introduction to Residential Proxy Sourcing</h4>
                  <p>
                    Overview of the ProxyBase company-wide transparency initiative and our commitment to verifiable, consent-driven residential proxy infrastructure for AI agents.
                  </p>
                </div>
              </div>

              <div className={styles.chapterItem}>
                <span className={styles.chapterPageBadge}>Page 3–4</span>
                <div className={styles.chapterContent}>
                  <h4>Importance of Ethical Residential IP Procurement</h4>
                  <p>
                    Why consumer ISP IP addresses require higher ethical standards than datacenter subnets, how physical user devices participate voluntarily, and the risks of gray-market pools.
                  </p>
                </div>
              </div>

              <div className={styles.chapterItem}>
                <span className={styles.chapterPageBadge}>Page 5</span>
                <div className={styles.chapterContent}>
                  <h4>Standards for Residential Proxy Acquisition (Tier Matrix)</h4>
                  <p>
                    The 4-tier grading system (Tier A+, Tier A, Tier B, Tier C) evaluating user consent, ongoing awareness, technical disclosures, and direct financial compensation.
                  </p>
                </div>
              </div>

              <div className={styles.chapterItem}>
                <span className={styles.chapterPageBadge}>Page 6–7</span>
                <div className={styles.chapterContent}>
                  <h4>A Closer Look at the 4 User-Centric Pillars</h4>
                  <p>
                    In-depth breakdown of informed consent prompts, Yamux stream sandboxing disclosures, live telemetry visibility for nodes, and the automated monetary payout ledger.
                  </p>
                </div>
              </div>

              <div className={styles.chapterItem}>
                <span className={styles.chapterPageBadge}>Page 8</span>
                <div className={styles.chapterContent}>
                  <h4>ProxyBase Residential Proxy Acquisition & Relay Procedure</h4>
                  <p>
                    End-to-end routing walkthrough: AI Agent SOCKS5 request &rarr; ProxyBase Relay Core &rarr; Multiplexed WebSocket &rarr; Consenting Seller Node exit.
                  </p>
                </div>
              </div>

              <div className={styles.chapterItem}>
                <span className={styles.chapterPageBadge}>Page 9</span>
                <div className={styles.chapterContent}>
                  <h4>ProxyBase&rsquo;s Residential Proxy Management Policies</h4>
                  <p>
                    Four foundational operational guarantees: host privacy & sandboxing, idle-only throttling, bit-for-bit unaltered data relay, and endpoint compliance.
                  </p>
                </div>
              </div>

              <div className={styles.chapterItem}>
                <span className={styles.chapterPageBadge}>Page 10–11</span>
                <div className={styles.chapterContent}>
                  <h4>Conclusion, Enterprise Inquiries & Integration Resources</h4>
                  <p>
                    The vision for sustainable, trust-based agentic proxy infrastructure. Contact information for high-volume enterprise pipelines and verified SDK partnerships.
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
                  Get the Official Handbook Today
                </h2>
                <p className={styles.downloadCardDesc}>
                  Download the unredacted 11-page PDF handbook to review our sourcing models, compliance standards, and architecture diagrams. 100% free with no email required.
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
              <h2 className={styles.sectionTitle}>Everything You Need to Know</h2>
              <p className={styles.sectionDesc}>
                Common questions about the ProxyBase Residential Proxy Pool Handbook and our sourcing ethics.
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
              Experience Ethical Residential Proxies
            </h2>
            <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "36px" }}>
              Launch autonomous AI web scraping, market intelligence, and localized data workflows through authentic, consensual residential IPs. Self-serve, no KYC, pay-as-you-go with crypto or cards.
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
