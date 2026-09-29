import React from "react";
import { Check } from "@phosphor-icons/react";
import { GlassCard } from "./GlassCard.tsx";
import { Button } from "./Button.tsx";

export interface PricingTierProps {
  name: string;
  price: number;
  summary: string;
  includes: string[];
  highlighted?: boolean;
  className?: string;
}

export const PricingTier: React.FC<PricingTierProps> = ({
  name,
  price,
  summary,
  includes,
  highlighted = false,
  className = "",
}) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <GlassCard
      highlighted={highlighted}
      className={`flex flex-col justify-between h-full ${className}`}
    >
      <div>
        <h3 className="font-display font-semibold text-2xl text-bone mb-4 tracking-tight">
          {name}
        </h3>

        <div className="mb-4">
          <span className="block font-mono text-[13px] font-medium text-bone-subtle tracking-[0.02em] mb-1">
            Starting at
          </span>
          <span className="font-mono text-4xl font-medium text-bone tabular-nums tracking-[-0.02em]">
            {formattedPrice}
          </span>
        </div>

        <p className="font-sans text-base text-bone-muted leading-relaxed mb-6">
          {summary}
        </p>

        <div className="w-full h-[1px] bg-line mb-6" />

        <ul className="space-y-3.5 mb-8">
          {includes.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check
                size={18}
                className="text-ember shrink-0 mt-1"
                weight="bold"
              />
              <span className="font-sans text-sm md:text-base text-bone">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-2">
        <Button to="/book" variant="primary" className="w-full">
          Book a call
        </Button>
      </div>
    </GlassCard>
  );
};
