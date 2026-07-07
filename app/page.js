"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
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
    <section className="hero" id="hero" style={{ paddingBottom: "60px" }}>
      <div className="hero-bg">
        <div className="hero-grid" />
      </div>

      <div className="hero-content" style={{ maxWidth: "900px" }}>
        <div className="hero-badge">
          <span className="badge-dot" />
          Get paid instantly at $1.00 minimum
        </div>

        <h1>
          <span className="gradient-text">An Earning App for</span>
          <br />
          Effortless Passive Income
        </h1>

        <p className="hero-subtitle" style={{ maxWidth: "720px", margin: "0 auto 40px" }}>
          ProxyBase is a simple online money earning app that turns your unused internet bandwidth into real cash. Install it once, run it in the background, and earn money online without any active effort.
        </p>

        <div className="hero-actions" style={{ justifyContent: "center", marginBottom: "60px" }}>
          <a href="/markets#downloads" className="btn-primary" data-umami-event="Hero: Download CTA">
            Download App for Free
          </a>
          <a href="/earn/passive-income" className="btn-secondary" data-umami-event="Hero: Learn Passive Link">
            Learn How It Works →
          </a>
        </div>

        {/* HERO STATS */}
        <div className="hero-stats-grid">
          <div>
            <h3 style={{ fontSize: "2rem", color: "var(--accent-secondary)", fontWeight: 900, marginBottom: "4px" }}>12M+</h3>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}>Users Worldwide</p>
          </div>
          <div>
            <h3 style={{ fontSize: "2rem", color: "var(--accent-secondary)", fontWeight: 900, marginBottom: "4px" }}>1M+</h3>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}>Payouts Completed</p>
          </div>
          <div>
            <h3 style={{ fontSize: "2rem", color: "var(--accent-secondary)", fontWeight: 900, marginBottom: "4px" }}>$27</h3>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}>Avg. Payout Sum</p>
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
    <section style={{ padding: "30px 24px", borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-secondary)", textAlign: "center" }}>
      <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
        <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "20px", fontWeight: 700 }}>
          Featured and Discussed In
        </p>
        <div className="featured-logos">
          <span style={{ fontSize: "1.1rem", fontWeight: "900", color: "var(--text-primary)" }}>Forbes</span>
          <span style={{ fontSize: "1.1rem", fontWeight: "900", color: "var(--text-primary)" }}>Entrepreneur</span>
          <span style={{ fontSize: "1.1rem", fontWeight: "900", color: "var(--text-primary)" }}>Yahoo Finance</span>
          <span style={{ fontSize: "1.1rem", fontWeight: "900", color: "var(--text-primary)" }}>Benzinga</span>
          <span style={{ fontSize: "1.1rem", fontWeight: "900", color: "var(--text-primary)" }}>Hackernoon</span>
          <span style={{ fontSize: "1.1rem", fontWeight: "900", color: "var(--text-primary)" }}>IBT</span>
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
    <section className="compare-intro-section" style={{ padding: "80px 24px" }}>
      <div className="section-header" style={{ textAlign: "center", marginBottom: "48px" }}>
        <span className="section-label">Passive Income Secret</span>
        <h2>Most People Don't Know They Can Sell Internet Data</h2>
        <p className="section-desc" style={{ maxWidth: "700px", margin: "0 auto" }}>
          You try app after app that promises easy money, only to end up watching ads or completing mindless tasks for a few cents. Hours of effort, and your balance barely moves.
        </p>
      </div>

      <div className="intro-card-grid">
        <div className="intro-card pb-card">
          <div className="card-brand-header">
            <span className="brand-logo-dot active" />
            <h3>Idle Internet is a Resource</h3>
          </div>
          <p className="brand-desc">
            Your unused internet bandwidth—the extra data your device isn’t using—can be shared securely and turned into actual earnings. It runs quietly in the background. Once set up, you don't need to lift a finger.
          </p>
          <ul className="brand-bullets">
            <li>⚡ No quizzes. No games. No tasks.</li>
            <li>⚡ Monetizes unused 4G, 5G, or Wi-Fi data</li>
            <li>⚡ Quiet background execution, no performance hit</li>
          </ul>
        </div>

        <div className="intro-card ir-card">
          <div className="card-brand-header">
            <span className="brand-logo-dot legacy" />
            <h3>ProxyBase Earning Node</h3>
          </div>
          <p className="brand-desc">
            ProxyBase lets you earn passively by sharing your connection with trusted partners. You stay in control at all times: we never access your personal files or search history. It&apos;s a fully open-source, encrypted yield system.
          </p>
          <ul className="brand-bullets">
            <li>⚡ 100% open-source software (auditable code)</li>
            <li>⚡ Secure Yamux port sandboxing</li>
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
    <section className="how-it-works" id="how-it-works" style={{ borderTop: "1px solid var(--border-subtle)", padding: "80px 24px" }}>
      <div className="section-inner-container">
        <div className="section-header">
          <span className="section-label">Onboarding</span>
          <h2>How to Start Selling Bandwidth in 3 Steps</h2>
          <p className="section-desc">
            Begin earning online in under 5 minutes with zero technical knowledge required.
          </p>
        </div>

        <div className="steps-flow-3">
          <div className="step-card">
            <div className="step-num">01</div>
            <h3>Get the App for Free</h3>
            <p>
              Download and install the native ProxyBase client on Windows, macOS, Linux, or Android. The app requires zero configuration.
            </p>
          </div>

          <div className="step-card">
            <div className="step-num">02</div>
            <h3>Share Your Bandwidth</h3>
            <p>
              Run the app quietly in the background. It will securely route client SOCKS5 queries through your idle connection.
            </p>
          </div>

          <div className="step-card">
            <div className="step-num">03</div>
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
    <section className="compare-deepdive-section" style={{ borderTop: "1px solid var(--border-subtle)" }}>
      <div className="section-header">
        <span className="section-label">Earning Channels</span>
        <h2>Ways the Earning App Helps You Earn</h2>
        <p className="section-desc">Maximize your yield by stacking these automated earning mechanics together.</p>
      </div>

      <div className="deepdive-grid">
        <div className="deepdive-card">
          <div className="icon-wrapper">🌐</div>
          <h3>Bandwidth Sharing</h3>
          <p>
            The core passive engine. Sell internet data automatically. There is no daily cap on how much bandwidth you can route or earn from.
          </p>
        </div>

        <div className="deepdive-card">
          <div className="icon-wrapper">✅</div>
          <h3>Daily Task Bonus</h3>
          <p>
            Complete a simple daily check-in (share at least 5MB of traffic) to unlock up to +100,000 bonus credits on your dashboard.
          </p>
        </div>

        <div className="deepdive-card">
          <div className="icon-wrapper">👥</div>
          <h3>Referral Yields</h3>
          <p>
            Invite friends to join and earn a lifetime 25% bonus on their overall earnings. More active referrals mean faster cashouts.
          </p>
        </div>

        <div className="deepdive-card">
          <div className="icon-wrapper">🏆</div>
          <h3>Achievements</h3>
          <p>
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
    <section className="compare-intro-section" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}>
      <div className="section-header" style={{ textAlign: "center", marginBottom: "48px" }}>
        <span className="section-label">Benefits</span>
        <h2>Why Choose ProxyBase as Your Earning App</h2>
        <p className="section-desc" style={{ maxWidth: "700px", margin: "0 auto" }}>
          Engineered for ease of use, security, and high payouts, ProxyBase delivers a premium passive earning experience.
        </p>
      </div>

      <div className="intro-card-grid">
        <div className="intro-card" style={{ background: "var(--bg-card)" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "16px" }}>⚙️ Runs Quietly in the Background</h3>
          <p className="brand-desc" style={{ marginBottom: 0 }}>
            Our client is lightweight (written in native Rust and Webview/Tauri). It uses negligible CPU/RAM and only routes traffic when your network is idle.
          </p>
        </div>

        <div className="intro-card" style={{ background: "var(--bg-card)" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "16px" }}>🖥️ Works on Multiple Devices</h3>
          <p className="brand-desc" style={{ marginBottom: 0 }}>
            Connect multiple machines to the same wallet. Install the app on Android, Windows, macOS, and Linux to scale up your passive yield.
          </p>
        </div>

        <div className="intro-card" style={{ background: "var(--bg-card)" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "16px" }}>⚡ Quick Setup, No Skills Required</h3>
          <p className="brand-desc" style={{ marginBottom: 0 }}>
            Getting started takes less than three minutes. No coding, no port forwarding. If you can double-click a setup wizard, you can earn.
          </p>
        </div>

        <div className="intro-card" style={{ background: "var(--bg-card)" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "16px" }}>🛡️ Open-Source & Cryptographically Secure</h3>
          <p className="brand-desc" style={{ marginBottom: 0 }}>
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
    <section style={{ padding: "80px 24px", borderTop: "1px solid var(--border-subtle)" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", background: "linear-gradient(180deg, rgba(37, 99, 235, 0.03) 0%, rgba(255, 255, 255, 0) 100%)", border: "1px solid rgba(37, 99, 235, 0.15)", borderRadius: "var(--radius-xl)", padding: "48px 32px", boxShadow: "0 10px 30px rgba(37, 99, 235, 0.02)" }}>
        <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🏆</div>
        <h2 style={{ fontSize: "1.85rem", fontWeight: 900, marginBottom: "16px", letterSpacing: "-0.02em" }}>
          Awarded for Seamless Online Earning Payouts
        </h2>
        <p style={{ fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 24 }}>
          Our integration with Tipalti delivers smooth, secure, and reliable fiat payouts worldwide, while our web3 routing settlement provides instant stablecoin deposits. With millions of successful transactions, we make online earning simple, transparent, and accessible to everyone.
        </p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(37, 99, 235, 0.08)", border: "1px solid rgba(37, 99, 235, 0.2)", borderRadius: "99px", padding: "6px 16px", fontSize: "0.85rem", fontWeight: 700, color: "var(--accent-primary)" }}>
          ⚡ Powered by Tipalti & Web3 Instant Settlement
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
      date: "Reddit User"
    },
    {
      text: "It depends on how patient you are, but earning around $20 every few months is realistic. It’s not life-changing, but a little extra money is better than none. Using a referral code also gives you a nice head start.",
      user: "darkmagician2904",
      date: "Reddit User"
    },
    {
      text: "ProxyBase is legit. It’s a passive income app so you will not earn big amounts fastly. If you want to increase your earnings use their referral scheme, participate in contests.",
      user: "natsumer",
      date: "Reddit User"
    },
    {
      text: "I have been using this App for like 2 years and i have earned $120 Using 5 devices. Yes, it is legit and depends on your location, and demands in your regions vary your earnings.",
      user: "no_pollution6213",
      date: "Reddit User"
    },
    {
      text: "Yes, I have earned a few bucks from this application. And you can too! Just remember don't expect to earn grands per month from it. It's a passive income app and at Max would help to pay a few subscriptions.",
      user: "ik_2494",
      date: "Reddit User"
    },
    {
      text: "A great app you can install on your computer/phone to get money by allowing the program to use your internet in its network in order to deliver content.",
      user: "Signal-Ad-5466",
      date: "Reddit User"
    }
  ];

  return (
    <section className="compare-deepdive-section" style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--bg-secondary)" }}>
      <div className="section-header">
        <span className="section-label">Community Talk</span>
        <h2>What People on Reddit are Saying</h2>
        <p className="section-desc">Real stories from nodes sellers turning unused bandwidth into extra income.</p>
      </div>

      <div className="deepdive-grid">
        {reviews.map((rev, i) => (
          <div key={i} className="deepdive-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <p style={{ fontStyle: "italic", fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 20 }}>
              &quot;{rev.text}&quot;
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--accent-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700 }}>u/</div>
              <div>
                <h4 style={{ fontSize: "0.85rem", fontWeight: 800, margin: 0 }}>/{rev.user}</h4>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{rev.date}</span>
              </div>
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
    <section className="faq-section" id="faq" style={{ borderTop: "1px solid var(--border-subtle)" }}>
      <div className="section-inner-container">
        <div className="section-header">
          <span className="section-label">Support</span>
          <h2>Frequently Asked Questions</h2>
          <p className="section-desc">Common questions regarding passive bandwidth sharing on ProxyBase.</p>
        </div>

        <div className="faq-grid">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq-item ${openIndex === i ? 'open' : ''}`}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
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
