/**
 * Atlas cardíaco — Eco básica / FOCUS.
 * Media: public/media/cardiac/{category}/
 */
import type {
  AtlasComparisonPair,
  AtlasEntry,
  AtlasFilterDef,
  AtlasFilterId,
  AtlasMediaRef,
} from "@/lib/atlas/types";
import { matchesAtlasQuery } from "@/lib/atlas/search";

function cardiacRef(category: string): AtlasMediaRef {
  return { module: "cardiac", category };
}

export const CARDIAC_ATLAS_SEARCH_PLACEHOLDER = "Buscar ventana, FEVI o hallazgo…";

export const cardiacAtlasFilters: AtlasFilterDef[] = [
  { id: "all", label: "Todos" },
  { id: "normal", label: "Normal" },
  { id: "pathology", label: "Patológico" },
  { id: "plax", label: "PLAX" },
  { id: "psax", label: "PSAX" },
  { id: "a4c", label: "A4C" },
  { id: "subxiphoid", label: "Subxifoidea" },
  { id: "ivc", label: "IVC" },
  { id: "pericardio", label: "Pericardio" },
  { id: "vd", label: "VD" },
  { id: "fevi", label: "FEVI" },
  { id: "clip", label: "Clips" },
];

export const cardiacAtlasEntries: AtlasEntry[] = [
  {
    id: "card-plax-normal",
    title: "PLAX — FEVI conservada",
    category: "normal",
    isPathological: false,
    protocol: "ECO",
    window: "PLAX",
    description: "Excursión mitral adecuada; sin derrame evidente.",
    tags: ["PLAX", "FEVI", "normal", "eco básica"],
    mediaType: "image",
    mediaRef: cardiacRef("plax-normal"),
    imageId: "img-13",
    placeholderVariant: "plax-normal",
    overlayLabel: "PLAX · FEVI OK",
    kind: "still",
    clinicalInterpretation: "Función sistólica visualmente conservada.",
    frequentError: "Sobreestimar FEVI en taquicardia.",
  },
  {
    id: "card-a4c-fevi-reduced",
    title: "A4C — FEVI reducida",
    category: "pathology",
    isPathological: true,
    protocol: "ECO",
    window: "A4C",
    description: "VI dilatado; excursión sistólica reducida.",
    tags: ["A4C", "FEVI", "patológico", "disfunción"],
    mediaType: "image",
    mediaRef: cardiacRef("a4c-fevi-reduced"),
    imageId: "img-14",
    placeholderVariant: "fevi-reduced",
    overlayLabel: "A4C · FE ↓",
    kind: "still",
    clinicalInterpretation: "Disfunción sistólica — shock cardiogénico si hipoperfusión.",
    clinicalAction: "Inotrópicos; optimizar precarga; cardiólogo.",
  },
  {
    id: "card-fevi-hyper",
    title: "FEVI hiperdinámica",
    category: "pathology",
    isPathological: true,
    protocol: "ECO",
    window: "A4C / PLAX",
    description: "Cavidades pequeñas; acortamiento exagerado.",
    tags: ["FEVI", "hiperdinámica", "sepsis", "patológico"],
    mediaType: "image",
    mediaRef: cardiacRef("fevi-hyperdynamic"),
    placeholderVariant: "fevi-hyper",
    kind: "still",
    clinicalInterpretation: "Alto gasto — sepsis, hipovolemia, anemia.",
    clinicalAction: "Tratar causa; volumen si indicado.",
  },
  {
    id: "card-psax-normal",
    title: "PSAX — nivel mitral",
    category: "normal",
    isPathological: false,
    protocol: "ECO",
    window: "PSAX",
    description: "Círculo ventricular; septo sin D-shape.",
    tags: ["PSAX", "normal", "septum"],
    mediaType: "image",
    mediaRef: cardiacRef("psax-mitral"),
    placeholderVariant: "psax-mitral",
    kind: "still",
    clinicalInterpretation: "Morfología VI y septum sin signos de sobrecarga VD.",
    frequentError: "Confundir artefacto con asimetría septal.",
  },
  {
    id: "card-subxiphoid-normal",
    title: "Subxifoidea — sin derrame",
    category: "normal",
    isPathological: false,
    protocol: "ECO",
    window: "Subxifoidea",
    description: "4 cámaras; pericardio sin colección.",
    tags: ["subxifoidea", "normal", "pericardio"],
    mediaType: "image",
    mediaRef: cardiacRef("subxiphoid-normal"),
    imageId: "img-02",
    kind: "still",
    clinicalInterpretation: "Sin derrame pericárdico en ventana obtenida.",
    frequentError: "Ventana subóptima en obesidad.",
  },
  {
    id: "card-pericardial",
    title: "Derrame pericárdico",
    category: "pathology",
    isPathological: true,
    protocol: "ECO",
    window: "PLAX",
    description: "Lámina anecoica posterior al VI.",
    tags: ["derrame", "pericardio", "PLAX", "patológico"],
    mediaType: "image",
    mediaRef: cardiacRef("pericardial-effusion"),
    imageId: "img-10",
    placeholderVariant: "pericardial-echo",
    kind: "still",
    clinicalInterpretation: "Derrame — buscar signos de taponamiento.",
    clinicalAction: "Subxifoidea; pericardiocentesis si taponamiento.",
  },
  {
    id: "card-tamponade",
    title: "Taponamiento",
    category: "pathology",
    isPathological: true,
    protocol: "ECO",
    window: "Subxifoidea / A4C",
    description: "Derrame + colapso diastólico AD/VD.",
    tags: ["taponamiento", "pericardio", "patológico"],
    mediaType: "image",
    mediaRef: cardiacRef("tamponade"),
    placeholderVariant: "tamponade",
    kind: "still",
    clinicalInterpretation: "Obstrucción del llenado — urgencia.",
    clinicalAction: "Pericardiocentesis; cirugía si indicado.",
  },
  {
    id: "card-rv-dilated",
    title: "VD dilatado",
    category: "pathology",
    isPathological: true,
    protocol: "ECO",
    window: "A4C",
    description: "VD > VI en diámetro basal; hipocinesia regional si TEP.",
    tags: ["VD", "TEP", "patológico", "A4C"],
    mediaType: "image",
    mediaRef: cardiacRef("rv-dilated"),
    placeholderVariant: "rv-dilated",
    kind: "still",
    clinicalInterpretation: "Sobrecarga VD — TEP, HP, infarto VD.",
    clinicalAction: "Eco pulmonar + DVT; anticoagulación si TEP.",
  },
  {
    id: "card-d-shape",
    title: "Septum D-shape",
    category: "pathology",
    isPathological: true,
    protocol: "ECO",
    window: "PSAX",
    description: "Septo aplanado hacia VI en sístole.",
    tags: ["PSAX", "septum", "VD", "patológico"],
    mediaType: "image",
    mediaRef: cardiacRef("septum-d-shape"),
    placeholderVariant: "d-shape",
    kind: "still",
    clinicalInterpretation: "Presión VD elevada — TEP o sobrecarga aguda.",
    clinicalAction: "No omitir en shock; correlacionar clínica.",
  },
  {
    id: "card-ivc-normal",
    title: "IVC con colapso",
    category: "normal",
    isPathological: false,
    protocol: "ECO",
    window: "IVC subcostal",
    description: "Colapso inspiratorio >50%; no plethórica.",
    tags: ["IVC", "normal", "volumen"],
    mediaType: "image",
    mediaRef: cardiacRef("ivc-normal"),
    placeholderVariant: "ivc-normal",
    kind: "still",
    clinicalInterpretation: "Sugiere baja PVD — integrar con clínica.",
    frequentError: "Decidir volumen solo por IVC.",
  },
  {
    id: "card-ivc-plethoric",
    title: "IVC plethórica",
    category: "pathology",
    isPathological: true,
    protocol: "ECO",
    window: "IVC subcostal",
    description: ">2.1 cm; colapso inspiratorio <50%.",
    tags: ["IVC", "congestión", "patológico"],
    mediaType: "image",
    mediaRef: cardiacRef("ivc-plethoric"),
    placeholderVariant: "ivc-plethoric",
    kind: "still",
    clinicalInterpretation: "Congestión venosa — VExUS y función VI.",
    clinicalAction: "No dar volumen por IVC sola.",
  },
  {
    id: "clip-plax-fevi",
    title: "Clip: excursión mitral",
    category: "normal",
    isPathological: false,
    protocol: "ECO",
    window: "PLAX",
    description: "Movimiento mitral en ciclo cardíaco.",
    tags: ["PLAX", "clip", "FEVI"],
    mediaType: "gif",
    mediaRef: cardiacRef("plax-normal"),
    duration: "~12 s",
    kind: "clip",
    clinicalInterpretation: "Valorar FEVI visual en tiempo real.",
    frequentError: "Un solo ciclo en arritmia.",
  },
  {
    id: "clip-pericardial",
    title: "Clip: derrame pericárdico",
    category: "pathology",
    isPathological: true,
    protocol: "ECO",
    window: "PLAX",
    description: "Separación pericárdica en diástole.",
    tags: ["pericardio", "clip", "patológico"],
    mediaType: "gif",
    mediaRef: cardiacRef("pericardial-effusion"),
    duration: "~10 s",
    kind: "clip",
    clinicalInterpretation: "Confirmar derrame en múltiples ventanas.",
    frequentError: "Confundir grasa epicárdica.",
  },
];

export const cardiacAtlasComparisons: AtlasComparisonPair[] = [
  {
    id: "cmp-plax-fevi",
    title: "FEVI conservada vs reducida",
    subtitle: "PLAX / A4C — estimación visual",
    leftId: "card-plax-normal",
    rightId: "card-a4c-fevi-reduced",
    insight: "Excursión mitral y tamaño VI guían eyeball FE; A4C confirma dilatación.",
  },
  {
    id: "cmp-pericard",
    title: "Sin derrame vs derrame",
    subtitle: "Pericardio en PLAX",
    leftId: "card-subxiphoid-normal",
    rightId: "card-pericardial",
    insight: "Lámina anecoica circunferencial = derrame; grasa epicárdica no es dependiente.",
  },
  {
    id: "cmp-ivc",
    title: "IVC colapsable vs plethórica",
    subtitle: "Subcostal — contexto hemodinámico",
    leftId: "card-ivc-normal",
    rightId: "card-ivc-plethoric",
    insight: "Colapso >50% sugiere baja PVD; plethórica integrar con VExUS, no volumen aislado.",
  },
];

export function getCardiacAtlasEntryById(id: string): AtlasEntry | undefined {
  return cardiacAtlasEntries.find((e) => e.id === id);
}

function matchesFilter(entry: AtlasEntry, filterId: AtlasFilterId): boolean {
  if (filterId === "all") return true;
  const blob = `${entry.title} ${entry.window} ${entry.protocol} ${entry.tags.join(" ")}`.toLowerCase();
  switch (filterId) {
    case "normal":
      return !entry.isPathological;
    case "pathology":
      return entry.isPathological;
    case "plax":
      return blob.includes("plax");
    case "psax":
      return blob.includes("psax");
    case "a4c":
      return blob.includes("a4c");
    case "subxiphoid":
      return blob.includes("subxifo");
    case "ivc":
      return blob.includes("ivc");
    case "pericardio":
    case "taponamiento":
      return blob.includes("pericard") || blob.includes("taponamiento") || blob.includes("derrame");
    case "vd":
      return blob.includes("vd") || blob.includes("septum") || blob.includes("d-shape");
    case "fevi":
      return blob.includes("fevi") || blob.includes("fe ") || blob.includes("disfunción") || blob.includes("hiperdinám");
    case "clip":
      return entry.kind === "clip";
    default:
      return true;
  }
}

export function filterCardiacAtlasEntries(
  entries: AtlasEntry[],
  query: string,
  filterId: AtlasFilterId
): AtlasEntry[] {
  return entries.filter((entry) => matchesFilter(entry, filterId) && matchesAtlasQuery(entry, query));
}

export function buildCardiacAtlasNavList(filtered: AtlasEntry[], filterId: AtlasFilterId): AtlasEntry[] {
  if (filterId === "clip") return filtered.filter((e) => e.kind === "clip");
  const stills = filtered.filter((e) => e.kind === "still");
  const clips = filtered.filter((e) => e.kind === "clip");
  if (stills.length === 0 && clips.length === 0) return filtered;
  if (stills.length === 0) return clips;
  return [...stills, ...clips];
}
