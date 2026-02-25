---
description: How to use the ProxyBase API to purchase and manage SOCKS5 proxies programmatically
---

# ProxyBase API — SKILL.md

ProxyBase provides SOCKS5 proxy infrastructure for AI agents via a REST API.

## Base URL

```
https://api.proxybase.xyz/v1
```

SOCKS5 endpoint: `api.proxybase.xyz:1080`

## Authentication

All endpoints except `/v1/agents` require the `X-API-Key` header with a key starting with `pk_`.

## Workflow

### Step 1: Register Agent

```bash
curl -X POST https://api.proxybase.xyz/v1/agents
```

Save the returned `api_key`. Use it in all subsequent requests.

### Step 2: List Available Packages

```bash
curl https://api.proxybase.xyz/v1/packages \
  -H "X-API-Key: pk_YOUR_KEY"
```

Returns an array of packages. Each has `id`, `name`, `bandwidth_bytes`, `price_usd`, `proxy_type`, `country`.

Available packages:
- `us_residential_1gb` — 1 GB, $10
- `us_residential_5gb` — 5 GB, $50
- `us_residential_10gb` — 10 GB, $100

### Step 3: List Available Currencies

```bash
curl https://api.proxybase.xyz/v1/currencies \
  -H "X-API-Key: pk_YOUR_KEY"
```

Returns the list of valid `pay_currency` values for orders and top-ups.

### Step 4: Create Order

```bash
curl -X POST https://api.proxybase.xyz/v1/orders \
  -H "X-API-Key: pk_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "package_id": "us_residential_1gb",
    "pay_currency": "usdttrc20"
  }'
```

Parameters:
- `package_id` (required): ID from step 2
- `pay_currency` (optional): Use `GET /v1/currencies` for valid values (default: `usdttrc20`)
- `callback_url` (optional): URL to receive webhook notifications

Returns `order_id`, `payment_id`, `pay_address`, `pay_amount`, and `status`.

### Step 5: Send Payment

Send the exact `pay_amount` in the specified `pay_currency` to the `pay_address`.

### Step 6: Poll Order Status

```bash
curl https://api.proxybase.xyz/v1/orders/{order_id}/status \
  -H "X-API-Key: pk_YOUR_KEY"
```

Status progression: `payment_pending` → `confirming` → `paid` → `proxy_active` → `bandwidth_exhausted`

When status is `proxy_active`, the response includes:
```json
{
  "proxy": {
    "host": "api.proxybase.xyz",
    "port": 1080,
    "username": "pb_xxxx",
    "password": "xxxx"
  }
}
```

### Step 7: Use the Proxy

Connect via SOCKS5: `socks5://username:password@api.proxybase.xyz:1080`

Example with curl:
```bash
curl --proxy socks5://pb_xxxx:xxxx@api.proxybase.xyz:1080 https://example.com
```

Example with Python:
```python
import requests
proxies = {"https": "socks5://pb_xxxx:xxxx@api.proxybase.xyz:1080"}
r = requests.get("https://example.com", proxies=proxies)
```

### Step 8: Top Up (Optional)

When bandwidth runs low, add more without changing credentials:

```bash
curl -X POST https://api.proxybase.xyz/v1/orders/{order_id}/topup \
  -H "X-API-Key: pk_YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"package_id": "us_residential_1gb"}'
```

### Step 9: Rotate Proxy (Optional)

Get a fresh IP address without changing your credentials:

```bash
curl -X POST https://api.proxybase.xyz/v1/orders/{order_id}/rotate \
  -H "X-API-Key: pk_YOUR_KEY"
```

Response:
```json
{
  "order_id": "kQx7p3Wn",
  "message": "Proxy rotated successfully. You will receive a fresh IP on your next connection.",
  "rotated": true
}
```

## MCP Server

For AI assistants (Claude, Cursor, etc.), use the MCP server:

```json
{
  "mcpServers": {
    "proxybase": {
      "command": "/path/to/proxybase-mcp"
    }
  }
}
```

Download: https://github.com/proxybasehq/proxybase-mcp/releases

Tools: `register_agent`, `list_packages`, `list_currencies`, `create_order`, `check_order_status`, `topup_order`, `rotate_proxy`

## Important Notes

- Proxies never expire by time — only by bandwidth consumption
- You can have multiple active proxies simultaneously
- Bandwidth is tracked in real-time at byte level
- Top-ups are additive — they extend your existing bandwidth
- If you provide a `callback_url`, you get webhook notifications at 80% and 95% usage
