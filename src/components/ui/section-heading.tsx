"use client";

import { TextReveal } from "./text-reveal";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

/** Consistent eyebrow + display heading + optional intro for each section. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Reveal>
        <span className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.22em] text-muted">
          <span className="h-px w-8 bg-kiln" />
          {eyebrow}
        </span>
      </Reveal>
      <h2 className="font-display mt-5 text-h2 font-semibold leading-[1.04] text-balance">
        <TextReveal text={title} />
      </h2>
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-base leading-relaxed text-ash md:text-lg">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
