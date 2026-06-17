"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useLiteMode } from "@/hooks/use-lite-mode";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
};

/**
 * Number counter. On desktop it springs up once when scrolled into view.
 * On mobile/lite it renders the final value instantly — no spring rAF
 * loop and no count-up width shift (avoids CLS + JS work on load).
 */
export function Counter({ value, prefix = "", suffix = "", decimals, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const lite = useLiteMode();
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1600, bounce: 0 });

  const dp = decimals ?? (Number.isInteger(value) ? 0 : 1);
  const formatted = `${prefix}${value.toLocaleString("en-US", {
    minimumFractionDigits: dp,
    maximumFractionDigits: dp,
  })}${suffix}`;

  useEffect(() => {
    if (lite) return;
    if (inView) mv.set(value);
  }, [lite, inView, value, mv]);

  useEffect(() => {
    if (lite) return;
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${latest.toLocaleString("en-US", {
          minimumFractionDigits: dp,
          maximumFractionDigits: dp,
        })}${suffix}`;
      }
    });
  }, [lite, spring, prefix, suffix, dp]);

  return (
    <span ref={ref} className={className}>
      {lite ? formatted : `${prefix}0${suffix}`}
    </span>
  );
}
