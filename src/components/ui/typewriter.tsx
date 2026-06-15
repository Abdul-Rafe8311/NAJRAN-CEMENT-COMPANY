"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type TWSegment = { text: string; highlight?: boolean };

type Props = {
  segments: TWSegment[];
  speed?: number; // ms per character
  startDelay?: number; // ms before typing begins
  className?: string;
};

/**
 * Aceternity-style typewriter. Types the headline character-by-character
 * with a blinking cursor; highlighted segments render in the brand
 * gradient. Hidden characters keep their space (opacity-0) so the layout
 * never reflows. Whole words are kept on one line (no mid-word breaks).
 * Reduced-motion users see the full text immediately.
 */
export function Typewriter({ segments, speed = 55, startDelay = 1700, className }: Props) {
  // Build word units, preserving each word's highlight flag.
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
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(total);
      setDone(true);
      return;
    }
    let i = 0;
    let inner: ReturnType<typeof setTimeout>;
    const step = () => {
      i += 1;
      setCount(i);
      if (i < total) inner = setTimeout(step, speed);
      else setDone(true);
    };
    const start = setTimeout(step, startDelay);
    return () => {
      clearTimeout(start);
      clearTimeout(inner);
    };
  }, [total, speed, startDelay]);

  const Cursor = (
    <motion.span
      aria-hidden
      className="ml-0.5 inline-block w-[0.055em] translate-y-[0.08em] self-center rounded-full bg-kiln"
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
              <span className={idx < count ? undefined : "opacity-0"}> </span>
              {idx + 1 === count && !done && Cursor}
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
                  <span
                    className={cn(
                      word.highlight && "text-kiln-grad",
                      idx < count ? "opacity-100" : "opacity-0"
                    )}
                  >
                    {c}
                  </span>
                  {idx + 1 === count && !done && Cursor}
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
