"use client";

import { Globe } from "@/components/ui/globe";
import { Counter } from "@/components/ui/counter";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function Reach() {
  return (
    <section id="reach" className="relative overflow-hidden border-t border-white/10 py-28 text-white md:py-36">
      <div className="pointer-events-none absolute right-[10%] top-1/2 h-[50vh] w-[50vh] -translate-y-1/2 rounded-full bg-[#1b3a6b]/30 blur-[140px]" />
      <div className="container-page relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            tone="dark"
            eyebrow="Global Reach"
            title="Supplying the Kingdom, built to travel further."
            intro="From our base in Najran, our cement reaches projects across the southern region — with a long-standing objective to supply the wider Kingdom and export beyond its borders."
          />

          <div className="mt-10 grid grid-cols-2 gap-6">
            <Reveal>
              <div>
                <div className="font-display bg-gradient-to-br from-[#f5c56b] to-[#ff7a2d] bg-clip-text text-4xl font-semibold tracking-tight text-transparent">
                  <Counter value={39} suffix="+" />
                </div>
                <div className="mt-1.5 text-sm text-white">Distribution centers</div>
                <div className="text-xs text-white/40">Across the region</div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <div className="font-display bg-gradient-to-br from-[#f5c56b] to-[#ff7a2d] bg-clip-text text-4xl font-semibold tracking-tight text-transparent">
                  <Counter value={46} suffix="M+" />
                </div>
                <div className="mt-1.5 text-sm text-white">Tonnes delivered</div>
                <div className="text-xs text-white/40">Cumulative to date</div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="flex justify-center">
          <Globe className="drop-shadow-[0_30px_80px_rgba(245,197,107,0.18)]" />
        </Reveal>
      </div>
    </section>
  );
}
