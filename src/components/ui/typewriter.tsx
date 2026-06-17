"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type TWSegment = { text: string; highlight?: boolean };

type Props = {
  segments: TWSegment[];
  speed?: number; // ms per character
  startDelay?: number; // ms before typing begins (desktop only)
  className?: string;
  highlightClass?: string;
  cursorClass?: string;
};

/**
 * Typewriter — but content-first.
 *
 * On touch devices and reduced-motion (and during SSR / first paint) the
 * FULL headline renders immediately, so the user sees it instantly.
 * Only on desktop (pointer) do we run the character-by-character type-in,
 * which is hidden behind the short preloader so there is no flash.
 */
export function Typewriter({
  segments,
  speed = 45,
  startDelay = 700,
  className,
  highlightClass = "text-kiln-grad",
  cursorClass = "bg-kiln",
}: Props) {
  const words = useMemo(() => {
    const out: { text: string; highlight: boolean }[] = [];
    for (const seg of segments) {
      const parts = seg.text.split(/(\s+)/).filter((p) => p.length > 0);
      for (const p of parts) {
        if (/^\s+$/.test(p)) out.push({ text: " ", highlight: false });
        else out.push({ text: p, highlight: !!seg.highlight });
      }
    }
    return out;
  }, [segments]);

  const total = useMemo(() => words.reduce((n, w) => n + w.text.length, 0), [words]);
  const [typing, setTyping] = useState(false); // false → show full text
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch =
      window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    if (reduce || touch) return; // keep full text — instant

    setTyping(true);
    let i = 0;
    let inner: ReturnType<typeof setTimeout>;
    const step = () => {
      i += 1;
      setCount(i);
      if (i < total) inner = setTimeout(step, speed);
    };
    const start = setTimeout(step, startDelay);
    return () => {
      clearTimeout(start);
      clearTimeout(inner);
    };
  }, [total, speed, startDelay]);

  const visibleCount = typing ? count : total;
  const done = visibleCount >= total;

  const Cursor = (
    <motion.span
      aria-hidden
      className={cn("ml-0.5 inline-block w-[0.055em] translate-y-[0.08em] self-center rounded-full", cursorClass)}
      style={{ height: "0.82em" }}
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ repeat: Infinity, duration: 1, times: [0, 0.5, 0.5, 1], ease: "linear" }}
    />
  );

  let gi = 0;
  return (
    <span className={cn("inline", className)} aria-label={words.map((w) => w.text).join("")}>
      {words.map((word, wi) => {
        if (word.text === " ") {
          const idx = gi;
          gi += 1;
          return (
            <Fragment key={wi}>
              <span className={idx < visibleCount ? undefined : "opacity-0"}> </span>
              {!done && idx + 1 === visibleCount && Cursor}
            </Fragment>
          );
        }
        const chars = [...word.text];
        return (
          <span key={wi} className="inline-block whitespace-pre">
            {chars.map((c, ci) => {
              const idx = gi;
              gi += 1;
              return (
                <Fragment key={ci}>
                  <span className={cn(word.highlight && highlightClass, idx < visibleCount ? "opacity-100" : "opacity-0")}>
                    {c}
                  </span>
                  {!done && idx + 1 === visibleCount && Cursor}
                </Fragment>
              );
            })}
          </span>
        );
      })}
      {done && Cursor}
    </span>
  );
}
