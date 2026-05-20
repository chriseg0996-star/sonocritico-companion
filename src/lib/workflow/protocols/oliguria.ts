import type { WorkflowComplaint } from "@/lib/workflow/types";
import { buildRoute } from "@/lib/workflow/protocols/helpers";

const vexusLinks = {
  protocol: { label: "VExUS", href: "/protocolos/vexus" },
  atlas: { label: "Vena porta pulsátil", href: "/viewer/vexus-portal-pulsatile?module=vexus" },
  calculator: { label: "VExUS score", href: "/herramientas/vexus" },
  case: { label: "Congestión en UCI", href: "/casos/case-04" },
};

const rushLinks = {
  protocol: { label: "RUSH", href: "/protocolos/rush" },
  atlas: { label: "VCI colapsada", href: "/viewer/cardiac-ivc-normal?module=cardiac" },
  calculator: { label: "Shock", href: "/herramientas/shock" },
  case: { label: "Shock postquirúrgico", href: "/casos/case-02" },
};

const mixedLinks = {
  protocol: { label: "VExUS + RUSH", href: "/protocolos/vexus" },
  atlas: { label: "VCI plethórica", href: "/viewer/vexus-ivc-plethoric?module=vexus" },
  calculator: { label: "VExUS · shock", href: "/herramientas/vexus" },
  case: { label: "Congestión en UCI", href: "/casos/case-04" },
};

function oliguriaRoute(key: string, summary: string, minutes: number, links: typeof vexusLinks) {
  return buildRoute(`oliguria-${key}`, summary, minutes, links);
}

export const oliguriaWorkflow: WorkflowComplaint = {
  id: "oliguria",
  label: "Oliguria",
  questions: [
    {
      id: "shock",
      prompt: "¿Shock / bajo gasto?",
      options: [
        { id: "si", label: "Sí" },
        { id: "no", label: "No" },
      ],
    },
    {
      id: "congestion",
      prompt: "¿Congestión venosa?",
      options: [
        { id: "si", label: "Sí" },
        { id: "no", label: "No" },
      ],
    },
    {
      id: "postop",
      prompt: "¿Postoperatorio reciente?",
      options: [
        { id: "si", label: "Sí" },
        { id: "no", label: "No" },
      ],
    },
  ],
  defaultRouteId: "no|si|no",
  routes: {
    "si|si|si": oliguriaRoute("shock-cong-post", "Shock · congestión · postop", 4, mixedLinks),
    "si|si|no": oliguriaRoute("shock-cong", "Shock · congestión", 4, mixedLinks),
    "si|no|si": oliguriaRoute("shock-post", "Shock · postop", 4, rushLinks),
    "si|no|no": oliguriaRoute("shock", "Oliguria · bajo gasto", 4, rushLinks),
    "no|si|si": oliguriaRoute("cong-post", "Congestión · postop", 5, vexusLinks),
    "no|si|no": oliguriaRoute("cong", "Oliguria · congestión", 5, vexusLinks),
    "no|no|si": oliguriaRoute("post", "Oliguria postoperatoria", 6, rushLinks),
    "no|no|no": oliguriaRoute("funcional", "Oliguria sin congestión clara", 6, vexusLinks),
  },
};
