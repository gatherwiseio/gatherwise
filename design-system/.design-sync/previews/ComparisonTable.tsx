import * as React from "react";
import { ComparisonTable } from "@gatherwise/design-system";

export function Default() {
  return (
    <ComparisonTable
      products={["Gatherwise", "Timeline Genius"]}
      groups={[
        {
          title: "Timeline",
          rows: [
            {
              capability: "Drag-and-drop timelines",
              detail: "Drag and drop to sort, or auto-sort",
              values: [{ kind: "yes" }, { kind: "yes" }],
            },
            {
              capability: "Export the entire event",
              detail: "Timeline, tasks, budget, guests and seating in one export",
              values: [{ kind: "yes" }, { kind: "no", note: "Timeline only" }],
            },
          ],
        },
        {
          title: "Sales & CRM",
          rows: [
            {
              capability: "Leads and client CRM",
              values: [{ kind: "yes" }, { kind: "no" }],
            },
            {
              capability: "Invoicing & online payments",
              values: [{ kind: "yes" }, { kind: "no" }],
            },
          ],
        },
        {
          title: "Pricing",
          rows: [
            {
              capability: "Pricing model",
              values: [
                { kind: "price", lead: "Starts at ", amount: "$29/mo" },
                {
                  kind: "price",
                  amount: "$54.95/mo",
                  trail: " — timelines only",
                  soft: true,
                },
              ],
            },
          ],
        },
      ]}
    />
  );
}
