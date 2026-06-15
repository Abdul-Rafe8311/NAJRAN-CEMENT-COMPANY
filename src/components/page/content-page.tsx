"use client";

import { motion } from "framer-motion";
import type { Block, PageContent } from "@/lib/pages";
import { COMPANY } from "@/lib/data";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { ReviewBadge } from "@/components/ui/review-badge";

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "heading":
      return (
        <Reveal>
          <h2 className="font-display mt-12 text-h3 font-semibold first:mt-0">{block.text}</h2>
        </Reveal>
      );
    case "paragraph":
      return (
        <Reveal>
          <p className="mt-4 text-base leading-relaxed text-ash md:text-lg">{block.text}</p>
        </Reveal>
      );
    case "list":
      return (
        <RevealGroup className="mt-6 space-y-3">
          {block.items.map((it) => (
            <Reveal key={it} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-kiln" />
              <span className="text-ash">{it}</span>
            </Reveal>
          ))}
        </RevealGroup>
      );
    case "values":
      return (
        <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2">
          {block.items.map((it) => (
            <Reveal key={it.term}>
              <div className="card-soft h-full p-6">
                <h3 className="font-display text-lg font-semibold">{it.term}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      );
    case "people":
      return (
        <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {block.items.map((p) => (
            <Reveal key={p.name}>
              <div className="card-soft flex h-full items-center gap-4 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-kiln to-ember font-display text-sm font-semibold text-white">
                  {p.name.replace(/^(Mr\.|Eng\.|Dr\.)\s/, "").charAt(0)}
                </span>
                <div>
                  <div className="text-sm font-semibold leading-snug">{p.name}</div>
                  <div className="mt-0.5 text-xs text-muted">{p.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      );
    case "standards":
      return (
        <RevealGroup className="mt-8 flex flex-wrap gap-3">
          {block.items.map((s) => (
            <Reveal key={s}>
              <span className="card-soft inline-flex items-center gap-2 px-4 py-2 text-sm font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                {s}
              </span>
            </Reveal>
          ))}
        </RevealGroup>
      );
    case "callout":
      return (
        <Reveal>
          <div className="mt-8 rounded-[var(--radius-card)] border border-kiln/20 bg-kiln/[0.04] p-6">
            {block.review && <ReviewBadge className="mb-3" />}
            <p className="font-display text-lg leading-relaxed text-bone md:text-xl">
              “{block.text}”
            </p>
          </div>
        </Reveal>
      );
    case "contact":
      return (
        <Reveal>
          <div className="card-soft mt-8 grid gap-4 p-6 sm:grid-cols-3">
            <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="group">
              <div className="text-xs uppercase tracking-wider text-muted">Phone</div>
              <div className="mt-1 text-sm font-medium group-hover:text-kiln">{COMPANY.phone}</div>
            </a>
            <a href={`mailto:${COMPANY.email}`} className="group">
              <div className="text-xs uppercase tracking-wider text-muted">Email</div>
              <div className="mt-1 text-sm font-medium group-hover:text-kiln">{COMPANY.email}</div>
            </a>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted">Location</div>
              <div className="mt-1 text-sm font-medium">{COMPANY.location}</div>
            </div>
          </div>
        </Reveal>
      );
  }
}

export function ContentPage({ page }: { page: PageContent }) {
  return (
    <article className="pt-32 pb-28 md:pt-40 md:pb-36">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" />
        <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-kiln/[0.06] blur-3xl" />
        <div className="container-page relative pb-14">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.22em] text-muted">
              <span className="h-px w-8 bg-kiln" />
              {page.eyebrow}
            </span>
          </Reveal>
          <h1 className="font-display mt-5 max-w-4xl text-h1 font-semibold leading-[1.04] text-balance">
            <TextReveal text={page.title} />
          </h1>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ash">{page.intro}</p>
          </Reveal>
          {page.review && (
            <Reveal delay={0.15}>
              <div className="mt-6">
                <ReviewBadge />
                <span className="ml-3 text-xs text-muted">
                  This page contains placeholder content pending client materials.
                </span>
              </div>
            </Reveal>
          )}
        </div>
      </header>

      {/* Body */}
      <motion.div className="container-page mt-12 max-w-3xl">
        {page.blocks.map((block, i) => (
          <BlockView key={i} block={block} />
        ))}
      </motion.div>
    </article>
  );
}
