export const metadata = {
    title: "Free HTTP Headers Inspector — Debug Request & Response Headers | ProxyBase",
    description:
        "Free HTTP headers inspector. See every request and response header your browser or proxy sends. Debug X-Forwarded-For, verify proxy chains, inspect CDN caching and security headers in real time.",
    keywords: "HTTP headers inspector, HTTP headers checker, check HTTP headers, request headers viewer, response headers, debug proxy headers, X-Forwarded-For checker, HTTP status codes, HTTP header viewer, free headers tool",
    alternates: {
        canonical: "/headers",
    },
    openGraph: {
        title: "Free HTTP Headers Inspector — Debug Request & Response Headers | ProxyBase",
        description:
            "See every HTTP request and response header your connection sends. Debug proxies, verify forwarding headers, and inspect security headers in real time.",
        url: "https://proxybase.xyz/headers",
    },
};

export default function HeadersLayout({ children }) {
    return children;
}
