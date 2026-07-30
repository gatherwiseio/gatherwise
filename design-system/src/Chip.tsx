import * as React from "react";

export interface ChipProps {
  /** Solid ink fill instead of the default outline. Use for the single
   *  emphasized chip in a row. */
  solid?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Small uppercase tag used in rows beneath a card ("One login", "Export entire
 * event"). Keep one `solid` chip per group at most.
 */
export function Chip({ solid, children, className }: ChipProps) {
  const cls = `gw-chip${solid ? " gw-chip--solid" : ""}${
    className ? ` ${className}` : ""
  }`;
  return <span className={cls}>{children}</span>;
}
