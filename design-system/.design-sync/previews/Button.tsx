import * as React from "react";
import { Button } from "@gatherwise/design-system";

export function Primary() {
  return (
    <Button variant="primary" href="#">
      Start free trial
    </Button>
  );
}

export function Large() {
  return (
    <Button variant="large" href="#">
      Start free trial
    </Button>
  );
}

export function Gold() {
  return (
    <div style={{ background: "#2a2723", padding: 28 }}>
      <Button variant="gold" href="#">
        Start free trial
      </Button>
    </div>
  );
}

export function Ghost() {
  return (
    <div style={{ background: "#2a2723", padding: 28 }}>
      <Button variant="ghost" href="#">
        Talk to a human first
      </Button>
    </div>
  );
}

export function TextLink() {
  return (
    <Button variant="link" href="#">
      See the full comparison
    </Button>
  );
}
