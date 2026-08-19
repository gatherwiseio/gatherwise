import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

export default function proxy(_request: NextRequest) {
  const response = NextResponse.next();
  for (const name of STALE_COOKIE_NAMES) {
    response.headers.append(
      "Set-Cookie",
      `${name}=; Domain=.gatherwise.io; Path=/; Max-Age=0; Secure`,
    );
  }
  return response;
}

export const config = {
  // Site-wide (excluding static assets and files with an extension) so the
  // cookies are cleared no matter which page a user lands on first.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
