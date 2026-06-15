/* ============================================================
   INNER-PAGE CONTENT REGISTRY
   Keyed by slug path (e.g. "about/history"). Rendered by the
   shared <ContentPage> template via the [...slug] route.

   All prose is sourced from najrancement.com and rewritten only
   for tone/clarity. Pages without available source content are
   marked `review: true` (placeholder) and clearly flagged in the UI.
   ============================================================ */

export type Block =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "values"; items: { term: string; desc: string }[] }
  | { type: "people"; items: { name: string; role: string }[] }
  | { type: "standards"; items: string[] }
  | { type: "contact" }
  | { type: "callout"; text: string; review?: boolean };

export type PageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  blocks: Block[];
  review?: boolean;
};

export const PAGES: Record<string, PageContent> = {
  /* ---------------- ABOUT ---------------- */
  "about/history": {
    eyebrow: "About",
    title: "Our History",
    intro:
      "From a single geological survey to one of the southern region's most dependable cement producers.",
    blocks: [
      {
        type: "paragraph",
        text: "Najran Cement Company was established in 2005 as a Saudi closed joint stock company with a paid-up capital of one hundred and fifty million riyals. The company obtained the first mining license under the new mining system approved by the late King Abdullah bin Abdulaziz to develop the cement industry in the region.",
      },
      { type: "heading", text: "Facilities" },
      {
        type: "paragraph",
        text: "The primary manufacturing plant is located in Al Mandafan, part of the Sultanah Center, approximately 240 km northeast of Najran city. A separate cement grinding unit operates at the Aakfah Center, roughly 70 km from Najran along the route toward the Asir region.",
      },
      { type: "heading", text: "Site Selection" },
      {
        type: "paragraph",
        text: "The founding concept emerged after extensive research to verify the availability of suitable raw materials. Analysis confirmed the presence of the essential resources at Al-Mandan — limestone, clay, sandstone and gypsum — supported by data from the Ministry of Mineral Wealth, validating the site for the company's operations.",
      },
    ],
  },

  "about/mission-vision": {
    eyebrow: "About",
    title: "Mission & Vision",
    intro: "Why we exist, and the promise we make to every customer.",
    blocks: [
      { type: "heading", text: "Vision" },
      { type: "callout", text: "To be the best producers of cement in our region." },
      { type: "heading", text: "Mission" },
      {
        type: "callout",
        text: "We are fully committed to provide our loyal customers with a conclusive product of supreme quality at competitive price with on-time delivery for their ultimate cost-effective value additions.",
      },
    ],
  },

  "about/board-of-directors": {
    eyebrow: "About",
    title: "Board of Directors",
    intro: "The leadership stewarding Najran Cement's long-term performance.",
    blocks: [
      {
        type: "people",
        items: [
          { name: "Mr. Fahd Abdullah Abdulaziz Al Rajhi", role: "Chairman of the Board" },
          { name: "Mr. Majed Ali Hussain bin Musallam", role: "Vice Chairman" },
          { name: "Mr. Ali Hussain Berman Al Yami", role: "Member" },
          { name: "Mr. Ziyad Ibrahim Abdullah Aljared", role: "Member" },
          { name: "Mr. Hussein Ahmed Saleh Qahat", role: "Member" },
          { name: "Mr. Majid Ahmed Ibrahim Al-Swaigh", role: "Member" },
          { name: "Mr. Abdullah Jaber Ali Al-Faifi", role: "Member" },
          { name: "Mr. Abdullah Mansour Suleiman Al-Shagair", role: "Member" },
          { name: "Eng. Ataa Abdulqader Saleh Bakkar", role: "Chief Executive Officer" },
        ],
      },
    ],
  },

  "about/ethics": {
    eyebrow: "About",
    title: "Ethics & Values",
    intro: "Ten core values guide every decision and every dealing at Najran Cement.",
    blocks: [
      {
        type: "values",
        items: [
          { term: "Excellence", desc: "Leadership in all products and services offered to our customers." },
          { term: "Client Focus", desc: "Products and services that exceed the expectations of customers and stakeholders." },
          { term: "Team Spirit", desc: "Teamwork, fair competition, innovation and excellence in performance." },
          { term: "Confidence", desc: "Partnership built on trust and cooperation between management and employees." },
          { term: "Loyalty", desc: "Pride in being part of the company, supporting economic goals and environmental protection." },
          { term: "Human Resources", desc: "Employees are our most valuable asset, deserving an environment for learning, innovation and growth." },
          { term: "Ethical Conduct", desc: "Adherence to the standards and ethics of professional conduct in all our dealings." },
          { term: "Honesty", desc: "Truthfulness, sincerity and transparency across all business interactions." },
          { term: "Social Responsibility", desc: "Communication and cooperation with our local community, and compliance with laws and regulations." },
          { term: "Corporate Commitment", desc: "Preserving company assets and avoiding any action that could cause organizational harm." },
        ],
      },
    ],
  },

  "about/quality-policy": {
    eyebrow: "About",
    title: "Quality Policy",
    intro:
      "Customer satisfaction, employee wellbeing, environmental protection, continual improvement, business ethics and excellence are the cardinal principles of our corporate philosophy.",
    blocks: [
      {
        type: "paragraph",
        text: "We operate an integrated management strategy addressing quality, environment and safety together. Our policy commits us to:",
      },
      {
        type: "list",
        items: [
          "Implementing environmentally responsible technology and procedures",
          "Continually developing the skills and expertise of our people",
          "Waste reduction, recycling and responsible disposal",
          "Conservation of natural resources",
          "Adherence to relevant standards and regulatory requirements",
          "Performance measurement, monitoring and systematic improvement",
          "Open communication with all stakeholders",
        ],
      },
      {
        type: "callout",
        text: "Our standards are reinforced by TÜV and SASO credentials and Saudi Authorized Economic Operator (AEO) status.",
      },
    ],
  },

  /* ---------------- PRODUCTS ---------------- */
  products: {
    eyebrow: "Products",
    title: "Our Cement",
    intro: "A complete portfolio engineered for the Kingdom's most demanding construction.",
    blocks: [
      { type: "heading", text: "Type I — Ordinary Portland Cement (OPC)" },
      {
        type: "paragraph",
        text: "Ordinary high-strength cement designed for structural works, foundations and prestressed concrete industries, delivering high durability and optimal strength.",
      },
      { type: "heading", text: "Type V — Portland Sulphate Resistant Cement (SRC)" },
      {
        type: "paragraph",
        text: "High-strength sulphate-resistant cement for applications in direct contact with soils of high sulphate content, as well as dams and tunnels.",
      },
      { type: "heading", text: "Portland Pozzolanic Cement (PPC)" },
      {
        type: "paragraph",
        text: "Used in reinforced buildings, water tanks, finishings and general construction and building works.",
      },
      { type: "heading", text: "Lyasah & Lyasah Plus Cement" },
      {
        type: "paragraph",
        text: "For internal and external plastering, roughcasting, block installation and finishing applications.",
      },
      { type: "heading", text: "Eco-Friendly Cement — Turbo (upcoming)" },
      {
        type: "paragraph",
        text: "A lower-footprint cement produced with alternative materials and waste recycling, reducing carbon impact.",
      },
    ],
  },

  "products/specifications": {
    eyebrow: "Products",
    title: "Specifications & Standards",
    intro: "Every product conforms to recognized Saudi, British and American standards.",
    blocks: [
      {
        type: "standards",
        items: [
          "SASO GSO 1914/2009",
          "SASO ASTM C595/2021",
          "BS EN 197-1:2011",
          "ASTM C150",
          "ASTM C595",
        ],
      },
      {
        type: "callout",
        text: "Detailed technical datasheets per product are available on request from our engineering team.",
        review: true,
      },
    ],
  },

  /* ---------------- SERVICES ---------------- */
  "services/wasel": {
    eyebrow: "Services",
    title: "Wasel Service",
    intro:
      "The first-of-its-kind app among Saudi cement companies — an integrated electronic service for selling and delivering cement to business clients.",
    blocks: [
      {
        type: "paragraph",
        text: "Wasel streamlines cement purchasing for corporate customers: order and delivery through automated systems, a direct customer relationship without intermediaries, and convenient, professional transactions.",
      },
      { type: "heading", text: "How it works" },
      {
        type: "paragraph",
        text: "Download the Wasel app (Android and iOS), then place cement orders digitally. The platform offers real-time order tracking, 24/7 customer support and a dedicated fleet for rapid delivery. Orders can be scheduled immediately or for the future, with each delivery documented by a digital code for secure verification.",
      },
      { type: "heading", text: "Features" },
      {
        type: "list",
        items: [
          "One-click ordering",
          "Intelligent digital infrastructure for a seamless experience",
          "Around-the-clock information availability",
          "Direct company-to-customer communication",
          "Delivery confirmation through digital coding",
        ],
      },
      {
        type: "paragraph",
        text: "Register through the service portal, then download Wasel from Google Play or the App Store.",
      },
    ],
  },

  /* ---------------- INVESTORS ---------------- */
  "investors/financial-reports": {
    eyebrow: "Investors",
    title: "Financial Reports",
    intro:
      "Najran Cement is listed on the Saudi Exchange (Tadawul) under symbol 3002. Quarterly and annual financial statements are published here.",
    blocks: [
      {
        type: "callout",
        text: "Financial report documents (PDF) to be migrated from the current site / Tadawul. Pending client upload.",
        review: true,
      },
      { type: "contact" },
    ],
    review: true,
  },

  "investors/assembly-minutes": {
    eyebrow: "Investors",
    title: "General Assembly Minutes",
    intro: "Minutes and outcomes of Najran Cement's general assembly meetings.",
    blocks: [
      {
        type: "callout",
        text: "Assembly minutes documents to be migrated from the current site. Pending client upload.",
        review: true,
      },
    ],
    review: true,
  },

  "investors/board-reports": {
    eyebrow: "Investors",
    title: "Board of Directors Reports",
    intro: "Annual reports of the Board of Directors.",
    blocks: [
      {
        type: "callout",
        text: "Board reports to be migrated from the current site. Pending client upload.",
        review: true,
      },
    ],
    review: true,
  },

  "investors/contact": {
    eyebrow: "Investors",
    title: "Investor Relations Contact",
    intro: "For investor enquiries, please reach our team directly.",
    blocks: [{ type: "contact" }],
  },

  /* ---------------- MEDIA ---------------- */
  "media/news": {
    eyebrow: "Media Center",
    title: "News",
    intro: "Announcements, updates and stories from Najran Cement.",
    blocks: [
      {
        type: "callout",
        text: "News articles to be migrated from the current site / connected to a CMS. Pending client content.",
        review: true,
      },
    ],
    review: true,
  },

  /* ---------------- SUPPLIERS ---------------- */
  "suppliers/become-a-supplier": {
    eyebrow: "Suppliers",
    title: "Become a Supplier",
    intro: "Join the Najran Cement supply network.",
    blocks: [
      {
        type: "paragraph",
        text: "We partner with reliable suppliers across raw materials, equipment, logistics and services. To register your interest, contact our procurement team.",
      },
      {
        type: "callout",
        text: "Supplier registration form / portal to be confirmed with the client.",
        review: true,
      },
      { type: "contact" },
    ],
  },

  /* ---------------- CAREER ---------------- */
  career: {
    eyebrow: "Careers",
    title: "Build something that lasts",
    intro:
      "We look for people who take pride in precision — engineers, operators and leaders who want their work to endure for generations.",
    blocks: [
      {
        type: "paragraph",
        text: "Najran Cement treats its people as its most valuable asset, providing an environment for learning, innovation and continuous development, with health insurance and social security coverage.",
      },
      {
        type: "callout",
        text: "Current openings and the application form to be connected. Pending client content / ATS.",
        review: true,
      },
      { type: "contact" },
    ],
  },

  /* ---------------- SOCIAL RESPONSIBILITY ---------------- */
  "social-responsibility/environment": {
    eyebrow: "Social Responsibility",
    title: "Environment",
    intro:
      "Our environmental approach centers on the application of domestic and international environmental laws across every stage of production.",
    blocks: [
      { type: "heading", text: "Emission control & technology" },
      {
        type: "paragraph",
        text: "Our factory sections are equipped with the latest control technologies for emissions and protecting the environment, aligned with international standards. We prioritize afforestation of surrounding areas and conduct regular monitoring and measurement of manufacturing impacts.",
      },
      { type: "heading", text: "Resource & water management" },
      {
        type: "paragraph",
        text: "We focus on upgrading environmental efficiency and protecting non-renewable natural resources while reusing secondary materials. Reverse-osmosis stations treat and purify water for landscape irrigation, operating within regulatory compliance for water reuse.",
      },
      {
        type: "callout",
        text: "We continuously provide the resources needed to perform manufacturing safely, protecting people and the environment on an ongoing basis.",
      },
    ],
  },

  "social-responsibility/society": {
    eyebrow: "Social Responsibility",
    title: "Society",
    intro:
      "We take it upon ourselves to be one of the main pillars in the region, supporting social, charitable, cultural and sports activities.",
    blocks: [
      {
        type: "values",
        items: [
          { term: "Charitable work", desc: "A principal donor to regional charities, providing annual financial support." },
          { term: "Cultural & tourism", desc: "Primary sponsor of numerous cultural and tourism events across the region each year." },
          { term: "Sports", desc: "A longstanding tradition of backing sports clubs in the area." },
          { term: "Arts & literature", desc: "Support for literary organizations, cultural societies and arts institutions." },
        ],
      },
    ],
  },

  "social-responsibility/activities": {
    eyebrow: "Social Responsibility",
    title: "Activities",
    intro: "Community programs, sponsorships and events supported by Najran Cement.",
    blocks: [
      {
        type: "callout",
        text: "Activities gallery and event highlights to be migrated from the current site. Pending client content.",
        review: true,
      },
    ],
    review: true,
  },

  "social-responsibility/safety": {
    eyebrow: "Social Responsibility",
    title: "Safety",
    intro:
      "Occupational health and safety is integral to our business. We treat our employees as valuable assets and maintain comprehensive health insurance and social security coverage.",
    blocks: [
      { type: "heading", text: "Our commitments" },
      {
        type: "paragraph",
        text: "We are committed to protecting the health of our employees and to continually improving health and safety measures — preventing workplace accidents and setting measurable environmental health and occupational safety objectives.",
      },
      { type: "heading", text: "How we deliver it" },
      {
        type: "paragraph",
        text: "We incorporate technical expertise into every aspect of environmental, occupational health and safety across our services and products. Management maintains direct, continuous contact with everyone involved in our operations to ensure understanding of and compliance with safety standards.",
      },
      {
        type: "paragraph",
        text: "We adhere to cement-manufacturing standards and all applicable legal requirements, review our policies regularly, and systematically address risk while delivering value to stakeholders.",
      },
    ],
  },
};

export const PAGE_SLUGS = Object.keys(PAGES);
