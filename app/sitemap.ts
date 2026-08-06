import type { MetadataRoute } from "next";

// Canonical marketing domain (apex, served by Vercel). The Bubble app on
// app.gatherwise.io is a separate property with its own sitemap.
const BASE_URL = "https://gatherwise.io";

// Public, indexable marketing routes only. Excludes /hello-world (scratch page)
// and /index_v2 (an alternate homepage design that is not the canonical "/").
// lastModified reflects each page's most recent content commit.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date("2026-08-04"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/compare/aisle-planner`,
      lastModified: new Date("2026-08-04"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/compare/honeybook`,
      lastModified: new Date("2026-08-02"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/compare/timeline-genius`,
      lastModified: new Date("2026-07-29"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
