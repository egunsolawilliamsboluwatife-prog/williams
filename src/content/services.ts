export interface ServiceItem {
  title: string;
  tagline: string;
  body: string;
  tier: string;
  highlights: string[];
}

export const SERVICES_LIST: ServiceItem[] = [
  {
    title: "A site designed for your business",
    tagline: "100% custom from a blank canvas",
    body: "Every build starts from scratch, designed around how your local customers actually buy. Zero off-the-shelf templates or generic themes.",
    tier: "All tiers",
    highlights: ["Custom tailored design", "Mobile-first thumb navigation", "Under 1.2s load speeds"],
  },
  {
    title: "Booking and quote forms",
    tagline: "Turn visitors into scheduled clients",
    body: "Visitors can book a time, request a quote, or call you from their phone in two taps. Every lead lands instantly in your inbox.",
    tier: "All tiers",
    highlights: ["1-tap phone booking", "Instant email/SMS notification", "Spam protection built in"],
  },
  {
    title: "Found on Google & Local Maps",
    tagline: "Be the top choice in your local area",
    body: "Local SEO architecture, meta tags, and structured schema so your service appears when nearby customers search for what you do.",
    tier: "Growth & Signature",
    highlights: ["Google Business Profile setup", "Local search schema", "Fast indexation on launch"],
  },
  {
    title: "Motion that feels expensive",
    tagline: "Elevate your brand above competitors",
    body: "Smooth scroll interactions, subtle depth, and tactile micro-animations that make your business feel premium, established, and trustworthy.",
    tier: "Signature tier",
    highlights: ["Fluid scroll choreography", "Hardware-accelerated 60fps", "Interactive 3D touches"],
  },
  {
    title: "Worry-free care after launch",
    tagline: "Hosting, security, and monthly edits",
    body: "Fast cloud hosting, 256-bit SSL, daily backups, and ongoing content updates so you never have to stress about tech.",
    tier: "Optional $59/mo plan",
    highlights: ["99.9% uptime monitoring", "SSL security & maintenance", "Small edits and fixes included"],
  },
];
