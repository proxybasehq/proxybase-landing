"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { useAuth } from "../lib/AuthContext";
import { v2 } from "../lib/v2Client";
import { formatUsd, microcreditsToUsd, usdToMicrocredits } from "../lib/walletCrypto";
import {
  CopyButton,
  EmptyState,
  Field,
  Notice,
  Panel,
  Spinner,
  StatCard,
  StatusDot,
} from "./ui";

const POLL_MS = 10000;
const PRESETS = [5, 10, 25, 50, 100];
const INVOICE_WINDOW_SECS = 9 * 60; // countdown display starts at 09:00

function cryptoUri(currency, address, amount) {
  const c = String(currency || "").toLowerCase();
  if (c === "btc") return `bitcoin:${address}?amount=${amount}`;
  if (c === "eth") return `ethereum:${address}?value=${amount}`;
  return address;
}

export default function DepositsTab() {
  const { sessionToken: token, balance, refreshBalance } = useAuth();

  const [currencies, setCurrencies] = useState(null);
  const [currency, setCurrency] = useState("usdcsol");
  const [amountUsd, setAmountUsd] = useState("10");
  const [creating, setCreating] = useState(false);
  const [invoice, setInvoice] = useState(null); // {deposit, qr}
  const [history, setHistory] = useState(null);
  const [notice, setNotice] = useState(null);

  const pollRef = useRef(null);

  const loadHistory = useCallback(async () => {
    if (!token) return;
    try {
      const data = await v2.listDeposits(token);
      setHistory(data.deposits || []);
    } catch {
      /* backend may not expose deposits yet */
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    v2.listCurrencies(token)
      .then((data) => {
        setCurrencies(data.currencies || []);
        if (data.currencies && !data.currencies.includes(currency)) {
          setCurrency(data.currencies[0] || "usdcsol");
        }
      })
      .catch(() => setCurrencies(["usdcsol", "btc", "eth", "usdt", "sol"]));
    loadHistory();
  }, [token, loadHistory, currency]);

  useEffect(() => () => clearInterval(pollRef.current), []);

  async function pollInvoice(depositId) {
    clearInterval(pollRef.current);
    pollRef.current = setInterval(async () => {
      try {
        const d = await v2.getDeposit(token, depositId);
        // The status endpoint doesn't return pay_address/pay_amount/pay_currency —
        // merge instead of replace so the payment details stay on screen.
        setInvoice((prev) =>
          prev
            ? {
                ...prev,
                deposit: {
                  ...d,
                  pay_address: prev.deposit.pay_address ?? d.pay_address ?? null,
                  pay_amount: prev.deposit.pay_amount ?? d.pay_amount ?? null,
                  pay_currency: prev.deposit.pay_currency ?? d.pay_currency ?? null,
                },
              }
            : prev
        );
        if (["confirmed", "underpaid", "overpaid", "expired", "failed"].includes(d.status)) {
          clearInterval(pollRef.current);
          refreshBalance();
          loadHistory();
          if (d.status === "confirmed" || d.status === "overpaid") {
            setNotice({ type: "success", text: `Deposit ${d.status} — balance credited.` });
          } else if (d.status === "underpaid") {
            setNotice({ type: "info", text: "Deposit underpaid — the amount received has been credited." });
          } else {
            setNotice({ type: "error", text: `Deposit ${d.status}.` });
          }
          setInvoice(null);
        }
      } catch {
        /* transient */
      }
    }, POLL_MS);
  }

  async function handleCreateDeposit() {
    setCreating(true);
    setNotice(null);
    try {
      const usd = parseFloat(amountUsd);
      if (!usd || usd <= 0) throw new Error("Enter a valid USD amount");
      const d = await v2.createDeposit(token, {
        amount_microcredits: usdToMicrocredits(usd),
        pay_currency: currency,
      });
      const qrPayload = cryptoUri(currency, d.pay_address || "", d.pay_amount || "");
      let qr = null;
      try {
        qr = await QRCode.toDataURL(qrPayload, { width: 260, margin: 2 });
      } catch {
        /* QR unavailable */
      }
      setInvoice({ deposit: d, qr });
      pollInvoice(d.deposit_id);
    } catch (err) {
      setNotice({ type: "error", text: err.message });
    } finally {
      setCreating(false);
    }
  }

  if (!token) {
    return <EmptyState icon="🔒" title="No v2 session yet" sub="Complete wallet onboarding first." />;
  }

  const spent = Number(balance?.buyer_spent || 0);

  return (
    <div className="console-tab">
      <Notice text={notice?.text} type={notice?.type} onDismiss={() => setNotice(null)} />

      <div className="console-statgrid">
        <StatCard
          label="Spendable"
          value={formatUsd(microcreditsToUsd(balance?.spendable_balance))}
          sub="buyer + seller balance"
          accent="cyan"
        />
        <StatCard
          label="Buyer available"
          value={formatUsd(microcreditsToUsd(balance?.buyer_available))}
          sub="ready to spend"
          accent="green"
        />
        <StatCard
          label="Reserved"
          value={formatUsd(microcreditsToUsd(balance?.buyer_reserved))}
          sub="held by open sessions"
          accent="violet"
        />
        <StatCard
          label="Spent"
          value={formatUsd(microcreditsToUsd(spent))}
          sub="lifetime total"
          accent="amber"
        />
      </div>

      {/* ── Deposit ─────────────────────────────────────────────────── */}
      <Panel title="💳 Create Crypto Deposit">
        {invoice ? (
          <InvoiceCard invoice={invoice} />
        ) : (
          <div className="console-deposit-form">
            <div className="console-deposit-row">
              <Field label="Currency">
                <select
                  className="console-input console-select"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  {(currencies || []).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Amount (USD)" hint="Converts to microcredits (1,000,000 per $1) on the ledger">
                <div className="console-caprow">
                  <input
                    className="console-input"
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={amountUsd}
                    onChange={(e) => setAmountUsd(e.target.value)}
                  />
                  <span className="console-capunit">USD</span>
                </div>
              </Field>
            </div>
            <div className="console-presetrow">
              {PRESETS.map((v) => (
                <button
                  key={v}
                  type="button"
                  className={`console-btn console-btn-mini ${amountUsd === String(v) ? "selected" : ""}`}
                  onClick={() => setAmountUsd(String(v))}
                >
                  ${v}
                </button>
              ))}
              <span className="console-preset-equals">
                = {formatUsd(parseFloat(amountUsd) || 0)}
              </span>
            </div>
            <button
              type="button"
              className="console-btn console-btn-primary"
              disabled={creating}
              onClick={handleCreateDeposit}
            >
              {creating ? "Creating invoice…" : "Deposit Now!"}
            </button>
          </div>
        )}
      </Panel>

      {/* ── History ─────────────────────────────────────────────────── */}
      <Panel title="🧾 Deposit History">
        {!history && <Spinner label="Loading history…" />}
        {history && history.length === 0 && (
          <EmptyState icon="🧾" title="No deposits yet" sub="Your crypto deposits will be listed here." />
        )}
        {history && history.length > 0 && (
          <div className="console-table-wrap">
            <table className="console-table">
              <thead>
                <tr>
                  <th>Deposit</th>
                  <th className="num">Amount</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {history.map((d) => (
                  <tr key={d.deposit_id}>
                    <td data-label="Deposit">
                      <code>{d.deposit_id.slice(0, 14)}…</code>
                    </td>
                    <td data-label="Amount" className="num">
                      {formatUsd(microcreditsToUsd(d.amount_microcredits))}
                    </td>
                    <td data-label="Status">
                      <StatusDot status={d.status} /> {d.status}
                    </td>
                    <td data-label="Created">{d.created_at || "—"}</td>
                    <td data-label="Updated">{d.updated_at || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

    </div>
  );
}

/* ── Invoice card ──────────────────────────────────────────────────────── */

function InvoiceCard({ invoice }) {
  const { deposit, qr } = invoice;
  const [remaining, setRemaining] = useState(INVOICE_WINDOW_SECS);

  useEffect(() => {
    const iv = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(iv);
  }, []);

  const done = ["confirmed", "underpaid", "overpaid", "expired", "failed"].includes(deposit.status);
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <div className="console-invoice">
      <div className="console-invoice-qr">
        {qr ? (
          <img src={qr} alt="Payment QR code" className="console-qr" />
        ) : (
          <div className="console-qr console-qr-fallback">QR unavailable</div>
        )}
        <div className="console-invoice-status">
          <StatusDot status={deposit.status} /> {deposit.status}
        </div>
        <div className="console-invoice-timer" title="Countdown since invoice creation">
          ⏱ {mm}:{ss}
        </div>
      </div>
      <div className="console-invoice-details">
        <div className="console-invoice-amount">
          {deposit.pay_amount != null && (
            <strong>
              {deposit.pay_amount} {deposit.pay_currency || ""}
            </strong>
          )}
          <span>{formatUsd(microcreditsToUsd(deposit.amount_microcredits))}</span>
        </div>
        {deposit.pay_address && (
          <div className="console-copyfield">
            <div className="console-copyfield-label">Pay address (exact amount — send only {deposit.pay_currency})</div>
            <div className="console-copyfield-row">
              <code className="console-copyfield-value mono">{deposit.pay_address}</code>
              <CopyButton text={deposit.pay_address} />
            </div>
          </div>
        )}
        <div className="console-copyfield">
          <div className="console-copyfield-label">Payment ID</div>
          <div className="console-copyfield-row">
            <code className="console-copyfield-value mono">{deposit.payment_id || "—"}</code>
            {deposit.payment_id && <CopyButton text={String(deposit.payment_id)} />}
          </div>
        </div>
        <p className="console-panel-note">
          {done
            ? "This invoice has finished processing."
            : remaining === 0
              ? "Invoice window elapsed — we'll keep watching for your payment."
              : "Auto-polling every 10 seconds. Keep this window open until the payment is detected."}
        </p>
      </div>
    </div>
  );
}
