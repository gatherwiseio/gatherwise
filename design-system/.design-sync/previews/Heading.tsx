import * as React from "react";
import { Heading } from "@gatherwise/design-system";

export function Display() {
  return (
    <Heading size="display" as="h1">
      <Heading.Quiet>Timeline Genius</Heading.Quiet> runs your timeline.{" "}
      <Heading.Accent>Gatherwise</Heading.Accent> runs the whole business.
    </Heading>
  );
}

export function Section() {
  return <Heading size="section">Side by side, as of mid-2026.</Heading>;
}

export function Sub() {
  return (
    <Heading size="sub" as="h3">
      A planner running 30 events a year
    </Heading>
  );
}
