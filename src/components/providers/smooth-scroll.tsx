"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Lenis smooth scroll — DESKTOP ONLY.
 *
 * On touch devices (phones/tablets) we deliberately skip Lenis and use
 * native scrolling. Lenis's touch handling (syncTouch) hijacks the
 * browser's momentum scroll and was the cause of stuck/jittery mobile
 * scrolling. Native scroll on touch = smooth, reliable, accessible.
 *
 * Desktop keeps Lenis (wheel smoothing only) synced to the GSAP ticker.
 * Reduced-motion users always get native scrolling.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    // Native scrolling on touch, reduced-motion, and any screen < 1024px.
    if (prefersReduced || isTouch || window.innerWidth < 1024) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.12,
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false, // never intercept touch
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
