import React from "react";
import { Link } from "react-router";
import {
  PaintBrushBroad,
  CalendarCheck,
  MagnifyingGlass,
  Sparkle,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  PhoneCall,
} from "@phosphor-icons/react";
import { SERVICES_LIST } from "../../content/services.ts";
import { useBooking } from "../../context/BookingContext.tsx";

export const WhatYouGetBento: React.FC = () => {
  const { openBookingModal } = useBooking();
  const [s1, s2, s3, s4, s5] = SERVICES_LIST;

  const cardIcons = [
    {
      icon: PaintBrushBroad,
      color: "text-ember",
      bg: "bg-ember/15 border-ember/30",
      accent: "hover:border-ember/50",
    },
    {
      icon: CalendarCheck,
      color: "text-emerald-400",
      bg: "bg-emerald-500/15 border-emerald-500/30",
      accent: "hover:border-emerald-500/50",
    },
    {
      icon: MagnifyingGlass,
      color: "text-sky-400",
      bg: "bg-sky-500/15 border-sky-500/30",
      accent: "hover:border-sky-500/50",
    },
    {
      icon: Sparkle,
      color: "text-amber-400",
      bg: "bg-amber-500/15 border-amber-500/30",
      accent: "hover:border-amber-500/50",
    },
    {
      icon: ShieldCheck,
      color: "text-purple-400",
      bg: "bg-purple-500/15 border-purple-500/30",
      accent: "hover:border-purple-500/50",
    },
  ];

  return (
    <div className="w-full space-y-8">
      {/* 5-Card High-Converting Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {/* CARD 1: Bespoke Design (Cols 1-6) */}
        <div className="lg:col-span-6 glass rounded-[26px] p-7 md:p-9 border border-line hover:border-line-strong hover:bg-navy-raised transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className={`w-12 h-12 rounded-2xl ${cardIcons[0].bg} border flex items-center justify-center ${cardIcons[0].color} shadow-sm`}>
                <PaintBrushBroad size={24} weight="bold" />
              </div>
              <span className="font-mono text-xs text-bone-subtle px-3 py-1 rounded-full bg-navy border border-line">
                {s1.tier}
              </span>
            </div>

            <h3 className="font-display font-bold text-2xl text-bone tracking-tight mb-1.5">
              {s1.title}
            </h3>
            <p className="font-sans text-xs md:text-sm font-medium text-ember mb-4">
              {s1.tagline}
            </p>
            <p className="font-sans text-base text-bone-muted leading-relaxed mb-6">
              {s1.body}
            </p>
          </div>

          <div className="pt-4 border-t border-line/60 space-y-2.5">
            {s1.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs md:text-sm text-bone-muted">
                <CheckCircle size={16} weight="fill" className="text-emerald-400 shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 2: Booking and Quote Forms (Cols 7-12) */}
        <div className="lg:col-span-6 glass rounded-[26px] p-7 md:p-9 border border-line hover:border-line-strong hover:bg-navy-raised transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className={`w-12 h-12 rounded-2xl ${cardIcons[1].bg} border flex items-center justify-center ${cardIcons[1].color} shadow-sm`}>
                <CalendarCheck size={24} weight="bold" />
              </div>
              <span className="font-mono text-xs text-bone-subtle px-3 py-1 rounded-full bg-navy border border-line">
                {s2.tier}
              </span>
            </div>

            <h3 className="font-display font-bold text-2xl text-bone tracking-tight mb-1.5">
              {s2.title}
            </h3>
            <p className="font-sans text-xs md:text-sm font-medium text-emerald-400 mb-4">
              {s2.tagline}
            </p>
            <p className="font-sans text-base text-bone-muted leading-relaxed mb-6">
              {s2.body}
            </p>
          </div>

          <div className="pt-4 border-t border-line/60 space-y-2.5">
            {s2.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs md:text-sm text-bone-muted">
                <CheckCircle size={16} weight="fill" className="text-emerald-400 shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 3: Found on Google (Cols 1-4) */}
        <div className="lg:col-span-4 glass rounded-[26px] p-7 md:p-8 border border-line hover:border-line-strong hover:bg-navy-raised transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className={`w-11 h-11 rounded-2xl ${cardIcons[2].bg} border flex items-center justify-center ${cardIcons[2].color} shadow-sm`}>
                <MagnifyingGlass size={22} weight="bold" />
              </div>
              <span className="font-mono text-xs text-bone-subtle px-2.5 py-0.5 rounded-full bg-navy border border-line">
                {s3.tier}
              </span>
            </div>

            <h3 className="font-display font-bold text-xl text-bone tracking-tight mb-1.5">
              {s3.title}
            </h3>
            <p className="font-sans text-xs font-medium text-sky-400 mb-3">
              {s3.tagline}
            </p>
            <p className="font-sans text-sm text-bone-muted leading-relaxed mb-6">
              {s3.body}
            </p>
          </div>

          <div className="pt-4 border-t border-line/60 space-y-2">
            {s3.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-bone-muted">
                <CheckCircle size={15} weight="fill" className="text-emerald-400 shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 4: Motion That Feels Expensive (Cols 5-8) */}
        <div className="lg:col-span-4 glass rounded-[26px] p-7 md:p-8 border border-line hover:border-line-strong hover:bg-navy-raised transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className={`w-11 h-11 rounded-2xl ${cardIcons[3].bg} border flex items-center justify-center ${cardIcons[3].color} shadow-sm`}>
                <Sparkle size={22} weight="bold" />
              </div>
              <span className="font-mono text-xs text-bone-subtle px-2.5 py-0.5 rounded-full bg-navy border border-line">
                {s4.tier}
              </span>
            </div>

            <h3 className="font-display font-bold text-xl text-bone tracking-tight mb-1.5">
              {s4.title}
            </h3>
            <p className="font-sans text-xs font-medium text-amber-400 mb-3">
              {s4.tagline}
            </p>
            <p className="font-sans text-sm text-bone-muted leading-relaxed mb-6">
              {s4.body}
            </p>
          </div>

          <div className="pt-4 border-t border-line/60 space-y-2">
            {s4.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-bone-muted">
                <CheckCircle size={15} weight="fill" className="text-emerald-400 shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 5: Worry-Free Care (Cols 9-12) */}
        <div className="lg:col-span-4 glass rounded-[26px] p-7 md:p-8 border border-line hover:border-line-strong hover:bg-navy-raised transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className={`w-11 h-11 rounded-2xl ${cardIcons[4].bg} border flex items-center justify-center ${cardIcons[4].color} shadow-sm`}>
                <ShieldCheck size={22} weight="bold" />
              </div>
              <span className="font-mono text-xs text-bone-subtle px-2.5 py-0.5 rounded-full bg-navy border border-line">
                {s5.tier}
              </span>
            </div>

            <h3 className="font-display font-bold text-xl text-bone tracking-tight mb-1.5">
              {s5.title}
            </h3>
            <p className="font-sans text-xs font-medium text-purple-400 mb-3">
              {s5.tagline}
            </p>
            <p className="font-sans text-sm text-bone-muted leading-relaxed mb-6">
              {s5.body}
            </p>
          </div>

          <div className="pt-4 border-t border-line/60 space-y-2">
            {s5.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-bone-muted">
                <CheckCircle size={15} weight="fill" className="text-emerald-400 shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* High-Converting Bottom Action Bar */}
      <div className="glass rounded-[24px] p-6 md:p-8 border border-line flex flex-col sm:flex-row items-center justify-between gap-6 bg-navy/60">
        <div>
          <h4 className="font-display font-bold text-lg md:text-xl text-bone mb-1">
            Ready to build a website that wins customers?
          </h4>
          <p className="font-sans text-xs md:text-sm text-bone-muted">
            Launch, Growth and Signature tiers starting at $1,000. Free 15-minute consultation.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => openBookingModal("compare")}
            className="px-6 h-11 rounded-full bg-ember text-ink font-sans font-semibold text-sm hover:shadow-[var(--shadow-ember)] active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
          >
            <PhoneCall size={16} weight="bold" />
            <span>Book a call</span>
          </button>
          <Link
            to="/services"
            className="px-5 h-11 rounded-full glass border border-line hover:border-line-strong text-bone font-sans font-medium text-sm flex items-center gap-1.5 transition-colors"
          >
            <span>Compare tiers</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
};
