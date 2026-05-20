import type { WorkflowComplaint } from "@/lib/workflow/types";
import { buildRoute } from "@/lib/workflow/protocols/helpers";

const blueLinks = {
  protocol: { label: "BLUE", href: "/protocolos/blue" },
  atlas: { label: "Consolidación", href: "/viewer/lung-consolidation?module=lung" },
  calculator: { label: "LUS", href: "/herramientas/lus" },
  case: { label: "Disnea / hipoxemia", href: "/casos/case-01" },
};

const interstitialLinks = {
  protocol: { label: "BLUE · intersticial", href: "/protocolos/blue" },
  atlas: { label: "Líneas B", href: "/viewer/lung-b-lines?module=lung" },
  calculator: { label: "LUS / BLUE", href: "/herramientas/lus" },
  case: { label: "Disnea aguda", href: "/casos/disnea-aguda" },
};

const rushLinks = {
  protocol: { label: "RUSH", href: "/protocolos/rush" },
  atlas: { label: "VCI colapsada", href: "/viewer/cardiac-ivc-normal?module=cardiac" },
  calculator: { label: "Shock", href: "/herramientas/shock" },
  case: { label: "Shock postquirúrgico", href: "/casos/case-02" },
};

function hipoxRoute(key: string, summary: string, minutes: number, links: typeof blueLinks) {
  return buildRoute(`hipoxemia-${key}`, summary, minutes, links);
}

export const hipoxemiaWorkflow: WorkflowComplaint = {
  id: "hipoxemia",
  label: "Hipoxemia",
  questions: [
    {
      id: "ventilado",
      prompt: "¿Ventilado?",
      options: [
        { id: "si", label: "Sí" },
        { id: "no", label: "No" },
      ],
    },
    {
      id: "patron",
      prompt: "¿Patrón predominante?",
      options: [
        { id: "intersticial", label: "Intersticial / B-lines" },
        { id: "consolidacion", label: "Consolidación" },
      ],
    },
    {
      id: "choque",
      prompt: "¿Choque asociado?",
      options: [
        { id: "si", label: "Sí" },
        { id: "no", label: "No" },
      ],
    },
  ],
  defaultRouteId: "no|intersticial|no",
  routes: {
    "si|intersticial|si": hipoxRoute("vent-inter-choque", "VM · intersticial · choque", 4, rushLinks),
    "si|intersticial|no": hipoxRoute("vent-inter", "VM · patrón intersticial", 5, interstitialLinks),
    "si|consolidacion|si": hipoxRoute("vent-cons-choque", "VM · consolidación · choque", 4, rushLinks),
    "si|consolidacion|no": hipoxRoute("vent-cons", "VM · consolidación", 5, blueLinks),
    "no|intersticial|si": hipoxRoute("inter-choque", "Intersticial · choque", 4, rushLinks),
    "no|intersticial|no": hipoxRoute("inter", "Hipoxemia intersticial", 5, interstitialLinks),
    "no|consolidacion|si": hipoxRoute("cons-choque", "Consolidación · choque", 4, rushLinks),
    "no|consolidacion|no": hipoxRoute("cons", "Hipoxemia · consolidación", 5, blueLinks),
  },
};
