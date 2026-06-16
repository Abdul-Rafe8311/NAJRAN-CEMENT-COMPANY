"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SUSTAIN_POINTS, SUSTAIN_METRICS } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ReviewBadge } from "@/components/ui/review-badge";

export function Sustainability() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBlob = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      id="sustainability"
      ref={ref}
      className="relative overflow-hidden border-t border-white/10 py-28 text-white md:py-36"
    >
      {/* Living green-energy glow */}
      <motion.div
        style={{ y: yBlob }}
        className="pointer-events-none absolute right-[-10%] top-1/4 h-[50vh] w-[50vh] rounded-full bg-[#1f7a5a]/25 blur-[130px]"
      />

      <div className="container-page relative grid items-start gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            tone="dark"
            eyebrow="Sustainability"
            title="A lighter footprint, by design."
            intro="Cement is essential — and we are committed to making ours responsibly. Our approach focuses on reducing carbon intensity, reusing waste, and rethinking raw materials."
          />

          <div className="mt-10 space-y-px overflow-hidden rounded-[var(--radius-card)] border border-white/10">
            {SUSTAIN_POINTS.map((point, i) => (
              <Reveal key={i} delay={i * 0.08} className="flex items-start gap-4 bg-white/[0.03] p-5">
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#34d399]/15 text-[#34d399]">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2.5 6.5l2.5 2.5 4.5-5.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className="text-sm leading-relaxed text-white/60">{point}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Metric cards — flagged as pending real figures */}
        <div className="grid gap-5 sm:grid-cols-1 lg:mt-24">
          {SUSTAIN_METRICS.map((m, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="rounded-[var(--radius-card)] border border-white/10 bg-white/[0.03] p-7">
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl font-semibold text-[#34d399]">
                    {m.value > 0 ? `${m.value}${m.suffix ?? ""}` : "—"}
                  </span>
                  {m.review && <ReviewBadge />}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/60">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
