"use client";

import { useEffect } from "react";

/**
 * Click-to-play for the hero marketing reel. The page ships only a poster and
 * a play button (emitted server-side via dangerouslySetInnerHTML); clicking it
 * replaces the button with the Vimeo player, autoplaying with sound. Keeping
 * Vimeo's player script off the initial load protects the hero's LCP. Renders
 * nothing.
 */
export default function HeroVideoEnhancer() {
  useEffect(() => {
    const wrap = document.getElementById("hero-reel");
    const play = wrap?.querySelector<HTMLButtonElement>(".gw-hero-reel__play");
    const id = wrap?.dataset.vimeoId;
    if (!wrap || !play || !id) return;

    const onClick = () => {
      const iframe = document.createElement("iframe");
      iframe.src = `https://player.vimeo.com/video/${id}?autoplay=1&badge=0&autopause=0&byline=0&portrait=0&title=0&dnt=1`;
      iframe.title = "Gatherwise overview";
      iframe.allow = "autoplay; fullscreen; picture-in-picture; encrypted-media";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.allowFullscreen = true;
      play.replaceWith(iframe);
      iframe.focus();
    };

    play.addEventListener("click", onClick, { once: true });
    return () => play.removeEventListener("click", onClick);
  }, []);

  return null;
}
