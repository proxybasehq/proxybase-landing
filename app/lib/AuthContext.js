"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { v2 } from "./v2Client";
import * as wc from "./walletCrypto";
import WalletOnboardingModal from "../console/WalletOnboardingModal";

const TOKEN_KEY = "pb_v2_session_token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [config, setConfig] = useState(null);
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [keystoreJson, setKeystoreJson] = useState(null);
  const [lockedKeystore, setLockedKeystore] = useState(null);
  const [sessionToken, setSessionToken] = useState(null);
  const [balance, setBalance] = useState(null);
  const [status, setStatus] = useState("boot"); // boot | signedOut | signingIn | needsWallet | locked | ready
  const [error, setError] = useState(null);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    const saved = window.localStorage.getItem("pb-console-theme");
    return saved === "dark" ? "dark" : "light";
  });

  const walletRef = useRef(null);
  const tokenRef = useRef(null);
  const statusRef = useRef("boot");
  statusRef.current = status;

  useEffect(() => {
    document.documentElement.setAttribute("data-console-theme", theme);
    try {
      window.localStorage.setItem("pb-console-theme", theme);
    } catch {
      /* storage unavailable */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const postWalletApi = useCallback(async (body) => {
    let res;
    try {
      res = await fetch("/api/auth/wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(20000),
      });
    } catch (err) {
      throw new Error(
        err.name === "TimeoutError"
          ? "Wallet API timed out — is DATABASE_URL configured and reachable?"
          : `Wallet API unreachable: ${err.message}`
      );
    }
    const text = await res.text();
    let data = {};
    try {
      data = JSON.parse(text);
    } catch {
      data = { _raw: text.slice(0, 300) };
    }
    if (!res.ok) {
      throw new Error(
        data.error ||
          (data._raw
            ? `Wallet API error (${res.status}): ${data._raw}`
            : `Wallet API error (${res.status})`)
      );
    }
    return data;
  }, []);

  const handshake = useCallback(async (w) => {
    walletRef.current = w;
    setWallet(w);

    const stored =
      typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    if (stored) {
      try {
        const bal = await v2.getBalance(stored);
        tokenRef.current = stored;
        setSessionToken(stored);
        setBalance(bal);
        setError(null);
        setStatus("ready");
        return;
      } catch {
        /* stored token expired — fall through to a fresh challenge */
      }
    }

    try {
      const { nonce, timestamp } = await v2.challenge(w.address);
      const signatureHex = await wc.signChallenge(w, nonce, timestamp);
      const vr = await v2.verify({
        public_key_hex: w.publicKeyHex,
        nonce,
        timestamp,
        signature_hex: signatureHex,
      });
      tokenRef.current = vr.session_token;
      localStorage.setItem(TOKEN_KEY, vr.session_token);
      setSessionToken(vr.session_token);
      setBalance({ ...vr });
      setError(null);
      setStatus("ready");
    } catch (err) {
      setError(`v2 session failed: ${err.message}`);
      setStatus("ready");
    }
  }, []);

  const activateKeystore = useCallback(
    async (keystoreText) => {
      const w = wc.walletFromKeystore(keystoreText);
      setKeystoreJson(keystoreText);
      setLockedKeystore(null);
      setOnboardingOpen(false);
      await handshake(w);
    },
    [handshake]
  );

  const resolveWallet = useCallback(async () => {
    try {
      const data = await postWalletApi({ action: "load" });
      if (!data.found) {
        setOnboardingOpen(true);
        setStatus("needsWallet");
        return;
      }
      const keystoreText = data.wallet.keystore;
      if (wc.isPasswordEncryptedKeystore(keystoreText)) {
        setLockedKeystore(keystoreText);
        setOnboardingOpen(true);
        setStatus("locked");
        return;
      }
      await activateKeystore(keystoreText);
    } catch (err) {
      console.error("[auth] wallet resolution failed:", err.message);
      setError(err.message);
      setStatus("signedOut");
    }
  }, [postWalletApi, activateKeystore]);

  // Boot: load config + session, then resolve the stored wallet.
  useEffect(() => {
    (async () => {
      try {
        const [cfgRes, sessionRes] = await Promise.all([
          fetch("/api/auth/config"),
          fetch("/api/auth/session"),
        ]);
        const cfg = await cfgRes.json().catch(() => ({}));
        const { user: sessionUser } = await sessionRes.json().catch(() => ({ user: null }));
        setConfig(cfg);
        if (!sessionUser) {
          setStatus("signedOut");
          return;
        }
        setUser(sessionUser);
        await resolveWallet();
      } catch (err) {
        setError(err.message);
        setStatus("signedOut");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const afterGoogleSession = useCallback(async () => {
    try {
      const s = await fetch("/api/auth/session", {
        signal: AbortSignal.timeout(20000),
      });
      const { user: sessionUser } = await s.json();
      if (!sessionUser) {
        throw new Error("Session cookie was not set — check GOOGLE_CLIENT_ID/SECRET and PB_AUTH_SECRET on the deployment");
      }
      setUser(sessionUser);
      await resolveWallet();
    } catch (err) {
      console.error("[auth] post-sign-in resolution failed:", err.message);
      setError(err.message);
      setStatus("signedOut");
    }
  }, [resolveWallet]);

  const signIn = useCallback(async () => {
    if (!config || statusRef.current === "signingIn") return;
    setError(null);

    if (config.demo_mode) {
      setStatus("signingIn");
      try {
        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ demo: true }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.ok) throw new Error(data.error || "Demo sign-in failed");
        await afterGoogleSession();
      } catch (err) {
        setError(err.message);
        setStatus("signedOut");
      }
      return;
    }

    if (!config.google_client_id) {
      setError("Google OAuth is not configured on this deployment");
      return;
    }

    setStatus("signingIn");
    const redirectUri = `${window.location.origin}/auth/callback`;
    const url =
      `https://accounts.google.com/o/oauth2/v2/auth` +
      `?client_id=${encodeURIComponent(config.google_client_id)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=code` +
      `&scope=${encodeURIComponent("openid email profile")}` +
      `&prompt=select_account`;
    const popup = window.open(url, "proxybase-google-auth", "width=480,height=640");
    if (!popup) {
      setError("Popup blocked — allow popups for this site");
      setStatus("signedOut");
      return;
    }

    const timer = setInterval(() => {
      if (popup.closed) {
        cleanup();
        if (statusRef.current === "signingIn") setStatus("signedOut");
      }
    }, 500);

    const onMsg = (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.data && event.data.type === "proxybase-google-auth") {
        cleanup();
        if (event.data.ok) {
          afterGoogleSession();
        } else {
          setError(event.data.error || "Google sign-in failed");
          setStatus("signedOut");
        }
      }
    };

    function cleanup() {
      clearInterval(timer);
      window.removeEventListener("message", onMsg);
    }

    window.addEventListener("message", onMsg);
  }, [config, afterGoogleSession]);

  const signOut = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    localStorage.removeItem(TOKEN_KEY);
    tokenRef.current = null;
    walletRef.current = null;
    setUser(null);
    setWallet(null);
    setKeystoreJson(null);
    setLockedKeystore(null);
    setSessionToken(null);
    setBalance(null);
    setOnboardingOpen(false);
    setError(null);
    setStatus("signedOut");
  }, []);

  const completeOnboarding = useCallback(
    async ({ secret, password }) => {
      const { wallet: w, keystoreJson: keystore } = wc.keystoreFromInput(secret);
      const stored = password ? await wc.encryptWithPassword(keystore, password) : keystore;
      const data = await postWalletApi({
        action: "save",
        wallet: {
          wallet_address: w.address,
          public_key_hex: w.publicKeyHex,
          keystore: stored,
        },
      });
      if (!data.ok) throw new Error("Wallet save failed");
      await activateKeystore(keystore);
    },
    [postWalletApi, activateKeystore]
  );

  const unlockWallet = useCallback(
    async (password) => {
      if (!lockedKeystore) return;
      const plain = await wc.decryptWithPassword(lockedKeystore, password);
      await activateKeystore(plain);
    },
    [lockedKeystore, activateKeystore]
  );

  const resetWallet = useCallback(async () => {
    await postWalletApi({ action: "delete" }).catch(() => {});
    localStorage.removeItem(TOKEN_KEY);
    tokenRef.current = null;
    walletRef.current = null;
    setWallet(null);
    setKeystoreJson(null);
    setLockedKeystore(null);
    setSessionToken(null);
    setBalance(null);
    setOnboardingOpen(true);
    setStatus("needsWallet");
  }, [postWalletApi]);

  const syncWallet = useCallback(async () => {
    setError(null);
    await resolveWallet();
  }, [resolveWallet]);

  const refreshBalance = useCallback(async () => {
    const t = tokenRef.current;
    if (!t) return null;
    try {
      const b = await v2.getBalance(t);
      setBalance(b);
      setError(null);
      return b;
    } catch (err) {
      if (err && err.status === 401 && walletRef.current) {
        localStorage.removeItem(TOKEN_KEY);
        await handshake(walletRef.current);
      } else if (err && err.status === 0) {
        setError("Backend unreachable — check BACKEND_API_URL / local backend");
      }
      return null;
    }
  }, [handshake]);

  // Keep the balance fresh while signed in.
  useEffect(() => {
    if (status !== "ready") return undefined;
    const iv = setInterval(() => {
      refreshBalance();
    }, 30000);
    return () => clearInterval(iv);
  }, [status, refreshBalance]);

  const value = {
    config,
    user,
    wallet,
    keystoreJson,
    lockedKeystore,
    sessionToken,
    balance,
    status,
    error,
    onboardingOpen,
    setOnboardingOpen,
    theme,
    toggleTheme,
    signIn,
    signOut,
    completeOnboarding,
    unlockWallet,
    resetWallet,
    syncWallet,
    refreshBalance,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <WalletOnboardingModal />
      {error && status === "signedOut" && (
        <div
          className="console-error-toast"
          role="alert"
          onClick={() => setError(null)}
          title="Dismiss"
        >
          <span>⚠ {error}</span>
          <button
            type="button"
            className="console-error-toast-close"
            onClick={(e) => {
              e.stopPropagation();
              setError(null);
            }}
            aria-label="Dismiss error"
          >
            ✕
          </button>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
