"use client";

import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export type EmptyStateVariant = "default" | "atlas";

export interface EmptyStateProps {
  children: React.ReactNode;
  variant?: EmptyStateVariant;
  className?: string;
}

const variantStyles: Record<EmptyStateVariant, React.CSSProperties> = {
  default: { fontSize: 13, color: theme.text.secondary },
  atlas: { fontSize: 12, color: theme.text.faint, textAlign: "center", padding: "28px 0" },
};

/** Mensaje cuando no hay datos (listas, atlas, casos). */
export function EmptyState({ children, variant = "default", className }: EmptyStateProps) {
  return (
    <p className={cn(variant === "atlas" && "atlas-grid-empty", className)} style={variantStyles[variant]}>
      {children}
    </p>
  );
}
