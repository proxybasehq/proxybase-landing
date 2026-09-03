"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { countryFlag, countryName } from "../lib/walletCrypto";

export default function MarketsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("gui"); // 'gui' or 'cli'
  const [guiDownloads, setGuiDownloads] = useState({
    macos: "https://github.com/proxybasehq/proxybase-gui/releases/download/proxybase-gui-v0.1.53/ProxyBase_0.1.53_universal.dmg",
    windows: "https://github.com/proxybasehq/proxybase-gui/releases/download/proxybase-gui-v0.1.53/ProxyBase_0.1.53_x64_en-US.msi",
    linux: "https://github.com/proxybasehq/proxybase-gui/releases/download/proxybase-gui-v0.1.53/ProxyBase_0.1.53_amd64.deb",
    version: "v0.1.53",
  });

  useEffect(() => {
    let isMounted = true;
    fetch("/api/releases")
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted || !data?.gui?.assets) return;
        const macosAsset = data.gui.assets.find((a) => a.os === "macos" && a.name?.endsWith(".dmg"));
        const winAsset = data.gui.assets.find((a) => a.os === "windows" && (a.name?.endsWith(".msi") || a.name?.endsWith(".exe")));
        const linuxAsset = data.gui.assets.find((a) => a.os === "linux" && a.name?.endsWith(".deb"));
        const ver = data.gui.version ? data.gui.version.replace(/^proxybase-gui-/, "") : "v0.1.53";

        setGuiDownloads({
          macos: macosAsset?.url || "https://github.com/proxybasehq/proxybase-gui/releases/download/proxybase-gui-v0.1.53/ProxyBase_0.1.53_universal.dmg",
          windows: winAsset?.url || "https://github.com/proxybasehq/proxybase-gui/releases/download/proxybase-gui-v0.1.53/ProxyBase_0.1.53_x64_en-US.msi",
          linux: linuxAsset?.url || "https://github.com/proxybasehq/proxybase-gui/releases/download/proxybase-gui-v0.1.53/ProxyBase_0.1.53_amd64.deb",
          version: ver.startsWith("v") ? ver : `v${ver}`,
        });
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);
 
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
 Buy & Sell <span className="gradient-text">Proxy Bandwidth</span>
 </h1>
 <p className="hero-subtitle">
 Browse real-time proxy pricing by country, buy residential and mobile bandwidth by the GB, or run a node to sell your spare connectivity. Self-serve, no KYC, crypto-native.
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
 Access the world&apos;s most resilient residential and mobile proxy fleet. Perfect for AI agents, scrapers, and high-concurrency data systems.
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
 <span className="flag-icon">{countryFlag(item.code || item.country)}</span>
 {countryName(item.country || item.code)}
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

 <div className="proxy-types-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", marginTop: "48px" }}>
 <div className="proxy-type-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "32px", transition: "all var(--transition-smooth)", display: "flex", flexDirection: "column", gap: "16px" }}>
 <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
 <span style={{ fontSize: "2.2rem", margin: 0 }}>🏡</span>
 <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800 }}>Residential</h3>
 </div>
 <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
 Sourced from real residential broadband connections (e.g., Comcast, AT&T, BT). Excellent reputation scores ensure these IPs bypass standard anti-bot protections invisible to web host firewalls.
 </p>
 </div>

 <div className="proxy-type-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "32px", transition: "all var(--transition-smooth)", display: "flex", flexDirection: "column", gap: "16px" }}>
 <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
 <span style={{ fontSize: "2.2rem", margin: 0 }}>📱</span>
 <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800 }}>Mobile</h3>
 </div>
 <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
 Routed through dynamic 3G/4G/5G mobile carriers. Since thousands of users share mobile gateways, target sites rarely block these IPs to prevent cutting off legitimate consumers.
 </p>
 </div>

 <div className="proxy-type-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "32px", transition: "all var(--transition-smooth)", display: "flex", flexDirection: "column", gap: "16px" }}>
 <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
 <span style={{ fontSize: "2.2rem", margin: 0 }}>⚡</span>
 <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800 }}>Datacenter</h3>
 </div>
 <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
 Hosted in high-speed enterprise servers. Offers ultra-low latency, maximum throughput, and the lowest cost per gigabyte. Ideal for high-speed indexing where anti-bot rules are relaxed.
 </p>
 </div>

 <div className="proxy-type-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "32px", transition: "all var(--transition-smooth)", display: "flex", flexDirection: "column", gap: "16px" }}>
 <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
 <span style={{ fontSize: "2.2rem", margin: 0 }}>💼</span>
 <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800 }}>ISP (Static Residential)</h3>
 </div>
 <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
 Sourced directly from co-located server farms but registered under residential ISP ASN identifiers. Blends the high speed and static nature of servers with the trust score of home broadbands.
 </p>
 </div>

 <div className="proxy-type-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "32px", transition: "all var(--transition-smooth)", display: "flex", flexDirection: "column", gap: "16px" }}>
 <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
 <span style={{ fontSize: "2.2rem", margin: 0 }}>🔥</span>
 <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800 }}>Burner</h3>
 </div>
 <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
 High-rotation, short-lived residential IPs designed for concurrent scraping tasks. These proxies change or auto-expire rapidly, distributing requests across a massive pool.
 </p>
 </div>
 </div>
 </section>

 {/* DOWNLOAD CENTER */}
 <section className="downloads-section" id="downloads" style={{ paddingBottom: "120px" }}>
 <div className="section-header">
 <span className="section-label">Software Distribution</span>
 <h2>Download Center</h2>
 <p className="section-desc">Get the official ProxyBase clients for your operating system. Available in graphical dashboard and headless CLI formats.</p>
 </div>

 {/* TAB SWITCHER */}
 <div className="download-tabs" style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "48px", marginTop: "40px" }}>
 <button 
 className={`tab-btn ${activeTab === 'gui' ? 'active' : ''}`}
 onClick={() => setActiveTab("gui")}
 style={{
 padding: "12px 24px",
 background: activeTab === 'gui' ? 'var(--accent-gradient)' : 'var(--bg-card)',
 color: activeTab === 'gui' ? '#ffffff' : 'var(--text-secondary)',
 border: "1px solid var(--border-subtle)",
 borderRadius: "99px",
 fontWeight: 700,
 cursor: "pointer",
 transition: "all var(--transition-fast)"
 }}
 >
 🖥️ Native GUI Client
 </button>
 <button 
 className={`tab-btn ${activeTab === 'cli' ? 'active' : ''}`}
 onClick={() => setActiveTab("cli")}
 style={{
 padding: "12px 24px",
 background: activeTab === 'cli' ? 'var(--accent-gradient)' : 'var(--bg-card)',
 color: activeTab === 'cli' ? '#ffffff' : 'var(--text-secondary)',
 border: "1px solid var(--border-subtle)",
 borderRadius: "99px",
 fontWeight: 700,
 cursor: "pointer",
 transition: "all var(--transition-fast)"
 }}
 >
 💻 Headless CLI Daemon
 </button>
 </div>

 {/* GUI DOWNLOADS */}
 {activeTab === 'gui' && (
 <div className="downloads-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
 <div className="download-card macos" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
 <div>
 <div className="os-header" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
 <span className="os-icon" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "10px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", color: "var(--text-primary)" }}>
 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
 </span>
 <div>
 <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800 }}>macOS (GUI)</h3>
 <p className="os-version" style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>{guiDownloads.version} • Universal Apple Silicon / Intel</p>
 </div>
 </div>
 <p className="os-desc" style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
 Beautiful native app featuring interactive active sessions map, wallet manager, real-time bandwidth logs, and local proxy gateway controller.
 </p>
 </div>
 <a 
 href={guiDownloads.macos}
 className="btn-download"
 style={{ display: "block", textAlign: "center", background: "var(--accent-gradient)", color: "#ffffff", padding: "12px", borderRadius: "var(--radius-md)", fontWeight: 700, textDecoration: "none" }}
 >
 Download macOS .DMG
 </a>
 </div>

 <div className="download-card windows" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
 <div>
 <div className="os-header" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
 <span className="os-icon" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "10px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", color: "var(--text-primary)" }}>
 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 12V6.5l8-1.1V12H3zm0 .5h8v6.6l-8-1.1V12.5zm9.5-7.6L21 3v9h-8.5V4.9zm0 15.2V12H21v9l-8.5-1.1v-6.8z" /></svg>
 </span>
 <div>
 <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800 }}>Windows (GUI)</h3>
 <p className="os-version" style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>{guiDownloads.version} • Windows 10/11 x64</p>
 </div>
 </div>
 <p className="os-desc" style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
 Native Windows client built on light webview2 architecture. Features taskbar tray integration, automated startup settings, and wallet integration.
 </p>
 </div>
 <a 
 href={guiDownloads.windows}
 className="btn-download"
 style={{ display: "block", textAlign: "center", background: "var(--accent-gradient)", color: "#ffffff", padding: "12px", borderRadius: "var(--radius-md)", fontWeight: 700, textDecoration: "none" }}
 >
 Download Windows .MSI
 </a>
 </div>

 <div className="download-card linux" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
 <div>
 <div className="os-header" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
 <span className="os-icon" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "10px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", color: "var(--text-primary)" }}>
 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.37 2.016c-2.584.05-4.87 2.079-5.184 4.67-.184 1.52.28 3.045 1.192 4.257-.96 1.05-1.878 2.29-1.878 3.807 0 2.87 2.454 4.75 5.5 4.75.766 0 1.503-.133 2.193-.374.69.24 1.427.374 2.193.374 3.046 0 5.5-1.88 5.5-4.75 0-1.517-.918-2.757-1.878-3.807.912-1.212 1.376-2.737 1.192-4.257-.314-2.59-2.6-4.62-5.184-4.67h-.456zm-2.12 4.484a.875.875 0 1 1 0 1.75.875.875 0 0 1 0-1.75zm3.5 0a.875.875 0 1 1 0 1.75.875.875 0 0 1 0-1.75z" /></svg>
 </span>
 <div>
 <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800 }}>Linux (GUI)</h3>
 <p className="os-version" style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>{guiDownloads.version} • Debian / Ubuntu</p>
 </div>
 </div>
 <p className="os-desc" style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
 GTK3 bundle optimized for lightweight Linux desktop environments. Relays local traffic to SOCKS5 gateway with native system tray control panels.
 </p>
 </div>
 <a 
 href={guiDownloads.linux}
 className="btn-download"
 style={{ display: "block", textAlign: "center", background: "var(--accent-gradient)", color: "#ffffff", padding: "12px", borderRadius: "var(--radius-md)", fontWeight: 700, textDecoration: "none" }}
 >
 Download Debian .deb
 </a>
 </div>
 </div>
 )}

 {/* CLI DOWNLOADS */}
 {activeTab === 'cli' && (
 <div className="downloads-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
 <div className="download-card macos" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
 <div>
 <div className="os-header" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
 <span className="os-icon" style={{ fontSize: "2rem" }}>🍎</span>
 <div>
 <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800 }}>macOS (CLI)</h3>
 <p className="os-version" style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>v0.4.0 • M1/M2/M3 Apple Silicon</p>
 </div>
 </div>
 <p className="os-desc" style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "16px" }}>
 Headless CLI daemon to run proxybase in shell environments. Fully controllable via config.toml and local system APIs.
 </p>
 <div className="cli-install-cmd" style={{ background: "var(--bg-secondary)", padding: "12px", borderRadius: "6px", fontFamily: "monospace", fontSize: "0.8rem", marginBottom: "20px", overflowX: "auto" }}>
 <code>curl -fsSL https://proxybase.xyz/install.sh | sh</code>
 </div>
 </div>
 <a 
 href="https://github.com/proxybasehq/proxybase-cli/releases/latest/download/proxybase-cli-aarch64-apple-darwin.tar.gz"
 className="btn-download"
 style={{ display: "block", textAlign: "center", background: "var(--accent-gradient)", color: "#ffffff", padding: "12px", borderRadius: "var(--radius-md)", fontWeight: 700, textDecoration: "none" }}
 >
 Download macOS Archive (.tar.gz)
 </a>
 </div>

 <div className="download-card windows" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
 <div>
 <div className="os-header" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
 <span className="os-icon" style={{ fontSize: "2rem" }}>🪟</span>
 <div>
 <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800 }}>Windows (CLI)</h3>
 <p className="os-version" style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>v0.4.0 • PowerShell Command Line x64</p>
 </div>
 </div>
 <p className="os-desc" style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
 Compiled executable for background headless execution. Perfect for integration into Windows background services and automated scripts.
 </p>
 <div className="cli-install-cmd" style={{ background: "var(--bg-secondary)", padding: "12px", borderRadius: "6px", fontFamily: "monospace", fontSize: "0.8rem", marginBottom: "20px", overflowX: "auto" }}>
 <code>iwr https://proxybase.xyz/install.ps1 | iex</code>
 </div>
 </div>
 <a 
 href="https://github.com/proxybasehq/proxybase-cli/releases/latest/download/proxybase-cli-x86_64-pc-windows-msvc.zip"
 className="btn-download"
 style={{ display: "block", textAlign: "center", background: "var(--accent-gradient)", color: "#ffffff", padding: "12px", borderRadius: "var(--radius-md)", fontWeight: 700, textDecoration: "none" }}
 >
 Download Windows Archive (.zip)
 </a>
 </div>

 <div className="download-card linux" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
 <div>
 <div className="os-header" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
 <span className="os-icon" style={{ fontSize: "2rem" }}>🐧</span>
 <div>
 <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800 }}>Linux (CLI)</h3>
 <p className="os-version" style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>v0.4.0 • Systemd Service Ready x64</p>
 </div>
 </div>
 <p className="os-desc" style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "16px" }}>
 High performance daemon built to operate headlessly. Features native systemd configuration templates to run as a boot service.
 </p>
 <div className="cli-install-cmd" style={{ background: "var(--bg-secondary)", padding: "12px", borderRadius: "6px", fontFamily: "monospace", fontSize: "0.8rem", marginBottom: "20px", overflowX: "auto" }}>
 <code>wget -qO- https://proxybase.xyz/install.sh | sh</code>
 </div>
 </div>
 <a 
 href="https://github.com/proxybasehq/proxybase-cli/releases/latest/download/proxybase-cli-x86_64-unknown-linux-gnu.tar.gz"
 className="btn-download"
 style={{ display: "block", textAlign: "center", background: "var(--accent-gradient)", color: "#ffffff", padding: "12px", borderRadius: "var(--radius-md)", fontWeight: 700, textDecoration: "none" }}
 >
 Download Linux Archive (.tar.gz)
 </a>
 </div>
 </div>
 )}
 </section>

 <Footer />
 </div>
 );
}
