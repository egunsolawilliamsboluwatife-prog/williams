import React from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "@phosphor-icons/react";
import { CASE_STUDIES } from "../../content/work.ts";

export const ProjectList: React.FC = () => {
  return (
    <div className="w-full divide-y divide-line border-y border-line">
      {CASE_STUDIES.map((project) => (
        <div
          key={project.slug}
          className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start md:items-center"
        >
          {/* Cols 1-4: Client name and meta */}
          <div className="md:col-span-4">
            <h3 className="font-display font-semibold text-2xl text-bone mb-1 tracking-tight">
              {project.name}
            </h3>
            <p className="font-sans text-sm text-bone-subtle">
              {project.metaLine}
            </p>
          </div>

          {/* Cols 5-9: Summary */}
          <div className="md:col-span-5">
            <p className="font-sans text-base text-bone-muted leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Cols 10-12: Actions */}
          <div className="md:col-span-3 flex flex-wrap items-center gap-6 md:justify-end pt-2 md:pt-0">
            <Link
              to={`/work/${project.slug}`}
              className="text-ember font-sans font-medium text-sm md:text-base underline underline-offset-4 decoration-1 hover:decoration-2 transition-all"
            >
              View case study
            </Link>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-ember font-sans font-medium text-sm md:text-base underline underline-offset-4 decoration-1 hover:decoration-2 transition-all"
            >
              <span>Visit live site</span>
              <ArrowUpRight size={16} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};
