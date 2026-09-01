"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

function MacIcon({ size = 18 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
    );
}

function WindowsIcon({ size = 18 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3 12V6.5l8-1.1V12H3zm0 .5h8v6.6l-8-1.1V12.5zm9.5-7.6L21 3v9h-8.5V4.9zm0 15.2V12H21v9l-8.5-1.1v-6.8z" />
        </svg>
    );
}

function LinuxIcon({ size = 18 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.37 2.016c-2.584.05-4.87 2.079-5.184 4.67-.184 1.52.28 3.045 1.192 4.257-.96 1.05-1.878 2.29-1.878 3.807 0 2.87 2.454 4.75 5.5 4.75.766 0 1.503-.133 2.193-.374.69.24 1.427.374 2.193.374 3.046 0 5.5-1.88 5.5-4.75 0-1.517-.918-2.757-1.878-3.807.912-1.212 1.376-2.737 1.192-4.257-.314-2.59-2.6-4.62-5.184-4.67h-.456zm-2.12 4.484a.875.875 0 1 1 0 1.75.875.875 0 0 1 0-1.75zm3.5 0a.875.875 0 1 1 0 1.75.875.875 0 0 1 0-1.75z" />
        </svg>
    );
}

const DEFAULT_DOWNLOADS = {
    macos: "https://github.com/proxybasehq/proxybase-gui/releases/download/proxybase-gui-v0.1.53/ProxyBase_0.1.53_universal.dmg",
    windows: "https://github.com/proxybasehq/proxybase-gui/releases/download/proxybase-gui-v0.1.53/ProxyBase_0.1.53_x64_en-US.msi",
    linux: "https://github.com/proxybasehq/proxybase-gui/releases/download/proxybase-gui-v0.1.53/ProxyBase_0.1.53_amd64.deb",
};

export default function Footer() {
    const [downloads, setDownloads] = useState(DEFAULT_DOWNLOADS);

    useEffect(() => {
        let isMounted = true;
        fetch("/api/releases")
            .then((res) => res.json())
            .then((data) => {
                if (!isMounted || !data?.gui?.assets) return;
                const macosAsset = data.gui.assets.find((a) => a.os === "macos" && a.name?.endsWith(".dmg"));
                const winAsset = data.gui.assets.find((a) => a.os === "windows" && (a.name?.endsWith(".msi") || a.name?.endsWith(".exe")));
                const linuxAsset = data.gui.assets.find((a) => a.os === "linux" && a.name?.endsWith(".deb"));

                setDownloads({
                    macos: macosAsset?.url || DEFAULT_DOWNLOADS.macos,
                    windows: winAsset?.url || DEFAULT_DOWNLOADS.windows,
                    linux: linuxAsset?.url || DEFAULT_DOWNLOADS.linux,
                });
            })
            .catch(() => {});
        return () => {
            isMounted = false;
        };
    }, []);

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
                    <div className="footer-os-downloads">
                        <a href={downloads.macos} className="footer-os-link" title="Download GUI for macOS" data-umami-event="Footer: Download macOS GUI">
                            <MacIcon />
                        </a>
                        <a href={downloads.windows} className="footer-os-link" title="Download GUI for Windows" data-umami-event="Footer: Download Windows GUI">
                            <WindowsIcon />
                        </a>
                        <a href={downloads.linux} className="footer-os-link" title="Download GUI for Linux" data-umami-event="Footer: Download Linux GUI">
                            <LinuxIcon />
                        </a>
                    </div>
                </div>

                <div className="footer-vertical-columns">
                    <div className="footer-col">
                        <h4>Product</h4>
                        <ul>
                            <li><Link href="/what-is-proxybase" data-umami-event="Footer: What Is ProxyBase">What It Is</Link></li>
                            <li><Link href="/referrals" data-umami-event="Footer: Referrals">Referral Program</Link></li>
                            <li><Link href="/buy-with-crypto" data-umami-event="Footer: Buy With Crypto">Buy with Crypto</Link></li>
                            <li><Link href="/no-kyc-proxy" data-umami-event="Footer: No KYC">No KYC Proxy</Link></li>
                            <li><Link href="/proxy-for-ai-agents" data-umami-event="Footer: AI Agent Proxy">AI Agent Proxy</Link></li>
                            <li><Link href="/markets" data-umami-event="Footer: Markets">Markets</Link></li>
                            <li><Link href="/ai-agents#pricing" data-umami-event="Footer: Pricing">Pricing</Link></li>
                            <li><Link href="/mpp" data-umami-event="Footer: MPP">MPP</Link></li>
                            <li><Link href="/openclaw" data-umami-event="Footer: OpenClaw">OpenClaw</Link></li>
                            <li><Link href="/hermes" data-umami-event="Footer: Hermes">Hermes</Link></li>
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
                            <li><Link href="/compare/earnapp" data-umami-event="Footer: Compare EarnApp">VS EarnApp</Link></li>
                            <li><Link href="/compare/pawns" data-umami-event="Footer: Compare Pawns">VS Pawns.app</Link></li>
                            <li><Link href="/compare/packetstream" data-umami-event="Footer: Compare PacketStream">VS PacketStream</Link></li>
                            <li><Link href="/compare/traffmonetizer" data-umami-event="Footer: Compare TraffMonetizer">VS TraffMonetizer</Link></li>
                            <li><Link href="/compare/proxy-seller" data-umami-event="Footer: Compare Proxy-Seller">VS Proxy-Seller</Link></li>
                            <li><Link href="/compare/webshare" data-umami-event="Footer: Compare Webshare">VS Webshare</Link></li>
                            <li><Link href="/compare/proxy-cheap" data-umami-event="Footer: Compare Proxy-Cheap">VS Proxy-Cheap</Link></li>
                            <li><Link href="/compare/hermes-vs-openclaw" data-umami-event="Footer: Compare Hermes Agent">VS Hermes Agent</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Resources</h4>
                        <ul>
                            <li><Link href="/#api" data-umami-event="Footer: API Docs">API Docs</Link></li>
                            <li><Link href="/ai-agents#mcp" data-umami-event="Footer: MCP">MCP</Link></li>
                            <li><Link href="/blog/proxy-errors-troubleshooting" data-umami-event="Footer: Proxy Errors">Proxy Error Guide</Link></li>
                            <li><Link href="/headers" data-umami-event="Footer: Headers">Headers</Link></li>
                            <li><Link href="/antibot" data-umami-event="Footer: Antibot">Antibot</Link></li>
                            <li><Link href="/ip" data-umami-event="Footer: IP Whois">IP Whois</Link></li>
                            <li><Link href="/whois" data-umami-event="Footer: Domain Whois">Domain Whois</Link></li>
                            <li><Link href="/dns" data-umami-event="Footer: DNS Lookup">DNS Lookup</Link></li>
                            <li><Link href="/proxy-checker" data-umami-event="Footer: Proxy Checker">Proxy Checker</Link></li>
                            <li><Link href="/http-status-codes" data-umami-event="Footer: HTTP Status Codes">HTTP Status Codes</Link></li>
                            <li><Link href="/what-is-reverse-proxy" data-umami-event="Footer: Reverse Proxy">Reverse Proxy Guide</Link></li>
                            <li><Link href="/prediction-markets-proxy" data-umami-event="Footer: Prediction Markets">Prediction Markets Proxy</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Developers</h4>
                        <ul>
                            <li><Link href="/blog" data-umami-event="Footer: Blog">Blog</Link></li>
                            <li><a href="https://github.com/proxybasehq/proxybase-mcp" target="_blank" rel="noopener noreferrer" data-umami-event="Footer: GitHub">GitHub</a></li>
                            <li><a href="https://discord.gg/7uedk7ajHD" target="_blank" rel="noopener noreferrer" data-umami-event="Footer: Discord">Discord</a></li>
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
