"use client";

import { useMemo, useState } from "react";
import type { AtlasEntry, AtlasFilterId } from "@/lib/atlas/types";
import { SearchBar } from "@/components/atlas/SearchBar";
import { FilterChips } from "@/components/atlas/FilterChips";
import { AtlasGrid } from "@/components/atlas/AtlasGrid";
import { ComparisonCard } from "@/components/atlas/ComparisonCard";
import {
  PULMON_ATLAS_SEARCH_PLACEHOLDER,
  filterAtlasEntries,
  pulmonAtlasComparisons,
  pulmonAtlasEntries,
  pulmonAtlasFilters,
} from "@/lib/modules/pulmon-atlas";
import { theme } from "@/lib/theme";

type PanelProps = {
  onOpenEntry: (entry: AtlasEntry) => void;
};

export function PulmonAtlasPanel({ onOpenEntry }: PanelProps) {
  const [query, setQuery] = useState("");
  const [filterId, setFilterId] = useState<AtlasFilterId>("all");

  const filtered = useMemo(
    () => filterAtlasEntries(pulmonAtlasEntries, query, filterId),
    [query, filterId]
  );

  const stills = useMemo(() => filtered.filter((e) => e.kind === "still"), [filtered]);
  const clips = useMemo(() => filtered.filter((e) => e.kind === "clip"), [filtered]);

  return (
    <>
      <SearchBar value={query} onChange={setQuery} placeholder={PULMON_ATLAS_SEARCH_PLACEHOLDER} />
      <FilterChips filters={pulmonAtlasFilters} active={filterId} onChange={setFilterId} />

      <p style={{ fontSize: 10, color: theme.text.faint, margin: "0 0 12px" }}>
        {filtered.length} hallazgo{filtered.length !== 1 ? "s" : ""} · clic para abrir viewer
      </p>

      <AtlasGrid
        entries={filterId === "clip" ? clips : stills.length > 0 ? stills : filtered}
        onOpen={onOpenEntry}
        emptyMessage="No hay hallazgos con este filtro. Prueba otro chip o búsqueda."
      />

      {filterId !== "clip" && clips.length > 0 && (
        <div id="clips" style={{ marginTop: 28, scrollMarginTop: 56 }}>
          <h3
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: theme.text.secondary,
              margin: "0 0 10px",
            }}
          >
            Clips ecográficos
          </h3>
          <p style={{ fontSize: 10, color: theme.text.faint, margin: "0 0 12px" }}>
            Contenido audiovisual — reproducción en viewer (muted)
          </p>
          <AtlasGrid entries={clips} onOpen={onOpenEntry} />
        </div>
      )}
    </>
  );
}

/** Sección comparar — usar en ModuleSection separada */
export function PulmonCompareSection({ onOpen }: { onOpen: (entry: AtlasEntry) => void }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 12,
      }}
    >
      {pulmonAtlasComparisons.map((pair) => (
        <ComparisonCard key={pair.id} pair={pair} onOpen={onOpen} />
      ))}
    </div>
  );
}
