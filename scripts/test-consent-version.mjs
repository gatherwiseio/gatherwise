// Fails if the gw_consent cookie written by POST /api/consent does not carry
// the same schema version as public/consent/gw-consent.js, or if its other
// attributes drift from what the browser script writes. Runs the real route
// handler (transpiled with the repo's TypeScript) against a fake request.
// Wired into `npm test` and `prebuild`, so a mismatch fails the Vercel build.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import Module, { createRequire } from "node:module";
import { join } from "node:path";
import ts from "typescript";
import { readScriptVersion, SCRIPT_PATH } from "./consent-version.mjs";

const root = join(SCRIPT_PATH, "../../..");
const require = createRequire(import.meta.url);

// Minimal TS loader: transpile .ts on require and map the "@/..." alias.
require.extensions[".ts"] = (mod, filename) => {
  const { outputText } = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
    fileName: filename,
  });
  mod._compile(outputText, filename);
};
const resolve = Module._resolveFilename;
Module._resolveFilename = function (request, ...rest) {
  if (request.startsWith("@/")) request = join(root, request.slice(2));
  return resolve.call(this, request, ...rest);
};

const { POST } = require(join(root, "app/api/consent/route.ts"));
const scriptVersion = readScriptVersion();
const script = readFileSync(SCRIPT_PATH, "utf8");
const days = (name) => Number(script.match(new RegExp(`var ${name} = (\\d+);`))[1]);

async function post(body) {
  const request = {
    headers: new Headers({ origin: "https://app.gatherwise.io", host: "gatherwise.io" }),
    nextUrl: new URL("https://gatherwise.io/api/consent"),
    json: async () => body,
  };
  const res = await POST(request);
  assert.equal(res.status, 200);
  const cookies = res.headers.getSetCookie();
  assert.equal(cookies.length, 1, `endpoint must set exactly one cookie, got: ${cookies.join(" | ")}`);
  return cookies[0];
}

const accepted = await post({ analytics: true, marketing: true, regime: "notice" });
const value = accepted.split(";")[0];
assert.match(value, /^gw_consent=v=\d+&a=1&m=1&r=notice&t=\d+$/, accepted);
assert.equal(
  Number(value.match(/v=(\d+)/)[1]),
  scriptVersion,
  `/api/consent writes v=${value.match(/v=(\d+)/)[1]} but gw-consent.js VERSION is ${scriptVersion}`,
);
assert.match(accepted, new RegExp(`; Max-Age=${days("ACCEPT_DAYS") * 86400};`));
for (const attr of ["; Path=/", "; SameSite=Lax", "; Domain=.gatherwise.io", "; Secure"]) {
  assert.ok(accepted.includes(attr), `missing ${attr}: ${accepted}`);
}

const refused = await post({ analytics: false, marketing: false, regime: "optin" });
assert.match(refused, new RegExp(`^gw_consent=v=${scriptVersion}&a=0&m=0&r=optin&t=\\d+;`));
assert.match(refused, new RegExp(`; Max-Age=${days("REJECT_DAYS") * 86400};`));

console.log(`ok: /api/consent writes v=${scriptVersion}, matching gw-consent.js`);
