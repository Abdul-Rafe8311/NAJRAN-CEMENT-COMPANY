"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { Slide } from "@/lib/data";
import { ReviewBadge } from "./review-badge";
import { cn } from "@/lib/utils";

/**
 * Full-page image slideshow. Navigate with ← / → keys, the arrows, or
 * the dots; autoplays every 6s. Slides without a `src` render a clearly
 * marked placeholder until the client supplies photography.
 */
export function ImagesSlider({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback(
    (n: number) => {
      setDir(n);
      setI((p) => (p + n + slides.length) % slides.length);
    },
    [slides.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [go]);

  const s = slides[i];

  return (
    <div className="relative h-[78vh] min-h-[520px] w-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-coal shadow-soft">
      <AnimatePresence mode="popLayout" custom={dir}>
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {s.src ? (
            <Image src={s.src} alt={s.title} fill priority className="object-cover" sizes="100vw" />
          ) : (
            <div className="grid h-full w-full place-items-center bg-[linear-gradient(135deg,#e9edf2_0%,#dfe5ec_50%,#cdd6e0_100%)]">
              <div className="text-center">
                <ReviewBadge />
                <p className="mt-3 font-display text-lg text-[#5b7a99]">Company photo — pending</p>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-black/10" />
        </motion.div>
      </AnimatePresence>

      {/* Caption */}
      <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
        <motion.div key={`cap-${i}`} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15, duration: 0.6 }}>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/70">
            {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <h3 className="font-display mt-2 text-3xl font-semibold text-white md:text-4xl">{s.title}</h3>
          {s.caption && <p className="mt-2 max-w-md text-sm text-white/80">{s.caption}</p>}
        </motion.div>
      </div>

      {/* Arrows */}
      <button
        aria-label="Previous"
        onClick={() => go(-1)}
        className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
      >
        <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <button
        aria-label="Next"
        onClick={() => go(1)}
        className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
      >
        <svg width="16" height="16" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 right-8 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => { setDir(idx > i ? 1 : -1); setI(idx); }}
            className={cn(
              "h-1.5 rounded-full bg-white/50 transition-all",
              idx === i ? "w-7 bg-white" : "w-1.5 hover:bg-white/80"
            )}
          />
        ))}
      </div>
    </div>
  );
}
