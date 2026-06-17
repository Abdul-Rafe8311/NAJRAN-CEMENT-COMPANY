"use client";

import { INVESTOR_FACTS, CERTIFICATIONS } from "@/lib/data";
import { Counter } from "@/components/ui/counter";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, Reveal } from "@/components/ui/reveal";
import { ReviewBadge } from "@/components/ui/review-badge";
import { useLiteMode } from "@/hooks/use-lite-mode";
import { cn } from "@/lib/utils";

export function Investors() {
  const lite = useLiteMode();
  return (
    <section id="investors" className="relative overflow-hidden border-t border-white/10 py-28 text-white md:py-36">
      <div className="pointer-events-none absolute left-0 top-0 h-[40vh] w-[40vh] rounded-full bg-[#1b3a6b]/25 blur-[130px]" />
      <div className="container-page relative">
        <SectionHeading
          tone="dark"
          eyebrow="Investor Confidence"
          title="A foundation built on trust."
          intro="A publicly listed company on the Saudi Exchange with a track record of disciplined, transparent operation since 2005."
        />

        <RevealGroup className="mt-16 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {INVESTOR_FACTS.map((f) => (
            <Reveal key={f.label}>
              <div className="relative h-full rounded-[var(--radius-card)] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm">
                <div className="font-display bg-gradient-to-br from-[#f5c56b] to-[#ff7a2d] bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl">
                  {f.review ? (
                    "—"
                  ) : f.value !== undefined && f.value > 0 ? (
                    <Counter value={f.value} prefix={f.prefix} suffix={f.suffix} />
                  ) : (
                    <span>{f.text}</span>
                  )}
                </div>
                <div className="mt-3 text-sm font-medium text-white">{f.label}</div>
                {f.text && !f.review && f.value !== undefined && f.value > 0 && (
                  <div className="mt-1 text-xs text-white/40">{f.text}</div>
                )}
                {f.review && <ReviewBadge className="mt-3" />}
              </div>
            </Reveal>
          ))}
        </RevealGroup>

        {/* Certifications — marquee on desktop, static wrap on mobile */}
        <div className="mt-12 overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-white/[0.03] px-6 py-4 md:rounded-full">
          <div
            className={cn(
              "gap-x-10 gap-y-3",
              lite
                ? "flex flex-wrap justify-center"
                : "flex animate-[marquee_28s_linear_infinite] gap-12 whitespace-nowrap pr-12"
            )}
          >
            {(lite ? CERTIFICATIONS : [...CERTIFICATIONS, ...CERTIFICATIONS]).map((c, i) => (
              <span
                key={i}
                className="flex items-center gap-3 text-sm font-medium uppercase tracking-wider text-white/60"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#f5c56b]" />
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
