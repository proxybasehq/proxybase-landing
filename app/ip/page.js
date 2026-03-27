"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./ip.module.css";

// Provider registry allows easy extension in the future
const providers = [
  {
    id: "ip-api",
    name: "IP-API",
    icon: "🌐",
    fetchData: async (ip) => {
      // Call our internal Next.js API route to bypass CORS block on production
      const res = await fetch(`/api/whois/ip-api?ip=${ip}`);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      if (data.status === "fail") throw new Error(data.message || "Query failed");

      const results = [];
      if (data.query) results.push({ label: "IP Address", value: data.query });
      if (data.reverse) results.push({ label: "Reverse DNS", value: data.reverse });
      
      const loc = [data.city, data.regionName, data.country].filter(Boolean).join(", ");
      if (loc) results.push({ label: "Location", value: loc });
      
      if (data.district) results.push({ label: "District", value: data.district });
      if (data.zip) results.push({ label: "Zip Code", value: data.zip });
      if (data.lat && data.lon) results.push({ label: "Coordinates", value: `${data.lat}, ${data.lon}` });
      if (data.timezone) results.push({ label: "Timezone", value: data.timezone });
      if (data.currency) results.push({ label: "Currency", value: data.currency });
      
      if (data.isp) results.push({ label: "ISP", value: data.isp });
      if (data.org && data.org !== data.isp) results.push({ label: "Organization", value: data.org });
      if (data.as) results.push({ label: "ASN", value: data.as });
      if (data.asname) results.push({ label: "AS Name", value: data.asname });

      // Network flags
      const flags = [];
      if (data.mobile) flags.push("Mobile/Cellular");
      if (data.proxy) flags.push("Proxy/VPN/Tor");
      if (data.hosting) flags.push("Hosting/Data Center");
      if (flags.length > 0) results.push({ label: "Network Type", value: flags.join(" • ") });
      else results.push({ label: "Network Type", value: "Residential / Standard" });

      return results;
    }
  }
];

export default function IpWhoisPage() {
  const [ipInput, setIpInput] = useState("");
  const [results, setResults] = useState(null); // null means hasn't searched yet
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!ipInput.trim()) return;

    setIsSearching(true);

    // Initialize results state with loading for all providers
    const initialResults = {};
    providers.forEach(p => {
      initialResults[p.id] = { status: "loading", data: null, error: null };
    });
    setResults(initialResults);

    // Fetch from all providers concurrently
    await Promise.allSettled(
      providers.map(async (provider) => {
        try {
          const data = await provider.fetchData(ipInput.trim());
          setResults(prev => ({
            ...prev,
            [provider.id]: { status: "success", data, error: null }
          }));
        } catch (err) {
          setResults(prev => ({
            ...prev,
            [provider.id]: { status: "error", data: null, error: err.message }
          }));
        }
      })
    );

    setIsSearching(false);
  };

  return (
    <div className={styles.ipContainer}>
      <Navbar />

      <main className={styles.mainContent}>
        <section className={styles.heroSection}>
          <div className="hero-bg">
            <div className="hero-grid" />
          </div>

          <h1 className={styles.title}>
            IP Whois <span className={styles.gradientText}>Aggregator</span>
          </h1>
          <p className={styles.subtitle}>
            Instantly query IP addresses across multiple data providers.
            Get location, ISP, and ASN data in one unified dashboard.
          </p>

          <div className={styles.searchContainer}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <input
                type="text"
                value={ipInput}
                onChange={(e) => setIpInput(e.target.value)}
                placeholder="Enter IP address (e.g. 8.8.8.8)"
                className={styles.searchInput}
                required
              />
              <button
                type="submit"
                className={styles.searchButton}
                disabled={isSearching}
              >
                {isSearching ? "Searching..." : "Lookup IP"}
              </button>
            </form>
          </div>
        </section>

        <section className={styles.resultsSection}>
          {results ? (
            <div className={styles.resultsGrid}>
              {providers.map((provider) => {
                const result = results[provider.id];
                return (
                  <div key={provider.id} className={styles.providerCard}>
                    <div className={styles.providerHeader}>
                      <div className={styles.providerName}>
                        <span>{provider.icon}</span> {provider.name}
                      </div>
                      {result?.status === "loading" && (
                        <span className={`${styles.providerStatus} ${styles.loading}`}>Fetching...</span>
                      )}
                      {result?.status === "success" && (
                        <span className={styles.providerStatus}>Success</span>
                      )}
                      {result?.status === "error" && (
                        <span className={`${styles.providerStatus} ${styles.error}`}>Failed</span>
                      )}
                    </div>

                    <div className={styles.providerBody}>
                      {result?.status === "loading" && (
                        <div className={styles.dataGrid}>
                          {[1, 2, 3].map(i => (
                            <div key={i} className={styles.dataRow} style={{ opacity: 0.5 }}>
                              <div className={styles.dataLabel} style={{ background: 'var(--border-subtle)', width: '30%', height: '12px', borderRadius: '4px' }}></div>
                              <div className={styles.dataValue} style={{ background: 'var(--bg-secondary)', width: '70%', height: '20px', borderRadius: '4px' }}></div>
                            </div>
                          ))}
                        </div>
                      )}

                      {result?.status === "error" && (
                        <div className={styles.dataRow}>
                          <div className={styles.dataLabel} style={{ color: '#ff5f57' }}>Error</div>
                          <div className={styles.dataValue}>{result.error}</div>
                        </div>
                      )}

                      {result?.status === "success" && result.data && (
                        <div className={styles.dataGrid}>
                          {result.data.map((item, i) => (
                            <div key={i} className={styles.dataRow}>
                              <div className={styles.dataLabel}>{item.label}</div>
                              <div className={styles.dataValue}>{item.value || "N/A"}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.resultsGrid}>
              <div className={styles.emptyState}>
                Enter an IP address above to see Whois results!
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
