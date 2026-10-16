import type { NextRequest } from "next/server";
import {
  REGION_COOKIE,
  REGION_MAX_AGE,
  cookieDomainFor,
  corsHeaders,
  regimeForCountry,
} from "@/lib/consent";

// GET /api/consent/region
//
// Tells the consent script which regime applies ("optin" or "notice") based on
// the visitor's country, and sets the gw_region cookie so neither site has to
// ask again for a month. Pages on gatherwise.io get this cookie from the proxy
// on first view; this endpoint exists for visitors whose first touch is the
// Bubble app, which has no access to Vercel's geo header.

export function GET(request: NextRequest) {
  const origin = request.headers.get("origin");
  const cors = corsHeaders(origin);
  if (origin && !cors["Access-Control-Allow-Origin"]) {
    return new Response("Forbidden", { status: 403 });
  }

  const country = request.headers.get("x-vercel-ip-country");
  const regime = regimeForCountry(country);
  const domain = cookieDomainFor(request.headers.get("host"));
  const secure = request.nextUrl.protocol === "https:";
  const cookie =
    `${REGION_COOKIE}=${regime}; Path=/; Max-Age=${REGION_MAX_AGE}; SameSite=Lax` +
    (domain ? `; Domain=${domain}` : "") +
    (secure ? "; Secure" : "");

  return Response.json(
    { region: regime },
    { headers: { ...cors, "Set-Cookie": cookie, "Cache-Control": "no-store" } },
  );
}

export function OPTIONS(request: NextRequest) {
  return new Response(null, { status: 204, headers: corsHeaders(request.headers.get("origin")) });
}
