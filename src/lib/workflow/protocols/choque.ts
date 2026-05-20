import type { WorkflowComplaint } from "@/lib/workflow/types";
import { buildRoute } from "@/lib/workflow/protocols/helpers";

const rushLinks = {
  protocol: { label: "RUSH", href: "/protocolos/rush" },
  atlas: { label: "VI hiperdinámico", href: "/viewer/cardiac-fevi-hyperdynamic?module=cardiac" },
  calculator: { label: "RUSH · tipos de shock", href: "/herramientas/shock" },
  case: { label: "Shock postquirúrgico", href: "/casos/case-02" },
};

const ecoLinks = {
  protocol: { label: "Eco básica", href: "/modulos/eco-critico?step=0" },
  atlas: { label: "Taponamiento", href: "/viewer/cardiac-tamponade?module=cardiac" },
  calculator: { label: "RUSH · shock", href: "/herramientas/shock" },
  case: { label: "Shock postquirúrgico", href: "/casos/case-02" },
};

const traumaLinks = {
  protocol: { label: "FAST / eFAST", href: "/protocolos/fast" },
  atlas: { label: "Líquido libre RUQ", href: "/viewer/fast-ruq-fluid?module=fast" },
  calculator: { label: "Shock rápido", href: "/herramientas/shock" },
  case: { label: "Trauma torácico", href: "/casos/case-03" },
};

function choqueRoute(key: string, summary: string, minutes: number, links: typeof rushLinks) {
  return buildRoute(`choque-${key}`, summary, minutes, links);
}

export const choqueWorkflow: WorkflowComplaint = {
  id: "choque",
  label: "Choque",
  questions: [
    {
      id: "perfil",
      prompt: "¿Perfil predominante?",
      options: [
        { id: "hipovolemico", label: "Hipovolémico" },
        { id: "cardiogenico", label: "Cardiogénico" },
        { id: "distributivo", label: "Distributivo" },
      ],
    },
    {
      id: "trauma",
      prompt: "¿Contexto trauma?",
      options: [
        { id: "si", label: "Sí" },
        { id: "no", label: "No" },
      ],
    },
    {
      id: "tamponamiento",
      prompt: "¿Sospecha taponamiento?",
      options: [
        { id: "si", label: "Sí" },
        { id: "no", label: "No" },
      ],
    },
  ],
  defaultRouteId: "hipovolemico|no|no",
  routes: {
    "hipovolemico|si|no": choqueRoute("hipo-trauma", "Hipovolémico · trauma", 3, traumaLinks),
    "hipovolemico|si|si": choqueRoute("hipo-trauma-tamp", "Hipovolémico · trauma · taponamiento", 3, traumaLinks),
    "hipovolemico|no|si": choqueRoute("hipo-tamp", "Hipovolémico · taponamiento", 4, ecoLinks),
    "hipovolemico|no|no": choqueRoute("hipo", "Shock hipovolémico", 4, rushLinks),
    "cardiogenico|si|no": choqueRoute("cardio-trauma", "Cardiogénico · trauma", 4, traumaLinks),
    "cardiogenico|si|si": choqueRoute("cardio-trauma-tamp", "Cardiogénico · trauma · taponamiento", 3, ecoLinks),
    "cardiogenico|no|si": choqueRoute("cardio-tamp", "Cardiogénico · taponamiento", 4, ecoLinks),
    "cardiogenico|no|no": choqueRoute("cardio", "Shock cardiogénico", 5, ecoLinks),
    "distributivo|si|no": choqueRoute("dist-trauma", "Distributivo · trauma", 3, traumaLinks),
    "distributivo|si|si": choqueRoute("dist-trauma-tamp", "Distributivo · trauma", 3, traumaLinks),
    "distributivo|no|si": choqueRoute("dist-tamp", "Distributivo · taponamiento", 4, ecoLinks),
    "distributivo|no|no": choqueRoute("dist", "Shock distributivo / séptico", 5, rushLinks),
  },
};
