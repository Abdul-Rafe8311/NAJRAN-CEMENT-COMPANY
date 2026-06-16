"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { COMPANY, HERO_STATS } from "@/lib/data";
import { Typewriter } from "@/components/ui/typewriter";
import { HeroMockup } from "@/components/ui/hero-mockup";
import { ParticleField } from "@/components/ui/particle-field";
import { Counter } from "@/components/ui/counter";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // scroll transforms
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [18, 0]);
  const mockY = useTransform(scrollYProgress, [0, 1], [0, 160]);

  // mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 18 });
  const py = useSpring(my, { stiffness: 60, damping: 18 });
  const glowX = useTransform(px, (v) => v * 40);
  const glowY = useTransform(py, (v) => v * 40);
  const tiltY = useTransform(px, (v) => v * 8);

  const onMouse = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - (r.left + r.width / 2)) / r.width);
    my.set((e.clientY - (r.top + r.height / 2)) / r.height);
  };

  return (
    <section
      ref={ref}
      id="top"
      onMouseMove={onMouse}
      className="relative min-h-[100svh] overflow-hidden bg-[#070b16] pt-32 text-white md:pt-40"
    >
      {/* ---- Layered background ---- */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#11203c_0%,#0a1122_45%,#070b16_100%)]" />
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-70" />

      {/* Drifting aurora glows */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute -left-[10%] top-[-10%] h-[60vh] w-[60vh] rounded-full bg-[#ff7a2d]/20 blur-[140px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{ x: glowY, y: glowX }}
        className="pointer-events-none absolute right-[-5%] top-[20%] h-[55vh] w-[55vh] rounded-full bg-[#1f7a8c]/25 blur-[150px]"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="pointer-events-none absolute bottom-[-15%] left-1/2 h-[50vh] w-[80vh] -translate-x-1/2 rounded-full bg-[#1b3a6b]/30 blur-[150px]" />

      <ParticleField dark className="absolute inset-0 h-full w-full" />

      {/* bottom fade into the light page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white" />

      {/* ---- Content ---- */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-page relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          className="flex items-center"
        >
          <span className="glass-dark inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-medium text-white/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[#ff7a2d] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff7a2d]" />
            </span>
            {COMPANY.location} · Est. {COMPANY.established}
          </span>
        </motion.div>

        <h1 className="font-display mt-7 max-w-4xl text-[clamp(2.8rem,7.5vw,6rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
          <Typewriter
            segments={[
              { text: "Building the Kingdom, " },
              { text: "one tonne at a time.", highlight: true },
            ]}
            highlightClass="text-fire-grad"
            cursorClass="bg-[#ff7a2d]"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-7 max-w-xl text-base leading-relaxed text-white/65 md:text-lg"
        >
          For over two decades, {COMPANY.name} has produced premium cement at industrial
          scale — building trust and delivering quality across the Kingdom and beyond.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.74, duration: 0.8 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/#contact"
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-[#ff7a2d] to-[#e8431f] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_rgba(255,122,45,0.7)] transition-transform hover:scale-[1.03]"
          >
            Request a quote
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/#products"
            className="glass-dark inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Explore our cement
          </Link>
        </motion.div>

        {/* Floating glass stat cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.9 }}
          className="mt-12 grid max-w-2xl grid-cols-3 gap-4"
        >
          {HERO_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
              className="glass-dark rounded-2xl p-4"
            >
              <div className="font-display text-2xl font-semibold tracking-tight text-white md:text-3xl">
                <Counter value={s.value} suffix={s.suffix} prefix={s.prefix} />
              </div>
              <div className="mt-1 text-xs text-white/70">{s.label}</div>
              <div className="text-[11px] text-white/40">{s.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Glowing tilted mockup */}
      <motion.div
        style={{ y: mockY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="container-page relative mt-16 md:mt-20"
      >
        <div style={{ perspective: 1600 }} className="mx-auto max-w-5xl">
          <div className="pointer-events-none absolute inset-x-10 top-10 -z-0 h-40 rounded-full bg-[#ff7a2d]/20 blur-[90px]" />
          <motion.div
            initial={{ y: 60 }}
            animate={{ y: 0 }}
            transition={{ delay: 2, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ rotateX, rotateY: tiltY, transformStyle: "preserve-3d", willChange: "transform" }}
            className="relative origin-top"
          >
            <HeroMockup />
          </motion.div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-[#ff7a2d]"
          />
        </div>
      </motion.div>
    </section>
  );
}
