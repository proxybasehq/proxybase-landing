import { NextResponse } from "next/server";

const API_MARKDOWN = `# ProxyBase API
## AI Infrastructure for Agents

Base URL: https://api.proxybase.xyz
SOCKS5: api.proxybase.xyz:1080
MCP Server: https://github.com/proxybasehq/proxybase-mcp

---

## Authentication

All endpoints (except agent registration) require the \`X-API-Key\` header.

---

## Endpoints

### POST /agents
Register a new AI agent and receive an API key.

\`\`\`
curl -X POST https://api.proxybase.xyz/agents
\`\`\`

Response:
\`\`\`json
{
  "agent_id": "6xAMqAGN",
  "api_key": "pk_c8c91c8a0e5b3e2c..."
}
\`\`\`

---

### GET /packages
List available proxy bandwidth packages.

\`\`\`
curl https://api.proxybase.xyz/packages -H "X-API-Key: pk_YOUR_KEY"
\`\`\`

Packages:
| ID                  | Bandwidth | Price  |
|---------------------|-----------|--------|
| us_residential_1gb  | 1 GB      | $10    |
| us_residential_5gb  | 5 GB      | $50    |
| us_residential_10gb | 10 GB     | $100   |

---

### GET /currencies
List available payment currencies for orders and top-ups.

\`\`\`
curl https://api.proxybase.xyz/currencies -H "X-API-Key: pk_YOUR_KEY"
\`\`\`

Response:
\`\`\`json
{
  "currencies": ["btc", "eth", "sol", "usdttrc20", "ltc", ...]
}
\`\`\`

---

### POST /orders
Create a new proxy order with crypto payment.

\`\`\`
curl -X POST https://api.proxybase.xyz/orders \\
  -H "X-API-Key: pk_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"package_id":"us_residential_1gb","pay_currency":"sol"}'
\`\`\`

Response:
\`\`\`json
{
  "order_id": "kQx7p3Wn",
  "payment_id": "5832461907",
  "pay_address": "TXyz...",
  "pay_currency": "sol",
  "pay_amount": 0.058,
  "price_usd": 10.00,
  "status": "payment_pending"
}
\`\`\`

Parameters:
- package_id (required): Package ID from /packages
- pay_currency (optional): Use GET /currencies for valid values (default: "usdttrc20")
- callback_url (optional): Webhook URL for notifications

---

### GET /orders/{order_id}/status
Poll order status. Returns proxy credentials when active.

\`\`\`
curl https://api.proxybase.xyz/orders/kQx7p3Wn/status \\
  -H "X-API-Key: pk_YOUR_KEY"
\`\`\`

Response when proxy is active:
\`\`\`json
{
  "order_id": "kQx7p3Wn",
  "status": "proxy_active",
  "bandwidth_bytes": 1073741824,
  "used_bytes": 52428800,
  "remaining_bytes": 1021313024,
  "usage_percentage": 4.88,
  "proxy": {
    "host": "api.proxybase.xyz",
    "port": 1080,
    "username": "pb_a1b2c3d4e5f6g7h8",
    "password": "9f8e7d6c5b4a3210"
  }
}
\`\`\`

Status flow: payment_pending → confirming → paid → proxy_active → bandwidth_exhausted

---

### POST /orders/{order_id}/topup
Add bandwidth to an existing proxy. Same credentials, more bandwidth.

\`\`\`
curl -X POST https://api.proxybase.xyz/orders/kQx7p3Wn/topup \\
  -H "X-API-Key: pk_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"package_id":"us_residential_1gb"}'
\`\`\`

---

## Quick Start

1. Register:  curl -X POST https://api.proxybase.xyz/agents
2. List:      curl https://api.proxybase.xyz/packages -H "X-API-Key: pk_..."
3. Currencies: curl https://api.proxybase.xyz/currencies -H "X-API-Key: pk_..."
4. Order:     curl -X POST https://api.proxybase.xyz/orders -H "X-API-Key: pk_..." -d '{"package_id":"us_residential_1gb"}'
5. Pay the crypto address returned in step 4
6. Poll:      curl https://api.proxybase.xyz/orders/{id}/status -H "X-API-Key: pk_..."
7. Connect:   socks5://username:password@api.proxybase.xyz:1080

## MCP Server

Download pre-built binaries: https://github.com/proxybasehq/proxybase-mcp/releases

Add to your MCP client config:
\`\`\`json
{
  "mcpServers": {
    "proxybase": {
      "command": "/path/to/proxybase-mcp"
    }
  }
}
\`\`\`

Tools: register_agent, list_packages, list_currencies, create_order, check_order_status, topup_order
`;

// Non-browser user agents that should receive markdown
const NON_BROWSER_PATTERNS = [
  "curl",
  "wget",
  "httpie",
  "python-requests",
  "python-urllib",
  "go-http-client",
  "java",
  "libfetch",
  "lwp-request",
  "axios",
  "node-fetch",
  "undici",
  "got",
  "scrapy",
  "aiohttp",
  "reqwest",
  "http.rb",
  "faraday",
];

export function middleware(request) {
  const ua = (request.headers.get("user-agent") || "").toLowerCase();

  // Only intercept root path
  if (request.nextUrl.pathname !== "/") {
    return NextResponse.next();
  }

  // Check if it looks like a non-browser client
  const isNonBrowser =
    !ua ||
    NON_BROWSER_PATTERNS.some((pattern) => ua.includes(pattern));

  // Also check Accept header — browsers send text/html
  const accept = request.headers.get("accept") || "";
  const wantsHtml = accept.includes("text/html");

  if (isNonBrowser && !wantsHtml) {
    return new NextResponse(API_MARKDOWN, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
