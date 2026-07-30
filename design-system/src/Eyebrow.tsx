import * as React from "react";

export interface EyebrowProps {
  /** Muted grey instead of the default gold — use to de-emphasize a comparison
   *  competitor label. */
  muted?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Small uppercase letter-spaced label that sits above a heading to name the
 * section ("Feature by feature", "Pricing snapshot").
 */
export function Eyebrow({ muted, children, className }: EyebrowProps) {
  const cls = `gw-eyebrow${muted ? " gw-eyebrow--muted" : ""}${
    className ? ` ${className}` : ""
  }`;
  return <div className={cls}>{children}</div>;
}
