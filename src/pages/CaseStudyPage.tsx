import React from "react";
import { useParams, Link } from "react-router";
import { ArrowRight, CaretRight } from "@phosphor-icons/react";
import { CASE_STUDIES } from "../content/work.ts";
import { NotFoundPage } from "./NotFoundPage.tsx";
import { Seo } from "../components/ui/Seo.tsx";
import { Button } from "../components/ui/Button.tsx";
import { DeviceFrame } from "../components/ui/DeviceFrame.tsx";
import { BookingCtaBand } from "../components/ui/BookingCtaBand.tsx";
import { Reveal } from "../components/ui/Reveal.tsx";
import { useBooking } from "../context/BookingContext.tsx";

export const CaseStudyPage: React.FC = () => {
  const { openBookingModal } = useBooking();
  const { slug } = useParams<{ slug: string }>();

  const projectIndex = CASE_STUDIES.findIndex((p) => p.slug === slug);
  if (projectIndex === -1) {
    return <NotFoundPage />;
  }

  const project = CASE_STUDIES[projectIndex];
  const nextProject =
    CASE_STUDIES[(projectIndex + 1) % CASE_STUDIES.length];

  return (
    <>
      <Seo
        title={`${project.name} case study | Williams`}
        description={project.summary}
        path={`/work/${project.slug}`}
      />

      <div className="pt-28 md:pt-36">
        {/* 1. HEADER (Title block) */}
        <section className="pb-16 md:pb-20">
          <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 font-sans text-sm text-bone-subtle">
              <Link to="/work" className="hover:text-bone transition-colors">
                Work
              </Link>
              <CaretRight size={14} className="text-bone-subtle" />
              <span className="text-bone">{project.name}</span>
            </nav>

            <h1 className="font-display font-bold text-[clamp(2.5rem,1.6rem+3.6vw,4.5rem)] text-bone tracking-tight mb-4 opsz-96">
              {project.name}
            </h1>

            <p className="font-sans text-xl md:text-2xl text-bone-muted mb-8 leading-relaxed">
              {project.niche} · {project.location}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button href={project.liveUrl} variant="primary">
                Visit live site
              </Button>
              <Button
                type="button"
                onClick={() => openBookingModal()}
                variant="secondary"
              >
                Book a call
              </Button>
            </div>
          </div>
        </section>

        {/* 2. DEVICE HERO (Layered media) */}
        <section className="pb-24 md:pb-32">
          <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Laptop: cols 1-10 at lg */}
              <div className="lg:col-span-10 w-full">
                <DeviceFrame
                  kind="laptop"
                  src={project.desktopImage}
                  fallbackSrc={project.desktopFallback}
                  alt={project.altDesktop}
                  priority
                />
              </div>

              {/* Phone: cols 9-12 at lg, shifted down 12% */}
              <div className="lg:col-span-4 lg:-ml-24 mt-6 lg:mt-16 flex justify-center z-10">
                <div className="w-[60%] sm:w-[50%] lg:w-full max-w-[280px] shadow-2xl">
                  <DeviceFrame
                    kind="phone"
                    src={project.mobileImage}
                    fallbackSrc={project.mobileFallback}
                    alt={project.altMobile}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. WHAT IT'S BUILT TO DO (Editorial paragraph) */}
        <section className="py-20 md:py-24 border-t border-line">
          <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
            <Reveal>
              <h2 className="font-display font-semibold text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] text-bone tracking-tight mb-8 opsz-72">
                What it's built to do
              </h2>
              <p className="font-sans text-xl md:text-2xl text-bone-muted leading-relaxed max-w-[65ch] text-pretty">
                {project.builtTo}
              </p>
            </Reveal>
          </div>
        </section>

        {/* 4. FEATURES (2-column ruled list) */}
        <section className="py-20 md:py-28 border-t border-line">
          <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
            <Reveal>
              <h2 className="font-display font-semibold text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] text-bone tracking-tight mb-12 opsz-72">
                What's on the site
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 divide-y lg:divide-y-0 divide-line">
              {project.features.map((feature, idx) => (
                <div key={idx} className="py-8 border-b border-line">
                  <h3 className="font-display font-semibold text-[22px] text-bone mb-3 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-base md:text-lg text-bone-muted leading-relaxed">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. ON A PHONE (Split media, phone left) */}
        <section className="py-20 md:py-28 border-t border-line">
          <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Phone (cols 1-5 at lg) */}
                <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
                  <div className="w-[75%] max-w-[320px]">
                    <DeviceFrame
                      kind="phone"
                      src={project.mobileImage}
                      fallbackSrc={project.mobileFallback}
                      alt={project.altMobile}
                    />
                  </div>
                </div>

                {/* Text (cols 7-12 at lg) */}
                <div className="lg:col-span-7 order-1 lg:order-2">
                  <h2 className="font-display font-semibold text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] text-bone tracking-tight mb-6 opsz-72">
                    On a phone
                  </h2>
                  <p className="font-sans text-xl md:text-2xl text-bone-muted leading-relaxed max-w-[60ch] text-pretty">
                    {project.mobile}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 6. PERMISSION NOTE + NEXT PROJECT */}
        <section className="py-20 border-t border-line">
          <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
            <p className="font-sans text-sm text-bone-subtle mb-12">
              Shown with the owner's permission.
            </p>

            <Link
              to={`/work/${nextProject.slug}`}
              className="group block p-8 -mx-8 rounded-2xl hover:bg-navy transition-colors focus-visible:ring-2 focus-visible:ring-ember outline-none"
            >
              <span className="block font-mono text-[13px] font-medium text-bone-subtle tracking-[0.02em] mb-2">
                Next project
              </span>
              <div className="flex items-center justify-between gap-4">
                <span className="font-display font-semibold text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] text-bone tracking-tight group-hover:text-ember transition-colors">
                  {nextProject.name}
                </span>
                <span className="text-ember group-hover:translate-x-3 transition-transform">
                  <ArrowRight size={32} />
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* 7. BOOKING CTA BAND */}
        <BookingCtaBand />
      </div>
    </>
  );
};

export default CaseStudyPage;
