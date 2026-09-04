"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../lib/AuthContext";
import { v2, API_BASE } from "../lib/v2Client";
import { CopyButton, EmptyState, Field, Panel, Segmented, StatusDot } from "./ui";


const MAX_LOG = 300;

function highlightJson(value) {
  const str = JSON.stringify(value, null, 2);
  return str.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false)\b|\bnull\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = "json-number";
      if (/^"/.test(match)) cls = /:$/.test(match) ? "json-key" : "json-string";
      else if (/true|false/.test(match)) cls = "json-bool";
      else if (/null/.test(match)) cls = "json-null";
      return `<span class="${cls}">${match}</span>`;
    }
  );
}

function ts() {
  return new Date().toLocaleTimeString("en-US", { hour12: false });
}

/* ── SSE event terminal ────────────────────────────────────────────────── */

function EventTerminal({ token }) {
  const [logs, setLogs] = useState([]);
  const [connected, setConnected] = useState(false);
  const [paused, setPaused] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const [health, setHealth] = useState(null);
  const bodyRef = useRef(null);
  const esRef = useRef(null);

  const pushLog = useCallback((entry) => {
    setLogs((prev) => [...prev.slice(-(MAX_LOG - 1)), entry]);
  }, []);

  useEffect(() => {
    if (!token) return undefined;

    v2.health()
      .then((h) => setHealth(h))
      .catch(() => setHealth(null));

    const es = new EventSource(v2.eventsUrl(token));
    esRef.current = es;

    es.onopen = () => {
      setConnected(true);
      pushLog({ kind: "info", t: ts(), event: "client", data: "Event stream connected." });
    };
    es.onmessage = (ev) => {
      let parsed = ev.data;
      try {
        parsed = JSON.parse(ev.data);
      } catch {
        /* keep raw */
      }
      pushLog({ kind: "event", t: ts(), event: parsed?.event || "message", data: parsed?.data ?? parsed });
    };
    es.onerror = () => {
      setConnected(false);
      pushLog({ kind: "error", t: ts(), event: "client", data: "Event stream interrupted. Reconnecting…" });
    };

    return () => {
      es.close();
      esRef.current = null;
    };
  }, [token, pushLog]);

  useEffect(() => {
    if (autoScroll && bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const visible = paused ? logs.slice(-50) : logs;

  return (
    <div className="console-terminal">
      <div className="console-terminal-head">
        <div className="console-terminal-state">
          <StatusDot status={connected ? "connected" : "closed"} />
          {connected ? "live" : "disconnected"}
          {health && (
            <span className="console-terminal-health">
              backend: {health.status} · {health.connected_sellers ?? 0} sellers ·{" "}
              {health.active_sessions ?? 0} sessions
            </span>
          )}
        </div>
        <div className="console-terminal-actions">
          <button type="button" className="console-btn console-btn-mini" onClick={() => setAutoScroll(!autoScroll)}>
            {autoScroll ? "⇩ autoscroll on" : "⇩ autoscroll off"}
          </button>
          <button type="button" className="console-btn console-btn-mini" onClick={() => setPaused(!paused)}>
            {paused ? "▶ resume" : "⏸ pause"}
          </button>
          <button type="button" className="console-btn console-btn-mini" onClick={() => setLogs([])}>
            clear
          </button>
        </div>
      </div>
      <div className="console-terminal-body" ref={bodyRef}>
        {visible.length === 0 && (
          <div className="console-terminal-idle">Waiting for events. {connected ? "listening" : "offline"}…</div>
        )}
        {visible.map((line, i) => (
          <div key={i} className={`console-terminal-line line-${line.kind}`}>
            <span className="console-terminal-ts">[{line.t}]</span>
            <span className="console-terminal-event">{line.event}</span>
            <span className="console-terminal-data">
              {typeof line.data === "string" ? line.data : JSON.stringify(line.data)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── API explorer ──────────────────────────────────────────────────────── */

const METHODS = ["GET", "POST", "DELETE"];

function Explorer({ token }) {
  const [method, setMethod] = useState("GET");
  const [path, setPath] = useState("/wallet/balance");
  const [body, setBody] = useState("");
  const [withAuth, setWithAuth] = useState(true);
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [history, setHistory] = useState([]);

  async function send() {
    setRunning(true);
    const t0 = performance.now();
    try {
      const res = await fetch(`${API_BASE}${path}`, {
        method,
        headers: {
          ...(withAuth && token ? { Authorization: `Bearer ${token}` } : {}),
          ...(body.trim() ? { "Content-Type": "application/json" } : {}),
        },
        body: body.trim() ? body : undefined,
      });
      const text = await res.text();
      let parsed = null;
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = text;
      }
      const entry = {
        id: Date.now(),
        method,
        path,
        body: body.trim() || null,
        status: res.status,
        ms: Math.round(performance.now() - t0),
        parsed,
      };
      setResult(entry);
      setHistory((prev) => [entry, ...prev].slice(0, 8));
    } catch (err) {
      setResult({ id: Date.now(), method, path, status: 0, ms: 0, parsed: { error: String(err) } });
    } finally {
      setRunning(false);
    }
  }

  const curl = `curl -X ${method} '${API_BASE}${path}'${
    withAuth && token ? ` \\\n  -H 'Authorization: Bearer ${token}'` : ""
  }${body.trim() ? ` \\\n  -H 'Content-Type: application/json' \\\n  -d '${body.trim()}'` : ""}`;

  return (
    <div className="console-explorer">
      <div className="console-explorer-row">
        <select className="console-input console-select console-method" value={method} onChange={(e) => setMethod(e.target.value)}>
          {METHODS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <input
          className="console-input console-explorer-path mono"
          placeholder="/wallet/balance"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <label className="console-checkbox">
          <input type="checkbox" checked={withAuth} onChange={(e) => setWithAuth(e.target.checked)} />
          bearer token
        </label>
        <button type="button" className="console-btn console-btn-primary" disabled={running} onClick={send}>
          {running ? "Sending…" : "Send →"}
        </button>
      </div>

      {(method === "POST" || method === "DELETE") && (
        <textarea
          className="console-input console-textarea mono"
          rows={5}
          placeholder='{"country": "US", "network_type": "residential", "session_type": "rotating"}'
          value={body}
          onChange={(e) => setBody(e.target.value)}
          spellCheck={false}
        />
      )}

      {history.length > 0 && (
        <div className="console-explorer-history">
          {history.map((h) => (
            <button
              key={h.id}
              type="button"
              className="console-btn console-btn-mini"
              onClick={() => {
                setMethod(h.method);
                setPath(h.path);
                setBody(h.body || "");
                setResult(h);
              }}
              title={`${h.method} ${h.path}`}
            >
              <span className={`console-history-status st-${Math.floor(h.status / 100)}`}>{h.status}</span>{" "}
              {h.method} {h.path} · {h.ms}ms
            </button>
          ))}
        </div>
      )}

      {result && (
        <div className="console-explorer-result">
          <div className="console-explorer-result-head">
            <span>
              <strong>
                {result.method} {API_BASE}{result.path}
              </strong>{" "}
              <span className={`console-history-status st-${Math.floor(result.status / 100)}`}>
                {result.status || "ERR"}
              </span>{" "}
              · {result.ms} ms
            </span>
            <CopyButton text={curl} label="Copy cURL" />
          </div>
          <pre
            className="console-codeblock-pre console-json"
            dangerouslySetInnerHTML={{
              __html: highlightJson(result.parsed),
            }}
          />
        </div>
      )}

      <p className="console-panel-note">
        Requests connect directly to <code>{API_BASE}/*</code> without routing through Vercel serverless compute.
      </p>
    </div>
  );
}

export default function TelemetryTab() {
  const { sessionToken: token } = useAuth();

  if (!token) {
    return <EmptyState icon="🔒" title="No v2 session yet" sub="Complete wallet onboarding first." />;
  }

  return (
    <div className="console-tab">
      <Panel title="📡 Live Event Stream (SSE)">
        <EventTerminal token={token} />
      </Panel>
      <Panel title="🧭 Interactive v2 API Explorer">
        <Explorer token={token} />
      </Panel>
    </div>
  );
}
