"use client";

import type { AtlasEntry } from "@/lib/atlas/types";
import { AtlasCard } from "@/components/atlas/AtlasCard";
import { theme } from "@/lib/theme";

type Props = {
  entries: AtlasEntry[];
  onOpen: (entry: AtlasEntry) => void;
  emptyMessage?: string;
  /** Cambia con filtro/búsqueda para transición suave */
  listKey?: string;
};

export function AtlasGrid({
  entries,
  onOpen,
  emptyMessage = "Sin hallazgos para este filtro.",
  listKey = "default",
}: Props) {
  if (entries.length === 0) {
    return (
      <p className="atlas-grid-empty" style={{ fontSize: 12, color: theme.text.faint, textAlign: "center", padding: "28px 0" }}>
        {emptyMessage}
      </p>
    );
  }

  return (
    <div key={listKey} className="atlas-grid">
      {entries.map((entry) => (
        <AtlasCard key={entry.id} entry={entry} onOpen={onOpen} />
      ))}
    </div>
  );
}
