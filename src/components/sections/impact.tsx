"use client";

import { IMPACT_STATS } from "@/lib/data";
import { Counter } from "@/components/ui/counter";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, Reveal } from "@/components/ui/reveal";

export function Impact() {
  return (
    <section id="impact" className="relative border-t border-line bg-gradient-to-b from-white to-[#f3f7fc] py-28 md:py-36">
      <div className="container-page">
        <SectionHeading
          eyebrow="Company Impact"
          title="Scale you can build on."
          intro="Two decades of disciplined production have made Najran Cement one of the southern region's most dependable suppliers. The numbers speak for themselves."
        />

        <RevealGroup className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line shadow-soft md:grid-cols-3">
          {IMPACT_STATS.map((s) => (
            <Reveal key={s.label} className="group relative bg-white p-7 md:p-9">
              <div className="absolute inset-0 bg-gradient-to-br from-kiln/0 to-kiln/0 transition-colors duration-500 group-hover:from-kiln/[0.06]" />
              <div className="relative">
                <div className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} prefix={s.prefix} />
                </div>
                <div className="mt-3 text-sm font-medium text-bone">{s.label}</div>
                <div className="mt-1 text-xs text-muted">{s.sub}</div>
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
