export const navigation = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const hero = {
  name: 'Aatika Khan',
  title: 'Founding Engineer • AI & Product Builder',

  statement:
    'I help founders build AI-powered products, marketplaces, and SaaS platforms from idea to production. From architecture and backend systems to AI search, payments, cloud infrastructure, and polished user experiences.',

  highlights: [
    {
      label: 'Products Built',
      value: '20+',
      description: 'Delivered across startups in USA, UK, Japan, Canada, Germany and India.',
    },
    {
      label: 'Specialization',
      value: 'AI + Marketplace Systems',
      description: 'Search, recommendations, payments and scalable backend infrastructure.',
    },
    {
      label: 'Engagement',
      value: 'Fractional Founding Engineer',
      description: 'Helping startups launch and scale products without hiring a full team.',
    },
  ],

  status: {
    current: 'Building AI-powered marketplace experiences at Treasure Fox.',
    availability: 'Available for select founder-led engagements worldwide.',
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
    title: "Fractional Founding Engineer",
    blurb: "Technical leadership for startups building their first product."
  }
]

export const about = {
  tagline: 'Helping startups turn ideas into production-ready products',

  paragraphs: [
    'AI product development and LLM integrations.',
    'Marketplace platforms with payments, messaging and subscriptions.',
    'Backend architecture, cloud infrastructure and scalable APIs.',
    'End-to-end product ownership from MVP to launch.',
  ],

  rituals: [
    'Product discovery and technical strategy.',
    'Rapid MVP execution and iterative delivery.',
    'Launch planning, analytics and scaling support.',
  ],
}

export const specialties = [
  {
    title: 'AI Product Development',
    blurb:
      'Search assistants, RAG systems, recommendation engines and AI-powered workflows.',
  },
  {
    title: 'Marketplace Platforms',
    blurb:
      'Buying, selling, messaging, subscriptions, offers, payments and seller payouts.',
  },
  {
    title: 'Backend Systems',
    blurb:
      'FastAPI, scalable APIs, cloud infrastructure, databases and integrations.',
  },
  {
    title: 'Fractional Founding Engineer',
    blurb:
      'Technical leadership for startups building and launching new products.',
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
    role: 'Founding Senior Engineer',
    company: 'Treasure Fox · Michigan, USA (Remote)',
    period: 'Dec 2024 – Present',

    summary:
      'Built and launched an AI-powered marketplace platform from scratch.',

    contributions: [
      'Architected the entire platform using Flutter, FastAPI, MySQL and AWS.',
      'Developed 20+ production APIs powering authentication, listings, offers, messaging and transactions.',
      'Built an AI-powered marketplace search assistant using OpenAI and semantic search technologies.',
      'Implemented Stripe payments, subscriptions and seller payouts.',
      'Owned cloud infrastructure, CI/CD pipelines and production deployments.',
      'Led all engineering functions including architecture, backend, AI systems and mobile applications.',
    ],

    tech: [
      'Python',
      'FastAPI',
      'AWS',
      'OpenAI',
      'Stripe',
      'MySQL',
    ],

    link: 'https://treasurefox.ai',
  },
  {
    role: 'Lead Mobile Developer ',
    company: 'Auto Claims Ltd · Birmingham, UK (Remote)',
    period: 'Jun 2023 – May 2024',
    summary:
      'Led eBUYgumm reselling app delivery across iOS and Android.',
    contributions: [
      'Redesigned listing flows and streamlined selling to increase seller conversion.',
      'Integrated secure payment systems and automated negotiations and offers.',
      'Partnered with distributed teams to ensure parity across platforms.',
    ],
    tech: ['Flutter', 'PayPal', 'Product Strategy'],
    link: 'https://www.ebuygumm.co.uk/shop/Online_market_stall',
  },
  {
    role: 'Lead Mobile Engineer ',
    company: '1ne Studio Inc · Tokyo, Japan (Remote)',
    period: 'Nov 2022 – May 2023',
    summary:
      'Built foriio creator tooling covering project management and collaboration.',
    contributions: [
      'Integrated Twilio-powered messaging for real-time collaboration and updates.',
      'Enhanced iOS and Android apps with new project workflows and creative tooling.',
      'Delivered feature enhancements with a focus on reliability and maintainability.',
    ],
    tech: ['Flutter', 'Twilio', 'Realtime Messaging'],
  },
  {
    role: 'Flutter Engineer ',
    company: 'Keep Works Technologies · Bengaluru, India (Remote)',
    period: 'May 2022 – Jul 2022',
    summary:
      'Built an open-source Flutter analytics SDK for no-code insights.',
    contributions: [
      'Built Flutter plugins bridging native SDKs via platform channels.',
      'Shipped DashX-powered analytics, CMS, invoicing, and marketing tools.',
      'Reduced time-to-value for analytics setup from days to minutes.',
    ],
    tech: ['Flutter', 'DashX', 'Analytics'],
    link: 'https://dashx.com/',
  },
  {
    role: 'Mobile Developer ',
    company: 'Machine + Love · Canada (Remote)',
    period: 'Jan 2022 – Feb 2022',
    summary:
      'Shipped an iOS invoicing app tuned for fast workflows.',
    contributions: [
      'Implemented RevenueCat subscriptions and offline-ready Hive storage.',
      'Collaborated closely with design to deliver a refined experience end-to-end.',
    ],
    tech: ['iOS', 'RevenueCat', 'Hive'],
    link: 'http://machinelove.co',
  },
  {
    role: 'Mobile Developer',
    company: 'uRyde · Erlangen, Germany (Remote)',
    period: 'May 2021 – Sep 2021',
    summary:
      'Built Flutter + Firebase mobility apps enabling sustainable commuting.',
    contributions: [
      'Implemented BLoC-driven state management for ride-sharing flows.',
      'Shipped Android and iOS apps that connect organizations with shared mobility.',
    ],
    tech: ['Flutter', 'Firebase', 'BLoC'],
    link: 'https://www.uryde.de/',
  },
  {
    role: 'Mobile Developer',
    company: 'Elements EYL Services · Mumbai, India (Hybrid)',
    period: 'Nov 2020 – Dec 2021',
    summary:
      'Built and refactored delivery apps that improved operational visibility.',
    contributions: [
      'Integrated Firebase realtime data, push notifications, and geolocation.',
      'Delivered income visibility, task lifecycle tracking, and payment breakdowns.',
    ],
    tech: ['Flutter', 'Firebase', 'Geolocation'],
    link: 'https://www.easeyourlife.in/',
  },
]

export const projects = [
  {
    name: 'Treasure Fox',
    description:
      'AI-powered marketplace platform for buying and selling curated furniture and decor.',

    impact:
      'Built from scratch with AI search, messaging, payments, subscriptions and seller payouts.',

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

export const skills = [
  {
    category: 'Backend',
    items: [
      'Python',
      'FastAPI',
      'REST APIs',
      'MySQL',
      'PostgreSQL',
      'AWS',
      'System Design',
      'Microservices',
    ],
  },

  {
    category: 'AI & LLM',
    items: [
      'OpenAI APIs',
      'RAG Systems',
      'Semantic Search',
      'AI Chatbots',
      'Recommendation Systems',
      'Vector Search',
      'Prompt Engineering',
    ],
  },

  {
    category: 'Cloud & DevOps',
    items: [
      'AWS EC2',
      'AWS S3',
      'AWS RDS',
      'Docker',
      'CI/CD',
      'GitHub Actions',
      'Linux',
    ],
  },

  {
    category: 'Product Delivery',
    items: [
      'Marketplace Platforms',
      'Payments',
      'Subscriptions',
      'Mobile Apps',
      'Stripe',
      'PayPal',
      'Twilio',
    ],
  },
]

export const volunteering = [
  {
    role: 'Former Director / Founding Member',
    org: 'Women Who Code · Mumbai',
    period: 'Jun 2019 – Feb 2023',
    summary: 'Organized meetups and hackathons focused on women empowerment in tech.',
  },
  {
    role: 'Former Co-organiser / Founding Member',
    org: 'Flutter Mumbai',
    period: 'Nov 2019 – Jul 2022',
    summary: 'Hosted community events to learn, share, and grow around Flutter.',
  },

]

export const contact = {
  email: 'aatikakhan869@gmail.com',
  github: 'https://github.com/aatikakhan',
  linkedin: 'https://linkedin.com/in/aatikakhan',
  twitter: 'https://x.com/_aatikakhan_',
  resume: 'https://docs.google.com/document/d/1MMZ1AhC_CDdHeXCnr8Q2hqw0vKWdOOmg81LHuxA6Q0E/export?format=pdf',
  note:
    'Need a Founding Engineer? Whether you are validating an idea, building an MVP, or scaling an existing product, I can help move your product from concept to production.'
}
