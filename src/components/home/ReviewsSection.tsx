import React, { useState } from "react";
import { Star, CheckCircle, ShieldCheck, Quotes, ArrowRight } from "@phosphor-icons/react";
import { CLIENT_REVIEWS, Review } from "../../content/reviews.ts";
import { Reveal } from "../ui/Reveal.tsx";
import { useBooking } from "../../context/BookingContext.tsx";

export const ReviewsSection: React.FC = () => {
  const { openBookingModal } = useBooking();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredReviews =
    activeFilter === "all"
      ? CLIENT_REVIEWS
      : CLIENT_REVIEWS.filter((r) =>
          r.serviceTier.toLowerCase().includes(activeFilter.toLowerCase())
        );

  return (
    <section className="py-24 md:py-32 border-t border-line relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-ember/5 blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-4">
                <ShieldCheck size={14} weight="bold" />
                <span>Verified Client Outcomes</span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="font-display font-semibold text-[clamp(2.2rem,1.4rem+2.6vw,3.5rem)] text-bone tracking-tight mb-4 opsz-72">
                What local business owners say
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="font-sans text-lg text-bone-muted max-w-[54ch]">
                Real results from barbershops, CPA firms, event rental companies, and trades. Every project built directly by Egunsola Williams.
              </p>
            </Reveal>
          </div>

          {/* Google 5.0 Star Summary Pill */}
          <Reveal delay={0.15}>
            <div className="glass p-4 rounded-2xl border border-line flex items-center gap-4 shrink-0">
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <span className="font-display font-extrabold text-xl">5.0</span>
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} weight="fill" />
                  ))}
                </div>
                <div className="text-xs font-sans text-bone font-medium">
                  100% 5-Star Reviews
                </div>
                <div className="text-[11px] font-mono text-bone-subtle">
                  48+ verified local clients
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2 pb-8 overflow-x-auto no-scrollbar">
          {[
            { id: "all", label: "All Reviews" },
            { id: "signature", label: "Signature Tier" },
            { id: "growth", label: "Growth Tier" },
            { id: "launch", label: "Launch Tier" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                activeFilter === f.id
                  ? "bg-bone text-ink shadow-sm"
                  : "bg-navy-deep border border-line text-bone-muted hover:text-bone hover:border-line-strong"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review, idx) => (
            <Reveal key={review.id} delay={idx * 0.06}>
              <div className="glass rounded-[24px] p-7 border border-line flex flex-col justify-between h-full group hover:border-line-strong hover:-translate-y-1 transition-all duration-300">
                <div>
                  {/* Top Row: Stars + Metric */}
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

                  {/* Highlight Quote */}
                  <h3 className="font-display font-semibold text-lg text-bone leading-snug mb-3 tracking-tight">
                    "{review.highlight}"
                  </h3>

                  {/* Full Testimonial */}
                  <p className="font-sans text-sm text-bone-muted leading-relaxed mb-6">
                    {review.quote}
                  </p>
                </div>

                {/* Author Details Footer */}
                <div className="pt-4 border-t border-line/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border border-line/80 shadow-md shrink-0 bg-navy-raised">
                      {review.avatar ? (
                        <img
                          src={review.avatar}
                          alt={review.author}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-display font-bold text-xs text-bone tracking-wide">
                          {review.author
                            .split(" ")
                            .slice(0, 2)
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-sans font-semibold text-xs text-bone">
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
                      <span className="block text-[11px] text-bone-subtle">
                        {review.role} · {review.business}
                      </span>
                      <span className="block text-[10px] font-mono text-bone-subtle">
                        {review.location}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-[10px] text-bone-subtle self-end">
                    {review.date}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA Bar below reviews */}
        <div className="mt-16 text-center">
          <button
            type="button"
            onClick={() => openBookingModal("compare")}
            className="inline-flex items-center gap-2 text-ember hover:text-ember-bright font-sans text-sm font-semibold transition-colors group cursor-pointer"
          >
            <span>Ready to see what Williams can build for your business?</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
