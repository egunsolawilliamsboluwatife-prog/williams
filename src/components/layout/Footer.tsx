import React from "react";
import { Link } from "react-router";
import { WMark } from "../ui/WMark.tsx";
import { AvailabilityDot } from "../ui/AvailabilityDot.tsx";
import { Button } from "../ui/Button.tsx";
import { SocialLinks } from "../ui/SocialLinks.tsx";
import { CONTACT_EMAIL } from "../../config/site.ts";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy border-t border-line py-20 relative z-10">
      <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 pb-16">
          {/* Brand block (cols 1-5) */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col items-start gap-5">
            <Link
              to="/"
              className="flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-ember rounded-full outline-none"
              aria-label="Williams, home"
            >
              <WMark size={32} variant="logo" />
              <span className="font-display font-bold text-2xl text-bone tracking-tight">
                Williams
              </span>
            </Link>

            <p className="font-sans text-base text-bone-muted max-w-[34ch] leading-relaxed">
              Websites for US local businesses.
            </p>

            <AvailabilityDot label="Available for work" />

            <div className="pt-2">
              <Button to="/book" variant="primary">
                Book a call
              </Button>
            </div>
          </div>

          {/* Spacer for lg */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Pages (cols 7-9) */}
          <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-4">
            <span className="font-mono text-xs font-semibold text-bone-subtle uppercase tracking-wider mb-1">
              Navigation
            </span>
            <Link
              to="/work"
              className="font-sans text-base text-bone-muted hover:text-bone transition-colors"
            >
              Work
            </Link>
            <Link
              to="/services"
              className="font-sans text-base text-bone-muted hover:text-bone transition-colors"
            >
              Services & pricing
            </Link>
            <Link
              to="/about"
              className="font-sans text-base text-bone-muted hover:text-bone transition-colors"
            >
              About
            </Link>
            <Link
              to="/book"
              className="font-sans text-base text-bone-muted hover:text-bone transition-colors"
            >
              Book a call
            </Link>
            <Link
              to="/contact"
              className="font-sans text-base text-bone-muted hover:text-bone transition-colors"
            >
              Contact & Intake
            </Link>
            <Link
              to="/privacy"
              className="font-sans text-base text-bone-muted hover:text-bone transition-colors"
            >
              Privacy
            </Link>
          </div>

          {/* Contact (cols 10-12) */}
          <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-4">
            <span className="font-mono text-xs font-semibold text-bone-subtle uppercase tracking-wider mb-1">
              Get in touch
            </span>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-sans text-base text-bone-muted hover:text-ember transition-colors break-all"
            >
              {CONTACT_EMAIL}
            </a>

            <div className="pt-2">
              <SocialLinks />
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-line/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-sm text-bone-subtle">
            © {currentYear} Williams
          </p>

          <Link
            to="/privacy"
            className="font-mono text-xs text-bone-subtle/70 hover:text-ember transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};
