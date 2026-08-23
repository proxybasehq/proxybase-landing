import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";

export const metadata = {
 title: "HD Wallets: Run a Seller Fleet From One Seed Phrase | ProxyBase",
 description:
 "Run a seller fleet from a single master seed phrase. The ProxyBase CLI now derives a distinct BIP-44 wallet per node, sweeps earnings fleet-wide, and ships Kubernetes and Compose manifests.",
 alternates: {
 canonical: "/blog/hd-wallets-seller-fleets",
 },
 openGraph: {
 title: "HD Wallets: Run a Seller Fleet From One Seed Phrase | ProxyBase",
 description:
 "Run a seller fleet from a single master seed phrase. The ProxyBase CLI now derives a distinct BIP-44 wallet per node, sweeps earnings fleet-wide, and ships Kubernetes and Compose manifests.",
 url: "https://proxybase.xyz/blog/hd-wallets-seller-fleets",
 type: "article",
 },
};

export default function HDWalletsSellerFleets() {
 return (
 <>
 <Navbar />

 <article className="section" style={{ minHeight: "80vh", paddingTop: "120px", paddingBottom: "80px" }}>
 <div className="section-inner" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>

 <div className="blog-breadcrumbs" style={{ marginBottom: "2rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
 <Link href="/" style={{ color: "var(--accent-primary)", textDecoration: "none" }}>Home</Link>
 <span style={{ margin: "0 8px" }}>/</span>
 <Link href="/blog" style={{ color: "var(--accent-primary)", textDecoration: "none" }}>Blog</Link>
 <span style={{ margin: "0 8px" }}>/</span>
 <span>HD Wallets for Seller Fleets</span>
 </div>

 <div className="section-header" style={{ textAlign: "left", alignItems: "flex-start", marginBottom: "3rem" }}>
 <span className="section-label">Seller Infrastructure</span>
 <h1 className="section-title" style={{ fontSize: "2.8rem", marginBottom: "1rem", lineHeight: "1.2" }}>
 HD Wallets: Run a Seller Fleet From One Seed Phrase
 </h1>
 <div className="author-meta" style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
 <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--accent-primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "#000", fontWeight: "bold" }}>
 P
 </div>
 <div>
 <div style={{ fontWeight: "600", color: "var(--text-primary)" }}>ProxyBase Team</div>
 <div>August 2026 • 5 min read</div>
 </div>
 </div>
 </div>

 <div className="blog-content" style={{ color: "var(--text-secondary)", lineHeight: "1.8", fontSize: "1.1rem" }}>
 <p style={{ marginBottom: "1.5rem" }}>
 ProxyBase v2 allows one active WebSocket connection per wallet address. That constraint is fine for a single node, but it breaks the moment you run the same seller image on a second machine with the same wallet. Two containers, one address, and each handshake kicks the other offline. The standard workaround is a separate wallet per node, which means another seed phrase to store and a pile of addresses to consolidate by hand.
 </p>

 <p style={{ marginBottom: "2.5rem" }}>
 Today the CLI ships HD wallets. Give every node the same master phrase and a different index, and each one derives a different address, using the same BIP-44 path Ethereum wallets use: <code className="inline-code">m/44&apos;/60&apos;/0&apos;/0/&#123;index&#125;</code>. Index 0 is one address, index 1 another. One phrase backs up the entire fleet, and a replacement container with the same index re-derives the same identity and picks up the earnings it left behind.
 </p>

 <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "var(--text-primary)", marginTop: "3rem", marginBottom: "1.5rem" }}>
 The Derivation Math
 </h2>
 <p style={{ marginBottom: "2.5rem" }}>
 The math is standard: PBKDF2 turns the phrase into a 64-byte seed, HMAC-SHA512 walks the hardened path components, and the address is the last 20 bytes of keccak256 of the public key. The implementation in libproxybase is pinned by tests against the official BIP-32 test vectors, and index 0 of the canonical <code className="inline-code">abandon ... about</code> test phrase derives <code className="inline-code">0x9858EfFD232B4033E47d90003D41EC34EcaEda94</code>, the same address every other Ethereum wallet produces.
 </p>

 <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "var(--text-primary)", marginTop: "3rem", marginBottom: "1.5rem" }}>
 Using It
 </h2>

 <div className="cli-install-cmd" style={{ whiteSpace: "pre-wrap", padding: "1.5rem", borderRadius: "8px", background: "var(--bg-code)", color: "#a5b4fc", fontFamily: "monospace", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
 {`proxybase-cli wallet import "<master phrase>" --hd-index 3
proxybase-cli login`}
 </div>

 <p style={{ marginBottom: "2.5rem" }}>
 Import with <code className="inline-code">--hd-index</code> and you get the child wallet at that index. Without the flag, import keeps the legacy raw-seed derivation. Same phrase, different address. The split is deliberate, so existing wallets keep their existing addresses and balances.
 </p>

 <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "var(--text-primary)", marginTop: "3rem", marginBottom: "1.5rem" }}>
 Running a Fleet in Containers
 </h2>
 <p style={{ marginBottom: "1.5rem" }}>
 The Docker image entrypoint now runs in HD mode whenever <code className="inline-code">MASTER_MNEMONIC</code> is set. The node index resolves in three steps: <code className="inline-code">PROXYBASE_HD_INDEX</code> if you set it, otherwise the trailing number in the hostname, which makes Kubernetes StatefulSet ordinals work with no configuration (<code className="inline-code">proxybase-seller-4</code> is index 4), otherwise a cksum of the hostname modulo 10000 for ad-hoc runners. The entrypoint derives the child key, logs in, and launches the seller. Leave the mnemonic unset and it falls back to the old bootstrap, so existing deployments are untouched.
 </p>

 <p style={{ marginBottom: "2.5rem" }}>
 Mount the state directory as a tmpfs (<code className="inline-code">emptyDir</code> with <code className="inline-code">medium: Memory</code> in Kubernetes, <code className="inline-code">tmpfs</code> in Compose) and keys and session tokens never reach disk. A dead node comes back with the same index and the same identity. Ready-made manifests live in the CLI repo under <code className="inline-code">deploy/</code>: a StatefulSet and a Compose file. The StatefulSet starts at 10 replicas and scales with <code className="inline-code">kubectl scale statefulset proxybase-seller --replicas=100</code>. Pods update in reverse ordinal order and a replacement starts only after its ordinal has fully terminated, so no wallet ever has two live connections during an upgrade.
 </p>

 <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "var(--text-primary)", marginTop: "3rem", marginBottom: "1.5rem" }}>
 Sweeping Earnings
 </h2>
 <p style={{ marginBottom: "1.5rem" }}>
 Earnings accrue per address, so you need to consolidate them. The new sweep command walks a range of indices, derives each key in memory, signs the auth challenge, and creates a payout for every child whose available earnings clear the threshold (1,000,000 microcredits is $1.00):
 </p>

 <div className="cli-install-cmd" style={{ whiteSpace: "pre-wrap", padding: "1.5rem", borderRadius: "8px", background: "var(--bg-code)", color: "#a5b4fc", fontFamily: "monospace", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
 {`proxybase-cli wallet sweep "<master phrase>" \\
  --start-index 0 --count 100 \\
  --target-tempo 0x71C... \\
  --min-threshold 1000000`}
 </div>

 <p style={{ marginBottom: "2.5rem" }}>
 Your on-disk wallet and session token are not touched. <code className="inline-code">deploy/fleet-sweep.sh</code> wraps the command for cron. The sweep reads <code className="inline-code">/v2/wallet/balance</code>, not <code className="inline-code">/v2/seller/status</code>. Seller status only reports earnings for nodes currently connected to the seller pool, so an offline child would have read as zero and missed its payout. The ledger endpoint returns <code className="inline-code">seller_available</code> regardless of connection state. That was a bug in the first cut and it is fixed.
 </p>

 <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "var(--text-primary)", marginTop: "3rem", marginBottom: "1.5rem" }}>
 Healthchecks
 </h2>
 <p style={{ marginBottom: "2.5rem" }}>
 The image healthcheck also changed. It now requires the backend to be reachable and the local seller process to be alive. Tunnel liveness stays out of it on purpose: the reconnect loop heals dead tunnels, and restarting a container over a transient drop would only churn the seller pool.
 </p>

 <p style={{ marginBottom: "2.5rem" }}>
 The full write-up, including the security practices we recommend, is in the CLI repo (<code className="inline-code">docs/HD_WALLETS.md</code>). If you run more than one seller node, this removes the last reason to hand-manage wallets.
 </p>

 <div style={{ background: "rgba(37, 99, 235, 0.05)", borderLeft: "4px solid var(--accent-primary)", padding: "1.5rem", borderRadius: "0 8px 8px 0", margin: "2.5rem 0" }}>
 <p style={{ margin: 0, fontWeight: "600", color: "var(--text-primary)" }}>
 Deploy your fleet with one seed phrase. Sign up for ProxyBase and scale seller nodes across servers, residential gateways, and Kubernetes without managing per-node wallets.
 </p>
 </div>

 <div style={{ display: "flex", gap: "16px", marginTop: "3rem" }}>
 <Link href="/ai-agents#pricing" className="btn-primary" style={{ textDecoration: "none" }}>Get API Key Now</Link>
 <Link href="/markets" className="btn-secondary" style={{ textDecoration: "none" }}>ProxyBase Markets</Link>
 </div>

 </div>

 </div>
 </article>

 <Footer />
 </>
 );
}
