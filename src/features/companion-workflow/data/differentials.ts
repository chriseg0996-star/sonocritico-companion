export type DiagnosticAlternative = {
  id: string;
  nombre: string;
  /** Término preseleccionado en Atlas (`/biblioteca?q=`). */
  searchTerm: string;
  hint: string;
};

export type DifferentialBundle = {
  alternativas: DiagnosticAlternative[];
  redFlags: string[];
  atlasModule: "lung" | "cardiac" | "vexus" | "fast";
  atlasQuery?: string;
};

const MAX_ALTERNATIVES = 3;

const BY_KEY: Record<string, DifferentialBundle> = {
  eap: {
    atlasModule: "lung",
    atlasQuery: "líneas B",
    alternativas: [
      {
        id: "alt-neumonia",
        nombre: "Neumonía",
        searchTerm: "consolidación",
        hint: "Busca consolidación focal o broncograma para descartarlo",
      },
      {
        id: "alt-tep",
        nombre: "TEP",
        searchTerm: "perfil A",
        hint: "Busca perfil A bilateral sin líneas B para descartarlo",
      },
      {
        id: "alt-derrame",
        nombre: "Derrame pleural",
        searchTerm: "derrame pleural",
        hint: "Busca separación pleural y líquido en bases",
      },
    ],
    redFlags: [
      "Si aparece consolidación posterior → considera Neumonía",
      "Si perfil A bilateral + DVT → reconsidera TEP",
      "Si sliding ausente unilateral → descarta neumotórax antes de EAP",
    ],
  },
  neumonia: {
    atlasModule: "lung",
    atlasQuery: "consolidación",
    alternativas: [
      {
        id: "alt-eap",
        nombre: "EAP",
        searchTerm: "líneas B",
        hint: "Busca líneas B bilaterales difusas para descartarlo",
      },
      {
        id: "alt-tep",
        nombre: "TEP",
        searchTerm: "perfil A",
        hint: "Busca perfil A sin consolidación para descartarlo",
      },
      {
        id: "alt-epoc",
        nombre: "EPOC / Asma",
        searchTerm: "líneas A",
        hint: "Busca líneas A con barrido pleural conservado",
      },
    ],
    redFlags: [
      "Si líneas B bilaterales + sliding → prioriza EAP",
      "Si consolidación ausente pero hipoxemia grave → reconsidera TEP",
      "Si derrame masivo → puede simular consolidación basal",
    ],
  },
  tep: {
    atlasModule: "lung",
    atlasQuery: "perfil A",
    alternativas: [
      {
        id: "alt-eap",
        nombre: "EAP",
        searchTerm: "líneas B",
        hint: "Busca perfil B difuso para descartarlo",
      },
      {
        id: "alt-neumonia",
        nombre: "Neumonía",
        searchTerm: "consolidación",
        hint: "Busca consolidación PLAPS para descartarlo",
      },
      {
        id: "alt-epoc",
        nombre: "EPOC / Asma",
        searchTerm: "líneas A",
        hint: "Busca hiperinsuflación sin DVT para descartarlo",
      },
    ],
    redFlags: [
      "Si líneas B predominantes → descarta TEP y orienta a EAP",
      "Si consolidación posterior → considera Neumonía",
      "Si derrame pleural masivo → puede elevar sospecha alternativa",
    ],
  },
  epoc: {
    atlasModule: "lung",
    atlasQuery: "líneas A",
    alternativas: [
      {
        id: "alt-tep",
        nombre: "TEP",
        searchTerm: "perfil A",
        hint: "Busca DVT y perfil A con clínica compatible",
      },
      {
        id: "alt-neumonia",
        nombre: "Neumonía",
        searchTerm: "consolidación",
        hint: "Busca consolidación focal para descartarlo",
      },
      {
        id: "alt-eap",
        nombre: "EAP",
        searchTerm: "líneas B",
        hint: "Busca líneas B bilaterales para descartarlo",
      },
    ],
    redFlags: [
      "Si DVT presente con perfil A → reconsidera TEP",
      "Si líneas B nuevas → no es solo obstructivo",
      "Si consolidación PLAPS → considera Neumonía",
    ],
  },
  "derrame-pleural": {
    atlasModule: "lung",
    atlasQuery: "derrame pleural",
    alternativas: [
      {
        id: "alt-eap",
        nombre: "EAP",
        searchTerm: "líneas B",
        hint: "Busca edema intersticial sin separación pleural masiva",
      },
      {
        id: "alt-neumonia",
        nombre: "Neumonía",
        searchTerm: "consolidación",
        hint: "Busca consolidación basal vs solo líquido",
      },
      {
        id: "alt-tep",
        nombre: "TEP",
        searchTerm: "perfil A",
        hint: "Busca perfil A con derrame reactivo pequeño",
      },
    ],
    redFlags: [
      "Si líneas B bilaterales sin derrame grande → prioriza EAP",
      "Si consolidación adyacente → neumonía complicada",
      "Si VI pequeño + derrame → evalúa taponamiento",
    ],
  },
  taponamiento: {
    atlasModule: "cardiac",
    atlasQuery: "derrame pericárdico",
    alternativas: [
      {
        id: "alt-eap",
        nombre: "EAP",
        searchTerm: "líneas B",
        hint: "Busca congestión pulmonar sin colapso diastólico severo",
      },
      {
        id: "alt-derrame",
        nombre: "Derrame pleural",
        searchTerm: "derrame pleural",
        hint: "Busca líquido pleural sin compromiso de cavidades cardíacas",
      },
      {
        id: "alt-tep",
        nombre: "TEP",
        searchTerm: "VD dilatado",
        hint: "Busca sobrecarga aguda de VD sin derrame pericárdico",
      },
    ],
    redFlags: [
      "Si derrame pericárdico con colapso diastólico → taponamiento",
      "Si VI hiperdinámico + líquido libre → shock distributivo / séptico",
      "Si solo líneas B → reconsidera EAP antes de pericardiocentesis",
    ],
  },
};

const RESULT_KEY_ALIASES: Record<string, string> = {
  "result-eap": "eap",
  "result-neumonia": "neumonia",
  "result-tep": "tep",
  "result-epoc": "epoc",
};

function normalizeResultadoKey(resultado: string): string {
  const trimmed = resultado.trim();
  if (RESULT_KEY_ALIASES[trimmed]) return RESULT_KEY_ALIASES[trimmed];

  const lower = trimmed.toLowerCase();
  if (lower.includes("eap") || lower.includes("edema pulmonar")) return "eap";
  if (lower.includes("neumon")) return "neumonia";
  if (lower.includes("tep") || lower.includes("tromboembolismo")) return "tep";
  if (lower.includes("epoc") || lower.includes("asma")) return "epoc";
  if (lower.includes("derrame pleural")) return "derrame-pleural";
  if (lower.includes("taponamiento") || lower.includes("pericárd")) return "taponamiento";

  return trimmed;
}

function bundleFor(resultado: string): DifferentialBundle | undefined {
  const key = normalizeResultadoKey(resultado);
  return BY_KEY[key];
}

/** Diagnósticos alternativos a considerar (máx. 3). */
export function getDifferentials(resultado: string): DiagnosticAlternative[] {
  const bundle = bundleFor(resultado);
  if (!bundle) return [];
  return bundle.alternativas.slice(0, MAX_ALTERNATIVES);
}

export function getDifferentialRedFlags(resultado: string): string[] {
  return bundleFor(resultado)?.redFlags ?? [];
}

export function getDifferentialAtlasContext(resultado: string): {
  module: DifferentialBundle["atlasModule"];
  query?: string;
} {
  const bundle = bundleFor(resultado);
  return {
    module: bundle?.atlasModule ?? "lung",
    query: bundle?.atlasQuery,
  };
}

export function buildAtlasSearchHref(
  term: string,
  module: DifferentialBundle["atlasModule"] = "lung",
): string {
  const params = new URLSearchParams();
  params.set("module", module);
  if (term.trim()) params.set("q", term.trim());
  return `/biblioteca?${params.toString()}`;
}
