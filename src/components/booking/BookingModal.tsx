import React, { useEffect, useRef, useState } from "react";
import {
  X,
  VideoCamera,
  ArrowUpRight,
  Clock,
  ShieldCheck,
} from "@phosphor-icons/react";
import { useBooking } from "../../context/BookingContext.tsx";
import {
  GOOGLE_MEET_EMBED_URL,
  GOOGLE_MEET_URL,
  CONTACT_EMAIL,
} from "../../config/site.ts";
import { AvailabilityDot } from "../ui/AvailabilityDot.tsx";

export const BookingModal: React.FC = () => {
  const { isOpen, closeBookingModal } = useBooking();
  const [googleIframeLoaded, setGoogleIframeLoaded] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeBookingModal();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeBookingModal]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={closeBookingModal}
        className="fixed inset-0 bg-ink/80 backdrop-blur-md transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl bg-navy border border-line rounded-3xl shadow-[var(--shadow-float)] overflow-hidden z-10 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-line bg-navy/90 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3">
            <AvailabilityDot label="Available 24/7" />
            <div>
              <h2
                id="booking-modal-title"
                className="font-display font-semibold text-lg md:text-xl text-bone tracking-tight"
              >
                Book a 15-Minute Google Meet Call
              </h2>
              <span className="font-sans text-xs text-bone-subtle flex items-center gap-1 mt-0.5">
                <Clock size={12} className="text-emerald-400" />
                Free 15-minute intro · Automatic calendar invite sent immediately
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={GOOGLE_MEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-line hover:border-emerald-500/40 text-bone-muted hover:text-bone text-xs font-sans transition-all"
            >
              <span>Open in new window</span>
              <ArrowUpRight size={13} />
            </a>

            <button
              type="button"
              onClick={closeBookingModal}
              aria-label="Close booking modal"
              className="w-10 h-10 rounded-full glass border border-line flex items-center justify-center text-bone hover:text-ember hover:border-ember transition-colors focus-visible:ring-2 focus-visible:ring-ember outline-none"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body: Embedded Google Meet Calendar */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1">
          <div className="relative w-full bg-bone rounded-2xl overflow-hidden min-h-[620px] shadow-sm">
            {!googleIframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-bone z-10 gap-2">
                <VideoCamera size={32} className="text-emerald-600 animate-pulse" />
                <span className="font-sans font-medium text-sm text-ink animate-pulse">
                  Loading Google Calendar schedule...
                </span>
              </div>
            )}
            <iframe
              src={GOOGLE_MEET_EMBED_URL}
              title="Schedule a Google Meet call with Williams"
              loading="lazy"
              className="w-full h-[620px] border-0"
              onLoad={() => setGoogleIframeLoaded(true)}
            />
          </div>

          {/* Footer actions */}
          <div className="mt-4 pt-4 border-t border-line/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-bone-subtle">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
              Direct video call with Williams · Automatic Google Meet invite sent immediately.
            </span>
            <div className="flex items-center gap-3">
              <a
                href={GOOGLE_MEET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-bone hover:bg-white text-navy font-semibold text-xs transition-colors inline-flex items-center gap-1.5 shrink-0"
              >
                <span>Open in Google Calendar</span>
                <ArrowUpRight size={13} weight="bold" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
