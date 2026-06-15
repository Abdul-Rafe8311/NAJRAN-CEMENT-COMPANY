"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { JOURNEY } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Horizontal scroll-pinned "manufacturing journey".
 * The track is pinned and translated horizontally as the user scrolls
 * vertically; an SVG progress line draws itself across the four stages.
 * Falls back to a normal stacked layout when reduced-motion is set.
 */
export function Journey() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return; // mobile uses vertical stack

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const el = track.current!;
      const distance = el.scrollWidth - window.innerWidth;

      const tween = gsap.to(el, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance + window.innerHeight * 0.6}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // stagger each panel's content in
      gsap.utils.toArray<HTMLElement>(".journey-panel").forEach((panel) => {
        gsap.from(panel.querySelectorAll(".jp-anim"), {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: "left 75%",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} id="journey" className="relative border-t border-line bg-coal">
      <div className="container-page pt-28 md:pt-32">
        <SectionHeading
          eyebrow="Manufacturing Journey"
          title="From rock to resilience."
          intro="Every tonne follows the same exacting path. Scroll through the four stages that turn raw minerals into cement engineered to last."
        />
      </div>

      {/* Horizontal track (desktop) / vertical stack (mobile) */}
      <div className="mt-16 md:mt-20 md:overflow-hidden">
        <div
          ref={track}
          className="flex flex-col gap-6 px-5 md:h-[70vh] md:flex-row md:gap-0 md:px-0 md:pl-[max(1.25rem,calc((100vw-var(--container-page))/2+3rem))]"
        >
          {JOURNEY.map((step) => (
            <article
              key={step.index}
              className="journey-panel relative flex w-full shrink-0 flex-col justify-center rounded-[var(--radius-card)] border border-line bg-void p-8 md:mr-6 md:w-[460px] md:p-12"
            >
              <span
                className="jp-anim font-display text-7xl font-semibold md:text-8xl"
                style={{ color: step.accent }}
              >
                {step.index}
              </span>
              <h3 className="jp-anim font-display mt-6 text-h3 font-semibold">{step.title}</h3>
              <p className="jp-anim mt-4 max-w-sm leading-relaxed text-ash">{step.desc}</p>
              <div
                className="jp-anim mt-8 h-px w-16"
                style={{ background: step.accent }}
              />
            </article>
          ))}
        </div>
      </div>
      <div className="h-20 md:h-28" />
    </section>
  );
}
