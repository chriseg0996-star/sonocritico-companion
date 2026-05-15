"use client";

import type { AtlasEntry } from "@/lib/atlas/types";
import { AtlasThumbnail } from "@/components/atlas/AtlasThumbnail";
import { theme } from "@/lib/theme";
import { type } from "@/lib/typography";

type Props = {
  entry: AtlasEntry;
  onOpen: (entry: AtlasEntry) => void;
};

export function AtlasCard({ entry, onOpen }: Props) {
  const isClip = entry.kind === "clip";

  return (
    <button
      type="button"
      onClick={() => onOpen(entry)}
      className="atlas-card"
      style={{
        textAlign: "left",
        width: "100%",
        padding: 0,
        border: "none",
        background: theme.bg.card,
        borderRadius: theme.radius.sm,
        overflow: "hidden",
        cursor: "pointer",
        boxShadow: theme.shadow.inset,
      }}
    >
      <AtlasThumbnail entry={entry} aspectRatio="5/3" />
      <div style={{ padding: "10px 11px 11px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, marginBottom: 4 }}>
          <p style={{ ...type.titleSm, fontSize: 12, fontWeight: 500, color: theme.text.primary, margin: 0 }}>
            {entry.title}
          </p>
          <span
            style={{
              fontSize: 8,
              fontWeight: 600,
              padding: "2px 5px",
              borderRadius: 3,
              flexShrink: 0,
              background: theme.surface.glass,
              color: theme.text.faint,
            }}
          >
            {entry.protocol}
          </span>
        </div>
        <p style={{ fontSize: 10, color: theme.text.faint, margin: "0 0 6px" }}>{entry.window}</p>
        <p
          style={{
            fontSize: 10,
            color: theme.text.muted,
            margin: 0,
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {entry.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8, alignItems: "center" }}>
          {entry.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 8,
                padding: "2px 5px",
                borderRadius: 3,
                background: theme.surface.glass,
                color: theme.text.faint,
              }}
            >
              {tag}
            </span>
          ))}
          {isClip && entry.duration && (
            <span style={{ fontSize: 8, color: theme.text.faint, marginLeft: "auto" }}>{entry.duration}</span>
          )}
        </div>
      </div>
    </button>
  );
}
