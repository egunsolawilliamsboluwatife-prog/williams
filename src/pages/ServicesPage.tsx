import React from "react";
import { Check } from "@phosphor-icons/react";
import { Seo } from "../components/ui/Seo.tsx";
import { PricingTier } from "../components/ui/PricingTier.tsx";
import { GlassCard } from "../components/ui/GlassCard.tsx";
import { Button } from "../components/ui/Button.tsx";
import { Tilt3DCard } from "../components/ui/Tilt3DCard.tsx";
import { WhatYouGetBento } from "../components/home/WhatYouGetBento.tsx";
import { ReviewsSection } from "../components/home/ReviewsSection.tsx";
import { FaqAccordion } from "../components/ui/FaqAccordion.tsx";
import { BookingCtaBand } from "../components/ui/BookingCtaBand.tsx";
import { Reveal } from "../components/ui/Reveal.tsx";
import { PRICING_TIERS, CARE_PLAN } from "../content/pricing.ts";
import { SERVICES_LIST } from "../content/services.ts";
import { faq } from "../content/faq.ts";

export const ServicesPage: React.FC = () => {
  return (
    <>
      <Seo
        title="Services and pricing | Williams"
        description="Website packages starting at $600, $1,000 and $1,500, plus a $59/month care plan for hosting, SSL, monitoring, small edits and fixes."
        path="/services"
      />

      <div className="pt-28 md:pt-36">
        {/* 1. HEADER (Title block) */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
            <h1 className="font-display font-bold text-[clamp(2.5rem,1.6rem+3.6vw,4.5rem)] text-bone tracking-tight mb-6 opsz-96">
              Services and pricing
            </h1>
            <p className="font-sans text-xl md:text-2xl text-bone-muted leading-relaxed max-w-[60ch]">
              Three ways to get a custom website, and one plan to keep it running.
              Every price is a starting point, and your exact quote comes after a
              15-minute call.
            </p>
          </div>
        </section>

        {/* 2. TIERS (Offset tier cards) */}
        <section className="pb-24 md:pb-32">
          <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-stretch">
              {/* Launch (cols 1-4) */}
              <div className="lg:col-span-4">
                <PricingTier
                  name={PRICING_TIERS[0].name}
                  price={PRICING_TIERS[0].price}
                  summary={PRICING_TIERS[0].summary}
                  includes={PRICING_TIERS[0].includes}
                />
              </div>

              {/* Growth (cols 5-8) */}
              <div className="lg:col-span-4">
                <PricingTier
                  name={PRICING_TIERS[1].name}
                  price={PRICING_TIERS[1].price}
                  summary={PRICING_TIERS[1].summary}
                  includes={PRICING_TIERS[1].includes}
                />
              </div>

              {/* Signature (cols 9-12, highlighted, sits 32px higher on lg) */}
              <div className="md:col-span-2 lg:col-span-4 lg:-mt-8">
                <PricingTier
                  name={PRICING_TIERS[2].name}
                  price={PRICING_TIERS[2].price}
                  summary={PRICING_TIERS[2].summary}
                  includes={PRICING_TIERS[2].includes}
                  highlighted={PRICING_TIERS[2].highlighted}
                />
              </div>
            </div>

            <p className="font-sans text-sm text-bone-subtle mt-8">
              Prices are in US dollars and are starting prices.
            </p>
          </div>
        </section>

        {/* 3. CARE PLAN (Wide single card) */}
        <section className="pb-24 md:pb-32">
          <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
            <Reveal>
              <Tilt3DCard maxTilt={3}>
                <GlassCard className="p-8 md:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left (cols 1-5) */}
                    <div className="lg:col-span-5">
                      <h2 className="font-display font-bold text-3xl md:text-4xl text-bone tracking-tight mb-4">
                        {CARE_PLAN.name}
                      </h2>
                      <span className="block font-mono text-[13px] font-medium text-bone-subtle tracking-[0.02em] mb-1">
                        {CARE_PLAN.billingPeriod}
                      </span>
                      <span className="font-mono text-4xl md:text-5xl font-medium text-bone tabular-nums">
                        ${CARE_PLAN.price}/mo
                      </span>
                    </div>

                    {/* Right (cols 6-12) */}
                    <div className="lg:col-span-7 flex flex-col items-start gap-6">
                      <p className="font-sans text-lg text-bone-muted leading-relaxed">
                        {CARE_PLAN.summary}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                        {CARE_PLAN.includes.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2.5">
                            <Check
                              size={18}
                              className="text-ember shrink-0"
                              weight="bold"
                            />
                            <span className="font-sans text-base text-bone">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2">
                        <Button to="/book" variant="primary">
                          Book a call
                        </Button>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Tilt3DCard>
            </Reveal>
          </div>
        </section>

        {/* 4. WHAT EVERY BUILD GETS (Bento Grid) */}
        <section className="py-24 md:py-32 border-t border-line">
          <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <Reveal>
                <h2 className="font-display font-semibold text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] text-bone tracking-tight mb-4 opsz-72">
                  What every build gets
                </h2>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="font-sans text-lg md:text-xl text-bone-muted leading-relaxed">
                  Every feature engineered to turn local visitors into paying clients — no templates, no bloat.
                </p>
              </Reveal>
            </div>
            <WhatYouGetBento />
          </div>
        </section>

        {/* 5. CLIENT REVIEWS */}
        <ReviewsSection />

        {/* 6. FAQ (Accordion) */}
        <section className="py-24 md:py-32 border-t border-line">
          <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
            <Reveal>
              <h2 className="font-display font-semibold text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] text-bone tracking-tight mb-12 opsz-72">
                Questions
              </h2>
            </Reveal>
            <div className="max-w-4xl">
              <FaqAccordion items={faq} />
            </div>
          </div>
        </section>

        {/* 6. BOOKING CTA BAND */}
        <BookingCtaBand />
      </div>
    </>
  );
};

export default ServicesPage;
