"use client";

import type { AtlasFilterDef, AtlasFilterId } from "@/lib/atlas/types";
import { theme } from "@/lib/theme";

type Props = {
  filters: AtlasFilterDef[];
  active: AtlasFilterId;
  onChange: (id: AtlasFilterId) => void;
};

export function FilterChips({ filters, active, onChange }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 5,
        marginBottom: 16,
      }}
    >
      {filters.map((f) => {
        const isActive = active === f.id;
        return (
          <button
            key={f.id}
            type="button"
            onClick={() => onChange(f.id)}
            style={{
              fontSize: 10,
              fontWeight: 500,
              padding: "4px 9px",
              borderRadius: 5,
              border: "none",
              cursor: "pointer",
              background: isActive ? theme.accent.muted : theme.surface.glass,
              color: isActive ? theme.accent.soft : theme.text.faint,
              transition: `background ${theme.motion.fast}, color ${theme.motion.fast}`,
            }}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
