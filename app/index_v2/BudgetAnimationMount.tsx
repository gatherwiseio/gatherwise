"use client";

/**
 * Mounts the budgets animation into the placeholder that page.tsx emits inside
 * PAGE_HTML, on the same terms as the other two: next/dynamic puts
 * BudgetAnimation in its own chunk, requested only once the placeholder comes
 * within 600px of the viewport.
 *
 * Renders nothing until then.
 */

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const BudgetAnimation = dynamic(() => import("./BudgetAnimation"), {
  ssr: false,
});

export default function BudgetAnimationMount() {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = document.getElementById("gw-budget-anim");
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
  return createPortal(<BudgetAnimation />, host);
}
