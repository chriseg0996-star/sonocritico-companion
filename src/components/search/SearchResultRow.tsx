"use client";

import type { ElementType } from "react";
import { BookOpen, Clapperboard, FileText, ImageIcon, Layers } from "lucide-react";
import type { ClinicalSearchGroup, ClinicalSearchResult } from "@/lib/search/types";
import { getAtlasEntryById } from "@/lib/modules/pulmon-atlas";
import { resolveAtlasMedia } from "@/lib/atlas/resolve-media";
import { theme } from "@/lib/theme";

const GROUP_ICON: Record<ClinicalSearchGroup, ElementType> = {
  hallazgo: ImageIcon,
  clip: Clapperboard,
  protocolo: Layers,
  bibliografia: FileText,
  modulo: BookOpen,
};

type Props = {
  result: ClinicalSearchResult;
  active?: boolean;
  onSelect: () => void;
};

export function SearchResultRow({ result, active, onSelect }: Props) {
  const Icon = GROUP_ICON[result.group];
  const entry = result.atlasEntryId ? getAtlasEntryById(result.atlasEntryId) : undefined;
  const media = entry ? resolveAtlasMedia(entry) : null;
  const thumb = media && !media.isPlaceholder ? media.thumbnailSrc : null;

  return (
    <button
      type="button"
      className={`clinical-search-row${active ? " clinical-search-row--active" : ""}`}
      onClick={onSelect}
    >
      <span className="clinical-search-row-thumb" aria-hidden>
        {thumb ? (
          <img src={thumb} alt="" loading="lazy" decoding="async" />
        ) : (
          <Icon size={16} strokeWidth={1.4} color={theme.text.faint} />
        )}
      </span>
      <span className="clinical-search-row-body">
        <span className="clinical-search-row-title">{result.title}</span>
        <span className="clinical-search-row-sub">{result.subtitle}</span>
        <span className="clinical-search-row-meta">
          <span
            className={`clinical-search-row-cat${result.isPathological ? " clinical-search-row-cat--path" : ""}`}
          >
            {result.category}
          </span>
          <span>{result.moduleLabel}</span>
          {result.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="clinical-search-row-tag">
              {tag}
            </span>
          ))}
        </span>
      </span>
    </button>
  );
}
