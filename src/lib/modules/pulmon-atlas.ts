/**
 * Atlas pulmonar — hallazgos, clips y pares de comparación.
 * Media: imageId → mock-data; src opcional para jpg/png/gif/mp4/webm en public/.
 */
import type { AtlasComparisonPair, AtlasEntry, AtlasFilterDef, AtlasFilterId } from "@/lib/atlas/types";

export const PULMON_ATLAS_SEARCH_PLACEHOLDER = "Buscar hallazgo, ventana o protocolo…";

export const pulmonAtlasFilters: AtlasFilterDef[] = [
  { id: "all", label: "Todos" },
  { id: "normal", label: "Normal" },
  { id: "pathology", label: "Patológico" },
  { id: "blue", label: "BLUE" },
  { id: "lus", label: "LUS" },
  { id: "plaps", label: "PLAPS" },
  { id: "neumotorax", label: "Neumotórax" },
  { id: "derrame", label: "Derrame" },
  { id: "consolidacion", label: "Consolidación" },
  { id: "clip", label: "Clips" },
];

export const pulmonAtlasEntries: AtlasEntry[] = [
  {
    id: "atlas-pattern-a",
    title: "Patrón A",
    category: "normal",
    isPathological: false,
    window: "BLUE anterior",
    description: "Líneas A dominantes con deslizamiento pleural conservado.",
    tags: ["patrón A", "líneas A", "BLUE", "normal", "aireación"],
    mediaType: "image",
    imageId: "img-05",
    placeholderVariant: "pattern-a",
    kind: "still",
    clinicalInterpretation:
      "Aireación alveolar conservada. Orienta a TEP, asma/EPOC según clínica — no excluye patología sin contexto.",
    frequentError: "Confundir artefactos de costilla con líneas A.",
  },
  {
    id: "atlas-b-lines",
    title: "Líneas B",
    category: "pathology",
    isPathological: true,
    window: "BLUE anterior",
    description: "Cometas verticales — perfil B, edema intersticial/alveolar.",
    tags: ["líneas B", "perfil B", "BLUE", "edema", "patológico"],
    mediaType: "image",
    imageId: "img-06",
    placeholderVariant: "blines",
    kind: "still",
    clinicalInterpretation:
      "Edema intersticial o alveolar. Correlacionar con función cardíaca (FE, VExUS) y contexto hemodinámico.",
    frequentError: "Confundir líneas Z con líneas B.",
    clinicalAction: "Integrar con eco cardíaca; diuréticos/VMNI si EAP cardiogénico.",
  },
  {
    id: "atlas-consolidation",
    title: "Consolidación",
    category: "pathology",
    isPathological: true,
    window: "PLAPS",
    description: "Hepatización subpleural con broncograma aéreo dinámico.",
    tags: ["consolidación", "PLAPS", "neumonía", "BLUE", "patológico"],
    mediaType: "image",
    imageId: "img-07",
    placeholderVariant: "consolidation",
    kind: "still",
    clinicalInterpretation: "Neumonía o atelectasia consolidativa en zona posterolateral.",
    frequentError: "No explorar PLAPS en sospecha infecciosa posterior.",
    clinicalAction: "Antibióticos según foco; repetir US para evolución.",
  },
  {
    id: "atlas-effusion",
    title: "Derrame pleural",
    category: "pathology",
    isPathological: true,
    window: "PLAPS / costofrénico",
    description: "Colección anecoica dependiente; valorar septaciones.",
    tags: ["derrame", "PLAPS", "LUS", "pleura", "patológico"],
    mediaType: "image",
    placeholderVariant: "effusion",
    kind: "still",
    clinicalInterpretation: "Derrame pleural — trasudado vs exudado según contexto.",
    frequentError: "Confundir con consolidación basal sin barrido.",
    clinicalAction: "Toracocentesis si indicado; correlación clínica y analítica.",
  },
  {
    id: "atlas-lung-point",
    title: "Lung point",
    category: "pathology",
    isPathological: true,
    window: "Anterior / lateral",
    description: "Transición entre sliding ausente y presente — signo del punto de pulmón.",
    tags: ["lung point", "neumotórax", "BLUE", "sliding", "patológico"],
    mediaType: "image",
    placeholderVariant: "lung-point",
    kind: "still",
    clinicalInterpretation: "Neumotórax con alta especificidad cuando se confirma en varios puntos.",
    frequentError: "Diagnosticar neumotórax sin confirmar ausencia real de sliding.",
    clinicalAction: "Confirmar en múltiples zonas; drenaje si sintomático o inestable.",
  },
  {
    id: "atlas-plaps",
    title: "PLAPS positivo",
    category: "pathology",
    isPathological: true,
    window: "Zona PLAPS (posterolateral)",
    description: "Consolidación o derrame en región posterolateral no vista en BLUE anterior.",
    tags: ["PLAPS", "neumonía", "posterior", "consolidación", "patológico"],
    mediaType: "image",
    placeholderVariant: "plaps",
    kind: "still",
    clinicalInterpretation: "Neumonía posterior o derrame no detectado en exploración anterior.",
    frequentError: "Ignorar PLAPS en neumonía con exploración solo anterior.",
    clinicalAction: "Completar protocolo BLUE + PLAPS; tratar foco infeccioso.",
  },
  {
    id: "clip-sliding",
    title: "Deslizamiento pleural",
    category: "normal",
    isPathological: false,
    window: "BLUE / intercostal",
    description: "Destello pleural en tiempo real — hallazgo normal esencial.",
    tags: ["sliding", "deslizamiento", "BLUE", "normal", "clip"],
    mediaType: "video",
    placeholderVariant: "sliding",
    duration: "~15 s",
    kind: "clip",
    clinicalInterpretation: "Pleuras deslizantes; descarta neumotórax en la zona explorada.",
    frequentError: "Confundir con pulso cardíaco o movimiento superficial.",
  },
  {
    id: "clip-b-lines",
    title: "Líneas B (clip)",
    category: "pathology",
    isPathological: true,
    window: "BLUE anterior",
    description: "Cometas verticales móviles con la ventilación.",
    tags: ["líneas B", "perfil B", "clip", "patológico", "BLUE"],
    mediaType: "video",
    placeholderVariant: "blines",
    duration: "~15 s",
    kind: "clip",
    clinicalInterpretation: "Patrón B — edema o inflamación intersticial según contexto.",
    frequentError: "Interpretar B-lines sin integrar función cardíaca.",
  },
  {
    id: "clip-consolidation",
    title: "Consolidación con broncograma",
    category: "pathology",
    isPathological: true,
    window: "PLAPS",
    description: "Broncograma aéreo dinámico dentro de área consolidada.",
    tags: ["consolidación", "broncograma", "PLAPS", "clip", "patológico"],
    mediaType: "video",
    placeholderVariant: "consolidation",
    duration: "~20 s",
    kind: "clip",
    clinicalInterpretation: "Neumonía consolidativa; diferenciar de atelectasia según dinámica y clínica.",
    frequentError: "No distinguir atelectasia obstructiva de neumonía.",
    clinicalAction: "Antibióticos y fisioterapia según etiología.",
  },
  {
    id: "clip-lung-point",
    title: "Lung point (clip)",
    category: "pathology",
    isPathological: true,
    window: "Anterior / lateral",
    description: "Punto de transición sliding presente / ausente.",
    tags: ["lung point", "neumotórax", "clip", "patológico"],
    mediaType: "video",
    placeholderVariant: "lung-point",
    duration: "~15 s",
    kind: "clip",
    clinicalInterpretation: "Signo del punto de pulmón — neumotórax.",
    frequentError: "Un solo punto sin confirmación bilateral/regional.",
    clinicalAction: "Drenaje según gravedad clínica y tamaño.",
  },
];

export const pulmonAtlasComparisons: AtlasComparisonPair[] = [
  {
    id: "cmp-a-vs-b",
    title: "Patrón A vs líneas B",
    subtitle: "Perfil A (normal) frente a perfil B (edema/intersticial)",
    leftId: "atlas-pattern-a",
    rightId: "atlas-b-lines",
  },
  {
    id: "cmp-sliding-vs-lp",
    title: "Sliding normal vs lung point",
    subtitle: "Deslizamiento conservado vs transición neumotórax",
    leftId: "clip-sliding",
    rightId: "atlas-lung-point",
  },
  {
    id: "cmp-cons-vs-eff",
    title: "Consolidación vs derrame",
    subtitle: "Hepatización vs colección anecoica dependiente",
    leftId: "atlas-consolidation",
    rightId: "atlas-effusion",
  },
];

export function getAtlasEntryById(id: string): AtlasEntry | undefined {
  return pulmonAtlasEntries.find((e) => e.id === id);
}

function matchesFilter(entry: AtlasEntry, filterId: AtlasFilterId): boolean {
  if (filterId === "all") return true;
  const blob = `${entry.title} ${entry.window} ${entry.tags.join(" ")}`.toLowerCase();
  switch (filterId) {
    case "normal":
      return !entry.isPathological;
    case "pathology":
      return entry.isPathological;
    case "blue":
      return blob.includes("blue");
    case "lus":
      return blob.includes("lus");
    case "plaps":
      return blob.includes("plaps");
    case "neumotorax":
      return blob.includes("neumotórax") || blob.includes("neumotorax") || blob.includes("lung point");
    case "derrame":
      return blob.includes("derrame");
    case "consolidacion":
      return blob.includes("consolid");
    case "clip":
      return entry.kind === "clip";
    default:
      return true;
  }
}

export function filterAtlasEntries(
  entries: AtlasEntry[],
  query: string,
  filterId: AtlasFilterId
): AtlasEntry[] {
  const q = query.trim().toLowerCase();
  return entries.filter((entry) => {
    if (!matchesFilter(entry, filterId)) return false;
    if (!q) return true;
    const haystack = [
      entry.title,
      entry.window,
      entry.description,
      entry.clinicalInterpretation,
      ...entry.tags,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
