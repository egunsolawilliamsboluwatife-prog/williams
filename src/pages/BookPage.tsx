import React from "react";
import { Seo } from "../components/ui/Seo.tsx";
import { AvailabilityDot } from "../components/ui/AvailabilityDot.tsx";
import { BookingEmbed } from "../components/booking/BookingEmbed.tsx";
import { ClientIntakeForm } from "../components/forms/ClientIntakeForm.tsx";
import { GlassCard } from "../components/ui/GlassCard.tsx";
import { SocialLinks } from "../components/ui/SocialLinks.tsx";
import { CONTACT_EMAIL } from "../config/site.ts";

export const BookPage: React.FC = () => {
  return (
    <>
      <Seo
        title="Book a call | Williams"
        description="Book a free 15-minute call with Williams via Google Meet or Cal.com. Available 24/7, pick any time. Or send an inquiry message."
        path="/book"
        image="/williams-warm-grey.jpg"
      />

      <div className="pt-28 md:pt-36">
        {/* 1. HEADER + CALENDAR (Split, calendar dominant) */}
        <section className="pb-24">
          <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column (cols 1-5 at lg) */}
              <div className="lg:col-span-5 flex flex-col items-start">
                <AvailabilityDot label="Available 24/7" className="mb-6" />

                <h1 className="font-display font-bold text-[clamp(2.5rem,1.6rem+3.6vw,4.5rem)] text-bone tracking-tight mb-6 opsz-96">
                  Book a 15-minute call.
                </h1>

                <p className="font-sans text-xl text-bone-muted leading-relaxed mb-4">
                  Pick any time, any day. Choose between Google Meet or Cal.com,
                  and the invite lands in your inbox as soon as you book.
                </p>

                <p className="font-sans text-sm text-bone-subtle mb-10">
                  Times automatically adjust to your local time zone.
                </p>

                {/* Portrait (hidden below lg so calendar comes first on phones) */}
                <div className="hidden lg:block w-full">
                  <img
                    src="/williams-warm-grey.jpg"
                    alt="Williams smiling in a black T-shirt against a warm grey background"
                    width={1048}
                    height={592}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto rounded-[24px] object-cover shadow-[var(--shadow-soft)]"
                  />
                </div>
              </div>

              {/* Right Column: Calendar Embed (cols 6-12 at lg) */}
              <div className="lg:col-span-7 w-full">
                <BookingEmbed />
              </div>
            </div>
          </div>
        </section>

        {/* 2. PROJECT INTAKE FORM (Pre-flight checklist & guided fields) */}
        <section id="message" className="py-24 border-t border-line">
          <div className="max-w-[1040px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="font-display font-semibold text-3xl md:text-4xl text-bone tracking-tight mb-3">
                Prefer to write? Submit your project details.
              </h2>
              <p className="font-sans text-lg text-bone-muted leading-relaxed">
                Review the 5 items below and submit your specifications. Every inquiry lands directly in Egunsola Williams' inbox with a guaranteed response within 24 hours.
              </p>
            </div>
            <ClientIntakeForm />
          </div>
        </section>

        {/* 3. DIRECT CONTACT STRIP (Inline row) */}
        <section className="py-16 border-t border-line">
          <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
              <p className="font-sans text-base text-bone-muted">
                Or email{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-ember underline underline-offset-4 hover:underline font-medium"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
              <SocialLinks />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BookPage;
