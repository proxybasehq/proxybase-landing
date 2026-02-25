import "./globals.css";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://proxybase.xyz"),
  title: "ProxyBase — AI Infrastructure for Agents",
  description:
    "Programmatic SOCKS5 proxy infrastructure built exclusively for AI agents. REST API, MCP support, crypto payments. No dashboards, no humans required.",
  keywords: "socks5 proxy, ai agent, mcp, api, proxy api, residential proxy, mobile proxy, autonomous agents, web scraping",
  authors: [{ name: "ProxyBase" }],
  creator: "ProxyBase",
  applicationName: "ProxyBase",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ProxyBase — AI Infrastructure for Agents",
    description:
      "Programmatic SOCKS5 proxy infrastructure built exclusively for AI agents. REST API, MCP support, crypto payments.",
    url: "https://proxybase.xyz",
    siteName: "ProxyBase",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProxyBase — AI Infrastructure for Agents",
    description: "Programmatic SOCKS5 proxies built for autonomous AI agents. No dashboards. No humans. Just an API.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          defer
          src="https://analytics.proxybase.xyz/script.js"
          data-website-id="8757d609-8571-4d69-896e-23f8a00bea62"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
