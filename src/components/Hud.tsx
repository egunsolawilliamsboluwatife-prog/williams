"use client";

import { useEffect, useRef } from "react";
import { chapterById } from "@/lib/chapters";
import { hudNodes, sceneState } from "@/lib/state";

export function Hud({ chapter }: { chapter: string }) {
  const tcRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const current = chapterById(chapter);

  useEffect(() => {
    hudNodes.tc = tcRef.current;
    hudNodes.status = statusRef.current;
    if (statusRef.current && sceneState.reduced) statusRef.current.textContent = "STILL";
    return () => {
      hudNodes.tc = null;
      hudNodes.status = null;
    };
  }, []);

  return (
    <div className="hud" aria-hidden="true">
      <div className="hud-tl">
        <span>TC</span>
        <span ref={tcRef}>00:00:00:00</span>
      </div>
      <div className="hud-tr">
        <span>RATE</span>
        <span>24 FPS</span>
      </div>
      <div className="hud-bl">
        <span>{current.index}</span>
        <span>{current.hud}</span>
      </div>
      <div className="hud-br">
        <i className="led" />
        <span ref={statusRef}>HOLD</span>
      </div>
    </div>
  );
}
