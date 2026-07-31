import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// POC: set APP_REDIRECT_URL to the app's current URL (e.g. the Bubble
// version-test URL). At real migration, set it to
// https://app.gatherwise.io/dashboard — no code change needed.
const APP_REDIRECT_URL =
  process.env.APP_REDIRECT_URL ?? "https://app.gatherwise.io/dashboard";

// Next.js 16 renamed the `middleware` convention to `proxy` (function must be
// named `proxy`, file lives at the project root as `proxy.ts`). Behaviour is
// the same: this runs on the server before the homepage renders.
export function proxy(request: NextRequest) {
  const loggedIn = request.cookies.get("gw_auth")?.value === "1";
  // Escape hatch: allow viewing the marketing home while logged in via ?home
  const wantsMarketing = request.nextUrl.searchParams.has("home");

  if (loggedIn && !wantsMarketing) {
    return NextResponse.redirect(APP_REDIRECT_URL);
  }
  return NextResponse.next();
}

export const config = {
  // Only run on the homepage.
  matcher: ["/"],
};
