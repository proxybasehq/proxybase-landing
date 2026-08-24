export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/"],
        },
        sitemap: "https://proxybase.xyz/sitemap.xml",
    };
}
