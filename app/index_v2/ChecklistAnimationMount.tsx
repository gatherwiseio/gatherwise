"use client";

/**
 * Mounts the client-checklist animation into the placeholder that page.tsx
 * emits inside PAGE_HTML, and keeps it off the critical path twice over:
 *
 *  1. next/dynamic puts ChecklistAnimation in its own chunk, and that chunk is
 *     only requested once the placeholder comes within 600px of the viewport —
 *     so a visitor who never scrolls that far never downloads it, and one who
 *     does has it by the time it is on screen.
 *  2. The three avatar JPEGs (~32KB total) are children of that chunk, so they
 *     load on the same trigger rather than with the page.
 *
 * Renders nothing until then.
 */

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ChecklistAnimation = dynamic(() => import("./ChecklistAnimation"), {
  ssr: false,
});

export default function ChecklistAnimationMount() {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = document.getElementById("gw-checklist-anim");
    if (!el) return;
    setHost(el);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!host || !near) return null;
  return createPortal(<ChecklistAnimation />, host);
}
