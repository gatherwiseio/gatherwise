import * as React from "react";

export type HeadingSize = "display" | "section" | "sub";

export interface HeadingProps {
  /** `display` = hero scale, `section` = section title, `sub` = card title.
   *  Defaults to `section`. */
  size?: HeadingSize;
  /** Heading level to render. Defaults to `h2`. */
  as?: "h1" | "h2" | "h3" | "h4";
  children: React.ReactNode;
  className?: string;
}

/**
 * Cormorant Garamond display heading. Compose emphasis inside it with
 * `<Heading.Accent>` (gold) and `<Heading.Quiet>` (muted, non-wrapping).
 */
export function Heading({
  size = "section",
  as: Tag = "h2",
  children,
  className,
}: HeadingProps) {
  const cls = `gw-heading gw-heading--${size}${
    className ? ` ${className}` : ""
  }`;
  return <Tag className={cls}>{children}</Tag>;
}

Heading.Accent = function HeadingAccent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <span className="gw-heading__accent">{children}</span>;
};

Heading.Quiet = function HeadingQuiet({
  children,
}: {
  children: React.ReactNode;
}) {
  return <span className="gw-heading__quiet">{children}</span>;
};
