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
    slug: "mimis-party-palace",
    name: "Mimi's Party Palace",
    niche: "Event rentals and venues",
    location: "Austin and Leander, TX",
    metaLine: "Event rentals · Austin and Leander, TX",
    liveUrl: "https://mimis-party-palace.vercel.app/",
    desktopImage: "/work/mimis-party-palace-desktop.webp",
    desktopFallback: "/work/mimis-party-palace-desktop.png",
    mobileImage: "/work/mimis-party-palace-mobile.webp",
    mobileFallback: "/work/mimis-party-palace-mobile.png",
    altDesktop:
      "Home page of the Mimi's Party Palace website, with the headline Every Celebration, Covered and a Check Date and Pricing button",
    altMobile:
      "Mimi's Party Palace website on a phone, with an English and Spanish toggle and a Check Date and Pricing button",
    summary:
      "A full event rental website with a date-check form, a large rental catalog with a quote bag, and English and Spanish versions.",
    builtTo:
      "Mimi's rents venues, furniture and party services for weddings, quinceañeras, corporate events and private parties. The site is built so a planner can check a date, browse what's available, collect items in a quote bag and call, all without hunting for the next step.",
    features: [
      {
        title: "Check your date",
        text: "A Check Dates button stays with you down the page and opens a date-availability form in a modal.",
      },
      {
        title: "Rental catalog with a quote bag",
        text: "A large catalog of rental items, each with its own detail view and a button that adds it to a quote bag.",
      },
      {
        title: "Venues and packages",
        text: "Dedicated sections for venues and for packages and bundles, so bigger events have a clear starting point.",
      },
      {
        title: "English and Spanish",
        text: "An EN/ES toggle in the header switches the site's language for Spanish-speaking families.",
      },
      {
        title: "Tap to call",
        text: "Call links sit in the top bar, the hero and throughout the page, so a phone visitor is always one tap from a call.",
      },
      {
        title: "Answers before they ask",
        text: "A How It Works and FAQ section walks through the rental process.",
      },
    ],
    mobile:
      "On a phone, the header keeps the quote bag, the Dates button and the menu within thumb reach, and floating Call and Check Dates buttons stay on screen as you scroll.",
  },
  {
    slug: "elite-barber-adrian-duany",
    name: "Elite Barber",
    niche: "Barbershop, Adrian Duany",
    location: "Houston, TX",
    metaLine: "Barbershop · Houston, TX",
    liveUrl: "https://adrian-duany-barber.vercel.app/",
    desktopImage: "/work/elite-barber-adrian-duany-desktop.webp",
    desktopFallback: "/work/elite-barber-adrian-duany-desktop.png",
    mobileImage: "/work/elite-barber-adrian-duany-mobile.webp",
    mobileFallback: "/work/elite-barber-adrian-duany-mobile.png",
    altDesktop:
      "Home page of the Elite Barber website for Adrian Duany, with the headline Precision Fade and Beard in black and gold and a video reel card",
    altMobile:
      "Elite Barber website on a phone, with the Precision Fade and Beard headline and a full-width booking button",
    summary:
      "A bold black-and-gold barbershop site with a video reel hero, a Spanish tagline and one-tap booking.",
    builtTo:
      "Adrian is a Cuban barber in Houston. The site gives his work the same confidence he puts into a fade: a strong headline, his own tagline in Spanish, a reel of his cuts and a booking button that's never far away.",
    features: [
      {
        title: "Type with attitude",
        text: "A tall condensed display face in black and gold sets the tone the moment the page loads.",
      },
      {
        title: "Reel-style hero",
        text: "A video reel card sits beside the headline, so visitors see his cuts before they read anything.",
      },
      {
        title: "His voice, in Spanish",
        text: 'The tagline "Constancia, veinticuatro siete" gives the brand personality and speaks to his community.',
      },
      {
        title: "Everything a client checks",
        text: "About, Services, Gallery, Reviews and Booking sections, all reachable from a single-line menu.",
      },
      {
        title: "Booking up front",
        text: "A booking button in the header and in the hero, next to a See my cuts button.",
      },
      {
        title: "Instagram link",
        text: "His Instagram handle sits right under the hero for people who want to see more.",
      },
    ],
    mobile:
      "On a phone, the headline, the tagline and a full-width booking button fit on the first screen, and the layout stays clean all the way down.",
  },
  {
    slug: "mid-ohio-cpa",
    name: "Mid Ohio CPA",
    niche: "Tax and accounting, Stephanie R. Wagenschein, CPA, CFE",
    location: "Central Ohio",
    metaLine: "Accounting · Central Ohio",
    liveUrl: "https://midohiocpa.vercel.app/",
    desktopImage: "/work/mid-ohio-cpa-desktop.webp",
    desktopFallback: "/work/mid-ohio-cpa-desktop.png",
    mobileImage: "/work/mid-ohio-cpa-mobile.webp",
    mobileFallback: "/work/mid-ohio-cpa-mobile.png",
    altDesktop:
      "Home page of the Mid Ohio CPA website, with the headline Simplify the process, reduce your tax liability, and Book a Zoom and See Pricing buttons",
    altMobile:
      "Mid Ohio CPA website on a phone, with the headline, a Book a Zoom button, a See Pricing button and a phone number",
    summary:
      "A multipage site for a CPA practice, with service pages, clear pricing, tap-to-call and a consultation request page.",
    builtTo:
      "Mid Ohio CPA handles tax preparation, accounting and business consulting for individuals and growing businesses. The site is built to answer a new client's first two questions on the first screen: what does it cost, and how do I start?",
    features: [
      {
        title: "A real multipage site",
        text: "Separate pricing, contact and service pages, with Services, About, How It Works and Bill Pay in the menu.",
      },
      {
        title: "Pricing up front",
        text: "A pricing page with clear pricing cards, linked straight from the hero.",
      },
      {
        title: "Book a Zoom",
        text: "A consultation request for a Zoom meeting, right from the hero and the contact page.",
      },
      {
        title: "Credentials in view",
        text: "A strip under the hero lists the practice's credentials and conveniences, including CPA licensing, Certified Fraud Examiner, document pickup and encrypted upload.",
      },
      {
        title: "Call or email in one tap",
        text: "Tap-to-call and email links in the header, the hero and the contact page.",
      },
      {
        title: "Evening and weekend hours",
        text: "A top bar tells visitors the office is open evenings and weekends.",
      },
    ],
    mobile:
      "On a phone, the header shrinks to the logo, a call button and a menu, and the hero stacks the headline, Book a Zoom, See Pricing and the phone number on one screen.",
  },
  {
    slug: "quality-affordable-cleaning",
    name: "Quality & Affordable Cleaning",
    niche: "Home and Airbnb cleaning, Felicia Jones",
    location: "Tampa, FL",
    metaLine: "Home cleaning · Tampa, FL",
    liveUrl: "https://quality-affordable-cleaning-serivic.vercel.app/",
    desktopImage: "/work/quality-affordable-cleaning-desktop.webp",
    desktopFallback: "/work/quality-affordable-cleaning-desktop.png",
    mobileImage: "/work/quality-affordable-cleaning-mobile.webp",
    mobileFallback: "/work/quality-affordable-cleaning-mobile.png",
    altDesktop:
      "Home page of the Quality and Affordable Cleaning website for Tampa, with Text for Fast Quote and Call buttons",
    altMobile:
      "Quality and Affordable Cleaning website on a phone, with a Text for Fast Quote button and a sticky Text and Call bar",
    summary:
      "A lead-focused cleaning company site with text-for-a-quote, tap-to-call, a quote form and service pages.",
    builtTo:
      "Felicia's company cleans homes, businesses and Airbnb turnovers across Tampa. The site is built around the fastest ways a busy customer asks for a price: a text, a call or a short quote form.",
    features: [
      {
        title: "Text for a fast quote",
        text: "A Text for Fast Quote button opens the visitor's messaging app with the number ready to go.",
      },
      {
        title: "Call in one tap",
        text: "Call buttons in the header, the hero and the sticky bar.",
      },
      {
        title: "Quote form",
        text: "A multi-field quote request form for people who'd rather type it out.",
      },
      {
        title: "Service area",
        text: "A Service Area section lists the Tampa neighborhoods covered, such as Downtown Tampa, Harbour Island, Davis Islands, Hyde Park and Brandon.",
      },
      {
        title: "Service pages",
        text: "Separate detail pages for each cleaning service.",
      },
      {
        title: "About Felicia",
        text: "An About section puts the owner's name on the business.",
      },
    ],
    mobile:
      "On a phone, a sticky bar with Text and Call buttons stays at the bottom of the screen, and every button is big enough for a thumb.",
  },
];
