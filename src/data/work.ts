/**
 * PLACEHOLDER LIBRARY
 * Every entry is a stand-in. Real masters replace `src` and `poster`
 * under /public/work/. Do not invent channel names, view counts,
 * clients, or testimonials.
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

const clip = "/work/placeholder.mp4";

export const work: WorkItem[] = [
  {
    id: "doc-1",
    title: "Placeholder",
    style: "Documentary & Maps",
    role: "Assembly, maps, grade",
    description: "Placeholder — documentary and map edit. Case-study copy arrives with the picture.",
    src: clip,
    poster: "/work/posters/doc-1.svg",
    featured: true,
  },
  {
    id: "doc-2",
    title: "Placeholder",
    style: "Documentary & Maps",
    role: "B-roll, pacing, grade",
    description: "Placeholder — second documentary cut. Swap this card when the master is exported.",
    src: clip,
    poster: "/work/posters/doc-2.svg",
  },
  {
    id: "biz-1",
    title: "Placeholder",
    style: "Business & Tech Explainers",
    role: "Structure, motion, captions",
    description: "Placeholder — business explainer. No client name until the real piece is cleared.",
    src: clip,
    poster: "/work/posters/biz-1.svg",
    featured: true,
  },
  {
    id: "biz-2",
    title: "Placeholder",
    style: "Business & Tech Explainers",
    role: "Screen capture, callouts",
    description: "Placeholder — tech explainer with callouts. Poster and file are temporary.",
    src: clip,
    poster: "/work/posters/biz-2.svg",
  },
  {
    id: "bio-1",
    title: "Placeholder",
    style: "Biography & Faceless",
    role: "Narrative cut, b-roll",
    description: "Placeholder — biography edit. The story copy is intentionally unfinished.",
    src: clip,
    poster: "/work/posters/bio-1.svg",
    featured: true,
  },
  {
    id: "bio-2",
    title: "Placeholder",
    style: "Biography & Faceless",
    role: "Archival, voice, grade",
    description: "Placeholder — faceless biography. Replace the still and the cut together.",
    src: clip,
    poster: "/work/posters/bio-2.svg",
  },
  {
    id: "talk-1",
    title: "Placeholder",
    style: "Talking-Head",
    role: "Multicam, pacing, captions",
    description: "Placeholder — talking-head edit. Multicam notes land with the real project.",
    src: clip,
    poster: "/work/posters/talk-1.svg",
    featured: true,
  },
  {
    id: "talk-2",
    title: "Placeholder",
    style: "Talking-Head",
    role: "Trim, captions, grade",
    description: "Placeholder — a shorter talking-head pass. Title stays Placeholder for now.",
    src: clip,
    poster: "/work/posters/talk-2.svg",
  },
  {
    id: "short-1",
    title: "Placeholder",
    style: "Shorts & Motion",
    role: "Cutdowns, motion graphics",
    description: "Placeholder — short-form and motion edit. Graphics are not final.",
    src: clip,
    poster: "/work/posters/short-1.svg",
    featured: true,
  },
  {
    id: "short-2",
    title: "Placeholder",
    style: "Shorts & Motion",
    role: "Titles, rhythm, end card",
    description: "Placeholder — motion cutdown. Drop the finished file in /public/work/.",
    src: clip,
    poster: "/work/posters/short-2.svg",
  },
];

export const featured = work.filter((item) => item.featured);
