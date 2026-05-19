"use client";

import { useEffect, useMemo, useState } from "react";
import type { AtlasComparisonPair, AtlasEntry, AtlasFilterId } from "@/lib/atlas/types";
import { SearchBar } from "@/components/atlas/SearchBar";
import { FilterChips } from "@/components/atlas/FilterChips";
import { ModuleAtlasGrid } from "@/components/atlas/ModuleAtlasGrid";
import { ComparisonCard } from "@/components/atlas/ComparisonCard";
import {
  CARDIAC_ATLAS_SEARCH_PLACEHOLDER,
  buildCardiacAtlasNavList,
  cardiacAtlasComparisons,
  cardiacAtlasEntries,
  cardiacAtlasFilters,
  filterCardiacAtlasEntries,
  getCardiacAtlasEntryById,
} from "@/lib/modules/cardiac-atlas";

type PanelProps = {
  onOpenEntry: (entry: AtlasEntry) => void;
  onNavListChange?: (entries: AtlasEntry[]) => void;
};

export function CardiacAtlasPanel({ onOpenEntry, onNavListChange }: PanelProps) {
  const [query, setQuery] = useState("");
  const [filterId, setFilterId] = useState<AtlasFilterId>("all");

  const filtered = useMemo(
    () => filterCardiacAtlasEntries(cardiacAtlasEntries, query, filterId),
    [query, filterId]
  );

  const navList = useMemo(() => buildCardiacAtlasNavList(filtered, filterId), [filtered, filterId]);

  useEffect(() => {
    onNavListChange?.(navList);
  }, [navList, onNavListChange]);

  const stills = useMemo(() => filtered.filter((e) => e.kind === "still"), [filtered]);
  const clips = useMemo(() => filtered.filter((e) => e.kind === "clip"), [filtered]);
  const gridStills = filterId === "clip" ? [] : stills;
  const listKey = `${filterId}-${query.trim().toLowerCase()}`;

  return (
    <div className="atlas-workspace">
      <div className="atlas-toolbar-sticky">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder={CARDIAC_ATLAS_SEARCH_PLACEHOLDER}
          resultCount={filtered.length}
        />
        <FilterChips filters={cardiacAtlasFilters} active={filterId} onChange={setFilterId} />
      </div>

      <p className="atlas-hint">Clic en miniatura para abrir viewer PACS · ← → en modal</p>

      <ModuleAtlasGrid
        entries={filterId === "clip" ? clips : gridStills.length > 0 ? gridStills : filtered}
        onOpen={onOpenEntry}
        listKey={`stills-${listKey}`}
        emptyMessage="No hay hallazgos con este filtro. Prueba otro chip o búsqueda."
      />

      {filterId !== "clip" && clips.length > 0 && (
        <section id="clips" className="atlas-clips-section">
          <h3 className="atlas-clips-title">Clips ecográficos</h3>
          <p className="atlas-clips-sub">Reproducción en viewer (muted, loop)</p>
          <ModuleAtlasGrid entries={clips} onOpen={onOpenEntry} listKey={`clips-${listKey}`} />
        </section>
      )}
    </div>
  );
}

export function CardiacCompareSection({
  onOpen,
  onCompare,
}: {
  onOpen: (entry: AtlasEntry) => void;
  onCompare?: (pair: AtlasComparisonPair) => void;
}) {
  return (
    <div className="atlas-compare-grid">
      {cardiacAtlasComparisons.map((pair) => (
        <ComparisonCard
          key={pair.id}
          pair={pair}
          onOpen={onOpen}
          onCompare={onCompare}
          getEntryById={getCardiacAtlasEntryById}
        />
      ))}
    </div>
  );
}
