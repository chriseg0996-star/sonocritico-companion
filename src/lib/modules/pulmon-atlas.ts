/**
 * Atlas pulmonar — hallazgos, clips y pares de comparación.
 * Media: imageId → mock-data; src en entry o pulmonAtlasMedia cuando exista en public/.
 */
import type { AtlasComparisonPair, AtlasEntry, AtlasFilterDef, AtlasFilterId } from "@/lib/atlas/types";
import { matchesAtlasQuery } from "@/lib/atlas/search";
import { lungAtlasMedia } from "@/lib/atlas/media-registry";

const M = lungAtlasMedia;

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
    protocol: "BLUE",
    window: "BLUE anterior",
    description: "Líneas A dominantes con deslizamiento pleural conservado.",
    tags: ["patrón A", "líneas A", "BLUE", "normal", "aireación"],
    mediaType: "image",
    src: M.stills.patternA,
    thumbnailSrc: M.stills.patternA,
    overlayLabel: "Perfil A · líneas A",
    orientation: "Anterior bilateral",
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
    protocol: "BLUE",
    window: "BLUE anterior",
    description: "Cometas verticales — perfil B, edema intersticial/alveolar.",
    tags: ["líneas B", "perfil B", "BLUE", "edema", "patológico"],
    mediaType: "image",
    src: M.stills.bLines,
    thumbnailSrc: M.stills.bLines,
    overlayLabel: "Perfil B · líneas B",
    orientation: "Anterior",
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
    protocol: "PLAPS",
    window: "PLAPS",
    description: "Hepatización subpleural con broncograma aéreo dinámico.",
    tags: ["consolidación", "PLAPS", "neumonía", "patológico"],
    mediaType: "image",
    src: M.stills.consolidation,
    thumbnailSrc: M.stills.consolidation,
    overlayLabel: "Consolidación subpleural",
    orientation: "PLAPS posterolateral",
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
    protocol: "LUS",
    window: "PLAPS / costofrénico",
    description: "Colección anecoica dependiente; valorar septaciones.",
    tags: ["derrame", "PLAPS", "LUS", "pleura", "patológico"],
    mediaType: "image",
    src: M.stills.effusion,
    thumbnailSrc: M.stills.effusion,
    overlayLabel: "Derrame pleural",
    orientation: "Costofrénico / PLAPS",
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
    protocol: "BLUE",
    window: "Anterior / lateral",
    description: "Transición entre sliding ausente y presente — signo del punto de pulmón.",
    tags: ["lung point", "neumotórax", "BLUE", "sliding", "patológico"],
    mediaType: "image",
    src: M.stills.lungPoint,
    thumbnailSrc: M.stills.lungPoint,
    overlayLabel: "Lung point",
    orientation: "Anterior / lateral",
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
    protocol: "PLAPS",
    window: "Zona PLAPS (posterolateral)",
    description: "Consolidación o derrame en región posterolateral no vista en BLUE anterior.",
    tags: ["PLAPS", "neumonía", "posterior", "consolidación", "patológico"],
    mediaType: "image",
    src: M.stills.plaps,
    thumbnailSrc: M.stills.plaps,
    overlayLabel: "PLAPS positivo",
    orientation: "Posterolateral",
    placeholderVariant: "plaps",
    kind: "still",
    clinicalInterpretation: "Neumonía posterior o derrame no detectado en exploración solo anterior.",
    frequentError: "Ignorar PLAPS en neumonía con exploración solo anterior.",
    clinicalAction: "Completar protocolo BLUE + PLAPS; tratar foco infeccioso.",
  },
  {
    id: "clip-sliding",
    title: "Deslizamiento pleural",
    category: "normal",
    isPathological: false,
    protocol: "BLUE",
    window: "BLUE / intercostal",
    description: "Destello pleural en tiempo real — hallazgo normal esencial.",
    tags: ["sliding", "deslizamiento", "BLUE", "normal", "clip"],
    mediaType: "gif",
    src: M.clips.sliding,
    thumbnailSrc: M.clips.sliding,
    overlayLabel: "Sliding pleural",
    orientation: "Intercostal",
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
    protocol: "BLUE",
    window: "BLUE anterior",
    description: "Cometas verticales móviles con la ventilación.",
    tags: ["líneas B", "perfil B", "clip", "patológico", "BLUE"],
    mediaType: "gif",
    src: M.clips.bLines,
    thumbnailSrc: M.clips.bLines,
    overlayLabel: "Líneas B dinámicas",
    orientation: "Anterior",
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
    protocol: "PLAPS",
    window: "PLAPS",
    description: "Broncograma aéreo dinámico dentro de área consolidada.",
    tags: ["consolidación", "broncograma", "PLAPS", "clip", "patológico"],
    mediaType: "gif",
    src: M.clips.consolidation,
    thumbnailSrc: M.clips.consolidation,
    overlayLabel: "Broncograma aéreo",
    orientation: "PLAPS",
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
    protocol: "BLUE",
    window: "Anterior / lateral",
    description: "Punto de transición sliding presente / ausente.",
    tags: ["lung point", "neumotórax", "clip", "patológico"],
    mediaType: "gif",
    src: M.clips.lungPoint,
    thumbnailSrc: M.clips.lungPoint,
    overlayLabel: "Lung point",
    orientation: "Lateral",
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
    insight: "A = líneas horizontales (aireación); B = cometas verticales (líquido/intersticio).",
  },
  {
    id: "cmp-sliding-vs-lp",
    title: "Sliding normal vs lung point",
    subtitle: "Deslizamiento conservado vs transición neumotórax",
    leftId: "clip-sliding",
    rightId: "atlas-lung-point",
    insight: "Sliding presente descarta NTX en la zona; lung point = borde entre sliding ±.",
  },
  {
    id: "cmp-cons-vs-eff",
    title: "Consolidación vs derrame",
    subtitle: "Hepatización vs colección anecoica dependiente",
    leftId: "atlas-consolidation",
    rightId: "atlas-effusion",
    insight: "Consolidación = tejido sólido/hepatización; derrame = líquido libre anecoico.",
  },
];

export function getAtlasEntryById(id: string): AtlasEntry | undefined {
  return pulmonAtlasEntries.find((e) => e.id === id);
}

function matchesFilter(entry: AtlasEntry, filterId: AtlasFilterId): boolean {
  if (filterId === "all") return true;
  const blob = `${entry.title} ${entry.window} ${entry.protocol} ${entry.tags.join(" ")}`.toLowerCase();
  switch (filterId) {
    case "normal":
      return !entry.isPathological;
    case "pathology":
      return entry.isPathological;
    case "blue":
      return entry.protocol === "BLUE" || blob.includes("blue");
    case "lus":
      return entry.protocol === "LUS" || blob.includes("lus");
    case "plaps":
      return entry.protocol === "PLAPS" || blob.includes("plaps");
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
  return entries.filter((entry) => matchesFilter(entry, filterId) && matchesAtlasQuery(entry, query));
}

/** Lista plana para navegación en viewer (stills + clips en orden clínico). */
export function buildAtlasNavList(filtered: AtlasEntry[], filterId: AtlasFilterId): AtlasEntry[] {
  if (filterId === "clip") return filtered.filter((e) => e.kind === "clip");
  const stills = filtered.filter((e) => e.kind === "still");
  const clips = filtered.filter((e) => e.kind === "clip");
  if (stills.length === 0 && clips.length === 0) return filtered;
  if (stills.length === 0) return clips;
  return [...stills, ...clips];
}
