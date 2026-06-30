import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
    title: "ProxyBase Connector — Chrome Extension SOCKS5 Proxy Manager",
    description: "Manage your SOCKS5 proxy connection directly from Google Chrome. Configure multiple profiles, bypass lists, and toggle status instantly.",
    keywords: "proxybase connector, chrome extension proxy, SOCKS5 chrome manager, deepwalker llc, proxybase extension",
    alternates: {
        canonical: "/connector",
    },
};

export default function ConnectorPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "ProxyBase - Connector",
        "operatingSystem": "Chrome OS, Windows, macOS, Linux",
        "applicationCategory": "BrowserExtension",
        "description": "Manage your SOCKS5 proxy connection directly from Chrome with a single click. Configure profiles, bypass lists, and toggle connection status.",
        "url": "https://proxybase.xyz/connector",
        "downloadUrl": "https://chromewebstore.google.com/detail/proxybase-connector/acllphdfoaopinfglopmlgnbfochbfkc?authuser=0&hl=en",
        "softwareVersion": "1.0.0",
        "author": {
            "@type": "Organization",
            "name": "DEEPWALKER LLC"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />

            <div className="connector-page-root">
                {/* HERO */}
                <section className="connector-hero">
                    <div className="hero-grid-overlay" />
                    <div className="hero-glow-1" />
                    <div className="hero-glow-2" />
                    
                    <div className="connector-hero-content">
                        <div className="extension-badge">
                            <span className="badge-chrome-icon">🌐</span>
                            Official Chrome Extension
                        </div>
                        <h1>ProxyBase - Connector</h1>
                        <p className="hero-subtitle">
                            Configure your browser SOCKS5 proxy with profile support, multiple proxy types, and a beautiful UI. Manage your proxy connection with a single click directly from your toolbar.
                        </p>
                        <div className="hero-actions">
                            <a 
                                href="https://chromewebstore.google.com/detail/proxybase-connector/acllphdfoaopinfglopmlgnbfochbfkc?authuser=0&hl=en" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn-primary btn-extension-cta"
                            >
                                Add to Chrome — It's Free ⚡
                            </a>
                        </div>
                    </div>
                </section>

                {/* WHAT IT DOES / FEATURES */}
                <section className="connector-features-section">
                    <div className="section-header">
                        <span className="section-label">Core Capabilities</span>
                        <h2>Everything you need. Nothing you don't.</h2>
                        <p className="section-desc">ProxyBase Connector packs powerful routing rules into an interface that stays completely out of your way.</p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🖱️</div>
                            <h3>One-Click Toggle</h3>
                            <p>Enable or disable your active SOCKS5 proxy connection instantly from the extension toolbar popup without opening system menus.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">📁</div>
                            <h3>Multiple Profiles</h3>
                            <p>Save configurations for residential, mobile, or local proxies. Switch between them instantly without re-entering authentication credentials.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">🚷</div>
                            <h3>Per-Profile Bypass Lists</h3>
                            <p>Specify local domains, corporate intranets, or banking apps that should bypass the proxy entirely. Supports full wildcards (e.g. <code>*.local</code>).</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">🔄</div>
                            <h3>JSON Import & Export</h3>
                            <p>Easily back up your configurations or sync them across multiple machines. Import and export proxy credentials as standard encrypted JSON.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">🟢</div>
                            <h3>Visual Status Indicator</h3>
                            <p>A smart, animated connection indicator dot inside the popup and dynamic toolbar badge colors keep you updated on active sessions.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">🔒</div>
                            <h3>Local Storage Security</h3>
                            <p>Your passwords, proxy nodes, and configurations are securely isolated within Chrome's local storage sandbox.</p>
                        </div>
                    </div>
                </section>

                {/* HOW IT WORKS */}
                <section className="connector-steps-section">
                    <div className="section-header">
                        <span className="section-label">User Guide</span>
                        <h2>Get Connected in 4 Easy Steps</h2>
                        <p className="section-desc">No complex setups. Get your proxy configured and active inside Chrome in less than 30 seconds.</p>
                    </div>

                    <div className="steps-flow">
                        <div className="step-item">
                            <div className="step-number">1</div>
                            <div className="step-content">
                                <h3>Install the Extension</h3>
                                <p>Click the download CTA above and install the connector from the Chrome Web Store.</p>
                            </div>
                        </div>

                        <div className="step-item">
                            <div className="step-number">2</div>
                            <div className="step-content">
                                <h3>Create Your Profile</h3>
                                <p>Open the toolbar popup, input your SOCKS5 address, port, and authentication credentials.</p>
                            </div>
                        </div>

                        <div className="step-item">
                            <div className="step-number">3</div>
                            <div className="step-content">
                                <h3>Activate & Toggle On</h3>
                                <p>Select your preferred proxy profile as active, and flip the main toggle switch in the popup.</p>
                            </div>
                        </div>

                        <div className="step-item">
                            <div className="step-number">4</div>
                            <div className="step-content">
                                <h3>Browse Securely</h3>
                                <p>The extension icon badge turns green, indicating all Chrome requests are now routed safely.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PRIVACY & COMPLIANCE */}
                <section className="connector-privacy-section">
                    <div className="privacy-card-container">
                        <div className="privacy-header">
                            <span className="privacy-badge">🔒 Privacy First</span>
                            <h2>Your Browsing History is Yours Alone</h2>
                            <p>
                                ProxyBase Connector stores your proxy configuration strictly on your local machine using Chrome's local storage APIs. No telemetry is collected, and no network requests are ever sent to external analytical services.
                            </p>
                        </div>
                        <div className="privacy-grid">
                            <div className="privacy-detail-col">
                                <h4>Compliance & Legal Entity</h4>
                                <p>
                                    Developed by <strong>DEEPWALKER LLC</strong> (30 N Gould St #100, Sheridan, WY 82801). The developer has officially identified itself as a trader under the European Union regulations and complies fully with EU digital distribution rules.
                                </p>
                            </div>
                            <div className="privacy-detail-col">
                                <h4>Data Declarations</h4>
                                <ul>
                                    <li>❌ Not sold or transferred to any third party entities.</li>
                                    <li>❌ Not used or transferred for purposes unrelated to proxy configuration.</li>
                                    <li>❌ Never used to evaluate creditworthiness or for lending.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
