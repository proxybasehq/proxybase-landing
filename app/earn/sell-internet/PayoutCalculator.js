"use client";

import { useMemo, useState } from "react";
import styles from "./payout-calculator.module.css";

const FLAT_RATE_APPS = [
  { name: "Honeygain", rate: 0.1, minPayout: 20 },
  { name: "Pawns.app", rate: 0.2, minPayout: 5 },
  { name: "PacketStream", rate: 0.1, minPayout: 5 },
];

const PROXYBASE_LOW = 1.8;
const PROXYBASE_HIGH = 3.0;

function formatUsd(value) {
  if (value >= 1000) {
    return `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  }
  return `$${value.toFixed(2)}`;
}

export default function PayoutCalculator() {
  const [gb, setGb] = useState(30);

  const results = useMemo(() => {
    const safeGb = Number.isFinite(gb) ? Math.max(0, gb) : 0;
    return {
      proxyLow: safeGb * PROXYBASE_LOW,
      proxyHigh: safeGb * PROXYBASE_HIGH,
      apps: FLAT_RATE_APPS.map((app) => {
        const monthly = safeGb * app.rate;
        return {
          ...app,
          monthly,
          monthsToPayout: monthly > 0 ? Math.ceil(app.minPayout / monthly) : null,
        };
      }),
    };
  }, [gb]);

  function handleGbChange(event) {
    const next = Number(event.target.value);
    setGb(Number.isFinite(next) ? Math.min(1000, Math.max(0, next)) : 0);
  }

  return (
    <div className={styles.calculator}>
      <div className={styles.controls}>
        <div className={styles.inputGroup}>
          <label htmlFor="payout-gb" className={styles.label}>
            Data shared per month
          </label>
          <div className={styles.inputRow}>
            <input
              id="payout-gb"
              type="range"
              min="1"
              max="300"
              step="1"
              value={Math.min(300, Math.max(1, gb))}
              onChange={handleGbChange}
              className={styles.range}
              aria-label="Data shared per month in gigabytes"
            />
            <div className={styles.numberWrap}>
              <input
                type="number"
                min="0"
                max="1000"
                value={gb}
                onChange={handleGbChange}
                className={styles.number}
                aria-label="Gigabytes per month"
              />
              <span className={styles.unit}>GB</span>
            </div>
          </div>
        </div>
        <p className={styles.note}>
          Estimates use reported US residential rates. ProxyBase payouts vary by
          country, network type, and live demand.
        </p>
      </div>

      <div className={styles.results}>
        <div className={`${styles.resultCard} ${styles.highlight}`}>
          <span className={styles.appName}>ProxyBase marketplace</span>
          <span className={styles.amount}>
            {formatUsd(results.proxyLow)} &ndash; {formatUsd(results.proxyHigh)}
          </span>
          <span className={styles.amountLabel}>per month</span>
          <span className={styles.detail}>
            Market rate, $1 minimum cashout
          </span>
        </div>

        {results.apps.map((app) => (
          <div key={app.name} className={styles.resultCard}>
            <span className={styles.appName}>{app.name}</span>
            <span className={styles.amount}>{formatUsd(app.monthly)}</span>
            <span className={styles.amountLabel}>per month</span>
            <span className={styles.detail}>
              {app.monthsToPayout === null
                ? "Enter a data volume"
                : app.monthsToPayout <= 1
                  ? `Reaches the $${app.minPayout.toFixed(0)} payout in under a month`
                  : `~${app.monthsToPayout} months to the $${app.minPayout.toFixed(0)} payout`}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <p>
          At <strong>{gb} GB/month</strong>, the marketplace range is roughly{" "}
          <strong>
            {formatUsd(results.proxyLow)}&ndash;{formatUsd(results.proxyHigh)}
          </strong>{" "}
          vs <strong>{formatUsd(results.apps[0].monthly)}</strong> on Honeygain
          &mdash; before its $20 payout threshold.
        </p>
        <a href="/markets" className={styles.cta}>
          Start earning &rarr;
        </a>
      </div>
    </div>
  );
}
