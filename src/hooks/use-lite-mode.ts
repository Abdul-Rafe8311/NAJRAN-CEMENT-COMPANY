"use client";

import { useEffect, useState } from "react";

/**
 * Lite mode = minimal animation. Active on screens < 1024px (phones +
 * tablets), touch devices, and reduced-motion. Strips particles,
 * scroll-linked transforms, pinned scroll stories, word/char text
 * animations, the WebGL globe, and infinite/blur/glow loops — keeping
 * only instant content + simple fades. Performance over effects.
 *
 * IMPORTANT: this is a *shared singleton*. The hook is used by ~100
 * components per page; instead of each one registering its own resize
 * listener + matchMedia, there is ONE listener for the whole app and
 * every hook just subscribes to it. SSR renders the full (non-lite)
 * markup; we flip after mount with no hydration mismatch.
 */
let current = false;
let initialized = false;
const subscribers = new Set<(v: boolean) => void>();

function compute(): boolean {
  if (typeof window === "undefined") return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touch =
    window.matchMedia("(pointer: coarse)").matches ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0;
  const small = window.innerWidth < 1024;
  return reduce || touch || small;
}

function ensureInit() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  current = compute();
  let raf = 0;
  const onResize = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const next = compute();
      if (next !== current) {
        current = next;
        subscribers.forEach((fn) => fn(next));
      }
    });
  };
  window.addEventListener("resize", onResize, { passive: true });
}

export function useLiteMode() {
  const [lite, setLite] = useState(false);
  useEffect(() => {
    ensureInit();
    setLite(current);
    subscribers.add(setLite);
    return () => {
      subscribers.delete(setLite);
    };
  }, []);
  return lite;
}
