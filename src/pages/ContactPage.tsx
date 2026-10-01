import React from "react";
import { CalendarCheck, EnvelopeSimple } from "@phosphor-icons/react";
import { Seo } from "../components/ui/Seo.tsx";
import { ClientIntakeForm } from "../components/forms/ClientIntakeForm.tsx";
import { useBooking } from "../context/BookingContext.tsx";

export const ContactPage: React.FC = () => {
  const { openBookingModal } = useBooking();

  return (
    <>
      <Seo
        title="Contact & Project Intake | Williams"
        description="Send a message directly to Egunsola Williams. Fast, direct inquiry for US local business website projects."
        path="/contact"
        image="/williams-navy-bokeh.jpg"
      />

      <div className="pt-28 md:pt-36 pb-24">
        <div className="max-w-[840px] mx-auto px-5 md:px-8">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ember/10 border border-ember/20 text-ember text-xs font-mono font-medium mb-4">
              <EnvelopeSimple size={14} weight="bold" />
              <span>Direct to Egunsola Williams</span>
            </div>

            <h1 className="font-display font-bold text-[clamp(2.2rem,1.4rem+3vw,3.75rem)] text-bone tracking-tight mb-4 opsz-96">
              Let's build your website.
            </h1>

            <p className="font-sans text-base md:text-lg text-bone-muted leading-relaxed mb-6">
              Fill out the quick form below. Submissions land directly in my inbox with a personal reply within 2–4 hours.
            </p>

            <div className="inline-flex items-center gap-2.5 p-2 px-4 rounded-full bg-navy border border-line text-xs text-bone-muted font-sans">
              <span>Prefer to talk face-to-face?</span>
              <button
                type="button"
                onClick={() => openBookingModal("compare")}
                className="text-ember font-semibold hover:underline cursor-pointer inline-flex items-center gap-1"
              >
                <CalendarCheck size={14} />
                <span>Book a 15-min call</span>
              </button>
            </div>
          </div>

          {/* Clean 4-field Form */}
          <ClientIntakeForm />
        </div>
      </div>
    </>
  );
};

export default ContactPage;
