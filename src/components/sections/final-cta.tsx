"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { COMPANY } from "@/lib/data";
import { TextReveal } from "@/components/ui/text-reveal";
import { ParticleField } from "@/components/ui/particle-field";
import { useLiteMode } from "@/hooks/use-lite-mode";

export function FinalCta() {
  const ref = useRef<HTMLDivElement>(null);
  const lite = useLiteMode();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const glow = useTransform(scrollYProgress, [0, 1], [0.3, 0.7]);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative flex min-h-[92svh] items-center overflow-hidden bg-[#070b16] text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_110%,#15264a_0%,#0a1122_50%,#070b16_100%)]" />
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-70" />
      {!lite && <ParticleField dark className="absolute inset-0 h-full w-full" />}
      <motion.div
        style={{ opacity: glow }}
        className="pointer-events-none absolute bottom-[-20%] left-1/2 h-[70vh] w-[80vh] -translate-x-1/2 rounded-full bg-gradient-to-t from-[#e8431f]/40 to-[#ff7a2d]/20 blur-[150px]"
      />

      <motion.div style={{ scale }} className="container-page relative text-center">
        <div className="glass-dark mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff7a2d]" />
          Let's work together
        </div>
        <h2 className="font-display mx-auto mt-7 max-w-5xl text-h1 font-semibold leading-[1.02] text-balance md:text-display">
          <TextReveal text="Let's build what lasts." className="justify-center" />
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mx-auto mt-7 max-w-xl text-base text-white/60 md:text-lg"
        >
          Partner with {COMPANY.name} for premium, reliable cement supply across the
          Kingdom. Talk to our team today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href={`mailto:${COMPANY.email}`}
            className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#ff7a2d] to-[#e8431f] px-8 py-4 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(255,122,45,0.7)] transition-transform hover:scale-[1.03]"
          >
            Request a quote
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a
            href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
            className="glass-dark inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            {COMPANY.phone}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
