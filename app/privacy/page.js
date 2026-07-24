import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
 title: "Privacy Policy | ProxyBase",
 description:
 "ProxyBase Privacy Policy. Learn about our zero-KYC stance, data logging, traffic routing practices, and data retention policies for our AI proxy infrastructure.",
 alternates: {
 canonical: "/privacy",
 },
 openGraph: {
 title: "Privacy Policy | ProxyBase",
 description:
 "ProxyBase Privacy Policy zero-KYC registration, bandwidth logging, traffic routing privacy, and data retention policies.",
 url: "https://proxybase.xyz/privacy",
 },
};

export default function PrivacyPolicy() {
 return (
 <>
 <Navbar />
 <section className="section" style={{ minHeight: "80vh", paddingTop: "120px" }}>
 <div className="section-inner" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>
 <div className="section-header" style={{ textAlign: "left", alignItems: "flex-start" }}>
 <span className="section-label">Legal Stuff</span>
 <h1 className="section-title" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Privacy Policy</h1>
 <p className="section-desc" style={{ maxWidth: "100%", margin: 0, textAlign: "left" }}>
 Last updated: March 2026
 </p>
 </div>
 
 <div className="terms-content" style={{ color: "var(--text-secondary)", lineHeight: "1.7", textAlign: "left" }}>
 <h3 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem" }}>1. No KYC, No Identifiers</h3>
 <p style={{ marginBottom: "1rem" }}>
 ProxyBase is designed for autonomous AI agents and automated scraper swarms. Because we operate fully headless and machine-to-machine, we do not collect your name, email, billing address, or credit card information. 
 </p>
 <p style={{ marginBottom: "1rem" }}>
 You register and authenticate purely using generated Agent IDs and API keys. We have no interest in who you are, and we do not maintain database records linking your real-world identity to your proxy activity.
 </p>

 <h3 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem" }}>2. What We Collect and Log</h3>
 <p style={{ marginBottom: "1rem" }}>
 We log only the absolute minimum telemetry required to run the service, process micro-billings, and prevent network abuse:
 </p>
 <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
 <li style={{ marginBottom: "0.5rem" }}><strong>Bandwidth Consumption:</strong> We track bytes uploaded and bytes downloaded per API key. This is required to deduct bandwidth from your prepaid account.</li>
 <li style={{ marginBottom: "0.5rem" }}><strong>Session Timestamps:</strong> We record the start and end times of SOCKS5 connection tunnels to manage network load.</li>
 <li style={{ marginBottom: "0.5rem" }}><strong>Abuse Prevention Telemetry:</strong> We monitor connection frequencies and rate limits to block malicious activity, such as DDoS attacks, brute-forcing attempts, or credential stuffing.</li>
 </ul>

 <h3 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem" }}>3. Traffic Data & Encryption</h3>
 <p style={{ marginBottom: "1rem" }}>
 We operate SOCKS5 proxy endpoints. We do not decrypt, inspect, cache, or store the contents of your HTTP/HTTPS request bodies, response payloads, headers, or cookies. 
 </p>
 <p style={{ marginBottom: "1rem" }}>
 Our servers act as a blind transit pipe between your agent and the destination web servers. When your agents use TLS/HTTPS (which we highly recommend), the connection is encrypted end-to-end between your agent and the target server. We cannot read the traffic content even if we wanted to.
 </p>

 <h3 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem" }}>4. Cookies & Site Analytics</h3>
 <p style={{ marginBottom: "1rem" }}>
 The public ProxyBase landing page does not use invasive third-party tracking pixels, advertising identifiers, or marketing cookies. We host a self-hosted, privacy-respecting Umami analytics instance on our subdomain to count aggregate page views and generic UI clicks. This data contains no personally identifiable information.
 </p>

 <h3 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem" }}>5. Data Retention & Disclosures</h3>
 <p style={{ marginBottom: "1rem" }}>
 Because we store no personal identity records and delete temporary network transit logs on a short rolling cycle, we have no personal data to monetize, sell, or disclose. 
 </p>
 <p style={{ marginBottom: "1rem" }}>
 In the event that we receive a legally binding subpoena, court order, or warrant, we will comply. However, the only records we can provide are the bandwidth totals and transaction logs associated with a given Agent ID or API key.
 </p>

 <h3 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem" }}>6. Keeping Your Keys Safe</h3>
 <p style={{ marginBottom: "1rem" }}>
 Your <code style={{ background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: "4px" }}>PROXYBASE_API_KEY</code> is the sole mechanism controlling access to your account and prepaid bandwidth. If you lose it or it is exposed, anyone can use your bandwidth. We cannot recover lost keys or credit bandwidth spent from a compromised key.
 </p>
 </div>
 </div>
 </section>
 <Footer />
 </>
 );
}
