import React, { useState } from "react";
import {
  VideoCamera,
  CalendarCheck,
  ArrowUpRight,
  Scales,
} from "@phosphor-icons/react";
import {
  CAL_COM_URL,
  GOOGLE_MEET_EMBED_URL,
  GOOGLE_MEET_URL,
} from "../../config/site.ts";
import { Button } from "../ui/Button.tsx";
import { useBooking } from "../../context/BookingContext.tsx";

export const BookingEmbed: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<"google" | "cal">("google");
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [calLoaded, setCalLoaded] = useState(false);
  const { openBookingModal } = useBooking();

  return (
    <div className="flex flex-col items-center w-full">
      {/* Platform Switcher Bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-4 p-2 bg-navy rounded-2xl border border-line">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActivePlatform("google")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-sans text-xs md:text-sm font-medium transition-all ${
              activePlatform === "google"
                ? "bg-bone text-ink shadow-sm"
                : "text-bone-muted hover:text-bone hover:bg-navy-raised"
            }`}
          >
            <VideoCamera size={16} className={activePlatform === "google" ? "text-emerald-600" : "text-emerald-400"} />
            <span>Google Meet</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePlatform("cal")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-sans text-xs md:text-sm font-medium transition-all ${
              activePlatform === "cal"
                ? "bg-bone text-ink shadow-sm"
                : "text-bone-muted hover:text-bone hover:bg-navy-raised"
            }`}
          >
            <CalendarCheck size={16} className={activePlatform === "cal" ? "text-ember" : "text-ember"} />
            <span>Cal.com</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => openBookingModal("compare")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-sans text-xs text-bone-muted hover:text-bone hover:bg-navy-raised transition-colors"
        >
          <Scales size={15} />
          <span>Compare platforms</span>
        </button>
      </div>

      {/* Embedded Scheduler View */}
      {activePlatform === "google" ? (
        <div className="relative w-full bg-bone rounded-[24px] p-2 shadow-[var(--shadow-float)] overflow-hidden min-h-[900px] md:min-h-[760px]">
          {!googleLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-bone rounded-[20px] z-10">
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
      ) : (
        <div className="relative w-full bg-navy rounded-[24px] p-2 border border-line shadow-[var(--shadow-float)] overflow-hidden min-h-[900px] md:min-h-[760px] flex flex-col justify-between">
          {!calLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-navy rounded-[20px] z-10">
              <span className="font-sans font-medium text-[15px] text-bone animate-pulse">
                Connecting to cal.com/jackson-williams...
              </span>
            </div>
          )}
          <iframe
            src="https://cal.com/jackson-williams?embed=true"
            title="Book with Jackson Williams on Cal.com"
            loading="lazy"
            style={{ border: 0 }}
            width="100%"
            height={760}
            onLoad={() => setCalLoaded(true)}
            className="w-full h-[900px] md:h-[760px] border-0 rounded-[18px] block"
          />
        </div>
      )}

      {/* Direct Link External Button */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        {activePlatform === "google" ? (
          <Button variant="secondary" href={GOOGLE_MEET_URL}>
            Open Google Meet booking page
          </Button>
        ) : (
          <Button variant="secondary" href={CAL_COM_URL}>
            Open cal.com/jackson-williams
          </Button>
        )}

        <button
          type="button"
          onClick={() => openBookingModal("compare")}
          className="text-ember font-sans font-medium text-sm underline underline-offset-4 hover:decoration-2 transition-all cursor-pointer"
        >
          Not sure which to choose? Compare platforms
        </button>
      </div>
    </div>
  );
};

export default BookingEmbed;
