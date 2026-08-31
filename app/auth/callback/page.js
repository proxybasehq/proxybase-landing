"use client";

import { useEffect, useRef } from "react";

export default function OAuthCallbackPage() {
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const error = params.get("error");

    function finish(message) {
      if (window.opener) {
        window.opener.postMessage(
          { type: "proxybase-google-auth", ...message },
          window.location.origin
        );
        window.close();
      } else {
        window.location.href = "/console";
      }
    }

    async function run() {
      if (!code) {
        finish({ ok: false, error: error || "authorization_failed" });
        return;
      }
      try {
        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code,
            redirect_uri: `${window.location.origin}/auth/callback`,
          }),
        });
        const data = await res.json().catch(() => ({}));
        finish({ ok: res.ok && data.ok === true, error: data.error });
      } catch (err) {
        finish({ ok: false, error: String(err) });
      }
    }

    run();
  }, []);

  return (
    <div className="auth-callback-screen">
      <img src="/logo.svg" alt="ProxyBase" width="40" height="40" />
      <h2>Completing sign-in…</h2>
      <p>You can close this window once the browser returns to ProxyBase.</p>
    </div>
  );
}
