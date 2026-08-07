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
  planningPod: ComparisonCell;
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
        gatherwise: { kind: "yes" },
        planningPod: { kind: "yes" },
      },
      {
        capability: "Proposals & contracts",
        detail: "Send, e-sign and store — no separate signing tool",
        gatherwise: { kind: "yes" },
        planningPod: { kind: "yes" },
      },
      {
        capability: "AI-assisted proposal creation",
        gatherwise: { kind: "yes" },
        planningPod: { kind: "no" },
      },
      {
        capability: "Invoicing & online payments",
        gatherwise: { kind: "yes" },
        planningPod: { kind: "yes" },
      },
      {
        capability: "Lead inquiry form",
        detail: "Embed it on your site — inquiries arrive as leads, not emails",
        gatherwise: { kind: "yes" },
        planningPod: { kind: "yes", note: "Web forms & pipeline" },
      },
      {
        capability: "Client questionnaires",
        detail: "Send a form and have the answers land on the event",
        gatherwise: { kind: "yes" },
        planningPod: { kind: "yes", note: "Forms & surveys" },
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
        planningPod: { kind: "yes", note: "Timelines & itineraries" },
      },
      {
        capability: "Timeline templates",
        detail: "Start a new event from your own saved structure",
        gatherwise: { kind: "yes" },
        planningPod: { kind: "no" },
      },
      {
        capability: "Share the timeline as a live URL",
        detail: "Always current, no re-sending files to vendors",
        gatherwise: { kind: "yes" },
        planningPod: { kind: "yes", note: "Via client portal" },
      },
      {
        capability: "Export the entire event",
        detail: "Timeline, tasks, budget, guests and seating in one export",
        gatherwise: { kind: "yes" },
        planningPod: { kind: "no" },
      },
    ],
  },
  {
    title: "Budget, guests & seating",
    rows: [
      {
        capability: "Budget tracking",
        gatherwise: { kind: "yes" },
        planningPod: { kind: "yes" },
      },
      {
        capability: "Auto-calculated category amounts",
        detail: "Enter a total budget and see each category split out",
        gatherwise: { kind: "yes" },
        planningPod: { kind: "no" },
      },
      {
        capability: "Guest lists & RSVPs",
        gatherwise: { kind: "yes" },
        planningPod: { kind: "yes" },
      },
      {
        capability: "Seating charts & floor plans",
        gatherwise: { kind: "yes" },
        planningPod: { kind: "yes", note: "A genuine strength — to-scale floor plans" },
      },
    ],
  },
  {
    title: "Tasks, mobile & vendors",
    rows: [
      {
        capability: "Task checklists",
        gatherwise: { kind: "yes" },
        planningPod: { kind: "yes" },
      },
      {
        capability: "Robust notification system",
        detail:
          "@mentions, comment notifications, mobile push, and daily and weekly task-due reminders",
        gatherwise: { kind: "yes" },
        planningPod: { kind: "no" },
      },
      {
        capability: "Native mobile app",
        detail: "iOS and Android — the one you open on event day",
        gatherwise: { kind: "yes" },
        planningPod: { kind: "no", note: "Responsive web only" },
      },
      {
        capability: "Vendor management",
        gatherwise: { kind: "yes" },
        planningPod: { kind: "yes" },
      },
      {
        capability: "Vendor payments linked to the checklist",
        detail: "Payment due dates appear as tasks automatically",
        gatherwise: { kind: "yes" },
        planningPod: { kind: "no" },
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
        planningPod: { kind: "no", note: "Also serves venues & caterers" },
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
        planningPod: {
          kind: "price",
          lead: "",
          amount: "$59–$159+/mo",
          trail: " tiered by event volume — up to 50 events at $159/mo",
          tone: "soft",
        },
      },
    ],
  },
];
