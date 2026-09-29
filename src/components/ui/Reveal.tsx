import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE_PREMIUM } from "../../lib/motion.ts";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer";
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  className = "",
  as = "div",
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Component = as;
    return <Component className={className}>{children}</Component>;
  }

  const MotionComponent = motion[as];

  return (
    <MotionComponent
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        ease: EASE_PREMIUM,
        delay,
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};
