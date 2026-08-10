"use client";

/**
 * Mounts the vendor-management animation into the placeholder that page.tsx
 * emits inside PAGE_HTML, on the same terms as ChecklistAnimationMount:
 * next/dynamic puts VendorAnimation in its own chunk, and that chunk is only
 * requested once the placeholder comes within 600px of the viewport — so a
 * visitor who never scrolls that far never downloads it.
 *
 * Renders nothing until then.
 */

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const VendorAnimation = dynamic(() => import("./VendorAnimation"), {
  ssr: false,
});

export default function VendorAnimationMount() {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = document.getElementById("gw-vendor-anim");
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
  return createPortal(<VendorAnimation />, host);
}
