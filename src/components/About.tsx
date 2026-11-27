"use client";

import dynamic from "next/dynamic";
import { useExperience } from "@/components/player-context";

const Portrait = dynamic(() => import("@/components/Portrait"), {
  ssr: false,
  loading: () => (
    <img src="/williams-navy-bokeh.jpg" alt="Williams, freelance video editor in Lagos" width={1048} height={592} />
  ),
});

export function About() {
  const { quality } = useExperience();

  return (
    <section className="block" id="about" data-chapter="about">
      <div className="about-grid">
        <div className="about-copy">
          <p className="kicker">06 — About</p>
          <h2>
            Williams, <em>Lagos.</em>
          </h2>
          <p className="placeholder-tag">Placeholder bio</p>
          <p className="lede">
            Williams is a freelance video editor based in Lagos. He cuts documentary, map, business explainer, biography, and motion-graphics pieces for YouTube.
          </p>
          <p className="fine">This bio is placeholder copy. It will be replaced with Williams’s own words. Move across the portrait — the face sits forward in the frame. Hover brings in the grey studio plate.</p>
        </div>
        <div className="about-visual">
          <div className="portrait-stage">
            <Portrait quality={quality ?? "high"} />
          </div>
          <p className="portrait-caption">Williams — Lagos</p>
        </div>
      </div>
    </section>
  );
}
