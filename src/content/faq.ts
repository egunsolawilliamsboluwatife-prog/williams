export interface FaqItem {
  q: string;
  a: string;
}

export const faq: FaqItem[] = [
  {
    q: "How much does a website cost?",
    a: "Launch starts at $1,000, Growth at $1,500 and Signature at $2,300. The care plan is $59 a month. Your exact price depends on the pages and features you need, and you'll get it after we talk.",
  },
  {
    q: "What's the difference between the tiers?",
    a: "Launch is 1 custom page with motion, a booking or contact form, and basic SEO. Growth is 4 to 5 pages with booking and quote forms and local SEO basics. Signature is 6+ pages with a premium motion or 3D touch, help with your copy, and Google Business Profile setup.",
  },
  {
    q: "What does the care plan cover?",
    a: "Hosting, your SSL certificate, uptime monitoring, small edits and fixes, for $59 a month.",
  },
  {
    q: "Can you help me write the words on my site?",
    a: "Yes. Copy help is included in Signature.",
  },
  {
    q: "Will you set up my Google Business Profile?",
    a: "Yes, Google Business Profile setup is part of Signature. Every tier includes basic SEO, and Growth adds local SEO basics.",
  },
  {
    q: "Do you work with businesses like mine?",
    a: "I build for US local businesses. On the Work page you can see an event rental company, a barbershop, a CPA practice and a cleaning company. If you're not sure, book a call and ask.",
  },
  {
    q: "How do we get started?",
    a: "Book a free 15-minute Google Meet call. The calendar is open 24/7, so pick any time. If you'd rather write, send the form on the Book a call page.",
  },
  {
    q: "Can I see sites you've built?",
    a: "Yes. Every project on the Work page links to the live site, so you can click around it yourself.",
  },
];

// USER TO FILL: Move an item into `faq` only after Williams writes its answer.
// These pending questions are NOT rendered anywhere on the site.
export const faqPending: FaqItem[] = [
  { q: "How long does a website take?", a: "" },
  { q: "How do payments work?", a: "" },
  { q: "How many rounds of changes are included?", a: "" },
  { q: "Do I own my website and domain?", a: "" },
  { q: "What happens if I don't take the care plan?", a: "" },
  { q: "Can I cancel the care plan?", a: "" },
  { q: "What counts as a small edit?", a: "" },
];
