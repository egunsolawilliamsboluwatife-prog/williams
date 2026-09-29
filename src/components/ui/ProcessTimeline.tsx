import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "../../lib/motion.ts";

export interface ProcessStep {
  title: string;
  body: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ steps }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full">
      {/* Desktop Layout (lg and up) */}
      <div className="hidden lg:block relative">
        {/* Horizontal Line across the top */}
        <div className="relative w-full h-[1px] bg-transparent my-6">
          <motion.div
            initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.0, ease: EASE_OUT }}
            style={{ originX: 0 }}
            className="w-full h-[1px] bg-line-strong"
          />
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative pt-6">
              {/* 12px Ember Circle on the line */}
              <div
                className="absolute -top-[30px] left-0 w-3 h-3 rounded-full bg-ember shadow-[0_0_12px_rgba(255,106,61,0.5)]"
                aria-hidden="true"
              />
              <span className="block font-display font-bold text-5xl text-bone-subtle mb-4 select-none">
                {index + 1}
              </span>
              <h3 className="font-display font-semibold text-xl text-bone mb-2 tracking-tight">
                {step.title}
              </h3>
              <p className="font-sans text-base text-bone-muted leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet Vertical Layout (below lg) */}
      <div className="block lg:hidden relative pl-8 py-2">
        {/* Vertical line running down the left at 6px */}
        <div className="absolute top-2 bottom-2 left-[5px] w-[1px]">
          <motion.div
            initial={shouldReduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.0, ease: EASE_OUT }}
            style={{ originY: 0 }}
            className="w-full h-full bg-line-strong"
          />
        </div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* 12px Ember Circle on the line */}
              <div
                className="absolute top-2 -left-[33px] w-3 h-3 rounded-full bg-ember shadow-[0_0_12px_rgba(255,106,61,0.5)]"
                aria-hidden="true"
              />
              <span className="block font-display font-bold text-4xl text-bone-subtle mb-2 select-none">
                {index + 1}
              </span>
              <h3 className="font-display font-semibold text-xl text-bone mb-2 tracking-tight">
                {step.title}
              </h3>
              <p className="font-sans text-base text-bone-muted leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
