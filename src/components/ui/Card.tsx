"use client";

import { cn } from "@/lib/utils";
import { theme } from "@/lib/theme";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

/** Contenedor con borde, scan-line y hover opcional. */
export function Card({ children, className, glow, onClick, style }: CardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: glow ? theme.bg.elevated : theme.bg.card,
        border: `1px solid ${theme.bg.border}`,
        borderRadius: theme.radius.md,
        position: "relative",
        overflow: "hidden",
        boxShadow: glow ? theme.shadow.card : theme.shadow.inset,
        transition: `transform ${theme.motion.base}, border-color ${theme.motion.base}, background ${theme.motion.base}, box-shadow ${theme.motion.base}`,
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
      className={cn("scan-line", onClick && "card-interactive", className)}
    >
      {children}
    </div>
  );
}

/** @deprecated Usar `Card`. Alias histórico. */
export const ScanLineCard = Card;
