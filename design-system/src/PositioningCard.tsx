import * as React from "react";
import { Eyebrow } from "./Eyebrow";

export interface PositioningCardProps {
  /** Small label above the title (usually a product name). */
  eyebrow: string;
  /** Card heading. */
  title: string;
  /** Supporting paragraph. */
  body: string;
  /** Bulleted points. */
  items: string[];
  /** `alt` mutes the top border + bullets — use for the "other" option so the
   *  primary card (default) reads as the recommended one. */
  tone?: "primary" | "alt";
}

/**
 * Side-by-side positioning card: an eyebrow, a serif title, a paragraph, and a
 * checkmark/dot bullet list. Render two together (one default, one `alt`) to
 * frame an "either/or" choice honestly.
 */
export function PositioningCard({
  eyebrow,
  title,
  body,
  items,
  tone = "primary",
}: PositioningCardProps) {
  const alt = tone === "alt";
  return (
    <div className={`gw-poscard${alt ? " gw-poscard--alt" : ""}`}>
      <Eyebrow muted={alt}>{eyebrow}</Eyebrow>
      <h3 className="gw-poscard__title">{title}</h3>
      <p className="gw-poscard__text">{body}</p>
      <ul className="gw-poscard__list">
        {items.map((item) => (
          <li
            key={item}
            className={`gw-poscard__item${alt ? " gw-poscard__item--alt" : ""}`}
          >
            <span
              className={`gw-poscard__bullet${
                alt ? " gw-poscard__bullet--alt" : ""
              }`}
              aria-hidden="true"
            >
              {alt ? "•" : "✓"}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
