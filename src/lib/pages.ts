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
  | { type: "media"; src: string; alt: string; heading?: string; paras: string[] }
  | { type: "columns"; items: { heading: string; body: string[] }[] }
  | { type: "list"; items: string[] }
  | { type: "values"; items: { term: string; desc: string }[] }
  | { type: "people"; items: { name: string; role: string }[] }
  | { type: "standards"; items: string[] }
  | { type: "table"; columns: string[]; rows: string[][] }
  | { type: "cta"; label: string; href: string }
  | { type: "form" }
  | { type: "reports"; category: "financial" | "assembly" | "board" }
  | { type: "ircontact" }
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
    title: "History",
    intro:
      "From a single geological survey to one of the southern region's most dependable cement producers.",
    blocks: [
      {
        type: "media",
        src: "/images/plant-full.jpg",
        alt: "Najran Cement production plant",
        paras: [
          "Najran Cement Company was established in 2005 as a Saudi shareholder company closed with a capital of one hundred and fifty million riyals. It obtained the first mining license according to the new mining system approved by the late King Abdullah bin Abdul Aziz to establish a project for the cement industry in the region.",
          "The project includes the main plant located in Al Mandafan affiliated to Sultanah Center; 240 km north east of Najran city as well as a separate unit for grinding cement which is located at the Aakfah center at about 70 km from Najran city on the road leading to the Asir area.",
        ],
      },
      {
        type: "paragraph",
        text: "The founding idea came across the mind after several studies and surveys to ascertain the presence of raw materials suitable for the cement industry.",
      },
      {
        type: "paragraph",
        text: "Based on the positive results obtained from the results of the analysis and description of the raw materials and the use of the information provided by the Ministry of Mineral wealth, the site was detected in Al-Mandan where it contains most of the necessary raw materials in the cement industry such as limestone, clay, sandstone and gypsum.",
      },
    ],
  },

  "about/mission-vision": {
    eyebrow: "About",
    title: "Mission & Vision",
    intro: "Why we exist, and the promise we make to every customer.",
    blocks: [
      {
        type: "columns",
        items: [
          {
            heading: "Our Vision",
            body: ["To be the best producers of cement in our region."],
          },
          {
            heading: "Our Mission",
            body: [
              "We are fully committed to provide our loyal customers with:",
              "“A conclusive product of supreme quality at competitive price with on-time delivery for their ultimate cost effective value additions”.",
            ],
          },
        ],
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
    title: "Ethics",
    intro: "The company has a set of values that govern the work performance, namely:",
    blocks: [
      {
        type: "values",
        items: [
          { term: "Excellence", desc: "The quest for the company's leadership in all its products and services offered to their customers." },
          { term: "Focusing on the client", desc: "Providing products and services that would exceed the expectations of both; our customers and our stakeholders from inside and outside the company." },
          { term: "Team Spirit", desc: "Teamwork, fair competition, innovation and excellence in performance." },
          { term: "Confidence", desc: "Building a partnership based on trust and cooperation between the management team and employees in the company's various managerial and technical positions." },
          { term: "Loyalty", desc: "Taking pride in being part of the company and its main role in supporting the economical objectives along with reserving and protecting nature." },
          { term: "Taking pride in our Human Resources", desc: "As it is considered as the most valuable asset we have. We should also provide it with a proper environment for learning, innovation, and constant development on both the personal level and career level." },
          { term: "Righteousness and ethical behaviour", desc: "Commitment to the standards and ethics of professional conduct in all our dealings." },
          { term: "Honesty and candor", desc: "Honesty, truthfulness, sincerity and transparency in all our dealings along with performing our duties and taking responsibility on both our personal and career levels." },
          { term: "Social Responsibility", desc: "Communication and cooperation with our local community and compliance with regulations and laws that govern our relations." },
          { term: "Commitment to the company", desc: "Preserving the company assets, its property and facilities and the pursuit of all that might interest the company as well as avoiding anything that may lead to any harm." },
        ],
      },
    ],
  },

  "about/quality-policy": {
    eyebrow: "About",
    title: "Quality Policy",
    intro:
      "Customer satisfaction, employees wellbeing, environmental protection, continual improvement, business ethics and excellence are cardinal principles of our corporate philosophy.",
    blocks: [
      {
        type: "paragraph",
        text: "We adopt an integrated approach in managing Quality, Environment and Safety. Our policies include:",
      },
      {
        type: "list",
        items: [
          "Adopting environmentally safe technology and processes,",
          "Continuous upgradation of skill and competence of our employees,",
          "Reduction, recycling and safe disposal of wastes,",
          "Conservation of natural resources",
          "Compliance to applicable standards and regulations,",
          "Measure, monitor, and continually improve our performance",
          "Maintain transparency with stakeholders",
        ],
      },
      {
        type: "standards",
        items: ["TÜV NORD — ISO 9001 / ISO 14001", "SASO Quality Mark", "Saudi Authorized Economic Operator (AEO)"],
      },
    ],
  },

  /* ---------------- PRODUCTS ---------------- */
  products: {
    eyebrow: "Products",
    title: "Our Cement",
    intro: "Najran Cement manufactures a complete range of cement for the Kingdom's construction needs.",
    blocks: [
      {
        type: "media",
        src: "/images/products/opc.jpg",
        alt: "Najran Cement OPC bag",
        heading: "Type I — Ordinary Portland Cement (OPC)",
        paras: [
          "Ordinary High-Strength Cement:",
          "Characterized by high durability and optimal strength, it is ideal for all structural concrete works, foundations, and all prestressed and precast concrete industries.",
        ],
      },
      {
        type: "media",
        src: "/images/products/src.jpg",
        alt: "Najran Cement SRC bag",
        heading: "Type V — Portland Sulphate Resistant Cement (SRC)",
        paras: [
          "High-Strength Sulfate-Resistant Cement:",
          "Used in all applications involving direct contact with soils with high sulfate content, as well as in dams and tunnels.",
        ],
      },
      {
        type: "media",
        src: "/images/products/ppc.jpg",
        alt: "Najran Cement PPC bag",
        heading: "Portland Pozzolanic Cement (PPC)",
        paras: [
          "It is used in all types of concrete constructions, such as reinforce buildings, water tanks, finishings, and all construction and building works.",
        ],
      },
      {
        type: "media",
        src: "/images/products/lyasah.jpg",
        alt: "Najran Cement Lyasah bag",
        heading: "Lyasah Cement",
        paras: ["It is used for internal and external plastering, roughcasting, block installation, and all types of finishing."],
      },
      {
        type: "media",
        src: "/images/products/lyasah-plus.jpg",
        alt: "Najran Cement Lyasah Plus bag",
        heading: "Lyasah Plus Cement",
        paras: ["It is used for internal and external plastering, roughcasting, block installation, and all types of finishing."],
      },
      {
        type: "table",
        columns: ["Saudi Standards", "British Standards", "American Standards"],
        rows: [
          ["SASO GSO 1914 / 2009", "BS – EN: 197-1: 2011", "ASTM – C150"],
          ["SASO ASTM C595 / 2021", "", "ASTM – C595"],
        ],
      },
      { type: "cta", label: "Get the quote", href: "/quote" },
    ],
  },

  "products/specifications": {
    eyebrow: "Products",
    title: "Specifications and Standards",
    intro:
      "The company manufactures all of its products with high quality, meeting all local, Gulf, and international specifications. It follows the best global practices in quality measurement.",
    blocks: [
      {
        type: "paragraph",
        text: "The company has also obtained the Saudi Quality Mark on its products, aiming to meet project requirements and align with consumer expectations.",
      },
      {
        type: "table",
        columns: ["Saudi Standards", "British Standards", "American Standards"],
        rows: [
          ["SASO GSO 1914 / 2009", "BS – EN: 197-1: 2011", "ASTM – C150"],
          ["SASO ASTM C595 / 2021", "", "ASTM – C595"],
        ],
      },
      {
        type: "standards",
        items: ["SASO Quality Mark", "ASTM International", "TÜV NORD — ISO 9001 / ISO 14001"],
      },
      { type: "cta", label: "Get the quote", href: "/quote" },
    ],
  },

  /* ---------------- SERVICES ---------------- */
  "services/wasel": {
    eyebrow: "Services",
    title: "Wasel Service",
    intro:
      "Wasel App — an integrated electronic service for ordering, delivering and receiving cement with speed and professionalism.",
    blocks: [
      { type: "heading", text: "About the Service" },
      {
        type: "paragraph",
        text: "The first-of-its-kind application among Saudi cement companies, offering an integrated electronic service for selling and delivering cement to the company's business customers (companies and institutions). The application aims to enable customers to benefit from the “Wasel” service, facilitating the process of ordering, delivering, and receiving cement with speed and professionalism.",
      },
      { type: "heading", text: "Objectives" },
      {
        type: "list",
        items: [
          "To provide a delivery service that meets customer requirements with ease and convenience.",
          "To offer Wasel service through automated systems and digital applications for fast and reliable delivery.",
          "To build a sustainable relationship with customers directly, without intermediaries, through Wasel service.",
        ],
      },
      { type: "heading", text: "Features" },
      {
        type: "list",
        items: [
          "Wasel service enables fast cement delivery with just a click.",
          "It relies on an intelligent digital system, offering a seamless and quick customer experience via the Wasel app.",
          "A new fleet of trucks ensures high-speed delivery of customer orders.",
          "The Wasel app provides customers with information 24/7, all days of the week.",
          "Wasel service features order tracking until the delivery reaches the customer's location.",
          "The app allows for current orders and scheduling future orders at any time, ensuring immediate and fast delivery.",
          "Wasel service enables direct interaction between customers and the company without intermediaries, ensuring fair transactions.",
          "Wasel service documents the delivery process with a digital code to ensure secure and reliable receipt.",
        ],
      },
      { type: "heading", text: "Download the Wasel App" },
      {
        type: "paragraph",
        text: "For Android devices, download the app from the Google Play Store. For iPhone (iOS) devices, download it from the App Store.",
      },
      { type: "cta", label: "Registration in the Service", href: "/#contact" },
    ],
  },

  /* ---------------- INVESTORS ---------------- */
  "investors/financial-reports": {
    eyebrow: "Investors",
    title: "Financial Reports",
    intro:
      "Najran Cement is listed on the Saudi Exchange (Tadawul) under symbol 3002. View or download our quarterly and annual financial statements.",
    blocks: [{ type: "reports", category: "financial" }],
  },

  "investors/assembly-minutes": {
    eyebrow: "Investors",
    title: "General Assembly Minutes",
    intro: "Minutes and outcomes of Najran Cement's general assembly meetings.",
    blocks: [{ type: "reports", category: "assembly" }],
  },

  "investors/board-reports": {
    eyebrow: "Investors",
    title: "Board of Directors Reports",
    intro: "Annual reports of the Board of Directors.",
    blocks: [{ type: "reports", category: "board" }],
  },

  "investors/contact": {
    eyebrow: "Investors",
    title: "Investors Relations Contact",
    intro: "You can fill in the form below or contact us using the following info.",
    blocks: [{ type: "ircontact" }],
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
    intro: "Please fulfil the form below to join the Najran Cement supply network.",
    blocks: [{ type: "form" }],
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
      "Commitment and our belief in our responsibility towards the society we take upon ourselves to be one of the main pillars in the region that contribute to the support and care of many social, charitable, cultural and sports activities.",
    blocks: [
      {
        type: "paragraph",
        text: "The company is a main backer of all charities in the region, and provide them with annual donations, and contribute as the main sponsor of many cultural and tourist activities that are held annually in the region. The company also has a long history of supporting sports clubs, and specializes in culture and literature status Semitic show through support literary clubs and Society culture and the arts in the region.",
      },
    ],
  },

  "social-responsibility/safety": {
    eyebrow: "Social Responsibility",
    title: "Safety",
    intro:
      "Our success in Najran Cement Company depends on our ability to protect the health of our employees and being committed to continue improving the health and safety measurements. This prompt commitment is focused towards our customers, our employees, our shareholders and other related parties and the society in which we live and work.",
    blocks: [
      {
        type: "paragraph",
        text: "We consider people as our valuable assets. The company complies with the occupational safety procedures that ignite the performance of workforce. In addition, the workers and their families enjoy a comprehensive health insurance plan and social security system.",
      },
      { type: "heading", text: "Accordingly, we are committed to the following:" },
      {
        type: "list",
        items: [
          "The protection of our employees and striving to improve the health, safety and security measures at all times.",
          "Working harder to avoid accidents or any incidents that might cause any harm to health in general and career safety.",
          "Setting goals for environmental health and occupational safety enable us to assess and measure the performance and results, and then take the appropriate actions for continuous improvement at all levels.",
          "Using our technical expertise and our potentials in all aspects of environmental, occupational health and safety in the formulation of our services and introducing our products to our customers.",
          "Direct and continuous contact with all those involved in our operations and to ensure their understanding of the policy and programs of environmental standards and occupational health and safety and reward those who follow them relentlessly.",
        ],
      },
      {
        type: "callout",
        text: "This policy must be reviewed regularly to ensure the continued validity. In addition to our commitment to the points mentioned above, the Company applied the standards for the manufacture of cement and all applicable laws and regulations. We also consider all that is crucial to the success of our business and helps us to minimize losses in a systematic and provide added value to all parties concerned.",
      },
    ],
  },
};

export const PAGE_SLUGS = Object.keys(PAGES);
