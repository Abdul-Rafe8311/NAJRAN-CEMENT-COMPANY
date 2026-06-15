"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { COMPANY } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/ui/text-reveal";

export function FinalCta() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const glow = useTransform(scrollYProgress, [0, 1], [0.2, 0.6]);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative flex min-h-[90svh] items-center overflow-hidden border-t border-line"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
      <motion.div
        style={{ opacity: glow }}
        className="pointer-events-none absolute bottom-[-20%] left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full bg-gradient-to-t from-ember/30 to-kiln/20 blur-[150px]"
      />

      <motion.div style={{ scale }} className="container-page relative text-center">
        <h2 className="font-display mx-auto max-w-5xl text-h1 font-semibold leading-[1.02] text-balance md:text-display">
          <TextReveal text="Let's build what lasts." className="justify-center" />
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mx-auto mt-7 max-w-xl text-base text-ash md:text-lg"
        >
          Partner with {COMPANY.name} for premium, reliable cement supply across the Kingdom.
          Talk to our team today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href={`mailto:${COMPANY.email}`}>Request a quote</Button>
          <Button href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} variant="ghost">
            {COMPANY.phone}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
