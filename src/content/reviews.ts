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
    quote:
      "Williams had our booking site live in days. We booked 38 appointments our first weekend without answering a single phone call. Best money we've spent on the shop.",
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
    quote:
      "Zero agency fluff or bloated templates. Our site loads in under a second, looks world-class, and prospective corporate clients take us seriously right away.",
  },
  {
    id: "david-chen",
    author: "David Chen",
    role: "Co-Founder",
    business: "Skyline Event Rentals",
    location: "Dallas, TX",
    avatar: "/images/reviews/david-chen.jpg",
    rating: 5,
    date: "July 2026",
    quote:
      "The custom quote calculator saved our front desk 15 hours a week. Inquiries land straight in my inbox already qualified. Total game changer for our weekend bookings.",
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
    quote:
      "We went from invisible to #1 on Google Maps in our area. The design looks like a luxury magazine and clients love booking directly on their phones.",
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
    quote:
      "Williams was straight-up from day one. No tech jargon or pushy upsells. Delivered in 8 days and our tap-to-call button booked 11 emergency jobs the very first week.",
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
    quote:
      "When clients search our firm after a referral, the site immediately validates trust. Clean, lightning fast, and authoritative. Couldn't recommend Williams more.",
  },
];
