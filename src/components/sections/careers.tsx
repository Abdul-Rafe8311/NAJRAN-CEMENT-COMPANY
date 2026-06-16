"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const PILLARS = [
  { title: "Engineering excellence", desc: "Work alongside specialists running one of the region's most advanced cement operations." },
  { title: "Growth & ownership", desc: "Real responsibility from day one, with clear paths to lead and build." },
  { title: "Purpose at scale", desc: "Help build the Kingdom — your work stands in the structures around you." },
];

export function Careers() {
  return (
    <section id="careers" className="relative overflow-hidden border-t border-white/10 py-28 text-white md:py-36">
      <div className="pointer-events-none absolute -left-20 top-0 h-[40vh] w-[40vh] rounded-full bg-[#f5c56b]/10 blur-[120px]" />
      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionHeading
            tone="dark"
            eyebrow="Careers"
            title="Build something that lasts."
            intro="We're looking for people who take pride in precision — engineers, operators, and leaders who want their work to endure for generations."
          />
          <div className="mt-9">
            <Link
              href="/career"
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#f5c56b] to-[#ff7a2d] px-7 py-3.5 text-sm font-semibold text-[#1a0f06] transition-transform hover:scale-[1.03]"
            >
              Explore opportunities
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ x: 8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-start gap-5 rounded-[var(--radius-card)] border border-white/10 bg-white/[0.03] p-6 transition-colors duration-500 hover:border-[#f5c56b]/30 hover:bg-white/[0.05]"
              >
                <span className="font-display text-2xl font-semibold text-[#f5c56b]">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{p.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
