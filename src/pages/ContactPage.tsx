import React from "react";
import { Link } from "react-router";
import { CalendarCheck, EnvelopeSimple, ShieldCheck } from "@phosphor-icons/react";
import { Seo } from "../components/ui/Seo.tsx";
import { ClientIntakeForm } from "../components/forms/ClientIntakeForm.tsx";
import { CONTACT_EMAIL } from "../config/site.ts";
import { useBooking } from "../context/BookingContext.tsx";

export const ContactPage: React.FC = () => {
  const { openBookingModal } = useBooking();

  return (
    <>
      <Seo
        title="Contact & Project Intake | Williams"
        description="Submit your project requirements directly to Egunsola Williams. Pre-flight checklist and intake form for US local businesses."
        path="/contact"
        image="/williams-navy-bokeh.jpg"
      />

      <div className="pt-28 md:pt-36 pb-24">
        <div className="max-w-[1040px] mx-auto px-5 md:px-8 lg:px-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ember/10 border border-ember/20 text-ember text-xs font-mono font-medium mb-4">
              <EnvelopeSimple size={14} weight="bold" />
              <span>Direct Client Intake</span>
            </div>

            <h1 className="font-display font-bold text-[clamp(2.5rem,1.6rem+3.6vw,4.25rem)] text-bone tracking-tight mb-4 opsz-96">
              Let's build your website.
            </h1>

            <p className="font-sans text-lg md:text-xl text-bone-muted leading-relaxed mb-6">
              Review the quick pre-flight checklist below and submit your details. Every message lands directly in my inbox, and you'll get a personal reply within 24 hours.
            </p>

            <div className="inline-flex items-center gap-3 p-2 px-4 rounded-full bg-navy border border-line text-xs text-bone-muted font-sans">
              <span>Need to talk face-to-face first?</span>
              <button
                type="button"
                onClick={() => openBookingModal("compare")}
                className="text-ember font-semibold hover:underline cursor-pointer inline-flex items-center gap-1"
              >
                <CalendarCheck size={14} />
                <span>Book a 15-min call instead</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <ClientIntakeForm />
        </div>
      </div>
    </>
  );
};

export default ContactPage;
