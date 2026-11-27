"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { CHAPTER_BG, type ChapterId } from "@/lib/chapters";
import { formatTimecode, pageProgress } from "@/lib/format";
import { detectQuality } from "@/lib/quality";
import { hudNodes, lenisRef, sceneState, type Quality } from "@/lib/state";
import { PlayerProvider } from "@/components/player-context";
import { Hud } from "@/components/Hud";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Showreel } from "@/components/Showreel";
import { WorkSection } from "@/components/WorkSection";
import { Grade } from "@/components/Grade";
import { StackChapter } from "@/components/StackChapter";
import { About } from "@/components/About";
import { Scope } from "@/components/Scope";
import { Finale } from "@/components/Finale";

const Stage = dynamic(() => import("@/components/Stage"), { ssr: false });

export function Experience() {
  const [chapter, setChapter] = useState<ChapterId>("hero");
  const [quality, setQuality] = useState<Quality | null>(null);
  const [reduced, setReduced] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const openIdRef = useRef<string | null>(null);
  openIdRef.current = openId;

  const close = useCallback(() => {
    const current = openIdRef.current;
    if (!current) return;
    const el = document.querySelector<HTMLElement>(`[data-film="${current}"]`);
    if (el) flipState.current = Flip.getState(el);
    const video = el?.querySelector("video");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setOpenId(null);
  }, []);

  const open = useCallback((id: string) => {
    if (openIdRef.current === id) return;
    const el = document.querySelector<HTMLElement>(`[data-film="${id}"]`);
    if (!el) return;
    document.querySelectorAll<HTMLVideoElement>(".film-card video").forEach((video) => {
      if (video.closest(`[data-film="${id}"]`)) return;
      video.pause();
    });
    const slot = el.parentElement as HTMLElement | null;
    if (slot) slot.style.minHeight = `${slot.offsetHeight}px`;
    flipState.current = Flip.getState(el);
    setOpenId(id);
    const video = el.querySelector("video");
    if (video) {
      video.muted = true;
      const pending = video.play();
      if (pending) pending.catch(() => undefined);
    }
  }, []);

  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state) return;
    flipState.current = null;
    const clearSlots = () => {
      if (openId) return;
      document.querySelectorAll<HTMLElement>(".slot").forEach((slot) => {
        slot.style.minHeight = "";
      });
    };
    if (sceneState.reduced) {
      clearSlots();
      return;
    }
    Flip.from(state, {
      duration: 0.75,
      ease: "expo.inOut",
      absolute: true,
      nested: true,
      prune: true,
      onComplete: clearSlots,
    });
  }, [openId]);

  useEffect(() => {
    document.body.classList.toggle("player-open", Boolean(openId));
    if (!openId) {
      lenisRef.current?.start();
      return;
    }
    lenisRef.current?.stop();
    document.querySelector<HTMLButtonElement>(`[data-film="${openId}"] .close`)?.focus();
    if (hudNodes.status) hudNodes.status.textContent = "PLAY";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, openId]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.chapter = chapter;
    root.style.backgroundColor = CHAPTER_BG[chapter];
  }, [chapter]);

  useEffect(() => {
    let alive = true;
    detectQuality().then((next) => {
      if (!alive) return;
      sceneState.quality = next;
      sceneState.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setReduced(sceneState.reduced);
      setQuality(next);
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Flip);
    const motionReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sceneState.reduced = motionReduced;
    setReduced(motionReduced);

    let lenis: Lenis | null = null;
    let holdTimer = 0;

    const writeHud = () => {
      if (hudNodes.tc) hudNodes.tc.textContent = formatTimecode(pageProgress());
    };

    const markMoving = () => {
      if (motionReduced || !hudNodes.status || openIdRef.current) return;
      hudNodes.status.textContent = "PLAY";
      hudNodes.status.parentElement?.classList.add("is-play");
      window.clearTimeout(holdTimer);
      holdTimer = window.setTimeout(() => {
        if (!hudNodes.status || openIdRef.current) return;
        hudNodes.status.textContent = "HOLD";
        hudNodes.status.parentElement?.classList.remove("is-play");
      }, 160);
    };

    if (!motionReduced) {
      lenis = new Lenis({ autoRaf: false, duration: 1.05, smoothWheel: true, syncTouch: false });
      lenisRef.current = lenis;
      lenis.on("scroll", () => {
        ScrollTrigger.update();
        writeHud();
        markMoving();
      });
    }

    const onScroll = () => {
      writeHud();
      ScrollTrigger.update();
      if (!lenis) markMoving();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    writeHud();
    if (motionReduced && hudNodes.status) hudNodes.status.textContent = "STILL";

    const tick = (time: number) => {
      lenis?.raf(time * 1000);
    };
    if (lenis) {
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      const glyphs = gsap.utils.toArray<HTMLElement>(".credits .glyph");
      if (!motionReduced) {
        gsap.to(".hero-word span", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
        });
      }
      glyphs.forEach((glyph) => {
        glyph.style.transform = motionReduced ? "none" : "translateY(120%)";
      });

      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          sceneState.hero = 1 - self.progress;
          sceneState.invalidate();
        },
      });

      ScrollTrigger.create({
        trigger: "#stack",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          sceneState.stack = self.progress;
          const step = Math.min(4, Math.floor(self.progress * 5));
          document.querySelectorAll<HTMLElement>("[data-layer]").forEach((el, index) => {
            el.classList.toggle("is-active", index === step);
          });
          sceneState.invalidate();
        },
      });

      ScrollTrigger.create({
        trigger: "#stack",
        start: "top 70%",
        end: "bottom 30%",
        onToggle: (self) => {
          sceneState.stackVisible = self.isActive ? 1 : 0;
          sceneState.invalidate();
        },
      });

      ScrollTrigger.create({
        trigger: "#about",
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          sceneState.about = self.progress;
        },
      });

      ScrollTrigger.create({
        trigger: "#finale",
        start: "top 88%",
        end: "top 38%",
        onUpdate: (self) => {
          if (motionReduced) return;
          glyphs.forEach((glyph, index) => {
            const local = Math.min(1, Math.max(0, (self.progress - index * 0.06) / 0.5));
            glyph.style.transform = `translateY(${(1 - local) * 120}%)`;
          });
        },
        onToggle: (self) => {
          sceneState.finale = self.isActive ? 1 : 0;
          sceneState.invalidate();
        },
      });
    });

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.chapter;
          if (!id) continue;
          ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best: ChapterId = "hero";
        let bestRatio = -1;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            best = id as ChapterId;
            bestRatio = ratio;
          }
        }
        if (bestRatio >= 0) setChapter((prev) => (prev === best ? prev : best));
      },
      { rootMargin: "-35% 0px -40% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    document.querySelectorAll<HTMLElement>("[data-chapter]").forEach((section) => observer.observe(section));

    let cancelled = false;
    const safeRefresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };
    window.addEventListener("load", safeRefresh);
    document.fonts?.ready.then(safeRefresh).catch(() => undefined);

    return () => {
      cancelled = true;
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("load", safeRefresh);
      window.clearTimeout(holdTimer);
      ctx.revert();
      if (lenis) gsap.ticker.remove(tick);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <PlayerProvider value={{ openId, open, close, reduced, chapter, quality }}>
      <a className="skip" href="#showreel">
        Skip to showreel
      </a>
      <Hud chapter={chapter} />
      <Nav chapter={chapter} />
      {quality ? <Stage quality={quality} /> : null}
      <div className={openId ? "backdrop on" : "backdrop"} onClick={close} />
      <main>
        <Hero />
        <Showreel />
        <WorkSection />
        <Grade />
        <StackChapter />
        <About />
        <Scope />
        <Finale />
      </main>
    </PlayerProvider>
  );
}
