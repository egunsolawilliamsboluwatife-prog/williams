export interface PricingTierItem {
  name: string;
  price: number;
  summary: string;
  includes: string[];
  highlighted?: boolean;
}

export const PRICING_TIERS: PricingTierItem[] = [
  {
    name: "Launch",
    price: 600,
    summary: "For a business that needs one strong page that works.",
    includes: [
      "1 custom page with motion",
      "Booking or contact form",
      "Basic SEO",
    ],
  },
  {
    name: "Growth",
    price: 1000,
    summary: "For a business that needs room to explain its services.",
    includes: [
      "4 to 5 pages",
      "Booking and quote forms",
      "Local SEO basics",
    ],
  },
  {
    name: "Signature",
    price: 1500,
    highlighted: true,
    summary: "For a business that wants to stand out from its competitors.",
    includes: [
      "6+ pages",
      "Premium motion or 3D touch",
      "Help with your copy",
      "Google Business Profile setup",
    ],
  },
];

export const CARE_PLAN = {
  name: "Care plan",
  price: 59,
  billingPeriod: "Monthly",
  summary: "Your site stays online, secure and current while you run your business.",
  includes: [
    "Hosting",
    "SSL certificate",
    "Uptime monitoring",
    "Small edits",
    "Fixes",
  ],
};
