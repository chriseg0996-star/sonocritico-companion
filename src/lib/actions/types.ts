import type { LucideIcon } from "lucide-react";

export type QuickActionId =
  | "search-finding"
  | "open-companion"
  | "continue"
  | "open-atlas"
  | "open-cases"
  | "calculators"
  | "favorites"
  | "compare"
  | "open-protocol"
  | "continue-case"
  | "restart-guardia-flow";

export type QuickActionDef = {
  id: QuickActionId;
  label: string;
  hint?: string;
  icon: LucideIcon;
  /** Tecla cuando el panel está abierto (referencia UI). */
  shortcutKey?: string;
};

export type RecentQuickAction = {
  id: QuickActionId;
  label: string;
  at: string;
};
