import { create } from "zustand";

type RightPanelTab = "inspector" | "code";

interface UiState {
  rightPanelTab: RightPanelTab;
  paletteQuery: string;
  setRightPanelTab: (tab: RightPanelTab) => void;
  setPaletteQuery: (query: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  rightPanelTab: "inspector",
  paletteQuery: "",
  setRightPanelTab: (rightPanelTab) => set({ rightPanelTab }),
  setPaletteQuery: (paletteQuery) => set({ paletteQuery }),
}));
