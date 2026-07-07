"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MarketsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("gui"); // 'gui' or 'cli'
    
    // Mock initial database mapping to /v2/catalog/pricing used as fallback/pre-render values
    const basePricingFallback = [
        { country: "United States", code: "US", category: "Residential", price: 3.00, sellerCredit: 1.80, status: "High Availability", nodes: 1420 },
        { country: "United States", code: "US", category: "Mobile", price: 5.00, sellerCredit: 3.00, status: "High Availability", nodes: 850 },
        { country: "United Kingdom", code: "GB", category: "Residential", price: 3.50, sellerCredit: 2.10, status: "High Availability", nodes: 640 },
        { country: "United Kingdom", code: "GB", category: "Mobile", price: 5.50, sellerCredit: 3.30, status: "Normal", nodes: 310 },
        { country: "Germany", code: "DE", category: "Residential", price: 3.20, sellerCredit: 1.92, status: "High Availability", nodes: 580 },
        { country: "Germany", code: "DE", category: "Mobile", price: 5.20, sellerCredit: 3.12, status: "Normal", nodes: 220 },
        { country: "Japan", code: "JP", category: "Residential", price: 4.00, sellerCredit: 2.40, status: "Normal", nodes: 450 },
        { country: "Japan", code: "JP", category: "Mobile", price: 6.00, sellerCredit: 3.60, status: "Limited", nodes: 110 },
        { country: "France", code: "FR", category: "Residential", price: 3.30, sellerCredit: 1.98, status: "High Availability", nodes: 410 },
        { country: "France", code: "FR", category: "Mobile", price: 5.30, sellerCredit: 3.18, status: "Normal", nodes: 180 },
        { country: "Canada", code: "CA", category: "Residential", price: 3.40, sellerCredit: 2.04, status: "High Availability", nodes: 490 },
        { country: "Canada", code: "CA", category: "Mobile", price: 5.40, sellerCredit: 3.24, status: "Normal", nodes: 195 },
    ];

    const [pricing, setPricing] = useState(basePricingFallback);

    useEffect(() => {
        fetch("/pricing.json")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setPricing(data);
                }
            })
            .catch(err => console.error("Failed to load real-time catalog pricing:", err));
    }, []);

    useEffect(() => {
        const handleHashScroll = () => {
            if (typeof window !== "undefined" && window.location.hash) {
                const id = window.location.hash.substring(1);
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }
        };

        const timer1 = setTimeout(handleHashScroll, 100);
        const timer2 = setTimeout(handleHashScroll, 500);
        window.addEventListener("hashchange", handleHashScroll);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            window.removeEventListener("hashchange", handleHashScroll);
        };
    }, []);


    const filteredPricing = pricing.filter(item => 
        item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="markets-page-root">
            <Navbar />

            {/* HERO SECTION */}
            <section className="markets-hero">
                <div className="hero-grid-overlay" />
                <div className="hero-glow-1" />
                <div className="hero-glow-2" />
                
                <div className="markets-hero-content">
                    <div className="hero-badge">
                        <span className="badge-dot" />
                        ProxyBase v2 Market Protocol Live
                    </div>
                    <h1>
                        The Autonomous <span className="gradient-text">Proxy Brokerage</span>
                    </h1>
                    <p className="hero-subtitle">
                        A decentralized, peer-to-peer SOCKS5 proxy market. Orchestrators buy high-performance residential bandwidth, while global node hosts sell spare connectivity. 100% programmatic, secured in Rust.
                    </p>
                    <div className="hero-actions">
                        <a href="#explainers" className="btn-primary">Learn the Roles</a>
                        <a href="#downloads" className="btn-secondary">Download Clients</a>
                    </div>
                </div>
            </section>

            {/* EXPLAINER CARDS SECTION */}
            <section className="market-explainers-section" id="explainers">
                <div className="section-header">
                    <span className="section-label">Double-Sided Protocol</span>
                    <h2>Choose Your Role</h2>
                    <p className="section-desc">ProxyBase v2 bridges the gap between buyers who need clean IPs and sellers who have them.</p>
                </div>

                <div className="explainers-grid">
                    {/* BUYER CARD */}
                    <div className="explainer-card buyer-card">
                        <div className="card-glow" />
                        <div className="card-content">
                            <div className="role-icon">⚡</div>
                            <h3>Become a Buyer</h3>
                            <p className="role-summary">
                                Access the world's most resilient residential and mobile proxy fleet. Perfect for AI agents, scrapers, and high-concurrency data systems.
                            </p>
                            <ul className="role-features">
                                <li>
                                    <strong>No KYC or Dashboards:</strong> Authenticate programmatically with your crypto wallet.
                                </li>
                                <li>
                                    <strong>Intent-Based Routing:</strong> Request specific properties directly in SOCKS5 auth strings (e.g. `jwt|country_US|type_mobile`).
                                </li>
                                <li>
                                    <strong>Self-Healing Failovers:</strong> Dual-path failover channels immediately reroute traffic if a path goes offline.
                                </li>
                                <li>
                                    <strong>Transparent Pricing:</strong> Standardized flat rates per GB with pay-as-you-go credit settlements.
                                </li>
                            </ul>
                            <div className="card-actions">
                                <a href="#pricing-catalog" className="btn-primary" style={{ display: "block", textAlign: "center" }}>View Pricing Catalog ↓</a>
                            </div>
                        </div>
                    </div>

                    {/* SELLER CARD */}
                    <div className="explainer-card seller-card">
                        <div className="card-glow" />
                        <div className="card-content">
                            <div className="role-icon">⚙️</div>
                            <h3>Become a Seller</h3>
                            <p className="role-summary">
                                Monetize your unused home or mobile network bandwidth. Run a secure node and receive real-time payouts in microcredits or stablecoins.
                            </p>
                            <ul className="role-features">
                                <li>
                                    <strong>Completely Sandboxed:</strong> Node clients relay strictly TCP connections through a secure yamux tunnel. Your local network stays isolated.
                                </li>
                                <li>
                                    <strong>Dynamic Classifications:</strong> Automatically get promoted from Trial to Production pool as your QoS metrics (uptime, latency) scale up.
                                </li>
                                <li>
                                    <strong>Multipath Listening:</strong> Register multiple active network paths to maximize your earnings.
                                </li>
                                <li>
                                    <strong>Real-Time Yield:</strong> Earn microcredits on every MB transferred, with direct blockchain withdrawals.
                                </li>
                            </ul>
                            <div className="card-actions">
                                <a href="#downloads" className="btn-secondary" style={{ display: "block", textAlign: "center" }} onClick={() => setActiveTab("gui")}>Run a Node Now →</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRICING CATALOG TABLE SECTION */}
            <section className="pricing-catalog-section" id="pricing-catalog">
                <div className="section-header">
                    <span className="section-label">Real-Time Catalog</span>
                    <h2>Global Marketplace Pricing</h2>
                    <p className="section-desc">Queried from `/v2/catalog/pricing`. Prices are transparently charged to buyers and credited to sellers.</p>
                </div>

                <div className="search-filter-wrapper">
                    <div className="search-bar-container">
                        <span className="search-icon">🔍</span>
                        <input 
                            type="text" 
                            placeholder="Filter by country (e.g. US, Germany) or category (Residential, Mobile)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="pricing-table-container">
                    <table className="market-pricing-table">
                        <thead>
                            <tr>
                                <th>Country</th>
                                <th>Category</th>
                                <th>Buyer Price (per GB)</th>
                                <th>Seller Yield (per GB)</th>
                                <th>Active Nodes</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPricing.length > 0 ? (
                                filteredPricing.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="country-cell">
                                            <span className="flag-icon">{item.code}</span>
                                            {item.country}
                                        </td>
                                        <td className="category-cell">
                                            <span className={`cat-badge ${item.category.toLowerCase()}`}>
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="price-cell font-mono">${item.price.toFixed(2)}</td>
                                        <td className="yield-cell font-mono text-emerald">${item.sellerCredit.toFixed(2)}</td>
                                        <td className="nodes-cell font-mono">{item.nodes}</td>
                                        <td className="status-cell">
                                            <span className={`status-pill ${item.status.toLowerCase().replace(" ", "-")}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="no-results">
                                        No matching pricing records found. Try a different search terms.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* PROXY TYPES TAXONOMY */}
            <section className="proxy-types-section" id="proxy-types">
                <div className="section-header">
                    <span className="section-label">Fleet Taxonomy</span>
                    <h2>Proxy Types & Classifications</h2>
                    <p className="section-desc">ProxyBase routes traffic through multiple distinct network tiers, optimized for specific speed, reputation, and concurrency needs.</p>
                </div>

                <div className="proxy-types-grid">
                    <div className="proxy-type-card">
                        <span>🏡</span>
                        <h3>Residential</h3>
                        <p>
                            Sourced from real residential broadband connections (e.g., Comcast, AT&T, BT). Excellent reputation scores ensure these IPs bypass standard anti-bot protections invisible to web host firewalls.
                        </p>
                    </div>

                    <div className="proxy-type-card">
                        <span>📱</span>
                        <h3>Mobile</h3>
                        <p>
                            Routed through dynamic 3G/4G/5G mobile carriers. Since thousands of users share mobile gateways, target sites rarely block these IPs to prevent cutting off legitimate consumers.
                        </p>
                    </div>

                    <div className="proxy-type-card">
                        <span>⚡</span>
                        <h3>Datacenter</h3>
                        <p>
                            Hosted in high-speed enterprise servers. Offers ultra-low latency, maximum throughput, and the lowest cost per gigabyte. Ideal for high-speed indexing where anti-bot rules are relaxed.
                        </p>
                    </div>

                    <div className="proxy-type-card">
                        <span>💼</span>
                        <h3>ISP (Static Residential)</h3>
                        <p>
                            Sourced directly from co-located server farms but registered under residential ISP ASN identifiers. Blends the high speed and static nature of servers with the trust score of home broadbands.
                        </p>
                    </div>

                    <div className="proxy-type-card">
                        <span>🔥</span>
                        <h3>Burner</h3>
                        <p>
                            High-rotation, short-lived residential IPs designed for concurrent scraping tasks. These proxies change or auto-expire rapidly, distributing requests across a massive pool.
                        </p>
                    </div>
                </div>
            </section>

            {/* DOWNLOAD CENTER */}
            <section className="downloads-section" id="downloads">
                <div className="section-header">
                    <span className="section-label">Software Distribution</span>
                    <h2>Download Center</h2>
                    <p className="section-desc">Get the official ProxyBase clients for your operating system. Available in graphical dashboard and headless CLI formats.</p>
                </div>

                {/* TAB SWITCHER */}
                <div className="download-tabs">
                    <button 
                        className={`tab-btn ${activeTab === 'gui' ? 'active' : ''}`}
                        onClick={() => setActiveTab("gui")}
                    >
                        🖥️ Native GUI Client
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'cli' ? 'active' : ''}`}
                        onClick={() => setActiveTab("cli")}
                    >
                        💻 Headless CLI Daemon
                    </button>
                </div>

                {/* GUI DOWNLOADS */}
                {activeTab === 'gui' && (
                    <div className="downloads-grid">
                        <div className="download-card macos">
                            <div className="os-header">
                                <span className="os-icon">🍎</span>
                                <div>
                                    <h3>macOS (GUI)</h3>
                                    <p className="os-version">v0.1.0 • Universal Apple Silicon / Intel</p>
                                </div>
                            </div>
                            <p className="os-desc">Beautiful native app featuring interactive active sessions map, wallet manager, real-time bandwidth logs, and local proxy gateway controller.</p>
                            <a 
                                href="https://github.com/proxybasehq/proxybase-gui/releases/latest/download/ProxyBase_0.1.0_universal.dmg"
                                className="btn-download"
                            >
                                Download Universal .DMG
                            </a>
                        </div>

                        <div className="download-card windows">
                            <div className="os-header">
                                <span className="os-icon">🪟</span>
                                <div>
                                    <h3>Windows (GUI)</h3>
                                    <p className="os-version">v0.1.0 • Windows 10/11 x64</p>
                                </div>
                            </div>
                            <p className="os-desc">Native Windows client built on light webview2 architecture. Features taskbar tray integration, automated startup settings, and wallet integration.</p>
                            <a 
                                href="https://github.com/proxybasehq/proxybase-gui/releases/latest/download/ProxyBase_0.1.0_x64_en-US.msi"
                                className="btn-download"
                            >
                                Download Windows .MSI
                            </a>
                        </div>

                        <div className="download-card linux">
                            <div className="os-header">
                                <span className="os-icon">🐧</span>
                                <div>
                                    <h3>Linux (GUI)</h3>
                                    <p className="os-version">v0.1.0 • Ubuntu / Debian amd64</p>
                                </div>
                            </div>
                            <p className="os-desc">GTK3 bundle optimized for lightweight Linux desktop environments. Relays local traffic to SOCKS5 gateway with native system tray control panels.</p>
                            <a 
                                href="https://github.com/proxybasehq/proxybase-gui/releases/latest/download/proxybase_0.1.0_amd64.deb"
                                className="btn-download"
                            >
                                Download Debian .deb
                            </a>
                        </div>
                    </div>
                )}

                {/* CLI DOWNLOADS */}
                {activeTab === 'cli' && (
                    <div className="downloads-grid">
                        <div className="download-card macos">
                            <div className="os-header">
                                <span className="os-icon">🍎</span>
                                <div>
                                    <h3>macOS (CLI)</h3>
                                    <p className="os-version">v0.4.0 • M1/M2/M3 Apple Silicon</p>
                                </div>
                            </div>
                            <p className="os-desc">Headless CLI daemon to run proxybase in shell environments. Fully controllable via config.toml and local system APIs.</p>
                            <a 
                                href="https://github.com/proxybasehq/proxybase-cli/releases/latest/download/proxybase-cli-aarch64-apple-darwin.tar.gz"
                                className="btn-download"
                            >
                                Download macOS Archive (.tar.gz)
                            </a>
                            <div className="cli-install-cmd">
                                <code>curl -fsSL https://proxybase.xyz/install.sh | sh</code>
                            </div>
                        </div>

                        <div className="download-card windows">
                            <div className="os-header">
                                <span className="os-icon">🪟</span>
                                <div>
                                    <h3>Windows (CLI)</h3>
                                    <p className="os-version">v0.4.0 • PowerShell Command Line x64</p>
                                </div>
                            </div>
                            <p className="os-desc">Compiled executable for background headless execution. Perfect for integration into Windows background services and automated scripts.</p>
                            <a 
                                href="https://github.com/proxybasehq/proxybase-cli/releases/latest/download/proxybase-cli-x86_64-pc-windows-msvc.zip"
                                className="btn-download"
                            >
                                Download Windows Archive (.zip)
                            </a>
                            <div className="cli-install-cmd">
                                <code>iwr https://proxybase.xyz/install.ps1 | iex</code>
                            </div>
                        </div>

                        <div className="download-card linux">
                            <div className="os-header">
                                <span className="os-icon">🐧</span>
                                <div>
                                    <h3>Linux (CLI)</h3>
                                    <p className="os-version">v0.4.0 • Systemd Service Ready x64</p>
                                </div>
                            </div>
                            <p className="os-desc">High performance daemon built to operate headlessly. Features native systemd configuration templates to run as a boot service.</p>
                            <a 
                                href="https://github.com/proxybasehq/proxybase-cli/releases/latest/download/proxybase-cli-x86_64-unknown-linux-gnu.tar.gz"
                                className="btn-download"
                            >
                                Download Linux Archive (.tar.gz)
                            </a>
                            <div className="cli-install-cmd">
                                <code>wget -qO- https://proxybase.xyz/install.sh | sh</code>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
}
