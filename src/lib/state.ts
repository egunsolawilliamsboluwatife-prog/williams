import type Lenis from "lenis";

export type Quality = "high" | "low";

export const sceneState = {
  hero: 1,
  stack: 0,
  stackVisible: 0,
  finale: 0,
  about: 0,
  reduced: false,
  quality: "high" as Quality,
  invalidate: () => {},
};

export const lenisRef: { current: Lenis | null } = { current: null };

export const hudNodes: {
  tc: HTMLElement | null;
  status: HTMLElement | null;
} = { tc: null, status: null };

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisRef.current) {
    lenisRef.current.scrollTo(el, { offset: 0 });
    return;
  }
  el.scrollIntoView({ behavior: sceneState.reduced ? "auto" : "smooth" });
}
