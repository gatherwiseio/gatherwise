import * as React from "react";
import { FeatureMark } from "@gatherwise/design-system";

const row: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  fontFamily: "Karla, sans-serif",
  fontSize: 14,
  color: "#2a2723",
};

export function Included() {
  return (
    <div style={row}>
      <FeatureMark included />
      <span>Included</span>
    </div>
  );
}

export function Absent() {
  return (
    <div style={row}>
      <FeatureMark included={false} />
      <span style={{ color: "#8c8479" }}>Not included</span>
    </div>
  );
}

export function WithNote() {
  return (
    <div style={row}>
      <FeatureMark included={false} note="Timeline only" />
    </div>
  );
}
