export const metadata = {
    title: "Free DNS Record Lookup — Check DNS Records, DMARC & SPF | ProxyBase",
    description:
        "Free DNS lookup tool. Dump all DNS record types (A, AAAA, MX, TXT, NS, CNAME, SOA, CAA, SRV, NAPTR, PTR) for any domain. Includes DMARC audit, SPF verification, and DNS host detection.",
    keywords: "DNS lookup, free DNS lookup, DNS record lookup, DNS checker, DNS propagation checker, reverse DNS lookup, MX lookup, DNS records, check DNS records, DMARC check",
    alternates: {
        canonical: "/dns",
    },
    openGraph: {
        title: "Free DNS Record Lookup — Check DNS Records, DMARC & SPF | ProxyBase",
        description:
            "Free DNS lookup tool. Dump all DNS record types for any domain with DMARC audit, SPF verification, and DNS provider detection.",
        url: "https://proxybase.xyz/dns",
    },
};

export default function DnsLayout({ children }) {
    return children;
}
