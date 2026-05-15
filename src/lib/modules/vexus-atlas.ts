/**
 * Atlas VExUS — Doppler venoso abdominal.
 * Media: public/media/vexus/{category}/
 */
import type {
  AtlasComparisonPair,
  AtlasEntry,
  AtlasFilterDef,
  AtlasFilterId,
  AtlasMediaRef,
} from "@/lib/atlas/types";
import { matchesAtlasQuery } from "@/lib/atlas/search";

function vexusRef(category: string): AtlasMediaRef {
  return { module: "vexus", category };
}

export const VEXUS_ATLAS_SEARCH_PLACEHOLDER = "Buscar onda, vaso o grado VExUS…";

export const vexusAtlasFilters: AtlasFilterDef[] = [
  { id: "all", label: "Todos" },
  { id: "normal", label: "Normal" },
  { id: "pathology", label: "Patológico" },
  { id: "ivc", label: "IVC" },
  { id: "portal", label: "Portal" },
  { id: "hepatic", label: "Hepático" },
  { id: "renal", label: "Renal" },
  { id: "doppler", label: "Doppler" },
  { id: "clip", label: "Clips" },
];

export const vexusAtlasEntries: AtlasEntry[] = [
  {
    id: "vex-ivc-normal",
    title: "IVC no plethórica",
    category: "normal",
    isPathological: false,
    protocol: "VExUS",
    window: "IVC subcostal",
    description: "Colapso inspiratorio >50%; diámetro no fijo.",
    tags: ["IVC", "normal", "VExUS"],
    mediaType: "image",
    mediaRef: vexusRef("ivc-normal"),
    placeholderVariant: "ivc-normal",
    kind: "still",
    clinicalInterpretation: "Baja PVD — integrar con clínica.",
    frequentError: "Usar IVC sola para volumen.",
  },
  {
    id: "vex-ivc-plethoric",
    title: "IVC dilatada",
    category: "pathology",
    isPathological: true,
    protocol: "VExUS",
    window: "IVC subcostal",
    description: ">2.1 cm; colapso <50%.",
    tags: ["IVC", "plethórica", "patológico", "VExUS"],
    mediaType: "image",
    mediaRef: vexusRef("ivc-plethoric"),
    placeholderVariant: "ivc-plethoric",
    kind: "still",
    clinicalInterpretation: "Elevación de presiones de llenado — completar Doppler.",
    clinicalAction: "Portal, hepático y renal.",
  },
  {
    id: "vex-portal-normal",
    title: "Portal — PPV baja",
    category: "normal",
    isPathological: false,
    protocol: "VExUS",
    window: "Vena porta",
    description: "Pulsatilidad portal <30%.",
    tags: ["portal", "PPV", "normal", "Doppler"],
    mediaType: "image",
    mediaRef: vexusRef("portal-normal"),
    imageId: "img-12",
    placeholderVariant: "portal-normal",
    overlayLabel: "Portal · PPV <30%",
    kind: "still",
    clinicalInterpretation: "Baja congestión portal.",
    frequentError: "Ángulo Doppler oblicuo.",
  },
  {
    id: "vex-portal-pulsatile",
    title: "Portal pulsátil",
    category: "pathology",
    isPathological: true,
    protocol: "VExUS",
    window: "Vena porta",
    description: "PPV ≥30% — ondas arteriales en porta.",
    tags: ["portal", "PPV", "patológico", "Doppler"],
    mediaType: "image",
    mediaRef: vexusRef("portal-pulsatile"),
    placeholderVariant: "portal-pulsatile",
    kind: "still",
    clinicalInterpretation: "Congestión portal — grado VExUS intermedio.",
    clinicalAction: "Completar hepático y renal.",
  },
  {
    id: "vex-hepatic-s-normal",
    title: "Hepático — predominio S",
    category: "normal",
    isPathological: false,
    protocol: "VExUS",
    window: "Vena hepática",
    description: "Onda S > D; sin inversión.",
    tags: ["hepático", "S wave", "normal", "Doppler"],
    mediaType: "image",
    mediaRef: vexusRef("hepatic-s-normal"),
    imageId: "img-11",
    placeholderVariant: "hepatic-s-wave",
    kind: "still",
    clinicalInterpretation: "Retorno venoso hepático conservado.",
    frequentError: "Confundir con variación respiratoria.",
  },
  {
    id: "vex-hepatic-s-inverted",
    title: "Inversión S hepática",
    category: "pathology",
    isPathological: true,
    protocol: "VExUS",
    window: "Vena hepática",
    description: "Onda S invertida o abolida.",
    tags: ["hepático", "S invertida", "patológico", "Doppler"],
    mediaType: "image",
    mediaRef: vexusRef("hepatic-s-inversion"),
    placeholderVariant: "hepatic-s-inversion",
    kind: "still",
    clinicalInterpretation: "Congestión hepática significativa.",
    clinicalAction: "Decongestión; VExUS global.",
  },
  {
    id: "vex-renal-continuous",
    title: "Renal continuo",
    category: "normal",
    isPathological: false,
    protocol: "VExUS",
    window: "Doppler renal",
    description: "Flujo diastólico presente.",
    tags: ["renal", "continuo", "normal", "Doppler"],
    mediaType: "image",
    mediaRef: vexusRef("renal-continuous"),
    placeholderVariant: "renal-continuous",
    kind: "still",
    clinicalInterpretation: "Baja congestión renal.",
    frequentError: "PRF o ganancia inadecuados.",
  },
  {
    id: "vex-renal-discontinuous",
    title: "Renal discontinuo",
    category: "pathology",
    isPathological: true,
    protocol: "VExUS",
    window: "Doppler renal",
    description: "Diástole ausente o muy pulsátil.",
    tags: ["renal", "discontinuo", "patológico", "AKI", "Doppler"],
    mediaType: "image",
    mediaRef: vexusRef("renal-discontinuous"),
    placeholderVariant: "renal-discontinuous",
    kind: "still",
    clinicalInterpretation: "Congestión renal — AKI cardiorenal posible.",
    clinicalAction: "Decongestión si perfusión lo permite.",
  },
  {
    id: "vex-severe",
    title: "VExUS severo",
    category: "pathology",
    isPathological: true,
    protocol: "VExUS",
    window: "IVC + portal + hepático + renal",
    description: "Perfil congestivo en múltiples territorios.",
    tags: ["VExUS", "severo", "congestión", "patológico"],
    mediaType: "image",
    mediaRef: vexusRef("vexus-severe"),
    placeholderVariant: "vexus-severe",
    kind: "still",
    clinicalInterpretation: "Congestión venosa sistémica severa.",
    clinicalAction: "Decongestión agresiva según hemodinamia.",
  },
  {
    id: "clip-portal-wave",
    title: "Clip: onda portal",
    category: "pathology",
    isPathological: true,
    protocol: "VExUS",
    window: "Vena porta",
    description: "Pulsatilidad portal en tiempo real.",
    tags: ["portal", "clip", "Doppler", "patológico"],
    mediaType: "gif",
    mediaRef: vexusRef("portal-pulsatile"),
    duration: "~8 s",
    kind: "clip",
    clinicalInterpretation: "Cuantificar PPV en varios ciclos.",
    frequentError: "Un solo latido no representativo.",
  },
  {
    id: "clip-hepatic-wave",
    title: "Clip: flujo hepático",
    category: "normal",
    isPathological: false,
    protocol: "VExUS",
    window: "Vena hepática",
    description: "Trazado hepático con ondas S y D.",
    tags: ["hepático", "clip", "Doppler"],
    mediaType: "gif",
    mediaRef: vexusRef("hepatic-s-normal"),
    duration: "~8 s",
    kind: "clip",
    clinicalInterpretation: "Valorar morfología S/D en respiración.",
    frequentError: "Ángulo no alineado al flujo.",
  },
  {
    id: "clip-renal-wave",
    title: "Clip: Doppler renal",
    category: "pathology",
    isPathological: true,
    protocol: "VExUS",
    window: "Doppler renal",
    description: "Patrón diastólico discontinuo.",
    tags: ["renal", "clip", "Doppler", "patológico"],
    mediaType: "gif",
    mediaRef: vexusRef("renal-discontinuous"),
    duration: "~8 s",
    kind: "clip",
    clinicalInterpretation: "Correlacionar con creatinina y diuréticos.",
    frequentError: "Interpretar sin eco cardíaca.",
  },
];

export const vexusAtlasComparisons: AtlasComparisonPair[] = [
  {
    id: "cmp-portal",
    title: "Portal normal vs pulsátil",
    subtitle: "PPV <30% frente a ≥30%",
    leftId: "vex-portal-normal",
    rightId: "vex-portal-pulsatile",
    insight: "Pulsatilidad portal refleja transmisión de presión auricular derecha al lecho esplácnico.",
  },
  {
    id: "cmp-hepatic",
    title: "S normal vs S invertida",
    subtitle: "Vena hepática",
    leftId: "vex-hepatic-s-normal",
    rightId: "vex-hepatic-s-inverted",
    insight: "Inversión de S = congestión hepática; no confundir con solo variación respiratoria leve.",
  },
  {
    id: "cmp-renal",
    title: "Renal continuo vs discontinuo",
    subtitle: "Interlobar / arcuata",
    leftId: "vex-renal-continuous",
    rightId: "vex-renal-discontinuous",
    insight: "Discontinuidad diastólica orienta a congestión renal y posible AKI cardiorenal.",
  },
];

export function getVexusAtlasEntryById(id: string): AtlasEntry | undefined {
  return vexusAtlasEntries.find((e) => e.id === id);
}

function matchesFilter(entry: AtlasEntry, filterId: AtlasFilterId): boolean {
  if (filterId === "all") return true;
  const blob = `${entry.title} ${entry.window} ${entry.protocol} ${entry.tags.join(" ")}`.toLowerCase();
  switch (filterId) {
    case "normal":
      return !entry.isPathological;
    case "pathology":
      return entry.isPathological;
    case "ivc":
      return blob.includes("ivc");
    case "portal":
      return blob.includes("portal") || blob.includes("ppv");
    case "hepatic":
      return blob.includes("hepático") || blob.includes("hepatic") || blob.includes("s wave") || blob.includes("s invert");
    case "renal":
      return blob.includes("renal");
    case "doppler":
      return blob.includes("doppler") || entry.kind === "clip";
    case "clip":
      return entry.kind === "clip";
    default:
      return true;
  }
}

export function filterVexusAtlasEntries(
  entries: AtlasEntry[],
  query: string,
  filterId: AtlasFilterId
): AtlasEntry[] {
  return entries.filter((entry) => matchesFilter(entry, filterId) && matchesAtlasQuery(entry, query));
}

export function buildVexusAtlasNavList(filtered: AtlasEntry[], filterId: AtlasFilterId): AtlasEntry[] {
  if (filterId === "clip") return filtered.filter((e) => e.kind === "clip");
  const stills = filtered.filter((e) => e.kind === "still");
  const clips = filtered.filter((e) => e.kind === "clip");
  if (stills.length === 0 && clips.length === 0) return filtered;
  if (stills.length === 0) return clips;
  return [...stills, ...clips];
}
