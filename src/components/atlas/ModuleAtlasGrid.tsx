"use client";

import type { AtlasEntry } from "@/lib/atlas/types";
import { ModuleAtlasCard } from "@/components/atlas/ModuleAtlasCard";
import { EmptyState } from "@/components/ui/EmptyState";

type Props = {
  entries: AtlasEntry[];
  onOpen: (entry: AtlasEntry) => void;
  emptyMessage?: string;
  listKey?: string;
};

/** Grid de entradas atlas en módulos gold (legacy). */
export function ModuleAtlasGrid({
  entries,
  onOpen,
  emptyMessage = "Sin hallazgos para este filtro.",
  listKey = "default",
}: Props) {
  if (entries.length === 0) {
    return <EmptyState variant="atlas">{emptyMessage}</EmptyState>;
  }

  return (
    <div key={listKey} className="atlas-grid">
      {entries.map((entry) => (
        <ModuleAtlasCard key={entry.id} entry={entry} onOpen={onOpen} />
      ))}
    </div>
  );
}
