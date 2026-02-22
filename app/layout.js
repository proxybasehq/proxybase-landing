import "./globals.css";

export const metadata = {
  title: "ProxyBase — AI Infrastructure for Agents",
  description:
    "Programmatic SOCKS5 proxy infrastructure built exclusively for AI agents. REST API, MCP support, crypto payments. No dashboards, no humans required.",
  keywords: "socks5 proxy, ai agent, mcp, api, residential proxy, mobile proxy",
  openGraph: {
    title: "ProxyBase — AI Infrastructure for Agents",
    description:
      "Programmatic SOCKS5 proxy infrastructure built for AI agents. REST API, MCP ready, crypto payments.",
    url: "https://proxybase.xyz",
    siteName: "ProxyBase",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
