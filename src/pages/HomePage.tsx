import React, { useRef } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
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
import { VideoBackground } from "../components/ui/VideoBackground.tsx";
import { Tilt3DCard } from "../components/ui/Tilt3DCard.tsx";
import { AnimatedCounter } from "../components/ui/AnimatedCounter.tsx";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { openBookingModal } = useBooking();
  const heroSectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const marqueeProjects = [...CASE_STUDIES, ...CASE_STUDIES];

  const processSteps = [
    {
      title: "Book a call",
      body: "Pick any 15-minute slot on Google Meet. The calendar is open 24/7.",
    },
    {
      title: "Pick your tier",
      body: "We talk about your business and choose Launch, Growth or Signature. Prices start at $600.",
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
        description="Custom websites for US local businesses, with booking, contact forms and SEO basics built in. 50+ websites delivered. Book a free 15-minute call."
        path="/"
        image="/williams-warm-grey.jpg"
      />

      {/* 1. HERO SECTION */}
      <section
        ref={heroSectionRef}
        className="relative min-h-[100dvh] pt-28 md:pt-32 pb-16 flex items-center overflow-hidden"
      >
        <VideoBackground />
        <ThreeHeroScene />
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 w-full relative z-10">
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
                  onClick={() => openBookingModal()}
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
                  50+ sites delivered
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
                          50+ Delivered
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
                  value={50}
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

      {/* 3. RECENT WORK (Auto-scrolling Horizontal Marquee) */}
      <section className="py-24 md:py-32 overflow-hidden relative">
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 mb-10 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <Reveal>
                <span className="font-mono text-xs text-ember font-medium uppercase tracking-widest block mb-2">
                  Client Showcase · 11 Live Websites
                </span>
              </Reveal>

              <Reveal delay={0.05}>
                <h2 className="font-display font-semibold text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] text-bone tracking-tight opsz-72">
                  Recent work
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="font-sans text-base md:text-lg text-bone-muted max-w-[50ch] leading-relaxed mt-2">
                  Live websites engineered for US local businesses. Drag or let it scroll automatically.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <Button to="/work" variant="secondary">
                See all 11 projects
              </Button>
            </Reveal>
          </div>
        </div>

        {/* Infinite Horizontal Auto-Moving Track */}
        <div className="relative w-full overflow-hidden group py-4">
          {/* Left & Right Gradient Fade Masks */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 bg-gradient-to-r from-[#0B0F1A] via-[#0B0F1A]/80 to-transparent z-10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-44 bg-gradient-to-l from-[#0B0F1A] via-[#0B0F1A]/80 to-transparent z-10"
            aria-hidden="true"
          />

          {/* Moving Marquee Track */}
          <div className="work-marquee-track gap-6 px-4">
            {marqueeProjects.map((project, idx) => (
              <div
                key={`${project.slug}-${idx}`}
                className="w-[330px] sm:w-[390px] md:w-[450px] shrink-0 p-5 sm:p-6 rounded-[24px] bg-navy/80 border border-line hover:border-line-strong hover:bg-navy-raised transition-all duration-300 flex flex-col justify-between shadow-lg group"
              >
                <div>
                  {/* Laptop Mockup Preview */}
                  <div className="mb-5 overflow-hidden rounded-[14px] bg-navy-deep border border-line/60 p-2 sm:p-3 pointer-events-none">
                    <DeviceFrame
                      kind="laptop"
                      src={project.desktopImage}
                      fallbackSrc={project.desktopFallback}
                      alt={project.altDesktop}
                    />
                  </div>

                  {/* Niche & Location */}
                  <div className="flex items-center justify-between text-xs font-mono text-bone-subtle mb-1.5">
                    <span className="truncate pr-2">{project.niche}</span>
                    <span className="shrink-0">{project.location}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-bone mb-2 tracking-tight group-hover:text-ember transition-colors">
                    {project.name}
                  </h3>

                  {/* Summary */}
                  <p className="font-sans text-xs sm:text-sm text-bone-muted leading-relaxed line-clamp-2">
                    {project.summary}
                  </p>
                </div>

                {/* Footer Action Links */}
                <div className="pt-4 mt-5 border-t border-line/60 flex items-center justify-between">
                  <Link
                    to={`/work/${project.slug}`}
                    className="inline-flex items-center gap-1.5 font-sans font-semibold text-ember group-hover:text-ember-bright text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    <span>View case study</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[11px] text-bone-subtle hover:text-bone transition-colors"
                  >
                    <span>Live site</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pause hint */}
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 mt-6">
          <div className="flex items-center justify-center text-xs font-mono text-bone-subtle gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span>Hover or tap any project to pause</span>
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
