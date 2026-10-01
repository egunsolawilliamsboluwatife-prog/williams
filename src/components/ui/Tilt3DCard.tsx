import React, { useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // degrees, default 6
  perspective?: number;
  glowColor?: string;
  onClick?: () => void;
}

export const Tilt3DCard: React.FC<Tilt3DCardProps> = ({
  children,
  className = "",
  maxTilt = 6,
  perspective = 1000,
  glowColor = "rgba(217, 119, 54, 0.15)", // ember
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTilt({ rotateX, rotateY, scale: 1.015 });
    setSpotlight({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    if (shouldReduceMotion) return;
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  if (shouldReduceMotion) {
    return (
      <div className={className} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
      className={`relative transition-transform duration-200 ease-out ${className}`}
    >
      <div
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(${tilt.scale}, ${tilt.scale}, ${tilt.scale})`,
          transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative"
      >
        {/* Specular 3D Reflection Spotlight */}
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-20 transition-opacity duration-300"
          style={{
            opacity: spotlight.opacity,
            background: `radial-gradient(circle 350px at ${spotlight.x}% ${spotlight.y}%, ${glowColor}, transparent 70%)`,
          }}
          aria-hidden="true"
        />
        {children}
      </div>
    </div>
  );
};
