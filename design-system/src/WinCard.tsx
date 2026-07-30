import * as React from "react";

export interface WinCardProps {
  /** Ordinal shown large in gold serif ("01"). */
  number: string;
  /** Card heading. */
  title: string;
  /** Supporting paragraph. */
  children: React.ReactNode;
}

/**
 * Dark numbered differentiator card. Lay four out in a grid with a 1px gap over
 * a parchment-tinted background to get the hairline rules between them.
 */
export function WinCard({ number, title, children }: WinCardProps) {
  return (
    <div className="gw-win">
      <div className="gw-win__number" aria-hidden="true">
        {number}
      </div>
      <h3 className="gw-win__title">{title}</h3>
      <p className="gw-win__text">{children}</p>
    </div>
  );
}
