"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLiteMode } from "@/hooks/use-lite-mode";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
};

/**
 * Word-by-word mask reveal on desktop.
 * On mobile/lite: a single simple fade-up (no per-word animation) — cheap.
 */
export function TextReveal({ text, className, delay = 0, once = true }: Props) {
  const lite = useLiteMode();

  if (lite) {
    return (
      <motion.span
        className={cn("inline-block", className)}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once }}
        transition={{ duration: 0.35, ease: "easeOut", delay }}
      >
        {text}
      </motion.span>
    );
  }

  const words = text.split(" ");
  return (
    <span className={cn("inline-flex flex-wrap", className)}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-flex pb-[0.12em] mr-[0.26em]">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "115%" }}
            whileInView={{ y: 0 }}
            viewport={{ once }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.045 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
