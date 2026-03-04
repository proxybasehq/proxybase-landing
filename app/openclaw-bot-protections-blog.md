# The Current State of OpenClaw and Bot Protections

I’ve been trying to use OpenClaw for scraping protected sites lately, and let me tell you, the out-of-the-box `web_fetch` is basically useless for anything remotely secure. There is no native proxy support, no fingerprint management, and if you touch anything sitting behind Cloudflare, you’re getting blocked in minutes.

I spent a grueling couple of weeks figuring out what actually works, so here’s where I ultimately landed. Consider this the first in a deep dive series on getting AI agents to actually browse the web like humans.

### Why Out-of-the-box OpenClaw Fails

The problem is three-fold:
1.  **IP Reputation:** `web_fetch` just fires off from wherever your OpenClaw gateway is running. If you're running it on a VPS, the target site immediately flags the datacenter IP. 
2.  **Fingerprinting:** The HTTP client’s TLS fingerprint looks exactly like what it is—an automation tool. WAFs like Akamai and DataDome use JA3/JA4 fingerprinting and instantly spot the discrepancy between what your agent claims to be (a normal browser) and how it’s actually shaking hands with the server.
3.  **No JS Rendering:** A lot of modern sites are just SPAs that need JavaScript to render. `web_fetch` just grabs the HTML shell.

### The IP Progression (And Why Most Suck)

For proxies, I went through the classic stages of grief:

**Datacenter IPs (AWS, GCP, Hetzner, etc.):** Dead on arrival. Every anti-bot system has these subnets pre-flagged. You might get away with it for a few requests on a poorly secured site, but anything serious will hand you a 403 immediately.

**Residential Rotating Proxies:** These worked on moderately protected stuff, but they still got caught by DataDome or PerimeterX. The issue here is behavior—even with a "clean" home IP, the automated request patterns give it away. 

**Mobile Carrier Proxies:** This is what finally worked consistently. Mobile IPs sit behind Carrier-Grade NAT (CGNAT), meaning thousands of real humans on their iPhones share the exact same IP pool. Anti-bot systems simply *can't* ban these IP addresses without inadvertently blocking massive chunks of legitimate mobile traffic. Plus, the TCP fingerprint from carrier infrastructure matches what mobile browsers actually look like, which helps immensely with the JA4 checks.

When you look at vendors, you hit a different wall. Companies like Bright Data have massive mobile pools, but their per-GB pricing is criminal when your agent needs to run all day and download large DOMs. Others like Oxylabs or SOAX are faster but hit you with the same pricing model. I briefly used some dedicated 5G modem providers (like Illusory)—which give you unlimited bandwidth per port—but the pools are tiny, usually US-only, and setting them up is a headache.

*Side note: I eventually moved my agent infrastructure over to ProxyBase for this exact reason. Since they route via an API specifically built for AI swarms, my agents can just hit an endpoint, grab a high-trust mobile proxy, and pay for the exact bandwidth they need using crypto. It skips the massive corporate dashboards entirely.*

### Fixing the OpenClaw Setup

For the actual OpenClaw configuration, you absolutely have to drop raw HTTP and use a stealth browser. 

Tools like **Camoufox** or **Nodriver** pass the JA4 checks where stock Playwright or Puppeteer get flagged instantly. 

The biggest headache right now is that there is **no native proxy config in OpenClaw’s browser tool**. Setting standard `HTTP_PROXY` env vars doesn't work either because `undici` (the underlying HTTP client) just ignores them. Issue #2102 on their repo has been open forever about this and was actually closed as "not planned." There is an open PR (#20578) that attempts to add native `browser.proxy` config with per-profile credential support, but until that gets merged, you have to get creative.

Your best bet right now is either using a managed service that handles the proxying for you (like Firecrawl), or doing what I do: running a local proxy client that the browser is forced to route through at the OS level. 

### A Surprising Tip on IP Rotation

One thing that completely surprised me: **Keeping the same IP for 5-10 minutes works way better than rotating on every single request.**

It sounds counterintuitive, but anti-bot systems track *sessions*. If you're constantly rotating IPs while trying to maintain cookies or session state, it actually looks *more* suspicious than just browsing stably from one IP. OpenClaw’s natural "thinking" time between actions actually helps here. The 2-to-5-second gaps between page loads mimic human hesitation, preventing behavioral flags without needing to code explicit `sleep()` delays.

### The Reality for All Agents

FWIW, this doesn't just apply to OpenClaw. If you're using LangChain, Browser Use, CrewAI, etc., you're going to hit the exact same wall. AI agents simply browse differently than humans and trigger detection at much higher rates. The proxy you use is basically your identity layer—it determines whether a site sees your agent as a suspicious piece of automation or just another normal user on their phone.

Got questions about setting up stealth browsers or handling agent networking? Ask away. Happy Clawing.
