import React from "react";

export const SkipLink: React.FC = () => {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-ember focus:text-ink focus:font-semibold focus:rounded-full focus:shadow-lg focus:outline-none"
    >
      Skip to content
    </a>
  );
};
