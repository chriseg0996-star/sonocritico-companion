"use client";

import { useEffect, useMemo, useState } from "react";
import type { AtlasComparisonPair, AtlasEntry, AtlasFilterId } from "@/lib/atlas/types";
import { SearchBar } from "@/components/atlas/SearchBar";
import { FilterChips } from "@/components/atlas/FilterChips";
import { ModuleAtlasGrid } from "@/components/atlas/ModuleAtlasGrid";
import { ComparisonCard } from "@/components/atlas/ComparisonCard";
import {
  PULMON_ATLAS_SEARCH_PLACEHOLDER,
  buildAtlasNavList,
  filterAtlasEntries,
  pulmonAtlasComparisons,
  pulmonAtlasEntries,
  pulmonAtlasFilters,
} from "@/lib/modules/pulmon-atlas";

type PanelProps = {
  onOpenEntry: (entry: AtlasEntry) => void;
  onNavListChange?: (entries: AtlasEntry[]) => void;
  /** Prefill de búsqueda (p. ej. panel companion). */
  initialQuery?: string;
};

export function PulmonAtlasPanel({ onOpenEntry, onNavListChange, initialQuery = "" }: PanelProps) {
  const [query, setQuery] = useState(initialQuery);
  const [filterId, setFilterId] = useState<AtlasFilterId>("all");

  const filtered = useMemo(
    () => filterAtlasEntries(pulmonAtlasEntries, query, filterId),
    [query, filterId]
  );

  const navList = useMemo(() => buildAtlasNavList(filtered, filterId), [filtered, filterId]);

  useEffect(() => {
    onNavListChange?.(navList);
  }, [navList, onNavListChange]);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const stills = useMemo(() => filtered.filter((e) => e.kind === "still"), [filtered]);
  const clips = useMemo(() => filtered.filter((e) => e.kind === "clip"), [filtered]);
  const gridStills = filterId === "clip" ? [] : stills.length > 0 ? stills : [];
  const gridClips = clips;
  const listKey = `${filterId}-${query.trim().toLowerCase()}`;

  return (
    <div className="atlas-workspace">
      <div className="atlas-toolbar-sticky">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder={PULMON_ATLAS_SEARCH_PLACEHOLDER}
          resultCount={filtered.length}
        />
        <FilterChips filters={pulmonAtlasFilters} active={filterId} onChange={setFilterId} />
      </div>

      <p className="atlas-hint">Clic en miniatura para abrir viewer PACS · ← → en modal</p>

      <ModuleAtlasGrid
        entries={filterId === "clip" ? gridClips : gridStills.length > 0 ? gridStills : filtered}
        onOpen={onOpenEntry}
        listKey={`stills-${listKey}`}
        emptyMessage="No hay hallazgos con este filtro. Prueba otro chip o búsqueda."
      />

      {filterId !== "clip" && gridClips.length > 0 && (
        <section id="clips" className="atlas-clips-section">
          <h3 className="atlas-clips-title">Clips ecográficos</h3>
          <p className="atlas-clips-sub">Reproducción en viewer (muted, loop)</p>
          <ModuleAtlasGrid entries={gridClips} onOpen={onOpenEntry} listKey={`clips-${listKey}`} />
        </section>
      )}
    </div>
  );
}

/** Sección comparar — usar en ModuleSection separada */
export function PulmonCompareSection({
  onOpen,
  onCompare,
}: {
  onOpen: (entry: AtlasEntry) => void;
  onCompare?: (pair: AtlasComparisonPair) => void;
}) {
  return (
    <div className="atlas-compare-grid">
      {pulmonAtlasComparisons.map((pair) => (
        <ComparisonCard key={pair.id} pair={pair} onOpen={onOpen} onCompare={onCompare} />
      ))}
    </div>
  );
}
