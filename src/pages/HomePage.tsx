import React, { lazy, Suspense, useRef, useState, useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { Seo } from "../components/ui/Seo.tsx";
import { AvailabilityDot } from "../components/ui/AvailabilityDot.tsx";
import { Button } from "../components/ui/Button.tsx";
import { WMark } from "../components/ui/WMark.tsx";
import { DeviceFrame } from "../components/ui/DeviceFrame.tsx";
import { StickyStack } from "../components/ui/StickyStack.tsx";
import { ProcessTimeline } from "../components/ui/ProcessTimeline.tsx";
import { BookingCtaBand } from "../components/ui/BookingCtaBand.tsx";
import { Reveal } from "../components/ui/Reveal.tsx";
import { useCanRender3D } from "../lib/useCanRender3D.ts";
import { EASE_OUT } from "../lib/motion.ts";
import { SERVICES_LIST } from "../content/services.ts";
import { CASE_STUDIES } from "../content/work.ts";
import { PRICING_TIERS } from "../content/pricing.ts";

const HeroW3DLazy = lazy(() => import("../components/three/HeroW3D.tsx"));

export const HomePage: React.FC = () => {
  const heroSectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const canRender3D = useCanRender3D();
  const [w3dReady, setW3dReady] = useState(false);
  const [load3DModule, setLoad3DModule] = useState(false);

  // Lazy loading 3D canvas after idle callback and intersection
  useEffect(() => {
    if (!canRender3D) return;

    const startIdleLoad = () => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => setLoad3DModule(true), {
          timeout: 1200,
        });
      } else {
        setTimeout(() => setLoad3DModule(true), 600);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startIdleLoad();
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (heroSectionRef.current) {
      observer.observe(heroSectionRef.current);
    }

    return () => observer.disconnect();
  }, [canRender3D]);

  const mimi = CASE_STUDIES[0];
  const barber = CASE_STUDIES[1];
  const cpa = CASE_STUDIES[2];
  const cleaning = CASE_STUDIES[3];

  const processSteps = [
    {
      title: "Book a call",
      body: "Pick any 15-minute slot on Google Meet. The calendar is open 24/7.",
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
                className="font-display font-bold text-[clamp(2.75rem,1.6rem+4.6vw,5.5rem)] leading-[0.98] tracking-[-0.035em] text-bone mb-6 text-balance opsz-96"
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
                className="flex flex-wrap items-center gap-4"
              >
                <Button to="/book" variant="primary">
                  Book a call
                </Button>
                <Button to="/work" variant="secondary">
                  See the work
                </Button>
              </motion.div>
            </div>

            {/* Right Media (cols 8-12, height min(640px, 70dvh)) */}
            <div className="lg:col-span-5 relative h-[360px] sm:h-[460px] lg:h-[min(640px,70dvh)] flex items-end justify-center">
              {/* Back Layer: W Monogram (Poster or 3D Canvas) */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                aria-hidden="true"
              >
                {/* 2D Poster fallback always renders first to prevent layout shift */}
                <div
                  className={`w-full max-w-[420px] aspect-[4.4/3.4] flex items-center justify-center transition-opacity duration-500 ${
                    w3dReady ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <WMark variant="poster" size={320} />
                </div>

                {/* 3D Canvas lazy loaded */}
                {canRender3D && load3DModule && (
                  <Suspense fallback={null}>
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        w3dReady ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <HeroW3DLazy
                        eventSource={heroSectionRef}
                        onReady={() => setW3dReady(true)}
                      />
                    </div>
                  </Suspense>
                )}
              </div>

              {/* Front Layer: Hero Cutout Portrait */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: EASE_OUT }}
                className="relative z-10 w-[clamp(280px,38vw,560px)] flex justify-center"
              >
                <img
                  src="/williams-cutout.png"
                  alt="Williams, smiling, in a black T-shirt"
                  width={665}
                  height={375}
                  fetchPriority="high"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain block"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, #000 80%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, #000 80%, transparent 100%)",
                  }}
                />
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
                <span className="block font-display font-extrabold text-[clamp(4.5rem,2rem+10vw,10rem)] leading-[0.9] tracking-[-0.05em] text-bone opsz-96 select-none">
                  300+
                </span>
                <h2 className="font-display font-semibold text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] leading-[1.05] tracking-[-0.025em] text-bone-muted mt-2 opsz-72">
                  websites delivered
                </h2>
              </div>
              <div className="lg:col-span-4 pb-3">
                <p className="font-sans text-xl text-bone-muted leading-relaxed text-pretty">
                  From event rental companies to barbers, accountants and
                  cleaners. Four of them are below, live and clickable.
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
            {/* Card A: Mimi's Party Palace (cols 1-7, row 1) */}
            <div className="lg:col-span-7">
              <Reveal>
                <Link
                  to={`/work/${mimi.slug}`}
                  className="group block glass p-6 md:p-8 rounded-[24px] transition-transform duration-300 hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-ember outline-none"
                >
                  <div className="mb-6">
                    <DeviceFrame
                      kind="laptop"
                      src={mimi.desktopImage}
                      fallbackSrc={mimi.desktopFallback}
                      alt={mimi.altDesktop}
                    />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-bone mb-1 tracking-tight">
                    {mimi.name}
                  </h3>
                  <p className="font-sans text-sm text-bone-subtle mb-4">
                    {mimi.metaLine}
                  </p>
                  <span className="inline-flex items-center gap-1.5 font-sans font-medium text-ember text-sm group-hover:translate-x-1 transition-transform">
                    <span>View case study</span>
                    <ArrowRight size={16} />
                  </span>
                </Link>
              </Reveal>
            </div>

            {/* Card B: Elite Barber (cols 8-12, row 1-2) */}
            <div className="lg:col-span-5 lg:row-span-2">
              <Reveal delay={0.06}>
                <Link
                  to={`/work/${barber.slug}`}
                  className="group block bg-navy border border-line p-6 md:p-8 rounded-[24px] h-full flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-ember outline-none"
                >
                  <div className="flex justify-center items-center py-6">
                    <div className="w-[75%] max-w-[260px]">
                      <DeviceFrame
                        kind="phone"
                        src={barber.mobileImage}
                        fallbackSrc={barber.mobileFallback}
                        alt={barber.altMobile}
                      />
                    </div>
                  </div>
                  <div className="pt-4">
                    <h3 className="font-display font-bold text-2xl text-bone mb-1 tracking-tight">
                      {barber.name}
                    </h3>
                    <p className="font-sans text-sm text-bone-subtle mb-4">
                      {barber.metaLine}
                    </p>
                    <span className="inline-flex items-center gap-1.5 font-sans font-medium text-ember text-sm group-hover:translate-x-1 transition-transform">
                      <span>View case study</span>
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </div>

            {/* Card C: Quality & Affordable Cleaning (cols 1-3, row 2) */}
            <div className="lg:col-span-4">
              <Reveal delay={0.12}>
                <Link
                  to={`/work/${cleaning.slug}`}
                  className="group block glass p-6 md:p-8 rounded-[24px] h-full flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-ember outline-none"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-[70%] max-w-[200px]">
                      <DeviceFrame
                        kind="phone"
                        src={cleaning.mobileImage}
                        fallbackSrc={cleaning.mobileFallback}
                        alt={cleaning.altMobile}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-bone mb-1 tracking-tight">
                      {cleaning.name}
                    </h3>
                    <p className="font-sans text-sm text-bone-subtle mb-4">
                      {cleaning.metaLine}
                    </p>
                    <span className="inline-flex items-center gap-1.5 font-sans font-medium text-ember text-sm group-hover:translate-x-1 transition-transform">
                      <span>View case study</span>
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </div>

            {/* Card D: Mid Ohio CPA (cols 4-7, row 2) */}
            <div className="lg:col-span-3">
              <Reveal delay={0.18}>
                <Link
                  to={`/work/${cpa.slug}`}
                  className="group block glass p-6 md:p-8 rounded-[24px] h-full flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5 focus-visible:ring-2 focus-visible:ring-ember outline-none"
                >
                  <div className="mb-6">
                    <DeviceFrame
                      kind="laptop"
                      src={cpa.desktopImage}
                      fallbackSrc={cpa.desktopFallback}
                      alt={cpa.altDesktop}
                    />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-bone mb-1 tracking-tight">
                      {cpa.name}
                    </h3>
                    <p className="font-sans text-sm text-bone-subtle mb-4">
                      {cpa.metaLine}
                    </p>
                    <span className="inline-flex items-center gap-1.5 font-sans font-medium text-ember text-sm group-hover:translate-x-1 transition-transform">
                      <span>View case study</span>
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
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

      {/* 4. WHAT YOU GET (Sticky Stacking Cards) */}
      <section className="py-24 md:py-32 border-t border-line">
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
          <Reveal>
            <h2 className="font-display font-semibold text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] text-bone tracking-tight mb-16 opsz-72 text-center">
              What you get
            </h2>
          </Reveal>
          <StickyStack items={SERVICES_LIST} />
        </div>
      </section>

      {/* 5. HOW IT WORKS (Timeline) */}
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
