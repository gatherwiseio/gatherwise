"use client";

/**
 * Arms the "Replace the whole stack" loop, which index_v2.css holds paused at
 * frame 0 until this adds .is-playing. Two jobs:
 *
 *  1. Start it only once the stage's top half is on screen, so a visitor always
 *     catches the sequence from the first tab rather than somewhere in the
 *     middle of the twelve.
 *  2. Park it again whenever the stage is fully off screen or the tab is
 *     hidden — same cost control as ChecklistAnimation. Coming back resumes
 *     where it left off; only the very first start is aligned to frame 0.
 *
 * Both decisions come from watchActivation, which re-reads the geometry live
 * instead of trusting a cached observer entry. That matters more here than
 * anywhere else on the page: frame 0 of this loop is a blank stage, so the
 * failure mode of a gate that never re-evaluates is not a still image but an
 * empty box where the animation should be.
 *
 * Renders nothing. The markup itself is server-rendered inside PAGE_HTML.
 */

import { useEffect } from "react";

import { watchActivation } from "./scrollActivation";

export default function StackAnimationTrigger() {
  useEffect(() => {
    const box = document.querySelector<HTMLElement>(".gw-stack");
    if (!box) return;

    return watchActivation(box, (active) => {
      box.classList.toggle("is-playing", active);
    });
  }, []);

  return null;
}
