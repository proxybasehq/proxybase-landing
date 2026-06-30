import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer-vertical">
            <div className="footer-vertical-inner">
                <div className="footer-vertical-brand">
                    <div className="footer-brand-logo">
                        <img src="/logo.svg" alt="ProxyBase" className="logo-icon" style={{ width: 28, height: 28 }} />
                        <span className="brand-name">ProxyBase</span>
                    </div>
                    <p className="footer-brand-desc">
                        Autonomous programmatic SOCKS5 proxy infrastructure built exclusively for AI agents.
                    </p>
                    <span className="footer-text-copyright">
                        © {new Date().getFullYear()} ProxyBase. All rights reserved.
                    </span>
                </div>
                
                <div className="footer-vertical-columns">
                    <div className="footer-col">
                        <h4>Product</h4>
                        <ul>
                            <li><Link href="/what-is-proxybase" data-umami-event="Footer: What Is ProxyBase">What It Is</Link></li>
                            <li><Link href="/markets" data-umami-event="Footer: Markets">Markets</Link></li>
                            <li><Link href="/#pricing" data-umami-event="Footer: Pricing">Pricing</Link></li>
                            <li><Link href="/mpp" data-umami-event="Footer: MPP">MPP</Link></li>
                            <li><Link href="/openclaw" data-umami-event="Footer: OpenClaw">OpenClaw</Link></li>
                            <li><Link href="/connector" data-umami-event="Footer: Connector">Connector</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Compare</h4>
                        <ul>
                            <li><Link href="/compare/iproyal" data-umami-event="Footer: Compare IPRoyal">VS IPRoyal</Link></li>
                            <li><Link href="/compare/decodo" data-umami-event="Footer: Compare Decodo">VS Decodo</Link></li>
                            <li><Link href="/compare/proxyempire" data-umami-event="Footer: Compare ProxyEmpire">VS ProxyEmpire</Link></li>
                            <li><Link href="/compare/oxylabs" data-umami-event="Footer: Compare Oxylabs">VS Oxylabs</Link></li>
                            <li><Link href="/compare/brightdata" data-umami-event="Footer: Compare Bright Data">VS Bright Data</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Resources</h4>
                        <ul>
                            <li><Link href="/#api" data-umami-event="Footer: API Docs">API Docs</Link></li>
                            <li><Link href="/#mcp" data-umami-event="Footer: MCP">MCP</Link></li>
                            <li><Link href="/headers" data-umami-event="Footer: Headers">Headers</Link></li>
                            <li><Link href="/antibot" data-umami-event="Footer: Antibot">Antibot</Link></li>
                            <li><Link href="/ip" data-umami-event="Footer: IP Whois">IP Whois</Link></li>
                            <li><Link href="/whois" data-umami-event="Footer: Domain Whois">Domain Whois</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Developers</h4>
                        <ul>
                            <li><Link href="/blog" data-umami-event="Footer: Blog">Blog</Link></li>
                            <li><a href="https://github.com/proxybasehq/proxybase-mcp" target="_blank" rel="noopener noreferrer" data-umami-event="Footer: GitHub">GitHub</a></li>
                            <li><a href="/openapi.yaml" target="_blank" rel="noopener noreferrer" data-umami-event="Footer: OpenAPI">OpenAPI Spec</a></li>
                            <li><a href="/SKILL.md" target="_blank" rel="noopener noreferrer" data-umami-event="Footer: SKILL.md">SKILL.md</a></li>
                            <li><a href="mailto:humanshere@proxybase.xyz" data-umami-event="Footer: Contact">Contact</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Legal</h4>
                        <ul>
                            <li><Link href="/terms" data-umami-event="Footer: Terms">Terms of Service</Link></li>
                            <li><Link href="/privacy" data-umami-event="Footer: Privacy">Privacy Policy</Link></li>
                            <li><Link href="/refund" data-umami-event="Footer: Refund">Refund Policy</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
