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
  aislePlanner: ComparisonCell;
};

export type ComparisonGroup = {
  title: string;
  rows: ComparisonRow[];
};

export const comparisonGroups: ComparisonGroup[] = [
  {
    title: "Pricing",
    rows: [
      {
        capability: "Pricing model",
        gatherwise: {
          kind: "price",
          lead: "From ",
          amount: "$29/mo",
          trail: " for planning + sales tools",
          tone: "muted",
        },
        aislePlanner: {
          kind: "price",
          lead: "From ",
          amount: "$69.99/mo",
          trail: " for planning + sales tools",
          tone: "soft",
        },
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
        aislePlanner: { kind: "yes" },
      },
      {
        capability: "Native mobile app",
        detail: "iOS and Android — the one you open on event day",
        gatherwise: { kind: "yes" },
        aislePlanner: { kind: "no", note: "No mobile app" },
      },
      {
        capability: "Export the entire event",
        detail:
          "Send vendors and clients a PDF, or a live URL that stays current — no re-downloading and re-sending after every tweak",
        gatherwise: { kind: "yes" },
        aislePlanner: { kind: "no" },
      },
      {
        capability: "Client login without a password",
        detail: "One link, no account to set up",
        gatherwise: { kind: "yes" },
        aislePlanner: { kind: "no", note: "Password login required" },
      },
    ],
  },
  {
    title: "Timeline",
    rows: [
      {
        capability: "Drag-and-drop timelines",
        detail: "Drag and drop to sort, or auto-sort",
        gatherwise: { kind: "yes", note: "Robust" },
        aislePlanner: { kind: "yes", note: "Basic" },
      },
      {
        capability: "Share the timeline as a live URL",
        detail: "Always current, no re-sending files",
        gatherwise: { kind: "yes" },
        aislePlanner: { kind: "no" },
      },
    ],
  },
  {
    title: "Task checklist",
    rows: [
      {
        capability: "Notification system",
        detail:
          "@mentions, comment notifications, mobile push, and daily and weekly task-due reminders",
        gatherwise: { kind: "yes" },
        aislePlanner: { kind: "no" },
      },
      {
        capability: "Attachments on a task",
        detail: "Files, images, contracts and more",
        gatherwise: { kind: "yes" },
        aislePlanner: { kind: "no" },
      },
    ],
  },
  {
    title: "Budget",
    rows: [
      {
        capability: "Budget tracking",
        gatherwise: { kind: "yes" },
        aislePlanner: { kind: "yes" },
      },
      {
        capability: "Auto-calculated category amounts",
        detail: "Enter a total budget and see each category split out",
        gatherwise: { kind: "yes" },
        aislePlanner: { kind: "no" },
      },
    ],
  },
  {
    title: "Other",
    rows: [
      {
        capability: "AI-assisted proposal creation",
        gatherwise: { kind: "yes" },
        aislePlanner: { kind: "no" },
      },
      {
        capability: "Notes",
        detail: "Keep private notes on a client or event",
        gatherwise: { kind: "yes" },
        aislePlanner: { kind: "yes" },
      },
      {
        capability: "Vendor payments linked to the checklist",
        detail: "Payment due dates appear as tasks automatically",
        gatherwise: { kind: "yes" },
        aislePlanner: { kind: "no" },
      },
      {
        capability: "Proposals & contracts",
        gatherwise: { kind: "yes" },
        aislePlanner: { kind: "yes" },
      },
      {
        capability: "Invoicing & online payments",
        gatherwise: { kind: "yes", note: "3.2% card · 1% ACH" },
        aislePlanner: { kind: "yes", note: "3.2% flat · no ACH" },
      },
      {
        capability: "Guest lists & RSVPs",
        gatherwise: { kind: "yes" },
        aislePlanner: { kind: "yes" },
      },
      {
        capability: "Seating charts & floor plans",
        gatherwise: { kind: "yes" },
        aislePlanner: { kind: "yes" },
      },
      {
        capability: "Moodboard",
        detail: "Visual inspiration board for a client",
        gatherwise: { kind: "no", note: "AI moodboard — coming soon" },
        aislePlanner: { kind: "yes" },
      },
      {
        capability: "File storage & sharing",
        gatherwise: { kind: "yes" },
        aislePlanner: { kind: "yes" },
      },
    ],
  },
];
