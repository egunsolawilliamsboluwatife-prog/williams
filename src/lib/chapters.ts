export const CHAPTERS = [
  { id: "hero", index: "01", label: "Open", hud: "OPEN" },
  { id: "showreel", index: "02", label: "Reel", hud: "REEL" },
  { id: "work", index: "03", label: "Work", hud: "WORK" },
  { id: "grade", index: "04", label: "Grade", hud: "GRADE" },
  { id: "stack", index: "05", label: "Stack", hud: "STACK" },
  { id: "about", index: "06", label: "About", hud: "ABOUT" },
  { id: "scope", index: "07", label: "Brief", hud: "BRIEF" },
  { id: "finale", index: "08", label: "End", hud: "END" },
] as const;

export type ChapterId = (typeof CHAPTERS)[number]["id"];

export const CHAPTER_BG: Record<ChapterId, string> = {
  hero: "#060911",
  showreel: "#080c18",
  work: "#070b16",
  grade: "#0a0f1c",
  stack: "#060a14",
  about: "#0b1020",
  scope: "#080d18",
  finale: "#05070e",
};

export function chapterById(id: string) {
  return CHAPTERS.find((chapter) => chapter.id === id) ?? CHAPTERS[0];
}
