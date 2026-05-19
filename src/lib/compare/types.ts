/** Par de hallazgos para modo comparación (manifest media ids). */
export type MediaComparisonPair = {
  id: string;
  title: string;
  /** Izquierda — referencia */
  referenceMediaId: string;
  referenceLabel: string;
  /** Derecha — comparación */
  compareMediaId: string;
  compareLabel: string;
  module: "lung" | "fast" | "cardiac" | "vexus";
  protocolSlug: string;
  bibliographyHref: string;
  /** Preferir clip al reproducir (lado referencia / comparación) */
  referencePreferClip?: boolean;
  comparePreferClip?: boolean;
};
