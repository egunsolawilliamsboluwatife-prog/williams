import React, { useState } from "react";
import { Star, CheckCircle, ArrowRight } from "@phosphor-icons/react";
import { CLIENT_REVIEWS } from "../../content/reviews.ts";
import { Reveal } from "../ui/Reveal.tsx";
import { useBooking } from "../../context/BookingContext.tsx";
import { AnimatedCounter } from "../ui/AnimatedCounter.tsx";

export const ReviewsSection: React.FC = () => {
  const { openBookingModal } = useBooking();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Duplicate for a seamless, continuous infinite horizontal marquee
  const marqueeReviews = [...CLIENT_REVIEWS, ...CLIENT_REVIEWS];

  return (
    <section className="py-24 md:py-32 border-t border-line relative overflow-hidden bg-ink/40">
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-ember/[0.04] blur-[150px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 mb-12">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Reveal>
              <span className="font-mono text-xs text-ember font-medium uppercase tracking-widest block mb-2">
                Client Reviews · Verified 5.0
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="font-display font-semibold text-[clamp(2rem,1.4rem+2.2vw,3.25rem)] text-bone tracking-tight mb-3 opsz-72">
                Trusted by local business owners.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="font-sans text-base md:text-lg text-bone-muted max-w-[50ch] leading-relaxed">
                Feedback from barbers, CPAs, studio owners, and trades after launching their custom website with Williams.
              </p>
            </Reveal>
          </div>

          {/* 5.0 Star Summary Box */}
          <Reveal delay={0.15}>
            <div className="p-4 sm:p-5 rounded-2xl bg-navy/90 border border-line flex items-center gap-4 shrink-0 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-display font-bold text-2xl">
                <AnimatedCounter value={5.0} decimals={1} />
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} weight="fill" />
                  ))}
                </div>
                <div className="text-xs font-sans text-bone font-semibold">
                  100% 5-Star Reviews
                </div>
                <div className="text-[11px] font-mono text-bone-subtle">
                  Verified Client Feedback
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Infinite Horizontal Auto-Moving Track (Moves horizontally by itself) */}
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
        <div className="reviews-marquee-track gap-6 px-4">
          {marqueeReviews.map((review, idx) => {
            const firstName = review.author.trim().split(" ")[0].replace(/,/g, "");

            return (
              <div
                key={`${review.id}-${idx}`}
                className="w-[310px] sm:w-[350px] md:w-[380px] shrink-0 p-6 md:p-7 rounded-[24px] bg-navy/80 border border-line hover:border-line-strong hover:bg-navy-raised transition-all duration-300 flex flex-col justify-between shadow-md"
              >
                <div>
                  {/* Rating Stars & Verified Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={15} weight="fill" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                      <CheckCircle size={11} weight="fill" />
                      <span>Verified Review</span>
                    </span>
                  </div>

                  {/* Clean Quote */}
                  <p className="font-sans text-sm md:text-[15px] text-bone leading-relaxed">
                    "{review.quote}"
                  </p>
                </div>

                {/* Author Footer (Single first name, no company) */}
                <div className="pt-5 mt-6 border-t border-line/60 flex items-center gap-3.5">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border border-line/90 shadow-md shrink-0 bg-navy-deep flex items-center justify-center">
                    {review.avatar && !imageErrors[`${review.id}-${idx}`] ? (
                      <img
                        src={review.avatar}
                        alt={firstName}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={() =>
                          setImageErrors((prev) => ({
                            ...prev,
                            [`${review.id}-${idx}`]: true,
                          }))
                        }
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-display font-bold text-sm text-bone bg-navy-raised">
                        {firstName.slice(0, 1)}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-sans font-bold text-sm text-bone truncate">
                        {firstName}
                      </span>
                    </div>
                    <span className="block text-[11px] font-mono text-bone-subtle">
                      {review.location}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Hint & Conversion Band */}
      <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 mt-6">
        <div className="flex items-center justify-center text-xs font-mono text-bone-subtle gap-2 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
          <span>Hover or tap any review to pause</span>
        </div>

        {/* Bottom Conversion Band */}
        <div className="p-6 md:p-8 rounded-[24px] bg-navy-deep border border-line flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-lg">
          <div>
            <h3 className="font-display font-bold text-xl text-bone mb-1">
              Ready to get results like these?
            </h3>
            <p className="font-sans text-xs md:text-sm text-bone-muted">
              Get a custom website with 1-tap booking, local Google optimization, and zero monthly stress.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openBookingModal()}
            className="px-6 py-3 rounded-full bg-ember hover:bg-ember-bright text-navy font-sans font-bold text-xs md:text-sm transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer active:scale-98"
          >
            <span>Book a 15-min call</span>
            <ArrowRight size={15} weight="bold" />
          </button>
        </div>
      </div>
    </section>
  );
};
