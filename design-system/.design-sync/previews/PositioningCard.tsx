import * as React from "react";
import { PositioningCard } from "@gatherwise/design-system";

export function Primary() {
  return (
    <div style={{ maxWidth: 420 }}>
      <PositioningCard
        eyebrow="Gatherwise"
        title="Modern software + CRM for event and wedding planners"
        body="Built for planners, on purpose. Timelines, tasks, budgets, guests, seating, proposals and invoicing all sit on the same client record."
        items={[
          "Timelines as strong as a dedicated timeline tool",
          "Planning tools and CRM in one place",
          "A native iOS and Android app for event day",
        ]}
      />
    </div>
  );
}

export function Alt() {
  return (
    <div style={{ maxWidth: 420 }}>
      <PositioningCard
        tone="alt"
        eyebrow="Timeline Genius"
        title="A focused, well-made tool for wedding day timelines"
        body="Ten-plus years of doing one job properly: detailed day-of runsheets, vendor-specific views and day-of text reminders."
        items={[
          "Timelines and checklists, deeply developed",
          "Vendor rolodex and day-of text reminders",
          "No CRM, budgets, guests or seating",
        ]}
      />
    </div>
  );
}
