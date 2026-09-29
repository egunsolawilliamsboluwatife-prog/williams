import React from "react";
import { Seo } from "../components/ui/Seo.tsx";
import { WMark } from "../components/ui/WMark.tsx";
import { Button } from "../components/ui/Button.tsx";

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <Seo
        title="Page not found | Williams"
        description="This page doesn't exist."
        path="/404"
        noindex
      />

      <div className="min-h-[70dvh] flex flex-col items-center justify-center text-center px-4 py-24">
        <div className="mb-8">
          <WMark variant="poster" size={160} />
        </div>

        <h1 className="font-display font-bold text-3xl md:text-5xl text-bone tracking-tight mb-4">
          This page doesn't exist.
        </h1>

        <p className="font-sans text-lg text-bone-muted leading-relaxed max-w-[45ch] mb-8">
          The link may be old, or the address may have a typo.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button to="/" variant="secondary">
            Back to home
          </Button>
          <Button to="/book" variant="primary">
            Book a call
          </Button>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
