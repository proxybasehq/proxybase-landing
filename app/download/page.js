"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./download.module.css";

/* ── Constants ── */
const OS_META = {
  macos: { label: "macOS", icon: "\u{1F347}" },
  windows: { label: "Windows", icon: "\u{1FA9F}" },
  linux: { label: "Linux", icon: "\u{1F427}" },
  android: { label: "Android", icon: "\u{1F4F1}" },
  unknown: { label: "your system", icon: "\u{1F4BB}" },
};

const OS_ORDER = ["macos", "windows", "linux"];
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
function PlatformCard({ os, assets, isPrimary }) {
  const primary = bestAsset(assets);
  const alternatives = assets.filter((a) => a !== primary);
  const meta = OS_META[os] || OS_META.unknown;

  if (!primary) return null;

  return (
    <div className={`${styles.os_card} ${isPrimary ? styles.primary_card : ""}`}>
      {isPrimary && (
        <div className={styles.recommended_badge}>
          Recommended for your device
        </div>
      )}
      <div className={styles.os_header}>
        <span className={styles.os_icon}>{meta.icon}</span>
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
        data-umami-event={`download-${os}`}
        rel="noopener noreferrer"
      >
        Download {meta.label} ({formatSize(primary.size)})
      </a>

      {alternatives.map((a) => (
        <a
          key={a.name}
          href={a.url}
          className={`${styles.download_btn} ${styles.download_btn_secondary}`}
          data-umami-event={`download-${os}-alt`}
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
          >
            GUI Client
          </button>
          <button
            className={`${styles.tab_btn} ${activeTab === "cli" ? styles.tab_btn_active : ""}`}
            onClick={() => setActiveTab("cli")}
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
            <button className={styles.retry_btn} onClick={fetchReleases}>
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
                  <PlatformCard key={os} os={os} assets={grouped[os]} />
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
                          <span className={styles.os_icon}>{meta.icon}</span>
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
