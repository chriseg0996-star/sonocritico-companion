import type { WorkflowProtocol, WorkflowResult } from "@/features/companion-workflow/types";

type BlueResultExtras = WorkflowResult & {
  opens: { label: string; href: string }[];
};

const RESULT_EAP: BlueResultExtras = {
  diagnostico: "Edema pulmonar agudo (EAP)",
  certeza: "alta",
  acciones: [
    "Perfil B bilateral con sliding presente — priorizar congestión cardiogénica",
    "VMNI + diurético según TA y perfil hemodinámico",
    "Eco cardíaca focal si hay duda de función sistólica",
  ],
  opens: [
    { label: "Atlas — Líneas B", href: "/viewer/lung-b-lines?module=lung" },
    { label: "Calculadora LUS / BLUE", href: "/herramientas/lus" },
    { label: "Protocolo BLUE", href: "/protocolos/blue" },
  ],
};

const RESULT_NEUMONIA: BlueResultExtras = {
  diagnostico: "Neumonía",
  certeza: "media",
  acciones: [
    "Consolidación o patrón focal — correlacionar con clínica e imagen",
    "Antibióticos según guía local si sospecha infecciosa",
    "Reevaluar PLAPS y campos homólogos",
  ],
  opens: [
    { label: "Atlas — Consolidación", href: "/viewer/lung-consolidation?module=lung" },
    { label: "Calculadora LUS / BLUE", href: "/herramientas/lus" },
    { label: "Caso — Disnea aguda", href: "/casos/disnea-aguda" },
  ],
};

const RESULT_TEP: BlueResultExtras = {
  diagnostico: "Tromboembolismo pulmonar (TEP)",
  certeza: "alta",
  acciones: [
    "Perfil A bilateral + DVT — alta especificidad para TEP (Lichtenstein)",
    "Anticoagulación según protocolo institucional",
    "Considerar angioTC si estabilidad lo permite",
  ],
  opens: [
    { label: "Atlas — Líneas A (perfil A)", href: "/viewer/lung-a-lines?module=lung" },
    { label: "Protocolo BLUE", href: "/protocolos/blue" },
    { label: "Módulo pulmonar", href: "/modulos/pulmonar-blue?tab=resumen" },
  ],
};

const RESULT_EPOC: BlueResultExtras = {
  diagnostico: "EPOC / Asma exacerbada",
  certeza: "media",
  acciones: [
    "Perfil A sin DVT — vía obstructiva / hiperinsuflación",
    "Broncodilatadores + corticoides según severidad",
    "Descartar TEP si clínica no concuerda",
  ],
  opens: [
    { label: "Atlas — Líneas A", href: "/viewer/lung-a-lines?module=lung" },
    { label: "Calculadora LUS / BLUE", href: "/herramientas/lus" },
    { label: "Protocolo BLUE", href: "/protocolos/blue" },
  ],
};

function toWorkflowResult(r: BlueResultExtras): WorkflowResult {
  return {
    diagnostico: r.diagnostico,
    certeza: r.certeza,
    acciones: [
      ...r.acciones,
      ...r.opens.map((o) => `Abrir: ${o.label}`),
    ],
  };
}

/** Árbol BLUE — disnea aguda (Lichtenstein simplificado). */
export const BLUE_WORKFLOW: WorkflowProtocol = {
  id: "blue",
  title: "Protocolo BLUE",
  intro:
    "Árbol de decisión rápido para disnea aguda: perfil B → sliding → consolidación → perfil A + DVT. Tres preguntas como máximo.",
  firstStepId: "step-1",
  steps: {
    "step-1": {
      id: "step-1",
      pregunta: "¿Líneas B bilaterales predominantes?",
      opciones: [
        { label: "Sí", value: "si", next: "step-2-slip" },
        { label: "No", value: "no", next: "step-2-cons" },
      ],
    },
    "step-2-slip": {
      id: "step-2-slip",
      pregunta: "¿Deslizamiento pleural presente?",
      opciones: [
        { label: "Sí — EAP", value: "si", next: "result-eap" },
        { label: "No — Neumonía", value: "no", next: "result-neumonia" },
      ],
    },
    "step-2-cons": {
      id: "step-2-cons",
      pregunta: "¿Consolidación posterior (PLAPS)?",
      opciones: [
        { label: "Sí — Neumonía", value: "si", next: "result-neumonia" },
        { label: "No", value: "no", next: "step-3" },
      ],
    },
    "step-3": {
      id: "step-3",
      pregunta: "¿Perfil A bilateral + DVT?",
      opciones: [
        { label: "Sí — TEP", value: "si", next: "result-tep" },
        { label: "No — EPOC / Asma", value: "no", next: "result-epoc" },
      ],
    },
  },
  results: {
    "result-eap": toWorkflowResult(RESULT_EAP),
    "result-neumonia": toWorkflowResult(RESULT_NEUMONIA),
    "result-tep": toWorkflowResult(RESULT_TEP),
    "result-epoc": toWorkflowResult(RESULT_EPOC),
  },
};

/** Enlaces rápidos del resultado BLUE (atlas / calculadora / protocolo). */
export const BLUE_RESULT_LINKS: Record<string, BlueResultExtras["opens"]> = {
  "result-eap": RESULT_EAP.opens,
  "result-neumonia": RESULT_NEUMONIA.opens,
  "result-tep": RESULT_TEP.opens,
  "result-epoc": RESULT_EPOC.opens,
};
