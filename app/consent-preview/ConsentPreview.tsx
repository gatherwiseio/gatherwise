"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type ConsentState = GwConsentState;

function readCookie(name: string) {
  const m = document.cookie.split("; ").find((c) => c.startsWith(name + "="));
  return m ? decodeURIComponent(m.slice(name.length + 1)) : null;
}

export default function ConsentPreview() {
  const params = useSearchParams();
  const mode = params.get("mode") === "app" ? "app" : "site";
  const region = params.get("region") === "notice" ? "notice" : "optin";
  const gpc = params.get("gpc") === "1";

  const [state, setState] = useState<ConsentState>(null);
  const [cookie, setCookie] = useState<string | null>(null);
  const [regionCookie, setRegionCookie] = useState<string | null>(null);

  function refresh() {
    setState(window.gwConsent?.get() ?? null);
    setCookie(readCookie("gw_consent"));
    setRegionCookie(readCookie("gw_region"));
  }

  useEffect(() => {
    window.gwConsentConfig = {
      mode,
      forceRegion: region,
      simulateGpc: gpc,
      endpoint: `${location.origin}/api/consent`,
      policyUrl: "/cookies",
    };
    const s = document.createElement("script");
    s.src = "/consent/gw-consent.js?v=" + Date.now();
    s.onload = () => {
      window.gwConsent?.ready(refresh);
      window.gwConsent?.onChange(refresh);
      refresh();
    };
    document.body.appendChild(s);
    const t = setInterval(refresh, 1000);
    return () => clearInterval(t);
    // The script is a singleton; changing params reloads the page below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function go(next: Partial<{ mode: string; region: string; gpc: string }>) {
    const q = new URLSearchParams({ mode, region, gpc: gpc ? "1" : "0", ...next });
    // Full reload so the singleton script re-initialises with the new config.
    window.location.href = `/consent-preview?${q.toString()}`;
  }

  const chip = (active: boolean) =>
    `rounded-md border px-3 py-1.5 text-sm font-medium transition ${
      active ? "border-navy bg-navy text-white" : "border-line bg-white text-navy hover:border-navy"
    }`;

  return (
    <main className="min-h-screen bg-surface-cream text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-14">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Internal preview</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-navy-deep">Cookie consent banner</h1>
        <p className="mt-3 max-w-xl text-muted">
          This page is not linked from anywhere. Use the controls to see each state of the banner.
          Switching mode or region reloads the page. Reset clears your stored choice so the banner
          shows again.
        </p>

        <section className="mt-10 grid gap-6 rounded-xl border border-line bg-white p-6 shadow-sm">
          <div>
            <p className="mb-2 text-sm font-semibold text-navy">Where it is shown</p>
            <div className="flex flex-wrap gap-2">
              <button className={chip(mode === "site")} onClick={() => go({ mode: "site" })}>
                Marketing site (card)
              </button>
              <button className={chip(mode === "app")} onClick={() => go({ mode: "app" })}>
                Bubble app (compact card)
              </button>
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-navy">Visitor region</p>
            <div className="flex flex-wrap gap-2">
              <button className={chip(region === "optin")} onClick={() => go({ region: "optin" })}>
                EU / UK / Switzerland / Canada (opt-in)
              </button>
              <button className={chip(region === "notice")} onClick={() => go({ region: "notice" })}>
                US and rest of world (notice)
              </button>
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-navy">Browser privacy signal</p>
            <div className="flex flex-wrap gap-2">
              <button className={chip(!gpc)} onClick={() => go({ gpc: "0" })}>
                Normal browser
              </button>
              <button className={chip(gpc)} onClick={() => go({ gpc: "1" })}>
                Global Privacy Control on
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 border-t border-line pt-5">
            <button
              className="rounded-md bg-bronze-btn px-4 py-2 text-sm font-semibold text-white hover:bg-bronze"
              onClick={() => { window.gwConsent?.reset(); setTimeout(refresh, 50); }}
            >
              Reset choice and show banner
            </button>
            <button
              className="rounded-md border border-line bg-white px-4 py-2 text-sm font-semibold text-navy hover:border-navy"
              onClick={() => window.gwConsent?.open()}
            >
              Open preferences panel
            </button>
            <a
              href="#cookie-settings"
              className="self-center px-2 text-sm text-muted underline underline-offset-4"
            >
              Footer-style &ldquo;Cookie settings&rdquo; link
            </a>
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-line bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-navy">What is stored right now</p>
          <dl className="mt-3 grid grid-cols-[140px_1fr] gap-y-2 text-sm">
            <dt className="text-muted">Decision</dt>
            <dd className="font-medium">
              {state === null ? "loading…" : state.decided ? "made" : "not yet"}
            </dd>
            <dt className="text-muted">Analytics</dt>
            <dd className="font-medium">{state?.analytics ? "allowed" : "off"}</dd>
            <dt className="text-muted">Advertising</dt>
            <dd className="font-medium">{state?.marketing ? "allowed" : "off"}</dd>
            <dt className="text-muted">Regime</dt>
            <dd className="font-medium">{state?.regime ?? "—"}</dd>
            <dt className="text-muted">gw_consent</dt>
            <dd className="break-all font-mono text-xs text-muted">{cookie ?? "(none)"}</dd>
            <dt className="text-muted">gw_region</dt>
            <dd className="font-mono text-xs text-muted">{regionCookie ?? "(none)"}</dd>
          </dl>
          <p className="mt-4 text-xs text-muted-soft">
            Locally the cookie is host-only. In production it is set on .gatherwise.io so
            app.gatherwise.io reads the same value.
          </p>
        </section>

        <section className="mt-12 space-y-4 text-muted">
          <h2 className="font-serif text-2xl font-bold text-navy-deep">Filler content</h2>
          <p>
            A few paragraphs so the banner has something to sit over, the way it will on the
            homepage. Gatherwise is planning and sales software for event and wedding planners:
            timelines, guest lists, seating, budgets, proposals, contracts and invoicing in one place.
          </p>
          <p>
            Per-item timeline assignments mean each vendor, guest or client sees only their own call
            times. Flat monthly pricing means the bill does not grow with the book of business.
          </p>
          <p>
            Scroll a little to confirm the banner stays pinned to the bottom of the viewport and does
            not cover the page controls above.
          </p>
          <div className="h-[60vh]" />
        </section>
      </div>
    </main>
  );
}
