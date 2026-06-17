"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { COMPANY } from "@/lib/data";
import { RevealHeadline } from "@/components/ui/reveal-headline";
import { Counter } from "@/components/ui/counter";
import { useLiteMode } from "@/hooks/use-lite-mode";

// Desktop-only decorative canvas — split out so it never ships to mobile.
const ParticleField = dynamic(
  () => import("@/components/ui/particle-field").then((m) => m.ParticleField),
  { ssr: false }
);

// Verified cinematic metrics
const METRICS = [
  { v: 4.1, suffix: "M+", label: "Tonnes annual capacity" },
  { v: 39, suffix: "+", label: "Distribution centers" },
  { v: 20, suffix: "+", label: "Years of excellence" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const lite = useLiteMode();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // scroll-driven depth
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.22]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // mouse parallax
  const mxv = useMotionValue(0);
  const myv = useMotionValue(0);
  const px = useSpring(mxv, { stiffness: 50, damping: 18 });
  const py = useSpring(myv, { stiffness: 50, damping: 18 });
  const photoMX = useTransform(px, (v) => v * -26);
  const photoMY = useTransform(py, (v) => v * -18);
  const glowMX = useTransform(px, (v) => v * 50);
  const glowMY = useTransform(py, (v) => v * 50);

  const onMouse = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mxv.set((e.clientX - (r.left + r.width / 2)) / r.width);
    myv.set((e.clientY - (r.top + r.height / 2)) / r.height);
  };

  return (
    <section
      ref={ref}
      id="top"
      onMouseMove={onMouse}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#05080f] text-white"
    >
      {/* ---- Cinematic industrial scene (static image on mobile) ---- */}
      <motion.div style={lite ? undefined : { y: photoY }} className="absolute inset-0">
        <motion.div
          style={lite ? undefined : { scale: photoScale, x: photoMX, y: photoMY }}
          className="absolute inset-0"
        >
          <Image
            src="/images/hero-plant.jpg"
            alt="Najran Cement plant illuminated at night"
            fill
            priority
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </motion.div>
      </motion.div>

      {/* Dynamic sky glow (gold/amber) */}
      {/* Static brand glows (mouse-parallax only; no idle animation) */}
      <motion.div
        style={{ x: glowMX, y: glowMY }}
        className="pointer-events-none absolute -top-[15%] right-[8%] h-[55vh] w-[55vh] rounded-full bg-[#f5c56b]/15 opacity-70 blur-[150px]"
      />
      <motion.div
        style={{ x: glowMY, y: glowMX }}
        className="pointer-events-none absolute top-[20%] left-[-8%] h-[45vh] w-[45vh] rounded-full bg-[#ff7a2d]/15 opacity-60 blur-[150px]"
      />

      {/* Static volumetric fog at the base */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-[40vh] w-[70vw] rounded-full bg-white/[0.06] blur-[90px]" />
      <div className="pointer-events-none absolute bottom-[5%] right-0 h-[35vh] w-[60vw] rounded-full bg-[#9fb3c8]/[0.05] blur-[100px]" />

      {/* Readability + cinematic grade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#05080f] via-[#05080f]/45 to-[#05080f]/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#05080f]/90 via-[#05080f]/20 to-transparent" />
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-40" />

      {!lite && <ParticleField dark className="absolute inset-0 h-full w-full" />}

      {/* transition into the light page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-white" />

      {/* ---- Content ---- */}
      <motion.div
        style={lite ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container-page relative z-10 w-full pt-28 pb-44 md:pt-24 md:pb-52"
      >
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={lite ? { duration: 0 } : { delay: 1.4, duration: 0.7 }}
        >
          <span className="glass-dark inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute hidden h-2 w-2 animate-ping rounded-full bg-[#f5c56b] opacity-70 lg:inline-flex" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#f5c56b]" />
            </span>
            {COMPANY.location} · Est. {COMPANY.established}
          </span>
        </motion.div>

        <h1 className="font-display mt-7 max-w-5xl text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-[0.94] tracking-[-0.035em] [text-shadow:0_2px_40px_rgba(0,0,0,0.5)]">
          <RevealHeadline
            segments={[
              { text: "Building the Kingdom, " },
              { text: "one tonne at a time.", highlight: true },
            ]}
            highlightClass="text-fire-grad"
          />
        </h1>

        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={lite ? { duration: 0 } : { delay: 1.6, duration: 0.8 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-white/70 md:text-lg"
        >
          For over two decades, {COMPANY.name} has produced premium cement at industrial
          scale — building trust and delivering quality across the Kingdom and beyond.
        </motion.p>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={lite ? { duration: 0 } : { delay: 1.74, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/quote"
            className="group relative inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#f5c56b] via-[#ff7a2d] to-[#e8431f] px-8 py-4 text-sm font-semibold text-[#1a0f06] shadow-[0_10px_50px_-10px_rgba(245,197,107,0.7)] transition-transform hover:scale-[1.03]"
          >
            Request a quote
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/#products"
            className="glass-dark inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Explore our cement
          </Link>
        </motion.div>
      </motion.div>

      {/* ---- Floating cinematic metric panels ---- */}
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={lite ? { duration: 0 } : { delay: 2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-x-0 bottom-14 z-10 md:bottom-16"
      >
        <div className="container-page">
          <div className="grid max-w-3xl grid-cols-3 gap-3 md:gap-5">
            {METRICS.map((m) => (
              <div
                key={m.label}
                className="glass-dark rounded-2xl px-4 py-4 md:px-6 md:py-5"
              >
                <div className="font-display bg-gradient-to-br from-[#f5c56b] to-[#ff7a2d] bg-clip-text text-2xl font-semibold tracking-tight text-transparent md:text-4xl">
                  <Counter value={m.v} suffix={m.suffix} />
                </div>
                <div className="mt-1.5 text-[11px] leading-tight text-white/70 md:text-sm">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="pointer-events-none absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-[#f5c56b]"
          />
        </div>
      </motion.div>
    </section>
  );
}
