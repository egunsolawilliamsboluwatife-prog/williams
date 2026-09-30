import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { List, X } from "@phosphor-icons/react";
import { WMark } from "../ui/WMark.tsx";
import { Button } from "../ui/Button.tsx";
import { MobileMenu } from "./MobileMenu.tsx";
import { useBooking } from "../../context/BookingContext.tsx";

export const Nav: React.FC = () => {
  const location = useLocation();
  const [isCondensed, setIsCondensed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { openBookingModal } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setIsCondensed(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Work", path: "/work" },
    { label: "Services & pricing", path: "/services" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav
          aria-label="Main"
          className={`pointer-events-auto h-16 w-full max-w-[1240px] rounded-full glass pl-3 pr-2 flex items-center justify-between transition-all duration-[280ms] ${
            isCondensed
              ? "bg-[#141C30]/85 shadow-[var(--shadow-soft)]"
              : "bg-[rgba(242,238,230,0.035)]"
          }`}
        >
          {/* Left: Brand lockup */}
          <Link
            to="/"
            aria-label="Williams, home"
            className="flex items-center gap-2.5 py-1 px-2 rounded-full focus-visible:ring-2 focus-visible:ring-ember outline-none"
          >
            <WMark size={24} variant="logo" />
            <span className="font-display font-semibold text-xl text-bone tracking-tight hidden min-[400px]:inline">
              Williams
            </span>
          </Link>

          {/* Center Links (lg and up) */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.path === "/work"
                  ? location.pathname.startsWith("/work")
                  : location.pathname === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative font-sans text-[15px] font-medium transition-colors py-1 ${
                    isActive ? "text-bone" : "text-bone-muted hover:text-bone"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute left-0 right-0 -bottom-1.5 h-[2px] bg-ember rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action: CTA & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              onClick={() => openBookingModal("compare")}
              variant="primary"
              className="h-10 md:h-11 px-4 md:px-7 text-sm md:text-base cursor-pointer"
            >
              Book a call
            </Button>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              className="lg:hidden w-11 h-11 rounded-full flex items-center justify-center text-bone hover:text-ember focus-visible:ring-2 focus-visible:ring-ember outline-none"
            >
              {isMobileMenuOpen ? <X size={22} /> : <List size={22} />}
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        triggerRef={menuButtonRef}
      />
    </>
  );
};
