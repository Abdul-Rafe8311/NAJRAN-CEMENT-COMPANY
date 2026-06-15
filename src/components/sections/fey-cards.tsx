"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";

/**
 * Fey-style fan cards. A stacked deck of product cards that fans apart
 * on hover (or tap, for touch) to reveal a shifting gradient headline
 * behind them. Adapted to the light theme. Reduced-motion users get the
 * deck pre-fanned and static.
 */
const CARDS = [
  { short: "OPC", name: "Ordinary Portland", bars: [40, 60, 50, 75, 65] },
  { short: "SRC", name: "Sulphate Resistant", bars: [55, 45, 70, 60, 80] },
  { short: "PPC", name: "Pozzolanic", bars: [35, 55, 65, 50, 72] },
  { short: "Lyasah", name: "Plastering", bars: [50, 65, 45, 70, 58] },
  { short: "Turbo", name: "Eco-Friendly", bars: [45, 70, 60, 82, 74] },
];

const center = (CARDS.length - 1) / 2;

const cardVariants: Variants = {
  closed: (i: number) => ({
    x: (i - center) * 12,
    rotate: (i - center) * 2,
    y: Math.abs(i - center) * 2,
  }),
  open: (i: number) => ({
    x: (i - center) * 132,
    rotate: (i - center) * 7,
    y: Math.abs(i - center) * 10,
  }),
};

export function FeyCards() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative overflow-hidden border-t border-line bg-coal py-28 md:py-40">
      <div className="container-page">
        <Reveal className="mx-auto max-w-xl text-center">
          <span className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.22em] text-muted">
            <span className="h-px w-8 bg-kiln" />
            Our Range
          </span>
        </Reveal>

        {/* Stage */}
        <div
          className="relative mx-auto mt-16 flex h-[420px] max-w-4xl items-center justify-center"
          style={{ perspective: 1400 }}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onClick={() => setOpen((v) => !v)}
        >
          {/* Headline revealed behind the deck */}
          <h2 className="font-display pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 text-center text-[clamp(2rem,6vw,4.5rem)] font-semibold leading-[1.02]">
            <span className="text-grad-anim">Built to endure.</span>
            <br />
            <span className="text-bone">Made for the Kingdom.</span>
          </h2>

          {/* Fanning deck */}
          <div className="relative" style={{ transformStyle: "preserve-3d" }}>
            {CARDS.map((c, i) => (
              <motion.article
                key={c.short}
                custom={i}
                variants={cardVariants}
                animate={open ? "open" : "closed"}
                initial="closed"
                transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.7 }}
                style={{ zIndex: CARDS.length - Math.abs(i - center), transformOrigin: "bottom center" }}
                className="absolute left-1/2 top-1/2 -ml-[88px] -mt-[124px] h-[248px] w-[176px] overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_60px_-24px_rgba(16,24,40,0.45)]"
              >
                <div className="flex items-center justify-between border-b border-line px-4 py-3">
                  <span className="font-display text-sm font-semibold tracking-tight text-kiln">
                    {c.short}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-gradient-to-br from-kiln to-ember" />
                </div>
                <div className="px-4 py-4">
                  <div className="text-[11px] font-medium text-muted">{c.name}</div>
                  <div className="mt-5 flex h-20 items-end gap-1.5">
                    {c.bars.map((h, bi) => (
                      <div
                        key={bi}
                        className="flex-1 rounded-t bg-gradient-to-t from-kiln/25 to-ember/60"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="mt-5 h-px w-full bg-line" />
                  <div className="mt-3 text-[10px] uppercase tracking-wider text-muted">
                    Cement grade
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <Reveal className="mt-10 text-center">
          <p className="text-sm text-muted">Hover or tap to fan the deck</p>
        </Reveal>
      </div>
    </section>
  );
}
