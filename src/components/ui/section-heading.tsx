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
  tone = "light",
  className,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <Reveal>
        <span
          className={cn(
            "inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.22em]",
            dark ? "text-[#f5c56b]" : "text-muted"
          )}
        >
          <span className={cn("h-px w-8", dark ? "bg-[#f5c56b]" : "bg-kiln")} />
          {eyebrow}
        </span>
      </Reveal>
      <h2
        className={cn(
          "font-display mt-5 text-h2 font-semibold leading-[1.04] text-balance",
          dark && "text-white"
        )}
      >
        <TextReveal text={title} />
      </h2>
      {intro && (
        <Reveal delay={0.1}>
          <p className={cn("mt-5 text-base leading-relaxed md:text-lg", dark ? "text-white/60" : "text-ash")}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
