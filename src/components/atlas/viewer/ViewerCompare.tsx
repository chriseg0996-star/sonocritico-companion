"use client";

import type { AtlasComparisonPair, AtlasEntry } from "@/lib/atlas/types";
import { getAtlasEntryById } from "@/lib/modules/pulmon-atlas";
import { ViewerViewport } from "@/components/atlas/viewer/ViewerViewport";
import { theme } from "@/lib/theme";

type Props = {
  pair: AtlasComparisonPair;
};

export function ViewerCompare({ pair }: Props) {
  const left = getAtlasEntryById(pair.leftId);
  const right = getAtlasEntryById(pair.rightId);
  if (!left || !right) return null;

  return (
    <div className="us-compare-layout">
      <ComparePane entry={left} />
      <div className="us-compare-divider" aria-hidden />
      <ComparePane entry={right} />
      <p className="us-compare-insight">{pair.insight}</p>
    </div>
  );
}

function ComparePane({ entry }: { entry: AtlasEntry }) {
  return (
    <div className="us-compare-pane">
      <header className="us-compare-pane-head">
        <span
          style={{
            fontSize: 9,
            fontWeight: 600,
            padding: "2px 6px",
            borderRadius: 3,
            background: entry.isPathological ? theme.state.errorMuted : theme.accent.muted,
            color: entry.isPathological ? theme.state.danger : theme.accent.soft,
          }}
        >
          {entry.isPathological ? "Patol." : "Normal"}
        </span>
        <span style={{ fontSize: 10, color: theme.text.faint }}>{entry.protocol}</span>
        <p style={{ fontSize: 12, fontWeight: 500, color: theme.text.primary, margin: "4px 0 0" }}>{entry.title}</p>
      </header>
      <ViewerViewport entry={entry} compact />
      <p style={{ fontSize: 10, color: theme.text.muted, margin: "8px 0 0", lineHeight: 1.4 }}>{entry.description}</p>
    </div>
  );
}
