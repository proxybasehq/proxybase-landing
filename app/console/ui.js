"use client";

import { useEffect, useRef, useState } from "react";

/* ── Copy-to-clipboard ─────────────────────────────────────────────────── */

export function useCopy() {
  const [copied, setCopied] = useState(null);
  const timerRef = useRef(null);

  const copy = (text) => {
    const done = () => {
      setCopied(text);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(null), 1600);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else {
      fallbackCopy(text, done);
    }
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return { copied, copy, isCopied: (t) => copied === t };
}

function fallbackCopy(text, done) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
    done();
  } catch {
    /* ignore */
  }
  document.body.removeChild(ta);
}

export function CopyButton({ text, label }) {
  const { copy, isCopied } = useCopy();
  return (
    <button
      type="button"
      className={`console-btn console-btn-mini ${isCopied(text) ? "copied" : ""}`}
      onClick={() => copy(text)}
      title="Copy to clipboard"
    >
      {isCopied(text) ? "✓ Copied" : label || "Copy"}
    </button>
  );
}

export function CopyField({ label, value, mono = true, secret = false }) {
  const [revealed, setRevealed] = useState(false);
  const shown = secret && !revealed ? "•".repeat(Math.min(value.length, 48)) : value;
  return (
    <div className="console-copyfield">
      <div className="console-copyfield-label">{label}</div>
      <div className="console-copyfield-row">
        <code className={`console-copyfield-value ${mono ? "mono" : ""}`}>{shown}</code>
        <div className="console-copyfield-actions">
          {secret && (
            <button
              type="button"
              className="console-btn console-btn-mini"
              onClick={() => setRevealed(!revealed)}
            >
              {revealed ? "Hide" : "Reveal"}
            </button>
          )}
          <CopyButton text={value} />
        </div>
      </div>
    </div>
  );
}

/* ── Layout primitives ─────────────────────────────────────────────────── */

export function StatCard({ label, value, sub, accent, onClick }) {
  return (
    <div
      className={`console-statcard ${accent ? `accent-${accent}` : ""} ${onClick ? "clickable" : ""}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
    >
      <div className="console-statcard-label">{label}</div>
      <div className="console-statcard-value">{value}</div>
      {sub && <div className="console-statcard-sub">{sub}</div>}
    </div>
  );
}

export function Panel({ title, actions, children, className = "" }) {
  return (
    <section className={`console-panel ${className}`}>
      {(title || actions) && (
        <div className="console-panel-head">
          <h3 className="console-panel-title">{title}</h3>
          {actions && <div className="console-panel-actions">{actions}</div>}
        </div>
      )}
      <div className="console-panel-body">{children}</div>
    </section>
  );
}

export function Modal({ open, onClose, title, subtitle, children, wide = false, dismissable = true }) {
  if (!open) return null;
  return (
    <div className="console-modal-overlay" onMouseDown={dismissable ? onClose : undefined}>
      <div
        className={`console-modal ${wide ? "wide" : ""}`}
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="console-modal-head">
          <div>
            <h2 className="console-modal-title">{title}</h2>
            {subtitle && <p className="console-modal-subtitle">{subtitle}</p>}
          </div>
          {dismissable && (
            <button type="button" className="console-modal-close" onClick={onClose} aria-label="Close">
              ✕
            </button>
          )}
        </div>
        <div className="console-modal-body">{children}</div>
      </div>
    </div>
  );
}

export function Spinner({ label }) {
  return (
    <div className="console-spinner-wrap">
      <div className="console-spinner" />
      {label && <p>{label}</p>}
    </div>
  );
}

export function Notice({ type = "info", text, onDismiss }) {
  if (!text) return null;
  return (
    <div className={`console-notice notice-${type}`}>
      <span>{text}</span>
      {onDismiss && (
        <button type="button" className="console-notice-close" onClick={onDismiss} aria-label="Dismiss">
          ✕
        </button>
      )}
    </div>
  );
}

export function StatusDot({ status }) {
  const s = String(status || "").toLowerCase();
  const tone =
    s === "active" || s === "open" || s === "confirmed" || s === "connected" || s === "alive"
      ? "green"
      : s === "closed" || s === "failed" || s === "expired"
        ? "red"
        : "amber";
  return <span className={`console-dot dot-${tone}`} title={status} />;
}

export function EmptyState({ icon = "◌", title, sub, children }) {
  return (
    <div className="console-empty">
      <div className="console-empty-icon">{icon}</div>
      <h4>{title}</h4>
      {sub && <p>{sub}</p>}
      {children}
    </div>
  );
}

export function Field({ label, hint, children }) {
  return (
    <label className="console-field">
      <span className="console-field-label">{label}</span>
      {children}
      {hint && <span className="console-field-hint">{hint}</span>}
    </label>
  );
}

export function Segmented({ options, value, onChange }) {
  return (
    <div className="console-segmented" role="tablist">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="tab"
          aria-selected={value === opt.value}
          className={`console-segmented-btn ${value === opt.value ? "selected" : ""}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
