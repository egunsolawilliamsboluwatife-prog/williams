import React from "react";

interface AvailabilityDotProps {
  label?: string;
  className?: string;
}

export const AvailabilityDot: React.FC<AvailabilityDotProps> = ({
  label = "Available for work",
  className = "",
}) => {
  return (
    <div
      className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-navy border border-line ${className}`}
    >
      <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
        <span className="relative inline-flex rounded-full h-2 w-2 bg-available" />
        <span className="absolute inset-0 rounded-full bg-available animate-ping opacity-60 motion-reduce:hidden" />
      </span>
      <span className="font-sans font-medium text-sm text-bone tracking-normal">
        {label}
      </span>
    </div>
  );
};
