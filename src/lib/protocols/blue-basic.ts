import type { Protocol } from "@/lib/protocols/types";

/** BLUE básico — disnea → sliding → patrón → PLAPS → interpretación. */
export const blueBasicProtocol: Protocol = {
  id: "blue-basic",
  slug: "blue",
  title: "BLUE básico",
  subtitle: "Disnea aguda — perfil A/B, sliding y PLAPS",
  tag: "Pulmonar",
  estimatedMinutes: 12,
  startStepId: "disnea",
  stepperSteps: [
    { id: "disnea", label: "Disnea" },
    { id: "sliding", label: "Sliding" },
    { id: "pattern", label: "A / B lines" },
    { id: "plaps", label: "PLAPS" },
  ],
  steps: {
    disnea: {
      id: "disnea",
      kind: "question",
      title: "Disnea aguda",
      question: "Paciente con disnea aguda o insuficiencia respiratoria.",
      context: "Inicia el protocolo BLUE en puntos anteriores bilaterales antes de laterales (PLAPS).",
      decisions: [
        {
          id: "start",
          label: "Iniciar evaluación BLUE",
          nextStepId: "sliding",
        },
      ],
    },
    sliding: {
      id: "sliding",
      kind: "question",
      title: "Deslizamiento pleural",
      question: "¿Deslizamiento pleural presente (bilateral o en el lado sintomático)?",
      decisions: [
        {
          id: "yes",
          label: "Sí — hay sliding",
          hint: "Descarta neumotórax en ese lado",
          nextStepId: "pattern",
        },
        {
          id: "no",
          label: "No — sliding ausente",
          hint: "Priorizar neumotórax hasta demostrar lo contrario",
          nextStepId: "result-pnx",
        },
      ],
    },
    pattern: {
      id: "pattern",
      kind: "question",
      title: "Patrón intersticial",
      question: "¿Patrón predominante en puntos BLUE anteriores?",
      decisions: [
        {
          id: "a-lines",
          label: "Líneas A predominantes",
          hint: "Patrón A en campos explorados",
          nextStepId: "plaps",
        },
        {
          id: "b-lines",
          label: "Líneas B (≥3 por campo)",
          hint: "Edema intersticial / alveolar",
          nextStepId: "result-b-profile",
        },
        {
          id: "mixed",
          label: "Mixto o focal",
          hint: "Explorar zonas homólogas y laterales",
          nextStepId: "plaps",
        },
      ],
    },
    plaps: {
      id: "plaps",
      kind: "question",
      title: "PLAPS",
      question: "¿PLAPS presente? (consolidación con broncograma en puntos laterales/posteriores)",
      decisions: [
        {
          id: "yes",
          label: "Sí — consolidación (PLAPS+)",
          nextStepId: "result-consolidation",
        },
        {
          id: "no",
          label: "No — sin consolidación",
          hint: "Con perfil A predominante",
          nextStepId: "result-a-profile",
        },
      ],
    },
    "result-pnx": {
      id: "result-pnx",
      kind: "result",
      title: "Interpretación sugerida",
      interpretation:
        "Sliding ausente: tratar como neumotórax probable hasta demostrar lo contrario. Buscar lung point; correlacionar con clínica y Rx.",
      actions: [
        {
          id: "clinical-pnx",
          kind: "clinical",
          label: "Acción clínica",
          detail: "Evitar VMNI hasta descartar PNX; considerar descompresión si inestable.",
        },
        {
          id: "atlas-lung-point",
          kind: "atlas",
          label: "Ver lung point en atlas",
          href: "/biblioteca?media=lung-lung-point",
        },
        {
          id: "atlas-sliding",
          kind: "atlas",
          label: "Ver sliding pleural",
          href: "/biblioteca?media=lung-pleural-effusion",
        },
      ],
    },
    "result-a-profile": {
      id: "result-a-profile",
      kind: "result",
      title: "Interpretación sugerida",
      interpretation:
        "Perfil A sin consolidación: orientar a TEP, asma/EPOC exacerbado o causa no cardiogénica. Valorar eco cardíaca y DVT si el contexto lo sugiere.",
      actions: [
        {
          id: "clinical-a",
          kind: "clinical",
          label: "Acción clínica",
          detail: "Anticoagulación si TEP probable; broncodilatadores/esteroides si obstructivo.",
        },
        {
          id: "atlas-a",
          kind: "atlas",
          label: "Ver líneas A",
          href: "/biblioteca?media=lung-a-lines",
        },
        {
          id: "calc-lus",
          kind: "calculator",
          label: "Calculadora LUS / BLUE",
          href: "/herramientas/lus",
        },
      ],
    },
    "result-b-profile": {
      id: "result-b-profile",
      kind: "result",
      title: "Interpretación sugerida",
      interpretation:
        "Perfil B: edema intersticial/alveolar. Diferencial EAP vs neumonía — estimar función ventricular y buscar consolidación (PLAPS).",
      actions: [
        {
          id: "clinical-b",
          kind: "clinical",
          label: "Acción clínica",
          detail: "Si EAP: diuréticos, VMNI, control de volemia. Si neumonía: antibiótico y soporte.",
        },
        {
          id: "atlas-b",
          kind: "atlas",
          label: "Ver líneas B",
          href: "/biblioteca?media=lung-b-lines",
        },
        {
          id: "calc-lus",
          kind: "calculator",
          label: "Calculadora LUS / BLUE",
          href: "/herramientas/lus",
        },
      ],
    },
    "result-consolidation": {
      id: "result-consolidation",
      kind: "result",
      title: "Interpretación sugerida",
      interpretation:
        "PLAPS positivo: consolidación — neumonía, atelectasia u otra causa alveolar. Correlacionar con fiebre, secreciones y laboratorio.",
      actions: [
        {
          id: "clinical-cons",
          kind: "clinical",
          label: "Acción clínica",
          detail: "Antibiótico empírico según contexto; fisioterapia respiratoria si atelectasia.",
        },
        {
          id: "atlas-cons",
          kind: "atlas",
          label: "Ver consolidación",
          href: "/biblioteca?media=lung-consolidation",
        },
        {
          id: "atlas-plaps",
          kind: "atlas",
          label: "Ver PLAPS",
          href: "/biblioteca?media=lung-plaps",
        },
      ],
    },
  },
};
