"use client";

import { Globe } from "@/components/ui/globe";
import { Counter } from "@/components/ui/counter";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function Reach() {
  return (
    <section id="reach" className="relative overflow-hidden border-t border-line bg-coal py-28 md:py-36">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Global Reach"
            title="Supplying the Kingdom, built to travel further."
            intro="From our base in Najran, our cement reaches projects across the southern region — with a long-standing objective to supply the wider Kingdom and export beyond its borders."
          />

          <div className="mt-10 grid grid-cols-2 gap-6">
            <Reveal>
              <div>
                <div className="font-display text-4xl font-semibold tracking-tight">
                  <Counter value={39} suffix="+" />
                </div>
                <div className="mt-1.5 text-sm text-bone">Distribution centers</div>
                <div className="text-xs text-muted">Across the region</div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <div className="font-display text-4xl font-semibold tracking-tight">
                  <Counter value={46} suffix="M+" />
                </div>
                <div className="mt-1.5 text-sm text-bone">Tonnes delivered</div>
                <div className="text-xs text-muted">Cumulative to date</div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="flex justify-center">
          <Globe className="drop-shadow-[0_30px_60px_rgba(16,24,40,0.18)]" />
        </Reveal>
      </div>
    </section>
  );
}
