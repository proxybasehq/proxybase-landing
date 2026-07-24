"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DownloadPage() {
 const [activeTab, setActiveTab] = useState("gui"); // 'gui' or 'cli'

 const jsonLd = {
 "@context": "https://schema.org",
 "@type": "WebPage",
 "name": "Download ProxyBase Client",
 "description": "Download ProxyBase native GUI or headless CLI daemon for Windows, macOS, and Linux to start sharing bandwidth.",
 "url": "https://proxybase.xyz/download"
 };

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />
 <Navbar />

 <div className="compare-page-root">
 {/* HERO */}
 <section className="compare-hero">
 <div className="hero-grid-overlay" />
 <div className="hero-glow-1" />
 <div className="hero-glow-2" />
 
 <div className="compare-hero-content">
 <div className="compare-badge">
 Client Downloads
 </div>
 <h1>Download ProxyBase</h1>
 <p className="hero-subtitle">
 Run a secure, sandboxed node on your device. Sell idle internet bandwidth and earn stablecoins automatically.
 </p>
 </div>
 </section>

 {/* DOWNLOAD SECTION */}
 <section className="compare-intro-section" id="downloads" style={{ paddingBottom: "120px" }}>
 <div className="download-tabs" style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "48px" }}>
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
 <div className="downloads-grid">
 <div className="download-card macos" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
 <div>
 <div className="os-header" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
 <span className="os-icon" style={{ fontSize: "2rem" }}>🍎</span>
 <div>
 <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800 }}>macOS (GUI)</h3>
 <p className="os-version" style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>v0.1.0 • Apple Silicon / Intel</p>
 </div>
 </div>
 <p className="os-desc" style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
 Beautiful native app featuring interactive active sessions map, wallet manager, real-time bandwidth logs, and local proxy gateway controller.
 </p>
 </div>
 <a 
 href="https://github.com/proxybasehq/proxybase-gui/releases/latest/download/ProxyBase_0.1.0_universal.dmg"
 className="btn-download"
 style={{ display: "block", textAlign: "center", background: "var(--accent-gradient)", color: "#ffffff", padding: "12px", borderRadius: "var(--radius-md)", fontWeight: 700, textDecoration: "none" }}
 >
 Download macOS .DMG
 </a>
 </div>

 <div className="download-card windows" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
 <div>
 <div className="os-header" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
 <span className="os-icon" style={{ fontSize: "2rem" }}>🪟</span>
 <div>
 <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800 }}>Windows (GUI)</h3>
 <p className="os-version" style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>v0.1.0 • Windows 10/11 x64</p>
 </div>
 </div>
 <p className="os-desc" style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
 Native Windows client built on light webview2 architecture. Features taskbar tray integration, automated startup settings, and wallet integration.
 </p>
 </div>
 <a 
 href="https://github.com/proxybasehq/proxybase-gui/releases/latest/download/ProxyBase_0.1.0_x64_en-US.msi"
 className="btn-download"
 style={{ display: "block", textAlign: "center", background: "var(--accent-gradient)", color: "#ffffff", padding: "12px", borderRadius: "var(--radius-md)", fontWeight: 700, textDecoration: "none" }}
 >
 Download Windows .MSI
 </a>
 </div>

 <div className="download-card linux" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
 <div>
 <div className="os-header" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
 <span className="os-icon" style={{ fontSize: "2rem" }}>🐧</span>
 <div>
 <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800 }}>Linux (GUI)</h3>
 <p className="os-version" style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>v0.1.0 • Debian / Ubuntu</p>
 </div>
 </div>
 <p className="os-desc" style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
 GTK3 bundle optimized for lightweight Linux desktop environments. Relays local traffic to SOCKS5 gateway with native system tray control panels.
 </p>
 </div>
 <a 
 href="https://github.com/proxybasehq/proxybase-gui/releases/latest/download/proxybase_0.1.0_amd64.deb"
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
 <div className="downloads-grid">
 <div className="download-card macos" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
 <div>
 <div className="os-header" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
 <span className="os-icon" style={{ fontSize: "2rem" }}>🍎</span>
 <div>
 <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800 }}>macOS (CLI)</h3>
 <p className="os-version" style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>v0.4.0 • Apple Silicon</p>
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
 Download macOS CLI
 </a>
 </div>

 <div className="download-card windows" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
 <div>
 <div className="os-header" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
 <span className="os-icon" style={{ fontSize: "2rem" }}>🪟</span>
 <div>
 <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800 }}>Windows (CLI)</h3>
 <p className="os-version" style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>v0.4.0 • PowerShell x64</p>
 </div>
 </div>
 <p className="os-desc" style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
 Compiled executable for background headless execution. Perfect for integration into Windows background services and automated scripts.
 </p>
 </div>
 <a 
 href="https://github.com/proxybasehq/proxybase-cli/releases/latest/download/proxybase-cli-x86_64-pc-windows-msvc.zip"
 className="btn-download"
 style={{ display: "block", textAlign: "center", background: "var(--accent-gradient)", color: "#ffffff", padding: "12px", borderRadius: "var(--radius-md)", fontWeight: 700, textDecoration: "none" }}
 >
 Download Windows CLI
 </a>
 </div>

 <div className="download-card linux" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
 <div>
 <div className="os-header" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
 <span className="os-icon" style={{ fontSize: "2rem" }}>🐧</span>
 <div>
 <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800 }}>Linux (CLI)</h3>
 <p className="os-version" style={{ margin: 0, fontSize: "0.75rem", color: "var(--text-muted)" }}>v0.4.0 • Linux x64</p>
 </div>
 </div>
 <p className="os-desc" style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "16px" }}>
 Headless background daemon for always-on servers, Linux VPS servers, homelabs, or headless NAS configurations.
 </p>
 <div className="cli-install-cmd" style={{ background: "var(--bg-secondary)", padding: "12px", borderRadius: "6px", fontFamily: "monospace", fontSize: "0.8rem", marginBottom: "20px", overflowX: "auto" }}>
 <code>docker run -d --name proxybase-node proxybase/node</code>
 </div>
 </div>
 <a 
 href="https://github.com/proxybasehq/proxybase-cli/releases/latest/download/proxybase-cli-x86_64-unknown-linux-musl.tar.gz"
 className="btn-download"
 style={{ display: "block", textAlign: "center", background: "var(--accent-gradient)", color: "#ffffff", padding: "12px", borderRadius: "var(--radius-md)", fontWeight: 700, textDecoration: "none" }}
 >
 Download Linux CLI
 </a>
 </div>
 </div>
 )}
 </section>
 </div>

 <Footer />
 </>
 );
}
