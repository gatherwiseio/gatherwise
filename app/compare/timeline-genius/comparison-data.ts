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
  timelineGenius: ComparisonCell;
};

export type ComparisonGroup = {
  title: string;
  rows: ComparisonRow[];
};

export const comparisonGroups: ComparisonGroup[] = [
  {
    title: "Timeline",
    rows: [
      {
        capability: "Drag-and-drop timelines",
        detail: "Drag and drop to sort, or auto-sort",
        gatherwise: { kind: "yes" },
        timelineGenius: { kind: "yes" },
      },
      {
        capability: "Timeline templates",
        detail: "Start a new event from your own saved structure",
        gatherwise: { kind: "yes" },
        timelineGenius: { kind: "yes" },
      },
      {
        capability: "Share the timeline as a live URL",
        detail: "Always current, no re-sending files",
        gatherwise: { kind: "yes" },
        timelineGenius: { kind: "yes" },
      },
      {
        capability: "Export the entire event",
        detail:
          "Timeline, tasks, budget, guests and seating in one export — not the timeline alone",
        gatherwise: { kind: "yes" },
        timelineGenius: { kind: "no", note: "Timeline only" },
      },
    ],
  },
  {
    title: "Platform & mobile",
    rows: [
      {
        capability: "Full-featured web app",
        detail: "Works in any browser, no install",
        gatherwise: { kind: "yes" },
        timelineGenius: { kind: "yes" },
      },
      {
        capability: "Native mobile app",
        detail: "iOS and Android — the one you open on event day",
        gatherwise: { kind: "yes" },
        timelineGenius: { kind: "no", note: "Mobile web only" },
      },
    ],
  },
  {
    title: "Task checklist",
    rows: [
      {
        capability: "Task checklists",
        gatherwise: { kind: "yes" },
        timelineGenius: { kind: "yes" },
      },
      {
        capability: "Robust notification system",
        detail:
          "@mentions, comment notifications, mobile push, and daily and weekly task-due reminders",
        gatherwise: { kind: "yes" },
        timelineGenius: { kind: "no", note: "No task notifications" },
      },
      {
        capability: "Attachments on a task",
        detail: "Files, images, contracts and more",
        gatherwise: { kind: "yes" },
        timelineGenius: { kind: "no" },
      },
    ],
  },
  {
    title: "Sales & CRM",
    rows: [
      {
        capability: "Leads and client CRM",
        gatherwise: { kind: "yes" },
        timelineGenius: { kind: "no" },
      },
      {
        capability: "Proposals & contracts",
        gatherwise: { kind: "yes" },
        timelineGenius: { kind: "no" },
      },
      {
        capability: "AI-assisted proposal creation",
        gatherwise: { kind: "yes" },
        timelineGenius: { kind: "no" },
      },
      {
        capability: "Invoicing & online payments",
        gatherwise: { kind: "yes" },
        timelineGenius: { kind: "no" },
      },
    ],
  },
  {
    title: "Budget, guests & seating",
    rows: [
      {
        capability: "Budget tracking",
        gatherwise: { kind: "yes" },
        timelineGenius: { kind: "no" },
      },
      {
        capability: "Auto-calculated category amounts",
        detail: "Enter a total budget and see each category split out",
        gatherwise: { kind: "yes" },
        timelineGenius: { kind: "no" },
      },
      {
        capability: "Guest lists & RSVPs",
        gatherwise: { kind: "yes" },
        timelineGenius: { kind: "no" },
      },
      {
        capability: "Seating charts & floor plans",
        gatherwise: { kind: "yes" },
        timelineGenius: { kind: "no" },
      },
    ],
  },
  {
    title: "Other",
    rows: [
      {
        capability: "Lead inquiry form",
        detail:
          "Embed it on your site — inquiries arrive as leads, not emails",
        gatherwise: { kind: "yes" },
        timelineGenius: { kind: "no" },
      },
      {
        capability: "Client questionnaires",
        detail: "Send a form and have the answers land on the event",
        gatherwise: { kind: "yes" },
        timelineGenius: { kind: "no" },
      },
      {
        capability: "Vendor management",
        gatherwise: { kind: "yes" },
        timelineGenius: { kind: "yes", note: "Contact rolodex" },
      },
      {
        capability: "Vendor payments linked to the checklist",
        detail: "Payment due dates appear as tasks automatically",
        gatherwise: { kind: "yes" },
        timelineGenius: { kind: "no" },
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
        timelineGenius: {
          kind: "price",
          lead: "",
          amount: "$54.95/mo",
          trail: " unlimited, or $194.95 for 5 events — timelines only",
          tone: "soft",
        },
      },
    ],
  },
];
