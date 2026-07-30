import * as React from "react";
import { CalloutCard } from "@gatherwise/design-system";

export function Default() {
  return (
    <div style={{ maxWidth: 720 }}>
      <CalloutCard
        eyebrow="Where Timeline Genius may fit better"
        title="We would rather you pick the right tool than pick us."
        paragraphs={[
          "If the timeline is genuinely the only part of your process that needs software — your CRM, budgets and guest lists already work the way you like — Timeline Genius is a well-built, focused tool with more than a decade behind it.",
          "If you would rather get rid of dozens of tools and run the whole event from one place, that is what Gatherwise is for.",
        ]}
      />
    </div>
  );
}
