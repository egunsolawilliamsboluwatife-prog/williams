import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  highlighted?: boolean;
  id?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  highlighted = false,
  id,
}) => {
  return (
    <div
      id={id}
      className={`glass p-6 md:p-8 rounded-[24px] transition-all duration-300 ${
        highlighted
          ? "bg-ember-soft ring-1 ring-ember/60 shadow-[0_0_30px_-10px_rgba(255,106,61,0.2)]"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};
