"use client";

import { createContext, useContext, useState } from "react";
import type { HeroId } from "@/data/heroes";

type Ctx = { selected: HeroId; select: (id: HeroId) => void };

const SelectedHeroContext = createContext<Ctx | null>(null);

/** Общий выбранный герой: карточки семьи и схема маршрута управляют одним состоянием. */
export function SelectedHeroProvider({ children }: { children: React.ReactNode }) {
  const [selected, select] = useState<HeroId>("babushka");
  return <SelectedHeroContext.Provider value={{ selected, select }}>{children}</SelectedHeroContext.Provider>;
}

export function useSelectedHero() {
  const ctx = useContext(SelectedHeroContext);
  if (!ctx) throw new Error("useSelectedHero must be used inside SelectedHeroProvider");
  return ctx;
}
