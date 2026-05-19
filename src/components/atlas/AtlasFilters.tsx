"use client";

import { ATLAS_FILTER_OPTIONS, type AtlasFilterModule } from "@/lib/media/atlas-filters";
import styles from "@/components/atlas/atlas-library.module.css";

type Props = {
  active: AtlasFilterModule;
  onChange: (module: AtlasFilterModule) => void;
};

/** Filtros por módulo clínico (Pulmón, FAST, Cardiac, VExUS). */
export function AtlasFilters({ active, onChange }: Props) {
  return (
    <div className={styles.filtersWrap}>
      <div className="atlas-filter-chips" role="tablist" aria-label="Filtrar atlas por módulo">
        {ATLAS_FILTER_OPTIONS.map((opt) => {
          const isActive = active === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(opt.id)}
              className={`atlas-filter-chip${isActive ? " atlas-filter-chip--active" : ""}`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
