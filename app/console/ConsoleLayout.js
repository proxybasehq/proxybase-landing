"use client";

import { useAuth } from "../lib/AuthContext";
import { formatUsd, microcreditsToUsd, shortAddress } from "../lib/walletCrypto";
import { useCopy } from "./ui";

const TABS = [
  { value: "market", label: "⚡ Market & Buyer", hint: "Catalog · Buy · Sessions" },
  { value: "deposits", label: "💰 Balances & Deposits", hint: "Ledger · Invoices" },
  { value: "wallet", label: "🔑 Wallet & Keystore", hint: "Backup · Export · Reset" },
];

export default function ConsoleLayout({ tab, setTab, error, children }) {
  const { user, wallet, balance, signOut, theme, toggleTheme } = useAuth();
  const { copy, isCopied } = useCopy();

  return (
    <div className="console-root">
      <header className="console-header">
        <div className="console-brand">
          <img src="/logo.svg" alt="ProxyBase" className="console-brand-logo" />
          <span className="console-brand-name">ProxyBase</span>
          <span className="console-brand-badge">v2 Console</span>
        </div>

        <div className="console-header-right">
          {wallet && (
            <button
              type="button"
              className="console-pill console-addr-pill"
              title={wallet.address}
              onClick={() => copy(wallet.address)}
            >
              <span className="console-pill-icon">◈</span>
              {isCopied(wallet.address) ? "copied ✓" : shortAddress(wallet.address)}
            </button>
          )}
          {balance && (
            <div className="console-pill console-balance-pill">
              <span className="console-pill-icon">◆</span>
              <strong>{formatUsd(microcreditsToUsd(balance.spendable_balance))}</strong>
              <button
                type="button"
                className="console-btn console-btn-mini console-btn-glow"
                onClick={() => setTab("deposits")}
              >
                + Deposit
              </button>
            </div>
          )}
          {user && (
            <div className="console-user" title={user.email}>
              {user.avatar ? (
                <img src={user.avatar} alt="" className="console-avatar" />
              ) : (
                <span className="console-avatar console-avatar-initial">
                  {(user.name || user.email || "?").slice(0, 1).toUpperCase()}
                </span>
              )}
              <span className="console-user-name">{user.name}</span>
            </div>
          )}
          <button
            type="button"
            className="console-btn console-btn-ghost console-theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <button type="button" className="console-btn console-btn-ghost" onClick={signOut}>
            Sign out
          </button>
        </div>
      </header>

      <nav className="console-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.value}
            type="button"
            role="tab"
            aria-selected={tab === t.value}
            className={`console-tab-btn ${tab === t.value ? "selected" : ""}`}
            onClick={() => setTab(t.value)}
          >
            <span className="console-tab-label">{t.label}</span>
            <span className="console-tab-hint">{t.hint}</span>
          </button>
        ))}
      </nav>

      <main className="console-main">
        {error && (
          <div className="console-notice notice-error">
            <span>⚠ {error}</span>
          </div>
        )}
        {children}
      </main>

      <footer className="console-footer">
        Seller node features are intentionally absent from the web UI — run a
        seller relay with the ProxyBase CLI or Desktop app.
      </footer>
    </div>
  );
}
