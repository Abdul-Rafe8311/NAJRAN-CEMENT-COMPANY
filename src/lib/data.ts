/* ============================================================
   CONTENT MODEL — homepage + global navigation.

   SOURCING POLICY
   - Facts come from the official site (najrancement.com) and the
     Saudi Exchange company profile (3002).
   - Items with `review: true` are PLACEHOLDERS to be confirmed by
     the client; they render with a visible "pending review" marker.
   - No company claim, statistic or certification is invented.
   ============================================================ */

export const COMPANY = {
  name: "Najran Cement Company",
  tagline: "Building Trust and Delivering Quality", // VERIFIED
  vision: "To be the best producers of cement in our region.", // VERIFIED
  mission:
    "We are fully committed to provide our loyal customers with a conclusive product of supreme quality at competitive price with on-time delivery for their ultimate cost-effective value additions.", // VERIFIED
  established: 2005, // VERIFIED
  capitalSAR: 150, // VERIFIED — SAR 150 million paid-up capital
  commercialProduction: 2009, // VERIFIED
  exchange: "Saudi Exchange (Tadawul) · 3002", // VERIFIED
  location: "Najran, Kingdom of Saudi Arabia", // VERIFIED
  plant: "Al Mandafan (Sultanah Center), 240 km NE of Najran", // VERIFIED
  grindingUnit: "Aakfah Center, ~70 km from Najran", // VERIFIED
  phone: "+966 017 529 9990", // VERIFIED
  email: "info@najrancement.com", // VERIFIED
};

export type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sub?: string;
  review?: boolean;
};

/* Hero — VERIFIED */
export const HERO_STATS: Stat[] = [
  { value: 20, suffix: "+", label: "Years", sub: "Of operation" },
  { value: 46, suffix: "M+", label: "Tonnes produced", sub: "Cumulative output" },
  { value: 39, suffix: "+", label: "Distribution centers", sub: "Across the region" },
];

/* Impact — VERIFIED */
export const IMPACT_STATS: Stat[] = [
  { value: 3.0, suffix: "M", label: "Tonnes clinker / year", sub: "Annual production capacity" },
  { value: 4.1, suffix: "M", label: "Tonnes cement / year", sub: "Annual grinding capacity" },
  { value: 46, suffix: "M+", label: "Tonnes produced", sub: "Cumulative to date" },
  { value: 39, suffix: "+", label: "Distribution centers", sub: "Regional reach" },
  { value: 20, suffix: "+", label: "Years of operation", sub: "Founded 2005" },
  { value: 5800, suffix: " TPD", label: "Aakfah grinding unit", sub: "Standalone capacity" },
];

export type Product = {
  name: string;
  short: string;
  desc: string;
  upcoming?: boolean;
};

/* Products — VERIFIED list */
export const PRODUCTS: Product[] = [
  {
    name: "Eco-Friendly Cement",
    short: "Turbo",
    desc: "A lower-footprint cement produced with alternative materials and waste recycling.",
    upcoming: true,
  },
  {
    name: "Ordinary Portland Cement",
    short: "Type I · OPC",
    desc: "High-strength cement for structural works, foundations and prestressed concrete.",
  },
  {
    name: "Portland Sulphate Resistant Cement",
    short: "Type V · SRC",
    desc: "Engineered for soils with high sulphate content, dams and tunnels.",
  },
  {
    name: "Portland Pozzolanic Cement",
    short: "PPC",
    desc: "For reinforced buildings, water tanks, finishings and general construction.",
  },
  {
    name: "Lyasah Cement",
    short: "Plaster",
    desc: "Internal and external plastering, roughcasting, block installation and finishing.",
  },
  {
    name: "Lyasah Plus Cement",
    short: "Plaster+",
    desc: "Enhanced plastering performance for superior adhesion and workability.",
  },
];

export type JourneyStep = {
  index: string;
  title: string;
  desc: string;
  accent: string;
};

/* Journey — process narrative grounded in verified facts (navy/teal) */
export const JOURNEY: JourneyStep[] = [
  {
    index: "01",
    title: "Raw Materials",
    desc: "Limestone, clay, sandstone and gypsum — from reserves confirmed by geological survey at Al-Mandan — blended to an exact chemistry.",
    accent: "#1b3a6b",
  },
  {
    index: "02",
    title: "Pyro-Processing",
    desc: "Inside the rotary kiln, raw meal is fired to clinkering temperature (~1,450°C) and transformed into clinker — the heart of cement.",
    accent: "#3f8f7f",
  },
  {
    index: "03",
    title: "Quality Control",
    desc: "ISO, TÜV and SASO-aligned processes verify strength, fineness and consistency — building trust and delivering quality.",
    accent: "#1b3a6b",
  },
  {
    index: "04",
    title: "Distribution",
    desc: "Bagged and bulk cement moves through 39+ distribution centers to projects across the southern region and beyond.",
    accent: "#3f8f7f",
  },
];

export type SustainMetric = { value: number; suffix?: string; label: string; review?: boolean };

/* Sustainability — qualitative claims VERIFIED from Environment / Quality pages */
export const SUSTAIN_POINTS = [
  "Factory sections fitted with the latest emission-control technologies to international standards",
  "Reverse-osmosis water treatment stations reuse purified water for landscape irrigation",
  "Afforestation of surrounding areas with regular environmental monitoring",
  "Reuse of secondary materials and protection of non-renewable natural resources",
];

export const SUSTAIN_METRICS: SustainMetric[] = [
  { value: 0, suffix: "%", label: "CO₂ reduction target — confirm with client", review: true },
  { value: 0, suffix: "", label: "Annual water recycled — confirm with client", review: true },
  { value: 0, suffix: "%", label: "Alternative-fuel mix goal — confirm with client", review: true },
];

export type Application = {
  title: string;
  product: string;
  desc: string;
  hue: string;
};

/* "Where our cement performs" — accurate product use-cases (light panels) */
export const APPLICATIONS: Application[] = [
  {
    title: "Coastal, Dams & Tunnels",
    product: "Type V · SRC",
    desc: "Sulphate-resistant cement for direct contact with high-sulphate soils, dams and tunnels.",
    hue: "from-[#eef3f1] to-white",
  },
  {
    title: "Structural & Foundations",
    product: "Type I · OPC",
    desc: "High-strength Ordinary Portland Cement for structural works and prestressed concrete.",
    hue: "from-[#eef2f7] to-white",
  },
  {
    title: "Reinforced & Water Tanks",
    product: "PPC",
    desc: "Pozzolanic cement for reinforced buildings, water tanks and general construction.",
    hue: "from-[#f1f0f5] to-white",
  },
  {
    title: "Plastering & Finishing",
    product: "Lyasah / Lyasah+",
    desc: "Smooth, consistent plastering cement for interior and exterior finishes.",
    hue: "from-[#eef3f4] to-white",
  },
];

export type Financial = {
  value?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  text?: string;
  review?: boolean;
};

/* Investor facts — VERIFIED */
export const INVESTOR_FACTS: Financial[] = [
  { value: 2005, label: "Founded", text: "Saudi Closed Joint Stock Company" },
  { text: "3002", label: "Listed on Tadawul" },
  { prefix: "SAR ", value: 150, suffix: "M", label: "Paid-up capital", text: "150 million riyals" },
  { value: 2009, label: "Commercial production", text: "Main plant online" },
];

/* Certifications — VERIFIED (TÜV & SASO appear on the Quality Policy page) */
export const CERTIFICATIONS = [
  "ISO Certified",
  "TÜV",
  "SASO",
  "Saudi Authorized Economic Operator (AEO)",
  "Tadawul Listed · 3002",
];

/* Standards the products conform to — VERIFIED from Products page */
export const PRODUCT_STANDARDS = [
  "SASO GSO 1914/2009",
  "SASO ASTM C595/2021",
  "BS EN 197-1:2011",
  "ASTM C150",
  "ASTM C595",
];

/* ============================================================
   GLOBAL NAVIGATION — mega-menu structure mirroring the live site
   ============================================================ */
export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about/history",
    children: [
      { label: "History", href: "/about/history" },
      { label: "Mission & Vision", href: "/about/mission-vision" },
      { label: "Board of Directors", href: "/about/board-of-directors" },
      { label: "Ethics", href: "/about/ethics" },
      { label: "Quality Policy", href: "/about/quality-policy" },
    ],
  },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Products", href: "/products" },
      { label: "Specifications & Standards", href: "/products/specifications" },
    ],
  },
  {
    label: "Services",
    href: "/services/wasel",
    children: [{ label: "Wasel Service", href: "/services/wasel" }],
  },
  {
    label: "Investors",
    href: "/investors/financial-reports",
    children: [
      { label: "Financial Reports", href: "/investors/financial-reports" },
      { label: "General Assembly Minutes", href: "/investors/assembly-minutes" },
      { label: "Board of Directors Reports", href: "/investors/board-reports" },
      { label: "Investor Relations Contact", href: "/investors/contact" },
    ],
  },
  {
    label: "Media",
    href: "/media/news",
    children: [
      { label: "News", href: "/media/news" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    label: "Suppliers",
    href: "/suppliers/become-a-supplier",
    children: [{ label: "Become a Supplier", href: "/suppliers/become-a-supplier" }],
  },
  { label: "Career", href: "/career" },
  {
    label: "Responsibility",
    href: "/social-responsibility/environment",
    children: [
      { label: "Environment", href: "/social-responsibility/environment" },
      { label: "Society", href: "/social-responsibility/society" },
      { label: "Activities", href: "/social-responsibility/activities" },
      { label: "Safety", href: "/social-responsibility/safety" },
    ],
  },
];

/* ============================================================
   GLOBAL REACH — globe markers (Najran + illustrative reach).
   Najran is VERIFIED HQ; the stated objective is to supply the
   southern region and export beyond the Kingdom. Other markers are
   illustrative regional points, not specific facility claims.
   ============================================================ */
export const GLOBE_MARKERS: { location: [number, number]; size: number }[] = [
  { location: [17.49, 44.13], size: 0.1 }, // Najran (HQ)
  { location: [18.22, 42.5], size: 0.05 }, // Asir region
  { location: [21.49, 39.19], size: 0.05 }, // Jeddah
  { location: [24.71, 46.68], size: 0.05 }, // Riyadh
  { location: [26.43, 50.1], size: 0.05 }, // Eastern Province
  { location: [15.55, 48.52], size: 0.05 }, // Yemen (export objective)
];

/* ============================================================
   GALLERY — full-page slideshow of company photography.
   `src` points to /public/gallery/*. Slides without a src render a
   clearly-marked placeholder until the client supplies photos.
   ============================================================ */
export type Slide = { src?: string; title: string; caption?: string };

export const GALLERY: Slide[] = [
  { title: "Production Plant — Al Mandafan", caption: "240 km northeast of Najran", src: "" },
  { title: "Rotary Kiln Line", caption: "Pyro-processing at ~1,450°C", src: "" },
  { title: "Quality Laboratory", caption: "ISO · TÜV · SASO aligned testing", src: "" },
  { title: "Aakfah Grinding Unit", caption: "5,800 TPD standalone capacity", src: "" },
  { title: "Distribution & Dispatch", caption: "39+ distribution centers", src: "" },
];

/* Flat list of homepage in-page anchors (used by footer "explore") */
export const FOOTER_EXPLORE = [
  { label: "Impact", href: "/#impact" },
  { label: "Process", href: "/#journey" },
  { label: "Products", href: "/products" },
  { label: "Sustainability", href: "/#sustainability" },
  { label: "Investors", href: "/investors/financial-reports" },
  { label: "Careers", href: "/career" },
];
