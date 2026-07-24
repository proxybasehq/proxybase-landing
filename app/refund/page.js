import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
 title: "Refund Policy | ProxyBase",
 description:
 "ProxyBase Refund Policy. Understand our crypto-first payment terms, underpayment/overpayment rules, and support dispute resolution procedures.",
 alternates: {
 canonical: "/refund",
 },
 openGraph: {
 title: "Refund Policy | ProxyBase",
 description:
 "ProxyBase Refund Policy crypto payments, final sales, underpayment/overpayment rules, and dispute resolution.",
 url: "https://proxybase.xyz/refund",
 },
};

export default function RefundPolicy() {
 return (
 <>
 <Navbar />
 <section className="section" style={{ minHeight: "80vh", paddingTop: "120px" }}>
 <div className="section-inner" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>
 <div className="section-header" style={{ textAlign: "left", alignItems: "flex-start" }}>
 <span className="section-label">Legal Stuff</span>
 <h1 className="section-title" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Refund Policy</h1>
 <p className="section-desc" style={{ maxWidth: "100%", margin: 0, textAlign: "left" }}>
 Last updated: March 2026
 </p>
 </div>
 
 <div className="terms-content" style={{ color: "var(--text-secondary)", lineHeight: "1.7", textAlign: "left" }}>
 <h3 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem" }}>1. Crypto Payments & Final Sales</h3>
 <p style={{ marginBottom: "1rem" }}>
 ProxyBase is a crypto-first platform built for machine-to-machine transactions. We accept stablecoins and other supported crypto tokens via the Micropayments Protocol (MPP). 
 </p>
 <p style={{ marginBottom: "1rem" }}>
 Because blockchain transactions are immutable, irreversible, and fee-bearing, <strong>all bandwidth purchases and payments are final</strong>. We do not support credit card chargebacks, bank transfers, or automated return-to-sender transactions.
 </p>

 <h3 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem" }}>2. Underpayments & Overpayments</h3>
 <p style={{ marginBottom: "1rem" }}>
 Our payment gateway is fully automated. When your agent initiates a purchase, it must broadcast the exact amount specified by the invoice:
 </p>
 <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
 <li style={{ marginBottom: "0.5rem" }}><strong>Underpayments:</strong> If your agent sends less than the invoiced amount (e.g., $9.90 instead of $10.00), the network will wait in a pending state. Bandwidth will not be provisioned until the remaining balance is paid.</li>
 <li style={{ marginBottom: "0.5rem" }}><strong>Overpayments:</strong> If your agent sends more than the invoiced amount, the system will automatically credit your account with the proportional amount of additional bandwidth. We do not return the difference.</li>
 </ul>

 <h3 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem" }}>3. Provisioning Failures & Manual Relief</h3>
 <p style={{ marginBottom: "1rem" }}>
 If you experience a technical failure where your transaction is confirmed on-chain but the corresponding proxy package or bandwidth is not credited to your Agent ID, we will fix it.
 </p>
 <p style={{ marginBottom: "1rem" }}>
 Please email us at <a href="mailto:humanshere@proxybase.xyz" style={{ color: "var(--accent-primary)", textDecoration: "none" }}>humanshere@proxybase.xyz</a> within 14 days of the transaction. You must include:
 </p>
 <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
 <li style={{ marginBottom: "0.5rem" }}>Your Agent ID / API Key</li>
 <li style={{ marginBottom: "0.5rem" }}>The transaction signature or hash</li>
 <li style={{ marginBottom: "0.5rem" }}>The blockchain network used (e.g., Solana)</li>
 </ul>
 <p style={{ marginBottom: "1rem" }}>
 Upon verifying the on-chain receipt, we will manually provision your bandwidth or, if a resolution is not possible, execute a manual crypto return to the originating wallet address.
 </p>

 <h3 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem" }}>4. No Refunds for Abuse Blocks</h3>
 <p style={{ marginBottom: "1rem" }}>
 We enforce a strict Acceptable Use Policy. If our automated network security filters or administrators detect that your API key is being used for DDoS attacks, credential stuffing, carding, or other illegal/malicious activities, your account will be immediately terminated and blacklisted.
 </p>
 <p style={{ marginBottom: "1rem" }}>
 <strong>Under no circumstances will refunds, credits, or returns be issued for accounts or keys blocked due to abuse.</strong>
 </p>

 <h3 style={{ color: "var(--text-primary)", marginTop: "2.5rem", marginBottom: "1rem" }}>5. Start Small</h3>
 <p style={{ marginBottom: "1rem" }}>
 Because transactions are non-refundable, we strongly recommend that developers and agents test their integration and connection latencies using our smallest packages (e.g., the $1 or $5 starter plans) before committing to larger bandwidth purchases.
 </p>
 </div>
 </div>
 </section>
 <Footer />
 </>
 );
}
