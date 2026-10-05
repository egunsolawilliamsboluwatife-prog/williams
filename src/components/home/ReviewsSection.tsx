import React, { useState } from "react";
import { Star, CheckCircle, ArrowRight } from "@phosphor-icons/react";
import { CLIENT_REVIEWS } from "../../content/reviews.ts";
import { Reveal } from "../ui/Reveal.tsx";
import { useBooking } from "../../context/BookingContext.tsx";
import { AnimatedCounter } from "../ui/AnimatedCounter.tsx";

export const ReviewsSection: React.FC = () => {
  const { openBookingModal } = useBooking();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Duplicate the array for a seamless, continuous infinite loop
  const marqueeReviews = [...CLIENT_REVIEWS, ...CLIENT_REVIEWS];

  return (
    <section className="py-20 md:py-28 border-t border-line relative overflow-hidden">
      {/* Subtle ambient ember glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-ember/[0.035] blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 mb-10 md:mb-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Reveal>
              <span className="font-mono text-xs text-bone-subtle uppercase tracking-widest block mb-2">
                Client Feedback · Verified Google Reviews
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="font-display font-semibold text-[clamp(2rem,1.4rem+2.2vw,3.25rem)] text-bone tracking-tight mb-3 opsz-72">
                Trusted by local business owners.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="font-sans text-base md:text-lg text-bone-muted max-w-[48ch] leading-relaxed">
                Short, unfiltered feedback from barbershops, CPAs, luxury studios, and trades after launching with Williams.
              </p>
            </Reveal>
          </div>

          {/* Clean 5.0 Rating Summary (No candy pill) */}
          <Reveal delay={0.15}>
            <div className="p-4 rounded-2xl bg-navy border border-line flex items-center gap-4 shrink-0 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 font-display font-bold text-xl">
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
                  Google Maps & Direct Inquiries
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Infinite Horizontal Auto-Scrolling Marquee */}
      <div className="relative w-full overflow-hidden group py-2">
        {/* Left & Right Gradient Infinity Masks */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 md:w-48 bg-gradient-to-r from-ink via-ink/80 to-transparent z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 md:w-48 bg-gradient-to-l from-ink via-ink/80 to-transparent z-10"
          aria-hidden="true"
        />

        {/* Scrolling Track */}
        <div
          className="flex gap-5 w-max animate-reviews-scroll hover:[animation-play-state:paused]"
          style={{ willChange: "transform" }}
        >
          {marqueeReviews.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="w-[310px] sm:w-[360px] md:w-[400px] shrink-0 p-6 md:p-7 rounded-[22px] bg-navy/70 border border-line hover:border-line-strong hover:bg-navy-raised transition-all duration-200 flex flex-col justify-between shadow-sm"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-3.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={15} weight="fill" />
                  ))}
                </div>

                {/* Human 3-4 Line Quote */}
                <p className="font-sans text-sm md:text-[15px] text-bone leading-relaxed line-clamp-4">
                  "{review.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-5 mt-5 border-t border-line/50 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-line/80 shadow shrink-0 bg-navy-deep flex items-center justify-center">
                  {review.avatar && !imageErrors[`${review.id}-${idx}`] ? (
                    <img
                      src={review.avatar}
                      alt={review.author}
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
                    <div className="w-full h-full flex items-center justify-center font-display font-bold text-xs text-bone bg-gradient-to-br from-navy-raised to-navy">
                      {review.author
                        .split(" ")
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-sans font-semibold text-xs md:text-sm text-bone truncate">
                      {review.author}
                    </span>
                    <span title="Verified Client" className="inline-flex">
                      <CheckCircle
                        size={13}
                        weight="fill"
                        className="text-emerald-400 shrink-0"
                      />
                    </span>
                  </div>
                  <span className="block text-[11px] text-bone-subtle truncate">
                    {review.role} · {review.business}
                  </span>
                  <span className="block text-[10px] font-mono text-bone-subtle">
                    {review.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Hint & Bottom CTA */}
      <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 mt-6">
        <div className="flex items-center justify-center text-xs font-mono text-bone-subtle gap-2 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
          <span>Hover or touch cards to pause scrolling</span>
        </div>

        {/* Bottom Conversion Band */}
        <div className="p-6 md:p-8 rounded-[24px] bg-navy-deep border border-line flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="font-display font-bold text-xl text-bone mb-1">
              Ready to grow your local business?
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

      {/* Keyframe Animation for buttery smooth 60fps scrolling */}
      <style>{`
        @keyframes reviews-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-reviews-scroll {
          animation: reviews-marquee 45s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-reviews-scroll {
            animation: none;
            overflow-x: auto;
          }
        }
      `}</style>
    </section>
  );
};
