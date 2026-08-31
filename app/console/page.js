"use client";

import { useState } from "react";
import { useAuth } from "../lib/AuthContext";
import ConsoleLayout from "./ConsoleLayout";
import MarketTab from "./MarketTab";
import DepositsTab from "./DepositsTab";
import WalletTab from "./WalletTab";
import MakeMoneyTab from "./MakeMoneyTab";
import { Spinner } from "./ui";

export default function ConsolePage() {
  const { status, user, error, signIn, config } = useAuth();
  const [tab, setTab] = useState("market");

  if (status === "boot" || status === "signingIn") {
    return (
      <div className="console-root console-splash">
        <img src="/logo.svg" alt="ProxyBase" width="56" height="56" />
        <h1>ProxyBase v2 Console</h1>
        <Spinner label={status === "signingIn" ? "Signing in with Google…" : "Loading session…"} />
      </div>
    );
  }

  if (!user) {
    return <GateScreen onSignIn={signIn} error={error} demoMode={config?.demo_mode} />;
  }

  return (
    <ConsoleLayout tab={tab} setTab={setTab} error={error}>
      {tab === "market" && <MarketTab />}
      {tab === "deposits" && <DepositsTab />}
      {tab === "wallet" && <WalletTab />}
      {tab === "makemoney" && <MakeMoneyTab />}
    </ConsoleLayout>
  );
}

function GateScreen({ onSignIn, error, demoMode }) {
  return (
    <div className="console-root console-splash console-gate">
      <div className="console-gate-card">
        <img src="/logo.svg" alt="ProxyBase" width="48" height="48" />
        <h1>Sign in to the ProxyBase v2 Console</h1>
        <p>
          Buy rotating & sticky SOCKS5 proxies for your AI agents, fund with
          crypto, and manage sessions — all in your browser. Your wallet is
          stored encrypted on our backend and follows you across devices.
        </p>
        <button type="button" className="console-btn-google" onClick={onSignIn}>
          <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.9-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
            <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.7l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
          </svg>
          Continue with Google
        </button>
        {demoMode && (
          <p className="console-gate-note">
            Local development mode: this button signs you in with a demo Google
            account (Google OAuth env vars not configured).
          </p>
        )}
        {error && <p className="console-gate-error">⚠ {error}</p>}
        <p className="console-gate-foot">
          Google Sign-In is mandatory. Seller node features live in the CLI &
          Desktop app, not the web console.
        </p>
      </div>
    </div>
  );
}
