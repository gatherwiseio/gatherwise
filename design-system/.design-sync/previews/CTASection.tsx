import * as React from "react";
import { CTASection, Button } from "@gatherwise/design-system";

export function Default() {
  return (
    <CTASection
      title="Start your free trial"
      text="Effortless event planning starts here. Bring one live event over and see how it feels."
      fine="Cancel anytime"
    >
      <Button variant="gold" href="#">
        Start free trial
      </Button>
      <Button variant="ghost" href="#">
        Talk to a human first
      </Button>
    </CTASection>
  );
}
