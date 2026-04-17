"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "../whois.module.css"; // We'll copy ip.module.css to whois.module.css

// Provider registry allows easy extension in the future
const providers = [
  {
    id: "rdap",
    name: "RDAP WHOIS",
    icon: "🌐",
    fetchData: async (domain) => {
      // Call our internal Next.js API route to fetch RDAP data
      const res = await fetch(`/api/whois/domain?domain=${domain}`);
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Network response was not ok");
      }
      
      const data = await res.json();
      
      const results = [];
      results.push({ label: "Domain Handle", value: data.handle || "N/A" });
      
      const ldhName = data.ldhName;
      if (ldhName) results.push({ label: "Domain Name", value: ldhName });

      // Parse status
      if (data.status && data.status.length > 0) {
        results.push({ label: "Status", value: data.status.join(", ") });
      }

      // Parse events (registration, expiration, etc)
      if (data.events) {
        data.events.forEach((evt) => {
          let label = evt.eventAction;
          if (label) {
            // Capitalize
            label = label.charAt(0).toUpperCase() + label.slice(1);
            results.push({ label, value: new Date(evt.eventDate).toLocaleString() });
          }
        });
      }

      // Nameservers
      if (data.nameservers) {
        const nsList = data.nameservers.map(ns => ns.ldhName).join(", ");
        results.push({ label: "Name Servers", value: nsList });
      }

      // Entities (Registrar, Registrant)
      if (data.entities) {
        data.entities.forEach(entity => {
          if (entity.roles && entity.vcardArray && entity.vcardArray[1]) {
            const role = entity.roles[0];
            const nameVcard = entity.vcardArray[1].find(item => item[0] === "fn");
            if (nameVcard) {
                // capitalize role
                const roleCapitalized = role.charAt(0).toUpperCase() + role.slice(1);
                results.push({ label: roleCapitalized, value: nameVcard[3] });
            }
          }
        });
      }

      if (data.port43) {
        results.push({ label: "Port 43 WHOIS", value: data.port43 });
      }

      return results;
    }
  }
];

export default function DomainWhoisPage() {
  const params = useParams();
  const router = useRouter();

  // [[...domain]] catch-all sets params.domain as an array. E.g. /whois/example.com -> ["example.com"]
  const urlDomain = params?.domain?.[0] || "";

  const [domainInput, setDomainInput] = useState(urlDomain);
  const [results, setResults] = useState(null); // null means hasn't searched yet
  const [isSearching, setIsSearching] = useState(false);

  const lastSearchedDomain = useRef("");

  useEffect(() => {
    // If we have a URL Domain and it differs from the last searched Domain
    if (urlDomain && lastSearchedDomain.current !== urlDomain) {
      lastSearchedDomain.current = urlDomain;
      setDomainInput(urlDomain);
      executeSearch(urlDomain);
    }
  }, [urlDomain, domainInput]);

  const executeSearch = async (searchDomain) => {
    setIsSearching(true);

    // Clean up domain if it has http/https or trailing slashes
    let cleaned = searchDomain.trim().toLowerCase();
    cleaned = cleaned.replace(/^https?:\/\//, '');
    cleaned = cleaned.split('/')[0];

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
          const data = await provider.fetchData(cleaned);
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

  const handleSearch = (e) => {
    e.preventDefault();
    let cleanDomain = domainInput.trim().toLowerCase();
    if (!cleanDomain) return;
    
    // Quick sanitization before routing
    cleanDomain = cleanDomain.replace(/^https?:\/\//, '').split('/')[0];

    // Changing the URL drives the search via the useEffect hook
    if (cleanDomain !== urlDomain) {
      router.push(`/whois/${cleanDomain}`);
    } else {
      // Force search again if same Domain clicked
      executeSearch(cleanDomain);
    }
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
            Domain Whois <span className={styles.gradientText}>Lookup</span>
          </h1>
          <p className={styles.subtitle}>
            Instantly query domain registration records using modern RDAP protocols.
            Get registrar, status, and WHOIS details effortlessly.
          </p>

          <div className={styles.searchContainer}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <input
                type="text"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                placeholder="Enter domain name (e.g. proxybase.xyz)"
                className={styles.searchInput}
                required
              />
              <button
                type="submit"
                className={styles.searchButton}
                disabled={isSearching}
              >
                {isSearching ? "Searching..." : "Lookup Domain"}
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

                    <div className={styles.providerContent}>
                      {result?.status === "loading" && (
                        <div className={styles.skeletonContainer}>
                          <div className={styles.skeletonLine} />
                          <div className={styles.skeletonLine} />
                          <div className={styles.skeletonLine} />
                        </div>
                      )}

                      {result?.status === "error" && (
                        <div className={styles.errorMessage}>
                          {result.error}
                        </div>
                      )}

                      {result?.status === "success" && result.data && (
                        <div className={styles.dataGrid}>
                          {result.data.map((item, idx) => (
                            <div key={idx} className={styles.dataItem}>
                              <div className={styles.dataLabel}>{item.label}</div>
                              <div className={styles.dataValue}>{item.value}</div>
                            </div>
                          ))}
                          {result.data.length === 0 && (
                            <div className={styles.errorMessage}>
                              No specific data returned for this domain.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <h3>Real-Time Data</h3>
                <p>Directly queries authoritative registries using RDAP standard.</p>
              </div>
              <div className={styles.featureCard}>
                <h3>Lightning Fast</h3>
                <p>We query the appropriate TLD namespace instantly.</p>
              </div>
              <div className={styles.featureCard}>
                <h3>Comprehensive Info</h3>
                <p>Includes Registration, Expiry dates, Nameservers & Status codes.</p>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
