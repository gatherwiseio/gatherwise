// Shared constants for the cookie-consent system. The browser half lives in
// public/consent/gw-consent.js; keep the cookie names and regimes in sync.

export const CONSENT_COOKIE = "gw_consent";
export const REGION_COOKIE = "gw_region";

export type ConsentRegime = "optin" | "notice";

// Countries whose visitors must opt in before any non-essential cookie is set:
// EU 27, EEA (Iceland, Liechtenstein, Norway), United Kingdom, Switzerland,
// and Canada (Quebec's Law 25 and federal guidance both lean opt-in, and
// Gatherwise has Canadian customers).
const OPT_IN_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
  "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES",
  "SE",
  "IS", "LI", "NO",
  "GB", "CH",
  "CA",
]);

/**
 * Decide which consent regime applies to a visitor from Vercel's
 * `x-vercel-ip-country` header. An unknown country (local dev, header
 * missing) falls back to opt-in, the stricter mode, so a mistake can only ever
 * mean showing a banner to someone who did not strictly need one.
 */
export function regimeForCountry(country: string | null | undefined): ConsentRegime {
  if (!country) return "optin";
  return OPT_IN_COUNTRIES.has(country.toUpperCase()) ? "optin" : "notice";
}

/** Cookie Domain attribute for a request host: shared across subdomains in prod. */
export function cookieDomainFor(host: string | null): string | undefined {
  if (!host) return undefined;
  const h = host.split(":")[0].toLowerCase();
  if (h === "gatherwise.io" || h.endsWith(".gatherwise.io")) return ".gatherwise.io";
  return undefined; // localhost / vercel preview: host-only cookie
}

// Origins allowed to call the consent API with credentials. The Bubble app is
// the important one; the rest are this site's own hosts.
export const ALLOWED_ORIGINS = new Set([
  "https://gatherwise.io",
  "https://www.gatherwise.io",
  "https://app.gatherwise.io",
  "https://preview.gatherwise.io",
]);

function originAllowed(origin: string): boolean {
  if (ALLOWED_ORIGINS.has(origin)) return true;
  // Local dev on any port.
  return /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
}

export function corsHeaders(origin: string | null): Record<string, string> {
  if (!origin || !originAllowed(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export const ACCEPT_MAX_AGE = 365 * 86400; // re-ask accepted users yearly
export const REJECT_MAX_AGE = 182 * 86400; // re-ask refusals after six months
export const REGION_MAX_AGE = 30 * 86400;
