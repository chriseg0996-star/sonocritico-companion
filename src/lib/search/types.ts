/** Búsqueda clínica global — tipos reutilizables */

export type ClinicalSearchGroup = "hallazgo" | "protocolo" | "clip" | "bibliografia" | "modulo";

export type ClinicalDomainFilter =
  | "all"
  | "pulmon"
  | "fast"
  | "cardio"
  | "vexus"
  | "normal"
  | "patologico";

export interface ClinicalSearchResult {
  id: string;
  group: ClinicalSearchGroup;
  title: string;
  subtitle: string;
  moduleLabel: string;
  moduleSlug?: string;
  category: string;
  tags: string[];
  href?: string;
  /** Abre viewer PACS (atlas pulmonar) */
  atlasEntryId?: string;
  protocolSlug?: string;
  isPathological?: boolean;
  thumbnailKey?: string;
}

export const CLINICAL_SEARCH_GROUPS: { id: ClinicalSearchGroup; label: string }[] = [
  { id: "hallazgo", label: "Hallazgos" },
  { id: "clip", label: "Clips" },
  { id: "protocolo", label: "Protocolos" },
  { id: "bibliografia", label: "Bibliografía" },
  { id: "modulo", label: "Módulos" },
];

export const CLINICAL_DOMAIN_FILTERS: { id: ClinicalDomainFilter; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "pulmon", label: "Pulmón" },
  { id: "fast", label: "FAST" },
  { id: "cardio", label: "Cardio" },
  { id: "vexus", label: "VExUS" },
  { id: "normal", label: "Normal" },
  { id: "patologico", label: "Patológico" },
];
