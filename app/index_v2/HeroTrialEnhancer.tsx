"use client";

import { useEffect } from "react";

// Base signup URL — keep in sync with SIGNUP in page.tsx.
const SIGNUP = "https://app.gatherwise.io/login?m=signup";

/**
 * Progressive enhancement for the hero email field: when the visitor types an
 * email and clicks the adjacent "Start free trial" button, carry that email
 * through to signup as an `email=` query param (URL-encoded). Renders nothing —
 * it just wires behavior onto the existing markup, which is emitted server-side
 * via dangerouslySetInnerHTML. Only this one button is affected; every other
 * signup CTA keeps its plain href.
 */
export default function HeroTrialEnhancer() {
  useEffect(() => {
    const input = document.getElementById(
      "hero-email",
    ) as HTMLInputElement | null;
    const btn = document.getElementById(
      "hero-trial-btn",
    ) as HTMLAnchorElement | null;
    if (!input || !btn) return;

    const sync = () => {
      const email = input.value.trim();
      btn.href = email
        ? `${SIGNUP}&email=${encodeURIComponent(email)}`
        : SIGNUP;
    };

    // Keep the href current as they type, and re-sync on click so the
    // navigation (which reads href after the handler) uses the latest value.
    input.addEventListener("input", sync);
    btn.addEventListener("click", sync);
    sync();

    // Sticky header: add a faint bottom border once the page is scrolled past
    // the top, so the header separates from the content beneath it. The same
    // listener closes the mobile menu — the panel is anchored to the header and
    // covers the top of the page, so leaving it hanging open while the content
    // slides underneath reads as a stuck overlay. Any scroll dismisses it,
    // which also covers tapping one of its own in-page anchors.
    const header = document.querySelector<HTMLElement>("header[data-nav]");
    const menu = document.querySelector<HTMLDetailsElement>("details.gwv2-menu");
    const syncHeader = () => {
      header?.classList.toggle("is-scrolled", window.scrollY > 0);
    };
    const onScroll = () => {
      syncHeader();
      if (menu?.open) menu.open = false;
    };
    // the border needs setting up front; the menu must only close on a real
    // scroll, so the initial sync deliberately skips it
    syncHeader();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      input.removeEventListener("input", sync);
      btn.removeEventListener("click", sync);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
