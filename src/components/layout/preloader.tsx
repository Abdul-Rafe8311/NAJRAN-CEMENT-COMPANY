"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { COMPANY } from "@/lib/data";

/** Cinematic loading sequence — counts to 100, then lifts away. */
export function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1500;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#05080f] text-white"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.83, 0, 0.17, 1] }}
        >
          <motion.div
            className="font-display text-sm uppercase tracking-[0.4em] text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {COMPANY.name}
          </motion.div>

          <div className="relative mt-8 h-px w-56 overflow-hidden bg-white/10">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#f5c56b] to-[#ff7a2d]"
              animate={{ width: `${count}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          <div className="font-display mt-6 text-7xl font-semibold tabular-nums tracking-tight text-white">
            {count}
            <span className="text-[#f5c56b]">%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
