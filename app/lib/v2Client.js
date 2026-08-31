const PROXY_BASE = "/api/v2";

export class ApiError extends Error {
  constructor(status, data, path, method) {
    const detail = data && (data.error || data.reason);
    super(detail || `HTTP ${status}`);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
    this.path = path;
    this.method = method;
  }
}

async function request(method, path, { token, body, query } = {}) {
  const qs = query ? `?${new URLSearchParams(query)}` : "";
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${PROXY_BASE}${path}${qs}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch (err) {
    throw new ApiError(0, { error: `Network error: ${err.message}` }, path, method);
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    /* non-JSON body */
  }
  if (!res.ok) throw new ApiError(res.status, data, path, method);
  return data;
}

export const v2 = {
  // auth (no token)
  challenge: (walletAddress) =>
    request("POST", "/auth/challenge", { body: { wallet_address: walletAddress } }),
  verify: (payload) => request("POST", "/auth/verify", { body: payload }),

  // catalog
  getPricing: (token) => request("GET", "/catalog/pricing", { token }),
  getCountries: (token) => request("GET", "/catalog/countries", { token }),

  // sessions
  createSession: (token, body) => request("POST", "/sessions", { token, body }),
  listSessions: (token) => request("GET", "/sessions", { token }),
  getSession: (token, id) => request("GET", `/sessions/${id}`, { token }),
  rotateSession: (token, id) => request("POST", `/sessions/${id}/rotate`, { token }),
  keepaliveSession: (token, id) => request("POST", `/sessions/${id}/keepalive`, { token }),
  closeSession: (token, id) => request("DELETE", `/sessions/${id}`, { token }),

  // wallet
  getBalance: (token) => request("GET", "/wallet/balance", { token }),
  transfer: (token, amountMicrocredits) =>
    request("POST", "/wallet/transfer", { token, body: { amount_microcredits: amountMicrocredits } }),

  // deposits
  listCurrencies: (token) => request("GET", "/currencies", { token }),
  createDeposit: (token, body) => request("POST", "/deposits", { token, body }),
  getDeposit: (token, id) => request("GET", `/deposits/${id}`, { token }),
  listDeposits: (token) => request("GET", "/deposits", { token }),

  // admin (dev faucet — requires backend ADMIN_API_KEY + DEV_MODE)
  devCredit: (adminKey, walletAddress, amountMicrocredits) =>
    request("POST", "/dev/credit", {
      token: adminKey,
      body: { wallet_address: walletAddress, amount_microcredits: amountMicrocredits },
    }),

  // misc (no auth)
  health: () => request("GET", "/health"),

  // SSE — EventSource can't set headers, token goes in the query string
  eventsUrl: (token) => `${PROXY_BASE}/events?token=${encodeURIComponent(token)}`,
};

export function socks5ConnectionString({ gateway, sessionId, token }) {
  return `socks5://${encodeURIComponent(sessionId)}:${encodeURIComponent(token)}@${gateway}`;
}
