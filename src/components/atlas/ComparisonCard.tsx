"use client";

import type { AtlasComparisonPair, AtlasEntry } from "@/lib/atlas/types";
import { getAtlasEntryById } from "@/lib/modules/pulmon-atlas";
import { AtlasThumbnail } from "@/components/atlas/AtlasThumbnail";
import { theme } from "@/lib/theme";
import { type } from "@/lib/typography";

type Props = {
  pair: AtlasComparisonPair;
  onOpen: (entry: AtlasEntry) => void;
};

export function ComparisonCard({ pair, onOpen }: Props) {
  const left = getAtlasEntryById(pair.leftId);
  const right = getAtlasEntryById(pair.rightId);
  if (!left || !right) return null;

  return (
    <article
      style={{
        background: theme.bg.card,
        borderRadius: theme.radius.md,
        padding: 12,
        boxShadow: theme.shadow.inset,
      }}
    >
      <div style={{ marginBottom: 10 }}>
        <p style={{ ...type.titleSm, fontSize: 12, fontWeight: 500, margin: "0 0 2px", color: theme.text.primary }}>
          {pair.title}
        </p>
        <p style={{ fontSize: 10, color: theme.text.faint, margin: 0 }}>{pair.subtitle}</p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
        }}
      >
        <CompareSide entry={left} label="Izq." onOpen={onOpen} />
        <CompareSide entry={right} label="Der." onOpen={onOpen} />
      </div>
    </article>
  );
}

function CompareSide({
  entry,
  label,
  onOpen,
}: {
  entry: AtlasEntry;
  label: string;
  onOpen: (e: AtlasEntry) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(entry)}
      style={{
        padding: 0,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        textAlign: "left",
        borderRadius: theme.radius.sm,
        overflow: "hidden",
        transition: `opacity ${theme.motion.fast}`,
      }}
    >
      <AtlasThumbnail entry={entry} aspectRatio="4/3" />
      <p style={{ fontSize: 10, color: theme.text.secondary, margin: "6px 4px 0", fontWeight: 500 }}>
        {entry.title}
      </p>
      <p style={{ fontSize: 9, color: theme.text.faint, margin: "2px 4px 0" }}>{label}</p>
    </button>
  );
}
