export const navigation = [
  { label: 'Approach', href: '#approach' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const hero = {
  name: 'Aatika Khan',
  title: 'Product-First Software Consultant',
  statement:
    'I operate as a solo software developer for founders who need ideas shaped, built, and launched. I have expertise in crossplatform app development for 6+ years and now I\'m focusing on other areas in tech.',
  highlights: [
    {
      label: 'Where I add lift',
      value: 'Launch-ready start',
      description: 'Turn ideas into scoped builds fast.',
    },
    {
      label: 'Execution style',
      value: 'Design-build loop',
      description: 'Design flows, build UI and backend, wire APIs, ship releases.',
    },
    {
      label: 'Collaboration cadence',
      value: 'Structured async',
      description: 'Weekly calls, flexible updates, clear boards.',
    },
  ],
  status: {
    current: 'Scaling Treasure Fox marketplace.',
    availability: 'Open for new gigs globally · Remote-first.',
  },
}

export const about = {
  tagline: 'Solo developer from first discovery call to confident launch',
  paragraphs: [
    'Align job, constraint, metric upfront.',
    'Stay hands-on across mobile, web, backend.',
    'Share trade-offs with flexible async loops.',
    "With flexible schedule and async communication."
  ],
  rituals: [
    'Kickoff: risks + metrics.',
    'Weekly or as-needed meetings.',
    'Launch checklist: analytics, QA, support.',
  ],
}

export const specialties = [
  {
    title: 'Discovery to delivery',
    blurb: 'Set the goal, plan the work, and keep the releases on track.',
  },
  {
    title: 'Experience craft',
    blurb: 'Shape clear flows and tidy interfaces your customers understand.',
  },
  {
    title: 'Reliability & momentum',
    blurb: 'Ship software with checks, automation, and signals built in.',
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
      'Leading Treasure Fox marketplace across Flutter, FastAPI, MySQL, and AWS.',
    contributions: [
      'Delivered core marketplace experiences spanning subscriptions, offers, chat, and payouts.',
      'Integrated image processing, model integrations, and revenue infrastructure with Stripe.',
      'Scaled infrastructure across AWS (EC2, S3, RDS) with reliable deployment pipelines.',
    ],
    tech: ['Flutter', 'FastAPI', 'AWS'],
    link: 'http://treasurefox.ai',
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
      'Mid-century marketplace with chat, subscriptions, and Stripe payouts.',
    impact: 'Accelerated launch without trading off premium UX.',
    stack: ['Flutter', 'FastAPI', 'AWS', 'Stripe, AI/ML, Vision RAG'],
    url: 'https://treasurefox.ai/',
  },
  {
    name: 'Anuvad Translation Tool',
    description:
      'GenAI PDF translation workflow for secure enterprise conversions.',
    impact: 'Deployed on GCP using FastAPI microservices.',
    stack: ['FastAPI', 'GenAI', 'GCP'],
    url: 'https://anuvad.pro/',
  },
  {
    name: 'Skin Disease Detection',
    description:
      'ML assistant classifying skin conditions with clinician handoff.',
    impact: 'Built end-to-end detection and triage pipelines.',
    stack: ['Python', 'ML', 'Computer Vision'],
    url: 'https://github.com/aatikakhan/skin-disease-prediction',
  },
  {
    name: 'Weight Tracking',
    description:
      'Daily health tracker with scheduling logic and reminders.',
    impact: 'Automates notifications and flags missed entries for accountability.',
    stack: ['Flutter', 'Local Notifications'],
    url: 'https://github.com/aatikakhan/weight-tracker',
  },
  {
    name: 'Unsplash Gallery',
    description:
      'Media browser with advanced Unsplash API filtering.',
    impact: 'Highlights performant API integration and responsive galleries.',
    stack: ['Flutter', 'Unsplash API'],
    url: 'https://github.com/aatikakhan/Unsplash-Gallery',
  },
  {
    name: 'Guardian-ai',
    description:
      'Cybersecurity project for proactive spam detection shown in the Gemini AI competition.',
    impact: 'Combined Flutter, Firebase, and custom models for explainable triage.',
    stack: ['Flutter', 'Firebase', 'GenAI'],
    url: 'https://ai.google.dev/competition/projects/guaridan-ai',
  },
  {
    name: 'TodoApp',
    description:
      'Trello-inspired task management with drag-and-drop boards.',
    impact: 'Improves team visibility across mobile surfaces.',
    stack: ['Flutter', 'State Management'],
  },
  {
    name: 'NASA Gallery',
    description:
      'Content-rich app rendering NASA feeds in a news-style UX.',
    impact: 'Demonstrates data storytelling with curated space content.',
    stack: ['Flutter', 'REST APIs'],
  },
]

export const skills = [
  {
    category: 'Core capabilities',
    items: ['Product strategy', 'UX research', 'Design systems', 'Engineering leadership'],
  },
  {
    category: 'Trusted stack',
    items: ['Flutter', 'React', 'Node', 'FastAPI', 'Python', 'PostgreSQL'],
  },
  {
    category: 'Depth areas',
    items: ['Experimentation & analytics', 'Payments & subscriptions', 'Observability & reliability', 'ML & LLM integrations'],
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
  note: 'Bring your product idea; we will map the smartest path to launch together.',
}
