"use client";

import dynamic from "next/dynamic";
import { Counter } from "@/components/ui/counter";

// WebGL globe (cobe) is desktop-only, below the fold, and non-critical —
// load it as its own chunk so it never blocks first paint.
const Globe = dynamic(() => import("@/components/ui/globe").then((m) => m.Globe), {
  ssr: false,
});
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { useLiteMode } from "@/hooks/use-lite-mode";

export function Reach() {
  const lite = useLiteMode();
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
          {lite ? (
            // static globe substitute on mobile (no WebGL)
            <div className="relative grid h-64 w-64 place-items-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_35%_30%,#1b3a6b_0%,#0b1a30_60%,#05080f_100%)] sm:h-80 sm:w-80">
              <div className="absolute inset-6 rounded-full border border-[#f5c56b]/20" />
              <div className="absolute inset-14 rounded-full border border-white/5" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#f5c56b] shadow-[0_0_16px_4px_rgba(245,197,107,0.5)]" />
            </div>
          ) : (
            <Globe className="drop-shadow-[0_30px_80px_rgba(245,197,107,0.18)]" />
          )}
        </Reveal>
      </div>
    </section>
  );
}
