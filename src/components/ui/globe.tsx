"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { GLOBE_MARKERS } from "@/lib/data";

/**
 * Lightweight WebGL globe (cobe). Light-theme palette with brand navy
 * markers. The render loop is created only while the globe is on screen
 * and destroyed when it scrolls away — so it never steals main-thread
 * time (and never jankifies scrolling) elsewhere on the page.
 */
export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let phi = 0;
    let width = 0;

    const onResize = () => {
      width = canvas.offsetWidth;
    };

    const start = () => {
      if (globe) return;
      onResize();
      globe = createGlobe(canvas, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: 1.4,
        mapSamples: 14000,
        mapBrightness: 5.5,
        baseColor: [0.16, 0.21, 0.32],
        markerColor: [0.96, 0.77, 0.42],
        glowColor: [0.12, 0.16, 0.26],
        markers: GLOBE_MARKERS,
        onRender: (state) => {
          if (!reduce) phi += 0.0042;
          state.phi = phi;
          state.width = width * 2;
          state.height = width * 2;
        },
      });
    };

    const stop = () => {
      globe?.destroy();
      globe = null;
    };

    window.addEventListener("resize", onResize);
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "200px" }
    );
    io.observe(canvas);

    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
      stop();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", aspectRatio: "1", maxWidth: 560, contain: "layout paint size" }}
      aria-label="Globe showing Najran Cement's regional reach"
    />
  );
}
