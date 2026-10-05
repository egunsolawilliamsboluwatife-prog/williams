import React, { useState } from "react";
import { VideoCamera, ArrowUpRight, Clock, ShieldCheck } from "@phosphor-icons/react";
import {
  GOOGLE_MEET_EMBED_URL,
  GOOGLE_MEET_URL,
  CONTACT_EMAIL,
} from "../../config/site.ts";
import { Button } from "../ui/Button.tsx";

export const BookingEmbed: React.FC = () => {
  const [googleLoaded, setGoogleLoaded] = useState(false);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Google Meet Header Pill */}
      <div className="w-full flex items-center justify-between gap-3 mb-4 p-3 bg-navy rounded-2xl border border-line">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <VideoCamera size={18} weight="bold" />
          </div>
          <div>
            <span className="font-display font-semibold text-sm text-bone block leading-tight">
              Google Meet 15-Minute Intro Call
            </span>
            <span className="font-sans text-[11px] text-bone-subtle flex items-center gap-1">
              <Clock size={12} className="text-emerald-400" />
              Times adjust to your local timezone
            </span>
          </div>
        </div>

        <a
          href={GOOGLE_MEET_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl font-sans text-xs text-bone-muted hover:text-bone hover:bg-navy-raised transition-colors"
        >
          <span>Open full page</span>
          <ArrowUpRight size={13} />
        </a>
      </div>

      {/* Embedded Google Meet Calendar View */}
      <div className="relative w-full bg-bone rounded-[24px] p-2 shadow-[var(--shadow-float)] overflow-hidden min-h-[900px] md:min-h-[760px]">
        {!googleLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-bone rounded-[20px] z-10 gap-2">
            <VideoCamera size={32} className="text-emerald-600 animate-pulse" />
            <span className="font-sans font-medium text-[15px] text-ink animate-pulse">
              Loading Google Calendar scheduler...
            </span>
          </div>
        )}
        <iframe
          src={GOOGLE_MEET_EMBED_URL}
          title="Book a 15-minute Google Meet call with Williams"
          loading="lazy"
          style={{ border: 0 }}
          width="100%"
          height={760}
          onLoad={() => setGoogleLoaded(true)}
          className="w-full h-[900px] md:h-[760px] border-0 rounded-[18px] block"
        />
      </div>

      {/* Direct Link External Button */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <Button variant="secondary" href={GOOGLE_MEET_URL}>
          Open Google Meet booking page
        </Button>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-bone-muted hover:text-bone font-sans text-xs transition-colors flex items-center gap-1.5"
        >
          <ShieldCheck size={14} className="text-emerald-400" />
          <span>Prefer email? Write directly to {CONTACT_EMAIL}</span>
        </a>
      </div>
    </div>
  );
};
