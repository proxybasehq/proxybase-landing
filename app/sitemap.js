export default function sitemap() {
    return [
        {
            url: "https://proxybase.xyz",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: "https://proxybase.xyz/openclaw",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
    ];
}
