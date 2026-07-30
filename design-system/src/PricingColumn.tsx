import * as React from "react";

export interface PricingPill {
  /** Feature label. */
  label: string;
  /** `true` = filled pill (included). `false` = outlined "buy elsewhere" row. */
  included: boolean;
}

export interface PricingColumnProps {
  /** Uppercase plan name. */
  plan: string;
  /** Price figure without the unit ("$59", "$54.95"). */
  price: string;
  /** Unit suffix ("/mo"). */
  unit?: string;
  /** Feature pills, in display order. */
  pills: PricingPill[];
  /** Footnote under the pills. */
  foot?: string;
  /** `primary` uses gold plan label + gold filled pills; `alt` uses a muted
   *  label + ink filled pills (the competitor column). */
  tone?: "primary" | "alt";
}

/**
 * One plan column in a pricing comparison: a plan name + price, then a stack of
 * feature pills where filled = included and outlined = not included. Render two
 * side by side to contrast what each price actually covers.
 */
export function PricingColumn({
  plan,
  price,
  unit = "/mo",
  pills,
  foot,
  tone = "primary",
}: PricingColumnProps) {
  const alt = tone === "alt";
  return (
    <div className="gw-price">
      <div className="gw-price__head">
        <span className={`gw-price__plan${alt ? " gw-price__plan--alt" : ""}`}>
          {plan}
        </span>
        <span className="gw-price__amount">
          {price}
          <span className="gw-price__unit">{unit}</span>
        </span>
      </div>
      <div className="gw-price__pills">
        {pills.map((pill) => (
          <span
            key={pill.label}
            className={
              pill.included
                ? `gw-pill${alt ? " gw-pill--ink" : ""}`
                : "gw-pill--out"
            }
          >
            {pill.label}
          </span>
        ))}
      </div>
      {foot ? <span className="gw-price__foot">{foot}</span> : null}
    </div>
  );
}
