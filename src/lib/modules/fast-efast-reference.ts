/** Contenido de referencia — módulo gold standard FAST / eFAST */

export const FAST_EFAST_SLUG = "fast-efast";

export const fastHeader = {
  title: "FAST / eFAST",
  subtitle: "Trauma, líquido libre, pericardio y neumotórax",
  topicChips: ["RUQ", "LUQ", "Pelvis", "Subxifoidea", "Pleura"],
};

export const operationalSummary = [
  "Cuatro ventanas FAST: Morrison (RUQ), esplenorrenal (LUQ), pelvis y subxifoidea.",
  "eFAST agrega pleura anterior bilateral (deslizamiento / neumotórax).",
  "Inestable + FAST positivo → decisión quirúrgica / trauma team.",
  "FAST negativo no descarta lesión — sensibilidad depende del momento y operador.",
  "Repetir si sospecha alta o evolución clínica.",
];

export type TechniqueCard = { title: string; body: string };

export const techniqueCards: TechniqueCard[] = [
  {
    title: "Morrison / RUQ",
    body: "Hepatorrenal en flanco derecho. Sonda curva, marcador hacia cabeza. Barrido de interfase hepato-renal.",
  },
  {
    title: "Esplenorrenal / LUQ",
    body: "Interfase espleno-renal y polo esplénico. Incluir diafragma y punta esplénica.",
  },
  {
    title: "Pelvis",
    body: "Transversal suprapúbica. Douglas (mujer) o rectovesical (hombre). Vejiga media llena ayuda.",
  },
  {
    title: "Subxifoidea",
    body: "4 cámaras cardíacas. Buscar derrame pericárdico en saco pericárdico.",
  },
  {
    title: "Pleura anterior bilateral",
    body: "eFAST: deslizamiento pleural en línea axilar anterior. Modo M si duda de neumotórax.",
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
    title: "Sin líquido libre",
    appearance: "Interfases hepato-renal, esplenorrenal y pelvis sin franja anecoica.",
    meaning: "Sin hemoperitoneo evidente en ventanas exploradas.",
    pitfall: "FAST negativo temprano; grasa perinefrítica mal interpretada como líquido.",
  },
  {
    title: "Deslizamiento pleural presente",
    appearance: "Destello pleural en tiempo real; líneas A en eFAST.",
    meaning: "Descarta neumotórax en la zona explorada.",
    pitfall: "Confundir con pulso cardíaco; no explorar hemitórax contralateral.",
  },
  {
    title: "Sin derrame pericárdico",
    appearance: "Pericardio sin colección anecoica circunferencial en subxifoidea.",
    meaning: "Sin taponamiento ecográfico evidente.",
    pitfall: "Mala ventana subxifoidea en obesidad o heridas — buscar alternativa.",
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
    title: "Líquido libre RUQ",
    appearance: "Franja anecoica en espacio de Morrison.",
    clinical: "Hemoperitoneo o líquido libre en trauma.",
    action: "Inestable → cirugía; estable → TC y reevaluación.",
  },
  {
    title: "Líquido libre LUQ",
    appearance: "Colección en interfase esplenorrenal o periesplénica.",
    clinical: "Sangrado intraabdominal, esplenorrenal positivo.",
    action: "Correlacionar con RUQ/pelvis; activar protocolo trauma.",
  },
  {
    title: "Líquido pélvico",
    appearance: "Líquido en fondo de saco (Douglas / rectovesical).",
    clinical: "Sangrado pélvico o ruptura de órganos pélvicos.",
    action: "No omitir ventana pelvis; TC si estable.",
  },
  {
    title: "Derrame pericárdico",
    appearance: "Anecoico circunferencial en subxifoidea.",
    clinical: "Taponamiento cardíaco en trauma penetrante o contuso.",
    action: "Inestable → pericardiocentesis / esternotomía según contexto.",
  },
  {
    title: "Neumotórax",
    appearance: "Ausencia de deslizamiento; lung point si parcial.",
    clinical: "Neumotórax en eFAST — alta especificidad sin sliding.",
    action: "Inestable → descompresión; estable → RX/TC y seguimiento.",
  },
  {
    title: "Hemotórax",
    appearance: "Colección pleural dependiente, posible consolidación basal.",
    clinical: "Sangre en cavidad pleural post-trauma.",
    action: "Drenaje torácico según volumen y clínica respiratoria.",
  },
];

export type AlgorithmStep = { condition: string; arrow: string; outcome: string };

export const fastAlgorithm: AlgorithmStep[] = [
  {
    condition: "Inestable + FAST positivo",
    arrow: "→",
    outcome: "Cirugía / trauma team — no retrasar por TC",
  },
  {
    condition: "Estable + FAST positivo",
    arrow: "→",
    outcome: "TC abdominal / torácica según mecanismo",
  },
  {
    condition: "FAST negativo + alta sospecha",
    arrow: "→",
    outcome: "Repetir FAST seriado o TC",
  },
  {
    condition: "eFAST neumotórax positivo",
    arrow: "→",
    outcome: "Manejo pleural según estabilidad (aguja / tubo)",
  },
];

export const frequentErrors = [
  "No evaluar ventana pélvica.",
  "Confundir grasa perinefrítica o epiplón con líquido libre.",
  "FAST negativo en fase muy temprana post-trauma.",
  "No repetir estudio con evolución o sospecha persistente.",
  "Mala ventana subxifoidea — perder derrame pericárdico.",
];

export type BibliographyItem = { citation: string; note?: string };

export const bibliography: BibliographyItem[] = [
  {
    citation: "ATLS — Advanced Trauma Life Support. FAST / eFAST en trauma.",
    note: "Protocolo estándar de evaluación inicial.",
  },
  {
    citation: "ACEP — Clinical policy on ED ultrasound in trauma.",
    note: "Guías ACEP para POCUS en trauma.",
  },
  {
    citation: "Netherton S, et al. Systematic review: FAST for hemoperitoneum.",
    note: "Sensibilidad/especificidad según operador y timing.",
  },
  {
    citation: "Volpicelli G, et al. International recommendations for lung US in critically ill.",
    note: "eFAST pleural — sliding y neumotórax.",
  },
];

export const fastSectionNav = [
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
