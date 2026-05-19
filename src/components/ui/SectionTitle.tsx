"use client";

import { type } from "@/lib/typography";
import { theme } from "@/lib/theme";

export interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/** Encabezado de sección (eyebrow) en dashboard y listas. */
export function SectionTitle({ children, className, style }: SectionTitleProps) {
  return (
    <h2 className={className} style={{ ...type.eyebrow, color: theme.accent.primary, margin: "0 0 14px", ...style }}>
      {children}
    </h2>
  );
}
