import * as React from "react";
import { Chip } from "@gatherwise/design-system";

export function Outline() {
  return <Chip>One login</Chip>;
}

export function Solid() {
  return <Chip solid>Export entire event</Chip>;
}

export function Row() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      <Chip>One login</Chip>
      <Chip>One client record</Chip>
      <Chip solid>Export entire event</Chip>
    </div>
  );
}
