"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { GLOBE_MARKERS } from "@/lib/data";

/**
 * Lightweight WebGL globe (cobe, ~5KB). Light-theme palette with brand
 * navy markers. Auto-rotates; pauses rotation for reduced-motion users.
 */
export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let phi = 0;
    let width = 0;

    const onResize = () => {
      width = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 4.2,
      baseColor: [0.93, 0.95, 0.97],
      markerColor: [0.105, 0.227, 0.42], // navy
      glowColor: [0.97, 0.98, 0.99],
      markers: GLOBE_MARKERS,
      onRender: (state) => {
        if (!reduce) phi += 0.0042;
        state.phi = phi;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
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
