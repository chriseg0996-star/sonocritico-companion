import type { MediaComparisonPair } from "@/lib/compare/types";
import { PULMON_BLUE_SLUG } from "@/lib/modules/pulmonar-blue-reference";

const BIB = `/modulos/${PULMON_BLUE_SLUG}#bibliografia`;

/** Comparaciones iniciales — Pulmón (manifest). */
export const LUNG_MEDIA_COMPARISONS: MediaComparisonPair[] = [
  {
    id: "lung-normal-vs-b-lines",
    title: "Normal ↔ Líneas B",
    referenceMediaId: "lung-a-lines",
    referenceLabel: "Normal",
    compareMediaId: "lung-b-lines",
    compareLabel: "Líneas B",
    module: "lung",
    protocolSlug: "blue",
    bibliographyHref: BIB,
  },
  {
    id: "lung-sliding-vs-lung-point",
    title: "Lung sliding ↔ Lung point",
    referenceMediaId: "lung-a-lines",
    referenceLabel: "Lung sliding",
    compareMediaId: "lung-lung-point",
    compareLabel: "Lung point",
    module: "lung",
    protocolSlug: "blue",
    bibliographyHref: BIB,
    referencePreferClip: true,
    comparePreferClip: true,
  },
  {
    id: "lung-plaps-vs-normal",
    title: "PLAPS ↔ Pulmón normal",
    referenceMediaId: "lung-a-lines",
    referenceLabel: "Pulmón normal",
    compareMediaId: "lung-plaps",
    compareLabel: "PLAPS",
    module: "lung",
    protocolSlug: "blue",
    bibliographyHref: BIB,
  },
  {
    id: "lung-sliding-vs-pneumothorax",
    title: "Deslizamiento ↔ Neumotórax",
    referenceMediaId: "lung-a-lines",
    referenceLabel: "Deslizamiento",
    compareMediaId: "lung-lung-point",
    compareLabel: "Neumotórax",
    module: "lung",
    protocolSlug: "blue",
    bibliographyHref: BIB,
    referencePreferClip: true,
    comparePreferClip: true,
  },
];
