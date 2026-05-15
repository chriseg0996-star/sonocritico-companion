import { getModule } from "@/lib/course-modules";
import { getProtocol } from "@/lib/mock-data";

export interface ModuleAcquisition {
  sonda: string;
  preset: string;
  ventanas: string[];
  tips: string[];
  errores: string[];
}

export interface ModuleContentDetail {
  cuandoUsar: string[];
  limitaciones: string[];
  adquisicion: ModuleAcquisition;
  hallazgos: { normal: string[]; patologico: string[] };
  pocketCard: string[];
}

const contentBySlug: Record<string, ModuleContentDetail> = {
  fundamentos: {
    cuandoUsar: [
      "Antes de cualquier protocolo POCUS en UCI o urgencias",
      "Al configurar equipo, transductor o preset por primera vez en el turno",
      "Cuando la imagen es de mala calidad y debes optimizar antes de concluir",
      "Para interpretar artefactos, sombras y limitaciones de la ventana",
    ],
    limitaciones: [
      "La calidad depende del operador, ventana anatómica y hábitos del paciente",
      "Doppler pulsado subestima o sobreestima velocidad si el ángulo es incorrecto",
      "Modo M y Doppler requieren estabilidad del transductor",
      "No sustituye ecocardiografía formal ni estudios de imagen avanzados",
    ],
    adquisicion: {
      sonda: "Lineal 7–15 MHz (superficial/vascular); curva 2–5 MHz (abdomen); sectorial 2–4 MHz (cardíaco)",
      preset: "Abdominal, vascular, cardíaco o MSK según región — ajustar profundidad y ganancia",
      ventanas: [
        "Modo B: plano anatómico en tiempo real (base de todos los protocolos)",
        "Modo M: una línea en el tiempo — pleura, válvulas, diafragma",
        "Doppler color: mapa de velocidad en un sector (localizar flujo)",
        "Doppler pulsado: espectro + velocidad máxima en un punto (cuantificar)",
        "Compresión: distinguir vena (colapsa) vs arteria (no colapsa)",
      ],
      tips: [
        "Marcador del haz: define izquierda en pantalla y orientación del corte",
        "Ganancia: tejido sólido gris medio; líquido anecoico; gas = artefacto en reverberación",
        "Profundidad: estructura diana en el tercio medio de la pantalla",
        "Foco en la profundidad de la estructura que buscas",
        "Congelar imagen solo para medir, no para decidir en dinámica cardíaca",
      ],
      errores: [
        "Confundir izquierda/derecha del paciente con la pantalla",
        "Ganancia excesiva: imagen blanca y sin detalle",
        "Ángulo >60° en Doppler pulsado sin corrección",
        "Interpretar artefacto de reverberación como consolidación",
        "No identificar el transductor adecuado para la profundidad",
      ],
    },
    hallazgos: {
      normal: [
        "Tejido homogéneo con ecogenicidad esperada",
        "Líquido libre anecoico sin ecos internos",
        "Vena comprimible; arteria no compresible",
        "Deslizamiento pleural en M-mode (señal de arena)",
      ],
      patologico: [
        "Sombra acústica posterior (cálculo, gas)",
        "Reverberación en línea pleural patológica",
        "Aliasing en Doppler color (flujo muy alto)",
        "Material ecogénico intraluminal que no colapsa (trombo)",
      ],
    },
    pocketCard: [
      "B = anatomía estática",
      "M = movimiento en el tiempo (1 línea)",
      "Color = localizar flujo",
      "Pulsado = Vmax (ángulo ≤60°)",
      "Vena comprimible / arteria no",
    ],
  },
  "fast-efast": {
    cuandoUsar: [
      "Trauma con inestabilidad hemodinámica",
      "Sospecha de hemoperitoneo o hemotórax",
      "eFAST si hay sospecha de neumotórax o hemotórax",
    ],
    limitaciones: [
      "FAST negativo no descarta lesión activa",
      "Obesidad y subcutáneo limitan ventanas",
    ],
    adquisicion: {
      sonda: "Curva (abdominal) + lineal (pleura)",
      preset: "Abdominal / eFAST",
      ventanas: [
        "Subxifoidea (pericardio)",
        "RUQ — Morrison",
        "LUQ — esplenorenal",
        "Pelvis — Douglas / rectovesical",
        "Hemitorax bilateral (eFAST)",
      ],
      tips: [
        "Paciente supino; barriga hacia arriba en LUQ",
        "Desliza desde pericardio hacia ápices pulmonares",
        "Signo de la columna: líquido pleural vs pulmón aireado",
      ],
      errores: [
        "No inclinar suficiente en subxifoideo",
        "Confundir estómago lleno con líquido libre",
        "Omitir cortes superiores en tórax",
      ],
    },
    hallazgos: {
      normal: ["Sin líquido en interfaces", "Deslizamiento pleural presente", "Sin línea pleural patológica"],
      patologico: [
        "Líquido anecoico en Morrison o Douglas",
        "Hemotórax: consolidación + signo de columna",
        "Neumotórax: ausencia de deslizamiento",
      ],
    },
    pocketCard: [
      "4 ventanas + pleuras si eFAST",
      "Líquido = anecoico en interfaces",
      "Inestable + FAST+ → cirugía / control",
      "eFAST: neumotórax antes de ventilar",
    ],
  },
  "pulmonar-blue": {
    cuandoUsar: [
      "Disnea aguda o insuficiencia respiratoria",
      "Diferencial: EAP, TEP, neumonía, asma/EPOC",
    ],
    limitaciones: [
      "Obesidad y enfisema reducen sensibilidad",
      "Consolidación extensa puede simular patrón B",
    ],
    adquisicion: {
      sonda: "Lineal o curva",
      preset: "Pulmonar / vascular superficial",
      ventanas: [
        "Puntos BLUE anteriores bilaterales",
        "Puntos laterales (PLAPS)",
        "Ventana cardíaca para función global",
      ],
      tips: [
        "Busca líneas A (horizontal) vs B (cometa)",
        "Deslizamiento pleural bilateral",
        "Consolidación: hepatización + broncograma",
      ],
      errores: [
        "Presión excesiva del transductor",
        "Confundir zona Z con consolidación",
        "No valorar ambos hemitórax",
      ],
    },
    hallazgos: {
      normal: ["Líneas A dominantes", "Deslizamiento presente", "Sin consolidación focal"],
      patologico: [
        "Líneas B difusas bilaterales (EAP)",
        "Consolidación lobar (neumonía)",
        "Perfil A + derrame pleural (TEP)",
      ],
    },
    pocketCard: [
      "A = aireado; B = intersticial/alveolar",
      "BLUE: perfil A vs B por lado",
      "PLAPS: consolidación posterolateral",
      "Integrar con función cardíaca",
    ],
  },
  "eco-critico": {
    cuandoUsar: [
      "Shock, hipotensión o disnea con sospecha cardíaca",
      "Antes y después de fluidos / vasopresores",
      "Sospecha de taponamiento o TEP",
    ],
    limitaciones: [
      "Ventana limitada en EPOC / obesidad",
      "FE visual es subjetiva — practica estimación",
    ],
    adquisicion: {
      sonda: "Sectorial (fase array)",
      preset: "Cardíaco",
      ventanas: [
        "Subxifoidea (SC)",
        "Paraesternal eje largo y corto (PLAX / PSAX)",
        "Apical 4 cámaras (A4C)",
        "IVC subxifoidea",
      ],
      tips: [
        "Inclina sectorial hacia cabeza derecha del paciente",
        "PSAX papilar para FE visual",
        "Derrame: espacio anecoico pericárdico",
      ],
      errores: [
        "Confundir grasa pericárdica con derrame",
        "No valorar cavidades derecha e izquierda",
        "IVC sin medir colapsabilidad",
      ],
    },
    hallazgos: {
      normal: [
        "FE visual >45%",
        "Cavidades proporcionadas",
        "IVC 1.5–2 cm con colapso inspiratorio",
      ],
      patologico: [
        "Hipocinesia difusa",
        "Derrame pericárdico / taponamiento",
        "Dilatación VD + septo hacia VI",
      ],
    },
    pocketCard: [
      "FE visual: mitral → septo",
      "Derrame: anecoico rodeando corazón",
      "RV > LV → sobrecarga derecha",
      "IVC dilatada → congestión / bajo volumen según contexto",
    ],
  },
  "accesos-vasculares": {
    cuandoUsar: [
      "Vía central o periférica difícil",
      "Paciente crítico que requiere acceso urgente",
    ],
    limitaciones: [
      "Emergencia no debe retrasar procedimiento vital",
      "Trombosis o anatomía variantes",
    ],
    adquisicion: {
      sonda: "Lineal de alta frecuencia",
      preset: "Vascular / MSK superficial",
      ventanas: [
        "Vena yugular interna (VCI)",
        "Vena femoral común",
        "Vena periférica antebraquial",
      ],
      tips: [
        "Vena comprimible, arteria pulsátil",
        "In-plane vs out-of-plane según experiencia",
        "Confirma guía en lumen antes de pasar alambre",
      ],
      errores: [
        "Punción arterial por error",
        "Ángulo demasiado oblicuo",
        "No visualizar punta de aguja",
      ],
    },
    hallazgos: {
      normal: ["Vena colapsa con presión", "Aguja visible en lumen", "Sin hematoma expansivo"],
      patologico: ["Trombo intraluminal", "Punción arterial", "Neumotórax iatrogénico (VCI alta)"],
    },
    pocketCard: [
      "Vena = comprimible",
      "Aguja visible en todo el trayecto",
      "Confirma en lumen antes de dilatar",
      "Comprime si sangrado local",
    ],
  },
  "respuesta-volumen": {
    cuandoUsar: [
      "Shock no diferenciado",
      "Decisión de fluidos vs vasopresores",
      "Antes/después de carga de volumen",
    ],
    limitaciones: [
      "IVC sola no predice siempre respuesta",
      "Ventilación mecánica altera dinámica",
    ],
    adquisicion: {
      sonda: "Sectorial + curva",
      preset: "Cardíaco + abdominal",
      ventanas: [
        "FE visual y tamaño cavidades",
        "IVC: diámetro y variación",
        "FAST si shock hemorrágico",
        "Lung sliding si obstructivo",
      ],
      tips: [
        "Integra bomba + tanque + tuberías",
        "IVC pequeña y colapsable → hipovolemia",
        "IVC dilatada fija → obstructivo / cardiogénico",
      ],
      errores: [
        "Fluidos solo por IVC dilatada",
        "No repetir tras intervención",
        "Ignorar sobrecarga derecha",
      ],
    },
    hallazgos: {
      normal: ["FE acorde al cuadro clínico", "IVC coherente con volemia", "Sin líquido libre masivo"],
      patologico: [
        "FE severamente reducida",
        "VD dilatado con septo plano",
        "Líquido libre en FAST",
      ],
    },
    pocketCard: [
      "Hipovolémico: IVC colapsable + FE alta",
      "Cardiogénico: FE baja + congestión",
      "Obstructivo: VD dilatado / taponamiento",
      "Hemorrágico: FAST+ + IVC colapsada",
    ],
  },
  "weaning-diafragma": {
    cuandoUsar: [
      "Antes de prueba de respiración espontánea o extubación",
      "Tras fracaso de extubación para buscar debilidad diafragmática",
      "En VM prolongada con sospecha de disfunción diafragmática",
      "Paciente con enfermedad neuromuscular o sepis prolongada en UCI",
    ],
    limitaciones: [
      "PEEP, presión de soporte y sedación alteran la excursión",
      "Asincronía ventilatoria puede falsear M-mode",
      "Hernia diafragmática o derrame subpulmonar limitan la medida",
      "Umbral de 10 mm no es absoluto — usar con criterios clínicos",
    ],
    adquisicion: {
      sonda: "Curva 2–5 MHz o lineal en hipocondrio derecho",
      preset: "Abdominal / diafragma — baja profundidad inicial",
      ventanas: [
        "Hipocondrio derecho: hígado como ventana acústica",
        "Visualizar línea diafragmática y pleura en modo B",
        "M-mode perpendicular a la línea diafragmática",
        "Opcional: espesor diafragmático en espiración (lateral a la línea de excursión)",
      ],
      tips: [
        "Medir en espiración tranquila o P0.1 según protocolo local",
        "Excursión = distancia máxima de movimiento en M-mode (mm)",
        "Excursión ≥10 mm asociada a mejor éxito de destete en series",
        "Espesor <2 mm sugiere atrofia; >2.5 mm más favorable",
        "Documentar lado y condición ventilatoria al medir",
      ],
      errores: [
        "Confundir desplazamiento del hígado con excursión diafragmática",
        "Medir con bloqueo neuromuscular o sedación profunda",
        "No alinear M-mode perpendicular al diafragma",
        "Extubar solo por un número sin RSBI ni secreciones",
      ],
    },
    hallazgos: {
      normal: [
        "Excursión ≥10 mm en M-mode (contexto clínico favorable)",
        "Movimiento caudal del diafragma en inspiración",
        "Espesor diafragmático conservado si se mide",
      ],
      patologico: [
        "Excursión <10 mm",
        "Movimiento paradójico (diafragma sube en inspiración)",
        "Asincronía marcada con esfuerzo inspiratorio",
      ],
    },
    pocketCard: [
      "M-mode: excursión en mm",
      "≥10 mm favorable (no aislado)",
      "<10 mm: alto riesgo",
      "RSBI + secreciones + gasometría",
    ],
  },
  "neuro-pocus": {
    cuandoUsar: [
      "Trauma craneoencefálico cuando la TC no está inmediata",
      "Deterioro neurológico con sospecha de hipertensión intracraneal",
      "Vasoespasmo post-HSA (seguimiento con TCD)",
      "Coma de causa no clara con pupilas o postura anormal",
    ],
    limitaciones: [
      "Ventana temporal ausente post craneotomía o hematoma",
      "TCD requiere práctica y ventana acústica adecuada",
      "ONS no sustituye TC ni monitoreo invasivo de PIC",
      "Edema periorbitario o fractura impiden ONS",
    ],
    adquisicion: {
      sonda: "Lineal 7–12 MHz (ONS); sectorial o Doppler 2 MHz (TCD)",
      preset: "Ocular / vascular / transcraneal según equipo",
      ventanas: [
        "ONS: corte transversal del nervio óptico, 3 mm posterior al globo",
        "TCD: ventana temporal — arteria cerebral media (ACM)",
        "Opcional: arteria carótida interna terminal y ACA",
      ],
      tips: [
        "ONS: medir diámetro interno máximo de la vaina (no el nervio)",
        "Umbral clínico habitual ONS >6 mm para HIC",
        "TCD: comparar velocidad media y PI entre hemisferios",
        "Asimetría >20% en velocidad sugiere vasoespasmo o HIC focal",
        "Mínima presión sobre el globo; gel abundante",
      ],
      errores: [
        "Medir el diámetro del nervio óptico en lugar de la vaina",
        "Un solo corte sin repetir medición",
        "Interpretar ONS elevado sin correlación clínica ni TC",
        "Ángulo incorrecto en TCD invalida velocidades",
      ],
    },
    hallazgos: {
      normal: [
        "ONS ≤6 mm bilateral",
        "Velocidades simétricas en ACM",
        "PI dentro de rango esperado para el contexto",
      ],
      patologico: [
        "ONS >6 mm",
        "ONS asimétrico >0.2 mm entre ojos",
        "Velocidad media ACM elevada o asimetría >20%",
        "PI muy bajo o muy alto según patología",
      ],
    },
    pocketCard: [
      "ONS >6 mm → HIC probable",
      "TCD: asimetría >20%",
      "Siempre TC + clínica",
      "No retrasar manejo quirúrgico",
    ],
  },
  vexus: {
    cuandoUsar: [
      "Sospecha de congestión venosa sistémica",
      "Antes de más fluidos en UCI",
    ],
    limitaciones: [
      "Requiere Doppler pulsado",
      "No sustituye evaluación clínica completa",
    ],
    adquisicion: {
      sonda: "Curva o sectorial",
      preset: "Abdominal / vascular",
      ventanas: [
        "IVC long axis",
        "Vena hepática → Doppler",
        "Vena porta — pulsatilidad",
        "Venas intrarrenales",
      ],
      tips: [
        "Si IVC <2 cm → VExUS 0, detener",
        "Doppler hepático: onda S vs D",
        "Pulsatilidad portal >30% = anormal",
      ],
      errores: [
        "Usar solo IVC para congestión",
        "Mala alineación del Doppler",
      ],
    },
    hallazgos: {
      normal: ["IVC <2 cm", "Flujo portal continuo", "Patrón renal bifásico normal"],
      patologico: [
        "IVC ≥2 cm + ondas D > S en hepática",
        "Pulsatilidad portal marcada",
        "Flujo renal monofásico",
      ],
    },
    pocketCard: [
      "IVC ≥2 cm → evaluar venas",
      "Grado 0–3 según patrón Doppler",
      "Alto grado: restricción de fluidos",
    ],
  },
  "integracion-casos": {
    cuandoUsar: [
      "Cierre del curso SonoCrítico MX",
      "Simulación de escenarios reales de UCI y urgencias",
      "Entrenamiento en comunicación de hallazgos al equipo",
      "Repaso antes de evaluación final o rotación",
    ],
    limitaciones: [
      "Casos simulados — no sustituyen práctica supervisada en paciente real",
      "POCUS complementa, no reemplaza, el examen físico y estudios formales",
      "Un hallazgo aislado no define el manejo sin contexto clínico",
    ],
    adquisicion: {
      sonda: "Lineal + curva + sectorial según sistemas a evaluar",
      preset: "Cambiar según región: pulmonar, cardíaco, abdominal, vascular",
      ventanas: [
        "Trauma inestable → FAST/eFAST",
        "Disnea → BLUE + eco básica",
        "Shock → RUSH",
        "Oliguria/congestión → VExUS + IVC",
        "Acceso difícil → guía vascular",
      ],
      tips: [
        "ABCDE primero; POCUS en paralelo si no retrasa maniobras salvadoras",
        "Elegir UN protocolo primario según la pregunta clínica",
        "Segundo protocolo solo si el cuadro no se explica",
        "Repetir POCUS tras fluidos, vasopresores o procedimientos",
        "Verbalizar: ventana, hallazgo, implicación, plan",
      ],
      errores: [
        "Protocolo completo sin indicación (FAST en asma leve)",
        "Retrasar descompresión o cirugía por buscar más ventanas",
        "No reevaluar después de la intervención",
        "Omitir correlación con lactato, gasometría y orina",
      ],
    },
    hallazgos: {
      normal: [
        "Hallazgos concordantes entre sistemas evaluados",
        "Mejoría ecográfica tras tratamiento dirigido",
      ],
      patologico: [
        "Shock con pump/tank/pipes alterados de forma coherente",
        "Disnea con perfil B + FE baja (cardiogénico)",
        "Trauma con líquido libre + inestabilidad",
        "Congestión VExUS 3 con oliguria",
      ],
    },
    pocketCard: [
      "Pregunta clínica → protocolo",
      "Inestable: maniobras antes que US prolongado",
      "Repetir US post-intervención",
      "Casos en /casos del curso",
    ],
  },
};

/** Imágenes curadas por módulo (además de las del protocolo asociado) */
const moduleImageMap: Record<string, string[]> = {
  fundamentos: ["img-13", "img-02", "img-15", "img-16"],
  "fast-efast": ["img-01", "img-02", "img-03", "img-04"],
  "pulmonar-blue": ["img-05", "img-06", "img-07"],
  "eco-critico": ["img-13", "img-14", "img-10"],
  "accesos-vasculares": ["img-15", "img-16", "img-17"],
  "respuesta-volumen": ["img-08", "img-09", "img-10", "img-17", "img-18"],
  "weaning-diafragma": ["img-05", "img-09", "img-13", "img-19"],
  "neuro-pocus": ["img-10", "img-20", "img-11"],
  vexus: ["img-11", "img-12", "img-09"],
  "integracion-casos": ["img-06", "img-09", "img-03", "img-11", "img-15"],
};

export function getModuleContent(slug: string): ModuleContentDetail {
  const mod = getModule(slug);
  const base = contentBySlug[slug];
  if (base) return base;

  return {
    cuandoUsar: [mod?.subtitle ?? "Indicación clínica del módulo"],
    limitaciones: ["Revisar módulos previos del curso para contexto completo"],
    adquisicion: {
      sonda: "Según región anatómica",
      preset: "Preset adecuado",
      ventanas: ["Por definir en práctica guiada"],
      tips: ["Revisar módulos previos del curso"],
      errores: [],
    },
    hallazgos: { normal: [], patologico: [] },
    pocketCard: [mod?.summary ?? ""],
  };
}

export function getModuleImageIds(slug: string): string[] {
  const mod = getModule(slug);
  if (!mod) return [];
  const ids = new Set<string>(moduleImageMap[slug] ?? []);
  for (const ps of mod.protocolSlugs) {
    const proto = getProtocol(ps);
    proto?.imageIds.forEach((id) => ids.add(id));
  }
  return Array.from(ids);
}
