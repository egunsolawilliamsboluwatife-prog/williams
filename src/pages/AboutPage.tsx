import React from "react";
import { FacebookLogo, InstagramLogo, TiktokLogo, ArrowUpRight } from "@phosphor-icons/react";
import { Seo } from "../components/ui/Seo.tsx";
import { BookingCtaBand } from "../components/ui/BookingCtaBand.tsx";
import { Reveal } from "../components/ui/Reveal.tsx";
import { CONTACT_EMAIL, SOCIALS } from "../config/site.ts";

export const AboutPage: React.FC = () => {
  const principles = [
    {
      title: "You talk to me",
      body: "No account managers and no hand-offs. The person on your first call is the person designing and building your site.",
    },
    {
      title: "Built for phones first",
      body: "Most of your customers will see your site on a phone, so every page is designed for a thumb before it's designed for a desktop.",
    },
    {
      title: "Easy to reach",
      body: (
        <>
          Book a 15-minute Google Meet any time, day or night, or email me at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-ember underline underline-offset-4 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </>
      ),
    },
  ];

  const onlinePills = [
    {
      name: "Facebook",
      url: SOCIALS.facebook,
      icon: FacebookLogo,
      label: "Williams on Facebook",
    },
    {
      name: "Instagram",
      url: SOCIALS.instagram,
      icon: InstagramLogo,
      label: "Williams on Instagram",
    },
    {
      name: "TikTok",
      url: SOCIALS.tiktok,
      icon: TiktokLogo,
      label: "Williams on TikTok",
    },
  ];

  return (
    <>
      <Seo
        title="About | Williams"
        description="I'm Williams. I design and build websites for US local businesses, and I've delivered 300+ of them."
        path="/about"
        image="/williams-navy-bokeh.jpg"
      />

      <div className="pt-28 md:pt-36">
        {/* 1. HEADER + PORTRAIT (Split media, image right) */}
        <section className="pb-24">
          <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Text: cols 1-6 at lg */}
              <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col items-start">
                <h1 className="font-display font-bold text-[clamp(2.5rem,1.6rem+3.6vw,4.5rem)] text-bone tracking-tight mb-6 opsz-96">
                  Hi, I'm Williams.
                </h1>
                <p className="font-sans text-xl md:text-2xl text-bone-muted leading-relaxed max-w-[50ch] text-pretty">
                  I design and build websites for US local businesses. Event
                  companies, barbers, accountants and cleaners: owners who are
                  busy doing the work and need a website that brings in the next
                  customer.
                </p>
              </div>

              {/* Image: cols 7-12 at lg (fetchpriority="high", this page's LCP) */}
              <div className="lg:col-span-6 order-1 lg:order-2">
                <img
                  src="/williams-navy-bokeh.jpg"
                  alt="Williams in a black T-shirt against a dark navy background"
                  width={1048}
                  height={592}
                  fetchPriority="high"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto rounded-[24px] object-cover shadow-[var(--shadow-soft)]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. STATEMENT (Full-width statement) */}
        <section className="py-20 md:py-28 border-t border-line">
          <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
            <Reveal>
              <div className="flex flex-col items-start">
                <span className="block font-display font-extrabold text-[clamp(4.5rem,2rem+10vw,10rem)] leading-[0.9] tracking-[-0.05em] text-bone opsz-96 select-none">
                  300+
                </span>
                <h2 className="font-display font-semibold text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] leading-[1.05] tracking-[-0.025em] text-bone-muted mt-2 opsz-72">
                  websites delivered
                </h2>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 3. HOW I WORK (Ruled 3-row list) */}
        <section className="py-24 border-t border-line">
          <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
            <Reveal>
              <h2 className="font-display font-semibold text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] text-bone tracking-tight mb-12 opsz-72">
                How I work
              </h2>
            </Reveal>

            <div className="divide-y divide-line border-y border-line">
              {principles.map((item, index) => (
                <div
                  key={index}
                  className="py-8 md:py-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start"
                >
                  <div className="lg:col-span-4">
                    <h3 className="font-display font-semibold text-2xl text-bone tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                  <div className="lg:col-span-8">
                    <p className="font-sans text-xl text-bone-muted leading-relaxed max-w-[65ch]">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. FIND ME ONLINE (Inline link row) */}
        <section className="py-24 border-t border-line">
          <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
            <Reveal>
              <h2 className="font-display font-semibold text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] text-bone tracking-tight mb-10 opsz-72">
                Find me online
              </h2>
            </Reveal>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {onlinePills.map((pill) => {
                const Icon = pill.icon;
                return (
                  <a
                    key={pill.name}
                    href={pill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={pill.label}
                    className="h-16 px-8 rounded-full border border-line-strong flex items-center justify-between sm:justify-center gap-3 font-sans font-semibold text-base text-bone hover:border-ember hover:text-ember transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={24} />
                      <span>{pill.name}</span>
                    </span>
                    <ArrowUpRight size={16} className="text-bone-subtle" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. BOOKING CTA BAND */}
        <BookingCtaBand />
      </div>
    </>
  );
};

export default AboutPage;
