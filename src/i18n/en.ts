/**
 * English dictionary — every UI string (buttons, labels, aria, form states).
 * Content data lives in src/data/site.ts; section titles in src/site.config.ts.
 * The shape must exactly match ja.ts (enforced by the Dict type).
 */
import type { Dict } from './ja';

export const en: Dict = {
  meta: { htmlLang: 'en', locale: 'en-US' },

  nav: {
    home: 'Home',
    works: 'Work',
    about: 'About',
    contact: 'Contact',
    homeEn: 'HOME',
    worksEn: 'WORKS',
    aboutEn: 'ABOUT',
    contactEn: 'CONTACT',
    cta: 'Get in touch',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    mainNav: 'Main navigation',
    mobileNav: 'Mobile navigation',
    available: 'Open for work',
    unavailable: 'Booked out',
    availability: 'Open for new projects',
    availabilityClosed: 'Not taking new projects right now',
    replyNote: 'Replies within 24 hours',
    langSwitch: 'Switch language',
  },

  hero: {
    view: 'View',
    viewWork: 'View project',
    featuredLabel: 'Featured project',
    seeAll: 'View all work',
  },

  works: {
    eyebrow: 'Work by Category',
    title: 'Selected Work',
    desc: 'Four disciplines — YouTube videos, Instagram visuals, TikTok shorts and web design. Open any project to read the full story.',
    filterAll: 'All',
    viewAll: 'View all',
  },

  worksPage: {
    eyebrow: 'Work / Archive',
    title: 'The Archive',
    sub: 'Every project, across video, social and web design. Filter by category, or open one to see how it came together.',
  },

  services: {
    eyebrow: 'Services',
    title: 'What I Do',
    desc: 'From a single landing page to a complete digital presence — four ways we can work together, one standard of craft.',
  },

  clients: {
    eyebrow: 'Clients',
    title: "Brands I've Worked With",
  },

  voices: {
    eyebrow: 'Voices',
    title: 'What Clients Say',
    desc: 'In their own words — the challenge we started from, what we did about it, and what changed.',
    challenge: 'Challenge',
    action: 'Approach',
    result: 'Result',
  },

  cta: {
    eyebrow: 'Contact',
    title: "Let's talk.",
    sub: 'Currently open for new projects. Email is fastest — a couple of lines is plenty.',
    button: 'Get in touch',
  },

  contactPage: {
    eyebrow: 'Contact',
    titleA: "Let's",
    titleB: 'talk',
    lede: 'An idea taking shape, a brand that needs fresh eyes — all it takes is a few lines.',
    toc: { message: 'Send a message', flow: 'How it works', elsewhere: 'Elsewhere' },
    chapters: { message: 'Send a message', flow: 'How it works', elsewhere: 'Elsewhere' },
    steps: [
      { name: 'Discovery call', desc: 'A relaxed 30-minute call to align on goals, budget and timeline.' },
      { name: 'Proposal & first draft', desc: 'A clear direction and a first draft within one to two weeks — early enough to steer.' },
      { name: 'Production & delivery', desc: "We refine together until it's right, then hand everything over with a simple guide for running it." },
    ],
    fields: {
      name: 'Name',
      email: 'Email',
      message: 'Your project',
      namePh: 'Your name',
      emailPh: 'name@example.com',
      messagePh: 'Goals, budget, timing — the more specific, the better',
      submit: 'Send message',
    },
    orMail: 'Or email me directly',
  },

  aboutPage: {
    eyebrow: 'About',
    lede: 'The person behind the work — in skills, numbers and history.',
    toc: { intro: 'Profile', skills: 'Skills', numbers: 'By the numbers', journey: 'Career', reach: 'Get in touch' },
    chapters: { intro: 'Profile', skills: 'Skills', numbers: 'By the numbers', journey: 'Career', reach: 'Get in touch' },
    figs: { portrait: 'Portrait' },
    reachText: 'An idea halfway there, or just want to say hello? My inbox is always open.',
  },

  projectPage: {
    backToIndex: 'Back to all work',
    visitWeb: 'Visit the site',
    visitOn: 'Watch on {label}',
    chapters: { overview: 'Overview', process: 'Process', outcome: 'Outcome', next: 'Next project' },
    figs: { cover: 'Key visual', process: 'Process & exploration', final: 'Final deliverables' },
    notes: {
      client: 'Client',
      role: 'Role',
      year: 'Year',
      platform: 'Platform',
      yearPlatform: 'Year / Platform',
      category: 'Category',
      categoryNote: 'All work falls into four categories',
    },
    nextProject: 'Next project',
  },

  form: {
    required: 'Please fill in every field.',
    sending: 'Sending…',
    sent: 'Sent ✓',
    success: "Thanks — I'll get back to you within 24 hours.",
    error: 'Something went wrong while sending.',
    network: 'Network error — please try again in a moment.',
    mailto: 'Opened your mail app — just press send.',
  },

  footer: {
    backTop: 'Back to top',
    localTime: 'Local time',
    navAria: 'Footer navigation',
    socialHeading: 'Elsewhere —',
    note: 'Designed and built with restraint — one accent color is plenty.',
  },

  aria: {
    toc: 'Table of contents',
    filter: 'Filter projects by category',
  },
};
