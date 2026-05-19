import type { MediaComparisonPair } from "@/lib/compare/types";
import { LUNG_MEDIA_COMPARISONS } from "@/lib/compare/lung-comparisons";

const ALL: MediaComparisonPair[] = [...LUNG_MEDIA_COMPARISONS];

const BY_ID = new Map(ALL.map((p) => [p.id, p]));

export function getAllComparisonPairs(): MediaComparisonPair[] {
  return ALL;
}

export function getComparisonPairById(id: string): MediaComparisonPair | null {
  return BY_ID.get(id) ?? null;
}

/** Par que incluye este mediaId (referencia o comparación). */
export function findComparisonForMediaId(mediaId: string): MediaComparisonPair | null {
  return (
    ALL.find((p) => p.referenceMediaId === mediaId || p.compareMediaId === mediaId) ?? null
  );
}

export function getComparisonPairsForModule(module: string): MediaComparisonPair[] {
  return ALL.filter((p) => p.module === module);
}
