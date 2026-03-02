"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="navbar" role="navigation">
            <div className="navbar-inner">
                <Link href="/" className="logo" data-umami-event="Nav: Logo Click">
                    <img src="/logo.svg" alt="ProxyBase" className="logo-icon" />
                    ProxyBase
                </Link>

                {/* Desktop Links */}
                <ul className="nav-links">
                    <li><Link href="/#how-it-works" data-umami-event="Nav: How It Works">How It Works</Link></li>
                    <li><Link href="/#pricing" data-umami-event="Nav: Pricing">Pricing</Link></li>
                    <li><Link href="/#api" data-umami-event="Nav: API Docs">API Docs</Link></li>
                    <li><Link href="/#mcp" data-umami-event="Nav: MCP">MCP</Link></li>
                    <li><Link href="/openclaw" data-umami-event="Nav: OpenClaw" className="nav-glow-btn">OpenClaw</Link></li>
                    <li><Link href="/#faq" data-umami-event="Nav: FAQ">FAQ</Link></li>
                </ul>
                <Link href="/#api" className="nav-cta" data-umami-event="Nav: Get API Key CTA">Get API Key →</Link>

                {/* Mobile Hamburger Toggle */}
                <button
                    className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle navigation menu"
                    data-umami-event="Mobile Nav: Toggle Menu"
                >
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                </button>
            </div>

            {/* Mobile Menu Panel */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <ul className="mobile-nav-links">
                    <li><Link href="/#how-it-works" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: How It Works">How It Works</Link></li>
                    <li><Link href="/#pricing" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: Pricing">Pricing</Link></li>
                    <li><Link href="/#api" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: API Docs">API Docs</Link></li>
                    <li><Link href="/#mcp" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: MCP">MCP</Link></li>
                    <li><Link href="/openclaw" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: OpenClaw" className="nav-glow-btn">OpenClaw</Link></li>
                    <li><Link href="/#faq" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: FAQ">FAQ</Link></li>
                </ul>
                <Link href="/#api" className="mobile-nav-cta" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: Get API Key CTA">Get API Key →</Link>
            </div>
        </nav>
    );
}
