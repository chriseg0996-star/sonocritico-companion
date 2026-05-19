import type {
  Protocol, ClinicalCase, EchoImage, QuizQuestion,
  Course, Student, User
} from "@/types";

// ─── PROTOCOLS ────────────────────────────────────────────────────────────────

export const protocols: Protocol[] = [
  {
    slug: "fast",
    title: "FAST / eFAST",
    indication: "Trauma · Líquido libre · Neumotórax",
    icon: "Zap",
    category: "abdomen",
    color: "#8FA7C4",
    estimatedMinutes: 15,
    difficulty: 1,
    imageIds: ["img-01", "img-02", "img-03", "img-04"],
    quizIds: ["q-01", "q-02", "q-03"],
    checklistItems: [
      { id: "fast-1", label: "Ventana pericárdica subxifoidea obtenida", required: true },
      { id: "fast-2", label: "RUQ (Morrison) evaluado: hepático-renal", required: true },
      { id: "fast-3", label: "LUQ (esplenorenal) evaluado", required: true },
      { id: "fast-4", label: "Ventana pelviana (Douglas/rectovesical) evaluada", required: true },
      { id: "fast-5", label: "[eFAST] Deslizamiento pleural bilateral evaluado", required: true },
      { id: "fast-6", label: "[eFAST] Neumotórax descartado o confirmado", required: true },
      { id: "fast-7", label: "Hallazgos reportados al equipo", required: true },
    ],
    flowNodes: [
      { id: "n1", label: "¿Trauma significativo?", type: "question", children: ["n2"], description: "Evalúa mecanismo: contuso o penetrante. FAST indicado en inestabilidad hemodinámica.", x: 300, y: 40 },
      { id: "n2", label: "Iniciar FAST", type: "action", clinicalAction: "4 ventanas estándar + pleuras si eFAST", children: ["n3", "n4"], x: 300, y: 140 },
      { id: "n3", label: "Líquido libre (+)", type: "finding", imageId: "img-01", description: "Imagen hipoecoica en interfases anatómicas", clinicalAction: "Activar protocolo de trauma. Considerar FAST seriado.", children: ["n5"], x: 150, y: 240 },
      { id: "n4", label: "FAST negativo", type: "finding", description: "Ausencia de líquido libre en las 4 ventanas", clinicalAction: "Si alta sospecha clínica: FAST seriado o TC.", children: ["n6"], x: 450, y: 240 },
      { id: "n5", label: "Cirugía urgente / TAC", type: "endpoint", clinicalAction: "Inestable + FAST+ = cirugía directa sin TC", children: [], x: 150, y: 340 },
      { id: "n6", label: "Observación / TC", type: "endpoint", clinicalAction: "Estable + FAST- = TC abdominal si persiste sospecha", children: [], x: 450, y: 340 },
    ],
  },
  {
    slug: "blue",
    title: "BLUE Protocol",
    indication: "Disnea aguda · IRA · Diferencial pulmonar",
    icon: "Wind",
    category: "pulmonar",
    color: "#8FA7C4",
    estimatedMinutes: 20,
    difficulty: 2,
    imageIds: ["img-05", "img-06", "img-07"],
    quizIds: ["q-04", "q-05"],
    checklistItems: [
      { id: "blue-1", label: "Puntos BLUE anteriores bilaterales evaluados", required: true },
      { id: "blue-2", label: "Puntos BLUE laterales (PLAPS) evaluados", required: true },
      { id: "blue-3", label: "Deslizamiento pleural evaluado bilateralmente", required: true },
      { id: "blue-4", label: "Patrón A o B identificado en cada lado", required: true },
      { id: "blue-5", label: "Función sistólica estimada (ventana cardíaca)", required: true },
      { id: "blue-6", label: "Diagnóstico diferencial establecido", required: true },
    ],
    flowNodes: [
      { id: "bn1", label: "IRA: evaluar patrón", type: "question", children: ["bn2", "bn3"], description: "Iniciar por puntos anteriores bilaterales", x: 300, y: 40 },
      { id: "bn2", label: "Perfil A bilateral", type: "finding", imageId: "img-05", description: "Líneas A dominantes, deslizamiento presente", clinicalAction: "TEP, asma, EPOC exacerbado", children: ["bn4"], x: 150, y: 160 },
      { id: "bn3", label: "Perfil B bilateral", type: "finding", imageId: "img-06", description: "Líneas B difusas bilaterales", clinicalAction: "EAP vs Neumonía — evaluar FE", children: ["bn5"], x: 450, y: 160 },
      { id: "bn4", label: "¿DVT presente?", type: "question", children: ["bn6", "bn7"], x: 150, y: 280 },
      { id: "bn5", label: "¿FE conservada?", type: "question", children: ["bn8", "bn9"], x: 450, y: 280 },
      { id: "bn6", label: "TEP probable", type: "endpoint", clinicalAction: "Anticoagular, eco cardíaco urgente", children: [], x: 80, y: 400 },
      { id: "bn7", label: "Asma / EPOC", type: "endpoint", clinicalAction: "Broncodilatadores, esteroides, VMNI si necesario", children: [], x: 250, y: 400 },
      { id: "bn8", label: "EAP (diastólico)", type: "endpoint", clinicalAction: "Diuréticos, VMNI, tratar HTA", children: [], x: 380, y: 400 },
      { id: "bn9", label: "Neumonía", type: "endpoint", clinicalAction: "Antibiótico según contexto, soporte respiratorio", children: [], x: 520, y: 400 },
    ],
  },
  {
    slug: "rush",
    title: "RUSH Protocol",
    indication: "Shock no diferenciado · Pump/Tank/Pipes",
    icon: "Activity",
    category: "cardiac",
    color: "#5D7396",
    estimatedMinutes: 25,
    difficulty: 2,
    imageIds: ["img-08", "img-09", "img-10"],
    quizIds: ["q-06", "q-07"],
    checklistItems: [
      { id: "rush-1", label: "THE PUMP: Función sistólica estimada", required: true },
      { id: "rush-2", label: "THE PUMP: Derrame pericárdico descartado", required: true },
      { id: "rush-3", label: "THE PUMP: Taponamiento cardíaco evaluado", required: true },
      { id: "rush-4", label: "THE TANK: IVC medida (diámetro + variabilidad)", required: true },
      { id: "rush-5", label: "THE TANK: FAST realizado (líquido libre)", required: true },
      { id: "rush-6", label: "THE PIPES: Aorta abdominal evaluada", required: true },
      { id: "rush-7", label: "THE PIPES: DVT femoral bilateral evaluado", required: true },
      { id: "rush-8", label: "Tipo de shock identificado", required: true },
    ],
    flowNodes: [
      { id: "rn1", label: "Shock no diferenciado", type: "question", children: ["rn2"], description: "MAP <65, lactato >2, signos de hipoperfusión", x: 300, y: 40 },
      { id: "rn2", label: "THE PUMP", type: "action", description: "Función sistólica + pericardio", clinicalAction: "Ventana SC o A4C: FE visual, derrame", children: ["rn3", "rn4"], x: 300, y: 140 },
      { id: "rn3", label: "Disfunción sistólica", type: "finding", imageId: "img-08", description: "FE <40% visual: excursión mitral reducida", clinicalAction: "Shock cardiogénico. Inotrópicos, soporte hemodinámico", children: ["rn7"], x: 120, y: 260 },
      { id: "rn4", label: "Función preservada", type: "finding", description: "FE normal o hiperdinámica", children: ["rn5"], x: 440, y: 260 },
      { id: "rn5", label: "THE TANK", type: "action", description: "IVC + FAST", clinicalAction: "IVC <2cm colapsable + FAST+: hipovolémico", children: ["rn6", "rn8"], x: 440, y: 360 },
      { id: "rn6", label: "IVC colapsada + FAST+", type: "finding", imageId: "img-09", description: "Hipovolemia con líquido libre", clinicalAction: "Shock hemorrágico. Volumen, transfusión, cirugía", children: ["rn7"], x: 300, y: 460 },
      { id: "rn7", label: "Diagnóstico + Plan", type: "endpoint", clinicalAction: "Tratar causa + soporte hemodinámico dirigido", children: [], x: 300, y: 560 },
      { id: "rn8", label: "IVC dilatada", type: "finding", description: "Obstructivo o distributivo", clinicalAction: "Evaluar neumotórax (eFAST), TEP, sepsis", children: ["rn7"], x: 560, y: 460 },
    ],
  },
  {
    slug: "vexus",
    title: "VExUS",
    indication: "Congestión venosa sistémica · Riñón · Hígado",
    icon: "Waves",
    category: "vascular",
    color: "#A8B9D1",
    estimatedMinutes: 20,
    difficulty: 3,
    imageIds: ["img-11", "img-12"],
    quizIds: ["q-08", "q-09"],
    checklistItems: [
      { id: "vexus-1", label: "VCI medida ≥ 2 cm (criterio base)", required: true },
      { id: "vexus-2", label: "Vena hepática: patrón Doppler evaluado (S>D normal)", required: true },
      { id: "vexus-3", label: "Vena porta: pulsatilidad evaluada (<30% normal)", required: true },
      { id: "vexus-4", label: "Vena renal intrarrenal: patrón evaluado (continuo normal)", required: true },
      { id: "vexus-5", label: "Grado VExUS calculado (0-3)", required: true },
      { id: "vexus-6", label: "Decisión clínica registrada (fluidos vs diuréticos)", required: true },
    ],
    flowNodes: [
      { id: "vn1", label: "¿VCI ≥ 2 cm?", type: "question", children: ["vn2", "vn3"], x: 300, y: 40 },
      { id: "vn2", label: "VCI < 2 cm", type: "finding", description: "VExUS 0 — congestión improbable", clinicalAction: "No restricción de fluidos por VExUS", children: ["vn6"], x: 120, y: 160 },
      { id: "vn3", label: "VCI ≥ 2 cm", type: "finding", description: "Criterio base cumplido: evaluar venas", children: ["vn4"], x: 440, y: 160 },
      { id: "vn4", label: "Evaluar patrones Doppler", type: "action", description: "Hepática + Porta + Renal", clinicalAction: "Medir índice de pulsatilidad portal y patrón renal", children: ["vn5"], x: 440, y: 280 },
      { id: "vn5", label: "¿Patrones anormales?", type: "question", children: ["vn6", "vn7", "vn8"], x: 440, y: 380 },
      { id: "vn6", label: "VExUS 0-1", type: "endpoint", clinicalAction: "Bajo riesgo de congestión orgánica", children: [], x: 150, y: 480 },
      { id: "vn7", label: "VExUS 2", type: "endpoint", clinicalAction: "Congestión moderada — restricción cuidadosa", children: [], x: 350, y: 480 },
      { id: "vn8", label: "VExUS 3", type: "endpoint", clinicalAction: "Congestión severa — diuréticos agresivos, sin fluidos", children: [], x: 550, y: 480 },
    ],
  },
  {
    slug: "eco-basica",
    title: "Eco Básica",
    indication: "Función sistólica · Derrame · Taponamiento",
    icon: "Heart",
    category: "cardiac",
    color: "#8FA7C4",
    estimatedMinutes: 20,
    difficulty: 2,
    imageIds: ["img-13", "img-14"],
    quizIds: ["q-10", "q-11"],
    checklistItems: [
      { id: "eco-1", label: "Ventana PLAX obtenida", required: true },
      { id: "eco-2", label: "Ventana PSAX (nivel mitral) obtenida", required: true },
      { id: "eco-3", label: "Ventana A4C obtenida", required: true },
      { id: "eco-4", label: "Ventana SC obtenida", required: true },
      { id: "eco-5", label: "FE visual estimada (normal/reducida leve/mod/severa)", required: true },
      { id: "eco-6", label: "Derrame pericárdico descartado o cuantificado", required: true },
      { id: "eco-7", label: "TAPSE medido si disponible (>17 mm normal)", required: false },
      { id: "eco-8", label: "IVC evaluada", required: true },
    ],
    flowNodes: [
      { id: "en1", label: "Evaluar función cardíaca", type: "action", children: ["en2"], x: 300, y: 40 },
      { id: "en2", label: "FE visual", type: "question", children: ["en3", "en4", "en5"], x: 300, y: 140 },
      { id: "en3", label: "Hiperdinámica", type: "finding", imageId: "img-13", description: "FE >70%: sepsis, hipovolemia, anemia", clinicalAction: "Buscar causa de estado de alto gasto", children: ["en6"], x: 100, y: 260 },
      { id: "en4", label: "Normal (50-65%)", type: "finding", description: "Excursión mitral adecuada", children: ["en6"], x: 300, y: 260 },
      { id: "en5", label: "Reducida (<50%)", type: "finding", imageId: "img-14", description: "FE reducida: miocardiopatía, isquemia", clinicalAction: "Inotrópicos, optimizar precarga, cardiología urgente", children: ["en6"], x: 500, y: 260 },
      { id: "en6", label: "Evaluar pericardio", type: "action", description: "Líquido pericárdico: medir en múltiples ventanas", children: ["en7"], x: 300, y: 380 },
      { id: "en7", label: "¿Taponamiento?", type: "question", children: ["en8", "en9"], x: 300, y: 460 },
      { id: "en8", label: "Taponamiento presente", type: "endpoint", clinicalAction: "Pericardiocentesis urgente. Guiar con ultrasonido.", children: [], x: 160, y: 560 },
      { id: "en9", label: "Sin taponamiento", type: "endpoint", clinicalAction: "Continuar manejo según FE y contexto", children: [], x: 440, y: 560 },
    ],
  },
  {
    slug: "acceso-vascular",
    title: "Acceso Vascular",
    indication: "CVC · PICC · Arterial · Guiado por US",
    icon: "Syringe",
    category: "procedimiento",
    color: "#6FAE95",
    estimatedMinutes: 30,
    difficulty: 2,
    imageIds: ["img-15", "img-16"],
    quizIds: ["q-12", "q-13"],
    checklistItems: [
      { id: "av-1", label: "Estructura identificada (vena vs arteria)", required: true },
      { id: "av-2", label: "Compresibilidad completa confirmada (vena)", required: true },
      { id: "av-3", label: "Ausencia de trombosis evaluada", required: true },
      { id: "av-4", label: "Técnica elegida: transversal o longitudinal", required: true },
      { id: "av-5", label: "Punción bajo visión directa en tiempo real", required: true },
      { id: "av-6", label: "Aguja visualizada dentro de la vena antes de dilatar", required: true },
      { id: "av-7", label: "Guía metálica visible por US", required: true },
      { id: "av-8", label: "Posición final confirmada (RX o US)", required: true },
    ],
    flowNodes: [
      { id: "avn1", label: "Seleccionar sitio", type: "action", children: ["avn2"], clinicalAction: "YI primera línea, subclavia segunda, femoral emergencia", x: 300, y: 40 },
      { id: "avn2", label: "Identificar estructura", type: "question", children: ["avn3", "avn4"], x: 300, y: 140 },
      { id: "avn3", label: "Vena (compresible)", type: "finding", imageId: "img-15", description: "Colapsa con presión del transductor", children: ["avn5"], x: 160, y: 260 },
      { id: "avn4", label: "Arteria (pulsátil)", type: "finding", description: "No compresible, flujo pulsátil en Doppler", clinicalAction: "NO puncionar. Reubicar transductor.", children: ["avn2"], x: 440, y: 260 },
      { id: "avn5", label: "Elegir técnica", type: "action", children: ["avn6"], clinicalAction: "Transversal: visión sección. Longitudinal: aguja completa visible.", x: 160, y: 360 },
      { id: "avn6", label: "Punción + confirmación", type: "action", description: "Aspirar sangre oscura, confirmar guía por US", children: ["avn7"], x: 160, y: 460 },
      { id: "avn7", label: "CVC colocado", type: "endpoint", clinicalAction: "RX tórax post-procedimiento. Confirmar ausencia de neumotórax.", children: [], x: 300, y: 560 },
    ],
  },
  {
    slug: "dvt",
    title: "DVT",
    indication: "Trombosis venosa profunda · Compresión ecográfica",
    icon: "Minus",
    category: "vascular",
    color: "#D4A373",
    estimatedMinutes: 15,
    difficulty: 1,
    imageIds: ["img-17", "img-18"],
    quizIds: ["q-14", "q-15"],
    checklistItems: [
      { id: "dvt-1", label: "Vena femoral común evaluada (ingle)", required: true },
      { id: "dvt-2", label: "Vena femoral superficial evaluada (muslo medio)", required: true },
      { id: "dvt-3", label: "Vena poplítea evaluada", required: true },
      { id: "dvt-4", label: "Compresión completa (colapso total = normal)", required: true },
      { id: "dvt-5", label: "Doppler color aplicado si compresión dudosa", required: false },
      { id: "dvt-6", label: "Resultado reportado: DVT+ / DVT- / Inconcluso", required: true },
    ],
    flowNodes: [
      { id: "dn1", label: "Sospecha DVT", type: "action", children: ["dn2"], x: 300, y: 40 },
      { id: "dn2", label: "Técnica de compresión", type: "action", description: "Intervalos de 2 cm desde ingle hasta poplítea", clinicalAction: "Transductor lineal 10-15 MHz. Presión suave pero firme.", children: ["dn3"], x: 300, y: 140 },
      { id: "dn3", label: "¿Compresión completa?", type: "question", children: ["dn4", "dn5"], x: 300, y: 260 },
      { id: "dn4", label: "Compresión completa", type: "finding", description: "Paredes colapsan: ausencia de trombo en ese segmento", children: ["dn6"], x: 150, y: 380 },
      { id: "dn5", label: "No compresible", type: "finding", imageId: "img-17", description: "Material ecogénico intraluminal. Trombo presente.", clinicalAction: "DVT confirmado. Anticoagulación. Descartar TEP.", children: ["dn7"], x: 450, y: 380 },
      { id: "dn6", label: "DVT negativo", type: "endpoint", clinicalAction: "Si alta sospecha: repetir en 5-7 días o angioTC", children: [], x: 150, y: 480 },
      { id: "dn7", label: "DVT positivo", type: "endpoint", clinicalAction: "HBPM o HNF según contexto. Evaluar extensión.", children: [], x: 450, y: 480 },
    ],
  },
];

// ─── ECHO IMAGES ──────────────────────────────────────────────────────────────

export const echoImages: EchoImage[] = [
  { id: "img-01", src: "/images/fast-rrq-positive.jpg", thumbnailSrc: "/images/fast-rrq-positive.jpg", protocolRef: "fast", window: "FAST-RUQ", finding: "Líquido libre en Morrison", isPathological: true, description: "Franja hipoecoica en el espacio hepatorrenal (Morrison). Signo positivo de FAST.", difficulty: 1, annotations: [{ x: 45, y: 55, label: "Líquido libre", type: "arrow" }, { x: 38, y: 38, label: "Hígado", type: "text" }, { x: 65, y: 70, label: "Riñón", type: "text" }] },
  { id: "img-02", src: "/images/fast-cardiac.jpg", thumbnailSrc: "/images/fast-cardiac.jpg", protocolRef: "fast", window: "FAST-cardiac", finding: "Ventana subxifoidea normal", isPathological: false, description: "Ventana subxifoidea con 4 cámaras. Ausencia de derrame pericárdico.", difficulty: 1, annotations: [{ x: 50, y: 45, label: "VD", type: "text" }, { x: 30, y: 60, label: "Hígado", type: "text" }] },
  { id: "img-03", src: "/images/effast-pneumo.jpg", thumbnailSrc: "/images/effast-pneumo.jpg", protocolRef: "fast", window: "BLUE-anterior", finding: "Ausencia de deslizamiento pleural", isPathological: true, description: "Modo M: patrón de estratósfera (código de barras). Neumotórax confirmado.", difficulty: 2, annotations: [{ x: 50, y: 30, label: "Sin deslizamiento", type: "circle" }] },
  { id: "img-04", src: "/images/fast-pelvis.jpg", thumbnailSrc: "/images/fast-pelvis.jpg", protocolRef: "fast", window: "FAST-pelvis", finding: "Líquido libre pelviano", isPathological: true, description: "Líquido libre en el fondo de saco de Douglas (mujer) o rectovesical (hombre).", difficulty: 1, annotations: [{ x: 40, y: 60, label: "Líquido libre", type: "arrow" }] },
  { id: "img-05", src: "/images/blue-alines.jpg", thumbnailSrc: "/images/blue-alines.jpg", protocolRef: "blue", window: "BLUE-anterior", finding: "Líneas A (perfil A)", isPathological: false, description: "Artefactos de reverberación horizontal. Patrón normal o EPOC/asma/TEP.", difficulty: 1, annotations: [{ x: 50, y: 40, label: "Líneas A", type: "arrow" }, { x: 50, y: 20, label: "Línea pleural", type: "text" }] },
  { id: "img-06", src: "/images/blue-blines.jpg", thumbnailSrc: "/images/blue-blines.jpg", protocolRef: "blue", window: "BLUE-anterior", finding: "Líneas B (perfil B)", isPathological: true, description: "Artefactos verticales tipo cohete. Edema intersticial o alveolar.", difficulty: 2, annotations: [{ x: 40, y: 50, label: "Línea B", type: "arrow" }, { x: 60, y: 50, label: "Línea B", type: "arrow" }] },
  { id: "img-07", src: "/images/blue-consolidation.jpg", thumbnailSrc: "/images/blue-consolidation.jpg", protocolRef: "blue", window: "BLUE-lateral", finding: "Consolidación pulmonar (PLAPS)", isPathological: true, description: "Área hipoecoica con broncograma aéreo dinámico. Neumonía.", difficulty: 2, annotations: [{ x: 50, y: 50, label: "Consolidación", type: "circle" }] },
  { id: "img-08", src: "/images/rush-lv-dysfunction.jpg", thumbnailSrc: "/images/rush-lv-dysfunction.jpg", protocolRef: "rush", window: "A4C", finding: "Disfunción sistólica severa", isPathological: true, description: "FE visualmente <30%. Excursión sistólica mínima. Shock cardiogénico.", difficulty: 2, annotations: [{ x: 50, y: 50, label: "VI dilatado", type: "circle" }, { x: 30, y: 40, label: "VD", type: "text" }] },
  { id: "img-09", src: "/images/rush-ivc-collapsed.jpg", thumbnailSrc: "/images/rush-ivc-collapsed.jpg", protocolRef: "rush", window: "IVC", finding: "IVC colapsada (<1 cm)", isPathological: true, description: "IVC <1 cm con colapso inspiratorio >50%. Hipovolemia severa.", difficulty: 1, annotations: [{ x: 50, y: 55, label: "IVC colapsada", type: "arrow" }] },
  { id: "img-10", src: "/images/rush-pericardial-effusion.jpg", thumbnailSrc: "/images/rush-pericardial-effusion.jpg", protocolRef: "rush", window: "PLAX", finding: "Derrame pericárdico moderado", isPathological: true, description: "Espacio libre de ecos posterior al VI >10mm. Derrame moderado.", difficulty: 2, annotations: [{ x: 60, y: 70, label: "Derrame", type: "arrow" }] },
  { id: "img-11", src: "/images/vexus-hepatic.jpg", thumbnailSrc: "/images/vexus-hepatic.jpg", protocolRef: "vexus", window: "otro", finding: "Vena hepática: patrón S abolido", isPathological: true, description: "Doppler de vena hepática con onda S reducida o invertida. Congestión hepática.", difficulty: 3, annotations: [{ x: 50, y: 40, label: "Onda S abolida", type: "arrow" }] },
  { id: "img-12", src: "/images/vexus-portal.jpg", thumbnailSrc: "/images/vexus-portal.jpg", protocolRef: "vexus", window: "otro", finding: "Vena porta pulsátil >30%", isPathological: true, description: "Pulsatilidad portal >30%. Congestión venosa moderada-severa.", difficulty: 3, annotations: [{ x: 50, y: 50, label: "Pulsatilidad", type: "circle" }] },
  { id: "img-13", src: "/images/echo-plax-normal.jpg", thumbnailSrc: "/images/echo-plax-normal.jpg", protocolRef: "eco-basica", window: "PLAX", finding: "PLAX normal", isPathological: false, description: "Ventana paraesternal eje largo. VI, VD, válvula mitral y aórtica visibles.", difficulty: 1, annotations: [{ x: 30, y: 50, label: "VI", type: "text" }, { x: 60, y: 40, label: "Ao", type: "text" }, { x: 70, y: 60, label: "AI", type: "text" }] },
  { id: "img-14", src: "/images/echo-a4c-dysfunction.jpg", thumbnailSrc: "/images/echo-a4c-dysfunction.jpg", protocolRef: "eco-basica", window: "A4C", finding: "FE reducida — A4C", isPathological: true, description: "Vista apical 4 cámaras con VI dilatado y excursión reducida. FE ~30%.", difficulty: 2, annotations: [{ x: 40, y: 60, label: "VI dilatado", type: "circle" }] },
  { id: "img-15", src: "/images/vascular-ij-compression.jpg", thumbnailSrc: "/images/vascular-ij-compression.jpg", protocolRef: "acceso-vascular", window: "vascular", finding: "Yugular interna compresible", isPathological: false, description: "Compresión completa de la vena yugular interna. Sin trombo.", difficulty: 1, annotations: [{ x: 40, y: 50, label: "YI compresible", type: "arrow" }, { x: 60, y: 40, label: "Carótida (no compresible)", type: "text" }] },
  { id: "img-16", src: "/images/vascular-needle-inplane.jpg", thumbnailSrc: "/images/vascular-needle-inplane.jpg", protocolRef: "acceso-vascular", window: "vascular", finding: "Técnica in-plane — aguja visible", isPathological: false, description: "Abordaje longitudinal. Aguja completamente visible desde la punta hasta el hub.", difficulty: 2, annotations: [{ x: 50, y: 55, label: "Aguja", type: "arrow" }] },
  { id: "img-17", src: "/images/dvt-positive.jpg", thumbnailSrc: "/images/dvt-positive.jpg", protocolRef: "dvt", window: "vascular", finding: "DVT — No compresible", isPathological: true, description: "Vena femoral no compresible. Material ecogénico intraluminal. TVP confirmada.", difficulty: 1, annotations: [{ x: 50, y: 50, label: "Trombo", type: "circle" }] },
  { id: "img-18", src: "/images/dvt-negative.jpg", thumbnailSrc: "/images/dvt-negative.jpg", protocolRef: "dvt", window: "vascular", finding: "DVT negativo — Compresión completa", isPathological: false, description: "Vena femoral colapsa completamente. Sin evidencia de TVP.", difficulty: 1, annotations: [{ x: 50, y: 50, label: "Colapso completo", type: "arrow" }] },
  { id: "img-19", src: "/images/rush-ivc-collapsed.jpg", thumbnailSrc: "/images/rush-ivc-collapsed.jpg", protocolRef: "rush", window: "otro", finding: "Excursión diafragmática en M-mode", isPathological: false, description: "M-mode sobre diafragma: excursión >10 mm sugiere buena función para destete (integrar con clínica y VM).", difficulty: 2, annotations: [{ x: 50, y: 45, label: "Excursión", type: "arrow" }] },
  { id: "img-20", src: "/images/rush-pericardial-effusion.jpg", thumbnailSrc: "/images/rush-pericardial-effusion.jpg", protocolRef: "eco-basica", window: "otro", finding: "Vaina del nervio óptico (ONS) aumentada", isPathological: true, description: "Medición del diámetro de la vaina del nervio óptico >6 mm sugiere hipertensión intracraneal. Correlacionar con TC.", difficulty: 3, annotations: [{ x: 55, y: 50, label: "ONS >6 mm", type: "circle" }] },
];

// ─── QUIZ QUESTIONS ──────────────────────────────────────────────────────────

export const quizQuestions: QuizQuestion[] = [
  { id: "q-01", type: "mcq", protocolRef: "fast", question: "En el FAST, ¿cuál es el espacio más sensible para detectar líquido libre intraperitoneal en paciente supino?", options: ["Espacio perivesical", "Espacio de Morrison (hepatorrenal)", "Espacio subfrénico izquierdo", "Fondo de saco de Douglas"], correctIndex: 1, explanation: "El espacio de Morrison (hepatorrenal) es el más declive en posición supina y el primero en acumular líquido libre intraperitoneal, con una sensibilidad del 60-70% como única ventana." },
  { id: "q-02", type: "mcq", protocolRef: "fast", question: "El 'punto de pulmón' en el eFAST es patognomónico de:", options: ["Hemotórax", "Neumotórax", "Derrame pleural masivo", "Contusión pulmonar"], correctIndex: 1, explanation: "El punto de pulmón es la interfaz entre la zona con y sin deslizamiento pleural, patognomónico de neumotórax con sensibilidad cercana al 79% y especificidad del 100%." },
  { id: "q-03", type: "true-false", protocolRef: "fast", question: "Un FAST negativo en paciente hemodinámicamente inestable descarta hemorragia intraabdominal como causa del shock.", options: ["Verdadero", "Falso"], correctIndex: 1, explanation: "FALSO. El FAST tiene sensibilidad 73-88%. Un FAST negativo no descarta hemorragia, especialmente precoz. En inestabilidad persistente con FAST negativo: repetir FAST o considerar laparotomía exploradora." },
  { id: "q-04", type: "mcq", protocolRef: "blue", question: "Paciente con disnea aguda. US pulmonar muestra líneas B bilaterales difusas + FE visual conservada (~60%). ¿Diagnóstico más probable?", options: ["Neumonía bilateral", "Edema pulmonar cardiogénico (EAP)", "TEP bilateral", "SDRA"], correctIndex: 1, explanation: "Líneas B bilaterales + FE conservada en contexto de disnea aguda apunta a EAP con disfunción diastólica. Neumonía también da líneas B pero típicamente asimétricas y focales." },
  { id: "q-05", type: "mcq", protocolRef: "blue", question: "En el protocolo BLUE, el 'perfil A' bilateral con DVT presente orienta hacia:", options: ["Edema pulmonar cardiogénico", "Neumonía", "Tromboembolismo pulmonar", "EPOC exacerbado"], correctIndex: 2, explanation: "Perfil A (líneas A) + DVT = TEP en el 81% de casos (especificidad alta según Lichtenstein). El TEP da perfil A porque no hay edema intersticial, y la DVT confirma la fuente trombótica." },
  { id: "q-06", type: "mcq", protocolRef: "rush", question: "En el RUSH protocol, 'The Pump' evalúa:", options: ["IVC y volumen intravascular", "Aorta abdominal y DVT", "Función sistólica y pericardio", "Pleura y parénquima pulmonar"], correctIndex: 2, explanation: "The Pump evalúa función sistólica (FE visual), derrame pericárdico y taponamiento cardíaco. The Tank evalúa IVC y FAST. The Pipes evalúa aorta y DVT." },
  { id: "q-07", type: "mcq", protocolRef: "rush", question: "IVC <2cm con colapso inspiratorio >50% en contexto de shock orienta a:", options: ["Shock cardiogénico", "Shock obstructivo por TEP", "Shock hipovolémico/distributivo", "Taponamiento cardíaco"], correctIndex: 2, explanation: "IVC pequeña y colapsable indica baja presión venosa central y respuesta probable a volumen. Sugiere hipovolemia o distribución anormal (sepsis inicial). El taponamiento y TEP dan IVC DILATADA." },
  { id: "q-08", type: "mcq", protocolRef: "vexus", question: "El grado VExUS 3 requiere VCI ≥2cm más:", options: ["1 patrón venoso anormal leve", "Solo vena hepática anormal", "2 o más patrones venosos anormales severos", "Vena renal bifásica aislada"], correctIndex: 2, explanation: "VExUS 3 = VCI ≥2cm + ≥2 patrones anormales severos (hepático, portal o renal). Predice fuertemente AKI por congestión venosa renal. Es indicación de restricción hídrica agresiva y diuresis." },
  { id: "q-09", type: "true-false", protocolRef: "vexus", question: "La pulsatilidad portal >30% es un hallazgo normal en pacientes sanos.", options: ["Verdadero", "Falso"], correctIndex: 1, explanation: "FALSO. La vena porta es normalmente continua o con variación <30%. Una pulsatilidad >30% indica trasmisión de presiones venosas derechas al sistema portal — marcador de congestión sistémica severa." },
  { id: "q-10", type: "mcq", protocolRef: "eco-basica", question: "El TAPSE (Tricuspid Annular Plane Systolic Excursion) evalúa función de:", options: ["Ventrículo izquierdo", "Aurícula izquierda", "Ventrículo derecho", "Válvula aórtica"], correctIndex: 2, explanation: "TAPSE mide la excursión sistólica del anillo tricuspídeo en modo M. Normal >17mm. Reducido = disfunción sistólica de VD. Útil en TEP, HTAP, SDRA con cor pulmonale." },
  { id: "q-11", type: "mcq", protocolRef: "eco-basica", question: "El colapso diastólico de la aurícula derecha en el ecocardiograma indica:", options: ["Disfunción diastólica del VI", "Inicio de taponamiento cardíaco", "Hipertensión pulmonar severa", "Fibrilación auricular"], correctIndex: 1, explanation: "El colapso de AD en diástole es el signo más precoz de taponamiento. Cuando la presión intrapericárdica supera la presión de la AD (la más baja), esta colapsa primero. El colapso de VD es más específico." },
  { id: "q-12", type: "mcq", protocolRef: "acceso-vascular", question: "¿Cuál es la ventaja de la técnica longitudinal (in-plane) para acceso vascular guiado por US?", options: ["Mayor velocidad de inserción", "Visualización completa de la aguja en todo su trayecto", "Menor riesgo de neumotórax en subclavia", "No requiere ayudante"], correctIndex: 1, explanation: "La técnica in-plane permite visualizar toda la aguja desde el hub hasta la punta, confirmando la posición en tiempo real. La desventaja es que requiere más habilidad para mantener el transductor alineado con la aguja." },
  { id: "q-13", type: "true-false", protocolRef: "acceso-vascular", question: "La arteria carótida es completamente compresible con el transductor de ultrasonido.", options: ["Verdadero", "Falso"], correctIndex: 1, explanation: "FALSO. Las arterias NO son compresibles (o requieren presión excesiva). La vena yugular interna colapsa completamente con presión suave del transductor. Esta diferencia es fundamental para evitar punción arterial accidental." },
  { id: "q-14", type: "mcq", protocolRef: "dvt", question: "La técnica estándar para diagnóstico de DVT por ultrasonido es:", options: ["Doppler color sin compresión", "Compresión en intervalos de 2 cm desde ingle hasta poplítea", "Solo evaluación de vena femoral común", "Modo M en vena poplítea"], correctIndex: 1, explanation: "La compresión por ultrasonido (CUS) en 2 o 3 puntos es el estándar. Se aplica presión hasta lograr colapso completo. La no-compresibilidad confirma TVP con sensibilidad 94% y especificidad 98% para TVP proximal." },
  { id: "q-15", type: "true-false", protocolRef: "dvt", question: "El quiste de Baker puede confundirse con una trombosis venosa poplítea.", options: ["Verdadero", "Falso"], correctIndex: 0, explanation: "VERDADERO. El quiste de Baker (sinovial) en la fosa poplítea puede simular una masa o incluso comprimir la vena poplítea. Debe identificarse por su contenido anecoico y comunicación con la articulación. Trampa frecuente." },
  { id: "q-16", type: "mcq", protocolRef: "mod-fundamentos", question: "En modo B, el líquido libre aparece típicamente como:", options: ["Hipoecoico / anecoico", "Hiperecoico con sombra", "Isoecoico al músculo", "Artefacto en reverberación"], correctIndex: 0, explanation: "El líquido no refleja ondas: se ve negro (anecoico). El tejido sólido es gris. La sombra posterior sugiere estructura sólida o gas." },
  { id: "q-17", type: "mcq", protocolRef: "mod-fundamentos", question: "Para Doppler pulsado confiable, el ángulo de insonación respecto al flujo debe ser:", options: ["≤60°", "Siempre 90°", "≥75°", "Indiferente"], correctIndex: 0, explanation: "La ley de coseno: errores de velocidad aumentan con ángulos >60°. Alinea el haz con el flujo o corrige el ángulo en el equipo." },
  { id: "q-18", type: "true-false", protocolRef: "mod-fundamentos", question: "El modo M muestra la anatomía completa en un plano bidimensional.", options: ["Verdadero", "Falso"], correctIndex: 1, explanation: "FALSO. Modo M = movimiento a lo largo de UNA línea en el tiempo. Útil para deslizamiento pleural, válvulas y diafragma." },
  { id: "q-19", type: "mcq", protocolRef: "mod-weaning-diafragma", question: "Una excursión diafragmática <10 mm en M-mode se asocia con:", options: ["Alto riesgo de fracaso de extubación", "Hipertensión intracraneal", "Neumotórax", "Shock distributivo"], correctIndex: 0, explanation: "Excursión reducida refleja debilidad diafragmática o fatiga. Debe integrarse con RSBI, secreciones y gasometría; no usar un solo corte." },
  { id: "q-20", type: "mcq", protocolRef: "mod-weaning-diafragma", question: "La ventana habitual para medir excursión diafragmática es:", options: ["Hipocondrio derecho con hígado como ventana", "Fosa poplítea", "Yugular interna", "Apical 4 cámaras"], correctIndex: 0, explanation: "El hígado sirve de ventana acústica al diafragma derecho. M-mode perpendicular a la línea diafragmática." },
  { id: "q-21", type: "true-false", protocolRef: "mod-weaning-diafragma", question: "La sedación profunda no altera la medición de excursión diafragmática.", options: ["Verdadero", "Falso"], correctIndex: 1, explanation: "FALSO. Sedación, bloqueo neuromuscular y asincronía ventilatoria modifican la excursión. Medir en condiciones comparables." },
  { id: "q-22", type: "mcq", protocolRef: "mod-neuro-pocus", question: "Un diámetro de ONS >6 mm sugiere principalmente:", options: ["Hipertensión intracraneal", "Taponamiento cardíaco", "TEP agudo", "Hipovolemia"], correctIndex: 0, explanation: "La vaina del nervio óptico se distiende con aumento de presión de líquido cefalorraquídeo. Correlacionar con clínica y TC." },
  { id: "q-23", type: "mcq", protocolRef: "mod-neuro-pocus", question: "La ONS se mide habitualmente aproximadamente:", options: ["3 mm posterior al globo ocular", "En la arteria carótida", "En el vértice pulmonar", "Sobre la válvula mitral"], correctIndex: 0, explanation: "Corte transversal del nervio óptico; medir el diámetro interno máximo de la vaina. Comparar lados si es posible." },
  { id: "q-24", type: "mcq", protocolRef: "mod-integracion-casos", question: "Paciente politraumatizado inestable. El primer protocolo POCUS recomendado es:", options: ["FAST / eFAST", "VExUS", "BLUE completo", "Doppler TCD"], correctIndex: 0, explanation: "En trauma con inestabilidad, descartar hemoperitoneo, hemotórax y neumotórax antes de estudios prolongados." },
  { id: "q-25", type: "mcq", protocolRef: "mod-integracion-casos", question: "Tras administrar 1 L de cristaloide en oliguria, ¿qué reevaluación POCUS es más útil?", options: ["VExUS e IVC", "Solo ONS", "Solo DVT", "Modo M de rodilla"], correctIndex: 0, explanation: "Repetir IVC/VExUS y función cardíaca evita sobrecarga en paciente ya congesto. Integrar con diuresis y lactato." },
];

// ─── CLINICAL CASES ──────────────────────────────────────────────────────────

export const clinicalCases: ClinicalCase[] = [
  {
    id: "case-01",
    title: "Disnea súbita en urgencias",
    scenario: "Hombre de 68 años con antecedente de HTA y diabetes. Consulta por disnea de inicio súbito hace 2 horas. No fiebre. Al examen: FR 32/min, SpO2 82% con O2 al 100%, TA 168/98 mmHg, FC 110 lpm. Crepitantes bilaterales. Sin dolor pleurítico.",
    patientAge: 68, patientSex: "M",
    vitals: { hr: 110, bp: "168/98", rr: 32, spo2: 82, temp: 36.8, map: 121, lactate: 1.8 },
    imageIds: ["img-06", "img-13"],
    protocolRefs: ["blue", "eco-basica"],
    difficulty: 2,
    tags: ["edema-pulmonar", "blue", "disnea"],
    teachingPoint: "Líneas B bilaterales + FE conservada + HTA = EAP diastólico. VMNI de primera línea. No asumir neumonía solo por infiltrados.",
    questions: [
      { id: "cc1-q1", type: "mcq", imageId: "img-06", protocolRef: "blue", question: "El US pulmonar muestra líneas B bilaterales difusas. La FE visual es ~60%. ¿Cuál es el diagnóstico más probable?", options: ["Neumonía bilateral por COVID", "EAP cardiogénico con FE preservada", "SDRA temprano", "TEP masivo"], correctIndex: 1, explanation: "Líneas B difusas + FE conservada en HTA = EAP diastólico. La FE preservada descarta miocardiopatía sistólica aguda. El manejo es VMNI + diuréticos." },
      { id: "cc1-q2", type: "mcq", protocolRef: "blue", question: "¿Cuál es el manejo inmediato correcto?", options: ["Antibióticos IV y soporte con VMNI", "VMNI + furosemida 40mg IV + nitratos si TA >110", "Intubación orotraqueal inmediata", "Volumen 500 mL y antibióticos"], correctIndex: 1, explanation: "EAP con SpO2 <90%: VMNI (CPAP 5-7 cmH2O) + furosemida + nitratos. La intubación se reserva para falla de VMNI o alteración del estado de conciencia." },
    ],
  },
  {
    id: "case-02",
    title: "Shock post-quirúrgico",
    scenario: "Mujer de 45 años, post-colecistectomía laparoscópica hace 6 horas. Enfermería reporta TA 72/40 mmHg, FC 134 lpm, piel fría y pálida, llenado capilar 4 segundos. SpO2 96%. Sin fiebre. Débito de drenaje abdominal aumentado (400 mL hemático en 2 hrs).",
    patientAge: 45, patientSex: "F",
    vitals: { hr: 134, bp: "72/40", rr: 24, spo2: 96, temp: 36.2, map: 51, lactate: 4.8 },
    imageIds: ["img-09", "img-04"],
    protocolRefs: ["rush"],
    difficulty: 2,
    tags: ["shock", "hemorragico", "rush", "postquirurgico"],
    teachingPoint: "RUSH en shock: corazón hiperdinámico + IVC colapsada + líquido libre = hemorrágico. No perder tiempo — activar protocolo de transfusión masiva.",
    questions: [
      { id: "cc2-q1", type: "mcq", imageId: "img-09", protocolRef: "rush", question: "RUSH protocol: VI hiperdinámico, IVC <1cm, FAST+ (líquido libre en pelvis). ¿Tipo de shock?", options: ["Cardiogénico", "Distributivo (sepsis)", "Hemorrágico (hipovolémico)", "Obstructivo (TEP)"], correctIndex: 2, explanation: "Tríada clásica del shock hemorrágico: corazón hiperdinámico compensando, IVC colapsada (pérdida de volumen), FAST+ (fuente de sangrado). Activar protocolo de transfusión masiva 1:1:1." },
      { id: "cc2-q2", type: "mcq", protocolRef: "rush", question: "¿Cuál es el paso inmediato más urgente?", options: ["TC abdominal con contraste", "Activar quirófano + transfusión 1:1:1 inmediata", "2 litros de cristaloide en bolo", "Eco cardíaco completo"], correctIndex: 1, explanation: "Shock hemorrágico inestable: No perder tiempo en TC. Quirófano directo + transfusión masiva (GR:PFC:Plaquetas 1:1:1). El cristaloide en exceso produce dilución de factores y empeora coagulopatía." },
    ],
  },
  {
    id: "case-03",
    title: "Trauma torácico vehicular",
    scenario: "Hombre de 32 años, accidente de moto a alta velocidad. Trae collarín. Consciente, agitado. Dolor torácico derecho intenso. FR 28/min, SpO2 88% con O2 por mascarilla. TA 96/64 mmHg. FC 118 lpm. Murmullo vesicular abolido en hemitórax derecho.",
    patientAge: 32, patientSex: "M",
    vitals: { hr: 118, bp: "96/64", rr: 28, spo2: 88, temp: 36.5, map: 75, lactate: 3.1 },
    imageIds: ["img-03", "img-02"],
    protocolRefs: ["fast"],
    difficulty: 1,
    tags: ["trauma", "effast", "neuomotorax", "emergencia"],
    teachingPoint: "Ausencia de deslizamiento + punto de pulmón = neumotórax. El punto de pulmón es patognomónico. No esperar RX: descompresión inmediata.",
    questions: [
      { id: "cc3-q1", type: "mcq", imageId: "img-03", protocolRef: "fast", question: "eFAST pulmonar derecho: ausencia de deslizamiento pleural con punto de pulmón visible. ¿Diagnóstico?", options: ["Hemotórax derecho masivo", "Contusión pulmonar", "Neumotórax derecho", "Taponamiento cardíaco"], correctIndex: 2, explanation: "La ausencia de deslizamiento + punto de pulmón es patognomónico de neumotórax (especificidad 100%). El punto de pulmón marca la interfaz entre el pulmón colapsado y la cavidad con aire." },
      { id: "cc3-q2", type: "mcq", protocolRef: "fast", question: "¿Cuál es el manejo inmediato correcto en este paciente inestable?", options: ["RX tórax urgente y observar", "TC torácico", "Descompresión con aguja 2°EIC + tubo de tórax", "VMNI y reevaluar"], correctIndex: 2, explanation: "Neumotórax + inestabilidad hemodinámica = neumotórax a tensión hasta demostrar lo contrario. Descompresión con aguja (2° EIC, línea medioclavicular) + tubo de tórax. No esperar imagen confirmatoria." },
    ],
  },
  {
    id: "case-04",
    title: "Congestión sistémica en UCI",
    scenario: "Hombre de 70 años, ingresado por sepsis de foco urinario. Completó 72h de antibióticos. Sepsis controlada, pero con oliguria (diuresis 0.3 mL/kg/h), edema generalizado en aumento y PVC 18 mmHg. Na 138, Cr 2.1 (basal 0.9). El intensivista considera administrar más fluidos por 'PVC baja'.",
    patientAge: 70, patientSex: "M",
    vitals: { hr: 92, bp: "124/76", rr: 20, spo2: 97, temp: 37.2, map: 92, lactate: 1.4 },
    imageIds: ["img-11", "img-12"],
    protocolRefs: ["vexus"],
    difficulty: 3,
    tags: ["vexus", "congestion", "aki", "fluidos"],
    teachingPoint: "VExUS 3 = no más fluidos. La PVC alta no es indicación de fluidos — es indicación de diuréticos. La congestión venosa renal causa AKI igual que la hipoperfusión.",
    questions: [
      { id: "cc4-q1", type: "mcq", imageId: "img-11", protocolRef: "vexus", question: "VCI 2.8 cm. Vena hepática: onda S abolida. Porta: pulsatilidad 45%. Renal: patrón bifásico. ¿Grado VExUS?", options: ["VExUS 0", "VExUS 1", "VExUS 2", "VExUS 3"], correctIndex: 3, explanation: "VCI ≥2cm + ≥2 patrones severos (hepático con S abolida + portal >30%) = VExUS 3. El patrón renal bifásico confirma la congestión. AKI probable por congestión venosa renal." },
      { id: "cc4-q2", type: "mcq", protocolRef: "vexus", question: "Con VExUS 3 y AKI en progresión, ¿cuál es la decisión correcta?", options: ["Administrar 500 mL de cristaloide", "Diuréticos agresivos + restricción hídrica", "Iniciar vasopresores", "Esperar evolución sin cambios"], correctIndex: 1, explanation: "VExUS 3 = congestión venosa severa con daño orgánico. La acción es diuresis agresiva (furosemida 1-2 mg/kg o infusión continua) + restricción hídrica estricta. El volumen empeorará el AKI." },
    ],
  },
  {
    id: "case-05",
    title: "Acceso vascular difícil en sepsis",
    scenario: "Mujer de 55 años, obesidad grado II (IMC 38). Sepsis de origen incierto. Requiere CVC urgente para inotrópicos. Sin accesos periféricos viables. Tiene cuello corto. El residente intentó YI derecha sin US y falló 2 veces. Ahora pide guía.",
    patientAge: 55, patientSex: "F",
    vitals: { hr: 118, bp: "82/50", rr: 26, spo2: 94, temp: 38.8, map: 61, lactate: 3.6 },
    imageIds: ["img-15", "img-16"],
    protocolRefs: ["acceso-vascular"],
    difficulty: 2,
    tags: ["acceso-vascular", "cvc", "obesidad", "sepsis"],
    teachingPoint: "Guía US en tiempo real reduce complicaciones hasta 4x. Siempre confirmar aguja DENTRO de la vena antes de dilatar. La carótida NO es compresible.",
    questions: [
      { id: "cc5-q1", type: "mcq", imageId: "img-15", protocolRef: "acceso-vascular", question: "Al escanear el cuello, ves una estructura redonda que se comprime completamente con el transductor. Al lado hay otra que no se comprime y tiene pulso. ¿Cuál es la vena?", options: ["La estructura no compresible con pulso", "La estructura compresible sin pulso", "Ambas pueden ser venas", "Ninguna — son arterias"], correctIndex: 1, explanation: "La vena yugular interna es completamente compresible (colapsa con presión suave). La arteria carótida NO es compresible y tiene pulsatilidad visible. Esta distinción previene punción arterial accidental." },
      { id: "cc5-q2", type: "mcq", protocolRef: "acceso-vascular", question: "Antes de dilatar el sitio de punción, ¿qué debes confirmar obligatoriamente con US?", options: ["Que el paciente no tiene DVT", "Que la aguja o guía está dentro de la vena y no en la arteria", "Que el transductor está estéril", "Que el paciente tiene TP normal"], correctIndex: 1, explanation: "SIEMPRE confirmar la guía metálica dentro de la vena por ultrasonido antes de dilatar. Una dilatación sobre la arteria carótida puede ser fatal. Ver la guía en el lumen venoso = paso de seguridad innegociable." },
    ],
  },
];

// ─── COURSE ──────────────────────────────────────────────────────────────────

export const mockCourse: Course = {
  id: "course-sonocritico-mx",
  name: "SonoCrítico MX",
  tagline: "Visualiza el problema. Actúa con certeza.",
  date: "2024-11-15",
  instructorId: "instructor-01",
  accessCode: "SONO2024",
  moduleIds: [
    "fundamentos",
    "fast-efast",
    "pulmonar-blue",
    "eco-critico",
    "accesos-vasculares",
    "respuesta-volumen",
    "weaning-diafragma",
    "neuro-pocus",
    "vexus",
    "integracion-casos",
  ],
  activeModuleId: "fast-efast",
  activeCaseId: null,
  isLive: true,
};

// ─── STUDENTS ─────────────────────────────────────────────────────────────────

export const mockStudents: Student[] = [
  { id: "s01", name: "Dra. Ana García", email: "agarcia@hospital.mx", specialty: "urgencias", initials: "AG", progress: { userId: "s01", courseId: "course-sono-2024", completedProtocols: ["fast", "eco-basica"], completedCases: ["case-01"], checklistStatus: { fast: { "fast-1": true, "fast-2": true, "fast-3": true, "fast-4": true, "fast-5": false, "fast-6": false, "fast-7": false } }, quizResults: [{ id: "qr-01", quizId: "q-01", protocolRef: "fast", score: 100, answers: [1], completedAt: new Date().toISOString(), timeSpentSeconds: 45 }, { id: "qr-02", quizId: "q-02", protocolRef: "fast", score: 100, answers: [1], completedAt: new Date().toISOString(), timeSpentSeconds: 32 }], lastActivity: new Date().toISOString() } },
  { id: "s02", name: "Dr. Roberto Mendez", email: "rmendez@uci.mx", specialty: "uci", initials: "RM", progress: { userId: "s02", courseId: "course-sono-2024", completedProtocols: ["fast", "blue", "rush", "eco-basica"], completedCases: ["case-01", "case-02", "case-03"], checklistStatus: {}, quizResults: [{ id: "qr-03", quizId: "q-04", protocolRef: "blue", score: 100, answers: [1], completedAt: new Date().toISOString(), timeSpentSeconds: 55 }], lastActivity: new Date().toISOString() } },
  { id: "s03", name: "Dra. Sofía Reyes", email: "sreyes@anestesia.mx", specialty: "anestesia", initials: "SR", progress: { userId: "s03", courseId: "course-sono-2024", completedProtocols: ["fast"], completedCases: [], checklistStatus: {}, quizResults: [], lastActivity: new Date().toISOString() } },
  { id: "s04", name: "Dr. Carlos Vega", email: "cvega@urgencias.mx", specialty: "urgencias", initials: "CV", progress: { userId: "s04", courseId: "course-sono-2024", completedProtocols: ["fast", "blue", "rush", "vexus", "eco-basica"], completedCases: ["case-01", "case-02"], checklistStatus: {}, quizResults: [], lastActivity: new Date().toISOString() } },
  { id: "s05", name: "Dra. María López", email: "mlopez@medicina.mx", specialty: "medicina-critica", initials: "ML", progress: { userId: "s05", courseId: "course-sono-2024", completedProtocols: ["fast", "blue"], completedCases: ["case-01"], checklistStatus: {}, quizResults: [], lastActivity: new Date().toISOString() } },
  { id: "s06", name: "Dr. Andrés Torres", email: "atorres@uci.mx", specialty: "uci", initials: "AT", progress: { userId: "s06", courseId: "course-sono-2024", completedProtocols: [], completedCases: [], checklistStatus: {}, quizResults: [], lastActivity: new Date().toISOString() } },
  { id: "s07", name: "Dra. Patricia Nuñez", email: "pnunez@hospital.mx", specialty: "urgencias", initials: "PN", progress: { userId: "s07", courseId: "course-sono-2024", completedProtocols: ["fast", "eco-basica", "acceso-vascular"], completedCases: ["case-05"], checklistStatus: {}, quizResults: [], lastActivity: new Date().toISOString() } },
  { id: "s08", name: "Dr. Miguel Ruiz", email: "mruiz@anestesia.mx", specialty: "anestesia", initials: "MR", progress: { userId: "s08", courseId: "course-sono-2024", completedProtocols: ["fast", "blue", "rush"], completedCases: ["case-01", "case-03"], checklistStatus: {}, quizResults: [], lastActivity: new Date().toISOString() } },
  { id: "s09", name: "Dra. Laura Jiménez", email: "ljimenez@medicina.mx", specialty: "medicina-critica", initials: "LJ", progress: { userId: "s09", courseId: "course-sono-2024", completedProtocols: ["fast", "blue", "rush", "vexus", "eco-basica", "acceso-vascular"], completedCases: ["case-01", "case-02", "case-04"], checklistStatus: {}, quizResults: [], lastActivity: new Date().toISOString() } },
  { id: "s10", name: "Dr. Fernando Cruz", email: "fcruz@urgencias.mx", specialty: "urgencias", initials: "FC", progress: { userId: "s10", courseId: "course-sono-2024", completedProtocols: ["fast", "blue", "rush", "eco-basica"], completedCases: ["case-01", "case-02"], checklistStatus: {}, quizResults: [], lastActivity: new Date().toISOString() } },
  { id: "s11", name: "Dra. Valeria Mora", email: "vmora@hospital.mx", specialty: "uci", initials: "VM", progress: { userId: "s11", courseId: "course-sono-2024", completedProtocols: ["fast"], completedCases: [], checklistStatus: {}, quizResults: [], lastActivity: new Date().toISOString() } },
  { id: "s12", name: "Dr. Diego Salinas", email: "dsalinas@uci.mx", specialty: "uci", initials: "DS", progress: { userId: "s12", courseId: "course-sono-2024", completedProtocols: ["fast", "blue", "rush", "vexus", "eco-basica", "acceso-vascular", "dvt"], completedCases: ["case-01", "case-02", "case-03", "case-04", "case-05"], checklistStatus: {}, quizResults: [], lastActivity: new Date().toISOString() } },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

export function getProtocol(slug: string): Protocol | undefined {
  return protocols.find((p) => p.slug === slug);
}

export function getCase(id: string): ClinicalCase | undefined {
  return clinicalCases.find((c) => c.id === id);
}

export function getImage(id: string): EchoImage | undefined {
  return echoImages.find((img) => img.id === id);
}

export function getQuizQuestion(id: string): QuizQuestion | undefined {
  return quizQuestions.find((q) => q.id === id);
}

export function getProtocolProgress(
  completedProtocols: string[],
  slug: string
): number {
  return completedProtocols.includes(slug) ? 100 : 0;
}

export function calcQuizAvg(results: { score: number }[]): number {
  if (!results.length) return 0;
  return Math.round(results.reduce((s, r) => s + r.score, 0) / results.length);
}
