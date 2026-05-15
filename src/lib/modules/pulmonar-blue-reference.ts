/** Contenido de referencia — módulo gold standard Pulmón / BLUE / LUS */

export const PULMON_BLUE_SLUG = "pulmonar-blue";

export const pulmonHeader = {
  title: "Pulmón / BLUE / LUS",
  subtitle: "Disnea aguda, insuficiencia respiratoria y patrones pulmonares en UCI",
  topicChips: ["BLUE", "LUS", "PLAPS", "Neumotórax", "Consolidación"],
  atlasHref: "/imagenes",
};

export const operationalSummary = [
  "Identificar deslizamiento pleural.",
  "Diferenciar patrón A, patrón B y consolidación.",
  "Buscar PLAPS en sospecha de neumonía/derrame.",
  "Integrar patrón pulmonar con función cardíaca y contexto clínico.",
  "Usar LUS score para seguimiento de aireación si aplica.",
];

export type TechniqueCard = { title: string; body: string };

export const techniqueCards: TechniqueCard[] = [
  {
    title: "Puntos BLUE anteriores",
    body: "Anteriores superiores e inferiores bilaterales. Ventana intercostal en línea axilar anterior.",
  },
  {
    title: "Punto PLAPS",
    body: "Zona posterolateral (PLAPS): consolidación, derrame y neumonía posterior.",
  },
  {
    title: "Zonas LUS",
    body: "12 regiones torácicas estándar para score de aireación (anterior, lateral, posterior).",
  },
  {
    title: "Transductor recomendado",
    body: "Lineal o curva alta frecuencia. Presión ligera, gel abundante, preset pulmonar/vascular superficial.",
  },
  {
    title: "Errores de adquisición",
    body: "Presión excesiva, solo un hemitórax, mala ventana en obesidad sin buscar punto alternativo.",
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
    title: "Deslizamiento pleural",
    appearance: "Destello o movimiento en tiempo real en la línea pleural.",
    meaning: "Pleura parietal y visceral deslizan; descarta neumotórax en esa zona.",
    pitfall: "Confundir con pulso cardíaco o artefacto de respiración superficial.",
  },
  {
    title: "Líneas A",
    appearance: "Líneas horizontales de reverberación paralelas a la pleura.",
    meaning: "Aireación alveolar conservada (perfil A).",
    pitfall: "No confundir con líneas B cortas o artefactos de costilla.",
  },
  {
    title: "Patrón A bilateral",
    appearance: "Líneas A dominantes en puntos BLUE anteriores bilaterales.",
    meaning: "Sin edema intersticial difuso; orienta a TEP, asma/EPOC según clínica.",
    pitfall: "No excluir TEP sin buscar DVT si la clínica lo sugiere.",
  },
  {
    title: "Ausencia de líneas B patológicas",
    appearance: "Sin cometas verticales ≥3 por campo o coalescentes.",
    meaning: "Sin patrón B significativo en la zona explorada.",
    pitfall: "1–2 líneas B pueden ser normales en bases; valorar distribución y contexto.",
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
    title: "Líneas B difusas",
    appearance: "Cometas verticales múltiples, a menudo bilaterales.",
    clinical: "Edema intersticial / alveolar (EAP, SDRA, sobrecarga).",
    action: "Correlacionar con FE, VCI/VExUS y contexto hemodinámico.",
  },
  {
    title: "Perfil B bilateral",
    appearance: "Predominio de líneas B en puntos BLUE bilaterales.",
    clinical: "EAP cardiogénico probable si FE reducida o congestión.",
    action: "Diuréticos/VMNI según perfil; descartar sobrecarga iatrogénica.",
  },
  {
    title: "Perfil A con DVT",
    appearance: "Líneas A con deslizamiento; sin B difusas.",
    clinical: "TEP en contexto compatible (especificidad alta con DVT+).",
    action: "Eco venosa de MMII; anticoagulación si confirmado.",
  },
  {
    title: "Consolidación subpleural",
    appearance: "Hepatización del parénquima, broncograma aéreo dinámico.",
    clinical: "Neumonía o atelectasia consolidativa.",
    action: "PLAPS + antibióticos según foco; repetir US para evolución.",
  },
  {
    title: "Derrame pleural",
    appearance: "Colección anecoica dependiente, posible septaciones.",
    clinical: "Derrame pleural; diferencial trasudado/exudado.",
    action: "PLAPS, toracocentesis si indicado, correlación clínica.",
  },
  {
    title: "Neumotórax / lung point",
    appearance: "Ausencia de deslizamiento; lung point en zona de transición.",
    clinical: "Neumotórax (signo del punto de pulmón).",
    action: "Confirmar en múltiples puntos; drenaje si sintomático/instable.",
  },
  {
    title: "PLAPS positivo",
    appearance: "Consolidación o derrame en zona posterolateral.",
    clinical: "Neumonía posterior o derrame no visto anteriormente.",
    action: "No omitir PLAPS en sospecha infecciosa; tratar foco.",
  },
];

export type AlgorithmStep = { condition: string; arrow: string; outcome: string };

export const blueAlgorithm: AlgorithmStep[] = [
  {
    condition: "Perfil A + deslizamiento presente",
    arrow: "→",
    outcome: "EPOC/asma o TEP; buscar DVT",
  },
  {
    condition: "Perfil B bilateral",
    arrow: "→",
    outcome: "Edema pulmonar cardiogénico probable",
  },
  {
    condition: "Perfil A/B o B focal",
    arrow: "→",
    outcome: "Neumonía probable",
  },
  {
    condition: "Ausencia de deslizamiento + patrón A",
    arrow: "→",
    outcome: "Neumotórax; buscar lung point",
  },
  {
    condition: "Consolidación/derrame en PLAPS",
    arrow: "→",
    outcome: "Neumonía / derrame",
  },
];

export type GalleryItem = {
  id: string;
  title: string;
  isPathological: boolean;
  window: string;
  description: string;
  imageId?: string;
  placeholderVariant?: "pattern-a" | "blines" | "consolidation" | "effusion" | "lung-point";
};

export const pulmonaryGallery: GalleryItem[] = [
  {
    id: "g-a",
    title: "Patrón A",
    isPathological: false,
    window: "BLUE anterior",
    description: "Líneas A y deslizamiento pleural.",
    imageId: "img-05",
    placeholderVariant: "pattern-a",
  },
  {
    id: "g-b",
    title: "Líneas B",
    isPathological: true,
    window: "BLUE anterior",
    description: "Cometas verticales — perfil B.",
    imageId: "img-06",
    placeholderVariant: "blines",
  },
  {
    id: "g-cons",
    title: "Consolidación",
    isPathological: true,
    window: "PLAPS",
    description: "Hepatización con broncograma aéreo.",
    imageId: "img-07",
    placeholderVariant: "consolidation",
  },
  {
    id: "g-eff",
    title: "Derrame pleural",
    isPathological: true,
    window: "PLAPS / costofrénico",
    description: "Colección anecoica dependiente.",
    placeholderVariant: "effusion",
  },
  {
    id: "g-lp",
    title: "Lung point",
    isPathological: true,
    window: "Anterior / lateral",
    description: "Transición sliding presente / ausente.",
    placeholderVariant: "lung-point",
  },
];

export const videoPlaceholders = [
  { title: "Clip: deslizamiento pleural", duration: "~15 s" },
  { title: "Clip: líneas B", duration: "~15 s" },
  { title: "Clip: consolidación con broncograma aéreo", duration: "~20 s" },
  { title: "Clip: lung point", duration: "~15 s" },
];

export const frequentErrors = [
  "Confundir líneas Z con líneas B.",
  "Diagnosticar neumotórax sin confirmar ausencia real de sliding.",
  "Ignorar PLAPS en neumonía posterior.",
  "Interpretar B-lines sin integrar función cardíaca.",
  "Usar LUS score para diagnóstico etiológico aislado.",
];

export type BibliographyItem = { citation: string; note?: string };

export const bibliography: BibliographyItem[] = [
  {
    citation: "Lichtenstein DA. BLUE protocol.",
    note: "Lung ultrasound in the critically ill.",
  },
  {
    citation:
      "Volpicelli G, et al. International evidence-based recommendations for point-of-care lung ultrasound.",
    note: "Consenso ICC-LUS / nomenclatura.",
  },
  {
    citation: "Bouhemad B, et al. Lung ultrasound score and aeration monitoring.",
    note: "LUS score en ventilación mecánica.",
  },
  {
    citation: "Mayo PH, et al. POCUS in critical care — comprehensive reviews.",
    note: "Integración de ultrasonido en UCI.",
  },
];

export const CLIPS_SECTION_SUBTITLE = "Contenido audiovisual pendiente de carga";

export const pulmonSectionNav = [
  { id: "resumen", label: "Resumen" },
  { id: "tecnica", label: "Técnica" },
  { id: "normal", label: "Normal" },
  { id: "patologico", label: "Patológico" },
  { id: "blue", label: "BLUE" },
  { id: "atlas", label: "Atlas" },
  { id: "comparar", label: "Comparar" },
  { id: "errores", label: "Errores" },
  { id: "bibliografia", label: "Bibliografía" },
] as const;

export type CalculatorLink = {
  title: string;
  description: string;
  href?: string;
  /** Muestra “Próximamente” pero puede enlazar al hub */
  comingSoon?: boolean;
};

export const calculatorLinks: CalculatorLink[] = [
  {
    title: "LUS Score",
    description: "Aireación por regiones.",
    href: "/calculadoras",
    comingSoon: true,
  },
  {
    title: "Diafragma / weaning",
    description: "Excursión y destete.",
    href: "/modulos/weaning-diafragma?tab=resumen",
  },
  {
    title: "BLUE + VExUS",
    description: "Protocolo BLUE y congestión venosa.",
    href: "/herramientas/lus",
  },
];
