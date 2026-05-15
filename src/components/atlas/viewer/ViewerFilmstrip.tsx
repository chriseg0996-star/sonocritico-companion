"use client";

import type { AtlasEntry } from "@/lib/atlas/types";
import { resolveAtlasMedia } from "@/lib/atlas/resolve-media";
import { placeholderGradients } from "@/lib/atlas/placeholders";
import { theme } from "@/lib/theme";

type Props = {
  entries: AtlasEntry[];
  activeId: string;
  onSelect: (entry: AtlasEntry) => void;
};

export function ViewerFilmstrip({ entries, activeId, onSelect }: Props) {
  return (
    <div className="us-filmstrip" role="tablist" aria-label="Secuencia de hallazgos">
      {entries.map((entry) => {
        const media = resolveAtlasMedia(entry);
        const ph = placeholderGradients[entry.placeholderVariant ?? "pattern-a"];
        const active = entry.id === activeId;
        return (
          <button
            key={entry.id}
            type="button"
            role="tab"
            aria-selected={active}
            className={`us-filmstrip-thumb${active ? " us-filmstrip-thumb--active" : ""}`}
            onClick={() => onSelect(entry)}
            title={entry.title}
          >
            {media.isPlaceholder ? (
              <span className="us-filmstrip-ph" style={{ background: ph.gradient }} />
            ) : (
              <img src={media.thumbnailSrc} alt="" loading="lazy" decoding="async" />
            )}
            <span className="us-filmstrip-label">{entry.title}</span>
          </button>
        );
      })}
    </div>
  );
}
