"use client";

import Image from "next/image";
import Link from "next/link";
import type { Block, PageContent } from "@/lib/pages";
import { COMPANY } from "@/lib/data";
import { Reveal, RevealGroup } from "@/components/ui/reveal";
import { TextReveal } from "@/components/ui/text-reveal";
import { ReviewBadge } from "@/components/ui/review-badge";
import { SupplierForm } from "./supplier-form";
import { IRContact } from "./ir-contact";
import { REPORTS } from "@/lib/reports";
import { cn } from "@/lib/utils";

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "heading":
      return (
        <Reveal>
          <h2 className="font-display mt-12 text-h3 font-semibold text-bone first:mt-0">{block.text}</h2>
        </Reveal>
      );
    case "paragraph":
      return (
        <Reveal>
          <p className="mt-4 text-base leading-relaxed text-ash md:text-lg">{block.text}</p>
        </Reveal>
      );
    case "media": {
      const isProduct = !!block.heading;
      return (
        <Reveal>
          <div className="mt-12 grid gap-7 first:mt-0 md:grid-cols-[220px_1fr] md:items-start">
            <div
              className={cn(
                "overflow-hidden rounded-[var(--radius-card)] border border-line",
                isProduct ? "bg-coal p-4" : "shadow-soft"
              )}
            >
              <Image
                src={block.src}
                alt={block.alt}
                width={isProduct ? 440 : 1600}
                height={isProduct ? 660 : 800}
                className={cn("h-auto w-full", isProduct ? "object-contain" : "object-cover")}
              />
            </div>
            <div>
              {block.heading && (
                <h3 className="font-display text-xl font-semibold text-kiln md:text-2xl">
                  {block.heading}
                </h3>
              )}
              <div className={cn("space-y-4", block.heading && "mt-4")}>
                {block.paras.map((p, i) => (
                  <p
                    key={i}
                    className={cn(
                      "leading-relaxed",
                      isProduct && i === 0 ? "font-semibold text-bone" : "text-ash md:text-lg"
                    )}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      );
    }
    case "columns":
      return (
        <RevealGroup className="mt-8 grid gap-10 md:grid-cols-2">
          {block.items.map((c) => (
            <Reveal key={c.heading} className="rounded-[var(--radius-card)] border border-line bg-coal p-8 text-center">
              <h3 className="font-display text-2xl font-semibold text-kiln">{c.heading}</h3>
              <div className="mt-4 space-y-3">
                {c.body.map((p, i) => (
                  <p key={i} className="leading-relaxed text-ash">{p}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      );
    case "list":
      return (
        <RevealGroup className="mt-6 space-y-3">
          {block.items.map((it) => (
            <Reveal key={it} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-kiln" />
              <span className="text-ash md:text-lg">{it}</span>
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
                <h3 className="font-display text-lg font-semibold text-kiln">{it.term}</h3>
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
    case "table":
      return (
        <Reveal>
          <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] border border-line shadow-soft">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-kiln to-[#24487c] text-white">
                  {block.columns.map((c) => (
                    <th key={c} className="px-5 py-3.5 text-left font-medium">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((r, ri) => (
                  <tr key={ri} className="border-t border-line odd:bg-white even:bg-coal">
                    {r.map((cell, ci) => (
                      <td key={ci} className="px-5 py-3.5 text-bone">{cell || "—"}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      );
    case "cta":
      return (
        <Reveal>
          <div className="mt-10">
            <Link
              href={block.href}
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-kiln to-ember px-8 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              {block.label}
              <Arrow />
            </Link>
          </div>
        </Reveal>
      );
    case "form":
      return <SupplierForm />;
    case "ircontact":
      return <IRContact />;
    case "reports": {
      const list = REPORTS[block.category];
      const years = [...new Set(list.map((r) => r.year))];
      return (
        <div className="mt-8 space-y-10">
          {years.map((y) => (
            <Reveal key={y}>
              <h3 className="font-display text-xl font-semibold text-kiln">{y}</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {list
                  .filter((r) => r.year === y)
                  .map((r) => (
                    <div
                      key={r.file}
                      className="flex items-center justify-between gap-3 rounded-[var(--radius-card)] border border-line bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-kiln/10 text-kiln">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                            <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="truncate text-sm font-medium text-bone">{r.label}</span>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <a
                          href={r.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-bone transition-colors hover:border-kiln/60 hover:text-kiln"
                        >
                          View
                        </a>
                        <a
                          href={r.file}
                          download
                          className="rounded-full bg-gradient-to-r from-kiln to-ember px-3.5 py-1.5 text-xs font-medium text-white transition-transform hover:scale-[1.03]"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
            </Reveal>
          ))}
        </div>
      );
    }
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
    case "callout":
      return (
        <Reveal>
          <div className="mt-8 rounded-[var(--radius-card)] border border-kiln/20 bg-kiln/[0.04] p-6">
            {block.review && <ReviewBadge className="mb-3" />}
            <p className="font-display text-lg leading-relaxed text-bone md:text-xl">“{block.text}”</p>
          </div>
        </Reveal>
      );
  }
}

export function ContentPage({ page }: { page: PageContent }) {
  return (
    <article className="pb-28 md:pb-36">
      {/* Colored industrial banner */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/plant-full.jpg" alt="" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1c36]/95 via-[#13294a]/92 to-[#1b3a6b]/88" />
        </div>
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.15]" />
        <div className="container-page relative pt-36 pb-16 md:pt-44 md:pb-20">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.22em] text-white/70">
              <span className="h-px w-8 bg-ember" />
              {page.eyebrow}
            </span>
          </Reveal>
          <h1 className="font-display mt-5 max-w-4xl text-h1 font-semibold leading-[1.04] text-balance text-white">
            <TextReveal text={page.title} />
          </h1>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{page.intro}</p>
          </Reveal>
          {page.review && (
            <Reveal delay={0.15}>
              <div className="mt-6 flex items-center gap-3">
                <ReviewBadge />
                <span className="text-xs text-white/60">Placeholder content pending client materials.</span>
              </div>
            </Reveal>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="container-page mt-14 max-w-4xl">
        {page.blocks.map((block, i) => (
          <BlockView key={i} block={block} />
        ))}
      </div>
    </article>
  );
}
