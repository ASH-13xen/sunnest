export interface Section {
  id: string;
  label: string;
  col: number;
  row: number;
  index: number;
}

export const COLS = 3;
export const ROWS = 2;
export const GAP  = 40; // px gap between cells

export const SECTIONS: Section[] = [
  { id: "hero",      label: "Hero",          col: 0, row: 0, index: 0 },
  { id: "about",     label: "About",         col: 1, row: 0, index: 1 },
  { id: "pricing",   label: "Pricing",       col: 2, row: 0, index: 2 },
  { id: "solutions", label: "Solutions",     col: 0, row: 1, index: 3 },
  { id: "contact",   label: "Contact",       col: 1, row: 1, index: 4 },
  { id: "services",  label: "Process & FAQ", col: 2, row: 1, index: 5 },
];
