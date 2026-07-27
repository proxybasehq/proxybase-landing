"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./download.module.css";

/* ── Constants ── */
const OS_META = {
  macos: { label: "macOS" },
  windows: { label: "Windows" },
  linux: { label: "Linux" },
  android: { label: "Android" },
  unknown: { label: "your system" },
};

/* ── OS SVG Icons (24x24, currentColor) ── */
function OsIcon({ os, size = 36 }) {
  const s = size;
  switch (os) {
    case "macos":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="currentColor"/>
        </svg>
      );
    case "windows":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 12V6.5l8-1.1V12H3zm0 .5h8v6.6l-8-1.1V12.5zm9.5-7.6L21 3v9h-8.5V4.9zm0 15.2V12H21v9l-8.5-1.1v-6.8z" fill="currentColor"/>
        </svg>
      );
    case "linux":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-.15 15.85c-2.25 0-4.1-1.5-4.1-3.35 0-.55.15-1.1.35-1.6-.25-.6-.4-1.3-.35-2 .05-.7.25-1.35.55-1.95.45.65 1.05 1.15 1.75 1.5.7.35 1.5.5 2.3.5s1.6-.15 2.3-.5c.7-.35 1.3-.85 1.75-1.5.3.6.5 1.25.55 1.95.05.7-.1 1.4-.35 2 .2.5.35 1.05.35 1.6 0 1.85-1.85 3.35-4.1 3.35z" fill="currentColor"/>
          <ellipse cx="9.5" cy="10.5" rx="1" ry="1.2" fill="currentColor"/>
          <ellipse cx="14.5" cy="10.5" rx="1" ry="1.2" fill="currentColor"/>
          <path d="M10.5 13.5c.5.3 1.1.5 1.5.5.4 0 1-.2 1.5-.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
        </svg>
      );
    case "android":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 18c0 .55.45 1 1 1h1v3.5a1.5 1.5 0 003 0V19h2v3.5a1.5 1.5 0 003 0V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zM15.5 2.5l1.3-1.3c.2-.2.2-.5 0-.7s-.5-.2-.7 0L14.7 1.9C13.9 1.4 13 1 12 1s-1.9.4-2.7.9L7.9.5c-.2-.2-.5-.2-.7 0s-.2.5 0 .7L8.5 2.5C7.1 3.5 6 5.1 6 7h12c0-1.9-1.1-3.5-2.5-4.5zM9 6c-.28 0-.5-.22-.5-.5S8.72 5 9 5s.5.22.5.5S9.28 6 9 6zm6 0c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z" fill="currentColor"/>
        </svg>
      );
    default:
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
  }
}

const OS_ORDER = ["macos", "windows", "linux", "android"];
const EXT_PRIORITY = { dmg: 0, msi: 0, deb: 0, exe: 1, rpm: 1, appimage: 1, "tar.gz": 0, zip: 0, apk: 0 };

/* ── Helpers ── */
function detectOS() {
  if (typeof window === "undefined") return "unknown";
  const p = (navigator.platform || "").toLowerCase();
  const ua = (navigator.userAgent || "").toLowerCase();

  if (p.includes("mac") || ua.includes("mac os")) return "macos";
  if (p.includes("win")) return "windows";
  if (p.includes("linux") || p.includes("x11")) return "linux";
  return "unknown";
}

function formatSize(bytes) {
  if (bytes == null) return "";
  const mb = bytes / (1024 * 1024);
  if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`;
  return `${mb.toFixed(1)} MB`;
}

function getExt(name) {
  const lower = name.toLowerCase();
  if (lower.endsWith(".tar.gz")) return "tar.gz";
  if (lower.endsWith(".appimage")) return "appimage";
  return name.split(".").pop().toLowerCase();
}

function bestAsset(assets) {
  if (!assets || assets.length === 0) return null;
  const sorted = [...assets].sort(
    (a, b) => (EXT_PRIORITY[getExt(a.name)] ?? 99) - (EXT_PRIORITY[getExt(b.name)] ?? 99)
  );
  return sorted[0];
}

function groupByOS(assets) {
  const map = {};
  for (const a of assets) {
    if (!a.os) continue;
    if (!map[a.os]) map[a.os] = [];
    map[a.os].push(a);
  }
  return map;
}

/* ── Skeleton ── */
function LoadingSkeleton() {
  return (
    <div className={styles.loading_grid}>
      {[1, 2, 3].map((n) => (
        <div key={n} className={styles.skeleton_card}>
          <div className={styles.skeleton_line} />
          <div className={styles.skeleton_line} />
          <div className={styles.skeleton_line} />
          <div className={styles.skeleton_line} />
        </div>
      ))}
    </div>
  );
}

/* ── Platform Card ── */
function PlatformCard({ os, assets, isPrimary, product }) {
  const primary = bestAsset(assets);
  const alternatives = assets.filter((a) => a !== primary);
  const meta = OS_META[os] || OS_META.unknown;
  const ext = getExt(primary?.name || "");

  if (!primary) return null;

  return (
    <div className={`${styles.os_card} ${isPrimary ? styles.primary_card : ""}`}>
      {isPrimary && (
        <div className={styles.recommended_badge}>
          Recommended for your device
        </div>
      )}
      <div className={styles.os_header}>
        <OsIcon os={os} />
        <div className={styles.os_text}>
          <h3>{meta.label}</h3>
          <span>{primary.arch && primary.arch !== "universal" ? primary.arch : ""}</span>
        </div>
      </div>
      <p className={styles.os_desc}>
        {os === "macos"
          ? "Native macOS app. Just open the DMG and drag to Applications."
          : os === "windows"
          ? "Windows installer. Download, run the MSI, and you're set."
          : os === "linux"
          ? "Debian package for Ubuntu/Debian. RPM and AppImage also available."
          : os === "android"
          ? "Android APK. Sideload on your Android device."
          : `Download for ${meta.label}.`}
      </p>

      {alternatives.length > 0 && (
        <div className={styles.asset_list}>
          {alternatives.map((a) => (
            <div key={a.name} className={styles.asset_row}>
              <span className={styles.asset_label}>.{getExt(a.name)}</span>
              <span className={styles.asset_size}>{formatSize(a.size)}</span>
            </div>
          ))}
        </div>
      )}

      <a
        href={primary.url}
        className={styles.download_btn}
        data-umami-event={`Download: ${isPrimary ? "Primary " : ""}${meta.label} ${ext.toUpperCase()} ${product}`}
        rel="noopener noreferrer"
      >
        Download {meta.label} ({formatSize(primary.size)})
      </a>

      {alternatives.map((a) => (
        <a
          key={a.name}
          href={a.url}
          className={`${styles.download_btn} ${styles.download_btn_secondary}`}
          data-umami-event={`Download: ${meta.label} ${getExt(a.name).toUpperCase()} ${product}`}
          rel="noopener noreferrer"
        >
          Download .{getExt(a.name)} ({formatSize(a.size)})
        </a>
      ))}
    </div>
  );
}

/* ── Main Page ── */
export default function DownloadPage() {
  const [activeTab, setActiveTab] = useState("gui");
  const [releases, setReleases] = useState(null);
  const [detectedOS, setDetectedOS] = useState("unknown");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReleases = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/releases");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setReleases(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setDetectedOS(detectOS());
    fetchReleases();
  }, [fetchReleases]);

  const tabData = releases?.[activeTab];
  const grouped = tabData?.assets ? groupByOS(tabData.assets) : {};

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Download ProxyBase Client",
    description:
      "Download ProxyBase native GUI or headless CLI daemon for Windows, macOS, and Linux to start sharing bandwidth.",
    url: "https://proxybase.xyz/download",
  };

  /* ── Install command helpers ── */
  const cliInstallCmd = (os) => {
    switch (os) {
      case "macos":
        return "curl -fsSL https://proxybase.xyz/install.sh | sh";
      case "linux":
        return "curl -fsSL https://proxybase.xyz/install.sh | sh";
      case "windows":
        return 'irm https://proxybase.xyz/install.ps1 | iex';
      default:
        return null;
    }
  };

  const isCli = activeTab === "cli";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.hero_overlay} />
        <div className={styles.hero_glow_1} />
        <div className={styles.hero_glow_2} />

        <div className={styles.hero_content}>
          <div className={styles.badge}>Client Downloads</div>
          <h1>Download ProxyBase</h1>
          <p className={styles.hero_subtitle}>
            Run a secure, sandboxed node on your device. Sell idle internet
            bandwidth and earn stablecoins automatically.
          </p>
        </div>
      </section>

      {/* ── Downloads ── */}
      <section className={styles.section}>
        {/* Tab switcher */}
        <div className={styles.tab_bar}>
          <button
            className={`${styles.tab_btn} ${activeTab === "gui" ? styles.tab_btn_active : ""}`}
            onClick={() => setActiveTab("gui")}
            data-umami-event="Download: Switch GUI"
          >
            GUI Client
          </button>
          <button
            className={`${styles.tab_btn} ${activeTab === "cli" ? styles.tab_btn_active : ""}`}
            onClick={() => setActiveTab("cli")}
            data-umami-event="Download: Switch CLI"
          >
            CLI Daemon
          </button>
        </div>

        {/* Loading */}
        {loading && <LoadingSkeleton />}

        {/* Error */}
        {!loading && error && (
          <div className={styles.error_container}>
            <h3>Could not load downloads</h3>
            <p>{error}. GitHub may be rate-limiting us — try again in a moment.</p>
            <button className={styles.retry_btn} onClick={fetchReleases} data-umami-event="Download: Retry">
              Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && !tabData && (
          <div className={styles.empty_state}>
            No {activeTab === "gui" ? "GUI" : "CLI"} releases available yet.
          </div>
        )}

        {/* Content */}
        {!loading && !error && tabData && (
          <>
            {/* Primary recommended card (detected OS) */}
            {detectedOS !== "unknown" && grouped[detectedOS] && (
              <PlatformCard
                os={detectedOS}
                assets={grouped[detectedOS]}
                isPrimary
                product={activeTab === "gui" ? "GUI" : "CLI"}
              />
            )}

            {/* All-platform grid */}
            {detectedOS === "unknown" && (
              <p className={styles.section_label}>Choose your platform</p>
            )}
            {detectedOS !== "unknown" && (
              <p className={styles.section_label}>
                Other platforms
              </p>
            )}

            <div className={styles.cards_grid}>
              {OS_ORDER.map((os) => {
                if (!grouped[os]) return null;
                if (os === detectedOS) return null; // Already shown as primary
                return (
                  <PlatformCard key={os} os={os} assets={grouped[os]} product={activeTab === "gui" ? "GUI" : "CLI"} />
                );
              })}
            </div>

            {/* CLI install commands */}
            {isCli && tabData.version && (
              <div style={{ marginTop: "48px" }}>
                <p className={styles.section_label}>Or install via command line</p>
                <div className={styles.cards_grid}>
                  {OS_ORDER.map((os) => {
                    const cmd = cliInstallCmd(os);
                    if (!cmd) return null;
                    const meta = OS_META[os];
                    return (
                      <div key={os} className={styles.os_card}>
                        <div className={styles.os_header}>
                          <OsIcon os={os} />
                          <div className={styles.os_text}>
                            <h3>{meta.label}</h3>
                            <span>Terminal</span>
                          </div>
                        </div>
                        <div className={styles.cli_install}>
                          <strong>$</strong> {cmd}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Version info */}
            <p
              style={{
                textAlign: "center",
                marginTop: "48px",
                fontSize: "0.8rem",
                color: "var(--text-muted)",
              }}
            >
              {activeTab === "gui" ? "GUI" : "CLI"}{" "}
              {tabData.version}
              {tabData.published_at &&
                ` — released ${new Date(tabData.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}`}
            </p>
          </>
        )}
      </section>

      <Footer />
    </>
  );
}
