# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```
npm run dev       # Start dev server (localhost:3000)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Architecture

This is a Next.js 16 (App Router) frontend for **ProxyBase** — a SOCKS5 proxy infrastructure service built exclusively for AI agents. It serves a landing page, API docs, free tools (IP/domain WHOIS, HTTP headers inspector), an MPP payment-gated proxy store, and a blog.

### Routing patterns

- **Catch-all pages**: `/ip/[[...ip]]` and `/whois/[[...domain]]` support both the tool root (`/ip`) and direct lookups (`/ip/8.8.8.8`). The page reads the first segment from `useParams()`, then triggers search via `useEffect`.
- **SSR vs client**: Simple static pages (`/what-is-proxybase`, `/terms`, `/openclaw`, `/blog/*`) are server components. Tools with user input (`/ip`, `/whois`, `/headers`) and the homepage are client components.
- **API routes**: Proxy external services to avoid CORS in production — `app/api/whois/ip-api`, `app/api/whois/ipinfo`, `app/api/whois/domain`, `app/api/headers`. The MPP payment route at `app/api/mpp/[package_id]/route.js` wraps proxy provisioning behind `mppx` crypto payment.

### Middleware (`middleware.js`)

Two functions:
1. Redirects `www.proxybase.xyz` → `proxybase.xyz` (301).
2. On `GET /`, if the User-Agent is a non-browser client (curl, wget, python-requests, etc.) and `Accept` doesn't include `text/html`, returns a plain-text API reference markdown instead of the landing page.

### Packages library (`app/lib/packages.js`)

`fetchPackages()` calls the backend API to get proxy packages. Has in-memory caching with 5-min TTL. Consumed by both the `/mpp` page (SSR) and the MPP API route. Requires env vars `BACKEND_API_URL` and `THIRD_PARTY_AGENT_API_KEY`.

### Environment variables

- `BACKEND_API_URL` — backend API base (defaults to `https://api.proxybase.xyz`)
- `THIRD_PARTY_AGENT_API_KEY` — API key for authenticating backend calls

### Key dependencies

- `mppx` — Micropayments Protocol; used via `mppx/nextjs` to gate the MPP API route behind crypto payment (Tempo/USDC on Solana)
- `cheerio` — HTML parsing, used only by `app/api/whois/ipinfo` to scrape ipinfo.io
- Analytics: self-hosted Umami (`analytics.proxybase.xyz`), triggered via `data-umami-event` attributes

### Styling

Global styles in `app/globals.css` with CSS custom properties. Per-page module CSS files for tool pages (`ip.module.css`, `whois.module.css`, `headers.module.css`). No CSS framework — all hand-written.
