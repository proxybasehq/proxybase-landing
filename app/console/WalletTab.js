"use client";

import { useState } from "react";
import { useAuth } from "../lib/AuthContext";
import { CopyField, Notice, Panel } from "./ui";

export default function WalletTab() {
  const {
    user,
    wallet,
    keystoreJson,
    lockedKeystore,
    syncWallet,
    resetWallet,
    signOut,
  } = useAuth();

  const [revealMnemonic, setRevealMnemonic] = useState(false);
  const [revealKey, setRevealKey] = useState(false);
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);

  if (!wallet) {
    return (
      <Panel title="🔑 Wallet & Keystore">
        <Notice type="error" text="No wallet loaded. Complete onboarding first." />
      </Panel>
    );
  }

  let mnemonic = null;
  try {
    const parsed = JSON.parse(keystoreJson || "{}");
    if (parsed.kind === "mnemonic") mnemonic = parsed.mnemonic;
  } catch {
    /* not JSON */
  }

  async function handleSync() {
    setBusy(true);
    setNotice(null);
    try {
      await syncWallet();
      setNotice({ type: "success", text: "Re-synced wallet from backend." });
    } catch (err) {
      setNotice({ type: "error", text: err.message });
    } finally {
      setBusy(false);
    }
  }

  async function handleReset() {
    if (
      !window.confirm(
        "Reset removes this wallet from your Google account. You will need the seed phrase or private key to recover it. Continue?"
      )
    ) {
      return;
    }
    setBusy(true);
    await resetWallet();
    setBusy(false);
  }

  return (
    <div className="console-tab">
      <Notice text={notice?.text} type={notice?.type} onDismiss={() => setNotice(null)} />

      <div className="console-statgrid">
        <div className="console-statcard accent-cyan">
          <div className="console-statcard-label">Google account</div>
          <div className="console-statcard-value console-identity">
            {user?.avatar && <img src={user.avatar} alt="" className="console-avatar" />}
            <span>
              {user?.name}
              <small>{user?.email}</small>
            </span>
          </div>
        </div>
        <div className="console-statcard accent-violet">
          <div className="console-statcard-label">Wallet type</div>
          <div className="console-statcard-value">
            {wallet.kind === "mnemonic" ? "BIP-39 HD wallet" : "Imported private key"}
            {lockedKeystore && <small className="console-lock-note"> · password protected</small>}
          </div>
          <div className="console-statcard-sub">m/44&apos;/60&apos;/0&apos;/0/0 · secp256k1</div>
        </div>
      </div>

      <Panel title="🔑 Wallet & Keystore">
        <CopyField label="Wallet address" value={wallet.address} />
        <CopyField label="Public key (SEC1 uncompressed)" value={wallet.publicKeyHex} />

        {mnemonic ? (
          <div className="console-secret-block">
            <div className="console-secret-head">
              <strong>Recovery phrase (BIP-39)</strong>
              <button
                type="button"
                className="console-btn console-btn-mini"
                onClick={() => setRevealMnemonic(!revealMnemonic)}
              >
                {revealMnemonic ? "Hide" : "Reveal"}
              </button>
            </div>
            {revealMnemonic ? (
              <div className="console-mnemonic-grid">
                {mnemonic.split(/\s+/).map((word, i) => (
                  <div className="console-mnemonic-word" key={i}>
                    <span className="console-mnemonic-index">{i + 1}</span>
                    {word}
                  </div>
                ))}
              </div>
            ) : (
              <p className="console-secret-hidden">••••••••••••••••••••••••</p>
            )}
          </div>
        ) : (
          <p className="console-panel-note">
            This wallet was imported from a raw private key, so there is no recovery
            phrase to export.
          </p>
        )}

        <div className="console-secret-block">
          <div className="console-secret-head">
            <strong>Private key</strong>
            <button
              type="button"
              className="console-btn console-btn-mini"
              onClick={() => setRevealKey(!revealKey)}
            >
              {revealKey ? "Hide" : "Reveal"}
            </button>
          </div>
          {revealKey ? (
            <code className="console-secret-revealed mono">{wallet.privateKeyHex}</code>
          ) : (
            <p className="console-secret-hidden">••••••••••••••••••••••••••••••••••••</p>
          )}
          <p className="console-panel-note">
            Anyone with the private key or phrase controls this wallet. Never
            paste them into tools you don&apos;t trust.
          </p>
        </div>

        <div className="console-onboarding-row console-wallet-actions">
          <button type="button" className="console-btn" disabled={busy} onClick={handleSync}>
            ↻ Re-sync with backend
          </button>
          <button type="button" className="console-btn console-btn-danger" disabled={busy} onClick={handleReset}>
            ⇄ Switch / Reset wallet
          </button>
          <button type="button" className="console-btn console-btn-ghost" onClick={signOut}>
            Sign out
          </button>
        </div>

        <p className="console-panel-note">
          Your keystore is encrypted (AES-256-GCM) on the ProxyBase backend and
          linked to your Google account. Seller nodes are not available in the
          web UI. Use the CLI or desktop app to run one.
        </p>
      </Panel>
    </div>
  );
}
