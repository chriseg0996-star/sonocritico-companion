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
  return (
    <button
      type="button"
      onClick={() => onOpen(entry)}
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
        transition: `transform ${theme.motion.base}, box-shadow ${theme.motion.base}, background ${theme.motion.base}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.boxShadow = theme.shadow.card;
        e.currentTarget.style.background = theme.bg.elevated;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = theme.shadow.inset;
        e.currentTarget.style.background = theme.bg.card;
      }}
    >
      <AtlasThumbnail entry={entry} aspectRatio="5/3" />
      <div style={{ padding: "10px 11px 11px" }}>
        <p style={{ ...type.titleSm, fontSize: 12, fontWeight: 500, color: theme.text.primary, margin: "0 0 3px" }}>
          {entry.title}
        </p>
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
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 8 }}>
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
        </div>
      </div>
    </button>
  );
}
