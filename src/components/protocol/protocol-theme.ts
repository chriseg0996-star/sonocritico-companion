import { theme } from "@/lib/theme";
import type { FlowNode } from "@/types";

export const nodeColors: Record<string, { bg: string; border: string; text: string }> = {
  question: { bg: theme.brand.redMuted, border: theme.brand.redBorder, text: theme.brand.red },
  finding: { bg: "rgba(255,255,255,0.06)", border: theme.bg.border, text: theme.text.secondary },
  action: { bg: "rgba(255,255,255,0.08)", border: theme.text.muted, text: theme.text.primary },
  endpoint: { bg: theme.brand.redMuted, border: theme.brand.red, text: theme.text.primary },
};

export function nodeBadgeVariant(type: FlowNode["type"]) {
  if (type === "question" || type === "endpoint") return "brand" as const;
  if (type === "action") return "white" as const;
  return "gray" as const;
}
