/*
 * Gatherwise cookie consent — shared between gatherwise.io (Next.js) and
 * app.gatherwise.io (Bubble). Served from gatherwise.io/consent/gw-consent.js
 * and loaded by both sites with a plain <script> tag so there is one banner,
 * one design and one cookie.
 *
 * Cookie: gw_consent on Domain=.gatherwise.io
 *   v=1&a=1&m=0&r=optin&t=1760500000
 *   v  schema version — bump to re-ask everyone (e.g. when adding a vendor)
 *   a  analytics granted (GA4, PostHog with persistence)
 *   m  marketing granted (Google Ads, Meta Pixel)
 *   r  regime the choice was made under: optin | notice
 *   t  unix seconds when the choice was made
 *
 * Region: gw_region cookie, "optin" (EU/EEA/UK/CH/CA) or "notice" (everywhere
 * else). Set by the Next.js proxy on any gatherwise.io page view, or by the
 * /api/consent/region endpoint when the Bubble app is the first touch.
 *
 * Public API (window.gwConsent):
 *   get()        -> { decided, analytics, marketing, regime } | null while loading
 *   open()       -> opens the preferences panel
 *   onChange(fn) -> fn(state) whenever a choice is saved; also fires
 *                   `gwconsent:change` on document
 *   ready(fn)    -> fn(state) once the initial state is known (cookie or region)
 *
 * Config (optional, set before the script loads):
 *   window.gwConsentConfig = {
 *     mode: "site" | "app",       // full card vs compact in-app card. default "site"
 *     endpoint: "https://gatherwise.io/api/consent",
 *     policyUrl: "https://gatherwise.io/cookies",
 *     forceRegion: "optin" | "notice",  // preview/testing only
 *     simulateGpc: true,                 // preview/testing only
 *   }
 *
 * No auth cookies are read or written here. The only cookies this file
 * touches are gw_consent and gw_region.
 */
(function () {
  "use strict";
  if (window.gwConsent && window.gwConsent.__loaded) return;

  var VERSION = 1;
  var COOKIE = "gw_consent";
  var REGION_COOKIE = "gw_region";
  var ACCEPT_DAYS = 365; // re-ask accepted users yearly
  var REJECT_DAYS = 182; // re-ask refusals after six months
  var FONT_HREF =
    "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap";

  var cfg = window.gwConsentConfig || {};
  var mode = cfg.mode === "app" ? "app" : "site";
  var endpoint = cfg.endpoint || "https://gatherwise.io/api/consent";
  var policyUrl = cfg.policyUrl || "https://gatherwise.io/cookies";

  /* ------------------------------------------------------------ cookies */

  function readCookie(name) {
    var parts = document.cookie.split("; ");
    for (var i = 0; i < parts.length; i++) {
      var eq = parts[i].indexOf("=");
      if (parts[i].slice(0, eq) === name) return decodeURIComponent(parts[i].slice(eq + 1));
    }
    return null;
  }

  function cookieDomain() {
    var h = location.hostname;
    if (h === "gatherwise.io" || /\.gatherwise\.io$/.test(h)) return "; Domain=.gatherwise.io";
    return ""; // localhost / preview hosts: host-only cookie
  }

  function writeCookieLocal(name, value, days) {
    var secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie =
      name + "=" + value + cookieDomain() + "; Path=/; Max-Age=" + days * 86400 + "; SameSite=Lax" + secure;
  }

  function parseState(raw) {
    if (!raw) return null;
    var p = {};
    raw.split("&").forEach(function (kv) {
      var i = kv.indexOf("=");
      if (i > 0) p[kv.slice(0, i)] = kv.slice(i + 1);
    });
    if (String(p.v) !== String(VERSION)) return null; // stale schema: re-ask
    return {
      decided: true,
      analytics: p.a === "1",
      marketing: p.m === "1",
      regime: p.r === "notice" ? "notice" : "optin",
      at: Number(p.t) || 0,
    };
  }

  function serialize(s) {
    return (
      "v=" + VERSION +
      "&a=" + (s.analytics ? 1 : 0) +
      "&m=" + (s.marketing ? 1 : 0) +
      "&r=" + s.regime +
      "&t=" + Math.floor(Date.now() / 1000)
    );
  }

  /* -------------------------------------------------------------- state */

  var state = parseState(readCookie(COOKIE));
  var regime = cfg.forceRegion || readCookie(REGION_COOKIE) || null;
  var gpc = navigator.globalPrivacyControl === true || cfg.simulateGpc === true;
  var changeFns = [];
  var readyFns = [];
  var isReady = false;

  function publicState() {
    if (!state) {
      if (!regime) return null;
      // Undecided. Opt-in regime: nothing is allowed yet. Notice regime
      // (US and elsewhere): opt-out law, so analytics and advertising run by
      // default and the notice is informational; a GPC signal still keeps
      // advertising off.
      var open = regime === "notice";
      return { decided: false, analytics: open, marketing: open && !gpc, regime: regime };
    }
    return { decided: true, analytics: state.analytics, marketing: state.marketing, regime: state.regime };
  }

  function emitChange() {
    var s = publicState();
    changeFns.forEach(function (fn) { try { fn(s); } catch (e) {} });
    try { document.dispatchEvent(new CustomEvent("gwconsent:change", { detail: s })); } catch (e) {}
  }

  function markReady() {
    if (isReady) return;
    isReady = true;
    var s = publicState();
    readyFns.forEach(function (fn) { try { fn(s); } catch (e) {} });
    readyFns = [];
  }

  function save(analytics, marketing) {
    state = { decided: true, analytics: !!analytics, marketing: !!marketing, regime: regime || "optin" };
    var value = serialize(state);
    var days = state.analytics || state.marketing ? ACCEPT_DAYS : REJECT_DAYS;
    // Write locally first so the choice sticks even if the endpoint is slow or
    // unreachable, then ask gatherwise.io to re-set it server-side for the
    // full lifetime (Safari caps JS-written cookies at seven days).
    writeCookieLocal(COOKIE, value, days);
    try {
      fetch(endpoint, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analytics: state.analytics, marketing: state.marketing, regime: state.regime }),
        keepalive: true,
      }).catch(function () {});
    } catch (e) {}
    emitChange();
  }

  /* ----------------------------------------------------------------- ui */

  // Design: parchment card, ink text, gold eyebrow, DM Sans. 400px wide,
  // bottom-right. Primary action always sits at the right end of the row;
  // the quiet "Manage" link sits at the left end. The in-app variant is the
  // same card with the heading dropped and tighter padding.
  var CSS =
    ".gwc{position:fixed;z-index:2147483000;right:0;bottom:0;left:0;padding:0 16px 16px;pointer-events:none;font-family:'DM Sans',system-ui,-apple-system,sans-serif;color:#2a2723;-webkit-font-smoothing:antialiased}" +
    "@media(min-width:720px){.gwc{left:auto;padding:0 24px 24px}}" +
    ".gwc *{box-sizing:border-box}" +
    ".gwc__card{pointer-events:auto;margin:0 0 0 auto;width:100%;max-width:400px;background:#fdfaf4;border:1px solid rgba(42,39,35,.1);border-radius:8px;box-shadow:0 16px 40px rgba(42,39,35,.14),0 1px 2px rgba(42,39,35,.06);padding:22px 22px 18px;outline:none;opacity:0;transform:translateY(10px);transition:opacity .28s ease-out,transform .28s ease-out}" +
    ".gwc__card--in{opacity:1;transform:none}" +
    ".gwc--app .gwc__card{padding:14px 16px 12px;box-shadow:0 12px 32px rgba(42,39,35,.14),0 1px 2px rgba(42,39,35,.06)}" +
    ".gwc--notice .gwc__card{padding:18px 20px 16px}" +
    ".gwc__eyebrow{font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:#a8803f;font-weight:600;margin:0 0 8px}" +
    ".gwc--notice .gwc__eyebrow{margin-bottom:6px}" +
    ".gwc__title{font-size:17px;line-height:1.3;font-weight:600;margin:0 0 6px;color:#2a2723}" +
    ".gwc__text{font-size:13.5px;line-height:1.55;color:#6b645a;margin:0}" +
    ".gwc--app .gwc__text{font-size:13px;line-height:1.5}.gwc--app .gwc__eyebrow{margin-bottom:6px}.gwc--app .gwc__title{font-size:15px;margin-bottom:4px}" +
    ".gwc__text a{color:#2a2723;text-decoration:underline;text-underline-offset:2px}" +
    ".gwc__actions{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:18px}" +
    ".gwc--app .gwc__actions{margin-top:12px}" +
    ".gwc--notice .gwc__actions{justify-content:flex-end;gap:14px;margin-top:14px}" +
    ".gwc__group{display:flex;gap:8px;margin-left:auto}" +
    ".gwc__btn{appearance:none;font:inherit;font-size:13px;line-height:1;padding:10px 14px;border-radius:6px;cursor:pointer;border:1px solid transparent;transition:background .15s,border-color .15s,color .15s;outline:none}" +
    ".gwc--app .gwc__btn{font-size:12.5px;padding:9px 12px}" +
    ".gwc__btn:focus-visible{box-shadow:0 0 0 2px #fdfaf4,0 0 0 4px #2a2723}" +
    ".gwc__btn--primary{background:#b8935f;color:#fff;border-color:#b8935f;font-weight:600;padding-left:16px;padding-right:16px}" +
    ".gwc--app .gwc__btn--primary{padding-left:14px;padding-right:14px}" +
    ".gwc__btn--primary:hover{background:#c9a370;border-color:#c9a370}" +
    ".gwc__btn--secondary{background:transparent;color:#2a2723;border-color:rgba(42,39,35,.22);font-weight:500}" +
    ".gwc__btn--secondary:hover{border-color:#2a2723}" +
    ".gwc__btn--gold{background:transparent;color:#a8803f;border-color:#b8935f;font-weight:600}" +
    ".gwc__btn--gold:hover{background:rgba(184,147,95,.12)}" +
    ".gwc__btn--link{background:none;border:0;padding:0;color:#6b645a;font-weight:500;text-decoration:underline;text-underline-offset:3px;border-radius:2px}" +
    ".gwc__btn--link:hover{color:#2a2723}" +
    ".gwc__prefs{display:flex;flex-direction:column;border-top:1px solid rgba(42,39,35,.1);margin-top:14px}" +
    ".gwc__row{display:flex;align-items:center;gap:14px;padding:11px 0;border-bottom:1px solid rgba(42,39,35,.08)}" +
    ".gwc__row-body{flex:1 1 auto;min-width:0}" +
    ".gwc__row-title{font-size:13.5px;font-weight:600;margin:0 0 2px;color:#2a2723}" +
    ".gwc__row-text{font-size:12.5px;line-height:1.45;color:#6b645a;margin:0;text-wrap:pretty}" +
    ".gwc__switch{position:relative;flex:0 0 auto;width:32px;height:18px;border-radius:9px;background:#cfc8bc;border:0;cursor:pointer;padding:0;transition:background .18s;outline:none}" +
    ".gwc__switch[aria-checked=true]{background:#b8935f}.gwc__switch:disabled{cursor:default;opacity:.55}" +
    ".gwc__switch::after{content:'';position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .18s}" +
    ".gwc__switch[aria-checked=true]::after{transform:translateX(14px)}" +
    ".gwc__switch:focus-visible{box-shadow:0 0 0 2px #fdfaf4,0 0 0 4px #2a2723}" +
    ".gwc__foot{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:0;padding-top:14px}" +
    "@media(prefers-reduced-motion:reduce){.gwc__card,.gwc__switch,.gwc__switch::after,.gwc__btn{transition:none}}" +
    "@media(max-width:420px){.gwc{padding:0 10px 10px}.gwc__card{padding:18px 18px 16px}.gwc__actions,.gwc__foot{flex-wrap:wrap}.gwc__group{width:100%;margin-left:0}.gwc__group .gwc__btn{flex:1 1 0}}";

  var root = null;
  var prefsOpen = false;
  var draft = { analytics: false, marketing: false };

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function button(label, cls, onClick) {
    var b = el("button", "gwc__btn " + cls, label);
    b.type = "button";
    b.addEventListener("click", onClick);
    return b;
  }

  function injectAssets() {
    if (!document.getElementById("gwc-font")) {
      var hasFont = false;
      try { hasFont = document.fonts && document.fonts.check('12px "DM Sans"'); } catch (e) {}
      if (!hasFont) {
        var l = el("link");
        l.id = "gwc-font";
        l.rel = "stylesheet";
        l.href = FONT_HREF;
        document.head.appendChild(l);
      }
    }
    if (!document.getElementById("gwc-style")) {
      var s = el("style");
      s.id = "gwc-style";
      s.textContent = CSS;
      document.head.appendChild(s);
    }
  }

  function destroy() {
    if (root && root.parentNode) root.parentNode.removeChild(root);
    root = null;
    prefsOpen = false;
    document.removeEventListener("keydown", onKey);
  }

  function onKey(e) {
    if (e.key === "Escape" && prefsOpen && state) {
      // Only dismiss on Escape when a prior choice exists; a first-time
      // opt-in visitor has to pick explicitly.
      destroy();
    }
  }

  function switchRow(title, text, key) {
    var row = el("div", "gwc__row");
    var body = el("div", "gwc__row-body");
    body.appendChild(el("p", "gwc__row-title", title));
    body.appendChild(el("p", "gwc__row-text", text));
    row.appendChild(body);
    var sw = el("button", "gwc__switch");
    sw.type = "button";
    sw.setAttribute("role", "switch");
    sw.setAttribute("aria-label", title);
    if (key === null) {
      // Essential: shown as a switch so the row reads like the others, but
      // locked on. Keeping it visible is clearer than hiding the control.
      sw.setAttribute("aria-checked", "true");
      sw.disabled = true;
    } else {
      sw.setAttribute("aria-checked", draft[key] ? "true" : "false");
      sw.addEventListener("click", function () {
        draft[key] = !draft[key];
        sw.setAttribute("aria-checked", draft[key] ? "true" : "false");
      });
    }
    row.appendChild(sw);
    return row;
  }

  function policyLink(label) {
    return '<a href="' + policyUrl + '" target="_blank" rel="noopener">' + label + "</a>";
  }

  function render(opts) {
    injectAssets();
    destroy();
    opts = opts || {};
    prefsOpen = !!opts.prefs;
    draft = {
      analytics: state ? state.analytics : regime === "notice",
      marketing: state ? state.marketing : regime === "notice" && !gpc,
    };

    var variant = prefsOpen ? "prefs" : regime === "notice" ? "notice" : mode;
    root = el("div", "gwc gwc--" + variant);
    var card = el("div", "gwc__card");
    card.setAttribute("role", "dialog");
    card.setAttribute("aria-modal", "false");
    card.setAttribute("aria-label", "Cookie preferences");
    card.tabIndex = -1;

    var actions = el("div", prefsOpen ? "gwc__foot" : "gwc__actions");
    var group = el("div", "gwc__group");

    if (prefsOpen) {
      card.appendChild(el("p", "gwc__eyebrow", "Privacy"));
      card.appendChild(el("p", "gwc__title", "Cookie preferences"));
      card.appendChild(el("p", "gwc__text",
        "Choose which cookies Gatherwise may use. Read our " + policyLink("cookie policy") + "."));
      var prefs = el("div", "gwc__prefs");
      prefs.appendChild(switchRow("Essential", "Sign-in, security and your settings. Always on.", null));
      prefs.appendChild(switchRow("Analytics", "How features are used, so we can improve them.", "analytics"));
      prefs.appendChild(switchRow("Advertising",
        "Measures our ads on Google and Meta." + (gpc ? " Off by your browser's privacy signal." : ""),
        "marketing"));
      card.appendChild(prefs);

      actions.appendChild(button(state ? "Close" : "Back", "gwc__btn--link", function () {
        if (state) destroy(); else render();
      }));
      group.appendChild(button("Accept all", "gwc__btn--gold", function () {
        save(true, !gpc);
        destroy();
      }));
      group.appendChild(button("Save preferences", "gwc__btn--primary", function () {
        save(draft.analytics, draft.marketing);
        destroy();
      }));
      actions.appendChild(group);
    } else if (regime === "notice") {
      card.appendChild(el("p", "gwc__eyebrow", "Cookies"));
      card.appendChild(el("p", "gwc__text",
        "Gatherwise uses cookies for analytics and to measure our advertising. You can change this any time. Read our " +
        policyLink("cookie policy") + "."));
      actions.appendChild(button("Settings", "gwc__btn--link", function () { render({ prefs: true }); }));
      actions.appendChild(button("Got it", "gwc__btn--primary", function () {
        save(true, !gpc);
        destroy();
      }));
    } else if (mode === "app") {
      card.appendChild(el("p", "gwc__eyebrow", "Cookies"));
      card.appendChild(el("p", "gwc__title", "Can we use cookies?"));
      card.appendChild(el("p", "gwc__text",
        "To see how Gatherwise is used and improve it. Essential cookies that keep you signed in are always on. Read our " +
        policyLink("cookie policy") + "."));
      actions.appendChild(button("Manage", "gwc__btn--link", function () { render({ prefs: true }); }));
      group.appendChild(button("Reject", "gwc__btn--secondary", function () {
        save(false, false);
        destroy();
      }));
      group.appendChild(button("Accept", "gwc__btn--primary", function () {
        save(true, !gpc);
        destroy();
      }));
      actions.appendChild(group);
    } else {
      card.appendChild(el("p", "gwc__eyebrow", "Your privacy"));
      card.appendChild(el("p", "gwc__title", "Can we use cookies?"));
      card.appendChild(el("p", "gwc__text",
        "We use cookies to understand how Gatherwise is used and to measure our advertising. Essential cookies that keep you signed in are always on. Read our " +
        policyLink("cookie policy") + "."));
      actions.appendChild(button("Manage", "gwc__btn--link", function () { render({ prefs: true }); }));
      group.appendChild(button("Reject all", "gwc__btn--secondary", function () {
        save(false, false);
        destroy();
      }));
      group.appendChild(button("Accept all", "gwc__btn--primary", function () {
        save(true, !gpc);
        destroy();
      }));
      actions.appendChild(group);
    }

    card.appendChild(actions);
    root.appendChild(card);
    document.body.appendChild(root);
    document.addEventListener("keydown", onKey);

    // Move focus to the dialog itself (not a button) so screen readers
    // announce it without drawing a focus ring on "Accept all".
    if (prefsOpen || regime === "optin") {
      try { card.focus({ preventScroll: true }); } catch (e) {}
    }

    // Reveal on the next frame so the transition runs, with a hard fallback
    // that forces the resting state in case the browser never paints the
    // transition (seen in background/idle tabs). The card must never be able
    // to stay invisible: an unseen banner is a consent prompt nobody can answer.
    var reveal = function () { if (card.parentNode) card.classList.add("gwc__card--in"); };
    if (window.requestAnimationFrame) {
      requestAnimationFrame(function () { requestAnimationFrame(reveal); });
    } else {
      reveal();
    }
    setTimeout(function () {
      if (!card.parentNode) return;
      card.style.transition = "none";
      card.style.opacity = "1";
      card.style.transform = "none";
    }, 700);
  }

  /* ------------------------------------------------------------- boot */

  function boot() {
    if (state) { markReady(); return; }
    if (regime) { render(); markReady(); return; }
    // No region cookie yet (first touch was the Bubble app, or a brand-new
    // visitor before the proxy ran). Ask gatherwise.io; it also sets gw_region.
    var done = false;
    function finish(r) {
      if (done) return;
      done = true;
      regime = r === "notice" ? "notice" : "optin"; // unknown => the safe, stricter mode
      render();
      markReady();
    }
    try {
      fetch(endpoint + "/region", { credentials: "include" })
        .then(function (res) { return res.ok ? res.json() : null; })
        .then(function (j) { finish(j && j.region); })
        .catch(function () { finish(null); });
      setTimeout(function () { finish(null); }, 2500);
    } catch (e) {
      finish(null);
    }
  }

  window.gwConsent = {
    __loaded: true,
    version: VERSION,
    get: publicState,
    open: function () { render({ prefs: true }); },
    onChange: function (fn) { if (typeof fn === "function") changeFns.push(fn); },
    ready: function (fn) {
      if (typeof fn !== "function") return;
      if (isReady) fn(publicState()); else readyFns.push(fn);
    },
    // Testing helper: clears the choice and re-shows the banner.
    reset: function () {
      writeCookieLocal(COOKIE, "", -1);
      state = null;
      destroy();
      boot();
    },
  };

  // Let any element on either site reopen the panel without extra wiring:
  // <a href="#cookie-settings"> or data-gw-consent="open".
  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest && e.target.closest('[data-gw-consent="open"],a[href="#cookie-settings"]');
    if (t) { e.preventDefault(); render({ prefs: true }); }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
