"use client";

import { useEffect } from "react";

// Site-wide analytics, gated behind cookie consent.
//
// Loads the shared consent script (public/consent/gw-consent.js, the same
// file app.gatherwise.io loads) and then only starts each vendor once the
// visitor's choice allows it:
//
//   analytics  -> GA4 (via gtag) and PostHog
//   marketing  -> Google Ads (via gtag) and Meta Pixel
//
// In the opt-in regime (EU/EEA/UK/CH/CA) nothing loads until the visitor
// accepts. In the notice regime (US and elsewhere) the script reports consent
// as soon as the notice is acknowledged, or treats a prior choice as given.
// Global Privacy Control is handled inside the consent script: it keeps
// marketing off, which here means no Google Ads config and no Meta Pixel.
//
// Google runs in Consent Mode v2: the gtag defaults are set to denied before
// the library loads and updated from the consent state, so even once loaded
// it respects a partial choice (analytics yes, advertising no).
//
// If a visitor later withdraws consent, the page reloads. Third-party tags
// cannot be reliably unloaded in place, and a reload is the honest way to
// stop them.

const GA4_ID = "G-NMZZR1RQSF";
const ADS_ID = "AW-16809052619";
const META_PIXEL_ID = "1140353341133768";
const POSTHOG_KEY = "phc_L4ZLdnUxdhDfrgkQZFOIo4HvGDzt79BwYamAlURKXOm";
const POSTHOG_HOST = "https://us.i.posthog.com";

type ConsentState = GwConsentState;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean };
    _fbq?: unknown;
    posthog?: { init: (key: string, opts: Record<string, unknown>) => void; __loaded?: boolean };
  }
}

function addScript(src: string, id: string, onload?: () => void) {
  if (document.getElementById(id)) return;
  const s = document.createElement("script");
  s.id = id;
  s.src = src;
  s.async = true;
  if (onload) s.onload = onload;
  document.head.appendChild(s);
}

function addInline(code: string, id: string) {
  if (document.getElementById(id)) return;
  const s = document.createElement("script");
  s.id = id;
  s.text = code;
  document.head.appendChild(s);
}

let gtagReady = false;
let metaLoaded = false;
let posthogLoaded = false;

function consentModeValue(granted: boolean) {
  return granted ? "granted" : "denied";
}

function startGoogle(s: NonNullable<ConsentState>) {
  if (!gtagReady) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      wait_for_update: 500,
    });
    window.gtag("js", new Date());
    gtagReady = true;
    addScript(`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`, "gtag-src");
  }
  window.gtag!("consent", "update", {
    ad_storage: consentModeValue(s.marketing),
    ad_user_data: consentModeValue(s.marketing),
    ad_personalization: consentModeValue(s.marketing),
    analytics_storage: consentModeValue(s.analytics),
  });
  if (s.analytics) window.gtag!("config", GA4_ID);
  if (s.marketing) window.gtag!("config", ADS_ID);
}

function startMeta() {
  if (metaLoaded) return;
  metaLoaded = true;
  addInline(
    `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`,
    "meta-pixel",
  );
}

function startPostHog() {
  if (posthogLoaded) return;
  posthogLoaded = true;
  addInline(
    `!function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once unregister identify alias reset set_config opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_distinct_id startSessionRecording stopSessionRecording".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);posthog.init('${POSTHOG_KEY}',{api_host:'${POSTHOG_HOST}',defaults:'2025-05-24',person_profiles:'identified_only'});`,
    "posthog",
  );
}

function apply(s: ConsentState, previous: ConsentState) {
  // `s` already encodes the regime: undecided in opt-in means both false,
  // undecided in notice means allowed by default (minus GPC).
  if (!s) return;

  // Withdrawal: a vendor that was running must stop. Reload to drop it.
  if (
    previous &&
    ((previous.analytics && !s.analytics) || (previous.marketing && !s.marketing))
  ) {
    window.location.reload();
    return;
  }

  if (s.analytics || s.marketing) startGoogle(s);
  if (s.marketing) startMeta();
  if (s.analytics) startPostHog();
}

export default function Analytics() {
  useEffect(() => {
    // A page may have set its own config first (the preview page does);
    // otherwise use the site defaults.
    window.gwConsentConfig = window.gwConsentConfig || {
      mode: "site",
      endpoint: `${window.location.origin}/api/consent`,
      policyUrl: "/cookies",
    };

    let last: ConsentState = null;
    const wire = () => {
      const c = window.gwConsent;
      if (!c) return;
      c.ready((s) => {
        apply(s, null);
        last = s;
      });
      c.onChange((s) => {
        apply(s, last);
        last = s;
      });
    };

    if (window.gwConsent) {
      wire();
    } else {
      addScript("/consent/gw-consent.js", "gw-consent", wire);
    }
  }, []);

  return null;
}
