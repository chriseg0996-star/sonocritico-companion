/** Contenido de referencia — módulo gold standard Eco básica */

export const ECO_CRITICO_SLUG = "eco-critico";

export const ecoHeader = {
  title: "Eco básica",
  subtitle: "Función sistólica, derrame, taponamiento y ventrículo derecho",
  topicChips: ["PLAX", "PSAX", "A4C", "Subxifoidea", "IVC"],
};

export const operationalSummary = [
  "Estimar FEVI visual (eyeball) en PLAX y A4C.",
  "Detectar derrame pericárdico en PLAX, A4C y subxifoidea.",
  "Buscar signos de taponamiento: derrame + colapso diastólico de cavidades derechas.",
  "Valorar VD y movimiento septal (D-shape en PSAX).",
  "Integrar IVC con contexto clínico — no usar sola para volumen.",
];

export type TechniqueCard = { title: string; body: string };

export const techniqueCards: TechniqueCard[] = [
  {
    title: "PLAX",
    body: "Paraesternal eje largo. VI, AI, raíz aórtica. Excursión mitral y fracción de acortamiento visual.",
  },
  {
    title: "PSAX",
    body: "Paraesternal eje corto a nivel mitral. Morfología VI, movimiento septal, cavidades derechas.",
  },
  {
    title: "A4C",
    body: "Apical 4 cámaras. VI, VD, aurículas. FEVI visual y tamaño relativo de cavidades.",
  },
  {
    title: "Subxifoidea",
    body: "4 cámaras con hígado como ventana. Derrame pericárdico y función VD en urgencias.",
  },
  {
    title: "IVC",
    body: "Subcostal 1–2 cm de unión atriocava. Diámetro y colapso inspiratorio (~18–21 mm referencia).",
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
    title: "FEVI conservada",
    appearance: "Excursión mitral y acortamiento radial adecuados; VI no dilatado.",
    meaning: "Función sistólica preservada en estimación visual.",
    pitfall: "Sobreestimar FEVI en taquicardia o hiperdinamia basal.",
  },
  {
    title: "VD no dilatado",
    appearance: "VD <2/3 del diámetro VI en A4C; septo convexo hacia VD en PSAX.",
    meaning: "Sin sobrecarga aguda de VD en la ventana obtenida.",
    pitfall: "Mala inclinación apical que agranda VD aparente.",
  },
  {
    title: "Sin derrame pericárdico",
    appearance: "Sin lámina anecoica circunferencial en PLAX/A4C/subxifoidea.",
    meaning: "Sin derrame ecográficamente evidente.",
    pitfall: "Confundir grasa epicárdica o pericárdica con derrame.",
  },
  {
    title: "IVC con variabilidad respiratoria",
    appearance: "Colapso inspiratorio >50% con diámetro no plethórico.",
    meaning: "Sugiere baja presión de llenado derecha — integrar con clínica.",
    pitfall: "Usar IVC aislada para decidir volumen sin contexto.",
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
    title: "FEVI reducida",
    appearance: "Excursión mitral disminuida; VI dilatado en A4C/PLAX.",
    clinical: "Shock cardiogénico probable si hipoperfusión.",
    action: "Inotrópicos, optimizar precarga, cardiólogo urgente.",
  },
  {
    title: "FEVI hiperdinámica",
    appearance: "Cavidades pequeñas, acortamiento marcado, kissing walls.",
    clinical: "Sepsis, hipovolemia, anemia — estado de alto gasto.",
    action: "Tratar causa; volumen si hipovolémico; no confundir con normal.",
  },
  {
    title: "Derrame pericárdico",
    appearance: "Lámina anecoica pericárdica; mayor en diástole posterior.",
    clinical: "Derrame — cuantificar si posible; buscar taponamiento.",
    action: "Subxifoidea + PLAX; pericardiocentesis si taponamiento.",
  },
  {
    title: "Taponamiento",
    appearance: "Derrame + colapso diastólico AD/VD; variación respiratoria marcada.",
    clinical: "Obstrucción del llenado — inestabilidad hemodinámica.",
    action: "Pericardiocentesis urgente; preparar cirugía si indicado.",
  },
  {
    title: "Dilatación VD",
    appearance: "VD dilatado; McConnell (hipocinesia ápice libre) si TEP.",
    clinical: "Sobrecarga VD — TEP, HP, RV infarct.",
    action: "Correlacionar con pulmonar/DVT; anticoagulación si TEP.",
  },
  {
    title: "Septum en D-shape",
    appearance: "Septo aplanado o curvado hacia VI en PSAX (sístole/diástole).",
    clinical: "Presión VD elevada — TEP o sobrecarga aguda.",
    action: "Eco pulmonar + clínica; no omitir en shock.",
  },
  {
    title: "IVC plethórica",
    appearance: "IVC >2.1 cm con colapso inspiratorio <50%.",
    clinical: "Congestión venosa — integrar VExUS y función VI.",
    action: "No usar sola para dar volumen; evaluar congestión.",
  },
];

export type AlgorithmStep = { condition: string; arrow: string; outcome: string };

export const ecoAlgorithm: AlgorithmStep[] = [
  {
    condition: "Shock + FEVI baja",
    arrow: "→",
    outcome: "Cardiogénico probable — inotrópicos, soporte",
  },
  {
    condition: "Shock + FEVI hiperdinámica",
    arrow: "→",
    outcome: "Distributivo / hipovolémico — buscar foco y volumen",
  },
  {
    condition: "Derrame + colapso cavidades derechas",
    arrow: "→",
    outcome: "Taponamiento — pericardiocentesis urgente",
  },
  {
    condition: "VD dilatado + septum D",
    arrow: "→",
    outcome: "TEP / sobrecarga VD — anticoagulación si confirmado",
  },
  {
    condition: "IVC plethórica",
    arrow: "→",
    outcome: "Integrar VExUS / congestión — no volumen aislado",
  },
];

export const frequentErrors = [
  "Sobreestimar FEVI en taquicardia o estado hiperdinámico.",
  "Usar IVC aislada para decisiones de volumen.",
  "Confundir grasa epicárdica con derrame pericárdico.",
  "No valorar VD y septum en shock o hipotensión.",
  "Mala ventana subxifoidea — perder derrame o taponamiento.",
];

export type BibliographyItem = { citation: string; note?: string };

export const bibliography: BibliographyItem[] = [
  {
    citation: "Mayo PH, et al. Critical care echocardiography.",
    note: "Integración de eco en UCI y urgencias.",
  },
  {
    citation: "ASE — Guidelines for performing a focused cardiac ultrasound examination.",
    note: "FOCUS / bedside cardiac US.",
  },
  {
    citation: "International consensus on POCUS in critical care (cardiac module).",
    note: "Protocolos y competencias mínimas.",
  },
  {
    citation: "Via G, Hussain A, et al. International evidence-based recommendations for focused cardiac ultrasound.",
    note: "Hallazgos y limitaciones en cabecera.",
  },
];

export const ecoSectionNav = [
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
