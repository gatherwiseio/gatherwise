import * as React from "react";
import { Chip } from "./Chip";

export interface EventCardRow {
  /** Left-hand line item ("Day-of timeline"). */
  label: string;
  /** Right-hand metadata ("42 items · shared live", or "Paid"). */
  meta: string;
  /** Emphasize as the outcome line — dashed gold border, uppercase gold meta. */
  paid?: boolean;
}

export interface EventCardProps {
  /** Card title, e.g. the couple or event name. */
  title: string;
  /** Small uppercase gold label top-right ("All in Gatherwise"). */
  tag?: string;
  /** The stacked line items. */
  rows: EventCardRow[];
  /** Optional uppercase chips shown beneath a divider at the foot. */
  chips?: string[];
}

/**
 * Parchment summary card that shows an entire event living in one place — a
 * stack of labelled rows with a highlighted "paid" outcome line and optional
 * footer chips. Used as the hero visual on comparison pages.
 */
export function EventCard({ title, tag, rows, chips }: EventCardProps) {
  return (
    <div className="gw-event">
      <div className="gw-event__head">
        <div className="gw-event__title">{title}</div>
        {tag ? <div className="gw-event__tag">{tag}</div> : null}
      </div>
      <div className="gw-event__rows">
        {rows.map((row) => (
          <div
            key={row.label}
            className={`gw-event__row${row.paid ? " gw-event__row--paid" : ""}`}
          >
            <span className="gw-event__label">{row.label}</span>
            <span
              className={`gw-event__meta${
                row.paid ? " gw-event__meta--paid" : ""
              }`}
            >
              {row.meta}
            </span>
          </div>
        ))}
      </div>
      {chips && chips.length > 0 ? (
        <div className="gw-event__tags">
          {chips.map((chip, i) => (
            <Chip key={chip} solid={i === chips.length - 1}>
              {chip}
            </Chip>
          ))}
        </div>
      ) : null}
    </div>
  );
}
