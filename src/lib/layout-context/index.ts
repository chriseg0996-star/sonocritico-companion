export type { CompanionScreenKind, CompanionLayoutHints, SidePanelState } from "@/lib/layout-context/types";
export {
  loadSidePanelState,
  saveSidePanelOpen,
  saveSidePanelWidth,
  SIDE_PANEL_DEFAULT_WIDTH,
  SIDE_PANEL_MIN_WIDTH,
  SIDE_PANEL_MAX_WIDTH,
} from "@/lib/layout-context/storage";
export {
  resolveCompanionScreen,
  shouldShowCompanionPanel,
  mergeCompanionHints,
} from "@/lib/layout-context/resolve";
