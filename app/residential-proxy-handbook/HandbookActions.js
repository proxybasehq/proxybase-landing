"use client";

import { useState } from "react";

export function CopyHandbookLinkButton({ pdfUrl = "/ProxyBase_Residential_Proxy_Pool_Handbook.pdf" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const fullUrl = typeof window !== "undefined" 
        ? `${window.location.origin}${pdfUrl}` 
        : `https://proxybase.xyz${pdfUrl}`;
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      data-umami-event="Handbook: Copy PDF Link"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        padding: "10px 18px",
        background: "transparent",
        color: "var(--text-secondary, #334155)",
        border: "1px solid var(--border-subtle, rgba(15, 23, 42, 0.15))",
        borderRadius: "8px",
        fontSize: "0.85rem",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.2s ease",
        fontFamily: "inherit",
        width: "100%",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--accent-primary, #2563eb)";
        e.currentTarget.style.color = "var(--accent-primary, #2563eb)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-subtle, rgba(15, 23, 42, 0.15))";
        e.currentTarget.style.color = "var(--text-secondary, #334155)";
      }}
    >
      {copied ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span style={{ color: "#16a34a" }}>Link Copied to Clipboard!</span>
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          <span>Share PDF Direct Link</span>
        </>
      )}
    </button>
  );
}
