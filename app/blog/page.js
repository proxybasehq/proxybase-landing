"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import Head from "next/head";

export default function BlogIndex() {
    const posts = [
        {
            title: "Why We Built an IP Whois Aggregator for AI Agents",
            excerpt: "If your agent hits a block, it needs to know why. The IP Whois Aggregator gives agents real-time context on the networks they exit from.",
            date: "March 2026",
            readTime: "3 min read",
            author: "Ross",
            slug: "/blog/ip-whois-aggregator"
        },
        {
            title: "What is ProxyBase MPP and Why Does it Matter?",
            excerpt: "Machine-to-Machine Payment Protocols (MPP) change the web by letting software agents request access, pay automatically, and keep working without human help.",
            date: "March 2026",
            readTime: "4 min read",
            author: "ProxyBase Team",
            slug: "/blog/what-is-proxybase-mpp"
        },
        {
            title: "Why Your AI Agent Needs a Proxy",
            excerpt: "An agent without a proxy isn't autonomous at all. Learn why cloud IPs fail, why stealth plugins aren't the answer, and what makes a proxy truly agent-ready.",
            date: "March 2026",
            readTime: "5 min read",
            author: "Ross",
            slug: "/blog/why-your-ai-agent-needs-a-proxy"
        },
        {
            title: "The Current State of OpenClaw and Bot Protections",
            excerpt: "A deep dive into why OpenClaw's web_fetch fails on protected sites, the progression of anti-bot IP blocking, and how to actually scrape with AI agents.",
            date: "March 2026",
            readTime: "6 min read",
            author: "Ross",
            slug: "/blog/openclaw-bot-protections"
        }
    ];

    return (
        <>
            <Head>
                <title>Blog | ProxyBase</title>
                <meta name="description" content="Technical deep dives, tutorials, and insights on building autonomous AI agents and scraping the web without getting blocked." />
            </Head>
            <Navbar />

            <section className="section" style={{ minHeight: "80vh", paddingTop: "120px", paddingBottom: "80px" }}>
                <div className="section-inner" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>

                    <div className="section-header" style={{ textAlign: "left", alignItems: "flex-start", marginBottom: "4rem" }}>
                        <span className="section-label">Resources & Insights</span>
                        <h1 className="section-title" style={{ fontSize: "2.8rem", marginBottom: "1rem" }}>
                            The ProxyBase Blog
                        </h1>
                        <p className="section-desc" style={{ maxWidth: "100%", margin: 0, textAlign: "left", fontSize: "1.1rem" }}>
                            Technical deep dives and guides on networking for autonomous agents.
                        </p>
                    </div>

                    <div className="blog-list" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                        {posts.map((post, idx) => (
                            <Link href={post.slug} key={idx} style={{ textDecoration: "none" }}>
                                <div
                                    className="blog-card"
                                    style={{
                                        padding: "2rem",
                                        background: "rgba(255, 255, 255, 0.02)",
                                        border: "1px solid rgba(255, 255, 255, 0.05)",
                                        borderRadius: "12px",
                                        transition: "all 0.2s ease",
                                        cursor: "pointer"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "rgba(6, 214, 160, 0.03)";
                                        e.currentTarget.style.borderColor = "rgba(6, 214, 160, 0.2)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.02)";
                                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                                    }}
                                >
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "1rem" }}>
                                        <span>{post.date}</span>
                                        <span style={{ width: "4px", height: "4px", background: "var(--text-secondary)", borderRadius: "50%" }}></span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h2 style={{ color: "var(--text-primary)", fontSize: "1.5rem", marginBottom: "1rem" }}>
                                        {post.title}
                                    </h2>
                                    <p style={{ color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>
                                        {post.excerpt}
                                    </p>
                                    <div style={{ marginTop: "1.5rem", color: "var(--accent-primary)", fontWeight: "500", fontSize: "0.95rem" }}>
                                        Read Full Post →
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </section>

            <Footer />
        </>
    );
}
