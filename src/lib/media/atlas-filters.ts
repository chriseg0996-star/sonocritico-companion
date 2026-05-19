export type AtlasFilterModule = "lung" | "fast" | "cardiac" | "vexus";

export const ATLAS_FILTER_OPTIONS: { id: AtlasFilterModule; label: string }[] = [
  { id: "lung", label: "Pulmón" },
  { id: "fast", label: "FAST" },
  { id: "cardiac", label: "Cardiac" },
  { id: "vexus", label: "VExUS" },
];

export const MEDIA_MODULE_LABELS: Record<AtlasFilterModule, string> = {
  lung: "Pulmón",
  fast: "FAST",
  cardiac: "Cardiac",
  vexus: "VExUS",
};

/** URL de preview: thumb → still. */
export function getMediaPreviewSrc(item: { thumb?: string; still?: string }): string | undefined {
  return item.thumb ?? item.still;
}
