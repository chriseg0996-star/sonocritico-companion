import type { Protocol } from "@/lib/protocols/types";

const atlas = (mediaId: string) => `/biblioteca?media=${mediaId}`;

/** FAST / eFAST — trauma → inestabilidad → 4 ventanas → pleuras → interpretación. */
export const fastEfastProtocol: Protocol = {
  id: "fast-efast",
  slug: "fast",
  title: "FAST / eFAST",
  subtitle: "Trauma — líquido libre, pericardio y pleuras",
  tag: "Abdomen / trauma",
  estimatedMinutes: 15,
  startStepId: "trauma",
  stepperSteps: [
    { id: "trauma", label: "Trauma" },
    { id: "instability", label: "Inestable" },
    { id: "ruq", label: "RUQ" },
    { id: "luq", label: "LUQ" },
    { id: "pelvis", label: "Pelvis" },
    { id: "subxiphoid", label: "Subxifoidea" },
    { id: "efast-right", label: "Pleura D" },
    { id: "efast-left", label: "Pleura I" },
  ],
  steps: {
    trauma: {
      id: "trauma",
      kind: "question",
      title: "Trauma",
      question: "Paciente con trauma contuso o penetrante. ¿Indicación de FAST/eFAST?",
      context: "Priorizar en inestabilidad hemodinámica o mecanismo de alto riesgo antes de TC si retrasa el manejo.",
      actions: [
        {
          id: "clinical-trauma",
          kind: "clinical",
          label: "Acción clínica",
          detail: "Vía aérea, respiración, circulación; control de hemorragia externa.",
        },
      ],
      decisions: [
        {
          id: "start",
          label: "Iniciar FAST / eFAST",
          nextStepId: "instability",
        },
      ],
    },
    instability: {
      id: "instability",
      kind: "question",
      title: "¿Paciente inestable?",
      question: "¿Hemodinámicamente inestable (hipotensión, taquicardia sostenida, signos de hipoperfusión)?",
      context: "La respuesta orienta la urgencia ante FAST positivo.",
      actions: [
        {
          id: "clinical-instability",
          kind: "clinical",
          label: "Acción clínica",
          detail: "Reposición volémica, transfusión masiva si protocolo trauma; evitar retrasar cirugía si FAST+.",
        },
      ],
      decisions: [
        {
          id: "yes",
          label: "Sí — inestable",
          hint: "FAST+ suele indicar cirugía urgente",
          nextStepId: "ruq",
        },
        {
          id: "no",
          label: "No — estable",
          hint: "FAST+ puede ir a TC si el contexto lo permite",
          nextStepId: "ruq",
        },
      ],
    },
    ruq: {
      id: "ruq",
      kind: "question",
      title: "FAST — RUQ (Morrison)",
      question: "Evalúa el espacio hepatorrenal (RUQ) en busca de líquido libre anecoico.",
      actions: [
        {
          id: "atlas-ruq-fluid",
          kind: "atlas",
          label: "Atlas — líquido RUQ",
          href: atlas("fast-ruq-fluid"),
        },
        {
          id: "atlas-ruq-normal",
          kind: "atlas",
          label: "Atlas — RUQ normal",
          href: atlas("fast-ruq-normal"),
        },
        {
          id: "clinical-ruq",
          kind: "clinical",
          label: "Acción clínica",
          detail: "Barrido completo de la interfase hepatorrenal; incluir pelvis del hígado si es necesario.",
        },
      ],
      decisions: [{ id: "next", label: "Ventana explorada → LUQ", nextStepId: "luq" }],
    },
    luq: {
      id: "luq",
      kind: "question",
      title: "FAST — LUQ (esplenorenal)",
      question: "Evalúa el espacio esplenorenal y el receso subfrénico izquierdo.",
      actions: [
        {
          id: "atlas-luq-fluid",
          kind: "atlas",
          label: "Atlas — líquido LUQ",
          href: atlas("fast-luq-fluid"),
        },
        {
          id: "atlas-luq-normal",
          kind: "atlas",
          label: "Atlas — LUQ normal",
          href: atlas("fast-luq-normal"),
        },
        {
          id: "clinical-luq",
          kind: "clinical",
          label: "Acción clínica",
          detail: "Incluir punta esplénica y diafragma izquierdo en el barrido.",
        },
      ],
      decisions: [{ id: "next", label: "Ventana explorada → Pelvis", nextStepId: "pelvis" }],
    },
    pelvis: {
      id: "pelvis",
      kind: "question",
      title: "FAST — Pelvis",
      question: "Evalúa Douglas (mujer) o rectovesical (hombre) en busca de líquido libre.",
      actions: [
        {
          id: "atlas-pelvis-fluid",
          kind: "atlas",
          label: "Atlas — líquido pelvis",
          href: atlas("fast-pelvis-fluid"),
        },
        {
          id: "atlas-pelvis-normal",
          kind: "atlas",
          label: "Atlas — pelvis normal",
          href: atlas("fast-pelvis-normal"),
        },
        {
          id: "clinical-pelvis",
          kind: "clinical",
          label: "Acción clínica",
          detail: "Vejiga llena mejora la ventana; considerar sonda si la imagen es limitada.",
        },
      ],
      decisions: [{ id: "next", label: "Ventana explorada → Subxifoidea", nextStepId: "subxiphoid" }],
    },
    subxiphoid: {
      id: "subxiphoid",
      kind: "question",
      title: "FAST — Subxifoidea (pericardio)",
      question: "Evalúa el saco pericárdico: derrame o taponamiento.",
      actions: [
        {
          id: "atlas-pericardial",
          kind: "atlas",
          label: "Atlas — derrame pericárdico",
          href: atlas("fast-pericardial-effusion"),
        },
        {
          id: "atlas-subxiphoid",
          kind: "atlas",
          label: "Atlas — subxifoidea normal",
          href: atlas("fast-subxiphoid-normal"),
        },
        {
          id: "clinical-subxiphoid",
          kind: "clinical",
          label: "Acción clínica",
          detail: "Si taponamiento: no retrasar pericardiocentesis o esternotomía según contexto.",
        },
      ],
      decisions: [{ id: "next", label: "Ventana explorada → eFAST pleura D", nextStepId: "efast-right" }],
    },
    "efast-right": {
      id: "efast-right",
      kind: "question",
      title: "eFAST — Pleura derecha",
      question: "Busca sliding pleural, líneas A/B y neumotórax; descarta hemotórax significativo.",
      actions: [
        {
          id: "atlas-sliding",
          kind: "atlas",
          label: "Atlas — sliding pleural",
          href: atlas("fast-pleural-sliding"),
        },
        {
          id: "atlas-pnx",
          kind: "atlas",
          label: "Atlas — neumotórax",
          href: atlas("fast-pneumothorax"),
        },
        {
          id: "atlas-hemothorax",
          kind: "atlas",
          label: "Atlas — hemotórax",
          href: atlas("fast-hemothorax"),
        },
        {
          id: "clinical-efast-r",
          kind: "clinical",
          label: "Acción clínica",
          detail: "Sin sliding: tratar como PNX hasta demostrar lo contrario.",
        },
      ],
      decisions: [{ id: "next", label: "Pleura D explorada → Pleura I", nextStepId: "efast-left" }],
    },
    "efast-left": {
      id: "efast-left",
      kind: "question",
      title: "eFAST — Pleura izquierda",
      question: "Repite la evaluación pleural en el lado izquierdo.",
      actions: [
        {
          id: "atlas-sliding-l",
          kind: "atlas",
          label: "Atlas — sliding pleural",
          href: atlas("fast-pleural-sliding"),
        },
        {
          id: "atlas-pnx-l",
          kind: "atlas",
          label: "Atlas — neumotórax",
          href: atlas("fast-pneumothorax"),
        },
        {
          id: "clinical-efast-l",
          kind: "clinical",
          label: "Acción clínica",
          detail: "Correlacionar con mecánica respiratoria y Rx si hay duda.",
        },
      ],
      decisions: [{ id: "next", label: "Pleuras exploradas → Hallazgos", nextStepId: "pnx-check" }],
    },
    "pnx-check": {
      id: "pnx-check",
      kind: "question",
      title: "Neumotórax en eFAST",
      question: "¿Neumotórax confirmado o altamente sospechoso (sin sliding, lung point, clínica concordante)?",
      decisions: [
        {
          id: "yes",
          label: "Sí — neumotórax",
          nextStepId: "result-pnx",
        },
        {
          id: "no",
          label: "No — sin neumotórax",
          nextStepId: "fast-fluid",
        },
      ],
    },
    "fast-fluid": {
      id: "fast-fluid",
      kind: "question",
      title: "FAST — líquido libre",
      question: "¿Líquido libre intraperitoneal o derrame pericárdico significativo (FAST positivo)?",
      actions: [
        {
          id: "atlas-ruq-f",
          kind: "atlas",
          label: "Atlas — líquido RUQ",
          href: atlas("fast-ruq-fluid"),
        },
        {
          id: "clinical-fast-pos",
          kind: "clinical",
          label: "Acción clínica",
          detail: "Documentar ventanas positivas; activar equipo de trauma.",
        },
      ],
      decisions: [
        {
          id: "positive",
          label: "Sí — FAST positivo",
          nextStepId: "unstable-recheck",
        },
        {
          id: "negative",
          label: "No — FAST negativo",
          nextStepId: "suspicion",
        },
      ],
    },
    "unstable-recheck": {
      id: "unstable-recheck",
      kind: "question",
      title: "Estabilidad hemodinámica",
      question: "Ante FAST positivo: ¿el paciente está hemodinámicamente inestable ahora?",
      context: "Si inestable → cirugía; si estable → TC según protocolo del centro.",
      decisions: [
        {
          id: "yes",
          label: "Sí — inestable",
          nextStepId: "result-surgery",
        },
        {
          id: "no",
          label: "No — estable",
          nextStepId: "result-ct",
        },
      ],
    },
    suspicion: {
      id: "suspicion",
      kind: "question",
      title: "FAST negativo",
      question: "¿Alta sospecha clínica de hemorragia intraabdominal a pesar de FAST negativo?",
      decisions: [
        {
          id: "high",
          label: "Sí — alta sospecha",
          hint: "FAST seriado o TC",
          nextStepId: "result-repeat",
        },
        {
          id: "low",
          label: "No — baja sospecha",
          nextStepId: "result-observe",
        },
      ],
    },
    "result-pnx": {
      id: "result-pnx",
      kind: "result",
      title: "Interpretación — Neumotórax",
      interpretation:
        "Neumotórax en eFAST: manejo pleural según contexto (oxígeno, descompresión con aguja o drenaje). No retrasar si hay inestabilidad o tensión.",
      actions: [
        {
          id: "clinical-pnx",
          kind: "clinical",
          label: "Acción clínica",
          detail: "Descompresión inmediata si tensión; tubo pleural según protocolo trauma.",
        },
        {
          id: "atlas-pnx-r",
          kind: "atlas",
          label: "Ver neumotórax en atlas",
          href: atlas("fast-pneumothorax"),
        },
        {
          id: "atlas-sliding-r",
          kind: "atlas",
          label: "Ver sliding pleural",
          href: atlas("fast-pleural-sliding"),
        },
      ],
    },
    "result-surgery": {
      id: "result-surgery",
      kind: "result",
      title: "Interpretación — FAST+ e inestable",
      interpretation:
        "FAST positivo con inestabilidad hemodinámica: activar cirugía / equipo de trauma. Evitar TC si retrasa intervención definitiva.",
      actions: [
        {
          id: "clinical-surgery",
          kind: "clinical",
          label: "Acción clínica",
          detail: "Transfusión, ácido tranexámico según protocolo; laparotomía o control de daños.",
        },
        {
          id: "atlas-fluid",
          kind: "atlas",
          label: "Ver líquido libre RUQ",
          href: atlas("fast-ruq-fluid"),
        },
      ],
    },
    "result-ct": {
      id: "result-ct",
      kind: "result",
      title: "Interpretación — FAST+ y estable",
      interpretation:
        "FAST positivo con paciente estable: tomografía para localizar y caracterizar lesión; vigilancia estrecha y reevaluación seriada.",
      actions: [
        {
          id: "clinical-ct",
          kind: "clinical",
          label: "Acción clínica",
          detail: "TC abdomen/pelvis con contraste si la presión lo permite; consulta cirugía.",
        },
        {
          id: "atlas-pelvis-f",
          kind: "atlas",
          label: "Ver líquido en pelvis",
          href: atlas("fast-pelvis-fluid"),
        },
      ],
    },
    "result-repeat": {
      id: "result-repeat",
      kind: "result",
      title: "Interpretación — FAST− con alta sospecha",
      interpretation:
        "FAST negativo con sospecha clínica alta: repetir FAST seriado o TC. No dar de alta solo por un FAST inicial negativo.",
      actions: [
        {
          id: "clinical-repeat",
          kind: "clinical",
          label: "Acción clínica",
          detail: "FAST a las 15–30 min o TC según estabilidad; monitorizar lactato y hemoglobina.",
        },
        {
          id: "atlas-ruq-n",
          kind: "atlas",
          label: "Atlas — RUQ normal",
          href: atlas("fast-ruq-normal"),
        },
      ],
    },
    "result-observe": {
      id: "result-observe",
      kind: "result",
      title: "Interpretación — FAST− baja sospecha",
      interpretation:
        "FAST negativo y baja sospecha: observación con reevaluación clínica. Repetir FAST si cambia el cuadro o antes del alta si el mecanismo lo amerita.",
      actions: [
        {
          id: "clinical-observe",
          kind: "clinical",
          label: "Acción clínica",
          detail: "Criterios de alta según protocolo trauma; educación sobre signos de alarma.",
        },
        {
          id: "atlas-normal",
          kind: "atlas",
          label: "Atlas — ventanas FAST normales",
          href: atlas("fast-ruq-normal"),
        },
      ],
    },
  },
};
