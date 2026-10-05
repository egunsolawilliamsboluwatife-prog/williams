import React, { useRef } from "react";
import { useReducedMotion } from "motion/react";

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // degrees, default 6
  glowColor?: string; // specular spotlight color
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const Tilt3DCard: React.FC<Tilt3DCardProps> = ({
  children,
  className = "",
  maxTilt = 6,
  glowColor = "rgba(217, 119, 54, 0.15)", // ember
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const card = cardRef.current;
    const inner = innerRef.current;
    if (!card || !inner) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    // Direct DOM manipulation - zero React re-renders so click events never get cancelled
    inner.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;

    if (glowRef.current) {
      glowRef.current.style.opacity = "1";
      glowRef.current.style.background = `radial-gradient(circle 350px at ${(
        (x / rect.width) *
        100
      ).toFixed(1)}% ${(
        (y / rect.height) *
        100
      ).toFixed(1)}%, ${glowColor}, transparent 70%)`;
    }
  };

  const handleMouseLeave = () => {
    if (shouldReduceMotion) return;
    const inner = innerRef.current;
    if (inner) {
      inner.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
    if (glowRef.current) {
      glowRef.current.style.opacity = "0";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative ${className}`}
    >
      <div
        ref={innerRef}
        style={{
          transition: "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform",
        }}
        className="w-full h-full relative"
      >
        {/* Specular Spotlight (pointer-events-none so clicks pass through seamlessly) */}
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-10 transition-opacity duration-300 opacity-0"
          aria-hidden="true"
        />
        {children}
      </div>
    </div>
  );
};
