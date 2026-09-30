export interface CaseStudyFeature {
  title: string;
  text: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  niche: string;
  location: string;
  liveUrl: string;
  desktopImage: string;
  desktopFallback: string;
  mobileImage: string;
  mobileFallback: string;
  altDesktop: string;
  altMobile: string;
  summary: string;
  builtTo: string;
  features: CaseStudyFeature[];
  mobile: string;
  metaLine: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "barbers-society",
    name: "Barber's Society",
    niche: "Luxury Barbershop & Grooming Lounge",
    location: "New York, NY",
    metaLine: "Luxury Barbershop & Grooming · New York, NY",
    liveUrl: "https://barberssociety.com/",
    desktopImage: "/work/barbers-society-desktop.webp",
    desktopFallback: "/work/barbers-society-desktop.webp",
    mobileImage: "/work/barbers-society-mobile.webp",
    mobileFallback: "/work/barbers-society-mobile.webp",
    altDesktop:
      "Home page of Barber's Society website featuring appointment scheduling, service menu, and luxury grooming showcase",
    altMobile:
      "Barber's Society mobile website with quick-booking button and barber availability schedule",
    summary:
      "A luxury barbershop and men's grooming lounge website with real-time chair booking, service tier menus, and membership perks.",
    builtTo:
      "Barber's Society offers bespoke haircuts, hot-towel straight-razor shaves, and beard grooming in a refined lounge setting. The website is engineered to maximize chair bookings with one-tap appointment scheduling, clear pricing tiers, and barber profile selection.",
    features: [
      {
        title: "One-tap appointment booking",
        text: "Direct integration with the shop's booking software so clients pick their barber, date, and service in under 60 seconds.",
      },
      {
        title: "Curated service & grooming menu",
        text: "Transparent price lists and duration estimates for cuts, beard sculpting, and luxury grooming packages.",
      },
      {
        title: "Master barber profiles",
        text: "Showcases individual barber portfolios, signature cuts, and distinct booking calendars.",
      },
      {
        title: "Membership & grooming club",
        text: "Dedicated presentation for monthly unlimited cut subscriptions and VIP member privileges.",
      },
      {
        title: "Hours & location map",
        text: "Prominent address, parking instructions, and shop hours right in the footer and contact drawer.",
      },
    ],
    mobile:
      "On mobile, a persistent sticky 'Book Appointment' bar stays pinned at the base of the screen, allowing clients to reserve a cut immediately without scrolling.",
  },
  {
    slug: "best-cpa-services",
    name: "Best CPA Services",
    niche: "Tax Advisory & Certified Public Accounting",
    location: "Dallas, TX",
    metaLine: "Certified Public Accounting · Dallas, TX",
    liveUrl: "https://bestcpaservices.com/",
    desktopImage: "/work/best-cpa-services-desktop.webp",
    desktopFallback: "/work/best-cpa-services-desktop.webp",
    mobileImage: "/work/best-cpa-services-mobile.webp",
    mobileFallback: "/work/best-cpa-services-mobile.webp",
    altDesktop:
      "Home page of Best CPA Services highlighting tax planning, corporate accounting, and consultation booking",
    altMobile:
      "Best CPA Services on mobile with tap-to-call and quick consultation request form",
    summary:
      "A high-conversion CPA firm website with secure document upload gateway, business tax consultation booking, and clear service breakdowns.",
    builtTo:
      "Best CPA Services advises high-growth small businesses and private individuals on tax strategy, payroll, and bookkeeping. The platform is structured to replace phone tag with structured client intake forms and automated calendar scheduling.",
    features: [
      {
        title: "Consultation scheduler",
        text: "Prospects select tax planning, audit defense, or bookkeeping consultations directly onto the CPA's calendar.",
      },
      {
        title: "Secure client intake",
        text: "Intake questionnaire pre-qualifying business size, entity type (LLC, S-Corp, C-Corp), and annual revenue.",
      },
      {
        title: "Tax season resources & checklist",
        text: "Dynamic resources guiding clients on what documents to assemble ahead of filing deadlines.",
      },
      {
        title: "Service packages",
        text: "Clear comparison tables for monthly fractional CFO, bookkeeping, and annual tax returns.",
      },
    ],
    mobile:
      "Mobile layout delivers tap-to-call emergency audit hotlines and a streamlined 3-field intake form engineered for mobile keyboards.",
  },
  {
    slug: "best-makeup-best-lashes",
    name: "Best Makeup & Best Lashes",
    niche: "Beauty Studio, Lash Extensions & Makeup Artistry",
    location: "Chicago, IL",
    metaLine: "Beauty Studio & Lash Artistry · Chicago, IL",
    liveUrl: "https://www.bestmakeupbestlashes.com/",
    desktopImage: "/work/best-makeup-best-lashes-desktop.webp",
    desktopFallback: "/work/best-makeup-best-lashes-desktop.webp",
    mobileImage: "/work/best-makeup-best-lashes-mobile.webp",
    mobileFallback: "/work/best-makeup-best-lashes-mobile.webp",
    altDesktop:
      "Home page of Best Makeup and Best Lashes highlighting lash extension sets, bridal makeup packages, and online booking",
    altMobile:
      "Best Makeup Best Lashes mobile site with bridal consultation button and photo gallery",
    summary:
      "A beauty studio website featuring a visual transformation portfolio, bridal party inquiry flow, and lash refill booking engine.",
    builtTo:
      "Built for an elite Chicago lash and makeup studio catering to bridal parties, events, and recurring lash clients. Designed with high-contrast imagery, service lookbooks, and an instant deposit booking system.",
    features: [
      {
        title: "Interactive lookbook",
        text: "High-resolution before-and-after gallery showcasing volume lashes, classic sets, and editorial makeup.",
      },
      {
        title: "Bridal party consultation request",
        text: "Multi-person booking intake for brides, bridesmaids, and event dates with location details.",
      },
      {
        title: "Lash refill & maintenance guide",
        text: "Educates clients on proper aftercare and recommended 2-3 week refill schedules.",
      },
      {
        title: "Deposit & appointment calendar",
        text: "Reduces no-shows by collecting booking retainers upon time selection.",
      },
    ],
    mobile:
      "Full-width photo carousels with swipe gestures and sticky 'Book Lashes' button optimized for Instagram traffic.",
  },
  {
    slug: "george-dimov-cpa",
    name: "George Dimov, CPA",
    niche: "High-Net-Worth & Cross-Border Accounting",
    location: "New York, NY",
    metaLine: "HNW & Corporate CPA · New York, NY",
    liveUrl: "https://dimovtax.com/",
    desktopImage: "/work/george-dimov-cpa-desktop.webp",
    desktopFallback: "/work/george-dimov-cpa-desktop.webp",
    mobileImage: "/work/george-dimov-cpa-mobile.webp",
    mobileFallback: "/work/george-dimov-cpa-mobile.webp",
    altDesktop:
      "George Dimov CPA website showing multi-jurisdiction tax planning, corporate audit services, and Manhattan office address",
    altMobile:
      "George Dimov CPA on mobile with consultation request and direct partner phone line",
    summary:
      "A prestige accounting firm web platform engineered for high-net-worth individuals, tech startups, and international corporate tax clients.",
    builtTo:
      "Designed for a top Manhattan CPA firm managing multi-state entities, expatriate filings, and complex corporate mergers. Communicates institutional authority through rigorous typographic hierarchy and direct partner contact conduits.",
    features: [
      {
        title: "Cross-border tax capability matrix",
        text: "Clear breakdowns of FIRPTA, expat taxation, and multi-state compliance.",
      },
      {
        title: "Direct partner consultation flow",
        text: "Direct route for founders and CFOs to arrange strategic tax assessments.",
      },
      {
        title: "Client portal launchpad",
        text: "Single-click access for existing clients into encrypted document repositories.",
      },
      {
        title: "Authority credentials",
        text: "Prominent displays of CPA licensing, AICPA membership, and prestigious business features.",
      },
    ],
    mobile:
      "Executive mobile interface emphasizing immediate phone contact and high-security document portal access.",
  },
  {
    slug: "getech-law",
    name: "Getech Law",
    niche: "Intellectual Property & Technology Law",
    location: "Chicago, IL & Washington D.C.",
    metaLine: "Technology & Patent Law · Chicago, IL & Washington D.C.",
    liveUrl: "https://www.getechlaw.com/",
    desktopImage: "/work/getech-law-desktop.webp",
    desktopFallback: "/work/getech-law-desktop.webp",
    mobileImage: "/work/getech-law-mobile.webp",
    mobileFallback: "/work/getech-law-mobile.webp",
    altDesktop:
      "Getech Law home page with patent prosecution, trademark filing, and technology venture counsel highlights",
    altMobile:
      "Getech Law mobile view with confidential consultation request form",
    summary:
      "A modern IP and venture counsel law firm website focusing on patent prosecution, tech commercialization, and trade secrets.",
    builtTo:
      "Getech Law counsels AI, hardware, and biotech founders on securing worldwide patents and venture term sheets. The website is tailored for technical founders who demand crisp legal capability outlines without antiquated attorney jargon.",
    features: [
      {
        title: "Patent & IP strategy roadmap",
        text: "Interactive walkthrough detailing patentability searches, provisional filings, and USPTO prosecution.",
      },
      {
        title: "Confidential invention submission form",
        text: "Encrypted intake modal with automated NDA confirmation for founders.",
      },
      {
        title: "Venture & startup legal packages",
        text: "Transparent pricing tiers for incorporation, IP assignment, and founder agreements.",
      },
      {
        title: "Attorney docket & publications",
        text: "Curated briefs on emerging AI copyright and software patent litigation.",
      },
    ],
    mobile:
      "Fast, single-column reading mode with tap-to-email encrypted consultation requests.",
  },
  {
    slug: "kmb-law",
    name: "KMB Law",
    niche: "Corporate M&A & Commercial Litigation",
    location: "Toronto & Mississauga, ON",
    metaLine: "Corporate & Commercial Law · Toronto & Mississauga",
    liveUrl: "https://www.kmblaw.com/",
    desktopImage: "/work/kmb-law-desktop.webp",
    desktopFallback: "/work/kmb-law-desktop.webp",
    mobileImage: "/work/kmb-law-mobile.webp",
    mobileFallback: "/work/kmb-law-mobile.webp",
    altDesktop:
      "KMB Law legal firm website with practice areas, partner directory, and commercial litigation case summaries",
    altMobile:
      "KMB Law on phone with attorney search filter and office directions",
    summary:
      "A full-scale corporate law firm website with attorney directories, practice group breakdowns, and corporate legal insights.",
    builtTo:
      "Serving mid-market enterprises and private equity groups across corporate acquisitions, commercial real estate, and dispute resolution. Features an intuitive practice group navigator and attorney directory.",
    features: [
      {
        title: "Attorney practice matrix",
        text: "Filterable team directory by seniority, industry group, and admission year.",
      },
      {
        title: "Commercial dispute case studies",
        text: "Curated transaction summaries demonstrating multi-million dollar deals closed.",
      },
      {
        title: "Client advisory newsletter",
        text: "Direct integration for timely regulatory updates and tax law shifts.",
      },
      {
        title: "Multi-office contact locator",
        text: "Integrated maps and direct dial lines for regional headquarters.",
      },
    ],
    mobile:
      "Sticky navigation bar with attorney lookup and instant touch-to-call reception desk.",
  },
  {
    slug: "mike-love-associates",
    name: "Mike Love & Associates",
    niche: "Personal Injury & Trial Advocacy",
    location: "Lufkin & Houston, TX",
    metaLine: "Personal Injury Law · Lufkin & Houston, TX",
    liveUrl: "https://www.mikelovelawfirm.com/",
    desktopImage: "/work/mike-love-associates-desktop.webp",
    desktopFallback: "/work/mike-love-associates-desktop.webp",
    mobileImage: "/work/mike-love-associates-mobile.webp",
    mobileFallback: "/work/mike-love-associates-mobile.webp",
    altDesktop:
      "Mike Love and Associates trial attorneys website with 24/7 accident hotline, settlement verdicts, and free consultation form",
    altMobile:
      "Mike Love & Associates mobile layout with 24/7 accident hotline tap-to-call button",
    summary:
      "A 24/7 lead-generation personal injury law site with instant claim evaluation, case verdict proof, and zero-fee guarantee.",
    builtTo:
      "When someone is injured in a commercial trucking collision or workplace accident, they need immediate legal reassurance. The site is engineered to deliver 24/7 emergency contact, prominent multi-million dollar verdict proof, and a risk-free case review.",
    features: [
      {
        title: "24/7 Emergency injury hotline",
        text: "High-visibility emergency phone CTA accessible on every page and scroll position.",
      },
      {
        title: "Free case evaluation questionnaire",
        text: "Guided 3-step injury evaluation form collecting crash details and date of incident.",
      },
      {
        title: "Verdicts & settlements record",
        text: "High-impact proof grid demonstrating over $100M+ recovered for injured victims.",
      },
      {
        title: "No fee unless we win guarantee",
        text: "Prominent trust guarantee lowering friction for distressed clients.",
      },
    ],
    mobile:
      "Thumb-optimized floating call button and instant SMS text-us button for accident victims.",
  },
  {
    slug: "miller-company-cpa",
    name: "Miller & Company CPA",
    niche: "Manhattan Prestige Accounting & Wealth Advisory",
    location: "New York, NY",
    metaLine: "Manhattan Prestige Accounting · New York, NY",
    liveUrl: "https://www.cpafirmnyc.com/",
    desktopImage: "/work/miller-company-cpa-desktop.webp",
    desktopFallback: "/work/miller-company-cpa-desktop.webp",
    mobileImage: "/work/miller-company-cpa-mobile.webp",
    mobileFallback: "/work/miller-company-cpa-mobile.webp",
    altDesktop:
      "Miller & Company CPA website featuring boutique tax strategies, business valuation, and Midtown Manhattan consultation",
    altMobile:
      "Miller & Company CPA mobile site with appointment request and private client wealth advisory link",
    summary:
      "An ultra-luxury accounting and strategic tax planning portal for family offices, executives, and medical practices.",
    builtTo:
      "Miller & Company delivers white-glove accounting, IRS audit defense, and wealth preservation for high-earning professionals in NYC. The digital presence evokes quiet luxury, discretion, and financial mastery.",
    features: [
      {
        title: "Private client wealth advisory",
        text: "Dedicated overview for family offices, trusts, and executive deferred compensation.",
      },
      {
        title: "Medical & dental practice accounting",
        text: "Specialized workflows for healthcare practice acquisitions and billing audits.",
      },
      {
        title: "Dual NYC office scheduler",
        text: "Dual-location scheduling for in-person consultations in Manhattan and Queens.",
      },
      {
        title: "Verified client testimonials",
        text: "Attributable endorsements from CEOs, surgeons, and commercial developers.",
      },
    ],
    mobile:
      "Clean typography with immediate consultation request and secure tax portal redirection.",
  },
  {
    slug: "northbrook-barber-shop",
    name: "Northbrook Barber Shop",
    niche: "Heritage Barbering & Classic Cuts",
    location: "Northbrook, IL",
    metaLine: "Heritage Barbering & Classic Cuts · Northbrook, IL",
    liveUrl: "https://northbrookbarbershop.com/",
    desktopImage: "/work/northbrook-barber-shop-desktop.webp",
    desktopFallback: "/work/northbrook-barber-shop-desktop.webp",
    mobileImage: "/work/northbrook-barber-shop-mobile.webp",
    mobileFallback: "/work/northbrook-barber-shop-mobile.webp",
    altDesktop:
      "Northbrook Barber Shop website showcasing classic scissor haircuts, beard trims, shop history, and walk-in hours",
    altMobile:
      "Northbrook Barber Shop mobile page with quick call button and queue wait-time indicator",
    summary:
      "A classic neighborhood barbershop website with live wait times, haircut style guides, and family appointment booking.",
    builtTo:
      "Northbrook Barber Shop has served generations of families with master scissor work and classic hot-foam shaves. The website bridges timeless barber traditions with digital appointments and real-time walk-in wait estimates.",
    features: [
      {
        title: "Walk-in & appointment scheduler",
        text: "Clear distinction between walk-in chair availability and guaranteed appointments.",
      },
      {
        title: "Father & son haircut packages",
        text: "Special service offerings for multi-generation family visits.",
      },
      {
        title: "Style gallery & cut descriptions",
        text: "Helping clients communicate exact taper, fade, and scissor trim preferences.",
      },
      {
        title: "Local heritage story",
        text: "Showcases 40+ years of community barbering history and shop awards.",
      },
    ],
    mobile:
      "Mobile page loads in under 1 second with directions, phone dialing, and next-open chair status right up front.",
  },
  {
    slug: "philip-andrew-cpas",
    name: "Philip Andrew CPAs",
    niche: "Boutique Corporate Audit & Fractional CFO",
    location: "Hollywood, FL",
    metaLine: "Corporate Audit & CFO Advisory · Hollywood, FL",
    liveUrl: "https://philipcpa.com/",
    desktopImage: "/work/philip-andrew-cpas-desktop.webp",
    desktopFallback: "/work/philip-andrew-cpas-desktop.webp",
    mobileImage: "/work/philip-andrew-cpas-mobile.webp",
    mobileFallback: "/work/philip-andrew-cpas-mobile.webp",
    altDesktop:
      "Philip Andrew CPAs website with fractional CFO services, corporate audit readiness, and discovery call booking",
    altMobile:
      "Philip Andrew CPAs on mobile with schedule discovery call button",
    summary:
      "A growth-oriented CPA practice website offering fractional CFO services, corporate compliance audits, and tax strategy.",
    builtTo:
      "Built for scaling B2B companies, tech startups, and distribution firms that have outgrown basic bookkeeping and require strategic financial leadership. Features discovery call booking and ROI calculators.",
    features: [
      {
        title: "Fractional CFO scope planner",
        text: "Interactive tool helping founders determine whether they need 10, 20, or 40 hours of CFO advisory monthly.",
      },
      {
        title: "Audit preparation checklist",
        text: "Step-by-step guidance for venture-backed startups preparing for institutional audits.",
      },
      {
        title: "Discovery call booking",
        text: "Direct calendar synchronization with the senior managing partner.",
      },
      {
        title: "Industry focus areas",
        text: "Dedicated landing views for SaaS, logistics, real estate, and healthcare clients.",
      },
    ],
    mobile:
      "Streamlined navigation with rapid access to scheduling a 20-minute financial discovery call.",
  },
  {
    slug: "phillips-law-offices",
    name: "Phillips Law Offices",
    niche: "Premier Trial Advocacy & Medical Malpractice",
    location: "Chicago, IL",
    metaLine: "Premier Trial Lawyers · Chicago, IL",
    liveUrl: "https://phillipslawoffices.com/",
    desktopImage: "/work/phillips-law-offices-desktop.webp",
    desktopFallback: "/work/phillips-law-offices-desktop.webp",
    mobileImage: "/work/phillips-law-offices-mobile.webp",
    mobileFallback: "/work/phillips-law-offices-mobile.webp",
    altDesktop:
      "Phillips Law Offices home page with record-setting Chicago jury verdicts, trial attorney credentials, and case review form",
    altMobile:
      "Phillips Law Offices on mobile with direct trial attorney phone line and case submission form",
    summary:
      "A premier litigation powerhouse website highlighting historic trial victories, medical malpractice advocacy, and intake forms.",
    builtTo:
      "Phillips Law Offices is recognized among Illinois' top trial firms, securing landmark verdicts in medical malpractice, catastrophic injury, and aviation accidents. The website conveys courtroom dominance and compassionate client advocacy.",
    features: [
      {
        title: "Historic verdicts archive",
        text: "Filterable database of jury verdicts and settlements exceeding $500M+ total recovery.",
      },
      {
        title: "Medical malpractice evaluation",
        text: "Specialized confidential intake form evaluated directly by nurse-consultants and attorneys.",
      },
      {
        title: "Trial lawyer honors & peer ratings",
        text: "Prominent Martindale-Hubbell AV Preeminent ratings, Super Lawyers, and Lawdragon rankings.",
      },
      {
        title: "Video deposition & courtroom insights",
        text: "Embedded client testimonials and trial preparation videos.",
      },
    ],
    mobile:
      "Immediate crisis hotline, attorney contact cards, and confidential case evaluation form formatted for thumb entry.",
  },
];
