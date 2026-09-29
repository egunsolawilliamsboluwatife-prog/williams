import React, { useState } from "react";
import { Plus } from "@phosphor-icons/react";
import { FaqItem } from "../../content/faq.ts";

interface FaqAccordionProps {
  items: FaqItem[];
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items }) => {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="w-full divide-y divide-line border-y border-line">
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-btn-${index}`;

        return (
          <div
            key={index}
            className={`transition-colors duration-200 ${
              isOpen ? "bg-ember-soft" : "bg-transparent"
            }`}
          >
            <button
              id={buttonId}
              type="button"
              onClick={() => toggleIndex(index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full min-h-[64px] py-5 px-4 md:px-6 flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:ring-2 focus-visible:ring-ember focus-visible:outline-none"
            >
              <span className="font-display font-semibold text-lg md:text-xl text-bone tracking-tight">
                {item.q}
              </span>
              <span
                className={`shrink-0 text-bone-muted transition-transform duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen ? "rotate-45 text-ember" : "rotate-0"
                }`}
                aria-hidden="true"
              >
                <Plus size={20} weight="bold" />
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-4 md:px-6 pb-6 pt-1">
                  <p className="font-sans text-base md:text-lg text-bone-muted leading-relaxed max-w-[70ch]">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
