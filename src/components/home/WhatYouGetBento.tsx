import React, { useState } from "react";
import { Link } from "react-router";
import {
  PaintBrushBroad,
  CalendarCheck,
  MagnifyingGlass,
  Lightning,
  ShieldCheck,
  ArrowRight,
  PhoneCall,
  CheckCircle,
  CaretRight,
  CaretDown,
} from "@phosphor-icons/react";
import { useBooking } from "../../context/BookingContext.tsx";

interface FeatureDetail {
  id: string;
  number: string;
  icon: typeof PaintBrushBroad;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  keyMetric: string;
  tierBadge: string;
  accentColor: string;
  iconBg: string;
  borderColor: string;
}

export const WhatYouGetBento: React.FC = () => {
  const { openBookingModal } = useBooking();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const features: FeatureDetail[] = [
    {
      id: "bespoke-design",
      number: "01",
      icon: PaintBrushBroad,
      title: "Bespoke Custom Design",
      tagline: "Engineered from a blank canvas for your local brand",
      description:
        "Every page is hand-coded from scratch around how your local customers actually search, evaluate, and buy. Zero generic WordPress templates, clunky page builders, or recycled agency themes.",
      deliverables: [
        "100% tailor-made typography and brand palette",
        "Mobile-first navigation designed for thumb reach",
        "Clean, semantic code that Google crawlers favor",
      ],
      keyMetric: "Zero Template Bloat",
      tierBadge: "Included in all tiers",
      accentColor: "text-ember",
      iconBg: "bg-ember/10 border-ember/25 text-ember",
      borderColor: "border-ember/40",
    },
    {
      id: "booking-leads",
      number: "02",
      icon: CalendarCheck,
      title: "1-Tap Booking & Lead Capture",
      tagline: "Turn passive mobile visitors into booked appointments",
      description:
        "Give your clients a frictionless way to reserve time, request a quote, or tap-to-call in seconds. Submissions land directly in your Gmail inbox with automated notifications.",
      deliverables: [
        "Instant booking forms and quote calculators",
        "Direct email delivery with zero missed inquiries",
        "Spam-filtering honeypots and validation built in",
      ],
      keyMetric: "+42% Booking Conversion",
      tierBadge: "Included in all tiers",
      accentColor: "text-emerald-400",
      iconBg: "bg-emerald-500/10 border-emerald-500/25 text-emerald-400",
      borderColor: "border-emerald-500/40",
    },
    {
      id: "local-seo",
      number: "03",
      icon: MagnifyingGlass,
      title: "Google Local 3-Pack SEO",
      tagline: "Be the first business customers see when searching locally",
      description:
        "Full local SEO architecture with JSON-LD schema, neighborhood geo-targeting, and Google Business Profile optimization to put your business at the top of Google Maps.",
      deliverables: [
        "Local business Schema.org structured data",
        "OpenGraph social share previews for text & social",
        "City and service-area keyword architecture",
      ],
      keyMetric: "#1 Local Map Ranking",
      tierBadge: "Growth & Signature tiers",
      accentColor: "text-sky-400",
      iconBg: "bg-sky-500/10 border-sky-500/25 text-sky-400",
      borderColor: "border-sky-500/40",
    },
    {
      id: "performance-speed",
      number: "04",
      icon: Lightning,
      title: "Under 1.2s Load Speed",
      tagline: "Instant load times that prevent lost leads",
      description:
        "Handcrafted in modern React with optimized asset delivery. High-speed websites keep impatient visitors on your page and earn higher algorithmic ranking on Google.",
      deliverables: [
        "Sub-1.2-second initial paint on 4G cellular",
        "Hardware-accelerated 60fps micro-animations",
        "99+ Google PageSpeed mobile performance",
      ],
      keyMetric: "1.1s Average Load Time",
      tierBadge: "Signature tier",
      accentColor: "text-amber-400",
      iconBg: "bg-amber-500/10 border-amber-500/25 text-amber-400",
      borderColor: "border-amber-500/40",
    },
    {
      id: "care-maintenance",
      number: "05",
      icon: ShieldCheck,
      title: "Worry-Free Cloud Hosting & Care",
      tagline: "Hosting, security, and monthly edits handled for you",
      description:
        "Global edge hosting, 256-bit SSL certificate, continuous uptime monitoring, and small monthly edits handled personally by Williams so you never have to think about tech.",
      deliverables: [
        "High-performance global CDN with 99.9% uptime",
        "SSL security encryption and automated renewals",
        "Direct email/text support for ongoing website updates",
      ],
      keyMetric: "$59/mo Peace of Mind",
      tierBadge: "Optional $59/mo care plan",
      accentColor: "text-purple-400",
      iconBg: "bg-purple-500/10 border-purple-500/25 text-purple-400",
      borderColor: "border-purple-500/40",
    },
  ];

  const activeFeature = features[activeIndex];
  const ActiveIcon = activeFeature.icon;

  return (
    <div className="w-full space-y-10">
      {/* Interactive Master-Detail Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* LEFT PANEL: Expanded Detail Card (Changes / expands when list item is clicked) */}
        <div className="lg:col-span-7 flex flex-col">
          <div
            key={activeFeature.id}
            className="glass rounded-[28px] p-8 md:p-10 border border-line hover:border-line-strong transition-all duration-300 flex-1 flex flex-col justify-between shadow-2xl relative overflow-hidden animate-fade-in"
          >
            {/* Subtle background ambient glow matching feature color */}
            <div
              className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none -z-10 opacity-15 ${
                activeFeature.id === "bespoke-design"
                  ? "bg-ember"
                  : activeFeature.id === "booking-leads"
                  ? "bg-emerald-500"
                  : activeFeature.id === "local-seo"
                  ? "bg-sky-500"
                  : activeFeature.id === "performance-speed"
                  ? "bg-amber-500"
                  : "bg-purple-500"
              }`}
            />

            <div>
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl ${activeFeature.iconBg} border flex items-center justify-center shadow-md`}
                  >
                    <ActiveIcon size={24} weight="bold" />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-bone-subtle uppercase tracking-widest block">
                      Deliverable {activeFeature.number}
                    </span>
                    <span className="font-mono text-xs font-semibold text-emerald-400">
                      {activeFeature.keyMetric}
                    </span>
                  </div>
                </div>

                <span className="font-mono text-xs text-bone-subtle px-3 py-1 rounded-full bg-navy-deep border border-line">
                  {activeFeature.tierBadge}
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="font-display font-bold text-2xl md:text-3xl text-bone tracking-tight mb-2">
                {activeFeature.title}
              </h3>
              <p className={`font-sans text-sm md:text-base font-medium ${activeFeature.accentColor} mb-5`}>
                {activeFeature.tagline}
              </p>

              {/* Plain-English Description */}
              <p className="font-sans text-base text-bone-muted leading-relaxed mb-8">
                {activeFeature.description}
              </p>

              {/* Key Deliverables List */}
              <div className="space-y-3 pt-6 border-t border-line/60 mb-8">
                <span className="block font-mono text-[11px] text-bone-subtle uppercase tracking-wider mb-2">
                  What you receive:
                </span>
                {activeFeature.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle
                      size={18}
                      weight="fill"
                      className="text-emerald-400 shrink-0 mt-0.5"
                    />
                    <span className="font-sans text-sm text-bone font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action in Panel */}
            <div className="pt-6 border-t border-line/60 flex items-center justify-between gap-4">
              <span className="text-xs font-sans text-bone-subtle">
                Want this implemented for your business?
              </span>
              <button
                type="button"
                onClick={() => openBookingModal("compare")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ember hover:bg-ember-bright text-navy font-sans font-bold text-xs transition-all shadow-md cursor-pointer"
              >
                <span>Book 15-min call</span>
                <ArrowRight size={13} weight="bold" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Simple Interactive List (Click to expand / change left panel) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          <div className="space-y-2.5">
            <span className="block font-mono text-xs text-bone-subtle uppercase tracking-wider px-2 mb-1">
              Select a feature to explore:
            </span>

            {features.map((feature, index) => {
              const isSelected = activeIndex === index;
              const Icon = feature.icon;

              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left p-4 md:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 group ${
                    isSelected
                      ? `bg-navy-raised ${feature.borderColor} shadow-lg ring-1 ring-bone/10`
                      : "bg-navy-deep/80 border-line hover:border-line-strong hover:bg-navy-raised/50"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Number / Icon */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                        isSelected
                          ? feature.iconBg
                          : "bg-navy border-line text-bone-subtle group-hover:text-bone"
                      }`}
                    >
                      <Icon size={18} weight={isSelected ? "bold" : "regular"} />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-bone-subtle font-medium">
                          {feature.number}.
                        </span>
                        <h4
                          className={`font-sans font-semibold text-sm md:text-base truncate transition-colors ${
                            isSelected ? "text-bone" : "text-bone-muted group-hover:text-bone"
                          }`}
                        >
                          {feature.title}
                        </h4>
                      </div>
                      <span className="block text-[11px] font-mono text-bone-subtle truncate mt-0.5">
                        {feature.tierBadge}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5">
                    {isSelected ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-navy text-[11px] font-mono text-emerald-400 border border-emerald-500/20">
                        Active
                      </span>
                    ) : (
                      <CaretRight
                        size={16}
                        className="text-bone-subtle group-hover:text-bone group-hover:translate-x-0.5 transition-all"
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom helper prompt */}
          <div className="p-4 rounded-xl bg-navy-deep/50 border border-line text-xs font-sans text-bone-muted flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
            <span>Click any item in the list above to view full deliverables & metrics.</span>
          </div>
        </div>
      </div>

      {/* Clean Bottom Action Band */}
      <div className="glass rounded-[24px] p-6 md:p-8 border border-line/80 flex flex-col sm:flex-row items-center justify-between gap-6 bg-navy-deep/60 shadow-xl">
        <div className="text-center sm:text-left">
          <h4 className="font-display font-bold text-lg md:text-xl text-bone mb-1">
            Need a tailored package for your business?
          </h4>
          <p className="font-sans text-xs md:text-sm text-bone-muted">
            Launch ($1,000+), Growth ($1,500+), and Signature ($2,300+) with custom feature scoping.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => openBookingModal("compare")}
            className="px-6 h-11 rounded-full bg-ember hover:bg-ember-bright text-navy font-sans font-bold text-xs md:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-98"
          >
            <PhoneCall size={16} weight="bold" />
            <span>Book a 15-min call</span>
          </button>
          <Link
            to="/services"
            className="px-5 h-11 rounded-full glass border border-line hover:border-line-strong text-bone font-sans font-medium text-xs md:text-sm flex items-center gap-1.5 transition-colors"
          >
            <span>Compare tiers</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};
