import React, { useState } from "react";
import { BOOKING_EMBED_URL, BOOKING_URL } from "../../config/site.ts";
import { Button } from "../ui/Button.tsx";

export const BookingEmbed: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Frame with bg-bone to blend Google Calendar cleanly */}
      <div className="relative w-full bg-bone rounded-[24px] p-2 shadow-[var(--shadow-float)] overflow-hidden min-h-[900px] md:min-h-[760px]">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-bone rounded-[20px] z-10">
            <span className="font-sans font-medium text-[15px] text-ink animate-pulse">
              Loading the calendar
            </span>
          </div>
        )}
        <iframe
          src={BOOKING_EMBED_URL || BOOKING_URL}
          title="Book a 15-minute Google Meet call with Williams"
          loading="lazy"
          style={{ border: 0 }}
          width="100%"
          height={760}
          onLoad={() => setLoaded(true)}
          className="w-full h-[900px] md:h-[760px] border-0 rounded-[18px] block"
        />
      </div>

      <div className="mt-6 flex justify-center">
        <Button variant="secondary" href={BOOKING_URL}>
          Open booking page
        </Button>
      </div>
    </div>
  );
};
