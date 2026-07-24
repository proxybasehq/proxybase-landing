"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ProxyBase Earning App",
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "description": "An earning app for effortless passive income. Turn your unused internet bandwidth into real cash securely. Open-source, KYC-free, $1 minimum payout.",
    "url": "https://proxybase.xyz",
    "image": "https://proxybase.xyz/logo.svg"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <FeaturedOn />
      <UntappedWealth />
      <HowItWorks />
      <EarningMechanics />
      <FeaturesList />
      <TipaltiAward />
      <RedditReviews />
      <Faq />
      <Footer />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════════════════ */

function Hero() {
  return (
    <section className="hero" id="hero" style={{ padding: "140px 24px 100px" }}>
      <div className="hero-bg">
        <div className="hero-grid" />
      </div>

      <div className="hero-content" style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div className="hero-badge">
          <span className="badge-dot" />
          ⚡ Get paid instantly — $1.00 minimum cashout
        </div>

        <h1>
          <span className="gradient-text">An Earning App for</span>
          <br />
          Effortless Passive Income
        </h1>

        <p className="hero-subtitle" style={{ maxWidth: "740px", margin: "0 auto 44px" }}>
          ProxyBase is a simple online money earning app that turns your unused internet bandwidth into real cash. Install it once, run it in the background, and earn money online without any active effort.
        </p>

        <div className="hero-actions" style={{ justifyContent: "center", marginBottom: "70px" }}>
          <a href="/download" className="btn-primary" data-umami-event="Hero: Download CTA" style={{ padding: "16px 36px", fontSize: "1.05rem" }}>
            Download App for Free
          </a>
          <a href="/earn/sell-internet" className="btn-secondary" data-umami-event="Hero: Learn Passive Link" style={{ padding: "16px 36px", fontSize: "1.05rem" }}>
            Learn How It Works →
          </a>
        </div>

        {/* HERO STATS GLASS BANNER */}
        <div className="hero-stats-glass">
          <div className="stat-glass-item">
            <div className="stat-glass-number">12M+</div>
            <div className="stat-glass-label">Active Users Worldwide</div>
          </div>
          <div className="stat-glass-item">
            <div className="stat-glass-number">1M+</div>
            <div className="stat-glass-label">Payouts Processed</div>
          </div>
          <div className="stat-glass-item">
            <div className="stat-glass-number">$27</div>
            <div className="stat-glass-label">Avg. Monthly Yield</div>
          </div>
          <div className="stat-glass-item">
            <div className="stat-glass-number">100%</div>
            <div className="stat-glass-label">Open-Source & Secure</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURED ON / TRUST LOGOS
   ═══════════════════════════════════════════════════════════════════════════ */

function FeaturedOn() {
  return (
    <section style={{ padding: "50px 24px", borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-secondary)", textAlign: "center" }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <p style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-muted)", marginBottom: "24px", fontWeight: 700 }}>
          Featured and Discussed In Top Tech & Finance Publications
        </p>
        <div className="trust-strip-container">
          <span className="trust-logo-pill">📰 Forbes</span>
          <span className="trust-logo-pill">🚀 Entrepreneur</span>
          <span className="trust-logo-pill">📈 Yahoo Finance</span>
          <span className="trust-logo-pill">📊 Benzinga</span>
          <span className="trust-logo-pill">💻 HackerNoon</span>
          <span className="trust-logo-pill">🌐 IBT News</span>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   UNTAPPED WEALTH EXPLAINER
   ═══════════════════════════════════════════════════════════════════════════ */

function UntappedWealth() {
  return (
    <section className="compare-intro-section" style={{ padding: "110px 24px" }}>
      <div className="section-header" style={{ textAlign: "center", marginBottom: "56px" }}>
        <span className="section-label">Passive Income Secret</span>
        <h2>Most People Don&apos;t Know They Can Sell Internet Data</h2>
        <p className="section-desc" style={{ maxWidth: "720px", margin: "0 auto" }}>
          You try app after app that promises easy money, only to end up watching ads or completing mindless tasks for a few cents. Hours of effort, and your balance barely moves.
        </p>
      </div>

      <div className="intro-card-grid-premium" style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <div className="card-premium">
          <span className="card-badge-pill badge-problem">⚠️ The Old Way</span>
          <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "16px" }}>Wasted Bandwidth & Scam Apps</h3>
          <p className="brand-desc" style={{ marginBottom: 24, fontSize: "0.95rem", lineHeight: 1.7 }}>
            Your unused internet bandwidth—the extra data your device isn’t using—can be shared securely and turned into actual earnings. It runs quietly in the background. Once set up, you don&apos;t need to lift a finger.
          </p>
          <ul className="brand-bullets" style={{ gap: 12 }}>
            <li>⚡ No quizzes. No games. No mindless tasks.</li>
            <li>⚡ Monetizes unused 4G, 5G, or Wi-Fi connections</li>
            <li>⚡ Quiet background execution, zero performance hit</li>
          </ul>
        </div>

        <div className="card-premium">
          <span className="card-badge-pill badge-solution">✨ The ProxyBase Way</span>
          <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "16px" }}>Autonomous Earning Node</h3>
          <p className="brand-desc" style={{ marginBottom: 24, fontSize: "0.95rem", lineHeight: 1.7 }}>
            ProxyBase lets you earn passively by sharing your connection with trusted enterprise partners. You stay in control at all times: we never access your personal files or search history. It&apos;s a fully encrypted yield system.
          </p>
          <ul className="brand-bullets" style={{ gap: 12 }}>
            <li>⚡ 100% open-source software (auditable code)</li>
            <li>⚡ Secure Yamux port sandboxing & encryption</li>
            <li>⚡ Low $1.00 cashout threshold in stablecoins</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   3 EASY STEPS
   ═══════════════════════════════════════════════════════════════════════════ */

function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works" style={{ borderTop: "1px solid var(--border-subtle)", padding: "110px 24px", background: "var(--bg-secondary)" }}>
      <div className="section-inner-container">
        <div className="section-header">
          <span className="section-label">Onboarding</span>
          <h2>How to Start Selling Bandwidth in 3 Steps</h2>
          <p className="section-desc">
            Begin earning online in under 5 minutes with zero technical knowledge required.
          </p>
        </div>

        <div className="steps-flow-3" style={{ marginTop: 60 }}>
          <div className="step-card" style={{ borderRadius: "var(--radius-xl)", padding: "44px 32px" }}>
            <div className="step-number">01</div>
            <h3>Get the App for Free</h3>
            <p>
              Download and install the native ProxyBase client on Windows, macOS, Linux, or Android. The app requires zero configuration.
            </p>
          </div>

          <div className="step-card" style={{ borderRadius: "var(--radius-xl)", padding: "44px 32px" }}>
            <div className="step-number">02</div>
            <h3>Share Your Bandwidth</h3>
            <p>
              Run the app quietly in the background. It will securely route client SOCKS5 queries through your idle connection.
            </p>
          </div>

          <div className="step-card" style={{ borderRadius: "var(--radius-xl)", padding: "44px 32px" }}>
            <div className="step-number">03</div>
            <h3>Get Paid Online</h3>
            <p>
              Accumulate microcredits and withdraw them instantly to your crypto wallet starting at just $1.00, or use PayPal at $20.00.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   EARNING MECHANICS
   ═══════════════════════════════════════════════════════════════════════════ */

function EarningMechanics() {
  return (
    <section className="compare-deepdive-section" style={{ borderTop: "1px solid var(--border-subtle)", padding: "110px 24px" }}>
      <div className="section-header">
        <span className="section-label">Earning Channels</span>
        <h2>Ways the Earning App Helps You Earn</h2>
        <p className="section-desc">Maximize your yield by stacking these automated earning mechanics together.</p>
      </div>

      <div className="mechanics-grid-premium">
        <div className="mechanic-card-premium">
          <div className="mechanic-icon-circle circle-blue">🌐</div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "12px", color: "var(--text-primary)" }}>Bandwidth Sharing</h3>
          <p style={{ fontSize: "0.925rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
            The core passive engine. Sell internet data automatically. There is no daily cap on how much bandwidth you can route or earn from.
          </p>
        </div>

        <div className="mechanic-card-premium">
          <div className="mechanic-icon-circle circle-emerald">✅</div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "12px", color: "var(--text-primary)" }}>Daily Task Bonus</h3>
          <p style={{ fontSize: "0.925rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
            Complete a simple daily check-in (share at least 5MB of traffic) to unlock up to +100,000 bonus credits on your dashboard.
          </p>
        </div>

        <div className="mechanic-card-premium">
          <div className="mechanic-icon-circle circle-purple">👥</div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "12px", color: "var(--text-primary)" }}>Referral Yields</h3>
          <p style={{ fontSize: "0.925rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
            Invite friends to join and earn a lifetime 25% bonus on their overall earnings. More active referrals mean faster cashouts.
          </p>
        </div>

        <div className="mechanic-card-premium">
          <div className="mechanic-icon-circle circle-amber">🏆</div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "12px", color: "var(--text-primary)" }}>Achievements</h3>
          <p style={{ fontSize: "0.925rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
            Unlock milestones (e.g. 10 days active, 100GB shared) to claim up to +500 bonus credits instantly.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   WHY CHOOSE PROXYBASE
   ═══════════════════════════════════════════════════════════════════════════ */

function FeaturesList() {
  return (
    <section className="compare-intro-section" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)", padding: "110px 24px" }}>
      <div className="section-header" style={{ textAlign: "center", marginBottom: "56px" }}>
        <span className="section-label">Benefits</span>
        <h2>Why Choose ProxyBase as Your Earning App</h2>
        <p className="section-desc" style={{ maxWidth: "720px", margin: "0 auto" }}>
          Engineered for ease of use, security, and high payouts, ProxyBase delivers a premium passive earning experience.
        </p>
      </div>

      <div className="intro-card-grid-premium" style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <div className="card-premium">
          <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span>⚙️</span> Runs Quietly in Background
          </h3>
          <p className="brand-desc" style={{ marginBottom: 0, fontSize: "0.95rem", lineHeight: 1.7 }}>
            Our client is lightweight (written in native Rust and Webview/Tauri). It uses negligible CPU/RAM and only routes traffic when your network is idle.
          </p>
        </div>

        <div className="card-premium">
          <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span>🖥️</span> Multi-Device Support
          </h3>
          <p className="brand-desc" style={{ marginBottom: 0, fontSize: "0.95rem", lineHeight: 1.7 }}>
            Connect multiple machines to the same wallet. Install the app on Android, Windows, macOS, and Linux to scale up your passive yield.
          </p>
        </div>

        <div className="card-premium">
          <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span>⚡</span> Quick Setup, No Skills Needed
          </h3>
          <p className="brand-desc" style={{ marginBottom: 0, fontSize: "0.95rem", lineHeight: 1.7 }}>
            Getting started takes less than three minutes. No coding, no port forwarding. If you can double-click a setup wizard, you can earn.
          </p>
        </div>

        <div className="card-premium">
          <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span>🛡️</span> Open-Source & Secure
          </h3>
          <p className="brand-desc" style={{ marginBottom: 0, fontSize: "0.95rem", lineHeight: 1.7 }}>
            Every byte relayed is fully sandboxed. Our open-source code ensures no private logs are monitored. Payouts are directly signed by your crypto key.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TIPALTI AWARD
   ═══════════════════════════════════════════════════════════════════════════ */

function TipaltiAward() {
  return (
    <section style={{ padding: "110px 24px", borderTop: "1px solid var(--border-subtle)" }}>
      <div className="tipalti-showcase-box">
        <div style={{ fontSize: "3.5rem", marginBottom: "20px" }}>🏆</div>
        <h2 style={{ fontSize: "2.1rem", fontWeight: 900, marginBottom: "20px", letterSpacing: "-0.02em" }}>
          Awarded for Seamless Online Earning Payouts
        </h2>
        <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "760px", margin: "0 auto 32px" }}>
          Our integration with Tipalti delivers smooth, secure, and reliable fiat payouts worldwide, while our web3 routing settlement provides instant stablecoin deposits. With millions of successful transactions, we make online earning simple, transparent, and accessible to everyone.
        </p>
        <div className="tipalti-methods-strip">
          <span className="method-pill">⚡ Instant Crypto Settlement</span>
          <span className="method-pill">💳 PayPal Payouts</span>
          <span className="method-pill">🏦 Global Bank Transfers</span>
          <span className="method-pill">🔒 100% Audited Security</span>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   REDDIT REVIEWS
   ═══════════════════════════════════════════════════════════════════════════ */

function RedditReviews() {
  const reviews = [
    {
      text: "Earned 2.6k credit for my first month which is pretty normal in the Philippines. No major issue faced, some occasional visual bug at the dashboard but earning is not affected. 10/10 ✨",
      user: "dontmindmeimacat",
      date: "1 month ago",
      upvotes: "184"
    },
    {
      text: "It depends on how patient you are, but earning around $20 every few months is realistic. It’s not life-changing, but a little extra money is better than none. Using a referral code also gives you a nice head start.",
      user: "darkmagician2904",
      date: "2 months ago",
      upvotes: "142"
    },
    {
      text: "ProxyBase is legit. It’s a passive income app so you will not earn big amounts fastly. If you want to increase your earnings use their referral scheme, participate in contests.",
      user: "natsumer",
      date: "3 weeks ago",
      upvotes: "96"
    },
    {
      text: "I have been using this App for like 2 years and i have earned $120 Using 5 devices. Yes, it is legit and depends on your location, and demands in your regions vary your earnings.",
      user: "no_pollution6213",
      date: "2 months ago",
      upvotes: "215"
    },
    {
      text: "Yes, I have earned a few bucks from this application. And you can too! Just remember don't expect to earn grands per month from it. It's a passive income app and at Max would help to pay a few subscriptions.",
      user: "ik_2494",
      date: "1 month ago",
      upvotes: "118"
    },
    {
      text: "A great app you can install on your computer/phone to get money by allowing the program to use your internet in its network in order to deliver content.",
      user: "Signal-Ad-5466",
      date: "3 weeks ago",
      upvotes: "89"
    }
  ];

  return (
    <section className="compare-deepdive-section" style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--bg-secondary)", padding: "110px 24px" }}>
      <div className="section-header">
        <span className="section-label">Community Talk</span>
        <h2>What People on Reddit Are Saying</h2>
        <p className="section-desc">Real stories from nodes sellers turning unused bandwidth into extra income.</p>
      </div>

      <div className="reddit-grid-premium">
        {reviews.map((rev, i) => (
          <div key={i} className="reddit-card-premium">
            <div>
              <div className="reddit-header">
                <div className="reddit-user-box">
                  <div className="reddit-avatar">u/</div>
                  <div>
                    <h4 style={{ fontSize: "0.9rem", fontWeight: 800, margin: 0, color: "var(--text-primary)" }}>u/{rev.user}</h4>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>• {rev.date}</span>
                  </div>
                </div>
                <div className="reddit-upvotes">⬆ {rev.upvotes}</div>
              </div>
              <div style={{ color: "#fbbf24", fontSize: "0.9rem", marginBottom: "14px", letterSpacing: "2px" }}>★★★★★</div>
              <p style={{ fontStyle: "italic", fontSize: "0.925rem", color: "var(--text-secondary)", lineHeight: 1.65, margin: 0 }}>
                &quot;{rev.text}&quot;
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════════════════════════════════ */

function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "What is the best app for earning money?",
      a: "ProxyBase is one of the top-rated apps to sell internet data and earn money passively. It is simple to install, fully open-source, and has a low $1 payout threshold compared to traditional $20 apps."
    },
    {
      q: "Is the ProxyBase app safe to run?",
      a: "Yes. ProxyBase only shares your unused bandwidth. We do not access your personal data, files, search history, or cookies. Our code is 100% open-source on GitHub, meaning you can audit it yourself."
    },
    {
      q: "Will this earning app slow down my internet connection?",
      a: "No. ProxyBase is designed to run silently and only routes traffic when your bandwidth is idle. You can also configure daily data usage limits or schedule the app inside your settings page."
    },
    {
      q: "Can I earn money from multiple devices?",
      a: "Yes! You can connect multiple devices (Android, Windows, macOS, Linux) to the same wallet. For optimal yield rates, run them on separate networks with distinct public IP addresses."
    }
  ];

  return (
    <section className="faq-section" id="faq" style={{ borderTop: "1px solid var(--border-subtle)", padding: "110px 24px" }}>
      <div className="section-inner-container">
        <div className="section-header">
          <span className="section-label">Support</span>
          <h2>Frequently Asked Questions</h2>
          <p className="section-desc">Common questions regarding passive bandwidth sharing on ProxyBase.</p>
        </div>

        <div className="faq-grid" style={{ marginTop: 48 }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq-item ${openIndex === i ? 'open' : ''}`}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              style={{ borderRadius: "var(--radius-lg)" }}
            >
              <div className="faq-question">
                <h3>{faq.q}</h3>
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
