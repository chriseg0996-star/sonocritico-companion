import type { FrequentErrorTraining } from "@/lib/training/types";

/** Casos iniciales — Pulmón (F3.5C). */
export const LUNG_FREQUENT_ERRORS: FrequentErrorTraining[] = [
  {
    id: "lung-false-b-lines-artifact",
    module: "lung",
    error: "Líneas B falsas por artefacto",
    why: [
      "Reverberación de pared o línea pleural engrosada simula cometas.",
      "Ganancia alta y zona no óptima del haz.",
    ],
    avoid: [
      "Confirmar origen pleural y movimiento con ventilación.",
      "Comparar campos homólogos y bajar ganancia.",
      "Correlacionar con clínica y patrón A/B en BLUE.",
    ],
    mediaIds: ["lung-b-lines"],
    exampleMediaId: "lung-b-lines",
    protocolSlug: "blue",
    protocolStepId: "pattern",
  },
  {
    id: "lung-no-sliding-apnea",
    module: "lung",
    error: "Ausencia de sliding por apnea / intubación selectiva",
    why: [
      "Sin ventilación alveolar no hay deslizamiento pleural dinámico.",
      "Bloqueo bronquial o ventilación muy asimétrica.",
    ],
    avoid: [
      "Observar varios ciclos respiratorios antes de concluir.",
      "Valorar modo ventilatorio y presiones.",
      "No diagnosticar neumotórax solo por ausencia transitoria de sliding.",
    ],
    mediaIds: ["lung-a-lines"],
    exampleMediaId: "lung-a-lines",
    protocolSlug: "blue",
    protocolStepId: "sliding",
  },
  {
    id: "lung-effusion-vs-consolidation",
    module: "lung",
    error: "Confundir derrame con consolidación",
    why: [
      "Colección anecoica basal puede parecer hepatización en mala ventana.",
      "Consolidación puede tener componente hídrico mixto.",
    ],
    avoid: [
      "Barrer costofrénico y PLAPS con paciente sentado si es posible.",
      "Buscar broncograma aéreo dinámico (consolidación).",
      "Integrar con síntomas y radiografía si hay duda.",
    ],
    mediaIds: ["lung-pleural-effusion", "lung-consolidation"],
    exampleMediaId: "lung-pleural-effusion",
    protocolSlug: "blue",
    protocolStepId: "plaps",
  },
  {
    id: "lung-plaps-no-context",
    module: "lung",
    error: "PLAPS sin contexto clínico",
    why: [
      "Hallazgo posterior aislado sin correlación anterior.",
      "Sobreinterpretar una sola zona posterolateral.",
    ],
    avoid: [
      "Completar BLUE anterior antes de PLAPS.",
      "Integrar fiebre, secreciones y laboratorio.",
      "Repetir exploración tras tratamiento si evolución dudosa.",
    ],
    mediaIds: ["lung-plaps"],
    exampleMediaId: "lung-plaps",
    protocolSlug: "blue",
    protocolStepId: "plaps",
  },
  {
    id: "lung-false-lung-point-adhesions",
    module: "lung",
    error: "Lung point falso por adherencias",
    why: [
      "Pleurodesis o adherencias generan transiciones que imitan el punto.",
      "Movimiento parietal puede simular borde de sliding.",
    ],
    avoid: [
      "Confirmar ausencia real de sliding en zona con sospecha de NTX.",
      "Explorar múltiples puntos y hemitórax contralateral.",
      "Correlacionar con clínica, Rx y estabilidad hemodinámica.",
    ],
    mediaIds: ["lung-lung-point"],
    exampleMediaId: "lung-lung-point",
    protocolSlug: "blue",
    protocolStepId: "result-pnx",
  },
];
