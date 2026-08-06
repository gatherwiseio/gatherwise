import type { MetadataRoute } from "next";

const BASE_URL = "https://gatherwise.io";

// Served at /robots.txt. Allows all crawlers and points them at the sitemap.
// The Bubble app on app.gatherwise.io serves its own robots.txt/sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
