import React from "react";

export interface DeviceFrameProps {
  kind: "laptop" | "phone";
  src: string; // webp
  fallbackSrc: string; // png
  alt: string;
  priority?: boolean;
  className?: string;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  kind,
  src,
  fallbackSrc,
  alt,
  priority = false,
  className = "",
}) => {
  if (kind === "laptop") {
    return (
      <div
        className={`relative flex flex-col items-center select-none pointer-events-none ${className}`}
        aria-hidden="true"
      >
        {/* Screen Bezel */}
        <div className="w-full bg-[#1B2233] p-2.5 rounded-t-[24px] rounded-b-[8px] shadow-[var(--shadow-soft)] ring-1 ring-white/5">
          <div className="w-full aspect-[1440/900] rounded-[14px] overflow-hidden bg-navy relative">
            <picture>
              <source srcSet={src} type="image/webp" />
              <img
                src={fallbackSrc}
                alt={alt}
                width={1440}
                height={900}
                draggable={false}
                loading={priority ? undefined : "lazy"}
                fetchPriority={priority ? "high" : "auto"}
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top block select-none pointer-events-none"
              />
            </picture>
          </div>
        </div>
        {/* Laptop Base Bar: 104% wide, 14px tall, radius 0 0 24px 24px, gradient */}
        <div
          className="w-[104%] h-3.5 rounded-b-[24px] shadow-lg relative -mt-0.5"
          style={{
            background: "linear-gradient(180deg, #21293B 0%, #141C30 100%)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
          aria-hidden="true"
        >
          {/* Subtle center notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#141C30] rounded-b-md opacity-80" />
        </div>
      </div>
    );
  }

  // kind === "phone"
  return (
    <div
      className={`relative bg-[#1B2233] p-2 rounded-[36px] shadow-[var(--shadow-soft)] ring-1 ring-white/5 inline-block select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <div className="w-full aspect-[390/844] rounded-[28px] overflow-hidden bg-navy relative">
        <picture>
          <source srcSet={src} type="image/webp" />
          <img
            src={fallbackSrc}
            alt={alt}
            width={780}
            height={1688}
            draggable={false}
            loading={priority ? undefined : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top block select-none pointer-events-none"
          />
        </picture>
      </div>
    </div>
  );
};
