"use client";

import { motion } from "framer-motion";
import { PRODUCTS } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, Reveal } from "@/components/ui/reveal";

export function Products() {
  return (
    <section id="products" className="relative border-t border-line py-28 md:py-36">
      <div className="container-page">
        <SectionHeading
          eyebrow="Our Cement"
          title="A grade for every structure."
          intro="From everyday construction to demanding marine environments, our portfolio is engineered to perform — with an eco-friendly future on the way."
        />

        <RevealGroup className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <Reveal key={p.name}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white p-7 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-shadow duration-500 hover:shadow-soft"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-kiln/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-semibold uppercase tracking-wider text-kiln">
                    {p.short}
                  </span>
                  {p.upcoming && (
                    <span className="rounded-full border border-concrete/40 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-concrete">
                      Upcoming
                    </span>
                  )}
                </div>
                <h3 className="font-display mt-5 text-xl font-semibold leading-snug">{p.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ash">{p.desc}</p>
                <div className="mt-6 h-px w-full bg-line transition-colors duration-500 group-hover:bg-kiln/50" />
              </motion.article>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
