"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { APPLICATIONS } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

/**
 * "Where our cement performs" — interactive showcase.
 * Hovering/selecting a row swaps a large animated preview panel.
 * Framed as product applications (accurate) rather than specific
 * contract claims; replace with named case studies when approved.
 */
export function Applications() {
  const [active, setActive] = useState(0);

  return (
    <section id="projects" className="relative border-t border-white/10 py-28 text-white md:py-36">
      <div className="container-page">
        <SectionHeading
          tone="dark"
          eyebrow="Applications"
          title="Where our cement performs."
          intro="Each product is matched to the structures it serves best. Explore how Najran Cement holds up across the Kingdom's most demanding environments."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* List */}
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {APPLICATIONS.map((a, i) => (
              <li key={a.title}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group flex w-full items-center justify-between gap-4 py-6 text-left"
                >
                  <div className="flex items-baseline gap-5">
                    <span
                      className={cn(
                        "font-display text-sm tabular-nums transition-colors",
                        active === i ? "text-[#f5c56b]" : "text-white/40"
                      )}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={cn(
                        "font-display text-xl font-semibold transition-colors md:text-2xl",
                        active === i ? "text-white" : "text-white/50 group-hover:text-white"
                      )}
                    >
                      {a.title}
                    </span>
                  </div>
                  <span className="text-xs uppercase tracking-wider text-white/40">{a.product}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* Preview */}
          <div className="relative min-h-[340px] overflow-hidden rounded-[var(--radius-card)] border border-white/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "absolute inset-0 flex flex-col justify-end bg-gradient-to-br p-8 md:p-10",
                  APPLICATIONS[active].hue
                )}
              >
                <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-50" />
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="relative font-display text-xs uppercase tracking-[0.2em] text-[#f5c56b]"
                >
                  {APPLICATIONS[active].product}
                </motion.span>
                <motion.h3
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="relative font-display mt-3 text-3xl font-semibold text-white md:text-4xl"
                >
                  {APPLICATIONS[active].title}
                </motion.h3>
                <motion.p
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative mt-4 max-w-md text-white/70"
                >
                  {APPLICATIONS[active].desc}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
