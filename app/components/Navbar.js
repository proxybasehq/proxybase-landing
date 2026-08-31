"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../lib/AuthContext";
import { formatUsd, microcreditsToUsd, shortAddress } from "../lib/walletCrypto";

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.9-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.7l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
    </svg>
  );
}

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, wallet, balance, status, signIn } = useAuth();

    const signedIn = Boolean(user);

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
                            <li><Link href="/earn/earn-money-online" data-umami-event="Nav: Earn Money Online">Earn Money Online</Link></li>
                        </ul>
                    </li>
                    <li><Link href="/ai-agents" data-umami-event="Nav: AI Agents">AI Agents</Link></li>
                    <li><Link href="/markets" data-umami-event="Nav: Markets">Markets</Link></li>
                    <li><Link href="/ai-agents#pricing" data-umami-event="Nav: Pricing">Pricing</Link></li>
                    <li><Link href="/ai-agents#api" data-umami-event="Nav: API Docs">API Docs</Link></li>
                    <li><Link href="/ai-agents#mcp" data-umami-event="Nav: MCP">MCP</Link></li>
                </ul>

                {/* Auth area */}
                <div className="nav-auth">
                    {signedIn ? (
                        <>
                            <Link
                                href="/console"
                                className="nav-auth-pill nav-auth-address"
                                title={wallet?.address || user.email}
                                data-umami-event="Nav: Wallet Pill"
                            >
                                <span className="nav-auth-avatar">
                                    {user.avatar ? (
                                        <img src={user.avatar} alt="" />
                                    ) : (
                                        (user.name || user.email || "?").slice(0, 1).toUpperCase()
                                    )}
                                </span>
                                {wallet ? (
                                    <>
                                        <span className="nav-auth-addr-mono">{shortAddress(wallet.address)}</span>
                                        {balance && (
                                            <span className="nav-auth-balance">
                                                {formatUsd(microcreditsToUsd(balance.spendable_balance))}
                                            </span>
                                        )}
                                    </>
                                ) : (
                                    <span className="nav-auth-name">{user.name || user.email}</span>
                                )}
                            </Link>
                            <Link href="/console" className="nav-cta cta-border-glow" data-umami-event="Nav: Console CTA">
                                CONSOLE →
                            </Link>
                        </>
                    ) : (
                        <button
                            type="button"
                            className="nav-google-btn"
                            onClick={signIn}
                            disabled={status === "signingIn"}
                            data-umami-event="Nav: Google Sign In"
                        >
                            <GoogleIcon />
                            {status === "signingIn" ? "Signing in…" : "Sign in with Google"}
                        </button>
                    )}
                </div>

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
                    <li className="mobile-dropdown-item"><Link href="/earn/earn-money-online" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: Earn Money Online">Earn Money Online</Link></li>
                    <li className="mobile-nav-divider"></li>
                    <li><Link href="/ai-agents" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: AI Agents">AI Agents</Link></li>
                    <li><Link href="/markets" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: Markets">Markets</Link></li>
                    <li><Link href="/ai-agents#pricing" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: Pricing">Pricing</Link></li>
                    <li><Link href="/ai-agents#api" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: API Docs">API Docs</Link></li>
                    <li><Link href="/ai-agents#mcp" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: MCP">MCP</Link></li>
                    <li className="mobile-nav-divider"></li>
                    {signedIn ? (
                        <li><Link href="/console" className="mobile-nav-cta cta-border-glow" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: Console">Console →</Link></li>
                    ) : (
                        <li>
                            <button
                                type="button"
                                className="mobile-nav-google"
                                onClick={() => { setMobileMenuOpen(false); signIn(); }}
                                data-umami-event="Mobile Nav: Google Sign In"
                            >
                                <GoogleIcon /> Sign in with Google
                            </button>
                        </li>
                    )}
                </ul>
                <Link href="/download" className="mobile-nav-cta cta-border-glow" onClick={() => setMobileMenuOpen(false)} data-umami-event="Mobile Nav: Download CTA">Download →</Link>
            </div>
        </nav>
    );
}
