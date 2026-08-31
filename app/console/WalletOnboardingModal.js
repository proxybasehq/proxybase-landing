"use client";

import { useMemo, useState } from "react";
import { useAuth } from "../lib/AuthContext";
import {
  generateMnemonic,
  isValidMnemonic,
  isValidPrivateKey,
  privateKeyToWallet,
  mnemonicToWallet,
  shortAddress,
} from "../lib/walletCrypto";
import { CopyButton, Modal, Notice, Segmented } from "./ui";

export default function WalletOnboardingModal() {
  const {
    user,
    status,
    onboardingOpen,
    setOnboardingOpen,
    completeOnboarding,
    unlockWallet,
    lockedKeystore,
    signOut,
  } = useAuth();

  const [tab, setTab] = useState(status === "locked" ? "unlock" : "create");
  const [wordCount, setWordCount] = useState(12);
  const [mnemonic, setMnemonic] = useState(null);
  const [savedConfirmed, setSavedConfirmed] = useState(false);
  const [importInput, setImportInput] = useState("");
  const [importPassword, setImportPassword] = useState("");
  const [unlockPassword, setUnlockPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const importPreview = useMemo(() => {
    const text = importInput.trim();
    if (!text) return null;
    try {
      if (isValidPrivateKey(text)) {
        const w = privateKeyToWallet(text);
        return { type: "Private key", address: w.address };
      }
      if (isValidMnemonic(text)) {
        const w = mnemonicToWallet(text);
        return {
          type: `${text.split(/\s+/).length}-word recovery phrase`,
          address: w.address,
        };
      }
    } catch {
      /* invalid */
    }
    return { type: null, address: null };
  }, [importInput]);

  const words = useMemo(
    () => (mnemonic ? mnemonic.split(/\s+/) : []),
    [mnemonic]
  );

  async function handleCreate() {
    setBusy(true);
    setError(null);
    try {
      await completeOnboarding({ secret: mnemonic, password: null });
      // modal closes via status transition; reset local state for next time
      setMnemonic(null);
      setSavedConfirmed(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleImport() {
    setBusy(true);
    setError(null);
    try {
      await completeOnboarding({
        secret: importInput.trim(),
        password: importPassword || null,
      });
      setImportInput("");
      setImportPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleUnlock() {
    setBusy(true);
    setError(null);
    try {
      await unlockWallet(unlockPassword);
      setUnlockPassword("");
    } catch (err) {
      setError("Wrong password — try again");
    } finally {
      setBusy(false);
    }
  }

  const isLocked = status === "locked";

  return (
    <Modal
      open={onboardingOpen}
      onClose={() => setOnboardingOpen(false)}
      title={isLocked ? "Unlock your wallet" : "Connect a wallet"}
      subtitle={
        isLocked
          ? "This wallet is protected with an additional password."
          : `Signed in as ${user?.email || user?.name || ""} — set up your ProxyBase v2 wallet to continue.`
      }
      wide
    >
      <div className="console-onboarding">
        {isLocked ? (
          <div className="console-onboarding-unlock">
            <p className="console-onboarding-intro">
              Your encrypted keystore is stored on the ProxyBase backend. Enter its
              password to derive your key and sign in.
            </p>
            <input
              type="password"
              className="console-input"
              placeholder="Keystore password"
              value={unlockPassword}
              onChange={(e) => setUnlockPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
              autoFocus
            />
            <button
              type="button"
              className="console-btn console-btn-primary"
              disabled={!unlockPassword || busy}
              onClick={handleUnlock}
            >
              {busy ? "Unlocking…" : "Unlock wallet"}
            </button>
            <button type="button" className="console-link" onClick={signOut}>
              Use a different Google account
            </button>
          </div>
        ) : (
          <>
            <Segmented
              options={[
                { value: "create", label: "✦ Create New Wallet" },
                { value: "import", label: "⇪ Load / Import Wallet" },
              ]}
              value={tab}
              onChange={setTab}
            />

            {tab === "create" && (
              <div className="console-onboarding-pane">
                {!mnemonic ? (
                  <>
                    <p className="console-onboarding-intro">
                      Generate a brand-new secp256k1 wallet. A 12 or 24-word BIP-39
                      recovery phrase is created in your browser, encrypted, and
                      stored with your Google account on the ProxyBase backend —
                      so it follows you across devices.
                    </p>
                    <div className="console-onboarding-row">
                      <Segmented
                        options={[
                          { value: 12, label: "12 words" },
                          { value: 24, label: "24 words" },
                        ]}
                        value={wordCount}
                        onChange={(v) => setWordCount(v)}
                      />
                      <button
                        type="button"
                        className="console-btn console-btn-primary"
                        onClick={() => {
                          setMnemonic(generateMnemonic(wordCount));
                          setSavedConfirmed(false);
                        }}
                      >
                        ⚡ Generate Seed Phrase
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="console-onboarding-intro">
                      This is your wallet&apos;s recovery phrase. Anyone with these
                      words controls your funds — store them offline and never
                      share them.
                    </p>
                    <div className="console-mnemonic-grid">
                      {words.map((word, i) => (
                        <div className="console-mnemonic-word" key={i}>
                          <span className="console-mnemonic-index">{i + 1}</span>
                          {word}
                        </div>
                      ))}
                    </div>
                    <div className="console-onboarding-row">
                      <CopyButton text={mnemonic} label="Copy phrase" />
                      <label className="console-checkbox">
                        <input
                          type="checkbox"
                          checked={savedConfirmed}
                          onChange={(e) => setSavedConfirmed(e.target.checked)}
                        />
                        I saved my seed phrase somewhere safe
                      </label>
                    </div>
                    <button
                      type="button"
                      className="console-btn console-btn-primary console-btn-block"
                      disabled={!savedConfirmed || busy}
                      onClick={handleCreate}
                    >
                      {busy ? "Encrypting & saving…" : "Save & Continue →"}
                    </button>
                  </>
                )}
              </div>
            )}

            {tab === "import" && (
              <div className="console-onboarding-pane">
                <p className="console-onboarding-intro">
                  Paste a 12 or 24-word recovery phrase, or a raw 64-char hex
                  private key. The address is derived and shown before saving.
                </p>
                <textarea
                  className="console-input console-textarea"
                  rows={4}
                  placeholder={
                    "abandon abandon abandon … about\nor\n0x9f2c…private key…"
                  }
                  value={importInput}
                  onChange={(e) => setImportInput(e.target.value)}
                  spellCheck={false}
                />
                {importPreview && (
                  <div
                    className={`console-import-preview ${importPreview.address ? "valid" : "invalid"}`}
                  >
                    {importPreview.address ? (
                      <>
                        <span className="console-import-preview-type">{importPreview.type}</span>
                        <code>{importPreview.address}</code>
                      </>
                    ) : (
                      <span>Waiting for a valid phrase or key…</span>
                    )}
                  </div>
                )}
                <div className="console-onboarding-row">
                  <label className="console-field" style={{ flex: 1 }}>
                    <span className="console-field-label">
                      Password protection (optional)
                    </span>
                    <input
                      type="password"
                      className="console-input"
                      placeholder="Encrypt keystore with an extra password"
                      value={importPassword}
                      onChange={(e) => setImportPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                    <span className="console-field-hint">
                      You&apos;ll enter this password when signing in on any device.
                    </span>
                  </label>
                </div>
                <button
                  type="button"
                  className="console-btn console-btn-primary console-btn-block"
                  disabled={!importPreview?.address || busy}
                  onClick={handleImport}
                >
                  {busy ? "Encrypting & saving…" : "Save & Import Wallet"}
                </button>
              </div>
            )}

            <div className="console-onboarding-footer">
              <button type="button" className="console-link" onClick={signOut}>
                Use a different Google account
              </button>
              <span className="console-onboarding-note">
                Wallets are encrypted at rest on the ProxyBase backend and linked
                to your Google account. Seller features are intentionally absent
                from the web UI.
              </span>
            </div>
          </>
        )}

        <Notice type="error" text={error} onDismiss={() => setError(null)} />
      </div>
    </Modal>
  );
}

export function WalletAddressPill({ address }) {
  return <span className="console-addr-pill">{shortAddress(address)}</span>;
}
