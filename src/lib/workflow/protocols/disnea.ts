import type { WorkflowComplaint } from "@/lib/workflow/types";
import { buildRoute } from "@/lib/workflow/protocols/helpers";

const blueLinks = {
  protocol: { label: "BLUE básico", href: "/protocolos/blue" },
  atlas: { label: "Líneas B", href: "/viewer/lung-b-lines?module=lung" },
  calculator: { label: "LUS / BLUE", href: "/herramientas/lus" },
  case: { label: "Disnea aguda", href: "/casos/disnea-aguda" },
};

const weaningLinks = {
  protocol: { label: "Weaning / diafragma", href: "/modulos/weaning-diafragma?step=0" },
  atlas: { label: "Líneas A · weaning", href: "/viewer/lung-a-lines?module=lung" },
  calculator: { label: "LUS", href: "/herramientas/lus" },
  case: { label: "Disnea aguda", href: "/casos/disnea-aguda" },
};

const ventLinks = {
  protocol: { label: "BLUE · VILI", href: "/protocolos/blue" },
  atlas: { label: "Consolidación", href: "/viewer/lung-consolidation?module=lung" },
  calculator: { label: "LUS / BLUE", href: "/herramientas/lus" },
  case: { label: "Disnea / hipoxemia", href: "/casos/case-01" },
};

function disneaRoute(key: string, summary: string, minutes: number, links: typeof blueLinks) {
  return buildRoute(`disnea-${key}`, summary, minutes, links);
}

export const disneaWorkflow: WorkflowComplaint = {
  id: "disnea",
  label: "Disnea",
  questions: [
    {
      id: "temporalidad",
      prompt: "¿Agudo o crónico?",
      options: [
        { id: "agudo", label: "Agudo" },
        { id: "cronico", label: "Crónico" },
      ],
    },
    {
      id: "hipoxemia",
      prompt: "¿Hipoxemia?",
      options: [
        { id: "si", label: "Sí" },
        { id: "no", label: "No" },
      ],
    },
    {
      id: "ventilado",
      prompt: "¿Ventilado?",
      options: [
        { id: "si", label: "Sí" },
        { id: "no", label: "No" },
      ],
    },
  ],
  defaultRouteId: "agudo|si|no",
  routes: {
    "agudo|si|si": disneaRoute("agudo-hipox-vent", "Agudo · hipoxemia · VM", 4, ventLinks),
    "agudo|si|no": disneaRoute("agudo-hipox", "Agudo · hipoxemia", 5, blueLinks),
    "agudo|no|si": disneaRoute("agudo-vent", "Agudo · VM", 5, ventLinks),
    "agudo|no|no": disneaRoute("agudo", "Disnea aguda sin hipoxemia", 5, blueLinks),
    "cronico|si|si": disneaRoute("cronico-hipox-vent", "Crónico · hipoxemia · VM", 6, ventLinks),
    "cronico|si|no": disneaRoute("cronico-hipox", "Crónico · hipoxemia", 6, blueLinks),
    "cronico|no|si": disneaRoute("cronico-vent", "Crónico · VM / destete", 7, weaningLinks),
    "cronico|no|no": disneaRoute("cronico", "Disnea crónica estable", 7, weaningLinks),
  },
};
