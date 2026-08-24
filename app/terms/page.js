import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export const metadata = {
    title: "Terms of Service | ProxyBase",
    description:
        "ProxyBase Terms of Service. Read the rules, acceptable use policy, crypto payment terms, uptime expectations, and data privacy practices for our AI proxy infrastructure.",
    alternates: {
        canonical: "/terms",
    },
    openGraph: {
        title: "Terms of Service | ProxyBase",
        description:
            "ProxyBase Terms of Service acceptable use, crypto payments, uptime, and data privacy for our AI proxy infrastructure.",
        url: "https://proxybase.xyz/terms",
    },
};

export default function TermsOfService() {
    const webPageJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Terms of Service | ProxyBase",
        "description": "ProxyBase Terms of Service: Acceptable Use Policy, Crypto Payment Terms, and Service Availability.",
        "url": "https://proxybase.xyz/terms"
    };

    const breadcrumbsJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://proxybase.xyz"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Terms of Service",
                "item": "https://proxybase.xyz/terms"
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
            />
            <Navbar />
            <section className="section" style={{ minHeight: "80vh", paddingTop: "120px", paddingBottom: "80px" }}>
                <div className="section-inner" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>
                    <div className="blog-breadcrumbs" style={{ marginBottom: "1.5rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                        <Link href="/" style={{ color: "var(--accent-primary)", textDecoration: "none" }}>Home</Link>
                        <span style={{ margin: "0 8px" }}>/</span>
                        <span>Terms of Service</span>
                    </div>

                    <div className="section-header" style={{ textAlign: "left", alignItems: "flex-start" }}>
                        <span className="section-label">Legal Agreement</span>
                        <h1 className="section-title" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Terms of Service</h1>
                        <p className="section-desc" style={{ maxWidth: "100%", margin: 0, textAlign: "left" }}>
                            Last updated: March 2026
                        </p>
                    </div>

                    <div className="terms-content" style={{ color: "var(--text-secondary)", lineHeight: "1.7", textAlign: "left" }}>
                        <h3 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem" }}>1. What is ProxyBase?</h3>
                        <p style={{ marginBottom: "1rem" }}>
                            ProxyBase (operated by DEEPWALKER LLC) provides programmatic, residential, and mobile SOCKS5 proxy infrastructure designed for autonomous AI agents, scrapers, and developer tools without dashboard friction.
                        </p>
                        <p style={{ marginBottom: "1rem" }}>
                            By using our API, our MCP servers, or our OpenClaw skills, you agree to these terms with DEEPWALKER LLC.
                        </p>

                        <h3 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem" }}>2. Acceptable Use Policy</h3>
                        <p style={{ marginBottom: "1rem" }}>
                            We provide access to a large network of residential and mobile IP addresses.
                        </p>
                        <p style={{ marginBottom: "1rem" }}>
                            <strong>You may NOT use our infrastructure for:</strong>
                        </p>
                        <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
                            <li style={{ marginBottom: "0.5rem" }}>DDoS attacks, botnets, or network stress testing.</li>
                            <li style={{ marginBottom: "0.5rem" }}>Credential stuffing, carding, or brute-forcing accounts.</li>
                            <li style={{ marginBottom: "0.5rem" }}>Spamming email systems or automated mass commenting.</li>
                            <li style={{ marginBottom: "0.5rem" }}>Distributing malware, phishing, or illegal materials.</li>
                        </ul>
                        <p style={{ marginBottom: "1rem" }}>
                            If we detect malicious abuse, we reserve the right to revoke API key access and terminate active sessions immediately.
                        </p>

                        <h3 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem" }}>3. Crypto Payments & Refunds</h3>
                        <p style={{ marginBottom: "1rem" }}>
                            ProxyBase is a crypto-first platform with headless, machine-to-machine billing. Because blockchains are immutable, <strong>all crypto payments are final</strong>.
                        </p>
                        <p style={{ marginBottom: "1rem" }}>
                            If an agent underpays an invoice, the system waits until the remaining amount is transferred. In the rare event of a network failure where an order is paid but proxy bandwidth fails to provision, contact us at <a href="mailto:humanshere@proxybase.xyz" style={{ color: "var(--accent-primary)", textDecoration: "none" }}>humanshere@proxybase.xyz</a> and our engineering team will patch your account or provide a replacement API key. Read our full <Link href="/refund" style={{ color: "var(--accent-primary)" }}>Refund Policy</Link>.
                        </p>

                        <h3 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem" }}>4. Service Availability & &ldquo;As-Is&rdquo; Provisioning</h3>
                        <p style={{ marginBottom: "1rem" }}>
                            ProxyBase utilizes a hybrid network of proprietary mobile nodes and decentralized bandwidth contributors. While backend routing is optimized for speed and resilience, residential connection stability depends on real-world ISP nodes.
                        </p>
                        <p style={{ marginBottom: "1rem" }}>
                            We provide the service strictly on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis. If an IP becomes unresponsive, execute a request to the <code style={{ background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: "4px" }}>/rotate</code> endpoint — that is what automated rotation is built for.
                        </p>

                        <h3 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem" }}>5. Data & Privacy</h3>
                        <p style={{ marginBottom: "1rem" }}>
                            We log only byte counters for billing and telemetry necessary to prevent network abuse. We do not maintain personal identification records. Keep your <code style={{ background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: "4px" }}>PROXYBASE_API_KEY</code> secure, as anyone with access to your key can utilize your prepaid balance. See our <Link href="/privacy" style={{ color: "var(--accent-primary)" }}>Privacy Policy</Link>.
                        </p>

                        <h3 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem" }}>6. Modifications</h3>
                        <p style={{ marginBottom: "1rem" }}>
                            We may update these terms periodically. Continued use of the API and proxy network represents acceptance of any revised terms.
                        </p>

                        <div style={{ marginTop: "3rem", padding: "1.5rem", background: "var(--bg-secondary)", borderRadius: "8px", border: "1px solid var(--border-subtle)" }}>
                            <h4 style={{ margin: "0 0 0.5rem 0", color: "var(--text-primary)" }}>Related Legal Resources</h4>
                            <p style={{ margin: 0, fontSize: "0.95rem" }}>
                                View our <Link href="/privacy" style={{ color: "var(--accent-primary)" }}>Privacy Policy</Link> and <Link href="/refund" style={{ color: "var(--accent-primary)" }}>Refund Policy</Link>, or read our <Link href="/buy-with-crypto" style={{ color: "var(--accent-primary)" }}>Guide to Buying Proxies with Crypto</Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
