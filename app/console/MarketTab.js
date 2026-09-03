"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../lib/AuthContext";
import { v2, socks5ConnectionString } from "../lib/v2Client";
import {
  countryFlag,
  formatBytes,
  formatUsd,
  microcreditsToUsd,
  usdToMicrocredits,
} from "../lib/walletCrypto";
import {
  CopyField,
  EmptyState,
  Field,
  Modal,
  Notice,
  Panel,
  Segmented,
  Spinner,
  StatCard,
  StatusDot,
} from "./ui";
import Snippets from "./Snippets";

const CATEGORIES = [
  { value: "residential", emoji: "🏠", label: "Residential", blurb: "Real home IPs. For sneaker drops, social media, and storefronts that block cloud IPs." },
  { value: "mobile", emoji: "📱", label: "Mobile", blurb: "Real 4G/5G carrier IPs. For apps and social automation." },
  { value: "datacenter", emoji: "🖥️", label: "Datacenter", blurb: "Cloud IPs. Fast and cheap; use them for bulk scraping." },
  { value: "isp", emoji: "🌐", label: "ISP", blurb: "Provider-owned ranges. Trusted like home IPs, faster than home networks." },
  { value: "burner", emoji: "🔥", label: "Burner", blurb: "Short-lived IPs for one-off tasks you don't want tied to anything." },
];

const CATEGORY_BY_VALUE = Object.fromEntries(CATEGORIES.map((c) => [c.value, c]));

const DURATIONS = [
  { value: null, label: "Until closed" },
  { value: 15, label: "15 min" },
  { value: 60, label: "1 hour" },
  { value: 360, label: "6 hours" },
  { value: 1440, label: "24 hours" },
];

const KEEPALIVE_INTERVAL_MS = 5 * 60 * 1000;

function sessionAge(createdAt) {
  if (!createdAt) return "—";
  const ms = Date.now() - new Date(String(createdAt).replace(" ", "T") + "Z").getTime();
  if (isNaN(ms) || ms < 0) return "—";
  const mins = Math.floor(ms / 60000);
  if (mins < 1) return "<1m";
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  if (h < 24) return `${h}h ${mins % 60}m`;
  return `${Math.floor(h / 24)}d ${h % 24}h`;
}

export default function MarketTab() {
  const { sessionToken, balance, config, refreshBalance } = useAuth();
  const token = sessionToken;

  const [pricing, setPricing] = useState(null);
  const [countries, setCountries] = useState([]);
  const [catalogError, setCatalogError] = useState(null);
  const [sessions, setSessions] = useState(null);
  const [sessionsError, setSessionsError] = useState(null);
  const [filter, setFilter] = useState({ country: "", category: "", search: "" });
  const [buyRow, setBuyRow] = useState(null);
  const [drawerSession, setDrawerSession] = useState(null);
  const [checker, setChecker] = useState({ running: false, results: null, forId: null });
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);

  const timersRef = useRef(new Map()); // session_id -> {close: timeoutId, deadline}
  const sessionsRef = useRef([]);

  const loadCatalog = useCallback(async () => {
    if (!token) return;
    setCatalogError(null);
    try {
      const [p, c] = await Promise.all([
        v2.getPricing(token),
        v2.getCountries(token),
      ]);
      setPricing(p.pricing || []);
      setCountries(c.countries || []);
    } catch (err) {
      setCatalogError(err.message);
    }
  }, [token]);

  const loadSessions = useCallback(async () => {
    if (!token) return;
    try {
      const data = await v2.listSessions(token);
      const list = data.sessions || [];
      sessionsRef.current = list;
      setSessions(list);
      setSessionsError(null);
    } catch (err) {
      setSessionsError(err.message);
    }
  }, [token]);

  useEffect(() => {
    loadCatalog();
    loadSessions();
  }, [loadCatalog, loadSessions]);

  useEffect(() => {
    if (!token) return undefined;
    const iv = setInterval(loadSessions, 15000);
    return () => clearInterval(iv);
  }, [token, loadSessions]);

  // Auto-keepalive for all active sessions (prevents 25h idle cleanup).
  useEffect(() => {
    if (!token || !sessions || sessions.length === 0) return undefined;
    const iv = setInterval(() => {
      sessionsRef.current.forEach((s) => {
        v2.keepaliveSession(token, s.session_id).catch(() => {});
      });
    }, KEEPALIVE_INTERVAL_MS);
    return () => clearInterval(iv);
  }, [token, sessions]);

  // Reconcile auto-close timers when the session list changes.
  useEffect(() => {
    if (!sessions) return;
    const live = new Set(sessions.map((s) => s.session_id));
    timersRef.current.forEach((entry, id) => {
      if (!live.has(id)) {
        clearTimeout(entry.close);
        timersRef.current.delete(id);
      }
    });
  }, [sessions]);

  useEffect(() => () => {
    timersRef.current.forEach((entry) => clearTimeout(entry.close));
  }, []);

  const filteredPricing = useMemo(() => {
    if (!pricing) return [];
    return pricing
      .filter((row) => {
        // Buckets with no online sellers are hidden entirely.
        if (!(row.available_sellers > 0)) return false;
        if (filter.country && row.country !== filter.country) return false;
        if (filter.category && row.network_type !== filter.category) return false;
        if (filter.search) {
          const hay = `${row.country} ${row.network_type}`.toLowerCase();
          if (!hay.includes(filter.search.toLowerCase())) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const ca = String(a.country || "").toUpperCase();
        const cb = String(b.country || "").toUpperCase();
        if (ca === "WORLDWIDE" && cb !== "WORLDWIDE") return -1;
        if (cb === "WORLDWIDE" && ca !== "WORLDWIDE") return 1;
        return 0;
      });
  }, [pricing, filter]);

  const sortedCountries = useMemo(() => {
    return [...countries].sort((a, b) => {
      const ca = String(a.country || "").toUpperCase();
      const cb = String(b.country || "").toUpperCase();
      if (ca === "WORLDWIDE") return -1;
      if (cb === "WORLDWIDE") return 1;
      return String(a.country || "").localeCompare(String(b.country || ""));
    });
  }, [countries]);

  const spendable = Number(balance?.spendable_balance || balance?.buyer_available || 0);

  async function handleBuySubmit(payload) {
    setBusy(true);
    setNotice(null);
    try {
      const created = await v2.createSession(token, payload);
      created.connection_string = socks5ConnectionString({
        gateway: config?.socks5_gateway,
        sessionId: created.session_id,
        token,
      });
      const deadlineMin = payload.__durationMin || null;
      if (deadlineMin) {
        const deadline = Date.now() + deadlineMin * 60000;
        const close = setTimeout(async () => {
          try {
            const r = await v2.closeSession(token, created.session_id);
            setNotice({
              type: "info",
              text: `Session ${created.session_id.slice(0, 8)}… reached its ${deadlineMin} min duration and was closed. ${formatUsd(microcreditsToUsd(r.released_microcredits || 0))} released.`,
            });
          } catch {
            /* already closed */
          }
          timersRef.current.delete(created.session_id);
          loadSessions();
          refreshBalance();
        }, deadline - Date.now());
        timersRef.current.set(created.session_id, { close, deadline });
      }
      await Promise.all([loadSessions(), refreshBalance()]);
      setBuyRow({ created });
      setNotice({
        type: "success",
        text: `Session created. ${created.session_id.slice(0, 8)}… is ${created.status}.`,
      });
    } catch (err) {
      setNotice({ type: "error", text: err.message });
    } finally {
      setBusy(false);
    }
  }

  async function handleRotate(session) {
    setBusy(true);
    setNotice(null);
    try {
      const r = await v2.rotateSession(token, session.session_id);
      setNotice({
        type: "success",
        text: `Sticky session rotated. New exit IP: ${r.new_exit_ip || "pending"}`,
      });
      loadSessions();
    } catch (err) {
      setNotice({ type: "error", text: err.message });
    } finally {
      setBusy(false);
    }
  }

  async function handleKeepalive(session) {
    setNotice(null);
    try {
      const r = await v2.keepaliveSession(token, session.session_id);
      setNotice({ type: "success", text: `Keepalive sent.` });
    } catch (err) {
      setNotice({ type: "error", text: err.message });
    }
  }

  async function handleClose(session) {
    if (!window.confirm(`Close session ${session.session_id.slice(0, 12)}… and refund its unused reserve?`)) return;
    setBusy(true);
    setNotice(null);
    try {
      const r = await v2.closeSession(token, session.session_id);
      setNotice({
        type: "success",
        text: `Session closed. ${formatUsd(microcreditsToUsd(r.released_microcredits))} released, ${formatUsd(microcreditsToUsd(r.settled_microcredits))} settled.`,
      });
      await Promise.all([loadSessions(), refreshBalance()]);
    } catch (err) {
      setNotice({ type: "error", text: err.message });
    } finally {
      setBusy(false);
    }
  }

  async function runCheck(session) {
    setChecker({ running: true, results: null, forId: session.session_id });
    const results = [];
    let t0 = performance.now();
    try {
      const ka = await v2.keepaliveSession(token, session.session_id);
      results.push({
        step: "Session keepalive",
        ok: true,
        detail: `status=${ka.status}`,
        ms: Math.round(performance.now() - t0),
      });
    } catch (err) {
      results.push({ step: "Session keepalive", ok: false, detail: err.message, ms: Math.round(performance.now() - t0) });
    }
    t0 = performance.now();
    try {
      const s = await v2.getSession(token, session.session_id);
      results.push({
        step: "Session state",
        ok: true,
        detail: `status=${s.status} · ${formatBytes(s.cumulative_bytes)} routed · reserve ${formatUsd(microcreditsToUsd(s.reserve_microcredits))}`,
        ms: Math.round(performance.now() - t0),
      });
    } catch (err) {
      results.push({ step: "Session state", ok: false, detail: err.message, ms: Math.round(performance.now() - t0) });
    }
    results.push({
      step: "SOCKS5 tunnel (exit IP)",
      ok: null,
      detail: "Browsers can't open SOCKS5 sockets. Run the cURL command in the Connection tab to see the exit IP.",
    });
    setChecker({ running: false, results, forId: session.session_id });
  }

  if (!token) {
    return (
      <EmptyState icon="🔒" title="No v2 session yet" sub="Complete wallet onboarding to browse the market." />
    );
  }

  const hasActiveSessions = Boolean(sessions && sessions.length > 0);

  const sessionsPanel = (
      <Panel
        title="📡 Active Sessions"
        actions={
          <button type="button" className="console-btn console-btn-ghost" onClick={loadSessions}>
            ↻ Refresh
          </button>
        }
      >
        {sessionsError && <Notice type="error" text={`Sessions: ${sessionsError}`} />}
        {!sessions && !sessionsError && <Spinner label="Loading sessions…" />}
        {sessions && sessions.length === 0 && (
          <EmptyState
            icon="🌀"
            title="No active sessions"
            sub="Buy a rotating or sticky session from the catalog and it shows up here."
          />
        )}
        {sessions && sessions.length > 0 && (
          <div className="console-session-grid">
            {sessions.map((s) => {
              const timer = timersRef.current.get(s.session_id);
              const remaining = timer ? Math.max(0, Math.round((timer.deadline - Date.now()) / 60000)) : null;
              return (
                <div className="console-session-card" key={s.session_id}>
                  <div className="console-session-head">
                    <div className="console-session-id">
                      <StatusDot status={s.status} />
                      <code>{s.session_id.slice(0, 18)}…</code>
                    </div>
                    <span className={`console-badge badge-${s.session_type}`}>{s.session_type}</span>
                  </div>
                  <div className="console-session-meta">
                    <span>
                      {countryFlag(s.country)} {s.country} ·{" "}
                      <span className={`console-category cat-${s.network_type}`}>
                        {CATEGORY_BY_VALUE[s.network_type]?.emoji} {s.network_type}
                      </span>
                    </span>
                    <span>{s.status} · {sessionAge(s.created_at)} old</span>
                  </div>
                  <div className="console-session-stats">
                    <div>
                      <span className="console-session-stat-label">Reserve</span>
                      <strong>{formatUsd(microcreditsToUsd(s.reserve_microcredits))}</strong>
                    </div>
                    <div>
                      <span className="console-session-stat-label">Routed</span>
                      <strong>{formatBytes(s.cumulative_bytes)}</strong>
                    </div>
                    {remaining !== null && (
                      <div>
                        <span className="console-session-stat-label">Auto-close</span>
                        <strong className="console-countdown">{remaining}m</strong>
                      </div>
                    )}
                  </div>
                  <div className="console-session-actions">
                    <button type="button" className="console-btn" onClick={() => setDrawerSession(s)}>
                      🔌 Connect
                    </button>
                    {s.session_type === "sticky" && (
                      <button type="button" className="console-btn" disabled={busy} onClick={() => handleRotate(s)}>
                        🔄 Rotate IP
                      </button>
                    )}
                    <button type="button" className="console-btn" onClick={() => handleKeepalive(s)}>
                      💓 Keepalive
                    </button>
                    <button type="button" className="console-btn" onClick={() => runCheck(s)}>
                      ✓ Check
                    </button>
                    <button type="button" className="console-btn console-btn-danger" disabled={busy} onClick={() => handleClose(s)}>
                      ✕ Close & Refund
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Panel>  );

  return (
    <div className="console-tab">
      <Notice text={notice?.text} type={notice?.type} onDismiss={() => setNotice(null)} />

      <div className="console-statgrid">
        <StatCard
          label="Spendable balance"
          value={formatUsd(microcreditsToUsd(spendable))}
          sub="available to spend"
          accent="cyan"
        />
        <StatCard
          label="Reserved (active sessions)"
          value={formatUsd(microcreditsToUsd(balance?.buyer_reserved))}
          sub="held by open sessions"
          accent="violet"
        />
        <StatCard
          label="Active sessions"
          value={sessions ? sessions.length : "…"}
          sub="polled every 15s · auto-keepalive on"
          accent="green"
        />
        <StatCard
          label="Market buckets"
          value={pricing ? pricing.filter((p) => p.available_sellers > 0).length : "…"}
          sub={pricing ? `${new Set(pricing.map((p) => p.country)).size} countries` : "loading"}
          accent="amber"
        />
      </div>

      {/* ── Catalog ─────────────────────────────────────────────────── */}
{hasActiveSessions && sessionsPanel}

      <Panel
        title="⚡ Global Catalog & Buying"
        actions={
          <button type="button" className="console-btn console-btn-ghost" onClick={loadCatalog}>
            ↻ Refresh
          </button>
        }
      >
        <div className="console-filterbar">
          <select
            className="console-input console-select"
            value={filter.country}
            onChange={(e) => setFilter({ ...filter, country: e.target.value })}
          >
            <option value="">All countries</option>
            {sortedCountries.map((c) => (
              <option key={c.country} value={c.country}>
                {countryFlag(c.country)} {c.country === "WorldWide" ? "WorldWide (Random)" : c.country}
              </option>
            ))}
          </select>
          <select
            className="console-input console-select"
            value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          >
            <option value="">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.emoji} {c.label}
              </option>
            ))}
          </select>
          <input
            className="console-input"
            placeholder="Search country / category…"
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          />
        </div>

        <div className="console-catalog-legend" aria-label="Proxy categories explained">
          {CATEGORIES.map((c) => (
            <div className="console-catalog-legend-item" key={c.value}>
              <span className="console-catalog-legend-emoji">{c.emoji}</span>
              <div>
                <strong>{c.label}</strong>
                <p>{c.blurb}</p>
              </div>
            </div>
          ))}
        </div>

        {catalogError && <Notice type="error" text={`Catalog: ${catalogError}`} />}
        {!pricing && !catalogError && <Spinner label="Loading catalog…" />}

        {pricing && filteredPricing.length === 0 && (
          <EmptyState
            icon="🗺"
            title="No live seller buckets right now"
            sub="Buckets with zero online sellers are hidden. Adjust the filters or check back later."
          />
        )}

        {pricing && filteredPricing.length > 0 && (
          <div className="console-table-wrap">
            <table className="console-table">
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Category</th>
                  <th className="num">Price / GB</th>
                  <th className="num">Version</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredPricing.map((row) => (
                  <tr key={`${row.country}-${row.network_type}`}>
                    <td data-label="Country">
                      <span className="console-flag">{countryFlag(row.country)}</span>{" "}
                      <span style={{ fontWeight: row.country === "WorldWide" ? 600 : 400 }}>
                        {row.country === "WorldWide" ? "WorldWide (Random)" : row.country}
                      </span>
                      {row.available_sellers > 0 && (
                        <span className="console-sub-mono" style={{ marginLeft: 6, fontSize: "0.75rem", opacity: 0.8 }}>
                          ({row.available_sellers} online)
                        </span>
                      )}
                    </td>
                    <td data-label="Category">
                      <span className={`console-category cat-${row.network_type}`}>
                        {CATEGORY_BY_VALUE[row.network_type]?.emoji} {row.network_type}
                      </span>
                    </td>
                    <td data-label="Price / GB" className="num">
                      <strong>{row.price_per_gb ? `$${row.price_per_gb}` : formatUsd(microcreditsToUsd(row.buyer_price_microcredits_per_gb))}</strong>
                      <span className="console-sub-mono"> {Number(row.buyer_price_microcredits_per_gb).toLocaleString()} credits/GB</span>
                    </td>
                    <td data-label="Version" className="num">{row.version}</td>
                    <td data-label=" " className="right">
                      <button
                        type="button"
                        className="console-btn console-btn-primary"
                        disabled={!row.available_sellers}
                        onClick={() => setBuyRow({ row })}
                      >
                        Buy
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>



{!hasActiveSessions && sessionsPanel}

      <BuyWizard
        key={buyRow?.row ? `${buyRow.row.country}-${buyRow.row.network_type}` : buyRow?.created ? "created" : "closed"}
        row={buyRow?.row}
        created={buyRow?.created}
        onClose={() => setBuyRow(null)}
        spendable={spendable}
        busy={busy}
        onSubmit={handleBuySubmit}
      />

      <ConnectionDrawer
        session={drawerSession}
        onClose={() => setDrawerSession(null)}
        gateway={config?.socks5_gateway}
        checker={checker}
        onCheck={runCheck}
      />
    </div>
  );
}

/* ── Buy wizard ────────────────────────────────────────────────────────── */

function BuyWizard({ row, created, onClose, spendable, busy, onSubmit }) {
  const [sessionType, setSessionType] = useState("rotating");
  const [duration, setDuration] = useState(null);
  const [capUsd, setCapUsd] = useState("");

  if (!row && !created) return null;

  if (created) {
    return (
      <Modal
        open
        onClose={onClose}
        title="✅ Session created"
        subtitle="Connect your SOCKS5 client with these credentials."
        wide
      >
        <div className="console-created-panel">
          <CopyField label="SOCKS5 connection string" value={created.connection_string} />
          <CopyField label="Session ID (SOCKS5 username)" value={created.session_id} />
          <div className="console-onboarding-row">
            <button type="button" className="console-btn console-btn-primary" onClick={onClose}>
              Go to Sessions →
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  const capMicro = capUsd ? usdToMicrocredits(capUsd) : 0;
  const reserve = Math.max(capMicro, Number(row.buyer_price_microcredits_per_gb) || 0, 10000);
  const insufficient = reserve > spendable;

  return (
    <Modal
      open
      onClose={onClose}
      title={`Buy proxy · ${countryFlag(row.country)} ${row.country === "WorldWide" ? "WorldWide (Random)" : row.country} · ${row.network_type}`}
      subtitle={`$${row.price_per_gb || microcreditsToUsd(row.buyer_price_microcredits_per_gb)} per GB · ${row.available_sellers} seller(s) online${row.country === "WorldWide" ? " across all countries" : ""}`}
    >
      <div className="console-buywizard">
        <Field label="Session type">
          <Segmented
            options={[
              { value: "rotating", label: "🔄 Rotating: fresh IP per connection" },
              { value: "sticky", label: "📌 Sticky: same IP, manual rotation" },
            ]}
            value={sessionType}
            onChange={setSessionType}
          />
        </Field>

        <Field label="Duration (client-side auto-close)" hint="Sessions stay open until you close them or they idle out after 25 hours.">
          <Segmented options={DURATIONS} value={duration} onChange={setDuration} />
        </Field>

        <Field label="Spend cap (reserve)" hint="The reserve is the most you can spend. We refund the unused part when the session closes. Minimum reserve is 1 GB of traffic or your cap, whichever is larger. The ledger converts dollars to microcredits at 1,000,000 per $1.">
          <div className="console-caprow">
            <input
              className="console-input"
              type="number"
              min="0"
              step="0.5"
              placeholder="e.g. 5.00"
              value={capUsd}
              onChange={(e) => setCapUsd(e.target.value)}
            />
            <span className="console-capunit">USD</span>
            {[1, 5, 10, 50].map((v) => (
              <button
                key={v}
                type="button"
                className={`console-btn console-btn-mini ${capUsd === String(v) ? "selected" : ""}`}
                onClick={() => setCapUsd(String(v))}
              >
                ${v}
              </button>
            ))}
          </div>
        </Field>

        <div className="console-buy-summary">
          <div>
            <span>Reserve required</span>
            <strong>{formatUsd(microcreditsToUsd(reserve))}</strong>
          </div>
          <div>
            <span>Spendable</span>
            <strong>{formatUsd(microcreditsToUsd(spendable))}</strong>
          </div>
          {insufficient && (
            <Notice type="error" text="Insufficient spendable balance. Make a deposit first." />
          )}
        </div>

        <button
          type="button"
          className="console-btn console-btn-primary console-btn-block"
          disabled={insufficient || busy}
          onClick={() =>
            onSubmit({
              country: row.country,
              network_type: row.network_type,
              session_type: sessionType,
              spend_cap_microcredits: reserve,
              __durationMin: duration,
            })
          }
        >
          {busy ? "Creating session…" : `Create ${sessionType} session`}
        </button>
      </div>
    </Modal>
  );
}

/* ── Connection drawer ─────────────────────────────────────────────────── */

function ConnectionDrawer({ session, onClose, gateway, checker, onCheck }) {
  const { sessionToken: token } = useAuth();
  if (!session) return null;

  const conn = {
    host: String(gateway || "api.proxybase.xyz:1082").split(":")[0],
    port: String(gateway || "api.proxybase.xyz:1082").split(":")[1] || "1082",
    username: session.session_id,
    password: token,
    uri: `socks5://${session.session_id}:${token}@${gateway || "api.proxybase.xyz:1082"}`,
  };

  const checking = checker.running && checker.forId === session.session_id;
  const results = checker.forId === session.session_id ? checker.results : null;

  return (
    <Modal
      open
      onClose={onClose}
      title="🔌 SOCKS5 Connection"
      subtitle={`${countryFlag(session.country)} ${session.country} · ${session.network_type} · ${session.session_type} · session ${session.session_id.slice(0, 12)}…`}
      wide
    >
      <div className="console-connection">
        <div className="console-conn-grid">
          <CopyField label="Host" value={conn.host} />
          <CopyField label="Port" value={conn.port} />
          <CopyField label="Username (session id)" value={conn.username} />
          <CopyField label="Password (session token)" value={conn.password} secret />
        </div>
        <CopyField label="Connection string" value={conn.uri} />
        <Snippets gateway={gateway} sessionId={session.session_id} token={token} />

        <div className="console-checker">
          <button
            type="button"
            className="console-btn"
            disabled={checking}
            onClick={() => onCheck(session)}
          >
            {checking ? "Checking…" : "▶ Run connectivity check"}
          </button>
          {results && (
            <ul className="console-checker-results">
              {results.map((r, i) => (
                <li key={i}>
                  <span className={`console-checker-mark ${r.ok === true ? "ok" : r.ok === false ? "fail" : "info"}`}>
                    {r.ok === true ? "✓" : r.ok === false ? "✕" : "ℹ"}
                  </span>
                  <div>
                    <strong>{r.step}</strong>
                    {r.ms !== undefined && <span className="console-checker-ms"> {r.ms} ms</span>}
                    <p>{r.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Modal>
  );
}
