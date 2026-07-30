import * as React from "react";

export interface CTASectionProps {
  /** Large serif headline. */
  title: string;
  /** Supporting line beneath the title. */
  text: string;
  /** Action buttons — typically a `<Button variant="gold">` plus a
   *  `<Button variant="ghost">`. */
  children: React.ReactNode;
  /** Fine print under the actions ("Cancel anytime"). */
  fine?: string;
}

/**
 * Full-bleed dark closing call-to-action band: a centered serif headline,
 * a supporting line, an action row (pass `Button`s as children), and optional
 * fine print.
 */
export function CTASection({ title, text, children, fine }: CTASectionProps) {
  return (
    <section className="gw-cta">
      <div className="gw-cta__inner">
        <h2 className="gw-cta__title">{title}</h2>
        <p className="gw-cta__text">{text}</p>
        <div className="gw-cta__actions">{children}</div>
        {fine ? <p className="gw-cta__fine">{fine}</p> : null}
      </div>
    </section>
  );
}
