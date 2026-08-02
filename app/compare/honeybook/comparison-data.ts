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
  honeybook: ComparisonCell;
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
        honeybook: { kind: "yes" },
      },
      {
        capability: "Proposals & contracts",
        detail: "Send, e-sign and store — no separate signing tool",
        gatherwise: { kind: "yes" },
        honeybook: { kind: "yes" },
      },
      {
        capability: "AI-assisted proposal creation",
        gatherwise: { kind: "yes" },
        honeybook: { kind: "yes" },
      },
      {
        capability: "Invoicing & online payments",
        gatherwise: { kind: "yes" },
        honeybook: { kind: "yes" },
      },
      {
        capability: "Lead inquiry form",
        detail:
          "Embed it on your site — inquiries arrive as leads, not emails",
        gatherwise: { kind: "yes" },
        honeybook: { kind: "yes" },
      },
      {
        capability: "Client questionnaires",
        detail: "Send a form and have the answers land on the event",
        gatherwise: { kind: "yes" },
        honeybook: { kind: "yes" },
      },
      {
        capability: "Online scheduling & meeting booking",
        detail: "Let clients book a call from your availability",
        gatherwise: { kind: "no" },
        honeybook: { kind: "yes" },
      },
      {
        capability: "Automated workflows",
        detail: "Trigger emails, files and tasks off a client's stage",
        gatherwise: { kind: "no", note: "Coming soon" },
        honeybook: { kind: "yes" },
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
        honeybook: { kind: "no" },
      },
      {
        capability: "Timeline templates",
        detail: "Start a new event from your own saved structure",
        gatherwise: { kind: "yes" },
        honeybook: { kind: "no" },
      },
      {
        capability: "Share the timeline as a live URL",
        detail: "Always current, no re-sending files to vendors",
        gatherwise: { kind: "yes" },
        honeybook: { kind: "no" },
      },
      {
        capability: "Export the entire event",
        detail:
          "Timeline, tasks, budget, guests and seating in one export",
        gatherwise: { kind: "yes" },
        honeybook: { kind: "no", note: "No event data" },
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
        honeybook: { kind: "no" },
      },
      {
        capability: "Auto-calculated category amounts",
        detail: "Enter a total budget and see each category split out",
        gatherwise: { kind: "yes" },
        honeybook: { kind: "no" },
      },
      {
        capability: "Guest lists & RSVPs",
        gatherwise: { kind: "yes" },
        honeybook: { kind: "no" },
      },
      {
        capability: "Seating charts & floor plans",
        gatherwise: { kind: "yes" },
        honeybook: { kind: "no" },
      },
    ],
  },
  {
    title: "Tasks, mobile & vendors",
    rows: [
      {
        capability: "Task checklists",
        gatherwise: { kind: "yes" },
        honeybook: { kind: "yes" },
      },
      {
        capability: "Robust notification system",
        detail:
          "@mentions, comment notifications, mobile push, and daily and weekly task-due reminders",
        gatherwise: { kind: "yes" },
        honeybook: { kind: "no", note: "Limited" },
      },
      {
        capability: "Native mobile app",
        detail: "iOS and Android",
        gatherwise: { kind: "yes" },
        honeybook: { kind: "yes" },
      },
      {
        capability: "Vendor payments linked to the checklist",
        detail: "Payment due dates appear as tasks automatically",
        gatherwise: { kind: "yes" },
        honeybook: { kind: "no" },
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
        honeybook: { kind: "no", note: "All service businesses" },
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
        honeybook: {
          kind: "price",
          lead: "",
          amount: "$29–$109/mo",
          trail: " clientflow tools — no event planning",
          tone: "soft",
        },
      },
    ],
  },
];
