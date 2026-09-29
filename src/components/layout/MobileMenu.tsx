import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { SocialLinks } from "../ui/SocialLinks.tsx";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  triggerRef,
}) => {
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Close on route change
  useEffect(() => {
    if (isOpen) onClose();
  }, [location.pathname]);

  // Handle Escape key & outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        triggerRef.current?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    // Focus first link on open
    setTimeout(() => {
      firstLinkRef.current?.focus();
    }, 50);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-menu"
      ref={menuRef}
      role="dialog"
      aria-label="Mobile Navigation"
      className="fixed top-24 left-4 right-4 z-[60] glass p-6 rounded-[24px] border border-line shadow-[var(--shadow-float)] md:hidden flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200"
    >
      <nav className="flex flex-col">
        <Link
          ref={firstLinkRef}
          to="/work"
          className="h-14 flex items-center font-display font-semibold text-2xl text-bone hover:text-ember transition-colors"
        >
          Work
        </Link>
        <Link
          to="/services"
          className="h-14 flex items-center font-display font-semibold text-2xl text-bone hover:text-ember transition-colors"
        >
          Services & pricing
        </Link>
        <Link
          to="/about"
          className="h-14 flex items-center font-display font-semibold text-2xl text-bone hover:text-ember transition-colors"
        >
          About
        </Link>
      </nav>

      <div className="w-full h-[1px] bg-line my-2" />

      <div className="pt-2">
        <SocialLinks />
      </div>
    </div>
  );
};
