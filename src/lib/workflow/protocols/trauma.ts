import type { WorkflowComplaint } from "@/lib/workflow/types";
import { buildRoute } from "@/lib/workflow/protocols/helpers";

const efastLinks = {
  protocol: { label: "FAST / eFAST", href: "/protocolos/fast" },
  atlas: { label: "Neumotórax", href: "/viewer/fast-pneumothorax?module=fast" },
  calculator: { label: "Shock rápido", href: "/herramientas/shock" },
  case: { label: "Trauma torácico", href: "/casos/case-03" },
};

const rushLinks = {
  protocol: { label: "RUSH", href: "/protocolos/rush" },
  atlas: { label: "Líquido libre", href: "/viewer/fast-free-fluid?module=fast" },
  calculator: { label: "RUSH · shock", href: "/herramientas/shock" },
  case: { label: "Shock postquirúrgico", href: "/casos/case-02" },
};

const stableLinks = {
  protocol: { label: "eFAST extendido", href: "/protocolos/fast" },
  atlas: { label: "Hemotórax", href: "/viewer/fast-hemothorax?module=fast" },
  calculator: { label: "Shock", href: "/herramientas/shock" },
  case: { label: "Trauma torácico", href: "/casos/case-03" },
};

function traumaRoute(key: string, summary: string, minutes: number, links: typeof efastLinks) {
  return buildRoute(`trauma-${key}`, summary, minutes, links);
}

export const traumaWorkflow: WorkflowComplaint = {
  id: "trauma",
  label: "Trauma",
  questions: [
    {
      id: "inestable",
      prompt: "¿Inestable hemodinámicamente?",
      options: [
        { id: "si", label: "Sí" },
        { id: "no", label: "No" },
      ],
    },
    {
      id: "torax",
      prompt: "¿Mecanismo torácico?",
      options: [
        { id: "si", label: "Sí" },
        { id: "no", label: "No" },
      ],
    },
    {
      id: "abdomen",
      prompt: "¿Sospecha abdomen?",
      options: [
        { id: "si", label: "Sí" },
        { id: "no", label: "No" },
      ],
    },
  ],
  defaultRouteId: "si|si|si",
  routes: {
    "si|si|si": traumaRoute("inest-torax-abd", "Inestable · tórax · abdomen", 3, efastLinks),
    "si|si|no": traumaRoute("inest-torax", "Inestable · tórax", 3, efastLinks),
    "si|no|si": traumaRoute("inest-abd", "Inestable · abdomen", 3, rushLinks),
    "si|no|no": traumaRoute("inest", "Trauma inestable", 3, rushLinks),
    "no|si|si": traumaRoute("est-torax-abd", "Estable · tórax · abdomen", 5, efastLinks),
    "no|si|no": traumaRoute("est-torax", "Estable · tórax", 5, stableLinks),
    "no|no|si": traumaRoute("est-abd", "Estable · abdomen", 5, efastLinks),
    "no|no|no": traumaRoute("est", "Trauma estable", 6, stableLinks),
  },
};
