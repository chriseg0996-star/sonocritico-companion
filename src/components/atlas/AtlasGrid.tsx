"use client";

import type { AtlasEntry } from "@/lib/atlas/types";
import { AtlasCard } from "@/components/atlas/AtlasCard";
import { theme } from "@/lib/theme";

type Props = {
  entries: AtlasEntry[];
  onOpen: (entry: AtlasEntry) => void;
  emptyMessage?: string;
};

export function AtlasGrid({ entries, onOpen, emptyMessage = "Sin hallazgos para este filtro." }: Props) {
  if (entries.length === 0) {
    return (
      <p style={{ fontSize: 12, color: theme.text.faint, margin: "8px 0 0", textAlign: "center", padding: "24px 0" }}>
        {emptyMessage}
      </p>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: 10,
      }}
    >
      {entries.map((entry) => (
        <AtlasCard key={entry.id} entry={entry} onOpen={onOpen} />
      ))}
    </div>
  );
}
