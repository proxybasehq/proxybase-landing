export const metadata = {
    title: "Domain Whois Lookup — Free RDAP Domain Intelligence | ProxyBase",
    description:
        "Free domain Whois lookup powered by RDAP. Check domain registration details, registrar, nameservers, expiration dates, and DNSSEC status.",
    alternates: {
        canonical: "/whois",
    },
    openGraph: {
        title: "Domain Whois Lookup — Free RDAP Domain Intelligence | ProxyBase",
        description:
            "Free domain Whois lookup powered by RDAP. Check domain registration details, registrar, nameservers, expiration dates, and DNSSEC status.",
        url: "https://proxybase.xyz/whois",
    },
};

export default function WhoisLayout({ children }) {
    return children;
}
