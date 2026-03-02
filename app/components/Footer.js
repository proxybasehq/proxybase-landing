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
                </ul>
            </div>
        </footer>
    );
}
