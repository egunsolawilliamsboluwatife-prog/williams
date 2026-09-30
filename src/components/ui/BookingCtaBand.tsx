import React from "react";
import { AvailabilityDot } from "./AvailabilityDot.tsx";
import { Button } from "./Button.tsx";
import { useBooking } from "../../context/BookingContext.tsx";

interface BookingCtaBandProps {
  className?: string;
}

export const BookingCtaBand: React.FC<BookingCtaBandProps> = ({
  className = "",
}) => {
  const { openBookingModal } = useBooking();

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="bg-navy rounded-[24px] p-10 md:p-16 text-center border border-line shadow-[var(--shadow-float)] max-w-4xl mx-auto flex flex-col items-center">
          <AvailabilityDot label="Available 24/7" className="mb-6" />

          <h2 className="font-display font-bold text-3xl md:text-5xl text-bone tracking-tight mb-4 text-balance">
            Book a free 15-minute call.
          </h2>

          <p className="font-sans text-lg md:text-xl text-bone-muted leading-relaxed max-w-[48ch] mb-8 text-pretty">
            Pick any time, any day on Google Meet or Cal.com. We'll talk through
            your business and which tier fits.
          </p>

          <Button
            type="button"
            onClick={() => openBookingModal("compare")}
            variant="primary"
          >
            Book a call
          </Button>
        </div>
      </div>
    </section>
  );
};
