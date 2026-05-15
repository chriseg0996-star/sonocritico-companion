import { theme } from "@/lib/theme";
import type { FlowNode } from "@/types";

export const nodeColors: Record<string, { bg: string; border: string; text: string }> = {
  question: { bg: theme.accent.muted, border: theme.accent.border, text: theme.accent.soft },
  finding: { bg: "rgba(255,255,255,0.06)", border: theme.bg.border, text: theme.text.secondary },
  action: { bg: "rgba(255,255,255,0.08)", border: theme.text.muted, text: theme.text.primary },
  endpoint: { bg: theme.accent.muted, border: theme.accent.primary, text: theme.text.primary },
};

export function nodeBadgeVariant(type: FlowNode["type"]) {
  if (type === "question" || type === "endpoint") return "brand" as const;
  if (type === "action") return "white" as const;
  return "gray" as const;
}
