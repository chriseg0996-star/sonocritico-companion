import type { ClinicalDomainFilter, ClinicalSearchResult } from "@/lib/search/types";
import { getMediaPreviewSrc } from "@/lib/media/atlas-filters";
import { mediaModuleLabel, type MediaSearchHit } from "@/lib/media/search-media";

export function mediaHitToClinicalResult(hit: MediaSearchHit): ClinicalSearchResult {
  const { item } = hit;
  const meta = item.metadata;
  const tags = [item.module, meta?.probe, meta?.plane, ...(meta?.diagnosis?.slice(0, 2) ?? [])].filter(
    (t): t is string => Boolean(t),
  );

  return {
    id: `media-${item.id}`,
    group: "hallazgo",
    title: item.title,
    subtitle: meta?.finding ?? item.category.replace(/-/g, " "),
    moduleLabel: mediaModuleLabel(item.module),
    moduleSlug:
      item.module === "lung"
        ? "pulmonar-blue"
        : item.module === "fast"
          ? "fast-efast"
          : item.module === "cardiac"
            ? "eco-critico"
            : item.module,
    category: "Atlas media",
    tags,
    href: `/biblioteca?media=${encodeURIComponent(item.id)}`,
    mediaId: item.id,
    mediaModule: item.module,
    mediaThumb: getMediaPreviewSrc(item),
    protocolSlug:
      item.module === "lung"
        ? "blue"
        : item.module === "fast"
          ? "fast"
          : item.module === "cardiac"
            ? "rush"
            : item.module === "vexus"
              ? "vexus"
              : undefined,
  };
}

export function filterMediaHitsByDomain(hits: MediaSearchHit[], domain: ClinicalDomainFilter): MediaSearchHit[] {
  if (domain === "all") return hits;
  if (domain === "pulmon") return hits.filter((h) => h.item.module === "lung");
  if (domain === "fast") return hits.filter((h) => h.item.module === "fast");
  if (domain === "cardio") return hits.filter((h) => h.item.module === "cardiac");
  if (domain === "vexus") return hits.filter((h) => h.item.module === "vexus");
  return hits;
}
