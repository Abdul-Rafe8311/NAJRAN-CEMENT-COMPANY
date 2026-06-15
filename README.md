# Najran Cement — Website Redesign

> **Building Trust and Delivering Quality** — a world-class digital presence for Najran Cement Company.

A complete redesign of [najrancement.com](https://najrancement.com/en/): same company, same facts — a dramatically more premium, cinematic experience. Dark industrial-luxury aesthetic, scroll-driven storytelling, and Awwwards-grade motion, built mobile-first and tuned for Lighthouse 95+.

---

## 1. Creative direction

The cement industry sells **permanence and strength**. Instead of the generic blue-corporate template, this design leans into a **dark industrial-luxury** world: near-black canvas, concrete greys, and a signature **"kiln glow"** amber — the molten clinker at ~1,450°C, the one genuinely cinematic moment in cement-making. Apple product page meets a foundry.

- **Premium · Futuristic · Industrial elegance · Confident · Minimal but rich.**
- Motion is a feature, not decoration — every animation advances the story.

## 2. Content integrity (important)

This is a **presentation** redesign — the company's knowledge stays intact. All copy was rewritten only for tone and clarity; **no facts were invented**.

- **Verified** content (sourced from the official site + Saudi Exchange profile `3002`) is hard-coded in `src/lib/data.ts` and tagged `VERIFIED`.
- **Unverified figures** (paid-up capital, CO₂ targets, water-recycling volumes) are rendered as `—` with a visible **"Pending review"** badge (`src/components/ui/review-badge.tsx`). Replace and remove the flag once the client confirms.
- The old "Projects" idea is reframed as **Applications** — accurate product use-cases (SRC → marine, OPC → structural…) rather than invented contract claims. Swap in named case studies when approved.

Search `review: true` and `// VERIFIED` / `// confirm` in `data.ts` to find everything needing client sign-off.

## 3. Tech stack

| Concern | Choice |
|---|---|
| Framework | **Next.js 15** (App Router) + **React 19** |
| Language | **TypeScript** (strict) |
| Styling | **Tailwind CSS v4** (CSS-first `@theme` tokens) |
| Component motion | **Framer Motion** |
| Scroll choreography | **GSAP + ScrollTrigger** (pinned horizontal journey) |
| Smooth scroll | **Lenis** (RAF-synced with GSAP) |
| Background depth | Custom **canvas** ember/dust field (no WebGL) |

> React Three Fiber was intentionally deferred. The hero depth is achieved with a cheap 2D canvas + CSS/parallax to protect the performance budget. R3F is a clean drop-in for the kiln scene later — see roadmap.

## 4. Folder structure

```
najran-cement/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # fonts, metadata/SEO, SmoothScroll provider
│   │   ├── page.tsx            # homepage composition
│   │   └── globals.css         # design system: @theme tokens + utilities
│   ├── components/
│   │   ├── providers/
│   │   │   └── smooth-scroll.tsx   # Lenis ↔ GSAP ticker sync
│   │   ├── layout/
│   │   │   ├── preloader.tsx       # cinematic 0→100 loading sequence
│   │   │   ├── navbar.tsx          # adaptive blur nav + mobile menu
│   │   │   └── footer.tsx
│   │   ├── sections/               # one file per homepage section
│   │   │   ├── hero.tsx
│   │   │   ├── impact.tsx
│   │   │   ├── journey.tsx         # GSAP pinned horizontal scroll
│   │   │   ├── products.tsx
│   │   │   ├── sustainability.tsx
│   │   │   ├── applications.tsx    # interactive showcase
│   │   │   ├── investors.tsx
│   │   │   ├── careers.tsx
│   │   │   └── final-cta.tsx
│   │   └── ui/                     # reusable motion primitives
│   │       ├── counter.tsx         # spring number counter
│   │       ├── reveal.tsx          # fade/rise/de-blur + stagger group
│   │       ├── text-reveal.tsx     # word-by-word mask reveal
│   │       ├── magnetic.tsx        # cursor-follow wrapper
│   │       ├── button.tsx          # magnetic CTA w/ sweep fill
│   │       ├── section-heading.tsx
│   │       ├── particle-field.tsx  # canvas ember field
│   │       └── review-badge.tsx    # placeholder marker
│   └── lib/
│       ├── data.ts                 # single source of truth (CONTENT)
│       └── utils.ts                # cn() class merger
└── (config: next/ts/tailwind/postcss)
```

## 5. Design system (`globals.css` `@theme`)

- **Color** — `void #0A0A0B`, `coal #121214`, `line #26262B`, text `bone/ash/muted`, brand `kiln #FF7A2D → ember #E8431F`, cool `concrete #9FB3C8`.
- **Type** — Space Grotesk (display) + Inter (body) via `next/font`; fluid `clamp()` scale (`--text-display/h1/h2/h3`).
- **Motion tokens** — `--ease-out-expo`, `--ease-in-out-quint`.
- **Utilities** — `.text-kiln-grad`, `.bg-grid` (masked hairline grid), `.grain` (SVG film grain), `.glow-kiln`, `.container-page`.
- **Spacing** — 8pt rhythm; `--radius-card: 18px`.

## 6. Animation architecture

| Pattern | Where | Implementation |
|---|---|---|
| Loading sequence | Preloader | RAF count 0→100, panel lifts on exit |
| Hero line reveal | Hero | masked `y:110%→0` per line, staggered |
| Parallax + scale-out | Hero / Sustainability / CTA | `useScroll` + `useTransform` |
| Mouse-responsive depth | Hero | canvas ember field w/ cursor repulsion |
| Number counters | Impact / Investors / Hero | `useSpring` on in-view |
| Scroll storytelling | Journey | **GSAP ScrollTrigger pin + horizontal scrub** |
| Staggered entrances | All grids | `RevealGroup` / `staggerChildren` |
| Text reveal | Headings / CTA | word-by-word clip mask |
| Magnetic interactions | Buttons | spring-tracked cursor offset |
| Page-wide smoothness | Global | Lenis on the GSAP ticker |

**Performance & a11y guardrails:** every heavy effect checks `prefers-reduced-motion`; the canvas pauses off-screen via `IntersectionObserver` and caps DPR at 2; the GSAP horizontal journey degrades to a vertical stack under 768px and for reduced-motion users; reveals are `once: true`.

## 7. Page-by-page (homepage sections)

1. **Hero** — full-screen, ember canvas, masked headline, animated verified stats (20+ yrs · 46M+ t · 39+ centers), magnetic CTAs.
2. **Impact** — six verified capacity/scale counters in a hairline grid.
3. **Manufacturing Journey** — pinned horizontal scroll: Raw Materials → Pyro-Processing → Quality Control → Distribution.
4. **Products** — the six real cement grades (incl. upcoming Eco-Friendly "Turbo"), hover-lift cards.
5. **Sustainability** — verified qualitative commitments + metric cards flagged for client figures.
6. **Applications** — interactive product-fit showcase with animated preview panel.
7. **Investors** — verified facts (founded 2005, Tadawul `3002`, commercial production 2009) + certifications marquee.
8. **Careers** — talent pillars, magnetic CTA.
9. **Final CTA / Contact** — scaling display headline, real phone/email.

## 8. Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start
```

## 9. Implementation roadmap

- [x] **Phase 1 — Foundation:** design system, tokens, smooth scroll, motion primitives.
- [x] **Phase 2 — Homepage:** all nine sections, verified content model, placeholders flagged.
- [ ] **Phase 3 — Content sign-off:** client confirms `review: true` figures; add named case studies; localize **Arabic / RTL**.
- [ ] **Phase 4 — Inner pages:** About/History, full Products detail, Sustainability report, Investor Relations, Careers listings, Contact + Wasel service — reusing the section/ui kit.
- [ ] **Phase 5 — Depth upgrade:** optional React-Three-Fiber kiln scene swapped behind the existing canvas slot.
- [ ] **Phase 6 — Hardening:** CMS wiring, image optimization (`next/image` + real photography), `next-sitemap`, JSON-LD `Organization` schema, analytics, Lighthouse/axe CI gate.

---

*Figures and certifications reflect the live site and Saudi Exchange profile as of June 2026. Items marked “Pending review” must be confirmed by Najran Cement before launch.*
