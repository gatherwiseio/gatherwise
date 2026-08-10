"use client";

/**
 * Arms the "Replace the whole stack" loop, which index_v2.css holds paused at
 * frame 0 until this adds .is-playing. Two jobs:
 *
 *  1. Start it only once the stage's top half is on screen, so a visitor always
 *     catches the sequence from the first tab rather than somewhere in the
 *     middle of the ten.
 *  2. Park it again whenever the stage is fully off screen or the tab is
 *     hidden — same cost control as ChecklistAnimation. Coming back resumes
 *     where it left off; only the very first start is aligned to frame 0.
 *
 * Renders nothing. The markup itself is server-rendered inside PAGE_HTML.
 */

import { useEffect } from "react";

export default function StackAnimationTrigger() {
  useEffect(() => {
    const box = document.querySelector<HTMLElement>(".gw-stack");
    if (!box) return;

    let started = false;
    let onScreen = false;

    const sync = () => {
      box.classList.toggle(
        "is-playing",
        started && onScreen && !document.hidden,
      );
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;

        // "top half in view" — the viewport's bottom edge has reached the
        // stage's midpoint. Derived from the rect rather than a ratio
        // threshold, which a stage taller than the viewport could never hit.
        if (!started && onScreen) {
          const r = entry.boundingClientRect;
          started = r.top + r.height / 2 <= window.innerHeight;
        }
        sync();
      },
      // enough steps that the check re-runs as the stage scrolls up, not just
      // when it first touches the edge
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );
    io.observe(box);

    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return null;
}
