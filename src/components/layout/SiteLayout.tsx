import React from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import { SkipLink } from "./SkipLink.tsx";
import { Nav } from "./Nav.tsx";
import { Footer } from "./Footer.tsx";
import { NoiseOverlay } from "./NoiseOverlay.tsx";
import { BookingProvider } from "../../context/BookingContext.tsx";
import { BookingModal } from "../booking/BookingModal.tsx";

export const SiteLayout: React.FC = () => {
  const location = useLocation();

  return (
    <BookingProvider>
      <div className="relative min-h-screen bg-ink text-bone flex flex-col selection:bg-ember selection:text-ink">
        <ScrollRestoration />
        <SkipLink />
        <NoiseOverlay />
        <Nav />

        {/* Main Content with Route Transition */}
        <main
          id="main"
          key={location.pathname}
          className="flex-1 w-full animate-in fade-in duration-300 fill-mode-forwards"
        >
          <Outlet />
        </main>

        <Footer />
        <BookingModal />
      </div>
    </BookingProvider>
  );
};
