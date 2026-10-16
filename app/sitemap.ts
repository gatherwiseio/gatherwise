import type { MetadataRoute } from "next";
import { readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

// Canonical marketing domain (apex, served by Vercel). The Bubble app on
// app.gatherwise.io is a separate property with its own sitemap.
const BASE_URL = "https://gatherwise.io";

// Root of the App Router pages. Walked at build time to discover routes, so
// new pages appear in the sitemap automatically — no need to edit this file.
const APP_DIR = join(process.cwd(), "app");

// Real routes that should NOT be listed:
//  - /hello-world : scratch/test page
//  - /index_v2    : the homepage design source; the canonical homepage is "/"
const EXCLUDED_ROUTES = new Set(["/hello-world", "/index_v2"]);

// A file named page.* is what turns a folder into a routable page.
const PAGE_FILE = /^page\.(tsx|ts|jsx|js|mdx)$/;

// Recursively collect { route, lastModified } for every page under app/,
// skipping segments that never produce a plain, crawlable URL:
//   ( ) route groups, @ parallel routes, _ private folders,
//   [ ] dynamic segments (can't be enumerated without data).
function collectRoutes(dir: string): { route: string; lastModified: Date }[] {
  const out: { route: string; lastModified: Date }[] = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (/^[([@_]/.test(entry.name)) continue;
      out.push(...collectRoutes(join(dir, entry.name)));
    } else if (PAGE_FILE.test(entry.name)) {
      const rel = relative(APP_DIR, dir);
      const route = rel === "" ? "/" : "/" + rel.split(sep).join("/");
      if (EXCLUDED_ROUTES.has(route)) continue;
      out.push({ route, lastModified: statSync(join(dir, entry.name)).mtime });
    }
  }

  return out;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return collectRoutes(APP_DIR)
    .sort((a, b) => a.route.localeCompare(b.route))
    .map(({ route, lastModified }) => ({
      url: `${BASE_URL}${route}`,
      lastModified,
      changeFrequency: route === "/" ? "weekly" : "monthly",
      priority: route === "/" ? 1 : 0.8,
    }));
}
