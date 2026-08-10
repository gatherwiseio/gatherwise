"use client";

import { useEffect } from "react";

/**
 * Behavior for the "From planners" reviews section, which is emitted
 * server-side via dangerouslySetInnerHTML in page.tsx. Renders nothing.
 *
 * Two jobs:
 *  - the horizontal carousel: reveal the prev/next arrows (hidden in the
 *    markup so they never show without JS) and keep them enabled/disabled
 *    against the track's scroll position. The track itself scrolls and snaps
 *    with plain CSS, so touch and trackpad work regardless.
 *  - "Read the full review": open the matching <dialog> as a modal, and lock
 *    the page behind it (showModal does not do that on its own).
 */
export default function ReviewsCarousel() {
  useEffect(() => {
    const track = document.querySelector<HTMLElement>("[data-review-track]");
    const cleanups: Array<() => void> = [];

    if (track) {
      const nav = document.querySelector<HTMLElement>("[data-review-nav]");
      const prev = document.querySelector<HTMLButtonElement>(
        "[data-review-prev]",
      );
      const next = document.querySelector<HTMLButtonElement>(
        "[data-review-next]",
      );

      // Only worth showing arrows when there is somewhere to scroll to.
      const overflows = () => track.scrollWidth - track.clientWidth > 1;

      const sync = () => {
        if (nav) nav.hidden = !overflows();
        const max = track.scrollWidth - track.clientWidth;
        if (prev) prev.disabled = track.scrollLeft <= 1;
        if (next) next.disabled = track.scrollLeft >= max - 1;
      };

      // One card + gap per press, measured off the first card so it stays
      // right if the breakpoint changes the card width.
      const step = () => {
        const card = track.firstElementChild as HTMLElement | null;
        if (!card) return track.clientWidth;
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        return card.getBoundingClientRect().width + gap;
      };

      const goPrev = () => track.scrollBy({ left: -step() });
      const goNext = () => track.scrollBy({ left: step() });

      prev?.addEventListener("click", goPrev);
      next?.addEventListener("click", goNext);
      track.addEventListener("scroll", sync, { passive: true });

      const ro = new ResizeObserver(sync);
      ro.observe(track);
      sync();

      cleanups.push(() => {
        prev?.removeEventListener("click", goPrev);
        next?.removeEventListener("click", goNext);
        track.removeEventListener("scroll", sync);
        ro.disconnect();
      });
    }

    // --- full-review dialogs -------------------------------------------------
    const openers = document.querySelectorAll<HTMLButtonElement>(
      "[data-review-open]",
    );

    openers.forEach((btn) => {
      const id = btn.dataset.reviewOpen;
      const dialog = id
        ? document.getElementById(id)
        : null;
      if (!(dialog instanceof HTMLDialogElement)) return;

      const closer = dialog.querySelector<HTMLButtonElement>(
        "[data-review-close]",
      );
      const panel = dialog.querySelector<HTMLElement>(".gw-modal__panel");

      const open = () => {
        dialog.showModal();
        document.body.style.overflow = "hidden";
      };
      const close = () => dialog.close();

      // Clicking the backdrop closes: the click lands on the <dialog> itself
      // only when it falls outside the panel.
      const onDialogClick = (e: MouseEvent) => {
        if (panel && !panel.contains(e.target as Node)) close();
      };
      const onClose = () => {
        document.body.style.overflow = "";
        btn.focus();
      };

      btn.addEventListener("click", open);
      closer?.addEventListener("click", close);
      dialog.addEventListener("click", onDialogClick);
      dialog.addEventListener("close", onClose);

      cleanups.push(() => {
        btn.removeEventListener("click", open);
        closer?.removeEventListener("click", close);
        dialog.removeEventListener("click", onDialogClick);
        dialog.removeEventListener("close", onClose);
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
      document.body.style.overflow = "";
    };
  }, []);

  return null;
}
