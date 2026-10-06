import React, { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  PaintBrushBroad,
  CalendarCheck,
  MagnifyingGlass,
  Lightning,
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
  Star,
  MapPin,
  CheckCircle,
  Clock,
  LockKey,
} from "@phosphor-icons/react";
import { useBooking } from "../../context/BookingContext.tsx";

interface FeatureItem {
  id: string;
  number: string;
  title: string;
  shortSummary: string;
  fullDescription: string;
  clientName: string;
  clientNiche: string;
  clientLocation: string;
  previewType: "image" | "seo" | "speed" | "cloud";
  imageSrc?: string;
  imageAlt?: string;
  urlBar: string;
  tags: string[];
  impactMetric: string;
  impactLabel: string;
}

export const WhatYouGetBento: React.FC = () => {
  const { openBookingModal } = useBooking();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const features: FeatureItem[] = [
    {
      id: "bespoke-design",
      number: "01",
      title: "Bespoke Hand-Coded Design",
      shortSummary: "Zero templates. Every layout crafted for your local brand.",
      fullDescription:
        "Designed and hand-coded by Williams from a blank canvas. Every typography pairing, contrast ratio, and layout is engineered around how local clients evaluate quality and make hiring decisions.",
      clientName: "Barber's Society",
      clientNiche: "Luxury Barbershop & Grooming Lounge",
      clientLocation: "New York, NY",
      previewType: "image",
      imageSrc: "/work/barbers-society-desktop.webp",
      imageAlt: "Barber's Society website designed and built by Williams",
      urlBar: "https://barberssociety.com",
      tags: ["100% Custom Code", "Tailor-Made Typography", "Zero Page Builders"],
      impactMetric: "0%",
      impactLabel: "Template Bloat",
    },
    {
      id: "frictionless-booking",
      number: "02",
      title: "1-Tap Booking & Lead Flow",
      shortSummary: "Turn phone tag into confirmed appointments 24/7.",
      fullDescription:
        "Direct Google Calendar and appointment booking embedded natively. Visitors pick a time slot in seconds; calendar invites land immediately in your inbox with automated reminders.",
      clientName: "Best CPA Services",
      clientNiche: "Tax Strategy & Certified Public Accounting",
      clientLocation: "Dallas, TX",
      previewType: "image",
      imageSrc: "/work/best-cpa-services-desktop.webp",
      imageAlt: "Best CPA Services booking and intake website designed by Williams",
      urlBar: "https://bestcpaservices.com/consultation",
      tags: ["Google Calendar Sync", "Instant Form Validation", "Spam Protected"],
      impactMetric: "+42%",
      impactLabel: "Appointment Conversion",
    },
    {
      id: "google-local-seo",
      number: "03",
      title: "Google Local 3-Pack Authority",
      shortSummary: "Be the first business customers see when searching locally.",
      fullDescription:
        "Engineered with JSON-LD Schema.org structured data, neighborhood geo-targeting, and Google Business Profile optimization to help your business dominate the top 3 Google Maps results.",
      clientName: "Elite Barbers & Adrian Duany",
      clientNiche: "Master Grooming & Styling",
      clientLocation: "Miami, FL",
      previewType: "seo",
      urlBar: "https://google.com/search?q=best+barbers+miami",
      tags: ["JSON-LD Schema", "Google Maps 3-Pack", "Neighborhood Geo-Tags"],
      impactMetric: "#1",
      impactLabel: "Local Search Ranking",
    },
    {
      id: "sub-second-speed",
      number: "04",
      title: "Sub-1.2s Lightning Speed",
      shortSummary: "Instant page loads that prevent lost customers.",
      fullDescription:
        "Modern React architecture with optimized WebP media and zero bloated plugin scripts. Sub-second load times eliminate bounce rates and give you a significant Google SEO ranking advantage.",
      clientName: "Quality Affordable Cleaning",
      clientNiche: "Residential & Commercial Cleaning",
      clientLocation: "Columbus, OH",
      previewType: "speed",
      urlBar: "https://pagespeed.web.dev/analysis",
      tags: ["0.8s Initial Paint", "100/100 Lighthouse", "Zero Script Delay"],
      impactMetric: "0.8s",
      impactLabel: "Mobile Load Time",
    },
    {
      id: "cloud-care",
      number: "05",
      title: "White-Glove Cloud Hosting & Care",
      shortSummary: "Fast global hosting, SSL, and monthly updates handled.",
      fullDescription:
        "Global edge CDN, automated 256-bit SSL encryption, continuous uptime monitoring, and small monthly edits handled personally by Williams for $59/month so you never touch code.",
      clientName: "All Client Websites",
      clientNiche: "Managed Cloud Infrastructure",
      clientLocation: "Worldwide CDN Edge",
      previewType: "cloud",
      urlBar: "https://williams-cloud.edge/status",
      tags: ["99.99% Uptime SLA", "Automated SSL Renewal", "Direct Founder Support"],
      impactMetric: "99.99%",
      impactLabel: "Server Uptime",
    },
  ];

  const current = features[activeIndex];

  return (
    <div className="w-full">
      {/* Editorial Split: Interactive Options Left (cols 1-5), Visual Showcase Right (cols 6-12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT COLUMN: Large, Confident Interactive Feature List */}
        <div className="lg:col-span-5 flex flex-col space-y-3">
          <div className="mb-2">
            <span className="font-mono text-xs text-bone-subtle uppercase tracking-widest block">
              Core Capabilities · Hand-Coded by Williams
            </span>
          </div>

          <div className="flex flex-col space-y-2">
            {features.map((feature, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                    isActive
                      ? "bg-navy-raised border border-line shadow-lg"
                      : "bg-navy/40 border border-transparent hover:border-line hover:bg-navy/70"
                  }`}
                >
                  {/* Left accent bar on active */}
                  {isActive && (
                    <motion.div
                      layoutId="activeFeatureBar"
                      className="absolute left-0 top-0 bottom-0 w-1.5 bg-ember rounded-r"
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    />
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Monospace Number */}
                      <span
                        className={`font-mono text-sm font-semibold transition-colors mt-0.5 ${
                          isActive ? "text-ember" : "text-bone-subtle group-hover:text-bone"
                        }`}
                      >
                        {feature.number}
                      </span>

                      {/* Title & Short Summary */}
                      <div>
                        <h3
                          className={`font-display font-semibold text-lg md:text-xl tracking-tight transition-colors ${
                            isActive ? "text-bone" : "text-bone-muted group-hover:text-bone"
                          }`}
                        >
                          {feature.title}
                        </h3>
                        <p
                          className={`font-sans text-xs md:text-sm mt-1 transition-colors ${
                            isActive ? "text-bone-muted" : "text-bone-subtle"
                          }`}
                        >
                          {feature.shortSummary}
                        </p>
                      </div>
                    </div>

                    {/* Active pill / Arrow */}
                    <div className="shrink-0 mt-1">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                          isActive
                            ? "bg-ember text-navy font-bold"
                            : "bg-navy-deep text-bone-subtle group-hover:text-bone"
                        }`}
                      >
                        <ArrowRight size={13} weight={isActive ? "bold" : "regular"} />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick CTA under left menu */}
          <div className="pt-4 px-2 flex items-center justify-between">
            <span className="font-sans text-xs text-bone-subtle">
              Want these 5 pillars for your site?
            </span>
            <button
              type="button"
              onClick={() => openBookingModal()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ember hover:text-ember-bright transition-colors cursor-pointer group"
            >
              <span>Book 15-min call</span>
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: The Visual Hero Showcase (Actual Design & Live Preview) */}
        <div className="lg:col-span-7 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-navy rounded-[28px] border border-line p-5 sm:p-7 shadow-[var(--shadow-float)] relative overflow-hidden flex flex-col justify-between"
            >
              {/* Top Browser Chrome Frame */}
              <div className="w-full flex items-center justify-between pb-4 mb-5 border-b border-line/70">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-[11px] font-mono text-bone-subtle ml-2 hidden sm:inline">
                    Bespoke Showcase
                  </span>
                </div>

                {/* Sleek Browser Address Bar */}
                <div className="flex-1 max-w-xs mx-3 px-3 py-1 rounded-full bg-navy-deep border border-line text-[11px] font-mono text-bone-subtle truncate flex items-center gap-2 justify-center">
                  <LockKey size={11} className="text-emerald-400 shrink-0" />
                  <span className="truncate">{current.urlBar}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                    {current.impactMetric} {current.impactLabel}
                  </span>
                </div>
              </div>

              {/* Showcase Visual Area */}
              <div className="w-full rounded-2xl overflow-hidden bg-navy-deep border border-line/60 relative group min-h-[300px] sm:min-h-[360px] flex items-center justify-center">
                {/* 1. Real Website Image Preview */}
                {current.previewType === "image" && current.imageSrc && (
                  <div className="relative w-full h-[300px] sm:h-[360px] overflow-hidden">
                    <img
                      src={current.imageSrc}
                      alt={current.imageAlt || current.title}
                      width={1200}
                      height={750}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-transparent opacity-60" />
                  </div>
                )}

                {/* 2. Google Local 3-Pack Visual Simulation */}
                {current.previewType === "seo" && (
                  <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-center space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-line/60">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#4285F4] font-bold text-base shadow">
                        G
                      </div>
                      <div>
                        <span className="font-sans font-semibold text-sm text-bone block">
                          Google Search · Local 3-Pack Results
                        </span>
                        <span className="font-sans text-xs text-bone-subtle">
                          Top-ranked business in target metro area
                        </span>
                      </div>
                    </div>

                    {/* Map Result Snippet Card */}
                    <div className="p-4 rounded-xl bg-navy border border-line hover:border-emerald-500/40 transition-colors shadow-sm">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono font-bold text-white bg-emerald-600 px-1.5 py-0.5 rounded">
                              #1 Result
                            </span>
                            <h4 className="font-display font-bold text-base text-bone">
                              {current.clientName}
                            </h4>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-amber-400 mb-1">
                            <span>5.0</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={12} weight="fill" />
                              ))}
                            </div>
                            <span className="text-bone-subtle ml-1">(120+ verified Google reviews)</span>
                          </div>
                          <p className="font-sans text-xs text-bone-muted flex items-center gap-1">
                            <MapPin size={12} className="text-ember" />
                            {current.clientLocation} · Open now · Website & Directions
                          </p>
                        </div>
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 text-xs font-mono font-semibold">
                          Active
                        </span>
                      </div>
                    </div>

                    {/* Structured Schema Badge */}
                    <div className="p-3 rounded-xl bg-navy/60 border border-line text-xs font-mono text-bone-subtle flex items-center justify-between">
                      <span>Structured Data: Schema.org/LocalBusiness</span>
                      <span className="text-emerald-400">100% Validated</span>
                    </div>
                  </div>
                )}

                {/* 3. Sub-Second Speed Lighthouse Card */}
                {current.previewType === "speed" && (
                  <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-center space-y-6">
                    <div className="flex items-center justify-between pb-3 border-b border-line/60">
                      <span className="font-sans font-semibold text-sm text-bone">
                        Google Lighthouse Performance Audit
                      </span>
                      <span className="font-mono text-xs text-emerald-400 font-semibold">
                        Core Web Vitals: PASSED
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3.5 rounded-xl bg-navy border border-emerald-500/30 flex flex-col items-center justify-center text-center">
                        <span className="font-display font-extrabold text-2xl text-emerald-400">
                          100
                        </span>
                        <span className="font-sans text-[11px] text-bone-muted mt-1">
                          Performance
                        </span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-navy border border-emerald-500/30 flex flex-col items-center justify-center text-center">
                        <span className="font-display font-extrabold text-2xl text-emerald-400">
                          0.8s
                        </span>
                        <span className="font-sans text-[11px] text-bone-muted mt-1">
                          LCP Mobile
                        </span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-navy border border-emerald-500/30 flex flex-col items-center justify-center text-center">
                        <span className="font-display font-extrabold text-2xl text-emerald-400">
                          0 ms
                        </span>
                        <span className="font-sans text-[11px] text-bone-muted mt-1">
                          Total Blocking
                        </span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-navy border border-emerald-500/30 flex flex-col items-center justify-center text-center">
                        <span className="font-display font-extrabold text-2xl text-emerald-400">
                          100
                        </span>
                        <span className="font-sans text-[11px] text-bone-muted mt-1">
                          SEO Score
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-navy/60 border border-line text-xs font-mono text-bone-subtle flex items-center justify-between">
                      <span>WordPress Average: 4.8s</span>
                      <span className="text-emerald-400 font-semibold">Williams React: 0.8s (6x Faster)</span>
                    </div>
                  </div>
                )}

                {/* 4. Cloud Care & Hosting Monitor */}
                {current.previewType === "cloud" && (
                  <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-center space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-line/60">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-sans font-semibold text-sm text-bone">
                          Cloud CDN & Care Plan Status
                        </span>
                      </div>
                      <span className="font-mono text-xs text-bone-subtle">
                        $59 / month
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="p-3.5 rounded-xl bg-navy border border-line flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <LockKey size={18} className="text-emerald-400" />
                          <span className="font-sans text-xs text-bone">
                            256-bit SSL Security & Automated Renewal
                          </span>
                        </div>
                        <span className="font-mono text-xs text-emerald-400 font-medium">Secured</span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-navy border border-line flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Clock size={18} className="text-emerald-400" />
                          <span className="font-sans text-xs text-bone">
                            Continuous 24/7 Global Uptime Monitoring
                          </span>
                        </div>
                        <span className="font-mono text-xs text-emerald-400 font-medium">99.99%</span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-navy border border-line flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CheckCircle size={18} className="text-emerald-400" />
                          <span className="font-sans text-xs text-bone">
                            Monthly Content Edits & Direct Text/Email Support
                          </span>
                        </div>
                        <span className="font-mono text-xs text-emerald-400 font-medium">Included</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Text Below Visual: High-End Editorial Attribution */}
              <div className="pt-6 mt-2 border-t border-line/60 flex flex-col space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <h4 className="font-display font-bold text-xl text-bone tracking-tight">
                    {current.clientName}
                  </h4>
                  <span className="font-sans text-xs text-bone-subtle">
                    {current.clientNiche} · {current.clientLocation}
                  </span>
                </div>

                <p className="font-sans text-sm md:text-base text-bone-muted leading-relaxed">
                  {current.fullDescription}
                </p>

                {/* Clean, Unboxed Typographic Tags (Zero candy pills) */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-2 text-xs font-mono text-bone-subtle">
                  {current.tags.map((tag, i) => (
                    <React.Fragment key={i}>
                      <span className="text-bone-muted font-medium">{tag}</span>
                      {i < current.tags.length - 1 && <span className="text-line-strong">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Pricing & Scoping Band */}
      <div className="mt-12 p-6 md:p-8 rounded-2xl bg-navy-deep/80 border border-line flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-display font-semibold text-lg md:text-xl text-bone mb-1">
            Need these 5 pillars for your business?
          </h3>
          <p className="font-sans text-xs md:text-sm text-bone-muted">
            Launch ($600+), Growth ($1,000+), and Signature ($1,500+) with custom feature scoping.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => openBookingModal()}
            className="flex-1 sm:flex-none px-6 h-11 rounded-full bg-ember hover:bg-ember-bright text-navy font-sans font-bold text-xs md:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>Book a 15-min call</span>
            <ArrowRight size={14} weight="bold" />
          </button>
          <Link
            to="/services"
            className="flex-1 sm:flex-none px-5 h-11 rounded-full glass border border-line hover:border-line-strong text-bone font-sans font-medium text-xs md:text-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Compare tiers</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
