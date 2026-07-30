import * as React from "react";
import { WinCard } from "@gatherwise/design-system";

export function Single() {
  return (
    <div style={{ maxWidth: 320 }}>
      <WinCard number="01" title="The whole event, not just the day">
        Budget, guest list, seating and vendor payments live beside the timeline
        — so you stop stitching four tools together for one wedding.
      </WinCard>
    </div>
  );
}

export function Grid() {
  const items = [
    {
      number: "01",
      title: "The whole event, not just the day",
      body: "Budget, guests, seating and vendor payments live beside the timeline.",
    },
    {
      number: "02",
      title: "Sales tools included",
      body: "Leads, proposals, contracts and invoicing are part of the same subscription.",
    },
    {
      number: "03",
      title: "A real mobile app",
      body: "Native iOS and Android, built for standing in a ballroom on event day.",
    },
    {
      number: "04",
      title: "Tasks that chase you",
      body: "@mentions, comments, push and due-date reminders keep the six weeks from slipping.",
    },
  ];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(220px, 1fr))",
        gap: 1,
        background: "rgb(246 239 224 / 0.16)",
      }}
    >
      {items.map((it) => (
        <WinCard key={it.number} number={it.number} title={it.title}>
          {it.body}
        </WinCard>
      ))}
    </div>
  );
}
