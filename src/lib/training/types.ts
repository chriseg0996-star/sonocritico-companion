import type { AtlasFilterModule } from "@/lib/media/atlas-filters";

/** Entrada del error trainer — máx. 3 bullets por sección. */
export type FrequentErrorTraining = {
  id: string;
  module: AtlasFilterModule;
  /** Título del error */
  error: string;
  /** Por qué ocurre (≤3) */
  why: [string, ...string[]];
  /** Cómo evitarlo (≤3) */
  avoid: [string, ...string[]];
  /** Hallazgo(s) vinculados en manifest */
  mediaIds: string[];
  /** Ejemplo visual principal */
  exampleMediaId?: string;
  protocolSlug?: string;
  protocolStepId?: string;
};
