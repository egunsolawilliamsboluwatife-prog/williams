import React, { useRef } from "react";
import { Link } from "react-router";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { CASE_STUDIES } from "../../content/work.ts";
import { DeviceFrame } from "../ui/DeviceFrame.tsx";

export const WorkFallbackGallery: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: "prev" | "next") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.clientWidth * 0.85;
    const offset = direction === "next" ? cardWidth : -cardWidth;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      {/* Horizontal snap gallery */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth snap-x snap-mandatory no-scrollbar"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {CASE_STUDIES.map((project, index) => (
          <div
            key={project.slug}
            className="shrink-0 w-[85%] md:w-[45%] snap-center"
          >
            <div className="glass p-6 md:p-8 rounded-[24px] h-full flex flex-col justify-between group">
              <div>
                {/* Layered Device frames */}
                <div className="relative mb-6">
                  <DeviceFrame
                    kind="laptop"
                    src={project.desktopImage}
                    fallbackSrc={project.desktopFallback}
                    alt={project.altDesktop}
                    priority={index === 0}
                  />
                  <div className="absolute -bottom-2 -right-2 w-[28%] z-10 shadow-2xl">
                    <DeviceFrame
                      kind="phone"
                      src={project.mobileImage}
                      fallbackSrc={project.mobileFallback}
                      alt={project.altMobile}
                    />
                  </div>
                </div>

                <h3 className="font-display font-bold text-2xl text-bone mb-1 tracking-tight">
                  {project.name}
                </h3>
                <p className="font-sans text-sm text-bone-subtle mb-6">
                  {project.metaLine}
                </p>
              </div>

              <div>
                <Link
                  to={`/work/${project.slug}`}
                  className="inline-flex items-center justify-center px-6 h-11 rounded-full bg-ember text-ink font-sans font-semibold text-sm hover:shadow-[var(--shadow-ember)] active:scale-97 transition-all"
                >
                  View case study
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next controls */}
      <div className="flex items-center justify-center gap-4 mt-2">
        <button
          type="button"
          onClick={() => scrollByCard("prev")}
          aria-label="Previous project"
          className="w-11 h-11 rounded-full glass border border-line flex items-center justify-center text-bone hover:border-ember hover:text-ember transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard("next")}
          aria-label="Next project"
          className="w-11 h-11 rounded-full glass border border-line flex items-center justify-center text-bone hover:border-ember hover:text-ember transition-colors"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};
