"use client";

import type { AtlasFilterDef, AtlasFilterId } from "@/lib/atlas/types";
import type { BadgeVariant } from "@/lib/theme";
import { theme } from "@/lib/theme";

/** Variantes de estado usadas en la app. */
export type ChipVariant = BadgeVariant | "orange";

const chipColors: Record<string, { bg: string; border: string; color: string }> = {
  brand: { bg: theme.accent.muted, border: "transparent", color: theme.accent.soft },
  red: { bg: theme.state.errorMuted, border: "transparent", color: theme.state.danger },
  white: { bg: theme.state.completeMuted, border: "transparent", color: theme.text.secondary },
  gray: { bg: theme.surface.glass, border: "transparent", color: theme.text.muted },
  orange: { bg: theme.badge.warningBg, border: "transparent", color: theme.state.warning },
};

export interface ChipProps {
  children: React.ReactNode;
  variant?: ChipVariant;
  className?: string;
}

/** Etiqueta compacta de estado o metadata. */
export function Chip({ children, variant = "gray", className }: ChipProps) {
  const c = chipColors[variant] ?? chipColors.gray;
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        padding: "2px 7px",
        borderRadius: 5,
        fontSize: 9,
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontWeight: 500,
        letterSpacing: "0.02em",
        background: c.bg,
        border: c.border === "transparent" ? "none" : `1px solid ${c.border}`,
        color: c.color,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

/** @deprecated Usar `Chip`. */
export const Badge = Chip;

export type ChipFilterGroupProps = {
  filters: AtlasFilterDef[];
  active: AtlasFilterId;
  onChange: (id: AtlasFilterId) => void;
};

/** Fila de chips seleccionables (atlas, filtros). */
export function ChipFilterGroup({ filters, active, onChange }: ChipFilterGroupProps) {
  return (
    <div className="atlas-filter-chips" role="tablist" aria-label="Filtrar atlas">
      {filters.map((f) => {
        const isActive = active === f.id;
        return (
          <button
            key={f.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(f.id)}
            className={`atlas-filter-chip${isActive ? " atlas-filter-chip--active" : ""}`}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
