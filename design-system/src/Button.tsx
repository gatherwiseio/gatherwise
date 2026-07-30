import * as React from "react";

export type ButtonVariant = "primary" | "large" | "gold" | "ghost" | "link";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. `primary`/`large` are dark ink fills, `gold` is the accent
   *  fill (use on dark backgrounds), `ghost` is an outline for dark backgrounds,
   *  `link` is an underlined inline text link. */
  variant?: ButtonVariant;
  /** Render as an anchor pointing here instead of a `<button>`. */
  href?: string;
  children: React.ReactNode;
}

/**
 * The system's call-to-action control. Renders an `<a>` when `href` is set,
 * otherwise a `<button>`. Pair a `primary`/`gold` action with a `link`/`ghost`
 * secondary action.
 */
export function Button({
  variant = "primary",
  href,
  children,
  className,
  ...rest
}: ButtonProps) {
  const cls = `gw-btn gw-btn--${variant}${className ? ` ${className}` : ""}`;
  if (href !== undefined) {
    const { type: _type, ...anchorRest } =
      rest as React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        type?: unknown;
      };
    return (
      <a className={cls} href={href} {...anchorRest}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
