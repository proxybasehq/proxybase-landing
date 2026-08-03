export const metadata = {
    title: "Free WHOIS Domain Lookup — Check Domain Registration & RDAP Records | ProxyBase",
    description:
        "Free domain WHOIS lookup using modern RDAP protocol. Check domain registration dates, nameservers, registrar details, and domain status codes for any TLD. Real-time data, no caching.",
    keywords: "WHOIS lookup, free WHOIS lookup, domain WHOIS, RDAP WHOIS, whois domain lookup, domain registration lookup, check domain owner, whois IP lookup, domain search, whois tool",
    alternates: {
        canonical: "/whois",
    },
    openGraph: {
        title: "Free WHOIS Domain Lookup — Check Domain Registration & RDAP Records | ProxyBase",
        description:
            "Free domain WHOIS lookup using modern RDAP protocol. Real-time registration data, nameservers, and domain status for any TLD.",
        url: "https://proxybase.xyz/whois",
    },
};

export default function WhoisLayout({ children }) {
    return children;
}
