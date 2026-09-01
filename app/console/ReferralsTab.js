"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../lib/AuthContext";
import { v2 } from "../lib/v2Client";
import { formatUsd, microcreditsToUsd } from "../lib/walletCrypto";
import { CopyButton, EmptyState, Field, Notice, Panel, Spinner, StatCard } from "./ui";

const MIN_BPS = 1000;
const MAX_BPS = 2500;
const CODE_RE = /^[A-Za-z0-9_-]{3,32}$/;

export default function ReferralsTab() {
  const { sessionToken: token, refreshBalance } = useAuth();

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState(null);

  const [newCode, setNewCode] = useState("");
  const [newBps, setNewBps] = useState("1500");
  const [saving, setSaving] = useState(false);
  const [claiming, setClaiming] = useState(false);

  const load = useCallback(async () => {
    if (!token) return;
    try {
      setStatus(await v2.getReferralStatus(token));
    } catch (err) {
      setNotice({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  if (!token) {
    return <EmptyState icon="🔒" title="No v2 session yet" sub="Complete wallet onboarding first." />;
  }

  const link =
    status?.ref_code && typeof window !== "undefined"
      ? `${window.location.origin}/console?ref=${encodeURIComponent(status.ref_code)}`
      : null;

  async function handleCreateCode() {
    setSaving(true);
    setNotice(null);
    try {
      const code = newCode.trim().toLowerCase();
      if (code && !CODE_RE.test(code)) {
        throw new Error("Code must be 3-32 characters: letters, numbers, _ or -");
      }
      let bps = parseInt(newBps, 10);
      if (Number.isNaN(bps)) bps = 1500;
      bps = Math.min(MAX_BPS, Math.max(MIN_BPS, bps));
      await v2.createReferralCode(token, {
        code: code || undefined,
        commission_bps: bps,
      });
      setNotice({ type: "success", text: `Referral code saved. Commission: ${bps / 100}%.` });
      await load();
    } catch (err) {
      setNotice({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  }

  async function handleClaim() {
    setClaiming(true);
    setNotice(null);
    try {
      const r = await v2.claimReferralYield(token);
      if (r.claimed_microcredits > 0) {
        setNotice({
          type: "success",
          text: `Claimed ${formatUsd(microcreditsToUsd(r.claimed_microcredits))} to your spendable balance.`,
        });
      } else {
        setNotice({ type: "info", text: "Nothing claimable right now." });
      }
      await refreshBalance();
      await load();
    } catch (err) {
      setNotice({ type: "error", text: err.message });
    } finally {
      setClaiming(false);
    }
  }

  const claimable = status?.claimable_microcredits || 0;

  return (
    <div className="console-tab">
      <Notice text={notice?.text} type={notice?.type} onDismiss={() => setNotice(null)} />

      {status?.referred_by_ref_code && (
        <Notice
          type="info"
          text={`You were referred with code "${status.referred_by_ref_code}". Your deposits earn a +10% bonus.`}
        />
      )}

      <div className="console-statgrid">
        <StatCard
          label="Claimable yield"
          value={formatUsd(microcreditsToUsd(claimable))}
          sub="not yet spendable"
          accent="green"
        />
        <StatCard
          label="Lifetime earned"
          value={formatUsd(microcreditsToUsd(status?.lifetime_microcredits))}
          sub="all referral commissions"
          accent="cyan"
        />
        <StatCard
          label="Referees"
          value={String(status?.referee_count ?? 0)}
          sub="wallets you referred"
          accent="violet"
        />
        <StatCard
          label="Commission"
          value={status?.commission_bps != null ? `${(status.commission_bps / 100).toFixed(2)}%` : "—"}
          sub="on deposits and platform spread"
          accent="amber"
        />
      </div>

      {/* ── Claim ────────────────────────────────────────────────────── */}
      <Panel title="💰 Claim Referral Earnings">
        {loading && <Spinner label="Loading referral status…" />}
        {!loading && claimable > 0 ? (
          <>
            <p className="console-panel-note">
              You have <strong>{formatUsd(microcreditsToUsd(claimable))}</strong> in claimable
              referral yield. Claiming moves it to your spendable balance, ready to use in the
              market.
            </p>
            <button
              type="button"
              className="console-btn console-btn-primary"
              disabled={claiming}
              onClick={handleClaim}
            >
              {claiming ? "Claiming…" : "Claim to Spendable Balance"}
            </button>
          </>
        ) : (
          !loading && (
            <EmptyState
              icon="🌱"
              title="No claimable yield yet"
              sub="You earn a commission on your referees' deposits and on the platform spread from their bandwidth. Share your link to start earning."
            />
          )
        )}
      </Panel>

      {/* ── Link ─────────────────────────────────────────────────────── */}
      <Panel title="🔗 Your Referral Link">
        {link ? (
          <div className="console-copyfield">
            <div className="console-copyfield-label">
              Share this link. New users who sign up with it become your referees.
            </div>
            <div className="console-copyfield-row">
              <code className="console-copyfield-value mono">{link}</code>
              <CopyButton text={link} />
            </div>
          </div>
        ) : (
          !loading && (
            <EmptyState
              icon="🎁"
              title="No referral code yet"
              sub="Create one below to get your shareable link."
            />
          )
        )}
      </Panel>

      {/* ── Code ─────────────────────────────────────────────────────── */}
      <Panel title="✏️ Create or Edit Your Code">
        <div className="console-deposit-form">
          <div className="console-deposit-row">
            <Field label="Referral code" hint="3-32 characters: letters, numbers, _ or -. Leave empty to auto-generate one.">
              <input
                className="console-input"
                type="text"
                placeholder={status?.ref_code || "fleet01"}
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
              />
            </Field>
            <Field label="Commission rate" hint={`Clamped to ${MIN_BPS / 100}-${MAX_BPS / 100}%`}>
              <div className="console-caprow">
                <input
                  className="console-input"
                  type="number"
                  min={MIN_BPS}
                  max={MAX_BPS}
                  step="100"
                  value={newBps}
                  onChange={(e) => setNewBps(e.target.value)}
                />
                <span className="console-capunit">bps</span>
              </div>
            </Field>
          </div>
          <button
            type="button"
            className="console-btn console-btn-primary"
            disabled={saving}
            onClick={handleCreateCode}
          >
            {saving ? "Saving…" : status?.ref_code ? "Update Code" : "Create Code"}
          </button>
        </div>
      </Panel>
    </div>
  );
}
