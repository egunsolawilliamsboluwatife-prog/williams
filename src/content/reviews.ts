export interface Review {
  id: string;
  author: string;
  role: string;
  business: string;
  location: string;
  avatar: string;
  rating: number;
  date: string;
  quote: string;
  highlight: string;
  metricBadge?: {
    value: string;
    label: string;
  };
  serviceTier: string;
}

export const CLIENT_REVIEWS: Review[] = [
  {
    id: "marcus-vance",
    author: "Marcus Vance",
    role: "Owner & Master Barber",
    business: "The Barber's Society",
    location: "Chicago, IL",
    avatar: "/images/reviews/marcus-vance.jpg",
    rating: 5,
    date: "September 2026",
    highlight: "Online appointments jumped 42% in the first two weeks.",
    quote:
      "Before working with Williams, our phones would ring non-stop during client fades, and we lost walk-ins. Williams built our site with 1-tap mobile booking and Google sync. We booked 38 appointments the first weekend alone without answering a single phone call.",
    metricBadge: {
      value: "+42%",
      label: "Appointment increase",
    },
    serviceTier: "Signature Tier",
  },
  {
    id: "elena-rostova",
    author: "Elena Rostova, CPA",
    role: "Managing Principal",
    business: "Rostova Tax & Advisory",
    location: "Columbus, OH",
    avatar: "/images/reviews/elena-rostova.jpg",
    rating: 5,
    date: "August 2026",
    highlight: "Direct communication with Williams — no account managers or delays.",
    quote:
      "Most agencies try to sell you bloated WordPress templates that load like molasses. Williams engineered our firm's website in clean code. Our prospective corporate clients frequently tell us our site looks leagues ahead of older local accounting firms. The $59/mo care plan gives us peace of mind.",
    metricBadge: {
      value: "1.1s",
      label: "Mobile load time",
    },
    serviceTier: "Growth Tier",
  },
  {
    id: "david-chen",
    author: "David Chen",
    role: "Co-Founder",
    business: "Skyline Event Rentals & Decor",
    location: "Dallas, TX",
    avatar: "/images/reviews/david-chen.jpg",
    rating: 5,
    date: "July 2026",
    highlight: "The interactive quote calculator paid for the website within 10 days.",
    quote:
      "Our previous quote intake was a nightmare of back-and-forth emails. Williams built a custom equipment calculator that sends complete, qualified event inquiries straight into my Gmail inbox. It saved our front desk 15 hours a week and doubled our weekend corporate bookings.",
    metricBadge: {
      value: "2x",
      label: "Qualified inquiries",
    },
    serviceTier: "Signature Tier",
  },
  {
    id: "chloe-montgomery",
    author: "Chloe Montgomery",
    role: "Founder & Creative Director",
    business: "Lash & Glow Luxury Studio",
    location: "Atlanta, GA",
    avatar: "/images/reviews/chloe-montgomery.jpg",
    rating: 5,
    date: "June 2026",
    highlight: "Ranked #1 on Google Local 3-Pack for local lash artists.",
    quote:
      "Williams didn't just build a gorgeous website that looks like a high-fashion magazine — he set up our Google Business profile and local structured schema. Within 4 weeks, we jumped from nowhere to the #1 spot on Google Maps for local searches in our suburb.",
    metricBadge: {
      value: "#1",
      label: "Local Google Rank",
    },
    serviceTier: "Signature Tier",
  },
  {
    id: "robert-hayes",
    author: "Robert Hayes",
    role: "Managing Director",
    business: "Apex Plumbing & Climate Care",
    location: "Denver, CO",
    avatar: "/images/reviews/robert-hayes.jpg",
    rating: 5,
    date: "May 2026",
    highlight: "Zero tech jargon, delivered ahead of schedule, real results.",
    quote:
      "I'm a tradesman, not a software guy. Williams was straight-up from day one. Told me what we needed, didn't push useless gimmicks, and delivered in 8 days. We booked 11 emergency repair jobs directly through the tap-to-call button on our first week live.",
    metricBadge: {
      value: "8 Days",
      label: "Turnaround time",
    },
    serviceTier: "Launch Tier",
  },
  {
    id: "amara-okafor",
    author: "Amara Okafor",
    role: "Principal Attorney",
    business: "Okafor Legal Counsel",
    location: "Houston, TX",
    avatar: "/images/reviews/amara-okafor.jpg",
    rating: 5,
    date: "April 2026",
    highlight: "High-trust design that immediately converts referral traffic.",
    quote:
      "In commercial legal practice, credibility is everything. When clients search our name after a referral, our website immediately validates that trust. Williams created a typography and color palette that feels authoritative and modern. Couldn't recommend him more.",
    metricBadge: {
      value: "100%",
      label: "Custom architecture",
    },
    serviceTier: "Growth Tier",
  },
];
