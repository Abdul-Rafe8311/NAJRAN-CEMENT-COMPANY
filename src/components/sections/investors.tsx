"use client";

import { INVESTOR_FACTS, CERTIFICATIONS } from "@/lib/data";
import { Counter } from "@/components/ui/counter";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, Reveal } from "@/components/ui/reveal";
import { ReviewBadge } from "@/components/ui/review-badge";

export function Investors() {
  return (
    <section id="investors" className="relative border-t border-line py-28 md:py-36">
      <div className="container-page">
        <SectionHeading
          eyebrow="Investor Confidence"
          title="A foundation built on trust."
          intro="A publicly listed company on the Saudi Exchange with a track record of disciplined, transparent operation since 2005."
        />

        <RevealGroup className="mt-16 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {INVESTOR_FACTS.map((f) => (
            <Reveal key={f.label}>
              <div className="relative h-full rounded-[var(--radius-card)] border border-line bg-white p-7 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
                <div className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
                  {f.review ? (
                    "—"
                  ) : f.value !== undefined && f.value > 0 ? (
                    <Counter value={f.value} prefix={f.prefix} suffix={f.suffix} />
                  ) : (
                    <span>{f.text}</span>
                  )}
                </div>
                <div className="mt-3 text-sm font-medium text-bone">{f.label}</div>
                {f.text && !f.review && f.value !== undefined && f.value > 0 && (
                  <div className="mt-1 text-xs text-muted">{f.text}</div>
                )}
                {f.review && <ReviewBadge className="mt-3" />}
              </div>
            </Reveal>
          ))}
        </RevealGroup>

        {/* Certifications marquee */}
        <div className="mt-12 overflow-hidden rounded-full border border-line bg-coal py-4">
          <div className="flex animate-[marquee_28s_linear_infinite] gap-12 whitespace-nowrap pr-12">
            {[...CERTIFICATIONS, ...CERTIFICATIONS].map((c, i) => (
              <span
                key={i}
                className="flex items-center gap-3 text-sm font-medium uppercase tracking-wider text-ash"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-kiln" />
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
