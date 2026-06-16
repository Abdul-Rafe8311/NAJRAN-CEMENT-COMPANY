/* ============================================================
   KNOWLEDGE BASE for the AI assistant (RAG retrieval layer).

   Knowledge is assembled from the site's content files
   (data.ts, pages.ts, posts.ts) — NOT hardcoded in the UI — so it
   stays in sync with the website and can later be extended with
   PDFs / CMS content by adding sources to `buildChunks()`.
   ============================================================ */

import {
  COMPANY,
  PRODUCTS,
  PRODUCT_STANDARDS,
  CERTIFICATIONS,
  HERO_STATS,
  IMPACT_STATS,
  SUSTAIN_POINTS,
  INVESTOR_FACTS,
} from "./data";
import { PAGES, type Block } from "./pages";
import { ACTIVITIES } from "./posts";

export type Chunk = { id: string; title: string; text: string; source: string };

function blockToText(b: Block): string {
  switch (b.type) {
    case "heading":
    case "paragraph":
      return b.text;
    case "media":
      return [b.heading, ...b.paras].filter(Boolean).join(". ");
    case "columns":
      return b.items.map((c) => `${c.heading}: ${c.body.join(" ")}`).join(" ");
    case "list":
    case "standards":
      return b.items.join("; ");
    case "values":
      return b.items.map((v) => `${v.term}: ${v.desc}`).join(" ");
    case "people":
      return b.items.map((p) => `${p.name} — ${p.role}`).join("; ");
    case "table":
      return [b.columns.join(" | "), ...b.rows.map((r) => r.join(" | "))].join("; ");
    case "callout":
      return b.text;
    default:
      return "";
  }
}

let CACHE: Chunk[] | null = null;

export function buildChunks(): Chunk[] {
  if (CACHE) return CACHE;
  const chunks: Chunk[] = [];

  // Company overview
  chunks.push({
    id: "company",
    title: "Company Overview",
    source: "Company profile",
    text: `${COMPANY.name}. Tagline: ${COMPANY.tagline}. Vision: ${COMPANY.vision} Mission: ${COMPANY.mission} Established ${COMPANY.established} as a Saudi Closed Joint Stock Company with paid-up capital of SAR ${COMPANY.capitalSAR} million. Commercial production began in ${COMPANY.commercialProduction}. Listed on ${COMPANY.exchange}. Located in ${COMPANY.location}. Main plant: ${COMPANY.plant}. Grinding unit: ${COMPANY.grindingUnit}. Phone: ${COMPANY.phone}. Email: ${COMPANY.email}.`,
  });

  // Scale / capacity
  chunks.push({
    id: "scale",
    title: "Scale & Capacity",
    source: "Company figures",
    text: `Key figures: ${[...HERO_STATS, ...IMPACT_STATS]
      .map((s) => `${s.prefix ?? ""}${s.value}${s.suffix ?? ""} ${s.label} (${s.sub ?? ""})`)
      .join("; ")}.`,
  });

  // Products
  chunks.push({
    id: "products",
    title: "Products & Cement Types",
    source: "Products",
    text: `Najran Cement products: ${PRODUCTS.map(
      (p) => `${p.name} (${p.short})${p.upcoming ? " [upcoming]" : ""}: ${p.desc}`
    ).join(" ")} Products conform to standards: ${PRODUCT_STANDARDS.join(", ")}.`,
  });

  // Certifications
  chunks.push({
    id: "certifications",
    title: "Certifications",
    source: "Certifications",
    text: `Certifications and standards: ${CERTIFICATIONS.join(", ")}.`,
  });

  // Sustainability
  chunks.push({
    id: "sustainability",
    title: "Sustainability",
    source: "Sustainability",
    text: `Sustainability initiatives: ${SUSTAIN_POINTS.join("; ")}.`,
  });

  // Investors
  chunks.push({
    id: "investors",
    title: "Investor Information",
    source: "Investors",
    text: `Investor facts: ${INVESTOR_FACTS.map(
      (f) => `${f.label}: ${f.prefix ?? ""}${f.value ?? f.text ?? ""}${f.suffix ?? ""}`
    ).join("; ")}.`,
  });

  // All content pages
  for (const [slug, page] of Object.entries(PAGES)) {
    const text = page.blocks.map(blockToText).filter(Boolean).join(" ");
    chunks.push({
      id: `page:${slug}`,
      title: page.title,
      source: page.title,
      text: `${page.title}. ${page.intro} ${text}`,
    });
  }

  // Activities / news
  for (const post of ACTIVITIES) {
    chunks.push({
      id: `post:${post.slug}`,
      title: post.title,
      source: "Activities",
      text: `${post.title}. ${post.body.join(" ")}`,
    });
  }

  CACHE = chunks;
  return chunks;
}

const STOP = new Set(
  "the a an of and or to in on for with is are was were be been do does what which who how when where why our your their this that as at by from".split(
    " "
  )
);

/** Lightweight keyword retrieval — returns the top-k relevant chunks. */
export function retrieve(query: string, k = 5): Chunk[] {
  const chunks = buildChunks();
  const terms = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOP.has(t));

  if (terms.length === 0) return chunks.slice(0, 3);

  const scored = chunks.map((c) => {
    const hay = `${c.title} ${c.text}`.toLowerCase();
    let score = 0;
    for (const t of terms) {
      const inTitle = c.title.toLowerCase().includes(t);
      const count = hay.split(t).length - 1;
      score += count + (inTitle ? 3 : 0);
    }
    return { c, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((s) => s.c);
}

export function buildContext(query: string, k = 5): { context: string; sources: string[] } {
  const top = retrieve(query, k);
  const context = top.map((c, i) => `[${i + 1}] ${c.title}\n${c.text}`).join("\n\n");
  const sources = [...new Set(top.map((c) => c.source))];
  return { context, sources };
}
