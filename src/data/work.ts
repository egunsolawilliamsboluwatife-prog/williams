/**
 * Finished spec cuts only. Each file is a 1080p, 45-second master in
 * /public/work/. These are original spec pieces, not client work.
 * Do not add channel names, view counts, or testimonials.
 */
export const styles = [
  "Documentary & Maps",
  "Business & Tech Explainers",
  "Biography & Faceless",
  "Talking-Head",
  "Shorts & Motion",
] as const;

export type WorkStyle = (typeof styles)[number];

export type WorkItem = {
  id: string;
  title: string;
  style: WorkStyle;
  role: string;
  description: string;
  src: string;
  poster: string;
  featured?: boolean;
};

export const work: WorkItem[] = [
  {
    id: "map-doc",
    title: "The Drift",
    style: "Documentary & Maps",
    role: "Spec Cut",
    description:
      "Spec cut, 45 seconds. The 1879–81 USS Jeannette Arctic expedition: an archival photograph, an animated map route, and the pack-ice drift.",
    src: "/work/map-doc.mp4",
    poster: "/work/map-doc_poster.jpg",
    featured: true,
  },
  {
    id: "explainer",
    title: "Why Airliners Cruise at 35,000 ft",
    style: "Business & Tech Explainers",
    role: "Spec Cut",
    description:
      "Spec cut, 45 seconds. A vector aviation explainer with an altitude ruler, air-density visuals, and an efficiency curve.",
    src: "/work/explainer.mp4",
    poster: "/work/explainer_poster.jpg",
    featured: true,
  },
  {
    id: "kinetic",
    title: "The Map Is the Film",
    style: "Shorts & Motion",
    role: "Spec Cut",
    description: "Spec cut, 45 seconds. Kinetic typography locked to a 120 BPM pulse.",
    src: "/work/kinetic.mp4",
    poster: "/work/kinetic_poster.jpg",
    featured: true,
  },
];

export const featured = work.filter((item) => item.featured);
