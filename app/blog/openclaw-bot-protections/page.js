"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import Head from "next/head";

export default function OpenClawBotProtections() {
    return (
        <>
            <Head>
                <title>The Current State of OpenClaw and Bot Protections | ProxyBase</title>
                <meta name="description" content="A deep dive into why OpenClaw's web_fetch fails on protected sites, the progression of anti-bot IP blocking, and how to actually scrape with AI agents." />
            </Head>
            <Navbar />

            <article className="section" style={{ minHeight: "80vh", paddingTop: "120px", paddingBottom: "80px" }}>
                <div className="section-inner" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>

                    <div className="blog-breadcrumbs" style={{ marginBottom: "2rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                        <Link href="/" style={{ color: "var(--accent-primary)", textDecoration: "none" }}>Home</Link>
                        <span style={{ margin: "0 8px" }}>/</span>
                        <Link href="/blog" style={{ color: "var(--accent-primary)", textDecoration: "none" }}>Blog</Link>
                        <span style={{ margin: "0 8px" }}>/</span>
                        <span>OpenClaw & Bot Protections</span>
                    </div>

                    <div className="section-header" style={{ textAlign: "left", alignItems: "flex-start", marginBottom: "3rem" }}>
                        <span className="section-label">Engineering Deep Dive</span>
                        <h1 className="section-title" style={{ fontSize: "2.8rem", marginBottom: "1rem", lineHeight: "1.2" }}>
                            The Current State of OpenClaw and Bot Protections
                        </h1>
                        <div className="author-meta" style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--accent-primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: "bold" }}>
                                R
                            </div>
                            <div>
                                <div style={{ fontWeight: "600", color: "var(--text-primary)" }}>Ross</div>
                                <div>March 2026 • 6 min read</div>
                            </div>
                        </div>
                    </div>

                    <div className="blog-content" style={{ color: "var(--text-secondary)", lineHeight: "1.8", fontSize: "1.1rem" }}>

                        <p style={{ marginBottom: "1.5rem" }}>
                            I’ve been trying to use OpenClaw for scraping protected sites lately, and let me tell you, the out-of-the-box <code className="inline-code">web_fetch</code> is basically useless for anything remotely secure. There is no native proxy support, no fingerprint management, and if you touch anything sitting behind Cloudflare, you’re getting blocked in minutes.
                        </p>

                        <p style={{ marginBottom: "2.5rem" }}>
                            I spent a grueling couple of weeks figuring out what actually works, so here’s where I ultimately landed. Consider this the first in a deep dive series on getting AI agents to actually browse the web like humans.
                        </p>

                        <h3 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>Why Out-of-the-box OpenClaw Fails</h3>
                        <p style={{ marginBottom: "1rem" }}>The problem is three-fold:</p>
                        <ul style={{ listStyleType: "decimal", paddingLeft: "1.5rem", marginBottom: "2.5rem" }}>
                            <li style={{ marginBottom: "0.8rem" }}>
                                <strong style={{ color: "var(--text-primary)" }}>IP Reputation:</strong> <code className="inline-code">web_fetch</code> just fires off from wherever your OpenClaw gateway is running. If you're running it on a VPS, the target site immediately flags the datacenter IP.
                            </li>
                            <li style={{ marginBottom: "0.8rem" }}>
                                <strong style={{ color: "var(--text-primary)" }}>Fingerprinting:</strong> The HTTP client’s TLS fingerprint looks exactly like what it is—an automation tool. WAFs like Akamai and DataDome use JA3/JA4 fingerprinting and instantly spot the discrepancy between what your agent claims to be (a normal browser) and how it’s actually shaking hands with the server.
                            </li>
                            <li style={{ marginBottom: "0.8rem" }}>
                                <strong style={{ color: "var(--text-primary)" }}>No JS Rendering:</strong> A lot of modern sites are just SPAs that need JavaScript to render. <code className="inline-code">web_fetch</code> just grabs the HTML shell.
                            </li>
                        </ul>

                        <h3 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>The IP Progression (And Why Most Suck)</h3>
                        <p style={{ marginBottom: "1.5rem" }}>For proxies, I went through the classic stages of grief:</p>

                        <p style={{ marginBottom: "1.5rem" }}>
                            <strong style={{ color: "var(--text-primary)" }}>Datacenter IPs (AWS, GCP, Hetzner, etc.):</strong> Dead on arrival. Every anti-bot system has these subnets pre-flagged. You might get away with it for a few requests on a poorly secured site, but anything serious will hand you a 403 immediately.
                        </p>

                        <p style={{ marginBottom: "1.5rem" }}>
                            <strong style={{ color: "var(--text-primary)" }}>Residential Rotating Proxies:</strong> These worked on moderately protected stuff, but they still got caught by DataDome or PerimeterX. The issue here is behavior—even with a "clean" home IP, the automated request patterns give it away.
                        </p>

                        <p style={{ marginBottom: "1.5rem" }}>
                            <strong style={{ color: "var(--text-primary)" }}>Mobile Carrier Proxies:</strong> This is what finally worked consistently. Mobile IPs sit behind Carrier-Grade NAT (CGNAT), meaning thousands of real humans on their iPhones share the exact same IP pool. Anti-bot systems simply <i>can't</i> ban these IP addresses without inadvertently blocking massive chunks of legitimate mobile traffic. Plus, the TCP fingerprint from carrier infrastructure matches what mobile browsers actually look like, which helps immensely with the JA4 checks.
                        </p>

                        <p style={{ marginBottom: "1.5rem" }}>
                            When you look at vendors, you hit a different wall. Companies like Bright Data have massive mobile pools, but their per-GB pricing is criminal when your agent needs to run all day and download large DOMs. Others like Oxylabs or SOAX are faster but hit you with the same pricing model. I briefly used some dedicated 5G modem providers (like Illusory)—which give you unlimited bandwidth per port—but the pools are tiny, usually US-only, and setting them up is a headache.
                        </p>

                        <div style={{ background: "rgba(6, 214, 160, 0.05)", borderLeft: "4px solid var(--accent-primary)", padding: "1.5rem", borderRadius: "0 8px 8px 0", margin: "2rem 0", fontStyle: "italic" }}>
                            <p style={{ margin: 0 }}>
                                Side note: I eventually moved my agent infrastructure over to <Link href="/" style={{ color: "var(--accent-primary)", textDecoration: "none", fontWeight: "bold" }}>ProxyBase</Link> for this exact reason. Since they route via an API specifically built for AI swarms, my agents can just hit an endpoint, grab a high-trust mobile proxy, and pay for the exact bandwidth they need using crypto. It skips the massive corporate dashboards entirely.
                            </p>
                        </div>

                        <h3 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>Fixing the OpenClaw Setup</h3>
                        <p style={{ marginBottom: "1.5rem" }}>
                            For the actual OpenClaw configuration, you absolutely have to drop raw HTTP and use a stealth browser.
                        </p>
                        <p style={{ marginBottom: "1.5rem" }}>
                            Tools like <strong>Camoufox</strong> or <strong>Nodriver</strong> pass the JA4 checks where stock Playwright or Puppeteer get flagged instantly.
                        </p>
                        <p style={{ marginBottom: "1.5rem" }}>
                            The biggest headache right now is that there is <strong>no native proxy config in OpenClaw’s browser tool</strong>. Setting standard <code className="inline-code">HTTP_PROXY</code> env vars doesn't work either because <code className="inline-code">undici</code> (the underlying HTTP client) just ignores them. Issue #2102 on their repo has been open forever about this and was actually closed as "not planned." There is an open PR (#20578) that attempts to add native <code className="inline-code">browser.proxy</code> config with per-profile credential support, but until that gets merged, you have to get creative.
                        </p>
                        <p style={{ marginBottom: "2.5rem" }}>
                            Your best bet right now is either using a managed service that handles the proxying for you (like Firecrawl), or doing what I do: running a local proxy client that the browser is forced to route through at the OS level.
                        </p>

                        <h3 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>A Surprising Tip on IP Rotation</h3>
                        <p style={{ marginBottom: "1.5rem" }}>
                            One thing that completely surprised me: <strong>Keeping the same IP for 5-10 minutes works way better than rotating on every single request.</strong>
                        </p>
                        <p style={{ marginBottom: "2.5rem" }}>
                            It sounds counterintuitive, but anti-bot systems track <i>sessions</i>. If you're constantly rotating IPs while trying to maintain cookies or session state, it actually looks <i>more</i> suspicious than just browsing stably from one IP. OpenClaw’s natural "thinking" time between actions actually helps here. The 2-to-5-second gaps between page loads mimic human hesitation, preventing behavioral flags without needing to code explicit <code className="inline-code">sleep()</code> delays.
                        </p>

                        <h3 style={{ color: "var(--text-primary)", fontSize: "1.8rem", marginTop: "3rem", marginBottom: "1.5rem" }}>The Reality for All Agents</h3>
                        <p style={{ marginBottom: "1.5rem" }}>
                            FWIW, this doesn't just apply to OpenClaw. If you're using LangChain, Browser Use, CrewAI, etc., you're going to hit the exact same wall. AI agents simply browse differently than humans and trigger detection at much higher rates. The proxy you use is basically your identity layer—it determines whether a site sees your agent as a suspicious piece of automation or just another normal user on their phone.
                        </p>
                        <p style={{ marginBottom: "1.5rem" }}>
                            Got questions about setting up stealth browsers or handling agent networking? Ask away. Happy Clawing.
                        </p>

                        <style jsx>{`
              .inline-code {
                background: rgba(255, 255, 255, 0.1);
                padding: 2px 6px;
                border-radius: 4px;
                font-family: 'JetBrains Mono', monospace;
                font-size: 0.9em;
                color: var(--text-primary);
              }
            `}</style>
                    </div>
                </div>
            </article>

            <Footer />
        </>
    );
}
