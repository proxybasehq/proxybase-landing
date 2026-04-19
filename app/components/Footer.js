import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-brand">
                    <img src="/logo.svg" alt="ProxyBase" className="logo-icon" style={{ width: 24, height: 24 }} />
                    <span className="footer-text">
                        © {new Date().getFullYear()} ProxyBase. AI Infrastructure for Agents.
                    </span>
                </div>
                <ul className="footer-links">
                    <li>
                        <Link href="/what-is-proxybase" data-umami-event="Footer: What Is ProxyBase">What It Is</Link>
                    </li>
                    <li>
                        <Link href="/blog" data-umami-event="Footer: Blog">Blog</Link>
                    </li>
                    <li>
                        <Link href="/terms" data-umami-event="Footer: Terms">Terms</Link>
                    </li>
                    <li>
                        <Link href="/ip" data-umami-event="Footer: IP Whois">IP Whois</Link>
                    </li>
                    <li>
                        <Link href="/whois" data-umami-event="Footer: Domain Whois">Domain Whois</Link>
                    </li>
                    <li>
                        <Link href="/#api" data-umami-event="Footer: API Docs">API Docs</Link>
                    </li>
                    <li>
                        <a
                            href="https://github.com/proxybasehq/proxybase-mcp"
                            target="_blank"
                            rel="noopener noreferrer"
                            data-umami-event="Footer: GitHub"
                        >
                            GitHub
                        </a>
                    </li>
                    <li>
                        <a href="mailto:humanshere@proxybase.xyz" data-umami-event="Footer: Contact">Contact</a>
                    </li>
                    <li>
                        <a href="/SKILL.md" target="_blank" rel="noopener noreferrer" data-umami-event="Footer: SKILL.md">SKILL.md</a>
                    </li>
                    <li>
                        <a href="/openapi.yaml" target="_blank" rel="noopener noreferrer" data-umami-event="Footer: OpenAPI">openapi.yaml</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
