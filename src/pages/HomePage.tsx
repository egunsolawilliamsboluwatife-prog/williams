import React, { useRef } from "react";
import { Link } from "react-router";
import { ArrowRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { Seo } from "../components/ui/Seo.tsx";
import { AvailabilityDot } from "../components/ui/AvailabilityDot.tsx";
import { Button } from "../components/ui/Button.tsx";
import { DeviceFrame } from "../components/ui/DeviceFrame.tsx";
import { WhatYouGetBento } from "../components/home/WhatYouGetBento.tsx";
import { ReviewsSection } from "../components/home/ReviewsSection.tsx";
import { ProcessTimeline } from "../components/ui/ProcessTimeline.tsx";
import { BookingCtaBand } from "../components/ui/BookingCtaBand.tsx";
import { Reveal } from "../components/ui/Reveal.tsx";
import { EASE_OUT } from "../lib/motion.ts";
import { CASE_STUDIES } from "../content/work.ts";
import { PRICING_TIERS } from "../content/pricing.ts";
import { useBooking } from "../context/BookingContext.tsx";
import { ThreeHeroScene } from "../components/3d/ThreeHeroScene.tsx";
import { Tilt3DCard } from "../components/ui/Tilt3DCard.tsx";
import { AnimatedCounter } from "../components/ui/AnimatedCounter.tsx";

export const HomePage: React.FC = () => {
  const { openBookingModal } = useBooking();
  const heroSectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const projectA = CASE_STUDIES[0];
  const projectB = CASE_STUDIES[1];
  const projectC = CASE_STUDIES[2];
  const projectD = CASE_STUDIES[3];

  const processSteps = [
    {
      title: "Book a call",
      body: "Pick any 15-minute slot on Google Meet or Cal.com. The calendar is open 24/7.",
    },
    {
      title: "Pick your tier",
      body: "We talk about your business and choose Launch, Growth or Signature. Prices start at $1,000.",
    },
    {
      title: "I design and build",
      body: "I design the pages, build them in code and set up your booking or quote forms.",
    },
    {
      title: "Launch and care",
      body: "Your site goes live. Add the $59/month care plan and I keep it hosted, secure and up to date.",
    },
  ];

  return (
    <>
      <Seo
        title="Williams | Websites for US local businesses"
        description="Custom websites for US local businesses, with booking, contact forms and SEO basics built in. 300+ websites delivered. Book a free 15-minute call."
        path="/"
        image="/williams-warm-grey.jpg"
      />

      {/* 1. HERO SECTION */}
      <section
        ref={heroSectionRef}
        className="relative min-h-[100dvh] pt-28 md:pt-32 pb-16 flex items-center overflow-hidden"
      >
        <ThreeHeroScene />
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content (cols 1-7) */}
            <div className="lg:col-span-7 flex flex-col items-start z-10">
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_OUT }}
                className="mb-6"
              >
                <AvailabilityDot label="Available for work" />
              </motion.div>

              {/* H1 is visible on first paint (opacity stays 1) and only translates y */}
              <motion.h1
                initial={shouldReduceMotion ? false : { y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: EASE_OUT }}
                className="font-display font-bold text-[clamp(2.35rem,1.3rem+3.5vw,4.25rem)] leading-[1.04] tracking-[-0.03em] text-bone mb-6 text-balance opsz-96 max-w-[20ch]"
              >
                Websites built to win local customers.
              </motion.h1>

              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12, ease: EASE_OUT }}
                className="font-sans text-xl md:text-2xl text-bone-muted leading-relaxed max-w-[34ch] mb-8 text-pretty"
              >
                I design and build custom websites for US local businesses, with
                booking, contact forms and SEO basics built in.
              </motion.p>

              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
                className="flex flex-wrap items-center gap-4 mb-8"
              >
                <Button
                  type="button"
                  onClick={() => openBookingModal("compare")}
                  variant="primary"
                >
                  Book a call
                </Button>
                <Button to="/work" variant="secondary">
                  See the work
                </Button>
              </motion.div>

              {/* Quick Trust Highlights */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.28, ease: EASE_OUT }}
                className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 border-t border-line/50 text-xs font-mono text-bone-subtle"
              >
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-ember inline-block" />
                  300+ sites delivered
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  100% custom code
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                  No off-the-shelf themes
                </span>
              </motion.div>
            </div>

            {/* Right Media: Authentic Studio Portrait Card (Letter W removed) */}
            <div className="lg:col-span-5 relative flex items-center justify-center pt-6 lg:pt-0">
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
                className="relative w-full max-w-[440px]"
              >
                {/* Ambient Ember Backlight Glow */}
                <div
                  className="absolute -inset-4 rounded-[40px] bg-ember/15 blur-2xl pointer-events-none -z-10"
                  aria-hidden="true"
                />

                {/* Studio Portrait Card with Interactive 3D Tilt */}
                <Tilt3DCard maxTilt={8} glowColor="rgba(217, 119, 54, 0.2)">
                  <div className="relative rounded-[32px] overflow-hidden border border-line bg-navy shadow-[var(--shadow-float)] aspect-[4/5] sm:aspect-[3/4] max-h-[580px] w-full group">
                    <img
                      src="/williams-navy-bokeh.jpg"
                      alt="Egunsola Williams, founder and lead web engineer"
                      width={1048}
                      height={592}
                      fetchPriority="high"
                      decoding="async"
                      className="w-full h-full object-cover object-[center_20%] group-hover:scale-102 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Lighting Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/20 to-transparent pointer-events-none" />

                    {/* Top Floating Badge */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ink/75 backdrop-blur-md border border-white/10 text-xs font-sans font-medium text-bone shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Available for work</span>
                      </span>
                      <span className="px-3 py-1 rounded-full bg-ink/75 backdrop-blur-md border border-white/10 text-[11px] font-mono text-ember font-semibold shadow-sm">
                        24/7 Booking
                      </span>
                    </div>

                    {/* Bottom Founder Signature & Credential Card */}
                    <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-ink/80 backdrop-blur-md border border-white/10 shadow-lg">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-display font-bold text-lg text-bone tracking-tight">
                          Egunsola Williams
                        </h3>
                        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded font-medium border border-emerald-500/20">
                          300+ Delivered
                        </span>
                      </div>
                      <p className="font-sans text-xs text-bone-muted">
                        Founder & Lead Web Engineer · Nationwide US
                      </p>
                    </div>
                  </div>
                </Tilt3DCard>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROOF STATEMENT */}
      <section className="py-20 md:py-28 border-t border-line">
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <AnimatedCounter
                  value={300}
                  suffix="+"
                  className="block font-display font-extrabold text-[clamp(4.5rem,2rem+10vw,10rem)] leading-[0.9] tracking-[-0.05em] text-bone opsz-96 select-none"
                />
                <h2 className="font-display font-semibold text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] leading-[1.05] tracking-[-0.025em] text-bone-muted mt-2 opsz-72">
                  websites delivered
                </h2>
              </div>
              <div className="lg:col-span-4 pb-3">
                <p className="font-sans text-xl text-bone-muted leading-relaxed text-pretty">
                  From corporate law firms and CPA practices to luxury
                  barbershops and boutique beauty studios. Four of them are below,
                  live and clickable.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. RECENT WORK (Asymmetric Media Grid) */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-display font-semibold text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] text-bone tracking-tight opsz-72">
              Recent work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Card A: Barber's Society (cols 1-7, row 1) */}
            <div className="lg:col-span-7">
              <Reveal>
                <Tilt3DCard maxTilt={5} className="h-full">
                  <Link
                    to={`/work/${projectA.slug}`}
                    className="group block glass p-6 md:p-8 rounded-[24px] h-full transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-ember outline-none"
                  >
                    <div className="mb-6">
                      <DeviceFrame
                        kind="laptop"
                        src={projectA.desktopImage}
                        fallbackSrc={projectA.desktopFallback}
                        alt={projectA.altDesktop}
                      />
                    </div>
                    <h3 className="font-display font-bold text-2xl text-bone mb-1 tracking-tight">
                      {projectA.name}
                    </h3>
                    <p className="font-sans text-sm text-bone-subtle mb-4">
                      {projectA.metaLine}
                    </p>
                    <span className="inline-flex items-center gap-1.5 font-sans font-medium text-ember text-sm group-hover:translate-x-1 transition-transform">
                      <span>View case study</span>
                      <ArrowRight size={16} />
                    </span>
                  </Link>
                </Tilt3DCard>
              </Reveal>
            </div>

            {/* Card B: Best CPA Services (cols 8-12, row 1-2) */}
            <div className="lg:col-span-5 lg:row-span-2">
              <Reveal delay={0.06}>
                <Tilt3DCard maxTilt={5} className="h-full">
                  <Link
                    to={`/work/${projectB.slug}`}
                    className="group block bg-navy border border-line p-6 md:p-8 rounded-[24px] h-full flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-ember outline-none"
                  >
                    <div className="flex justify-center items-center py-6">
                      <div className="w-[75%] max-w-[260px]">
                        <DeviceFrame
                          kind="phone"
                          src={projectB.mobileImage}
                          fallbackSrc={projectB.mobileFallback}
                          alt={projectB.altMobile}
                        />
                      </div>
                    </div>
                    <div className="pt-4">
                      <h3 className="font-display font-bold text-2xl text-bone mb-1 tracking-tight">
                        {projectB.name}
                      </h3>
                      <p className="font-sans text-sm text-bone-subtle mb-4">
                        {projectB.metaLine}
                      </p>
                      <span className="inline-flex items-center gap-1.5 font-sans font-medium text-ember text-sm group-hover:translate-x-1 transition-transform">
                        <span>View case study</span>
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                </Tilt3DCard>
              </Reveal>
            </div>

            {/* Card C: Best Makeup & Best Lashes (cols 1-3, row 2) */}
            <div className="lg:col-span-4">
              <Reveal delay={0.12}>
                <Tilt3DCard maxTilt={5} className="h-full">
                  <Link
                    to={`/work/${projectC.slug}`}
                    className="group block glass p-6 md:p-8 rounded-[24px] h-full flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-ember outline-none"
                  >
                    <div className="flex justify-center mb-6">
                      <div className="w-[70%] max-w-[200px]">
                        <DeviceFrame
                          kind="phone"
                          src={projectC.mobileImage}
                          fallbackSrc={projectC.mobileFallback}
                          alt={projectC.altMobile}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-bone mb-1 tracking-tight">
                        {projectC.name}
                      </h3>
                      <p className="font-sans text-sm text-bone-subtle mb-4">
                        {projectC.metaLine}
                      </p>
                      <span className="inline-flex items-center gap-1.5 font-sans font-medium text-ember text-sm group-hover:translate-x-1 transition-transform">
                        <span>View case study</span>
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                </Tilt3DCard>
              </Reveal>
            </div>

            {/* Card D: George Dimov CPA (cols 4-7, row 2) */}
            <div className="lg:col-span-3">
              <Reveal delay={0.18}>
                <Tilt3DCard maxTilt={5} className="h-full">
                  <Link
                    to={`/work/${projectD.slug}`}
                    className="group block glass p-6 md:p-8 rounded-[24px] h-full flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-ember outline-none"
                  >
                    <div className="mb-6">
                      <DeviceFrame
                        kind="laptop"
                        src={projectD.desktopImage}
                        fallbackSrc={projectD.desktopFallback}
                        alt={projectD.altDesktop}
                      />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-bone mb-1 tracking-tight">
                        {projectD.name}
                      </h3>
                      <p className="font-sans text-sm text-bone-subtle mb-4">
                        {projectD.metaLine}
                      </p>
                      <span className="inline-flex items-center gap-1.5 font-sans font-medium text-ember text-sm group-hover:translate-x-1 transition-transform">
                        <span>View case study</span>
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </Link>
                </Tilt3DCard>
              </Reveal>
            </div>
          </div>

          <div className="mt-12 flex justify-end">
            <Button to="/work" variant="secondary">
              See the work
            </Button>
          </div>
        </div>
      </section>

      {/* 4. WHAT YOU GET (Bento Grid with Visual Illustrations) */}
      <section className="py-24 md:py-32 border-t border-line">
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <Reveal>
              <h2 className="font-display font-semibold text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] text-bone tracking-tight mb-4 opsz-72">
                What you get
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="font-sans text-lg md:text-xl text-bone-muted leading-relaxed">
                Everything required to turn local searchers into paying clients, engineered cleanly without bloated templates.
              </p>
            </Reveal>
          </div>
          <WhatYouGetBento />
        </div>
      </section>

      {/* 5. CLIENT REVIEWS (Real Outcomes & Google 5-Star Badges) */}
      <ReviewsSection />

      {/* 6. HOW IT WORKS (Timeline) */}
      <section className="py-24 md:py-32 border-t border-line">
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
          <Reveal>
            <h2 className="font-display font-semibold text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] text-bone tracking-tight mb-16 opsz-72">
              How it works
            </h2>
          </Reveal>
          <ProcessTimeline steps={processSteps} />
        </div>
      </section>

      {/* 6. PRICING PREVIEW (Ruled Rows) */}
      <section className="py-24 md:py-32 border-t border-line">
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
          <Reveal>
            <h2 className="font-display font-semibold text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] text-bone tracking-tight mb-12 opsz-72">
              Straightforward pricing
            </h2>
          </Reveal>

          <div className="divide-y divide-line border-y border-line mb-8">
            {PRICING_TIERS.map((tier) => (
              <Link
                key={tier.name}
                to="/services"
                className="group py-8 px-4 -mx-4 rounded-xl flex flex-col lg:grid lg:grid-cols-12 gap-4 items-start lg:items-center hover:bg-navy transition-colors focus-visible:ring-2 focus-visible:ring-ember outline-none"
              >
                <div className="lg:col-span-3">
                  <h3 className="font-display font-semibold text-2xl text-bone tracking-tight">
                    {tier.name}
                  </h3>
                </div>

                <div className="lg:col-span-3">
                  <span className="block font-mono text-xs text-bone-subtle">
                    Starting at
                  </span>
                  <span className="font-mono text-3xl font-medium text-bone tabular-nums">
                    ${tier.price.toLocaleString("en-US")}
                  </span>
                </div>

                <div className="lg:col-span-5">
                  <p className="font-sans text-base text-bone-muted leading-relaxed">
                    {tier.summary}
                  </p>
                </div>

                <div className="lg:col-span-1 flex justify-end">
                  <span className="text-ember group-hover:translate-x-1.5 transition-transform">
                    <ArrowRight size={22} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <p className="font-sans text-base text-bone-muted">
              Care plan: $59/month for hosting, SSL, uptime monitoring, small
              edits and fixes.
            </p>
            <Button to="/services" variant="text">
              See pricing
            </Button>
          </div>
        </div>
      </section>

      {/* 7. ABOUT PREVIEW (Split Media) */}
      <section className="py-24 md:py-32 border-t border-line">
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <img
                  src="/williams-navy-bokeh.jpg"
                  alt="Williams in a black T-shirt against a dark navy background"
                  width={1048}
                  height={592}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto rounded-[24px] object-cover shadow-[var(--shadow-soft)]"
                />
              </div>

              <div className="lg:col-span-6 flex flex-col items-start">
                <h2 className="font-display font-semibold text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] text-bone tracking-tight mb-6 opsz-72">
                  Hi, I'm Williams.
                </h2>
                <p className="font-sans text-xl text-bone-muted leading-relaxed mb-8 text-pretty">
                  I build websites for local business owners who are great at
                  what they do and need a site that shows it. You talk to me
                  directly, from the first call to launch day and after.
                </p>
                <Button to="/about" variant="text">
                  More about me
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. BOOKING CTA BAND */}
      <BookingCtaBand />
    </>
  );
};

export default HomePage;
