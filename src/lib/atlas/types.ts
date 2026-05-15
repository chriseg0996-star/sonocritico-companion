/** Tipos genéricos — atlas / viewer (reutilizable en cardio, FAST, etc.) */

export type AtlasMediaType = "image" | "video" | "gif";

export type AtlasCategory = "normal" | "pathology";

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
  /** Protocolo principal (BLUE / LUS / PLAPS) */
  protocol: AtlasProtocol;
  window: string;
  description: string;
  tags: string[];
  /** Referencia mock (img-05) o ruta en public cuando exista */
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
  /** Etiqueta overlay en viewer (ej. "Perfil B bilateral") */
  overlayLabel?: string;
  /** Orientación en pantalla ecógrafo */
  orientation?: string;
}

export interface AtlasComparisonPair {
  id: string;
  title: string;
  subtitle: string;
  leftId: string;
  rightId: string;
  /** Diferencia clave para lectura rápida en guardia */
  insight: string;
}
