import React, { useEffect, useRef, useState } from "react";
import {
  X,
  VideoCamera,
  CalendarCheck,
  ArrowUpRight,
  CheckCircle,
  Clock,
  Globe,
  Lightning,
  ShieldCheck,
} from "@phosphor-icons/react";
import { useBooking, BookingModalTab } from "../../context/BookingContext.tsx";
import {
  CAL_COM_URL,
  GOOGLE_MEET_EMBED_URL,
  GOOGLE_MEET_URL,
  CONTACT_EMAIL,
} from "../../config/site.ts";
import { AvailabilityDot } from "../ui/AvailabilityDot.tsx";

export const BookingModal: React.FC = () => {
  const { isOpen, activeTab, closeBookingModal, setActiveTab } = useBooking();
  const [calIframeLoaded, setCalIframeLoaded] = useState(false);
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
            <h2
              id="booking-modal-title"
              className="font-display font-semibold text-lg md:text-xl text-bone tracking-tight"
            >
              Book a 15-Minute Call
            </h2>
          </div>

          <button
            type="button"
            onClick={closeBookingModal}
            aria-label="Close booking modal"
            className="w-10 h-10 rounded-full glass border border-line flex items-center justify-center text-bone hover:text-ember hover:border-ember transition-colors focus-visible:ring-2 focus-visible:ring-ember outline-none"
          >
            <X size={20} />
          </button>
        </div>

        {/* Platform Selection Tabs */}
        <div className="flex items-center gap-1.5 p-2 px-6 border-b border-line bg-ink/40 shrink-0 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab("compare")}
            className={`px-4 py-2 rounded-full font-sans text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === "compare"
                ? "bg-bone text-ink shadow-sm"
                : "text-bone-muted hover:text-bone hover:bg-navy-raised"
            }`}
          >
            Compare Platforms
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("google-meet")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-sans text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === "google-meet"
                ? "bg-bone text-ink shadow-sm"
                : "text-bone-muted hover:text-bone hover:bg-navy-raised"
            }`}
          >
            <VideoCamera size={16} className="text-emerald-400" />
            <span>Google Meet</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("cal-com")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-sans text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === "cal-com"
                ? "bg-bone text-ink shadow-sm"
                : "text-bone-muted hover:text-bone hover:bg-navy-raised"
            }`}
          >
            <CalendarCheck size={16} className="text-ember" />
            <span>Cal.com</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          {/* TAB 1: COMPARE PLATFORMS (Minimal Two-Choice Design) */}
          {activeTab === "compare" && (
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto mb-6">
                <p className="font-sans text-base text-bone-muted leading-relaxed">
                  Pick the platform that best fits your workflow. Both connect you directly with Williams on video.
                </p>
              </div>

              {/* Minimal Two-Choice Platform Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
                {/* Google Meet Card */}
                <div className="glass p-6 md:p-8 rounded-[24px] flex flex-col justify-between border border-line hover:border-emerald-500/40 hover:bg-navy-raised transition-all group">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                        <VideoCamera size={24} weight="bold" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-xl text-bone tracking-tight">
                          Google Meet
                        </h3>
                        <span className="font-sans text-xs text-emerald-400 font-medium">
                          Google Calendar & Gmail Native
                        </span>
                      </div>
                    </div>

                    <p className="font-sans text-sm text-bone-muted leading-relaxed mb-6">
                      Best if you already use Google Calendar or Gmail. Instant 1-click sync with no passwords or sign-up needed.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-line/60 flex flex-col gap-2.5">
                    <button
                      type="button"
                      onClick={() => setActiveTab("google-meet")}
                      className="w-full h-12 rounded-full bg-bone text-ink font-sans font-semibold text-sm hover:bg-white active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <VideoCamera size={18} />
                      <span>Schedule with Google Meet</span>
                    </button>
                    <a
                      href={GOOGLE_MEET_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center py-1 font-sans text-xs text-bone-subtle hover:text-bone underline underline-offset-4 flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>Open Google scheduling page</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>

                {/* Cal.com Card */}
                <div className="glass p-6 md:p-8 rounded-[24px] flex flex-col justify-between border border-ember/30 bg-ember/[0.04] hover:border-ember/60 hover:bg-ember/[0.08] transition-all group">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-ember/15 border border-ember/30 flex items-center justify-center text-ember shrink-0">
                        <CalendarCheck size={24} weight="bold" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-xl text-bone tracking-tight">
                          Cal.com
                        </h3>
                        <span className="font-sans text-xs text-ember font-medium">
                          Universal Calendar Sync
                        </span>
                      </div>
                    </div>

                    <p className="font-sans text-sm text-bone-muted leading-relaxed mb-6">
                      Best if you prefer Outlook, Apple iCloud, or work calendars. Flexible rescheduling with automatic timezone detection.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-line/60 flex flex-col gap-2.5">
                    <button
                      type="button"
                      onClick={() => setActiveTab("cal-com")}
                      className="w-full h-12 rounded-full bg-ember text-ink font-sans font-semibold text-sm hover:shadow-[var(--shadow-ember)] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CalendarCheck size={18} />
                      <span>Schedule with Cal.com</span>
                    </button>
                    <a
                      href={CAL_COM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center py-1 font-sans text-xs text-bone-subtle hover:text-bone underline underline-offset-4 flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>Open cal.com/jackson-williams</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Benefits & Direct Email */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-bone-subtle border-t border-line/40">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  15-min introductory call · Free & confidential · No sales pitch
                </span>
                <p>
                  Direct email:{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-ember hover:underline font-medium"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: GOOGLE MEET SCHEDULER EMBED */}
          {activeTab === "google-meet" && (
            <div className="flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-bone-muted">
                  <Clock size={16} className="text-emerald-400" />
                  <span>15 minutes · Times show in your local timezone</span>
                </div>
                <a
                  href={GOOGLE_MEET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-ember hover:underline font-medium"
                >
                  <span>Open in full tab</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>

              <div className="relative w-full bg-bone rounded-2xl overflow-hidden min-h-[620px]">
                {!googleIframeLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-bone z-10">
                    <span className="font-sans font-medium text-sm text-ink animate-pulse">
                      Loading Google Calendar scheduler...
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
            </div>
          )}

          {/* TAB 3: CAL.COM SCHEDULER EMBED */}
          {activeTab === "cal-com" && (
            <div className="flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-sm text-bone-muted">
                  <Globe size={16} className="text-ember" />
                  <span>cal.com/jackson-williams · Universal calendar sync</span>
                </div>
                <a
                  href={CAL_COM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-ember hover:underline font-medium"
                >
                  <span>Open directly on Cal.com</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>

              <div className="relative w-full bg-navy-deep border border-line rounded-2xl overflow-hidden min-h-[620px] flex flex-col justify-between">
                {!calIframeLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-navy z-10">
                    <span className="font-sans font-medium text-sm text-bone-muted animate-pulse">
                      Connecting to cal.com/jackson-williams...
                    </span>
                  </div>
                )}
                <iframe
                  src="https://cal.com/jackson-williams?embed=true"
                  title="Book with Egunsola Williams on Cal.com"
                  loading="lazy"
                  className="w-full h-[620px] border-0"
                  onLoad={() => setCalIframeLoaded(true)}
                />
              </div>

              <div className="mt-4 flex items-center gap-3">
                <a
                  href={CAL_COM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 h-10 rounded-full bg-ember text-ink font-sans font-semibold text-sm hover:shadow-[var(--shadow-ember)] inline-flex items-center gap-1.5 transition-all"
                >
                  <span>Open Cal.com in Full Window</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
