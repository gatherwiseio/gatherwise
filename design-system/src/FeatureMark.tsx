import * as React from "react";

export interface FeatureMarkProps {
  /** `true` renders the gold ✓ (included); `false` renders the hollow —
   *  (absent). */
  included: boolean;
  /** Optional short qualifier shown after the mark ("Timeline only",
   *  "Contact rolodex"). */
  note?: string;
}

/**
 * The ✓ / — indicator used in comparison-table cells. Includes a visually
 * hidden "Included" / "Not included" label for screen readers.
 */
export function FeatureMark({ included, note }: FeatureMarkProps) {
  return (
    <>
      <span
        className={`gw-mark ${included ? "gw-mark--yes" : "gw-mark--no"}`}
        aria-hidden="true"
      >
        {included ? "✓" : "—"}
      </span>
      <span
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clipPath: "inset(50%)",
        }}
      >
        {included ? "Included" : "Not included"}
      </span>
      {note ? <span className="gw-mark__note">{note}</span> : null}
    </>
  );
}
