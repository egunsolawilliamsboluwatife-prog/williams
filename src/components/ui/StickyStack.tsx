import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

export interface StickyStackItem {
  title: string;
  body: string;
  detail?: string;
}

interface StickyStackProps {
  items: StickyStackItem[];
}

export const StickyStack: React.FC<StickyStackProps> = ({ items }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  if (shouldReduceMotion) {
    return (
      <div className="flex flex-col gap-6 max-w-[880px] mx-auto">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-navy rounded-[24px] border border-line p-7 md:p-10 shadow-[var(--shadow-float)]"
          >
            <h3 className="text-xl md:text-2xl font-bold font-display text-bone tracking-tight mb-3">
              {item.title}
            </h3>
            <p className="text-lg font-sans text-bone-muted leading-relaxed mb-4">
              {item.body}
            </p>
            {item.detail && (
              <p className="text-[13px] font-mono font-medium text-ember tracking-wide">
                {item.detail}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative max-w-[880px] mx-auto">
      {items.map((item, index) => {
        const targetScale = 1 - (items.length - 1 - index) * 0.03;
        const startProgress = index / items.length;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const scale = useTransform(scrollYProgress, [startProgress, 1], [1, targetScale]);

        return (
          <div
            key={index}
            className="h-[60vh] md:h-[70vh] flex flex-col justify-start"
          >
            <motion.div
              style={{
                scale,
                top: `calc(96px + ${index * 28}px)`,
              }}
              className="sticky bg-navy rounded-[24px] border border-line p-7 md:p-10 shadow-[var(--shadow-float)] w-full"
            >
              <h3 className="text-xl md:text-2xl font-bold font-display text-bone tracking-tight mb-3">
                {item.title}
              </h3>
              <p className="text-lg font-sans text-bone-muted leading-relaxed mb-4">
                {item.body}
              </p>
              {item.detail && (
                <p className="text-[13px] font-mono font-medium text-ember tracking-wide">
                  {item.detail}
                </p>
              )}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};
