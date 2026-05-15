/** Tipos genéricos — atlas / viewer (reutilizable en cardio, FAST, etc.) */

export type AtlasMediaType = "image" | "video" | "gif";

export type AtlasCategory = "normal" | "pathology";

export type AtlasModuleId = "lung" | "cardiac" | "fast" | "vascular" | "neuro" | "abdomen";

/** Carpeta bajo public/media/lung/ */
export type LungMediaCategory =
  | "a-lines"
  | "b-lines"
  | "consolidation"
  | "pleural-effusion"
  | "lung-point"
  | "plaps";

export interface AtlasMediaRef {
  module: AtlasModuleId;
  category: LungMediaCategory | string;
}

export type AtlasFilterId =
  | "all"
  | "normal"
  | "pathology"
  | "blue"
  | "lus"
  | "plaps"
  | "neumotorax"
  | "derrame"
  | "consolidacion"
  | "clip";

export interface AtlasFilterDef {
  id: AtlasFilterId;
  label: string;
}

export type AtlasProtocol = "BLUE" | "LUS" | "PLAPS";

export interface AtlasEntry {
  id: string;
  title: string;
  category: AtlasCategory;
  isPathological: boolean;
  protocol: AtlasProtocol;
  window: string;
  description: string;
  tags: string[];
  /** Resolución vía public/media/{module}/{category}/still|clip|thumb */
  mediaRef?: AtlasMediaRef;
  /** Fallback mock (img-05) si no hay mediaRef/manifest */
  imageId?: string;
  src?: string;
  thumbnailSrc?: string;
  posterSrc?: string;
  mediaType: AtlasMediaType;
  placeholderVariant?:
    | "pattern-a"
    | "blines"
    | "consolidation"
    | "effusion"
    | "lung-point"
    | "plaps"
    | "sliding";
  duration?: string;
  kind: "still" | "clip";
  clinicalInterpretation: string;
  frequentError?: string;
  clinicalAction?: string;
  overlayLabel?: string;
  orientation?: string;
}

export interface AtlasComparisonPair {
  id: string;
  title: string;
  subtitle: string;
  leftId: string;
  rightId: string;
  insight: string;
}
