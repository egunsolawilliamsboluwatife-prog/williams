import React, { useState } from "react";
import { Star, CheckCircle, ShieldCheck, ArrowRight, CaretDown, CaretUp } from "@phosphor-icons/react";
import { CLIENT_REVIEWS } from "../../content/reviews.ts";
import { Reveal } from "../ui/Reveal.tsx";
import { useBooking } from "../../context/BookingContext.tsx";
import { Tilt3DCard } from "../ui/Tilt3DCard.tsx";
import { AnimatedCounter } from "../ui/AnimatedCounter.tsx";

export const ReviewsSection: React.FC = () => {
  const { openBookingModal } = useBooking();
  const [showAll, setShowAll] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const displayedReviews = showAll ? CLIENT_REVIEWS : CLIENT_REVIEWS.slice(0, 3);

  return (
    <section className="py-20 md:py-28 border-t border-line relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-ember/5 blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-3">
                <ShieldCheck size={14} weight="bold" />
                <span>Verified Client Reviews</span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="font-display font-semibold text-[clamp(2rem,1.4rem+2.2vw,3.25rem)] text-bone tracking-tight mb-3 opsz-72">
                Proven results for local businesses
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="font-sans text-base md:text-lg text-bone-muted max-w-[50ch]">
                Read what barbershop owners, CPA firms, luxury studios, and trades say after launching with Williams.
              </p>
            </Reveal>
          </div>

          {/* Google 5.0 Star Summary Pill */}
          <Reveal delay={0.15}>
            <div className="glass p-3.5 px-5 rounded-2xl border border-line flex items-center gap-4 shrink-0 shadow-lg">
              <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-display font-bold text-lg">
                <AnimatedCounter value={5.0} decimals={1} />
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} weight="fill" />
                  ))}
                </div>
                <div className="text-xs font-sans text-bone font-medium">
                  100% 5-Star Rating
                </div>
                <div className="text-[11px] font-mono text-bone-subtle">
                  Google & Direct Reviews
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedReviews.map((review, idx) => (
            <Reveal key={review.id} delay={idx * 0.05}>
              <Tilt3DCard maxTilt={5} className="h-full">
                <div className="glass rounded-[24px] p-6 md:p-7 border border-line flex flex-col justify-between h-full hover:border-line-strong transition-all duration-200">
                  <div>
                    {/* Top Row: Stars + Result Pill */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={14} weight="fill" />
                        ))}
                      </div>
                      {review.metricBadge && (
                        <span className="font-mono text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                          {review.metricBadge.value} {review.metricBadge.label}
                        </span>
                      )}
                    </div>

                    {/* Main Quote */}
                    <p className="font-sans text-sm text-bone-muted leading-relaxed mb-6">
                      "{review.quote}"
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="pt-4 border-t border-line/60 flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border border-line/80 shadow-md shrink-0 bg-navy-raised flex items-center justify-center">
                      {review.avatar && !imageErrors[review.id] ? (
                        <img
                          src={review.avatar}
                          alt={review.author}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          onError={() =>
                            setImageErrors((prev) => ({ ...prev, [review.id]: true }))
                          }
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-display font-bold text-xs text-bone tracking-wide bg-gradient-to-br from-navy-raised to-navy">
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
                        <span className="font-sans font-semibold text-xs text-bone truncate">
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
              </Tilt3DCard>
            </Reveal>
          ))}
        </div>

        {/* Toggle between 3 and 6 reviews */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-navy-deep border border-line hover:border-line-strong text-xs font-mono text-bone-muted hover:text-bone transition-all cursor-pointer"
          >
            <span>{showAll ? "Show fewer reviews" : `View all client reviews (${CLIENT_REVIEWS.length})`}</span>
            {showAll ? <CaretUp size={14} /> : <CaretDown size={14} />}
          </button>
        </div>

        {/* Bottom Conversion Band */}
        <div className="mt-14 p-6 md:p-8 rounded-[24px] bg-navy-deep border border-line flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
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
            onClick={() => openBookingModal("compare")}
            className="px-6 py-3 rounded-xl bg-ember hover:bg-ember-bright text-navy font-sans font-bold text-xs md:text-sm transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Book a 15-min call</span>
            <ArrowRight size={15} weight="bold" />
          </button>
        </div>
      </div>
    </section>
  );
};
