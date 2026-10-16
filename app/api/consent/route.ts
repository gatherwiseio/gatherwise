import type { NextRequest } from "next/server";
import {
  ACCEPT_MAX_AGE,
  CONSENT_COOKIE,
  REJECT_MAX_AGE,
  cookieDomainFor,
  corsHeaders,
} from "@/lib/consent";

// POST /api/consent
//
// Re-sets the gw_consent cookie server-side so it gets its full lifetime.
// Safari caps cookies written from JavaScript at seven days; a Set-Cookie from
// a gatherwise.io response is not capped. The browser-side script writes the
// cookie locally first, then calls this, so a failure here only shortens the
// lifetime rather than losing the choice.
//
// Called from gatherwise.io and, cross-origin with credentials, from
// app.gatherwise.io. Because this host is the parent domain it can set a
// cookie for all of .gatherwise.io. It never reads or writes any other cookie.

type Body = { analytics?: unknown; marketing?: unknown; regime?: unknown };

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const cors = corsHeaders(origin);
  if (origin && !cors["Access-Control-Allow-Origin"]) {
    return new Response("Forbidden", { status: 403 });
  }

  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400, headers: cors });
  }

  const analytics = body.analytics === true;
  const marketing = body.marketing === true;
  const regime = body.regime === "notice" ? "notice" : "optin";
  const maxAge = analytics || marketing ? ACCEPT_MAX_AGE : REJECT_MAX_AGE;
  const value =
    `v=1&a=${analytics ? 1 : 0}&m=${marketing ? 1 : 0}&r=${regime}` +
    `&t=${Math.floor(Date.now() / 1000)}`;

  const domain = cookieDomainFor(request.headers.get("host"));
  const secure = request.nextUrl.protocol === "https:";
  const cookie =
    `${CONSENT_COOKIE}=${value}; Path=/; Max-Age=${maxAge}; SameSite=Lax` +
    (domain ? `; Domain=${domain}` : "") +
    (secure ? "; Secure" : "");

  return Response.json(
    { ok: true, analytics, marketing, regime },
    { headers: { ...cors, "Set-Cookie": cookie, "Cache-Control": "no-store" } },
  );
}

export function OPTIONS(request: NextRequest) {
  return new Response(null, { status: 204, headers: corsHeaders(request.headers.get("origin")) });
}
