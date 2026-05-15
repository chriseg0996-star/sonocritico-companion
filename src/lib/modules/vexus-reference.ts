/** Contenido de referencia — módulo gold standard VExUS */

export const VEXUS_SLUG = "vexus";

export const vexusHeader = {
  title: "VExUS",
  subtitle: "Congestión venosa sistémica y Doppler venoso",
  topicChips: ["IVC", "Portal", "Hepático", "Renal"],
};

export const operationalSummary = [
  "Integrar IVC (diámetro y colapso) con Doppler venoso abdominal.",
  "Evaluar congestión venosa sistémica en falla cardíaca derecha / sobrecarga.",
  "Útil en AKI cardiorenal y dificultad para diuréticos.",
  "No usar IVC aislada para volumen ni congestión.",
  "Interpretar siempre con perfusión, lactato y contexto hemodinámico.",
];

export type TechniqueCard = { title: string; body: string };

export const techniqueCards: TechniqueCard[] = [
  {
    title: "IVC",
    body: "Subcostal 1–2 cm de la unión atriocava. Diámetro y colapso inspiratorio (~18–21 mm).",
  },
  {
    title: "Vena porta",
    body: "Intercostal derecho, eje portal. Pulsatilidad portal (PPV) con Doppler pulsado.",
  },
  {
    title: "Vena hepática",
    body: "Flujo hepático: ondas S, D y A. Inversión de S sugiere congestión significativa.",
  },
  {
    title: "Doppler renal",
    body: "Interlobares o arcuatas. Patrón continuo vs diastólico discontinuo (ondas E/A).",
  },
];

export type NormalFinding = {
  title: string;
  appearance: string;
  meaning: string;
  pitfall: string;
};

export const normalFindings: NormalFinding[] = [
  {
    title: "Portal pulsatility mínima",
    appearance: "PPV <30% en vena porta.",
    meaning: "Baja congestión venosa portal.",
    pitfall: "Mala ventana o ángulo Doppler oblicuo.",
  },
  {
    title: "Flujo hepático predominio S",
    appearance: "Onda S > D; sin inversión sistólica.",
    meaning: "Retorno venoso hepático conservado.",
    pitfall: "Confundir con variación respiratoria leve.",
  },
  {
    title: "Doppler renal continuo",
    appearance: "Flujo diastólico presente sin paradas.",
    meaning: "Buena perfusión renal — baja congestión.",
    pitfall: "Ganancia o PRF inadecuados.",
  },
  {
    title: "IVC no plethórica",
    appearance: "Colapso inspiratorio >50%; diámetro no fijo >2.1 cm.",
    meaning: "Baja presión de llenado derecha en contexto compatible.",
    pitfall: "Decidir volumen solo con IVC.",
  },
];

export type PathologyFinding = {
  title: string;
  appearance: string;
  clinical: string;
  action: string;
};

export const pathologyFindings: PathologyFinding[] = [
  {
    title: "Portal pulsátil",
    appearance: "PPV ≥30% — ondas arteriales en porta.",
    clinical: "Congestión venosa portal — grado VExUS intermedio.",
    action: "Completar hepático y renal; integrar con función VI.",
  },
  {
    title: "Inversión S hepática",
    appearance: "Onda S invertida o abolida en vena hepática.",
    clinical: "Congestión hepática significativa.",
    action: "Decongestión; correlacionar con VExUS global.",
  },
  {
    title: "Doppler renal discontinuo",
    appearance: "Flujo diastólico ausente o muy pulsátil.",
    clinical: "Congestión renal — AKI cardiorenal posible.",
    action: "Optimizar precarga; diuréticos si perfusión permite.",
  },
  {
    title: "IVC dilatada",
    appearance: ">2.1 cm con colapso <50%.",
    clinical: "Elevación de presiones de llenado derechas.",
    action: "No volumen; completar Doppler VExUS.",
  },
  {
    title: "VExUS severo",
    appearance: "PPV alta + S invertida + renal discontinuo.",
    clinical: "Congestión venosa sistémica severa.",
    action: "Decongestión agresiva si hemodinámicamente viable.",
  },
];

export type AlgorithmStep = { condition: string; arrow: string; outcome: string };

export const vexusAlgorithm: AlgorithmStep[] = [
  {
    condition: "Congestión + AKI",
    arrow: "→",
    outcome: "Considerar decongestión y optimizar función cardíaca",
  },
  {
    condition: "VExUS severo (portal + hepático + renal)",
    arrow: "→",
    outcome: "Sobrecarga venosa significativa — priorizar diuréticos/ultrafiltración",
  },
  {
    condition: "IVC plethórica sin Doppler completo",
    arrow: "→",
    outcome: "Completar porta, hepático y renal antes de decidir",
  },
  {
    condition: "Perfil mixto / duda",
    arrow: "→",
    outcome: "Integrar perfusión, eco cardíaca y respuesta a prueba terapéutica",
  },
];

export const frequentErrors = [
  "Usar solo IVC para volumen o congestión.",
  "Ángulo Doppler incorrecto (no alineado al flujo).",
  "Interpretar sin contexto clínico ni perfusión.",
  "Confundir variaciones respiratorias con patología.",
];

export type BibliographyItem = { citation: string; note?: string };

export const bibliography: BibliographyItem[] = [
  {
    citation: "Beaubien-Souligny W, et al. VExUS — Venous Excess Ultrasound grading system.",
    note: "Sistema original VExUS y grados de congestión.",
  },
  {
    citation: "Doppler venoso en cuidados críticos — revisiones de congestión sistémica.",
    note: "Portal, hepático y renal en UCI.",
  },
  {
    citation: "Congestión venosa y lesión renal aguda — enfoque cardiorenal.",
    note: "AKI y decongestión guiada por US.",
  },
  {
    citation: "Mayo PH, POCUS in critical care — venous congestion module.",
    note: "Integración con hemodinamia en cabecera.",
  },
];

export const vexusSectionNav = [
  { id: "resumen", label: "Resumen" },
  { id: "tecnica", label: "Técnica" },
  { id: "normal", label: "Normal" },
  { id: "patologico", label: "Patológico" },
  { id: "algoritmo", label: "Algoritmo" },
  { id: "atlas", label: "Atlas" },
  { id: "comparar", label: "Comparar" },
  { id: "errores", label: "Errores" },
  { id: "bibliografia", label: "Bibliografía" },
] as const;
