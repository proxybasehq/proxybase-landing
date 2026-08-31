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
  Modal,
  Notice,
  Panel,
  Spinner,
  StatCard,
  StatusDot,
} from "./ui";

const POLL_MS = 10000;
const PRESETS = [5, 10, 25, 50, 100];

function cryptoUri(currency, address, amount) {
  const c = String(currency || "").toLowerCase();
  if (c === "btc") return `bitcoin:${address}?amount=${amount}`;
  if (c === "eth") return `ethereum:${address}?value=${amount}`;
  return address;
}

function elapsedSince(isoOrSql) {
  if (!isoOrSql) return "—";
  const t = Date.parse(String(isoOrSql).replace(" ", "T") + (String(isoOrSql).includes("T") ? "" : "Z"));
  if (isNaN(t)) return "—";
  const secs = Math.floor((Date.now() - t) / 1000);
  if (secs < 0) return "0s";
  if (secs < 60) return `${secs}s`;
  const m = Math.floor(secs / 60);
  if (m < 60) return `${m}m ${secs % 60}s`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}

export default function DepositsTab() {
  const { sessionToken: token, balance, wallet, refreshBalance } = useAuth();

  const [currencies, setCurrencies] = useState(null);
  const [currency, setCurrency] = useState("usdcsol");
  const [amountUsd, setAmountUsd] = useState("10");
  const [creating, setCreating] = useState(false);
  const [invoice, setInvoice] = useState(null); // {deposit, qr}
  const [history, setHistory] = useState(null);
  const [transferAmount, setTransferAmount] = useState("");
  const [busyTransfer, setBusyTransfer] = useState(false);
  const [faucetKey, setFaucetKey] = useState("");
  const [faucetAmount, setFaucetAmount] = useState("5000000");
  const [busyFaucet, setBusyFaucet] = useState(false);
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
    const storedKey = localStorage.getItem("pb_dev_admin_key");
    if (storedKey) setFaucetKey(storedKey);
  }, [token, loadHistory, currency]);

  useEffect(() => () => clearInterval(pollRef.current), []);

  async function pollInvoice(depositId) {
    clearInterval(pollRef.current);
    pollRef.current = setInterval(async () => {
      try {
        const d = await v2.getDeposit(token, depositId);
        setInvoice((prev) => (prev ? { ...prev, deposit: d } : prev));
        if (["confirmed", "underpaid", "overpaid", "expired", "failed"].includes(d.status)) {
          clearInterval(pollRef.current);
          refreshBalance();
          loadHistory();
          if (d.status === "confirmed" || d.status === "overpaid") {
            setNotice({ type: "success", text: `Deposit ${d.status} — balance credited.` });
          }
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

  async function handleTransfer() {
    setBusyTransfer(true);
    setNotice(null);
    try {
      const amount = Math.round(parseFloat(transferAmount));
      if (!amount || amount <= 0) throw new Error("Enter microcredits to move");
      const b = await v2.transfer(token, amount);
      refreshBalance();
      setNotice({
        type: "success",
        text: `Transferred ${amount.toLocaleString()} µ$ from seller balance to buyer balance.`,
      });
      setTransferAmount("");
    } catch (err) {
      setNotice({ type: "error", text: err.message });
    } finally {
      setBusyTransfer(false);
    }
  }

  async function handleFaucet() {
    setBusyFaucet(true);
    setNotice(null);
    try {
      localStorage.setItem("pb_dev_admin_key", faucetKey);
      const r = await v2.devCredit(faucetKey, wallet.address, Number(faucetAmount));
      refreshBalance();
      setNotice({ type: "success", text: r.message || `Credited ${Number(r.credited).toLocaleString()} µ$.` });
    } catch (err) {
      setNotice({
        type: "error",
        text: `${err.message} — requires a backend running with DEV_MODE=true and its ADMIN_API_KEY.`,
      });
    } finally {
      setBusyFaucet(false);
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
          sub={`${Number(balance?.spendable_balance || 0).toLocaleString()} µ$ · buyer + seller`}
          accent="cyan"
        />
        <StatCard
          label="Buyer available"
          value={formatUsd(microcreditsToUsd(balance?.buyer_available))}
          sub={`${Number(balance?.buyer_available || 0).toLocaleString()} µ$`}
          accent="green"
        />
        <StatCard
          label="Reserved"
          value={formatUsd(microcreditsToUsd(balance?.buyer_reserved))}
          sub={`${Number(balance?.buyer_reserved || 0).toLocaleString()} µ$ in open sessions`}
          accent="violet"
        />
        <StatCard
          label="Spent"
          value={formatUsd(microcreditsToUsd(spent))}
          sub={`${Number(spent).toLocaleString()} µ$ lifetime`}
          accent="amber"
        />
      </div>

      {/* ── Deposit ─────────────────────────────────────────────────── */}
      <Panel title="💳 Create Crypto Deposit">
        {invoice ? (
          <InvoiceCard invoice={invoice} onDone={() => setInvoice(null)} />
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
              <Field label="Amount (USD)" hint="1 µ$ = $0.000001">
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
                = {(usdToMicrocredits(parseFloat(amountUsd) || 0)).toLocaleString()} µ$
              </span>
            </div>
            <button
              type="button"
              className="console-btn console-btn-primary"
              disabled={creating}
              onClick={handleCreateDeposit}
            >
              {creating ? "Creating invoice…" : "Create NOWPayments invoice →"}
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
                    <td>
                      <code>{d.deposit_id.slice(0, 14)}…</code>
                    </td>
                    <td className="num">
                      {Number(d.amount_microcredits).toLocaleString()} µ$ ·{" "}
                      {formatUsd(microcreditsToUsd(d.amount_microcredits))}
                    </td>
                    <td>
                      <StatusDot status={d.status} /> {d.status}
                    </td>
                    <td>{d.created_at || "—"}</td>
                    <td>{d.updated_at || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      {/* ── Transfer + faucet ───────────────────────────────────────── */}
      <div className="console-twocol">
        <Panel title="⇄ Transfer Microcredits" className="console-half">
          <p className="console-panel-note">
            Moves <strong>seller_available → buyer_available</strong> (dual-mode
            wallets only). Current seller balance:{" "}
            {Number(balance?.seller_available || 0).toLocaleString()} µ$.
          </p>
          <div className="console-caprow">
            <input
              className="console-input"
              type="number"
              min="0"
              placeholder="Microcredits"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
            />
            <span className="console-capunit">µ$</span>
            <button
              type="button"
              className="console-btn console-btn-primary"
              disabled={busyTransfer}
              onClick={handleTransfer}
            >
              {busyTransfer ? "Moving…" : "Transfer"}
            </button>
          </div>
        </Panel>

        <Panel title="🧪 Dev Credit Faucet" className="console-half">
          <p className="console-panel-note">
            Dev only — requires the backend to run with <code>DEV_MODE=true</code>{" "}
            and this admin API key.
          </p>
          <div className="console-caprow">
            <input
              className="console-input"
              type="password"
              placeholder="ADMIN_API_KEY"
              value={faucetKey}
              onChange={(e) => setFaucetKey(e.target.value)}
            />
            <input
              className="console-input"
              type="number"
              min="0"
              value={faucetAmount}
              onChange={(e) => setFaucetAmount(e.target.value)}
            />
            <span className="console-capunit">µ$</span>
            <button
              type="button"
              className="console-btn console-btn-primary"
              disabled={busyFaucet || !faucetKey}
              onClick={handleFaucet}
            >
              {busyFaucet ? "Crediting…" : "Credit"}
            </button>
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ── Invoice card ──────────────────────────────────────────────────────── */

function InvoiceCard({ invoice, onDone }) {
  const { deposit, qr } = invoice;
  const [now, setNow] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(iv);
  }, []);

  const done = ["confirmed", "underpaid", "overpaid", "expired", "failed"].includes(deposit.status);

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
        <div className="console-invoice-timer" title="Time since invoice creation">
          ⏱ {elapsedSince(deposit.created_at)}
        </div>
      </div>
      <div className="console-invoice-details">
        <div className="console-invoice-amount">
          {deposit.pay_amount != null && (
            <strong>
              {deposit.pay_amount} {deposit.pay_currency || ""}
            </strong>
          )}
          <span>
            {Number(deposit.amount_microcredits).toLocaleString()} µ$ ·{" "}
            {formatUsd(microcreditsToUsd(deposit.amount_microcredits))}
          </span>
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
            : "Auto-polling every 10 seconds. Keep this window open until the payment is detected."}
        </p>
        <button type="button" className="console-btn console-btn-ghost" onClick={onDone}>
          {done ? "Close invoice" : "Hide invoice (keeps polling in background)"}
        </button>
      </div>
    </div>
  );
}
