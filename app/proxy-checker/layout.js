export const metadata = {
    title: "Free Proxy Checker — Test SOCKS5 & HTTP Proxies (Latency, Exit IP) | ProxyBase",
    description:
        "Free online proxy checker. Test SOCKS5 and HTTP proxies: connectivity, exit IP, latency, and whether the proxy hides your real IP. No signup, works from your browser.",
    keywords: "proxy checker, free proxy checker, socks proxy checker, proxy checker online, proxy tester, check proxy, socks5 checker, proxy detection test, proxy list checker, proxybase",
    alternates: {
        canonical: "/proxy-checker",
    },
    openGraph: {
        title: "Free Proxy Checker — Test SOCKS5 & HTTP Proxies | ProxyBase",
        description:
            "Free online proxy checker. Test SOCKS5 and HTTP proxies: connectivity, exit IP, latency, and anonymity.",
        url: "https://proxybase.xyz/proxy-checker",
    },
};

export default function ProxyCheckerLayout({ children }) {
    return children;
}
