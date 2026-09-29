import React from "react";
import { W_POINTS } from "../three/wShape.ts";

interface WMarkProps {
  size?: number; // height in px
  variant?: "logo" | "poster";
  className?: string;
}

export const WMark: React.FC<WMarkProps> = ({
  size = 24,
  variant = "logo",
  className = "",
}) => {
  // Flip Y because SVG Y points down
  const pointsString = W_POINTS.map(([x, y]) => `${x},${-y}`).join(" ");

  // Aspect ratio is 4.4 / 3.4
  const width = (size * 4.4) / 3.4;

  if (variant === "logo") {
    return (
      <svg
        viewBox="-2.2 -1.7 4.4 3.4"
        width={width}
        height={size}
        className={`shrink-0 ${className}`}
        aria-hidden="true"
      >
        <polygon points={pointsString} fill="#F2EEE6" />
      </svg>
    );
  }

  // variant === "poster"
  return (
    <svg
      viewBox="-2.2 -1.7 4.4 3.4"
      width={width}
      height={size}
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="posterWGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#21293B" />
          <stop offset="100%" stopColor="#141C30" />
        </linearGradient>
      </defs>
      {/* Ember rim shadow/offset */}
      <polygon
        points={pointsString}
        transform="translate(0.06, 0.04)"
        fill="#FF6A3D"
        opacity="0.35"
      />
      {/* Main monogram polygon */}
      <polygon
        points={pointsString}
        fill="url(#posterWGrad)"
        stroke="#FF6A3D"
        strokeWidth="0.035"
      />
    </svg>
  );
};
