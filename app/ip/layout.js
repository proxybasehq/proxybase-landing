export const metadata = {
    title: "Free IP Lookup — Check IP Address Geolocation, ISP & Proxy Detection | ProxyBase",
    description:
        "Free IP lookup tool. Check any IPv4 or IPv6 address across multiple providers. Get geolocation, ISP, ASN, network type, and proxy/VPN detection in one unified dashboard.",
    keywords: "IP lookup, free IP lookup, IP address lookup, IP geolocation, IP whois, reverse IP lookup, check IP address, IP location finder, my IP address, IP checker",
    alternates: {
        canonical: "/ip",
    },
    openGraph: {
        title: "Free IP Lookup — Check IP Address Geolocation, ISP & Proxy Detection | ProxyBase",
        description:
            "Free IP lookup tool. Check any IPv4 or IPv6 address across multiple providers. Geolocation, ISP, ASN, and proxy detection in one dashboard.",
        url: "https://proxybase.xyz/ip",
    },
};

export default function IpLayout({ children }) {
    return children;
}
