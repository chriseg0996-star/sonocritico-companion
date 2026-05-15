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
            style={{
              fontSize: 10,
              fontWeight: 500,
              padding: "4px 9px",
              borderRadius: 5,
              border: "none",
              cursor: "pointer",
              background: isActive ? theme.accent.muted : theme.surface.glass,
              color: isActive ? theme.accent.soft : theme.text.faint,
            }}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
