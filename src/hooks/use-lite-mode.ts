"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the device should run a lighter experience:
 * touch devices (phones/tablets) and users who prefer reduced motion.
 * In lite mode we skip decorative canvas particle fields and continuous
 * background animations — content stays, expensive motion does not.
 *
 * SSR renders the full (non-lite) markup; we flip to lite after mount,
 * so there is no hydration mismatch and no impact on first paint content.
 */
export function useLiteMode() {
  const [lite, setLite] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;
    setLite(reduce || touch);
  }, []);
  return lite;
}
