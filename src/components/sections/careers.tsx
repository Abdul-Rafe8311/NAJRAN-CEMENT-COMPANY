"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

const PILLARS = [
  { title: "Engineering excellence", desc: "Work alongside specialists running one of the region's most advanced cement operations." },
  { title: "Growth & ownership", desc: "Real responsibility from day one, with clear paths to lead and build." },
  { title: "Purpose at scale", desc: "Help build the Kingdom — your work stands in the structures around you." },
];

export function Careers() {
  return (
    <section id="careers" className="relative overflow-hidden border-t border-line bg-coal py-28 md:py-36">
      <div className="pointer-events-none absolute -left-20 top-0 h-[40vh] w-[40vh] rounded-full bg-kiln/10 blur-[120px]" />
      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionHeading
            eyebrow="Careers"
            title="Build something that lasts."
            intro="We're looking for people who take pride in precision — engineers, operators, and leaders who want their work to endure for generations."
          />
          <div className="mt-9">
            <Button href="#contact">Explore opportunities</Button>
          </div>
        </div>

        <div className="space-y-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ x: 8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-start gap-5 rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-shadow duration-500 hover:shadow-soft"
              >
                <span className="font-display text-2xl font-semibold text-kiln">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ash">{p.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
