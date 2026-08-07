export type ComparisonCell =
  | { kind: "yes"; note?: string }
  | { kind: "no"; note?: string }
  | {
      kind: "price";
      lead: string;
      amount: string;
      trail: string;
      tone: "muted" | "soft";
    };

export type ComparisonRow = {
  capability: string;
  detail?: string;
  gatherwise: ComparisonCell;
  rockPaperCoin: ComparisonCell;
};

export type ComparisonGroup = {
  title: string;
  rows: ComparisonRow[];
};

export const comparisonGroups: ComparisonGroup[] = [
  {
    title: "Sales & CRM",
    rows: [
      {
        capability: "Leads and client CRM",
        detail: "Track inquiries, clients and their whole history in one place",
        gatherwise: { kind: "yes" },
        rockPaperCoin: { kind: "yes", note: "Premium plan" },
      },
      {
        capability: "Lead inquiry form",
        detail: "Embed it on your site — inquiries arrive as leads, not emails",
        gatherwise: { kind: "yes" },
        rockPaperCoin: { kind: "yes", note: "Premium plan" },
      },
      {
        capability: "Client questionnaires",
        detail: "Send a form and have the answers land on the event",
        gatherwise: { kind: "yes" },
        rockPaperCoin: { kind: "no" },
      },
      {
        capability: "AI-assisted proposal creation",
        gatherwise: { kind: "yes" },
        rockPaperCoin: { kind: "no" },
      },
    ],
  },
  {
    title: "Proposals, contracts & payments",
    rows: [
      {
        capability: "Proposals with templates",
        gatherwise: { kind: "yes" },
        rockPaperCoin: { kind: "yes" },
      },
      {
        capability: "Digital contracts & e-signatures",
        gatherwise: { kind: "yes" },
        rockPaperCoin: { kind: "yes" },
      },
      {
        capability: "Invoicing & online payments",
        detail: "Cards, ACH, auto-pay, Apple Pay and Google Pay",
        gatherwise: { kind: "yes" },
        rockPaperCoin: { kind: "yes", note: "A core strength — Stripe-powered" },
      },
      {
        capability: "QuickBooks Online sync",
        gatherwise: { kind: "no" },
        rockPaperCoin: { kind: "yes", note: "Premium plan" },
      },
    ],
  },
  {
    title: "Event timeline & day-of",
    rows: [
      {
        capability: "Drag-and-drop event timelines",
        detail: "Build a minute-by-minute run of show, sort or auto-sort",
        gatherwise: { kind: "yes" },
        rockPaperCoin: { kind: "no" },
      },
      {
        capability: "Timeline templates",
        detail: "Start a new event from your own saved structure",
        gatherwise: { kind: "yes" },
        rockPaperCoin: { kind: "no" },
      },
      {
        capability: "Share the timeline as a live URL",
        detail: "Always current, no re-sending files to vendors",
        gatherwise: { kind: "yes" },
        rockPaperCoin: { kind: "no" },
      },
      {
        capability: "Export the entire event",
        detail: "Timeline, tasks, budget, guests and seating in one export",
        gatherwise: { kind: "yes" },
        rockPaperCoin: { kind: "no", note: "No event data" },
      },
    ],
  },
  {
    title: "Budget, guests & seating",
    rows: [
      {
        capability: "Budget tracking",
        detail: "Track estimates, actuals and what the client still owes",
        gatherwise: { kind: "yes" },
        rockPaperCoin: { kind: "no" },
      },
      {
        capability: "Auto-calculated category amounts",
        detail: "Enter a total budget and see each category split out",
        gatherwise: { kind: "yes" },
        rockPaperCoin: { kind: "no" },
      },
      {
        capability: "Guest lists & RSVPs",
        gatherwise: { kind: "yes" },
        rockPaperCoin: { kind: "no" },
      },
      {
        capability: "Seating charts & floor plans",
        gatherwise: { kind: "yes" },
        rockPaperCoin: { kind: "no" },
      },
    ],
  },
  {
    title: "Tasks, mobile & vendors",
    rows: [
      {
        capability: "Task checklists",
        gatherwise: { kind: "yes" },
        rockPaperCoin: { kind: "no" },
      },
      {
        capability: "Robust notification system",
        detail:
          "@mentions, comment notifications, mobile push, and daily and weekly task-due reminders",
        gatherwise: { kind: "yes" },
        rockPaperCoin: {
          kind: "no",
          note: "Reminders cover proposals & invoices only",
        },
      },
      {
        capability: "Native mobile app",
        detail: "iOS and Android",
        gatherwise: { kind: "yes" },
        rockPaperCoin: { kind: "no", note: "Mobile web only" },
      },
      {
        capability: "Vendor payments linked to the checklist",
        detail: "Payment due dates appear as tasks automatically",
        gatherwise: { kind: "yes" },
        rockPaperCoin: { kind: "no" },
      },
    ],
  },
  {
    title: "Fit & pricing",
    rows: [
      {
        capability: "Built specifically for event & wedding planners",
        detail: "Every tool shaped around how planners actually work",
        gatherwise: { kind: "yes" },
        rockPaperCoin: {
          kind: "no",
          note: "All event pros — photographers, florists, venues",
        },
      },
      {
        capability: "Pricing model",
        gatherwise: {
          kind: "price",
          lead: "Starts at ",
          amount: "$29/mo",
          trail: " for planning + sales tools",
          tone: "muted",
        },
        rockPaperCoin: {
          kind: "price",
          lead: "",
          amount: "$0–$41/mo",
          trail: " + 2.5% payment processing fee — sales tools only",
          tone: "soft",
        },
      },
    ],
  },
];
