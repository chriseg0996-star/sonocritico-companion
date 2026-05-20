import {
  Activity,
  BookOpen,
  Calculator,
  GitCompare,
  HeartPulse,
  Play,
  RotateCcw,
  Search,
  Star,
  Stethoscope,
} from "lucide-react";
import type { QuickActionDef, QuickActionId } from "@/lib/actions/types";
import type { NavigationContext } from "@/lib/navigation";

const BASE: QuickActionDef[] = [
  { id: "search-finding", label: "Buscar hallazgo", icon: Search, shortcutKey: "K" },
  { id: "open-companion", label: "Abrir Companion", icon: HeartPulse, shortcutKey: "G" },
  { id: "continue", label: "Continuar", icon: Play },
  { id: "open-atlas", label: "Abrir Atlas", icon: BookOpen, shortcutKey: "A" },
  { id: "open-cases", label: "Abrir Casos", icon: Activity, shortcutKey: "C" },
  { id: "calculators", label: "Calculadoras", icon: Calculator },
  { id: "favorites", label: "Favoritos", icon: Star },
];

const VIEWER: QuickActionDef[] = [
  { id: "compare", label: "Comparar", icon: GitCompare },
  { id: "open-protocol", label: "Abrir protocolo", icon: Stethoscope },
];

const CASE: QuickActionDef[] = [
  { id: "continue-case", label: "Continuar caso", icon: Play },
];

const GUARDIA: QuickActionDef[] = [
  { id: "restart-guardia-flow", label: "Reiniciar flujo", icon: RotateCcw },
];

const BY_ID = new Map<QuickActionId, QuickActionDef>();

function register(defs: QuickActionDef[]) {
  for (const d of defs) BY_ID.set(d.id, d);
}

register(BASE);
register(VIEWER);
register(CASE);
register(GUARDIA);

export function getQuickActionDef(id: QuickActionId): QuickActionDef | undefined {
  return BY_ID.get(id);
}

export function listQuickActionsForContext(ctx: NavigationContext): QuickActionDef[] {
  const ids: QuickActionId[] = [
    "search-finding",
    "open-companion",
    "continue",
    "open-atlas",
    "open-cases",
    "calculators",
    "favorites",
  ];

  if (ctx.kind === "viewer") {
    ids.push("compare", "open-protocol");
  } else if (ctx.kind === "case") {
    ids.push("continue-case");
  } else if (ctx.kind === "guardia") {
    ids.push("restart-guardia-flow");
  }

  return ids.map((id) => BY_ID.get(id)).filter((d): d is QuickActionDef => Boolean(d));
}
