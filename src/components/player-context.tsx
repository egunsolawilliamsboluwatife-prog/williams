"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Quality } from "@/lib/state";

export type PlayerContextValue = {
  openId: string | null;
  open: (id: string) => void;
  close: () => void;
  reduced: boolean;
  chapter: string;
  quality: Quality | null;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ value, children }: { value: PlayerContextValue; children: ReactNode }) {
  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function useExperience() {
  const value = useContext(PlayerContext);
  if (!value) throw new Error("useExperience must be used inside the page shell");
  return value;
}
