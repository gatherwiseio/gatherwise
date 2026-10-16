import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  REGION_COOKIE,
  REGION_MAX_AGE,
  cookieDomainFor,
  regimeForCountry,
} from "@/lib/consent";

// One-off cleanup of stale Bubble auth cookies.
//
// The app used to be served from www.gatherwise.io and moved to
// app.gatherwise.io. Bubble left auth cookies scoped to the PARENT domain
// (.gatherwise.io) from the pre-migration era. The browser still sends those
// to app.gatherwise.io alongside the current .app.gatherwise.io session
// cookies, which makes Bubble throw "login session changed / expired" and traps
// long-tenured users in a reload loop.
//
// Those cookies are HttpOnly, so client-side JS can't remove them. The only way
// to clear them is a Set-Cookie response header from a host under gatherwise.io
// — which is this site. Cookie identity is (name, domain, path); the deletion
// only matches if Domain=.gatherwise.io and Path=/ exactly, so those are fixed.
//
// Safety:
// - We only ever scope deletions to .gatherwise.io. A host under gatherwise.io
//   physically cannot set/delete a cookie scoped to .app.gatherwise.io (the
//   browser rejects a Domain that isn't the current host or a parent), so live
//   sessions on the app subdomain are untouched.
// - gw_auth is intentionally NOT included — it is in active use.
// - Run in edge middleware (not next.config headers) so the Set-Cookie is added
//   per request at the edge and can't be stripped or shared by CDN caching.
const STALE_COOKIE_NAMES = [
  "eventplanner-38386_live_u2main",
  "eventplanner-38386_live_u2main.sig",
  "eventplanner-38386_test_u2main",
  "eventplanner-38386_test_u2main.sig",
  "eventplanner-38386_6333q_u2main",
  "eventplanner-38386_6333q_u2main.sig",
  "eventplanner-38386_u1main",
];

export default function proxy(request: NextRequest) {
  const response = NextResponse.next();
  for (const name of STALE_COOKIE_NAMES) {
    response.headers.append(
      "Set-Cookie",
      `${name}=; Domain=.gatherwise.io; Path=/; Max-Age=0; Secure`,
    );
  }

  // Cookie-consent regime. Vercel tells us the visitor's country at the edge;
  // we stash the resulting regime ("optin" for EU/EEA/UK/CH/CA, "notice"
  // elsewhere) in a parent-domain cookie so the consent script on this site
  // and on app.gatherwise.io can read it without another round trip. Pages
  // stay static because the decision lives in a cookie, not in render.
  // Non-HttpOnly on purpose: the browser script needs to read it. It carries
  // no personal data, only one of two words.
  if (!request.cookies.has(REGION_COOKIE)) {
    const regime = regimeForCountry(request.headers.get("x-vercel-ip-country"));
    const domain = cookieDomainFor(request.headers.get("host"));
    const secure = request.nextUrl.protocol === "https:";
    response.headers.append(
      "Set-Cookie",
      `${REGION_COOKIE}=${regime}; Path=/; Max-Age=${REGION_MAX_AGE}; SameSite=Lax` +
        (domain ? `; Domain=${domain}` : "") +
        (secure ? "; Secure" : ""),
    );
  }
  return response;
}

export const config = {
  // Site-wide (excluding static assets and files with an extension) so the
  // cookies are cleared no matter which page a user lands on first.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
