"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { COMPANY } from "@/lib/data";
import { Typewriter } from "@/components/ui/typewriter";
import { HeroMockup } from "@/components/ui/hero-mockup";
import { Button } from "@/components/ui/button";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.6], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.94, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden pt-32 md:pt-40">
      {/* Background */}
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-kiln/[0.06] blur-[120px]" />

      <div className="container-page relative">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
          className="flex items-center gap-2.5"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-ash shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <span className="h-1.5 w-1.5 rounded-full bg-kiln" />
            {COMPANY.location} · Est. {COMPANY.established}
          </span>
        </motion.div>

        {/* Typewriter headline */}
        <h1 className="font-display mt-7 max-w-4xl text-[clamp(2.6rem,7vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
          <Typewriter
            segments={[
              { text: "Building the Kingdom, " },
              { text: "one tonne at a time.", highlight: true },
            ]}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-7 max-w-xl text-base leading-relaxed text-ash md:text-lg"
        >
          For over two decades, {COMPANY.name} has produced premium cement — building
          trust and delivering quality across the Kingdom and beyond.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.72, duration: 0.8 }}
          className="mt-9 flex flex-wrap items-center gap-6"
        >
          <Button href="/#contact">Request a quote</Button>
          <Link
            href="/#products"
            className="group inline-flex items-center gap-2 text-sm font-medium text-bone"
          >
            <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-bone">
              Explore our cement
            </span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Tilted 3D mockup */}
      <motion.div
        style={{ y }}
        className="container-page relative mt-14 md:mt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 1 }}
      >
        <div style={{ perspective: 1600 }} className="mx-auto max-w-5xl">
          <motion.div
            initial={{ y: 60 }}
            animate={{ y: 0 }}
            transition={{ delay: 1.9, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ rotateX, scale, transformStyle: "preserve-3d" }}
            className="origin-top"
          >
            <HeroMockup />
          </motion.div>
        </div>
        {/* fade base into page */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </motion.div>
    </section>
  );
}
