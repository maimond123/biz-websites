export interface Service {
  slug: string;
  title: string;
  summary: string;
  description: string;
  iconName: string;
  mode: 'in-person' | 'virtual' | 'hybrid';
  isGroup: boolean;
  durationMinutes: number;
  priceCents: number | null; // null for free consultations
  outcomes: string[];
  ctaVariant: 'book' | 'plans';
  category: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Understand your needs and create a personalized plan'
  },
  {
    id: 'rehab-foundations',
    title: 'Rehabilitation Foundations',
    description: 'Core skills and strategy training'
  },
  {
    id: 'device-and-group',
    title: 'Device & Group Training',
    description: 'Device-specific coaching and small-group practice'
  },
  {
    id: 'ar-programs',
    title: 'AR Programs & Bundles',
    description: 'Multi-session packages for accelerated progress'
  }
];

export const services: Service[] = [
  // Getting Started
  {
    slug: 'what-do-i-need',
    title: 'What do I need?',
    summary: 'A quick consult to understand your hearing goals and next steps.',
    description: 'Brief virtual consult to clarify your goals, outline options, and recommend the best next step tailored to your situation.',
    iconName: 'stethoscope',
    mode: 'virtual',
    isGroup: false,
    durationMinutes: 15,
    priceCents: null, // Free consult
    outcomes: [
      'Clarify goals and priorities',
      'Understand available pathways',
      'Get a clear immediate next step'
    ],
    ctaVariant: 'book',
    category: 'getting-started'
  },
  {
    slug: 'making-a-plan',
    title: 'Making a plan',
    summary: 'Collaborative session to design your personalized rehab plan.',
    description: 'Work together to build a focused rehabilitation plan aligned to your needs, schedule, and resources.',
    iconName: 'brain',
    mode: 'virtual',
    isGroup: false,
    durationMinutes: 45,
    priceCents: 10000,
    outcomes: [
      'Personalized plan and milestones',
      'Clear timeline and expectations',
      'Actionable next steps'
    ],
    ctaVariant: 'book',
    category: 'getting-started'
  },

  // Rehabilitation Training
  {
    slug: 'ar-no-technology',
    title: 'AR - No Technology',
    summary: 'Training focused on communication strategies without devices.',
    description: 'Evidence-based communication strategy training without reliance on technology. Improve confidence using practical tools and behaviors.',
    iconName: 'brain',
    mode: 'virtual',
    isGroup: false,
    durationMinutes: 45,
    priceCents: 10000,
    outcomes: [
      'Stronger conversational strategies',
      'Improved listening confidence',
      'Tools for noisy environments'
    ],
    ctaVariant: 'book',
    category: 'rehab-foundations'
  },
  {
    slug: 'ar-hearing-aids',
    title: 'AR - Hearing Aids',
    summary: 'Optimize communication outcomes with your hearing aids.',
    description: 'Targeted aural rehabilitation to maximize everyday outcomes with your hearing aids using real-world practice and coaching.',
    iconName: 'headphones',
    mode: 'hybrid',
    isGroup: false,
    durationMinutes: 45,
    priceCents: 10000,
    outcomes: [
      'Better device use in real life',
      'Improved speech understanding',
      'Personalized practice plan'
    ],
    ctaVariant: 'book',
    category: 'device-and-group'
  },
  {
    slug: 'ar-cochlear-implant',
    title: 'AR - Cochlear Implant',
    summary: 'Rehab strategies tailored to cochlear implant users.',
    description: 'Individual coaching and exercises designed for cochlear implant users to build listening skills and communication confidence.',
    iconName: 'ear',
    mode: 'hybrid',
    isGroup: false,
    durationMinutes: 45,
    priceCents: 10000,
    outcomes: [
      'Skill building for everyday listening',
      'Improved clarity and confidence',
      'Home practice resources'
    ],
    ctaVariant: 'book',
    category: 'device-and-group'
  },
  {
    slug: 'weekly-group-sessions',
    title: 'Weekly Group Sessions',
    summary: 'Interactive group sessions focusing on practice and peer support.',
    description: 'Small group training that blends coaching, practice, and peer support to strengthen communication skills.',
    iconName: 'users',
    mode: 'in-person',
    isGroup: true,
    durationMinutes: 45,
    priceCents: 2500,
    outcomes: [
      'Guided practice with peers',
      'Real-world scenarios',
      'Confidence building in groups'
    ],
    ctaVariant: 'book',
    category: 'device-and-group'
  },
  {
    slug: 'auditory-training',
    title: 'Auditory Training',
    summary: 'Focused listening exercises to improve processing and clarity.',
    description: 'Evidence-based auditory exercises and coaching to strengthen listening ability and reduce listening effort.',
    iconName: 'ear',
    mode: 'virtual',
    isGroup: false,
    durationMinutes: 45,
    priceCents: 10000,
    outcomes: [
      'Improved listening accuracy',
      'Reduced listening effort',
      'Personalized practice plan'
    ],
    ctaVariant: 'book',
    category: 'rehab-foundations'
  },
  {
    slug: 'speechreading-training',
    title: 'Speechreading Training',
    summary: 'Develop speechreading skills to support everyday conversations.',
    description: 'Training to enhance lipreading and visual communication strategies that complement listening skills.',
    iconName: 'brain',
    mode: 'virtual',
    isGroup: false,
    durationMinutes: 45,
    priceCents: 10000,
    outcomes: [
      'Better integration of visual cues',
      'Improved comprehension in noise',
      'Daily practice techniques'
    ],
    ctaVariant: 'book',
    category: 'rehab-foundations'
  },
  {
    slug: 'communication-strategies-training',
    title: 'Communication Strategies Training',
    summary: 'Build practical strategies for everyday communication success.',
    description: 'Coaching and practice focused on actionable strategies for home, work, and social settings.',
    iconName: 'brain',
    mode: 'virtual',
    isGroup: false,
    durationMinutes: 45,
    priceCents: 10000,
    outcomes: [
      'Toolkit of everyday strategies',
      'Improved confidence across settings',
      'Plan for ongoing practice'
    ],
    ctaVariant: 'book',
    category: 'rehab-foundations'
  },
  {
    slug: 'family-training',
    title: 'Family Training',
    summary: 'Coaching with family involvement to improve communication at home.',
    description: 'Partner and family-inclusive training to build shared strategies and reduce communication breakdowns.',
    iconName: 'users',
    mode: 'virtual',
    isGroup: false,
    durationMinutes: 45,
    priceCents: 10000,
    outcomes: [
      'Shared strategies for home',
      'Reduced friction and repeats',
      'Clear roles and support plan'
    ],
    ctaVariant: 'book',
    category: 'device-and-group'
  },
  {
    slug: 'ar-3-pack',
    title: 'AR - 3 pack',
    summary: 'Three-session aural rehabilitation bundle.',
    description: 'Bundle of three targeted AR sessions designed to accelerate progress at a reduced per-session cost.',
    iconName: 'settings',
    mode: 'virtual',
    isGroup: false,
    durationMinutes: 45,
    priceCents: 10000,
    outcomes: [
      'Structured multi-session plan',
      'Savings compared to single sessions',
      'Clear goals for each session'
    ],
    ctaVariant: 'plans',
    category: 'ar-programs'
  },
  {
    slug: 'ar-4-pack',
    title: 'AR - 4 pack',
    summary: 'Four-session aural rehabilitation bundle.',
    description: 'Bundle of four targeted AR sessions to deepen skill building and reinforce strategies.',
    iconName: 'settings',
    mode: 'virtual',
    isGroup: false,
    durationMinutes: 45,
    priceCents: 10000,
    outcomes: [
      'Expanded program with reinforcement',
      'Best value per session',
      'Milestone-based progression'
    ],
    ctaVariant: 'plans',
    category: 'ar-programs'
  }
];
