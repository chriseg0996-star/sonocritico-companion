/**
 * Atlas FAST/eFAST — ventanas, hallazgos y comparaciones.
 * Media: public/media/fast/{category}/ o imageId mock.
 */
import type {
  AtlasComparisonPair,
  AtlasEntry,
  AtlasFilterDef,
  AtlasFilterId,
  AtlasMediaRef,
} from "@/lib/atlas/types";
import { matchesAtlasQuery } from "@/lib/atlas/search";

function fastRef(category: string): AtlasMediaRef {
  return { module: "fast", category };
}

export const FAST_ATLAS_SEARCH_PLACEHOLDER = "Buscar ventana, hallazgo o protocolo…";

export const fastAtlasFilters: AtlasFilterDef[] = [
  { id: "all", label: "Todos" },
  { id: "normal", label: "Normal" },
  { id: "pathology", label: "Patológico" },
  { id: "ruq", label: "RUQ" },
  { id: "luq", label: "LUQ" },
  { id: "pelvis", label: "Pelvis" },
  { id: "subxiphoid", label: "Subxifoidea" },
  { id: "pleura", label: "Pleura" },
  { id: "pericardio", label: "Pericardio" },
  { id: "efast", label: "eFAST" },
  { id: "clip", label: "Clips" },
];

export const fastAtlasEntries: AtlasEntry[] = [
  {
    id: "fast-ruq-normal",
    title: "RUQ sin líquido",
    category: "normal",
    isPathological: false,
    protocol: "FAST",
    window: "Morrison / RUQ",
    description: "Interfase hepatorrenal sin franja anecoica.",
    tags: ["RUQ", "Morrison", "normal", "FAST"],
    mediaType: "image",
    mediaRef: fastRef("ruq-normal"),
    overlayLabel: "RUQ · negativo",
    orientation: "Flanco derecho",
    placeholderVariant: "morrison",
    kind: "still",
    clinicalInterpretation: "Sin líquido libre en Morrison en esta exploración.",
    frequentError: "Confundir grasa perinefrítica con líquido.",
  },
  {
    id: "fast-ruq-fluid",
    title: "Líquido libre RUQ",
    category: "pathology",
    isPathological: true,
    protocol: "FAST",
    window: "Morrison / RUQ",
    description: "Franja anecoica en espacio hepatorrenal.",
    tags: ["RUQ", "Morrison", "líquido libre", "patológico", "FAST"],
    mediaType: "image",
    mediaRef: fastRef("ruq-fluid"),
    imageId: "img-01",
    overlayLabel: "RUQ · positivo",
    orientation: "Flanco derecho",
    placeholderVariant: "ruq-fluid",
    kind: "still",
    clinicalInterpretation: "Hemoperitoneo o líquido libre — activar protocolo trauma.",
    clinicalAction: "Inestable → cirugía; estable → TC.",
  },
  {
    id: "fast-luq-normal",
    title: "LUQ sin líquido",
    category: "normal",
    isPathological: false,
    protocol: "FAST",
    window: "Esplenorrenal / LUQ",
    description: "Interfase espleno-renal sin colección.",
    tags: ["LUQ", "esplenorrenal", "normal", "FAST"],
    mediaType: "image",
    mediaRef: fastRef("luq-normal"),
    kind: "still",
    clinicalInterpretation: "Sin líquido en LUQ en ventana obtenida.",
    frequentError: "No incluir polo esplénico en barrido.",
  },
  {
    id: "fast-luq-fluid",
    title: "Líquido libre LUQ",
    category: "pathology",
    isPathological: true,
    protocol: "FAST",
    window: "Esplenorrenal / LUQ",
    description: "Colección anecoica periesplénica o esplenorrenal.",
    tags: ["LUQ", "líquido libre", "patológico", "FAST"],
    mediaType: "image",
    mediaRef: fastRef("luq-fluid"),
    placeholderVariant: "luq-fluid",
    kind: "still",
    clinicalInterpretation: "Sangrado intraabdominal — correlacionar con RUQ y pelvis.",
    clinicalAction: "Protocolo trauma; repetir si duda.",
  },
  {
    id: "fast-pelvis-normal",
    title: "Pelvis sin líquido",
    category: "normal",
    isPathological: false,
    protocol: "FAST",
    window: "Pelvis suprapúbica",
    description: "Fondo de saco sin líquido dependiente.",
    tags: ["pelvis", "Douglas", "normal", "FAST"],
    mediaType: "image",
    mediaRef: fastRef("pelvis-normal"),
    kind: "still",
    clinicalInterpretation: "Sin líquido pélvico evidente.",
    frequentError: "Vejiga vacía — mala ventana pélvica.",
  },
  {
    id: "fast-pelvis-fluid",
    title: "Líquido pélvico",
    category: "pathology",
    isPathological: true,
    protocol: "FAST",
    window: "Pelvis suprapúbica",
    description: "Líquido en Douglas o espacio rectovesical.",
    tags: ["pelvis", "líquido libre", "patológico", "FAST"],
    mediaType: "image",
    mediaRef: fastRef("pelvis-fluid"),
    imageId: "img-04",
    placeholderVariant: "pelvis-fluid",
    kind: "still",
    clinicalInterpretation: "Hemoperitoneo pélvico o sangrado de órganos pélvicos.",
    clinicalAction: "TC si estable; cirugía si inestable + FAST+ global.",
  },
  {
    id: "fast-subxiphoid-normal",
    title: "Subxifoidea sin derrame",
    category: "normal",
    isPathological: false,
    protocol: "FAST",
    window: "Subxifoidea / cardíaca",
    description: "4 cámaras sin colección pericárdica.",
    tags: ["subxifoidea", "pericardio", "normal", "FAST"],
    mediaType: "image",
    mediaRef: fastRef("subxiphoid-normal"),
    imageId: "img-02",
    kind: "still",
    clinicalInterpretation: "Sin taponamiento ecográfico evidente.",
    frequentError: "Ventana subóptima en obesidad o herida.",
  },
  {
    id: "fast-pericardial",
    title: "Derrame pericárdico",
    category: "pathology",
    isPathological: true,
    protocol: "FAST",
    window: "Subxifoidea / cardíaca",
    description: "Anecoico circunferencial en saco pericárdico.",
    tags: ["pericardio", "taponamiento", "patológico", "FAST"],
    mediaType: "image",
    mediaRef: fastRef("pericardial-effusion"),
    placeholderVariant: "pericardial",
    kind: "still",
    clinicalInterpretation: "Taponamiento cardíaco hasta demostrar lo contrario en trauma.",
    clinicalAction: "Inestable → pericardiocentesis / cirugía urgente.",
  },
  {
    id: "fast-pleural-sliding",
    title: "Deslizamiento pleural",
    category: "normal",
    isPathological: false,
    protocol: "eFAST",
    window: "Pleura anterior",
    description: "Sliding pleural bilateral en eFAST.",
    tags: ["eFAST", "pleura", "sliding", "normal"],
    mediaType: "image",
    mediaRef: fastRef("pleural-sliding"),
    placeholderVariant: "pleural-sliding",
    kind: "still",
    clinicalInterpretation: "Descarta neumotórax en zona explorada.",
    frequentError: "Un solo punto sin contralateral.",
  },
  {
    id: "fast-pneumothorax",
    title: "Neumotórax (eFAST)",
    category: "pathology",
    isPathological: true,
    protocol: "eFAST",
    window: "Pleura anterior",
    description: "Ausencia de deslizamiento; código de barras en M.",
    tags: ["eFAST", "neumotórax", "patológico", "pleura"],
    mediaType: "image",
    mediaRef: fastRef("pneumothorax"),
    imageId: "img-03",
    placeholderVariant: "pneumothorax",
    kind: "still",
    clinicalInterpretation: "Neumotórax — manejo según estabilidad.",
    clinicalAction: "Inestable → descompresión con aguja / tubo.",
  },
  {
    id: "fast-hemothorax",
    title: "Hemotórax",
    category: "pathology",
    isPathological: true,
    protocol: "eFAST",
    window: "Pleura / basal",
    description: "Colección pleural dependiente post-trauma.",
    tags: ["hemotórax", "eFAST", "patológico", "pleura"],
    mediaType: "image",
    mediaRef: fastRef("hemothorax"),
    placeholderVariant: "hemothorax",
    kind: "still",
    clinicalInterpretation: "Sangre en cavidad pleural.",
    clinicalAction: "Drenaje torácico según volumen y clínica.",
  },
  {
    id: "clip-ruq-fluid",
    title: "Clip: líquido Morrison",
    category: "pathology",
    isPathological: true,
    protocol: "FAST",
    window: "Morrison / RUQ",
    description: "Barrido dinámico con líquido libre.",
    tags: ["RUQ", "clip", "líquido", "patológico"],
    mediaType: "gif",
    mediaRef: fastRef("ruq-fluid"),
    duration: "~12 s",
    kind: "clip",
    clinicalInterpretation: "Confirmar líquido en múltiples planos.",
    frequentError: "Artefacto de sombra acústica posterior.",
  },
  {
    id: "clip-pleural-sliding",
    title: "Clip: sliding pleural",
    category: "normal",
    isPathological: false,
    protocol: "eFAST",
    window: "Pleura anterior",
    description: "Deslizamiento en tiempo real.",
    tags: ["eFAST", "clip", "sliding", "normal"],
    mediaType: "gif",
    mediaRef: fastRef("pleural-sliding"),
    duration: "~10 s",
    kind: "clip",
    clinicalInterpretation: "Neumotórax descartado en región filmada.",
    frequentError: "Confundir con pulso cardíaco.",
  },
];

export const fastAtlasComparisons: AtlasComparisonPair[] = [
  {
    id: "cmp-ruq-neg-pos",
    title: "RUQ negativo vs positivo",
    subtitle: "Morrison sin líquido frente a hemoperitoneo",
    leftId: "fast-ruq-normal",
    rightId: "fast-ruq-fluid",
    insight: "Franja anecoica en interfase = líquido libre; grasa no es dependiente ni se mueve con cambios de posición.",
  },
  {
    id: "cmp-sliding-pnx",
    title: "Sliding vs neumotórax",
    subtitle: "eFAST pleural normal frente a ausencia de sliding",
    leftId: "fast-pleural-sliding",
    rightId: "fast-pneumothorax",
    insight: "Sliding presente descarta NTX en la zona; sin sliding = confirmar en M y contralateral.",
  },
  {
    id: "cmp-pericard",
    title: "Subxifoidea normal vs derrame",
    subtitle: "4 cámaras sin colección vs taponamiento",
    leftId: "fast-subxiphoid-normal",
    rightId: "fast-pericardial",
    insight: "Derrame = anecoico circunferencial pericárdico; no confundir con ventrículo dilatado solo.",
  },
];

export function getFastAtlasEntryById(id: string): AtlasEntry | undefined {
  return fastAtlasEntries.find((e) => e.id === id);
}

function matchesFilter(entry: AtlasEntry, filterId: AtlasFilterId): boolean {
  if (filterId === "all") return true;
  const blob = `${entry.title} ${entry.window} ${entry.protocol} ${entry.tags.join(" ")}`.toLowerCase();
  switch (filterId) {
    case "normal":
      return !entry.isPathological;
    case "pathology":
      return entry.isPathological;
    case "ruq":
      return blob.includes("ruq") || blob.includes("morrison");
    case "luq":
      return blob.includes("luq") || blob.includes("esplenorrenal");
    case "pelvis":
      return blob.includes("pelvis") || blob.includes("douglas");
    case "subxiphoid":
      return blob.includes("subxifo") || blob.includes("cardíac") || blob.includes("pericard");
    case "pleura":
    case "efast":
      return entry.protocol === "eFAST" || blob.includes("pleura") || blob.includes("efast");
    case "pericardio":
      return blob.includes("pericard") || blob.includes("taponamiento");
    case "hemotorax":
      return blob.includes("hemotórax") || blob.includes("hemotorax");
    case "clip":
      return entry.kind === "clip";
    default:
      return true;
  }
}

export function filterFastAtlasEntries(
  entries: AtlasEntry[],
  query: string,
  filterId: AtlasFilterId
): AtlasEntry[] {
  return entries.filter((entry) => matchesFilter(entry, filterId) && matchesAtlasQuery(entry, query));
}

export function buildFastAtlasNavList(filtered: AtlasEntry[], filterId: AtlasFilterId): AtlasEntry[] {
  if (filterId === "clip") return filtered.filter((e) => e.kind === "clip");
  const stills = filtered.filter((e) => e.kind === "still");
  const clips = filtered.filter((e) => e.kind === "clip");
  if (stills.length === 0 && clips.length === 0) return filtered;
  if (stills.length === 0) return clips;
  return [...stills, ...clips];
}
