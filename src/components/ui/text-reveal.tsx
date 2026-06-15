"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
};

/** Word-by-word mask reveal — words rise from behind a clip line. */
export function TextReveal({ text, className, delay = 0, once = true }: Props) {
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
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * 0.045,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
