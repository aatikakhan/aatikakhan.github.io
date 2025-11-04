export const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Community', href: '#community' },
  { label: 'Contact', href: '#contact' },
]

export const hero = {
  name: 'Aatika Khan',
  title: 'Senior Mobile, Software Engineer & Consultant',
  statement:
    'I help international teams ship Flutter-first, cloud-ready products that convert — pairing polished UX with reliable APIs and infrastructure.',
  highlights: [
    { label: 'Years in mobile', value: '6+' },
    { label: 'Launch-ready apps', value: 'E-commerce · Mobility · AI' },
    { label: 'Communities led', value: 'Women Who Code · Flutter Mumbai' },
  ],
}

export const about = {
  tagline: 'Passionate software engineer and mobile developer',
  paragraphs: [
    'I am a passionate Software Engineer and Mobile Developer with 6+ years of experience, specializing in Flutter and mobile application development.',
    'My expertise spans from e-commerce marketplaces to mobility solutions, and I am always exploring new technologies to broaden my skill set and deliver impactful products.',
    'When I am not coding, I actively contribute to the tech community through volunteering, organizing meetups, and participating in events because I believe we grow faster together.',
    'Bring your product ideas — we will talk tech, life, tactics, and everything in between to uncover the best way I can deliver value for you.',
  ],
}

export const specialties = [
  {
    title: 'Product Acceleration',
    blurb:
      'Rapidly architect and launch MVPs with Flutter, FastAPI, and managed cloud services. I plug in as an embedded CTO partner to own the SDLC end-to-end.',
    deliverables: ['Full-stack architecture', 'CI/CD automation', 'Operational playbooks'],
  },
  {
    title: 'Revenue-Ready Mobile',
    blurb:
      'Design conversion-driven mobile experiences with in-app payments, subscription flows, and compliance-ready analytics.',
    deliverables: ['Stripe, PayPal, RevenueCat', 'Experiment-ready funnels', 'Accessibility-first UX'],
  },
  {
    title: 'Cloud Reliability',
    blurb:
      'Build resilient infrastructure across AWS and GCP with observability, autoscaling, and defensible security baselines.',
    deliverables: ['AWS EC2 · Lambda', 'Global CDN & caching', 'Telemetry dashboards'],
  },
]

export const experiences = [
  {
    role: 'Founding Senior Engineer',
    company: 'Treasure Fox · Michigan, USA (Remote)',
    period: 'Dec 2024 – Present',
    summary:
      'Building a B2B and B2C marketplace for Mid Century Models from the ground up with Flutter, FastAPI, MySQL, and AWS.',
    contributions: [
      'Delivered core marketplace experiences spanning subscriptions, offers, chat, and payouts.',
      'Integrated image processing, model integrations, and revenue infrastructure with Stripe.',
      'Scaled infrastructure across AWS (EC2, S3, RDS) with reliable deployment pipelines.',
    ],
    tech: ['Flutter', 'FastAPI', 'AWS'],
    link: 'http://treasurefox.ai',
  },
  {
    role: 'Full Stack Engineer',
    company: 'Anuvad.pro · Remote',
    period: '2024',
    summary:
      'Built a GenAI-powered translation platform that converts PDF documents to English with production-grade APIs.',
    contributions: [
      'Developed FastAPI services for authentication, translation, and document workflow.',
      'Implemented GenAI-assisted translation pipelines and deployed on Google Cloud.',
    ],
    tech: ['FastAPI', 'GenAI', 'GCP'],
  },
  {
    role: 'Lead Mobile Developer (Contract)',
    company: 'Auto Claims Ltd · Birmingham, UK (Remote)',
    period: 'Jun 2023 – May 2024',
    summary:
      'Led the development of eBUYgumm, a reselling shopping app available on iOS and Android.',
    contributions: [
      'Redesigned listing flows and streamlined selling to increase seller conversion.',
      'Integrated secure payment systems and automated negotiations and offers.',
      'Partnered with distributed teams to ensure parity across platforms.',
    ],
    tech: ['Flutter', 'PayPal', 'Product Strategy'],
    link: 'https://www.ebuygumm.co.uk/shop/Online_market_stall',
  },
  {
    role: 'Lead Mobile Engineer (Contract)',
    company: '1ne Studio Inc · Tokyo, Japan (Remote)',
    period: 'Nov 2022 – May 2023',
    summary:
      'Built portfolio and project management apps for foriio creators, enabling collaboration at scale.',
    contributions: [
      'Integrated Twilio-powered messaging for real-time collaboration and updates.',
      'Enhanced iOS and Android apps with new project workflows and creative tooling.',
      'Delivered feature enhancements with a focus on reliability and maintainability.',
    ],
    tech: ['Flutter', 'Twilio', 'Realtime Messaging'],
  },
  {
    role: 'Flutter Engineer (Contract)',
    company: 'Keep Works Technologies · Bengaluru, India (Remote)',
    period: 'May 2022 – Jul 2022',
    summary:
      'Created an open-source Flutter analytics SDK that unlocks no-code insights.',
    contributions: [
      'Built Flutter plugins bridging native SDKs via platform channels.',
      'Shipped DashX-powered analytics, CMS, invoicing, and marketing tools.',
      'Reduced time-to-value for analytics setup from days to minutes.',
    ],
    tech: ['Flutter', 'DashX', 'Analytics'],
    link: 'https://dashx.com/',
  },
  {
    role: 'Mobile Developer (Contract)',
    company: 'Machine + Love · Canada (Remote)',
    period: 'Jan 2022 – Feb 2022',
    summary:
      'Built an iOS invoicing app focused on speed and usability for contractors and traders.',
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
      'Built mobility applications using Flutter and Firebase to foster sustainable commuting.',
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
      'Built and refactored mobile apps for delivery knights focused on operational efficiency.',
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
      'Mid-century marketplace spanning chat, subscriptions, and Stripe-powered payouts for collectors.',
    impact: 'Accelerated global launch timelines while maintaining a premium UX.',
    stack: ['Flutter', 'FastAPI', 'AWS', 'Stripe'],
    url: 'https://treasurefox.ai/',
  },
  {
    name: 'Anuvad Translation Tool',
    description:
      'GenAI-assisted PDF translation workflow delivering secure language conversions for enterprises.',
    impact: 'Deployed to production on GCP with FastAPI microservices.',
    stack: ['FastAPI', 'GenAI', 'GCP'],
    url: 'https://anuvad.pro/',
  },
  {
    name: 'Skin Disease Detection',
    description:
      'ML-driven assistant that classifies skin conditions from imagery with clinician handoff capability.',
    impact: 'Established end-to-end pipelines for automatic detection and triage support.',
    stack: ['Python', 'ML', 'Computer Vision'],
    url: 'https://github.com/aatikakhan/skin-disease-prediction',
  },
  {
    name: 'Weight Tracking',
    description:
      'Personal health tracker with scheduling logic and reminders to maintain consistency.',
    impact: 'Automates notifications and highlights missed entries for user accountability.',
    stack: ['Flutter', 'Local Notifications'],
    url: 'https://github.com/aatikakhan/weight-tracker',
  },
  {
    name: 'Unsplash Gallery',
    description:
      'Media browsing experience with advanced filtering powered by the Unsplash API.',
    impact: 'Showcases performant API integration and responsive galleries.',
    stack: ['Flutter', 'Unsplash API'],
    url: 'https://github.com/aatikakhan/Unsplash-Gallery',
  },
  {
    name: 'Guardian-ai',
    description:
      'Cybersecurity project for proactive spam detection presented in the Gemini AI competition.',
    impact: 'Combined Flutter, Firebase, and custom models for explainable threat triage.',
    stack: ['Flutter', 'Firebase', 'GenAI'],
    url: 'https://ai.google.dev/competition/projects/guaridan-ai',
  },
  {
    name: 'TodoApp',
    description:
      'Trello-inspired task management with drag-and-drop columns and productivity flows.',
    impact: 'Improves team task visibility across mobile surfaces.',
    stack: ['Flutter', 'State Management'],
  },
  {
    name: 'NASA Gallery',
    description:
      'Content-rich application rendering NASA feeds with a news-style UX.',
    impact: 'Demonstrates data storytelling with curated space exploration content.',
    stack: ['Flutter', 'REST APIs'],
  },
]

export const skills = [
  {
    category: 'Mobile & Flutter',
    items: ['Flutter', 'Dart', 'Swift', 'Kotlin', 'iOS', 'Android'],
  },
  {
    category: 'Frontend',
    items: ['React', 'CSS', 'Tailwind', 'Bootstrap', 'Reactstrap', 'Vanilla JS'],
  },
  {
    category: 'Backend & APIs',
    items: ['Python', 'FastAPI', 'RESTful APIs', 'MySQL'],
  },
  {
    category: 'Firebase Platform',
    items: ['Auth', 'Firestore', 'Functions', 'Realtime DB', 'FCM', 'Hosting'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS EC2', 'AWS Lambda', 'Google Cloud', 'CI/CD'],
  },
  {
    category: 'Machine Learning & LLMs',
    items: ['RAG applications', 'Image processing', 'OpenAI APIs'],
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
  {
    role: 'Organiser',
    org: 'First Step to 0rganizing · Bangalore',
    period: 'Apr 2020 – Present',
    summary:
      'Building a community that supports tech workers through workshops, events, and shared experiences.',
  },
]

export const articles = [
  {
    title: 'Guardian-ai: Gen AI for proactive spam detection',
    detail:
      'Participated in the Gemini AI competition to build Guardian-ai, combining Flutter, Firebase, and GenAI for cyber defense.',
  },
]

export const contact = {
  email: 'aatikakhan869@gmail.com',
  github: 'https://github.com/aatikakhan',
  linkedin: 'https://linkedin.com/in/aatikakhan',
  twitter: 'https://www.twitter.com/_aatikakhan_',
  resume: 'https://docs.google.com/document/d/1MMZ1AhC_CDdHeXCnr8Q2hqw0vKWdOOmg81LHuxA6Q0E/export?format=pdf',
  note: 'Bring your product ideas and we will explore the smartest ways to bring them to life together.',
}
