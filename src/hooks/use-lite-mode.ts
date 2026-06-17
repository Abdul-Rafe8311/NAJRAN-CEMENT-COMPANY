"use client";

import { useEffect, useState } from "react";

/**
 * Lite mode = minimal animation. Active on:
 *   - any screen below 1024px (phones + tablets)
 *   - touch devices
 *   - users who prefer reduced motion
 *
 * In lite mode we strip particle systems, scroll-linked transforms,
 * pinned scroll stories, word/char text animations, the WebGL globe,
 * infinite/blur/glow animations — keeping only instant content and
 * simple fades. Performance over visual effects on mobile.
 *
 * SSR renders the full (non-lite) markup; we flip after mount, so there
 * is no hydration mismatch.
 */
export function useLiteMode() {
  const [lite, setLite] = useState(false);
  useEffect(() => {
    const compute = () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const touch =
        window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;
      const small = window.innerWidth < 1024;
      setLite(reduce || touch || small);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return lite;
}
