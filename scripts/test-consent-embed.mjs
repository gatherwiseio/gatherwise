// Runs public/consent/gw-consent.js in a fake browser and checks how it
// behaves at the top level vs. inside another site's iframe (embedded forms
// from app.gatherwise.io). In an iframe the browser can't store gw_consent, so
// the script must not show a banner or call the network, and must report
// analytics and advertising as off. Wired into `npm test` (and so `prebuild`).
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import { SCRIPT_PATH } from "./consent-version.mjs";

const source = readFileSync(SCRIPT_PATH, "utf8");

function run({ embedded, cookie = "gw_region=notice" }) {
  const appended = [];
  const fetches = [];
  const node = () => ({
    style: {}, classList: { add() {}, remove() {} }, setAttribute() {}, appendChild() {},
    addEventListener() {}, removeEventListener() {}, querySelector: () => null, focus() {},
  });
  const document = {
    readyState: "complete",
    cookie,
    head: { appendChild: (n) => appended.push(n) },
    body: { appendChild: (n) => appended.push(n) },
    documentElement: { appendChild: (n) => appended.push(n) },
    createElement: node,
    createTextNode: () => ({}),
    getElementById: () => null,
    querySelector: () => null,
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() {},
  };
  const window = {
    gwConsentConfig: { mode: "app" },
    document,
    navigator: {},
    location: { hostname: "app.gatherwise.io", protocol: "https:" },
    fetch: (url) => { fetches.push(url); return new Promise(() => {}); },
    setTimeout: () => 0,
    requestAnimationFrame: () => 0,
    CustomEvent: class { constructor(type, init) { this.type = type; this.detail = init && init.detail; } },
  };
  window.self = window;
  window.top = embedded ? {} : window;
  window.window = window;
  vm.runInNewContext(source, { ...window, window });
  return { api: window.gwConsent, appended, fetches };
}

// Embedded: nothing shown, nothing fetched, everything off, ready fires.
{
  const { api, appended, fetches } = run({ embedded: true });
  assert.ok(api && api.__loaded, "gwConsent API should load in an iframe");
  assert.equal(appended.length, 0, "no banner or styles should be added inside an iframe");
  assert.equal(fetches.length, 0, "no network calls inside an iframe");
  const s = api.get();
  assert.equal(s.analytics, false);
  assert.equal(s.marketing, false);
  assert.equal(s.embedded, true);
  let readyState = null;
  api.ready((st) => { readyState = st; });
  assert.ok(readyState && readyState.analytics === false, "ready() should fire with tracking off");
  api.open();
  assert.equal(appended.length, 0, "open() must not show the panel inside an iframe");
}

// Top level, undecided US visitor: the notice is shown as before.
{
  const { api, appended } = run({ embedded: false });
  assert.ok(appended.length > 0, "the banner should still render at the top level");
  assert.notEqual(api.get().embedded, true);
}

// Top level, already decided: no banner, saved choice respected.
{
  const { api, appended } = run({ embedded: false, cookie: `gw_region=notice; gw_consent=v=${source.match(/var VERSION = (\d+);/)[1]}&a=1&m=0&r=notice&t=1` });
  assert.equal(appended.length, 0, "no banner once a current choice is saved");
  assert.equal(api.get().analytics, true);
  assert.equal(api.get().marketing, false);
}

console.log("ok: gw-consent.js stays silent with tracking off inside iframes, unchanged at top level");
