import * as React from "react";
import { EventCard } from "@gatherwise/design-system";

const rows = [
  { label: "Day-of timeline", meta: "42 items · shared live" },
  { label: "Task checklist", meta: "9 due this week" },
  { label: "Budget", meta: "$84,200 tracked" },
  { label: "Guest list & seating", meta: "180 guests · 18 tables" },
  { label: "Proposal, contract & invoices", meta: "Paid", paid: true },
];

export function Default() {
  return (
    <div style={{ maxWidth: 460 }}>
      <EventCard
        title="Harper & Cole — one event"
        tag="All in Gatherwise"
        rows={rows}
        chips={["One login", "One client record", "Export entire event"]}
      />
    </div>
  );
}

export function WithoutChips() {
  return (
    <div style={{ maxWidth: 460 }}>
      <EventCard
        title="Rivera wedding"
        tag="All in Gatherwise"
        rows={[
          { label: "Day-of timeline", meta: "38 items · shared live" },
          { label: "Budget", meta: "$62,000 tracked" },
          { label: "Deposit invoice", meta: "Paid", paid: true },
        ]}
      />
    </div>
  );
}
