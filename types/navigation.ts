export type AnimPhase = "idle" | "zooming-out" | "overview" | "zooming-in";

export interface NavigationContextValue {
  activeIndex: number;
  phase: AnimPhase;
  highlightIndex: number | null;
  navigate: (index: number) => void;
  scrollTo: (index: number) => void;
  setActiveIndex: (index: number) => void;
}

