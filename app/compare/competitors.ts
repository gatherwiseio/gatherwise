// Single source of truth for the /compare/* routes.
//
// Used by three things that must never drift apart:
//   - app/compare/page.tsx        the hub page that lists every comparison
//   - app/compare/OtherComparisons.tsx  the cross-links in each page's footer
//   - each page's JSON-LD breadcrumb
//
// Adding a comparison page means adding an entry here; the hub and every
// existing page pick it up automatically.

export type Competitor = {
  slug: string;
  /** Competitor's own brand name, as they write it. */
  name: string;
  /** One clause on what the competitor is, reused in metadata descriptions. */
  is: string;
  /** Hub-card summary — what a planner weighing the switch needs to know. */
  summary: string;
  /** The category the tool competes in, shown as a hub-card label. */
  category: string;
};

export const competitors: Competitor[] = [
  {
    slug: "honeybook",
    name: "HoneyBook",
    is: "HoneyBook serves all kinds of businesses",
    summary:
      "A broad clientflow CRM with strong sales tools, but it stops at the signed contract — no timelines, guest lists or seating.",
    category: "Generalist CRM",
  },
  {
    slug: "aisle-planner",
    name: "Aisle Planner",
    is: "Aisle Planner serves the whole events industry",
    summary:
      "Long-established and events-focused, priced per project. Gatherwise is purpose-built for how planners actually work day to day.",
    category: "Events platform",
  },
  {
    slug: "planning-pod",
    name: "Planning Pod",
    is: "Planning Pod serves venues, caterers and planners alike",
    summary:
      "One toolset spread across venues, caterers and planners. Gatherwise builds for planners only, and the workflow shows it.",
    category: "Venue & events suite",
  },
  {
    slug: "timeline-genius",
    name: "Timeline Genius",
    is: "Timeline Genius runs timelines",
    summary:
      "A focused, well-made timeline tool with a decade behind it. Gatherwise matches the timeline and adds the rest of the business.",
    category: "Timeline tool",
  },
  {
    slug: "harpsen",
    name: "Harpsen",
    is: "Harpsen is a low-cost, wedding-only CRM",
    summary:
      "Inexpensive and wedding-only, covering the sales side. Gatherwise adds the planning half — timelines, guests, seating, vendors.",
    category: "Budget wedding CRM",
  },
  {
    slug: "rock-paper-coin",
    name: "Rock Paper Coin",
    is: "Rock Paper Coin handles proposals and payments",
    summary:
      "A paperwork hub for contracts, invoices and payments between planners and vendors. Gatherwise runs the event around it.",
    category: "Contracts & payments",
  },
];

export const bySlug = (slug: string): Competitor | undefined =>
  competitors.find((c) => c.slug === slug);

/** Every comparison except the one currently being viewed. */
export const others = (slug: string): Competitor[] =>
  competitors.filter((c) => c.slug !== slug);
