import React from "react";
import { Link } from "react-router";
import { ArrowUpRight, CircleNotch } from "@phosphor-icons/react";

export interface ButtonProps {
  variant?: "primary" | "secondary" | "text";
  to?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  to,
  href,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  children,
  className = "",
}) => {
  const isDisabled = disabled || loading;

  let baseStyles = "relative inline-flex items-center justify-center font-sans whitespace-nowrap transition-all duration-200 select-none overflow-hidden ";

  if (variant === "primary") {
    baseStyles +=
      "h-12 md:h-[52px] px-7 rounded-full bg-ember text-ink font-semibold text-base " +
      "shadow-[var(--shadow-ember)] active:scale-97 active:bg-ember-press " +
      "group cursor-pointer ";
  } else if (variant === "secondary") {
    baseStyles +=
      "h-12 md:h-[52px] px-7 rounded-full bg-transparent border border-input-border text-bone font-medium text-base " +
      "hover:bg-navy-raised active:scale-97 cursor-pointer ";
  } else if (variant === "text") {
    baseStyles +=
      "text-ember font-medium underline underline-offset-4 decoration-1 hover:decoration-2 cursor-pointer p-0 bg-transparent ";
  }

  if (isDisabled) {
    baseStyles += "opacity-50 cursor-not-allowed pointer-events-none ";
  }

  const content = loading ? (
    <span className="inline-flex items-center gap-2" aria-busy="true">
      <CircleNotch size={16} className="animate-spin text-ink" />
      <span>Sending</span>
    </span>
  ) : (
    <>
      {variant === "primary" && (
        <span
          className="absolute inset-0 bg-bone -translate-y-[-101%] group-hover:translate-y-0 transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none rounded-full"
          aria-hidden="true"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-1.5">
        {children}
        {href && (
          <>
            <ArrowUpRight size={16} className="shrink-0" />
            <span className="sr-only">(opens in a new tab)</span>
          </>
        )}
      </span>
    </>
  );

  if (to && !isDisabled) {
    return (
      <Link to={to} className={`${baseStyles} ${className}`} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (href && !isDisabled) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseStyles} ${className}`}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`${baseStyles} ${className}`}
    >
      {content}
    </button>
  );
};
