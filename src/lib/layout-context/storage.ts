import type { SidePanelState } from "@/lib/layout-context/types";

const OPEN_KEY = "companion.sidePanel.open";
const WIDTH_KEY = "companion.sidePanel.width";

export const SIDE_PANEL_DEFAULT_WIDTH = 280;
export const SIDE_PANEL_MIN_WIDTH = 240;
export const SIDE_PANEL_MAX_WIDTH = 360;

function clampWidth(value: number): number {
  return Math.min(SIDE_PANEL_MAX_WIDTH, Math.max(SIDE_PANEL_MIN_WIDTH, value));
}

export function loadSidePanelState(): SidePanelState {
  if (typeof window === "undefined") {
    return { open: true, width: SIDE_PANEL_DEFAULT_WIDTH };
  }
  try {
    const openRaw = localStorage.getItem(OPEN_KEY);
    const widthRaw = localStorage.getItem(WIDTH_KEY);
    const open = openRaw === null ? true : openRaw === "true";
    const width = widthRaw ? clampWidth(Number(widthRaw)) : SIDE_PANEL_DEFAULT_WIDTH;
    return { open, width: Number.isFinite(width) ? width : SIDE_PANEL_DEFAULT_WIDTH };
  } catch {
    return { open: true, width: SIDE_PANEL_DEFAULT_WIDTH };
  }
}

export function saveSidePanelOpen(open: boolean): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(OPEN_KEY, String(open));
  } catch {
    /* quota */
  }
}

export function saveSidePanelWidth(width: number): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(WIDTH_KEY, String(clampWidth(width)));
  } catch {
    /* quota */
  }
}
