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
 * Renders nothing. The <video> itself is server-rendered inside PAGE_HTML.
 */

import { useEffect } from "react";

// how much of the video has to be showing, measured down from its top edge
const REVEAL = 1 / 3;

export default function TimelineVideoTrigger() {
  useEffect(() => {
    const video = document.querySelector<HTMLVideoElement>("video[data-scroll-play]");
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let started = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduceMotion.matches) {
          video.pause();
          return;
        }
        if (!entry.isIntersecting) {
          video.pause();
          return;
        }

        // the viewport's bottom edge has reached a third of the way down the
        // video. Derived from the rect rather than an intersectionRatio
        // threshold, which a video taller than the viewport could never hit.
        if (!started) {
          const r = entry.boundingClientRect;
          if (r.top + r.height * REVEAL > window.innerHeight) return;
          started = true;
          video.currentTime = 0;
        }
        // play() rejects if the browser declines (a muted inline video is
        // normally allowed, but low-power mode can still refuse) — nothing to
        // recover, the poster simply stays put.
        void video.play().catch(() => {});
      },
      // enough steps that the check re-runs as the video scrolls up, not just
      // when it first touches the edge
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );
    io.observe(video);

    return () => io.disconnect();
  }, []);

  return null;
}
