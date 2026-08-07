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
  harpsen: ComparisonCell;
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
        harpsen: { kind: "yes" },
      },
      {
        capability: "Proposals & contracts",
        gatherwise: { kind: "yes" },
        harpsen: { kind: "yes" },
      },
      {
        capability: "AI-assisted proposal creation",
        gatherwise: { kind: "yes" },
        harpsen: { kind: "no" },
      },
      {
        capability: "Invoicing & online payments",
        detail: "Payment plans and automatic invoice generation",
        gatherwise: { kind: "yes" },
        harpsen: { kind: "yes" },
      },
      {
        capability: "Client questionnaires",
        gatherwise: { kind: "yes" },
        harpsen: { kind: "yes" },
      },
      {
        capability: "Lead inquiry form",
        detail: "Embed it on your site — inquiries arrive as leads, not emails",
        gatherwise: { kind: "yes" },
        harpsen: { kind: "no" },
      },
    ],
  },
  {
    title: "Event timeline & day-of",
    rows: [
      {
        capability: "Drag-and-drop event timelines",
        gatherwise: { kind: "yes" },
        harpsen: { kind: "yes" },
      },
      {
        capability: "Timeline templates",
        detail: "Start a new event from your own saved structure",
        gatherwise: { kind: "yes" },
        harpsen: { kind: "yes" },
      },
      {
        capability: "Share the timeline as a live URL",
        detail: "Always current, no re-sending files to vendors",
        gatherwise: { kind: "yes" },
        harpsen: { kind: "no" },
      },
      {
        capability: "Export the entire event",
        detail: "Timeline, tasks, budget, guests and seating in one export",
        gatherwise: { kind: "yes" },
        harpsen: { kind: "no" },
      },
    ],
  },
  {
    title: "Budget, guests & seating",
    rows: [
      {
        capability: "Budget tracking",
        gatherwise: { kind: "yes" },
        harpsen: { kind: "yes" },
      },
      {
        capability: "Auto-calculated category amounts",
        detail: "Enter a total budget and see each category split out",
        gatherwise: { kind: "yes" },
        harpsen: { kind: "no", note: "Manual categories" },
      },
      {
        capability: "Guest lists & RSVPs",
        gatherwise: { kind: "yes" },
        harpsen: { kind: "yes" },
      },
      {
        capability: "Seating charts & floor plans",
        gatherwise: { kind: "yes" },
        harpsen: { kind: "yes" },
      },
    ],
  },
  {
    title: "Tasks, mobile & vendors",
    rows: [
      {
        capability: "Task checklists",
        detail: "Assign to clients, vendors and team, with reminders",
        gatherwise: { kind: "yes" },
        harpsen: { kind: "yes" },
      },
      {
        capability: "Robust notification system",
        detail:
          "@mentions, comment notifications, mobile push, and daily and weekly task-due reminders",
        gatherwise: { kind: "yes" },
        harpsen: { kind: "no", note: "Basic reminders only" },
      },
      {
        capability: "Native mobile app",
        detail: "iOS and Android — the one you open on event day",
        gatherwise: { kind: "yes" },
        harpsen: { kind: "no", note: "Web only" },
      },
      {
        capability: "Vendor management",
        gatherwise: { kind: "yes" },
        harpsen: { kind: "yes" },
      },
      {
        capability: "Vendor payments linked to the checklist",
        detail: "Payment due dates appear as tasks automatically",
        gatherwise: { kind: "yes" },
        harpsen: { kind: "no", note: "Tracked separately" },
      },
    ],
  },
  {
    title: "Fit & pricing",
    rows: [
      {
        capability: "Built for every event, not just weddings",
        detail: "Corporate, social and nonprofit events on the same CRM",
        gatherwise: { kind: "yes" },
        harpsen: { kind: "no", note: "Wedding-only" },
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
        harpsen: {
          kind: "price",
          lead: "Flat ",
          amount: "$12/mo",
          trail: " (or $100/yr) — unlimited events, wedding-only",
          tone: "soft",
        },
      },
    ],
  },
];
