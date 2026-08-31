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

This is a Next.js 16 (App Router) frontend for **ProxyBase** — a SOCKS5 proxy infrastructure service built exclusively for AI agents. It serves a landing page, API docs, free tools (IP/domain WHOIS, HTTP headers inspector), an MPP payment-gated proxy store, a blog, and the **v2 web console** (`/console`).

## v2 Web Console & Google Auth

The `/console` route is a buyer-only web console for the backend's v2 P2P marketplace (catalog, sessions, deposits, wallet keystore, SSE telemetry, API explorer). Seller features are intentionally absent — seller relays are CLI/GUI-only.

- **Auth**: mandatory Google OAuth (popup + code exchange at `/api/auth/google`, session cookie `pb_session` signed with `PB_AUTH_SECRET`). In dev, when `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` are unset, demo sign-in is available (`demo@proxybase.local`).
- **Wallet storage**: Neon Postgres via `@neondatabase/serverless` (`app/lib/userStore.js`, `pb_users` table — `pb_` prefix is mandatory; the shared database already contains an unrelated `users` table owned by another app, so never reference it). Schema auto-created on first use; keystores AES-256-GCM encrypted keyed by `PB_AUTH_SECRET`. Uses `DATABASE_URL` (or `POSTGRES_URL_NON_POOLING`; pooled `-pooler` hosts are auto-normalized to the direct endpoint). In dev without a DB URL it falls back to an in-memory store (wallets don't persist). Routes: `/api/auth/wallet` (`load`/`save`/`delete`), `/api/auth/session`, `/api/auth/logout`, `/api/auth/config`.
- **v2 API proxy**: `/api/v2/[...path]` streams all requests (incl. SSE) to `BACKEND_API_URL/v2/*`, solving CORS. SSE auth uses `?token=` (EventSource can't set headers).
- **Client crypto** (`app/lib/walletCrypto.js`): BIP-39 via ethers v6 (`m/44'/60'/0'/0/0`), secp256k1. The v2 challenge signature is **64-byte r||s over sha256("{addr}:{nonce}:{ts}")** — the backend's k256 is built with the `sha256` feature (transitively via `schnorr`), so its default ECDSA digest is SHA-256 even though `wallet_auth.rs`'s doc comment says keccak256. Do not "fix" this to keccak without changing the backend.
- **Console UI**: `app/console/` (page, layout, 4 tabs, onboarding modal), state in `app/lib/AuthContext.js` (Google session → wallet resolution → v2 challenge/verify handshake → `sk_` token in localStorage). Styling: dark theme + glassmorphism appended to `app/globals.css` under `.console-*` classes.
- **Env vars**: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `PB_AUTH_SECRET`, `DATABASE_URL` (Neon), `BACKEND_API_URL` (default `https://api.proxybase.xyz`), `SOCKS5_GATEWAY_HOST`/`SOCKS5_GATEWAY_PORT` (override; default = BACKEND_API_URL host, port 1082).

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
