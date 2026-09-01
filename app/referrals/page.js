import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Referral Program | ProxyBase",
  description:
    "Earn a 10-25% commission on your referees' deposits and bandwidth use. Referees get a +10% bonus on their first deposit. Claim anytime from the console.",
  alternates: {
    canonical: "/referrals",
  },
  openGraph: {
    title: "Referral Program | ProxyBase",
    description:
      "Earn a 10-25% commission on your referees' deposits and bandwidth use. Referees get a +10% bonus on their first deposit.",
    url: "https://proxybase.xyz/referrals",
  },
};

const h2Style = {
  color: "var(--text-primary)",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontSize: "1.8rem",
};
const pStyle = { marginBottom: "1rem" };
const thStyle = {
  textAlign: "left",
  padding: "0.5rem 0.75rem",
  borderBottom: "1px solid var(--border, #e5e7eb)",
  color: "var(--text-primary)",
};
const tdStyle = {
  padding: "0.6rem 0.75rem",
  borderBottom: "1px solid var(--border, #e5e7eb)",
  verticalAlign: "top",
};

export default function ReferralProgram() {
  return (
    <>
      <Navbar />
      <section className="section" style={{ minHeight: "80vh", paddingTop: "120px" }}>
        <div className="section-inner" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>
          <div className="section-header" style={{ textAlign: "left", alignItems: "flex-start" }}>
            <span className="section-label">Referral Program</span>
            <h1 className="section-title" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
              Earn credits from the people you invite
            </h1>
            <p className="section-desc" style={{ maxWidth: "100%", margin: 0, textAlign: "left" }}>
              You earn a commission on what your referees deposit and spend. They get a bonus on
              their first deposit. Both are credited automatically.
            </p>
          </div>

          <div className="terms-content" style={{ color: "var(--text-secondary)", lineHeight: "1.7", textAlign: "left" }}>
            <h2 style={h2Style}>What you earn</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
              <thead>
                <tr>
                  <th style={thStyle}>Who</th>
                  <th style={thStyle}>What they get</th>
                  <th style={thStyle}>When</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdStyle}>You</td>
                  <td style={tdStyle}>Commission at the rate you set (10-25%)</td>
                  <td style={tdStyle}>On every deposit your referee makes</td>
                </tr>
                <tr>
                  <td style={tdStyle}>You</td>
                  <td style={tdStyle}>Same rate on the platform share of their bandwidth purchases</td>
                  <td style={tdStyle}>On every proxy session they run</td>
                </tr>
                <tr>
                  <td style={tdStyle}>Your referee</td>
                  <td style={tdStyle}>+10% bonus on the deposit amount</td>
                  <td style={tdStyle}>On their first deposit</td>
                </tr>
              </tbody>
            </table>

            <h2 style={h2Style}>How it works</h2>
            <ol style={{ listStyleType: "decimal", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>
                Sign in to the console and open the Referrals tab.
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                Create a code (3-32 characters) and set your commission rate between 10% and 25%.
                The default is 15%.
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                Share your link. It looks like <code>proxybase.xyz/console?ref=yourcode</code>.
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                Opening the link saves your code in their browser. When they sign in and connect a
                wallet, the wallet links to you.
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                From then on, their deposits and bandwidth use generate your commission and their
                bonus on the ledger.
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                Claim your yield in the Referrals tab. It moves to your spendable balance, ready
                for your own proxy sessions.
              </li>
            </ol>

            <h2 style={h2Style}>A worked example</h2>
            <p style={pStyle}>
              Your referee makes a first deposit of $100. $10 gets added to their balance. At a
              15% rate, you get $15 of claimable yield.
            </p>
            <p style={pStyle}>
              They then spend $50 on bandwidth. Of that $50, the seller takes their share and
              ProxyBase keeps the rest as the platform spread. Your 15% applies to that spread,
              so sellers keep their full share and your referee pays the normal price.
            </p>
            <p style={pStyle}>
              Claim the $15 whenever you want. It lands in your spendable balance with no minimum
              and no lockup.
            </p>

            <h2 style={h2Style}>Rules</h2>
            <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", marginBottom: "1rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>One referrer per wallet. The first code a wallet uses sticks.</li>
              <li style={{ marginBottom: "0.5rem" }}>You can't refer yourself.</li>
              <li style={{ marginBottom: "0.5rem" }}>Commission rates run from 10% to 25%. Default is 15%.</li>
              <li style={{ marginBottom: "0.5rem" }}>Codes are 3-32 characters: lowercase letters, numbers, _ and -.</li>
              <li style={{ marginBottom: "0.5rem" }}>The +10% bonus applies to the first deposit only.</li>
              <li style={{ marginBottom: "0.5rem" }}>Commissions are tracked as claimable yield until you claim them.</li>
            </ul>

            <h2 style={h2Style}>Get started</h2>
            <p style={pStyle}>
              Open the console, create your code, and put the link wherever your audience is.
            </p>
            <a
              href="/console"
              className="btn-primary cta-border-glow"
              data-umami-event="Referral Page: Open Console"
              style={{ padding: "14px 32px", fontSize: "1rem", display: "inline-block", marginBottom: "4rem" }}
            >
              Open the console
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
