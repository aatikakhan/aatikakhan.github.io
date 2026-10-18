export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/#contact' },
]

export const positioningFilter = {
  idealFor: [
    'Founder-led startups (pre-seed → Series A)',
    'Investor-backed AI or marketplace products',
    'Teams building transactional or AI-native products',
    'Companies needing full-stack execution ownership',
  ],

  notFor: [
    'Maintenance-only development work',
    'Feature factories without product ownership',
    'Long enterprise outsourcing cycles',
    'Non-product engineering roles',
  ],
}
export const hero = {
  name: 'Aatika Khan',
  title: 'Fractional CTO · Founding Engineer',

  statement:
    'Seven years of marketplace and ecommerce app development. Stripe payments, and a vector database that is allowed to refuse a listing. I embed as a fractional CTO. At Treasure Fox I am the founding engineer and I head engineering - a one-person team.',

  highlights: [
    {
      label: 'Products Built',
      value: '20+',
      description:
        'Shipped across US, UK, Germany, Japan, Canada, India with production users and transactions.',
    },
    {
      label: 'Core Domain',
      value: 'AI + Marketplaces',
      description:
        'Stripe, ecommerce marketplaces, app development, and vector database search.',
    },
    {
      label: 'Engagement Model',
      value: 'Fractional CTO',
      description:
        'I head engineering when the company has one builder, from architecture through production.',
    },
  ],

  status: {
    current:
      'Founding engineer and head of engineering at Treasure Fox. One-person engineering team.',
    availability:
      'Always available for consulting. US, UK, UAE, Singapore, and remote.',
  },
}

const services = [
  {
    title: "AI Products",
    blurb: "Search assistants, RAG systems, recommendations and AI workflows."
  },
  {
    title: "Marketplace Platforms",
    blurb: "Buying, selling, offers, messaging, subscriptions and payouts."
  },
  {
    title: "Backend Systems",
    blurb: "FastAPI, cloud infrastructure, APIs, databases and integrations."
  },
  {
    title: "Fractional CTO",
    blurb: "Head of engineering for a startup whose engineering team is one person."
  }
]

export const about = {
  tagline:
    'I help founders turn ideas into revenue-generating AI products',

  paragraphs: [
    'I ship marketplace and ecommerce app development, from the first listing through production.',
    'I put Stripe under the product: payments, Connect accounts, payouts, and subscriptions.',
    'I build vector database search that only returns records a person has already verified.',
    'I work as a fractional CTO, and I head engineering as a one-person team when that is what the company needs.',
  ],

  rituals: [
    'Define outcome → not features',
    'Ship production-grade MVPs fast',
    'Instrument everything for growth + iteration',
  ],
}

export const specialties = [
  {
    title: 'Stripe',
    blurb:
      'Payments, Connect accounts, payouts, and subscriptions. The seller sees the same state the Stripe dashboard shows.',
  },
  {
    title: 'Ecommerce marketplaces',
    blurb:
      'B2B and B2C. A buyer purchases one piece. A dealer lists a room. Same checkout, offers, reports, and reviews.',
  },
  {
    title: 'App development',
    blurb:
      'The product, the APIs, and production. I head the build when the engineering team is one person.',
  },
  {
    title: 'Vector databases',
    blurb:
      'Embeddings for search. Names stay out of the vector. A row is retrieved only after a person verifies it.',
  },
]

export const approachStages = [
  {
    title: '01 Align outcomes',
    summary: 'Week one: outcome brief, risk map, and metric guardrails.',
    signals: ['Outcome brief', 'Risk map'],
  },
  {
    title: '02 Build the proof',
    summary: 'Rapid cycles blending UX prototypes, product builds, and API wiring.',
    signals: ['Clickable flows', 'Instrumented betas'],
  },
  {
    title: '03 Launch & support',
    summary: 'Release, QA automation, and support rituals in place.',
    signals: ['Launch runbook', 'Live dashboards'],
  },
]

export const experiences = [
  {
    role: 'Founding Engineer, Head of Engineering',
    company: 'Treasure Fox · USA (Remote)',
    period: 'Dec 2024 – Present',
    summary:
      'Heading engineering as a one-person team on a B2B and B2C ecommerce marketplace for mid-century furniture. Architecture, the app, payments, freight, and the models all sit at the same desk.',
    contributions: [
      'One-person engineering team: the app, the APIs, AWS, and production deploys. A buyer can purchase a piece, and a dealer can list a room, on the same ecommerce system.',
      'Identification that can refuse a listing, with a manual MCM verification when the scan is wrong, plus search and a notice when a saved search becomes available.',
      'Stripe payouts that wait until delivery and inspection. Payments, Connect accounts, payouts, and subscriptions are read from the Stripe dashboards, and the seller sees that same state in the app. Parcel, freight, and white-glove, with the fees that follow each mode.',
      'Listing reports stay live until Keep or Remove. An order issue pauses payout. Buyers review a seller only after they have paid.',
    ],
    tech: ['Flutter', 'FastAPI', 'PostgreSQL', 'AWS', 'OpenAI', 'Stripe', 'RAG'],
    link: 'https://treasurefox.ai',
  },
  {
    role: 'Mobile Engineer',
    company: 'eBUYgumm Ltd · Birmingham, UK (Remote)',
    period: 'Jun 2023 – May 2024',
    summary:
      'Headed mobile development for a B2B and B2C ecommerce reselling app, and put real state and data architecture under the listing flow.',
    contributions: [
      'Owned end-to-end development of eBUYgumm, a marketplace for shops and for people reselling, redesigned the UX, and streamlined inventory so people could list about 50% faster.',
      'Built a draft listing system inside the app.',
      'Shipped in-app payments with the PayPal SDK for transactions, negotiations, and subscriptions.',
      'Partnered with the UK web and backend teams so the product felt the same across platforms.',
    ],
    tech: ['Flutter', 'PayPal', 'State management'],
    link: 'https://www.ebuygumm.co.uk/shop/Online_market_stall',
  },
  {
    role: 'Mobile Engineer',
    company: 'foriio Inc. · Tokyo, Japan (Remote)',
    period: 'Nov 2022 – May 2023',
    summary:
      'Led the mobile app for a portfolio and project-management platform built for creative professionals.',
    contributions: [
      'Shipped real-time messaging and custom project tracking so creators could share updates and manage deliverables with clients.',
      'Wrote production code aimed at long-term maintainability.',
    ],
    tech: ['Flutter', 'Realtime messaging', 'iOS', 'Android'],
  },
  {
    role: 'Software Engineer',
    company: 'KeepWorks Technologies (DashX) · Bengaluru, India (Remote)',
    period: 'May 2022 – Jul 2022',
    summary:
      'Built and open-sourced a Flutter analytics SDK, and shipped the no-code product around it.',
    contributions: [
      'Open-sourced a Flutter analytics plugin that bridges native SDKs into Flutter apps.',
      'Shipped a no-code analytics product spanning CMS, invoicing, and marketing tools, powered by DashX.',
      'Cut analytics setup from days to minutes.',
    ],
    tech: ['Flutter', 'DashX', 'Analytics'],
    link: 'https://dashx.com/',
  },
  {
    role: 'Mobile Developer',
    company: 'Machine+Love Invoice · Canada (Remote)',
    period: 'Jan 2022 – Feb 2022',
    summary:
      'Built an iOS invoicing app end to end with a UX designer, for traders and independent contractors.',
    contributions: [
      'Powered in-app purchases and subscriptions with RevenueCat.',
      'Shipped offline-first storage and sync with Hive.',
      'Designed the flow for people who are not technical.',
    ],
    tech: ['iOS', 'RevenueCat', 'Hive'],
    link: 'http://machinelove.co',
  },
  {
    role: 'Flutter Developer',
    company: 'uRyde · Germany (Remote)',
    period: 'May 2021 – Sep 2021',
    summary:
      'Built the app that connects people and organizations around shared, sustainable mobility.',
    contributions: [
      'Powered authentication, the database, and ride and user management with Firebase.',
      'Drove state management with BLoC.',
      'Kept the architecture clean and the app fast.',
    ],
    tech: ['Flutter', 'Firebase', 'BLoC'],
    link: 'https://www.uryde.de/',
  },
  {
    role: 'Mobile Developer',
    company: 'Easeyourlife · Mumbai, India (Hybrid)',
    period: 'Nov 2020 – Dec 2021',
    summary:
      'Rebuilt the delivery app for people on the ground, and made task and money tracking something they could trust.',
    contributions: [
      'Refactored the Flutter app with Firebase and Provider, improving performance, stability, and the day-to-day experience.',
      'Raised on-time task delivery by 22% with Firebase Realtime Database, push notifications, and geolocation.',
      'Shipped location tracking, image uploads, and payment-breakdown tracking.',
      'Rebuilt task lifecycle management and financial visibility for delivery agents.',
    ],
    tech: ['Flutter', 'Firebase', 'Provider', 'Geolocation'],
    link: 'https://www.easeyourlife.in/',
  },
  {
    role: 'Mobile Developer',
    company: 'Street Light Software Pvt Ltd · Mumbai, India',
    period: 'Jan 2020 – May 2020',
    summary:
      'Full-time on the core engineering team, migrating a React Native app to Flutter.',
    contributions: [
      'Delivered mobile features as part of the core team.',
      'Migrated the React Native app to Flutter and redesigned the UX.',
    ],
    tech: ['Flutter', 'React Native'],
  },
  {
    role: 'Flutter Developer (Intern)',
    company: 'SuperWise · Mumbai, India',
    period: 'Nov 2019',
    summary:
      'One-month internship on a real-time construction project management product.',
    contributions: [
      'Contributed as a Flutter developer on SuperWise’s construction project management app.',
    ],
    tech: ['Flutter'],
  },
]

export const projects = [
  {
    name: 'Treasure Fox',
    description:
      'B2B and B2C ecommerce for mid-century furniture: identify a piece, list what you inherited, buy, and ship it.',

    impact:
      'The product I am heading now. The engineering notes are on the blog.',

    stack: [
      'FastAPI',
      'AWS',
      'OpenAI',
      'Stripe',
      'Flutter',
    ],

    url: 'https://treasurefox.ai/',
  },

  {
    name: 'AI Marketplace Search Assistant',

    description:
      'Conversational AI search experience enabling natural language product discovery.',

    impact:
      'Semantic search, recommendations and context-aware product retrieval.',

    stack: [
      'OpenAI',
      'RAG',
      'FastAPI',
      'Vector Search',
    ],
  },

  {
    name: 'Anuvad',

    description:
      'Enterprise-grade AI translation platform for PDF and document workflows.',

    impact:
      'Production deployment using FastAPI microservices and GCP.',

    stack: [
      'FastAPI',
      'GenAI',
      'GCP',
    ],

    url: 'https://anuvad.pro/',
  },

  {
    name: 'Guardian AI',

    description:
      'AI-powered spam detection and cybersecurity assistant.',

    impact:
      'Presented in the Google Gemini AI Competition.',

    stack: [
      'Flutter',
      'Firebase',
      'GenAI',
    ],

    url: 'https://ai.google.dev/competition/projects/guaridan-ai',
  },
]

export const volunteering = [
  {
    role: 'Former Founding Director',
    org: 'Women Who Code · Mumbai',
    period: 'Jun 2019 – Feb 2023',
    summary: 'Co-founded and directed the Mumbai chapter, running meetups and hackathons for women in tech over three years.',
  },
  {
    role: 'Former Co-organiser & Founding Member',
    org: 'Flutter Mumbai',
    period: 'Nov 2019 – Jul 2022',
    summary: 'Co-founded the Flutter Mumbai community and hosted events for developers to learn and share.',
  },

]

export const contact = {
  email: 'aatikakhan869@gmail.com',
  github: 'https://github.com/aatikakhan',
  linkedin: 'https://linkedin.com/in/aatikakhan',
  twitter: 'https://x.com/_aatikakhan_',
  resume: 'https://docs.google.com/document/d/1bpBcVd-_sbq700t3dAhkYw1jkXmJXMuqYchZFTu2cdw/export?format=pdf',
  description:
    'I consult with founders, product leaders, and agencies across time zones. Book a strategy session to explore how we can accelerate your roadmap.',
  note:
    'Need a Founding Engineer? Whether you are validating an idea, building an MVP, or scaling an existing product, I can help move your product from concept to production.',
}

export const credibilitySignals = [
  {
    label: 'Category',
    value: 'AI Systems + Marketplace Infrastructure',
  },
  {
    label: 'Deployment Scale',
    value: 'Production systems with payments + AI + infra',
  },
  {
    label: 'Geography',
    value: 'US · UK · Germany · Japan · India',
  },
  {
    label: 'Engagement Style',
    value: 'Embedded fractional founding engineer',
  },
]

export const investorHook = {
  title: 'What I actually do',
  points: [
    'Turn early ideas into production AI products in 2–8 weeks',
    'Replace early engineering + architecture hires',
    'Build systems ready for users, payments, and scaling from day one',
    'Reduce technical risk for investors before funding or scaling',
  ],
}

export const investmentMemo = {
  title: 'What I deliver as a Fractional CTO',
  points: [
    'Production-ready MVPs with real users, payments, and scalable architecture',
    'End-to-end ownership: backend, AI systems, infrastructure, and product delivery',
    'Architecture that avoids rebuilds during scaling phases',
    'AI systems that improve conversion, discovery, or operational efficiency',
    'Weekly execution velocity with founder-aligned decision making',
  ],
}
export const systemOwnership = [
  '30+ production APIs designed and shipped',
  'Full-stack ownership: backend, AI systems, infra, mobile',
  'Marketplace systems with payments, subscriptions, and payouts',
  'AI systems: semantic search, RAG, recommendations',
  'Multi-region product exposure: US, UK, EU, Asia',
]

export const caseStudyTemplate = {
  problem: '',
  constraints: '',
  ownership: '',
  architecture: '',
  outcome: '',
  impact: '',
}
export const notFor = [
  'Pure maintenance contracts',
  'Non-product technical work',
  'Long enterprise outsourcing cycles',
  'Feature-only execution without ownership',
]

export const externalProof = {
  note:
    'Built and shipped production systems used across multiple global markets including US, UK, EU, and Asia.',
  github: 'https://github.com/aatikakhan',
  linkedin: 'https://linkedin.com/in/aatikakhan',
}