"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLiteMode } from "@/hooks/use-lite-mode";

type Stage = {
  n: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  /** Real company photo for this stage. Drop files in /public/images/journey
   *  and set the path here to replace the icon. */
  image?: string;
};

const S = (children: React.ReactNode) => (
  <svg viewBox="0 0 120 120" fill="none" className="h-full w-full" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const STAGES: Stage[] = [
  {
    n: "01",
    title: "Mountain Quarry",
    image: "/images/journey/01-quarry.jpg",
    desc: "It begins in the mountains. Reserves confirmed by geological survey hold the limestone, clay, sandstone and gypsum that become cement.",
    icon: S(<><path d="M10 95 L42 40 L62 70 L80 35 L110 95 Z" stroke="currentColor" strokeWidth="2.5" /><path d="M80 35 L88 50 L72 52 Z" stroke="currentColor" strokeWidth="2" /><circle cx="34" cy="28" r="6" stroke="currentColor" strokeWidth="2" /></>),
  },
  {
    n: "02",
    title: "Raw Material Extraction",
    image: "/images/journey/02-extraction.jpg",
    desc: "Limestone and minerals are extracted from our reserves — the raw foundation of every tonne we produce.",
    icon: S(<><path d="M20 100 L60 60" stroke="currentColor" strokeWidth="3" /><path d="M44 44 C58 30, 82 30, 96 44" stroke="currentColor" strokeWidth="2.5" /><path d="M60 60 L70 50" stroke="currentColor" strokeWidth="3" /><path d="M18 100 L34 100" stroke="currentColor" strokeWidth="3" /></>),
  },
  {
    n: "03",
    title: "Crushing & Blending",
    image: "/images/journey/03-crushing.jpg",
    desc: "Materials are crushed and blended to an exact chemistry — precision measured in fractions of a percent.",
    icon: S(<><circle cx="42" cy="48" r="20" stroke="currentColor" strokeWidth="2.5" /><circle cx="42" cy="48" r="7" stroke="currentColor" strokeWidth="2.5" /><circle cx="82" cy="64" r="14" stroke="currentColor" strokeWidth="2.5" /><circle cx="82" cy="64" r="5" stroke="currentColor" strokeWidth="2.5" /><path d="M30 90 L94 90" stroke="currentColor" strokeWidth="2.5" /></>),
  },
  {
    n: "04",
    title: "Kiln Production",
    image: "/images/hero-plant.jpg",
    desc: "Inside the rotary kiln, raw meal is fired to clinkering temperature — around 1,450°C — and transformed into clinker, the heart of cement.",
    icon: S(<><path d="M60 100 C40 84, 44 64, 56 56 C54 70, 64 72, 66 60 C76 70, 80 86, 60 100 Z" stroke="currentColor" strokeWidth="2.5" /><path d="M20 100 L100 100" stroke="currentColor" strokeWidth="2.5" /></>),
  },
  {
    n: "05",
    title: "Quality Testing",
    image: "/images/journey/05-quality.jpg",
    desc: "ISO, TÜV and SASO-aligned laboratories verify strength, fineness and consistency. Nothing leaves unverified.",
    icon: S(<><path d="M50 22 L50 50 L34 86 C30 96, 38 102, 48 102 L72 102 C82 102, 90 96, 86 86 L70 50 L70 22" stroke="currentColor" strokeWidth="2.5" /><path d="M44 22 L76 22" stroke="currentColor" strokeWidth="2.5" /><path d="M42 74 L78 74" stroke="currentColor" strokeWidth="2" /><circle cx="56" cy="86" r="3" fill="currentColor" /></>),
  },
  {
    n: "06",
    title: "Packaging",
    image: "/images/products/opc.jpg",
    desc: "Bagged and bulk cement — OPC, SRC, PPC and Lyasah — packed to a consistent, trusted standard.",
    icon: S(<><path d="M40 30 L80 30 L86 100 L34 100 Z" stroke="currentColor" strokeWidth="2.5" /><path d="M52 30 L52 22 L68 22 L68 30" stroke="currentColor" strokeWidth="2.5" /><path d="M48 56 L72 56" stroke="currentColor" strokeWidth="2" /><path d="M48 70 L72 70" stroke="currentColor" strokeWidth="2" /></>),
  },
  {
    n: "07",
    title: "Distribution",
    image: "/images/plant-full.jpg",
    desc: "39+ distribution centers move cement across the southern region and beyond — a connected logistics network.",
    icon: S(<><path d="M18 44 L66 44 L66 84 L18 84 Z" stroke="currentColor" strokeWidth="2.5" /><path d="M66 56 L86 56 L100 72 L100 84 L66 84 Z" stroke="currentColor" strokeWidth="2.5" /><circle cx="38" cy="90" r="8" stroke="currentColor" strokeWidth="2.5" /><circle cx="86" cy="90" r="8" stroke="currentColor" strokeWidth="2.5" /></>),
  },
  {
    n: "08",
    title: "Major Construction",
    image: "/images/journey/08-construction.jpg",
    desc: "From foundations to skylines — Najran Cement builds the Kingdom, one tonne at a time.",
    icon: S(<><path d="M24 100 L24 50 L52 50 L52 100" stroke="currentColor" strokeWidth="2.5" /><path d="M52 100 L52 30 L92 30 L92 100" stroke="currentColor" strokeWidth="2.5" /><path d="M62 44 L72 44 M62 58 L72 58 M62 72 L72 72" stroke="currentColor" strokeWidth="2" /><path d="M32 64 L42 64 M32 80 L42 80" stroke="currentColor" strokeWidth="2" /><path d="M14 100 L104 100" stroke="currentColor" strokeWidth="2.5" /></>),
  },
];

export function QuarryToConstruction() {
  const ref = useRef<HTMLDivElement>(null);
  const lite = useLiteMode();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  const iconY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (lite) return; // no scroll-driven state updates on mobile
    const i = Math.min(STAGES.length - 1, Math.floor(p * STAGES.length));
    if (i !== active) setActive(i);
  });

  const stage = STAGES[active];

  // ---- Mobile / lite: simple stacked layout, no pinning, no scroll transforms ----
  if (lite) {
    return (
      <section id="journey" className="relative bg-[#05080f] py-24">
        <div className="container-page">
          <div className="mb-10 flex items-center gap-2.5">
            <span className="h-px w-8 bg-[#f5c56b]" />
            <span className="text-xs font-medium uppercase tracking-[0.28em] text-[#f5c56b]">
              The Signature Journey
            </span>
          </div>
          <h2 className="font-display mb-10 text-3xl font-semibold text-white">
            From Quarry <span className="text-[#f5c56b]">→</span> to Construction
          </h2>

          <div className="space-y-12">
            {STAGES.map((s) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {s.image && (
                  <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] border border-[#f5c56b]/20">
                    <Image src={s.image} alt={s.title} fill sizes="100vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05080f]/70 to-transparent" />
                    <span className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-[#f5c56b]/40 bg-black/30 p-1.5 text-[#f5c56b]">
                      {s.icon}
                    </span>
                  </div>
                )}
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-2xl font-bold text-white/15">{s.n}</span>
                  <h3 className="font-display text-xl font-semibold text-white">{s.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} id="journey" className="relative bg-[#05080f]" style={{ height: `${STAGES.length * 100}vh` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        {/* background */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_30%,#11203c_0%,#0a1122_50%,#05080f_100%)]" />
        <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-40" />
        <motion.div
          className="pointer-events-none absolute right-[12%] top-1/3 h-[55vh] w-[55vh] rounded-full bg-[#f5c56b]/10 blur-[150px]"
          animate={lite ? undefined : { opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container-page relative w-full">
          {/* eyebrow */}
          <div className="mb-10 flex items-center gap-2.5">
            <span className="h-px w-8 bg-[#f5c56b]" />
            <span className="text-xs font-medium uppercase tracking-[0.28em] text-[#f5c56b]">
              The Signature Journey
            </span>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
            {/* Text column */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="font-display bg-gradient-to-br from-white/15 to-white/5 bg-clip-text text-[clamp(5rem,14vw,11rem)] font-bold leading-none tracking-tighter text-transparent">
                    {stage.n}
                  </div>
                  <h3 className="font-display -mt-2 text-[clamp(1.8rem,4vw,3rem)] font-semibold text-white">
                    {stage.title}
                  </h3>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-white/60 md:text-lg">
                    {stage.desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* From … to … label */}
              <div className="mt-12 font-display text-sm uppercase tracking-[0.2em] text-white/40">
                From Quarry <span className="text-[#f5c56b]">→</span> to Construction
              </div>
            </div>

            {/* Visual stage — real photo where available, gold icon otherwise */}
            <div className="relative hidden h-[48vh] items-center justify-center lg:flex">
              <div className="absolute h-[34vh] w-[34vh] rounded-full bg-[#ff7a2d]/10 blur-[80px]" />
              <AnimatePresence mode="wait">
                {stage.image ? (
                  <motion.div
                    key={active}
                    style={{ y: iconY }}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative h-[44vh] w-full max-w-[540px] overflow-hidden rounded-[var(--radius-card)] border border-[#f5c56b]/25 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
                  >
                    <Image
                      src={stage.image}
                      alt={stage.title}
                      fill
                      sizes="(max-width: 1024px) 0px, 45vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05080f]/75 via-transparent to-[#05080f]/10" />
                    <span className="absolute left-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-[#f5c56b]/40 bg-black/30 p-2 text-[#f5c56b] backdrop-blur-sm">
                      {stage.icon}
                    </span>
                    <span className="absolute bottom-5 left-5 font-display text-sm font-medium tracking-tight text-white/90">
                      {stage.title}
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key={active}
                    style={{ y: iconY }}
                    initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative h-[30vh] w-[30vh] text-[#f5c56b] drop-shadow-[0_0_40px_rgba(245,197,107,0.35)]"
                  >
                    {stage.icon}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Progress rail */}
        <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
          <div className="relative h-56 w-px bg-white/10">
            <motion.div style={{ height: lineHeight }} className="absolute left-0 top-0 w-px bg-gradient-to-b from-[#f5c56b] to-[#ff7a2d]" />
          </div>
          <span className="font-display text-xs tabular-nums text-white/50">
            {String(active + 1).padStart(2, "0")} / {String(STAGES.length).padStart(2, "0")}
          </span>
        </div>

        {/* Stage ticks (bottom) */}
        <div className="absolute inset-x-0 bottom-8">
          <div className="container-page flex gap-2">
            {STAGES.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-0.5 flex-1 rounded-full transition-colors duration-500",
                  i <= active ? "bg-gradient-to-r from-[#f5c56b] to-[#ff7a2d]" : "bg-white/10"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
