import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Camera,
  CheckSquare,
  ClipboardList,
  Eye,
  GitBranch,
  HelpCircle,
} from "lucide-react";

export const MODULE_TAB_IDS = [
  "resumen",
  "adquisicion",
  "hallazgos",
  "protocolo",
  "checklist",
  "quiz",
  "pocket",
] as const;

export type ModuleTabId = (typeof MODULE_TAB_IDS)[number];

export interface ModuleTabDef {
  id: ModuleTabId;
  label: string;
  icon: LucideIcon;
}

export const MODULE_TABS: ModuleTabDef[] = [
  { id: "resumen", label: "Resumen", icon: BookOpen },
  { id: "adquisicion", label: "Adquisición", icon: Camera },
  { id: "hallazgos", label: "Hallazgos", icon: Eye },
  { id: "protocolo", label: "Protocolo", icon: GitBranch },
  { id: "checklist", label: "Checklist", icon: CheckSquare },
  { id: "quiz", label: "Quiz", icon: HelpCircle },
  { id: "pocket", label: "Resumen rápido", icon: ClipboardList },
];

export function parseModuleTab(value: string | null): ModuleTabId {
  if (value && MODULE_TAB_IDS.includes(value as ModuleTabId)) {
    return value as ModuleTabId;
  }
  return "resumen";
}
