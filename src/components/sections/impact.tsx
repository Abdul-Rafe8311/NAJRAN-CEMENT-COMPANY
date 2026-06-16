"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IMPACT_STATS } from "@/lib/data";
import { Counter } from "@/components/ui/counter";
import { TextReveal } from "@/components/ui/text-reveal";
import { Reveal } from "@/components/ui/reveal";

export function Impact() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glow = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section
      id="impact"
      ref={ref}
      className="relative overflow-hidden border-t border-line bg-gradient-to-b from-white to-[#eef3fb] py-28 md:py-40"
    >
      <motion.div
        style={{ y: glow }}
        className="pointer-events-none absolute -right-[5%] top-1/4 h-[50vh] w-[50vh] rounded-full bg-kiln/[0.07] blur-[130px]"
      />
      <div className="pointer-events-none absolute -left-[5%] bottom-0 h-[40vh] w-[40vh] rounded-full bg-ember/[0.07] blur-[120px]" />

      <div className="container-page relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        {/* Editorial heading */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.22em] text-muted">
              <span className="h-px w-8 bg-kiln" />
              Company Impact
            </span>
          </Reveal>
          <h2 className="font-display mt-5 text-h2 font-semibold leading-[1.04] text-balance">
            <TextReveal text="Scale you can build on." />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-sm leading-relaxed text-ash">
              Two decades of disciplined production have made Najran Cement one of the
              southern region's most dependable suppliers.
            </p>
          </Reveal>
        </div>

        {/* Stat ledger */}
        <div className="border-t border-line">
          {IMPACT_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-baseline justify-between gap-6 border-b border-line py-7 transition-colors hover:border-kiln/40"
            >
              <div className="font-display text-[clamp(2.6rem,6vw,4.6rem)] font-semibold leading-none tracking-tight">
                <span className="bg-gradient-to-br from-kiln to-ember bg-clip-text text-transparent transition-all duration-500 group-hover:from-ember group-hover:to-kiln">
                  <Counter value={s.value} suffix={s.suffix} prefix={s.prefix} />
                </span>
              </div>
              <div className="max-w-[42%] text-right">
                <div className="text-sm font-medium text-bone md:text-base">{s.label}</div>
                <div className="mt-0.5 text-xs text-muted">{s.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
