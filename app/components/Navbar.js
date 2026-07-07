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
                    <li className="nav-dropdown-wrapper">
                        <span className="nav-dropdown-trigger">Earn <span className="dropdown-arrow">▼</span></span>
                        <ul className="nav-dropdown-menu">
                            <li><Link href="/earn/sell-internet" data-umami-event="Nav: Sell Internet">Sell Internet</Link></li>
                            <li><Link href="/earn/passive-income" data-umami-event="Nav: Passive Income">Passive Income</Link></li>
                            <li><Link href="/earn/earn-money-online" data-umami-event="Nav: Earn Money Online">Earn Money Online</Link></li>
                        </ul>
                    </li>
                    <li><Link href="/ai-agents" data-umami-event="Nav: AI Agents">AI Agents</Link></li>
                    <li><Link href="/markets" data-umami-event="Nav: Markets">Markets</Link></li>
                    <li><Link href="/ai-agents#pricing" data-umami-event="Nav: Pricing">Pricing</Link></li>
                    <li><Link href="/ai-agents#api" data-umami-event="Nav: API Docs">API Docs</Link></li>
                    <li><Link href="/ai-agents#mcp" data-umami-event="Nav: MCP">MCP</Link></li>
                </ul>
                <Link href="/ai-agents#api" className="nav-cta" data-umami-event="Nav: Get API Key CTA">Get API Key →</Link>

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
                    <li className="mobile-dropdown-header">Earn</li>
                    <li className="mobile-dropdown-item"><Link href="/earn/sell-internet" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: Sell Internet">Sell Internet</Link></li>
                    <li className="mobile-dropdown-item"><Link href="/earn/passive-income" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: Passive Income">Passive Income</Link></li>
                    <li className="mobile-dropdown-item"><Link href="/earn/earn-money-online" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: Earn Money Online">Earn Money Online</Link></li>
                    <li className="mobile-nav-divider"></li>
                    <li><Link href="/ai-agents" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: AI Agents">AI Agents</Link></li>
                    <li><Link href="/markets" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: Markets">Markets</Link></li>
                    <li><Link href="/ai-agents#pricing" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: Pricing">Pricing</Link></li>
                    <li><Link href="/ai-agents#api" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: API Docs">API Docs</Link></li>
                    <li><Link href="/ai-agents#mcp" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: MCP">MCP</Link></li>
                </ul>
                <Link href="/ai-agents#api" className="mobile-nav-cta" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: Get API Key CTA">Get API Key →</Link>
            </div>
        </nav>
    );
}
