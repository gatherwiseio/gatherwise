import * as React from "react";

export interface FooterProps {
  /** Left-hand legal / attribution line. */
  legal: string;
  /** Right-hand tagline. */
  tagline?: string;
}

/**
 * Dark page footer with a legal/attribution line on the left and a tagline on
 * the right; the two stack on narrow widths.
 */
export function Footer({ legal, tagline }: FooterProps) {
  return (
    <footer className="gw-footer">
      <span>{legal}</span>
      {tagline ? <span>{tagline}</span> : null}
    </footer>
  );
}
