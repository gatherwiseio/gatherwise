// Registry of every /features/* landing page, for the cross-link section each
// one shows to the others (see OtherFeatures.tsx) — same crawlability reason
// /compare/* pages cross-link via competitors.ts: without it, each page is
// only reachable from the sitemap, the weakest discovery signal Google has.

export type Feature = {
  slug: string;
  name: string;
  /** One line, reused from the page's own intro — never invented separately. */
  summary: string;
};

export const features: Feature[] = [
  {
    slug: "timeline",
    name: "Timelines",
    summary:
      "Every event in Gatherwise has its own timeline, built once and shared as a filtered PDF or live link.",
  },
  {
    slug: "seating",
    name: "Seating & layout",
    summary:
      "Drag tables onto the room, seat guests by name, and color the seats by meal choice.",
  },
  {
    slug: "tasks",
    name: "Tasks & reminders",
    summary:
      "A task carries its own assignees, due date, attachments and conversation.",
  },
  {
    slug: "invoicing",
    name: "Invoicing",
    summary:
      "Build the invoice on the event it belongs to, and switch on the payment methods you want.",
  },
  {
    slug: "budget",
    name: "Budget",
    summary:
      "Estimated against actual, category by category, with paid and still due in the same row.",
  },
  {
    slug: "exports",
    name: "PDF & live page",
    summary:
      "Choose the sections to include, preview it, and generate both a branded PDF and a live page in one step.",
  },
  {
    slug: "vendors",
    name: "Vendors & budget",
    summary:
      "Each vendor keeps its own contacts, notes and documents — and the budget line it is attached to.",
  },
];

/** Every feature except the current one, in registry order. */
export function others(slug: string): Feature[] {
  return features.filter((f) => f.slug !== slug);
}
