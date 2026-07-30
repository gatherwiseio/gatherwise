import * as React from "react";
import { PricingColumn } from "@gatherwise/design-system";

const gatherwise = [
  { label: "Timelines", included: true },
  { label: "Tasks & notifications", included: true },
  { label: "Budget", included: true },
  { label: "Guests & seating", included: true },
  { label: "CRM & lead inquiries", included: true },
  { label: "Proposals & contracts", included: true },
  { label: "Invoicing & payments", included: true },
];

const competitor = [
  { label: "Timelines", included: true },
  { label: "Checklists", included: true },
  { label: "Budget — buy elsewhere", included: false },
  { label: "Guests & seating — buy elsewhere", included: false },
  { label: "CRM & lead inquiries — buy elsewhere", included: false },
  { label: "Proposals & contracts — buy elsewhere", included: false },
  { label: "Invoicing & payments — buy elsewhere", included: false },
];

export function Gatherwise() {
  return (
    <div style={{ maxWidth: 320 }}>
      <PricingColumn
        plan="Gatherwise Professional"
        price="$59"
        pills={gatherwise}
        foot="Up to 50 events at a time. One subscription, one login."
      />
    </div>
  );
}

export function Competitor() {
  return (
    <div style={{ maxWidth: 320 }}>
      <PricingColumn
        tone="alt"
        plan="Timeline Genius Unlimited"
        price="$54.95"
        pills={competitor}
        foot="Unlimited events, or $194.95 for five. Timelines only."
      />
    </div>
  );
}

export function SideBySide() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(220px, 1fr))",
        gap: 32,
      }}
    >
      <PricingColumn
        plan="Gatherwise Professional"
        price="$59"
        pills={gatherwise}
      />
      <PricingColumn
        tone="alt"
        plan="Timeline Genius Unlimited"
        price="$54.95"
        pills={competitor}
      />
    </div>
  );
}
