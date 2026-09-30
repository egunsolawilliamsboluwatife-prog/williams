import React, { lazy, Suspense, useEffect, useState, useRef } from "react";
import { Seo } from "../components/ui/Seo.tsx";
import { BookingCtaBand } from "../components/ui/BookingCtaBand.tsx";
import { WorkFallbackGallery } from "../components/work/WorkFallbackGallery.tsx";
import { ProjectList } from "../components/work/ProjectList.tsx";
import { Reveal } from "../components/ui/Reveal.tsx";
import { useCanRender3D } from "../lib/useCanRender3D.ts";

const DeviceRingLazy = lazy(() => import("../components/three/DeviceRing.tsx"));

export const WorkPage: React.FC = () => {
  const canRender3D = useCanRender3D();
  const [load3D, setLoad3D] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canRender3D) return;

    const startIdleLoad = () => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => setLoad3D(true), { timeout: 1200 });
      } else {
        setTimeout(() => setLoad3D(true), 600);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startIdleLoad();
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (stageRef.current) {
      observer.observe(stageRef.current);
    }

    return () => observer.disconnect();
  }, [canRender3D]);

  return (
    <>
      <Seo
        title="Work | Williams"
        description="Eleven live websites for US businesses: boutique law firms, CPA practices, luxury barbershops, and specialized studios. Designed and built by Williams."
        path="/work"
      />

      <div className="pt-28 md:pt-36">
        {/* 1. INTRO + DEVICE RING */}
        <section className="pb-24">
          <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="mb-10">
              <h1 className="font-display font-bold text-[clamp(2.5rem,1.6rem+3.6vw,4.5rem)] text-bone tracking-tight mb-4 opsz-96">
                Work
              </h1>
              <p className="font-sans text-xl md:text-2xl text-bone-muted leading-relaxed max-w-[65ch]">
                Eleven live sites for US businesses. Drag the ring, or pick a project.
              </p>
            </div>

            {/* 3D Ring Stage or 2D Fallback Gallery */}
            <div ref={stageRef} className="w-full">
              {canRender3D ? (
                <Suspense fallback={<WorkFallbackGallery />}>
                  {load3D ? <DeviceRingLazy /> : <WorkFallbackGallery />}
                </Suspense>
              ) : (
                <WorkFallbackGallery />
              )}
            </div>
          </div>
        </section>

        {/* 2. PROJECT LIST */}
        <section className="py-24 border-t border-line">
          <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
            <Reveal>
              <h2 className="font-display font-semibold text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] text-bone tracking-tight mb-12 opsz-72">
                All client projects
              </h2>
            </Reveal>

            <Reveal delay={0.06}>
              <ProjectList />
            </Reveal>
          </div>
        </section>

        {/* 3. BOOKING CTA BAND */}
        <BookingCtaBand />
      </div>
    </>
  );
};

export default WorkPage;
