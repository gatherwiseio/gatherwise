import * as React from "react";
import { FeatureMark } from "./FeatureMark";

export type ComparisonValue =
  | { kind: "yes"; note?: string }
  | { kind: "no"; note?: string }
  | { kind: "price"; lead?: string; amount: string; trail?: string; soft?: boolean };

export interface ComparisonRow {
  /** The capability being compared. */
  capability: string;
  /** Optional sub-line explaining the capability. */
  detail?: string;
  /** Value in each product column, in the same order as `products`. */
  values: ComparisonValue[];
}

export interface ComparisonGroup {
  /** Section label ("Timeline", "Sales & CRM"). */
  title: string;
  rows: ComparisonRow[];
}

export interface ComparisonTableProps {
  /** Column headers. The first product is treated as the primary (yours). */
  products: string[];
  /** Grouped capability rows. */
  groups: ComparisonGroup[];
}

function Value({ value }: { value: ComparisonValue }) {
  if (value.kind === "price") {
    return (
      <td className="gw-table__cell">
        <span className={value.soft ? "gw-table__price--soft" : "gw-table__price"}>
          {value.lead}
          <b>{value.amount}</b>
          {value.trail}
        </span>
      </td>
    );
  }
  const included = value.kind === "yes";
  return (
    <td className={`gw-table__cell${included ? "" : " gw-table__cell--absent"}`}>
      <FeatureMark included={included} note={value.note} />
    </td>
  );
}

/**
 * Feature-by-feature comparison grid. A dark header row names each product,
 * grouped bands label capability areas, and each cell renders a `FeatureMark`
 * or a price. Full-width — give it its own row in a layout.
 */
export function ComparisonTable({ products, groups }: ComparisonTableProps) {
  const cols = products.length + 1;
  return (
    <table className="gw-table">
      <thead>
        <tr>
          <th className="gw-table__th gw-table__th--cap">Capability</th>
          {products.map((p, i) => (
            <th
              key={p}
              className={`gw-table__th gw-table__th--product${
                i > 0 ? " gw-table__th--alt" : ""
              }`}
            >
              {p}
            </th>
          ))}
        </tr>
      </thead>
      {groups.map((group) => (
        <tbody key={group.title}>
          <tr>
            <th className="gw-table__group" colSpan={cols}>
              {group.title}
            </th>
          </tr>
          {group.rows.map((row) => (
            <tr key={row.capability}>
              <th scope="row" className="gw-table__cap">
                {row.capability}
                {row.detail ? (
                  <span className="gw-table__detail">{row.detail}</span>
                ) : null}
              </th>
              {row.values.map((value, i) => (
                <Value key={i} value={value} />
              ))}
            </tr>
          ))}
        </tbody>
      ))}
    </table>
  );
}
