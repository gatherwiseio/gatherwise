"use client";

/**
 * Holds the timeline screencast on its poster frame until the top third of the
 * video has scrolled into view, then plays it from the start and loops. The
 * markup carries no `autoplay`, so this is the only thing that starts it —
 * a visitor who never scrolls that far never sees it move, and never pays for
 * decoding it.
 *
 * Off screen it pauses (the browser already handles the hidden-tab case for
 * media). Coming back resumes rather than restarting; only the first play is
 * aligned to the beginning. Under prefers-reduced-motion it never starts, so
 * the poster frame is what a visitor gets — this component owns that decision
 * now that the markup carries no autoplay of its own.
 *
 * The scroll gate is watchActivation, shared with the other motion pieces, so
 * a tab left idle and returned to re-evaluates the geometry rather than
 * replaying a stale observer entry — see scrollActivation.ts.
 *
 * Renders nothing. The <video> itself is server-rendered inside PAGE_HTML.
 */

import { useEffect } from "react";

import { watchActivation } from "./scrollActivation";

// how much of the video has to be showing, measured down from its top edge
const REVEAL = 1 / 3;

export default function TimelineVideoTrigger() {
  useEffect(() => {
    const video = document.querySelector<HTMLVideoElement>(
      "video[data-scroll-play]",
    );
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let started = false;

    return watchActivation(
      video,
      (active) => {
        if (!active || reduceMotion.matches) {
          video.pause();
          return;
        }
        if (!started) {
          started = true;
          video.currentTime = 0;
        }
        // play() rejects if the browser declines (a muted inline video is
        // normally allowed, but low-power mode can still refuse) — nothing to
        // recover, the poster simply stays put.
        void video.play().catch(() => {});
      },
      REVEAL,
    );
  }, []);

  return null;
}
