"use client";

import { createContext, useContext, useState } from "react";
import type { HeroId } from "@/data/heroes";

/** "new" — загадочный восьмой Варт, который только собирается переехать. */
export type Selection = HeroId | "new";

type Ctx = { selected: Selection; select: (id: Selection) => void };

const SelectedHeroContext = createContext<Ctx | null>(null);

/** Общий выбранный герой: карточки семьи и схема маршрута управляют одним состоянием. */
export function SelectedHeroProvider({ children }: { children: React.ReactNode }) {
  const [selected, select] = useState<Selection>("babushka");
  return <SelectedHeroContext.Provider value={{ selected, select }}>{children}</SelectedHeroContext.Provider>;
}

export function useSelectedHero() {
  const ctx = useContext(SelectedHeroContext);
  if (!ctx) throw new Error("useSelectedHero must be used inside SelectedHeroProvider");
  return ctx;
}
