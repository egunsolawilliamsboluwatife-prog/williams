import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "motion/react";

interface AnimatedCounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.8,
  className = "",
}) => {
  const [displayValue, setDisplayValue] = useState<string>(
    `${prefix}${value.toFixed(decimals)}${suffix}`
  );
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || hasAnimated.current) {
      setDisplayValue(`${prefix}${value.toFixed(decimals)}${suffix}`);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const counter = { val: 0 };
          gsap.to(counter, {
            val: value,
            duration,
            ease: "power2.out",
            onUpdate: () => {
              setDisplayValue(
                `${prefix}${counter.val.toFixed(decimals)}${suffix}`
              );
            },
            onComplete: () => {
              setDisplayValue(
                `${prefix}${value.toFixed(decimals)}${suffix}`
              );
            },
          });
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [value, decimals, prefix, suffix, duration, shouldReduceMotion]);

  return (
    <span ref={elementRef} className={`tabular-nums ${className}`}>
      {displayValue}
    </span>
  );
};
