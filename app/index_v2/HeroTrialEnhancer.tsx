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

    return () => {
      input.removeEventListener("input", sync);
      btn.removeEventListener("click", sync);
    };
  }, []);

  return null;
}
