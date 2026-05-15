import type { ChecklistItem, FlowNode, Protocol } from "@/types";
import { getModule } from "@/lib/course-modules";

export interface ModulePractice {
  checklistItems: ChecklistItem[];
  flowNodes: FlowNode[];
}

const practiceBySlug: Record<string, ModulePractice> = {
  fundamentos: {
    checklistItems: [
      { id: "fund-1", label: "Transductor identificado (lineal vs curva/sectorial)", required: true },
      { id: "fund-2", label: "Marcador del haz orientado en pantalla", required: true },
      { id: "fund-3", label: "Modo B: ganancia y profundidad ajustadas", required: true },
      { id: "fund-4", label: "Modo M obtenido sobre estructura en movimiento", required: true },
      { id: "fund-5", label: "Doppler color: sector y ángulo de insonación <60°", required: true },
      { id: "fund-6", label: "Doppler pulsado: curva y Vmax interpretables", required: true },
      { id: "fund-7", label: "Imagen guardada o hallazgo verbalizado al equipo", required: true },
    ],
    flowNodes: [
      {
        id: "fn1",
        label: "¿Qué necesitas evaluar?",
        type: "question",
        description: "Anatomía estática, movimiento o flujo.",
        children: ["fn2", "fn3", "fn4"],
        x: 300,
        y: 40,
      },
      {
        id: "fn2",
        label: "Modo B",
        type: "action",
        clinicalAction: "Ajustar profundidad, ganancia y foco en la estructura diana.",
        children: ["fn5"],
        x: 80,
        y: 160,
      },
      {
        id: "fn3",
        label: "Modo M",
        type: "action",
        clinicalAction: "Colocar línea M sobre válvula, diafragma o pleura.",
        children: ["fn5"],
        x: 300,
        y: 160,
      },
      {
        id: "fn4",
        label: "Doppler",
        type: "action",
        clinicalAction: "Color para localizar; pulsado para cuantificar (ángulo ≤60°).",
        children: ["fn5"],
        x: 520,
        y: 160,
      },
      {
        id: "fn5",
        label: "¿Imagen diagnóstica?",
        type: "question",
        children: ["fn6", "fn7"],
        x: 300,
        y: 280,
      },
      {
        id: "fn6",
        label: "Sí — documentar",
        type: "endpoint",
        clinicalAction: "Captura o verbaliza hallazgo; continúa protocolo clínico.",
        children: [],
        x: 160,
        y: 380,
      },
      {
        id: "fn7",
        label: "No — optimizar ventana",
        type: "endpoint",
        clinicalAction: "Cambiar transductor, posición del paciente o ventana.",
        children: [],
        x: 440,
        y: 380,
      },
    ],
  },
  "weaning-diafragma": {
    checklistItems: [
      { id: "wean-1", label: "Paciente con ventilación mecánica y prueba de respiración espontánea planificada", required: true },
      { id: "wean-2", label: "Ventana diafragmática derecha con hígado como acústico", required: true },
      { id: "wean-3", label: "Excursión diafragmática medida en M-mode (mm)", required: true },
      { id: "wean-4", label: "Espesor diafragmático en espiración medido (opcional)", required: false },
      { id: "wean-5", label: "Movimiento paradójico descartado o documentado", required: true },
      { id: "wean-6", label: "Resultado integrado con RSBI, gasometría y clínica", required: true },
    ],
    flowNodes: [
      {
        id: "wn1",
        label: "Prueba de destete",
        type: "question",
        description: "Evaluar función diafragmática antes de extubar.",
        children: ["wn2"],
        x: 300,
        y: 40,
      },
      {
        id: "wn2",
        label: "Medir excursión (M-mode)",
        type: "action",
        clinicalAction: "Hipocondrio derecho; línea M perpendicular al diafragma.",
        children: ["wn3", "wn4"],
        x: 300,
        y: 140,
      },
      {
        id: "wn3",
        label: "Excursión ≥10 mm",
        type: "finding",
        description: "Buen predictor de éxito de extubación (contexto clínico).",
        clinicalAction: "Continuar destete según protocolo de UCI.",
        children: ["wn6"],
        x: 120,
        y: 260,
      },
      {
        id: "wn4",
        label: "Excursión <10 mm",
        type: "finding",
        description: "Alto riesgo de fracaso; valorar espesor y paradójico.",
        clinicalAction: "Posponer extubación; optimizar debilidad/fatiga.",
        children: ["wn5"],
        x: 480,
        y: 260,
      },
      {
        id: "wn5",
        label: "¿Paradójico o asincronía?",
        type: "question",
        children: ["wn7", "wn6"],
        x: 480,
        y: 360,
      },
      {
        id: "wn6",
        label: "Destete favorable",
        type: "endpoint",
        clinicalAction: "Mantener vigilancia post-extubación 24–48 h.",
        children: [],
        x: 300,
        y: 480,
      },
      {
        id: "wn7",
        label: "Retrasar extubación",
        type: "endpoint",
        clinicalAction: "Rehabilitación, ajuste ventilatorio, reevaluar en 24 h.",
        children: [],
        x: 520,
        y: 480,
      },
    ],
  },
  "neuro-pocus": {
    checklistItems: [
      { id: "neuro-1", label: "Indicación clínica documentada (TCE, HIC, deterioro neurológico)", required: true },
      { id: "neuro-2", label: "ONS medido bilateral (3 mm posterior al globo)", required: true },
      { id: "neuro-3", label: "Diámetro ONS registrado (mm) y lado comparado", required: true },
      { id: "neuro-4", label: "TCD: ventana temporal y ACM identificada", required: true },
      { id: "neuro-5", label: "Velocidades o PI comparados entre lados si aplica", required: true },
      { id: "neuro-6", label: "Hallazgos correlacionados con TC/clínica", required: true },
    ],
    flowNodes: [
      {
        id: "nn1",
        label: "Sospecha de HIC",
        type: "question",
        children: ["nn2"],
        x: 300,
        y: 40,
      },
      {
        id: "nn2",
        label: "Medir ONS",
        type: "action",
        clinicalAction: "Transversal; 3 mm detrás del globo; medir diámetro máximo.",
        children: ["nn3", "nn4"],
        x: 300,
        y: 140,
      },
      {
        id: "nn3",
        label: "ONS ≤6 mm",
        type: "finding",
        description: "Presión intracraneal elevada poco probable por ONS.",
        children: ["nn6"],
        x: 120,
        y: 260,
      },
      {
        id: "nn4",
        label: "ONS >6 mm",
        type: "finding",
        description: "Sugiere hipertensión intracraneal; correlacionar con TC.",
        clinicalAction: "Neurocirugía / manejo de PIC según protocolo.",
        children: ["nn5"],
        x: 480,
        y: 260,
      },
      {
        id: "nn5",
        label: "TCD complementario",
        type: "action",
        clinicalAction: "ACM: velocidad media, PI, asimetría >20%.",
        children: ["nn6"],
        x: 480,
        y: 360,
      },
      {
        id: "nn6",
        label: "Plan neurocrítico",
        type: "endpoint",
        clinicalAction: "Integrar POCUS con TC, PIC y meta de perfusión.",
        children: [],
        x: 300,
        y: 460,
      },
    ],
  },
  "integracion-casos": {
    checklistItems: [
      { id: "int-1", label: "ABCDE y estabilización antes de POCUS prolongado", required: true },
      { id: "int-2", label: "Protocolo primario elegido según presentación", required: true },
      { id: "int-3", label: "Segundo protocolo si el cuadro no se explica", required: false },
      { id: "int-4", label: "Hallazgos verbalizados al equipo con lenguaje estándar", required: true },
      { id: "int-5", label: "Reevaluación ecográfica tras intervención", required: true },
      { id: "int-6", label: "Caso clínico del curso completado o revisado", required: true },
    ],
    flowNodes: [
      {
        id: "in1",
        label: "Presentación clínica",
        type: "question",
        children: ["in2", "in3", "in4", "in5"],
        x: 300,
        y: 40,
      },
      {
        id: "in2",
        label: "Trauma / inestable",
        type: "action",
        clinicalAction: "FAST / eFAST primero.",
        children: ["in6"],
        x: 60,
        y: 160,
      },
      {
        id: "in3",
        label: "Disnea aguda",
        type: "action",
        clinicalAction: "BLUE + eco básica.",
        children: ["in6"],
        x: 200,
        y: 160,
      },
      {
        id: "in4",
        label: "Shock",
        type: "action",
        clinicalAction: "RUSH (pump-tank-pipes).",
        children: ["in6"],
        x: 340,
        y: 160,
      },
      {
        id: "in5",
        label: "Oliguria / congestión",
        type: "action",
        clinicalAction: "VExUS + IVC.",
        children: ["in6"],
        x: 480,
        y: 160,
      },
      {
        id: "in6",
        label: "¿Diagnóstico y plan?",
        type: "question",
        children: ["in7"],
        x: 300,
        y: 280,
      },
      {
        id: "in7",
        label: "Caso + seguimiento",
        type: "endpoint",
        clinicalAction: "Completar caso en /casos; reevaluar con POCUS dirigido.",
        children: [],
        x: 300,
        y: 380,
      },
    ],
  },
};

export function getModulePractice(slug: string): ModulePractice | undefined {
  return practiceBySlug[slug];
}

/** Pseudo-protocol for shared flow/checklist panels on modules without protocolSlugs */
export function getModulePracticeProtocol(slug: string): Protocol | null {
  const practice = getModulePractice(slug);
  const mod = getModule(slug);
  if (!practice || !mod) return null;

  return {
    slug: `mod-${slug}`,
    title: mod.title,
    indication: mod.subtitle,
    icon: mod.icon,
    category: "procedimiento",
    color: "#8FA7C4",
    estimatedMinutes: mod.estimatedMinutes,
    difficulty: 2,
    imageIds: [],
    quizIds: [],
    checklistItems: practice.checklistItems,
    flowNodes: practice.flowNodes,
  };
}

export function getModuleChecklistKey(slug: string): string {
  return `mod-${slug}`;
}
