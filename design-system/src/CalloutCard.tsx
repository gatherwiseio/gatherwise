import * as React from "react";
import { Eyebrow } from "./Eyebrow";

export interface CalloutCardProps {
  /** Small label above the title. */
  eyebrow: string;
  /** Card heading. */
  title: string;
  /** One or more paragraphs. The last is rendered in full ink for emphasis. */
  paragraphs: string[];
}

/**
 * Parchment callout panel for an honest aside — e.g. "where the other tool may
 * fit better". A quiet eyebrow, a serif title, and body paragraphs with the
 * closing line emphasized.
 */
export function CalloutCard({ eyebrow, title, paragraphs }: CalloutCardProps) {
  return (
    <div className="gw-callout">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="gw-callout__title">{title}</h2>
      {paragraphs.map((p, i) => (
        <p key={i} className="gw-callout__text">
          {p}
        </p>
      ))}
    </div>
  );
}
