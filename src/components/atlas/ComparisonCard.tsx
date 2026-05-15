"use client";

import { Columns2 } from "lucide-react";
import type { AtlasComparisonPair, AtlasEntry } from "@/lib/atlas/types";
import { getAtlasEntryById } from "@/lib/modules/pulmon-atlas";
import { AtlasThumbnail } from "@/components/atlas/AtlasThumbnail";
import { theme } from "@/lib/theme";
import { type } from "@/lib/typography";

type Props = {
  pair: AtlasComparisonPair;
  onOpen: (entry: AtlasEntry) => void;
  onCompare?: (pair: AtlasComparisonPair) => void;
};

export function ComparisonCard({ pair, onOpen, onCompare }: Props) {
  const left = getAtlasEntryById(pair.leftId);
  const right = getAtlasEntryById(pair.rightId);
  if (!left || !right) return null;

  return (
    <article className="atlas-compare-card" style={{ background: theme.bg.card, borderRadius: theme.radius.md, padding: 12, boxShadow: theme.shadow.inset }}>
      <div style={{ marginBottom: 10 }}>
        <p style={{ ...type.titleSm, fontSize: 12, fontWeight: 500, margin: "0 0 2px", color: theme.text.primary }}>
          {pair.title}
        </p>
        <p style={{ fontSize: 10, color: theme.text.faint, margin: "0 0 8px" }}>{pair.subtitle}</p>
        <p className="atlas-compare-insight">{pair.insight}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <CompareSide entry={left} onOpen={onOpen} />
        <CompareSide entry={right} onOpen={onOpen} />
      </div>
      {onCompare && (
        <button type="button" className="atlas-compare-mode-btn" onClick={() => onCompare(pair)}>
          <Columns2 size={12} />
          Modo comparación
        </button>
      )}
    </article>
  );
}

function CompareSide({ entry, onOpen }: { entry: AtlasEntry; onOpen: (e: AtlasEntry) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(entry)}
      className="atlas-compare-side"
      style={{
        padding: 0,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        textAlign: "left",
        borderRadius: theme.radius.sm,
        overflow: "hidden",
      }}
    >
      <AtlasThumbnail entry={entry} aspectRatio="4/3" />
      <div style={{ padding: "6px 4px 0" }}>
        <p style={{ fontSize: 10, color: theme.text.secondary, margin: "0 0 4px", fontWeight: 500 }}>
          {entry.title}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          <TagChip label={entry.isPathological ? "Patol." : "Normal"} danger={entry.isPathological} />
          <TagChip label={entry.protocol} />
          {entry.kind === "clip" && <TagChip label="CLIP" />}
        </div>
      </div>
    </button>
  );
}

function TagChip({ label, danger }: { label: string; danger?: boolean }) {
  return (
    <span
      style={{
        fontSize: 8,
        fontWeight: 600,
        padding: "2px 5px",
        borderRadius: 3,
        background: danger ? theme.state.errorMuted : theme.accent.muted,
        color: danger ? theme.state.danger : theme.accent.soft,
      }}
    >
      {label}
    </span>
  );
}
