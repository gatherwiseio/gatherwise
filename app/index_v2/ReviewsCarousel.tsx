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
    // One delegated listener on the document instead of one per button, so it
    // keeps working if the section's HTML is re-rendered (dev hot reload
    // replaces those nodes, which used to leave the buttons dead).
    let opener: HTMLElement | null = null;

    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target || !target.closest) return;

      const openBtn = target.closest<HTMLElement>("[data-review-open]");
      if (openBtn) {
        const dialog = document.getElementById(openBtn.dataset.reviewOpen ?? "");
        if (!(dialog instanceof HTMLDialogElement) || dialog.open) return;
        opener = openBtn;
        dialog.showModal();
        document.body.style.overflow = "hidden";
        return;
      }

      const dialog = target.closest<HTMLDialogElement>("dialog.gw-modal");
      if (!dialog) return;
      // Close button, or a click on the backdrop: that click lands on the
      // <dialog> itself only when it falls outside the panel.
      const panel = dialog.querySelector(".gw-modal__panel");
      if (target.closest("[data-review-close]") || (panel && !panel.contains(target))) {
        dialog.close();
      }
    };

    // "close" doesn't bubble, so listen in the capture phase. Also covers Esc.
    const onClose = (e: Event) => {
      if (!(e.target instanceof HTMLDialogElement) || !e.target.matches(".gw-modal")) return;
      document.body.style.overflow = "";
      opener?.focus();
      opener = null;
    };

    document.addEventListener("click", onClick);
    document.addEventListener("close", onClose, true);
    cleanups.push(() => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("close", onClose, true);
    });

    return () => {
      cleanups.forEach((fn) => fn());
      document.body.style.overflow = "";
    };
  }, []);

  return null;
}
