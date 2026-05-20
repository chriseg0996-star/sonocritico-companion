import type { GuardScenario, GuardScenarioId } from "@/lib/companion/types";

/** Escenarios guardia → enlaces directos (<10 s). */
export const GUARD_SCENARIOS: GuardScenario[] = [
  {
    id: "disnea",
    label: "Disnea",
    hint: "Disnea aguda · ventilación",
    suggestions: [
      {
        id: "protocols",
        title: "Protocolos",
        links: [{ label: "BLUE básico", href: "/protocolos/blue" }],
      },
      {
        id: "atlas",
        title: "Atlas",
        links: [{ label: "Líneas B", href: "/viewer/lung-b-lines?module=lung" }],
      },
      {
        id: "calculators",
        title: "Calculadoras",
        links: [{ label: "LUS / BLUE", href: "/herramientas/lus" }],
      },
      {
        id: "cases",
        title: "Casos",
        links: [{ label: "Disnea aguda", href: "/casos/disnea-aguda" }],
      },
    ],
  },
  {
    id: "choque",
    label: "Choque",
    hint: "Inestabilidad · perfil hemodinámico",
    suggestions: [
      {
        id: "protocols",
        title: "Protocolos",
        links: [{ label: "RUSH", href: "/protocolos/rush" }],
      },
      {
        id: "atlas",
        title: "Atlas",
        links: [{ label: "VI hiperdinámico", href: "/viewer/cardiac-fevi-hyperdynamic?module=cardiac" }],
      },
      {
        id: "calculators",
        title: "Calculadoras",
        links: [{ label: "RUSH · tipos de shock", href: "/herramientas/shock" }],
      },
      {
        id: "cases",
        title: "Casos",
        links: [{ label: "Shock postquirúrgico", href: "/casos/case-02" }],
      },
    ],
  },
  {
    id: "hipoxemia",
    label: "Hipoxemia",
    hint: "SpO2 baja · patrón pulmonar",
    suggestions: [
      {
        id: "protocols",
        title: "Protocolos",
        links: [{ label: "BLUE", href: "/protocolos/blue" }],
      },
      {
        id: "atlas",
        title: "Atlas",
        links: [{ label: "Consolidación", href: "/viewer/lung-consolidation?module=lung" }],
      },
      {
        id: "calculators",
        title: "Calculadoras",
        links: [{ label: "LUS", href: "/herramientas/lus" }],
      },
      {
        id: "cases",
        title: "Casos",
        links: [{ label: "Disnea / hipoxemia", href: "/casos/case-01" }],
      },
    ],
  },
  {
    id: "oliguria",
    label: "Oliguria",
    hint: "Bajo gasto · congestión",
    suggestions: [
      {
        id: "protocols",
        title: "Protocolos",
        links: [{ label: "VExUS", href: "/protocolos/vexus" }],
      },
      {
        id: "atlas",
        title: "Atlas",
        links: [{ label: "Vena porta pulsátil", href: "/viewer/vexus-portal-pulsatile?module=vexus" }],
      },
      {
        id: "calculators",
        title: "Calculadoras",
        links: [{ label: "VExUS score", href: "/herramientas/vexus" }],
      },
      {
        id: "cases",
        title: "Casos",
        links: [{ label: "Congestión en UCI", href: "/casos/case-04" }],
      },
    ],
  },
  {
    id: "trauma",
    label: "Trauma",
    hint: "eFAST · tórax · abdomen",
    suggestions: [
      {
        id: "protocols",
        title: "Protocolos",
        links: [{ label: "FAST / eFAST", href: "/protocolos/fast" }],
      },
      {
        id: "atlas",
        title: "Atlas",
        links: [{ label: "Neumotórax", href: "/viewer/fast-pneumothorax?module=fast" }],
      },
      {
        id: "calculators",
        title: "Calculadoras",
        links: [{ label: "Shock rápido", href: "/herramientas/shock" }],
      },
      {
        id: "cases",
        title: "Casos",
        links: [{ label: "Trauma torácico", href: "/casos/case-03" }],
      },
    ],
  },
];

const BY_ID = new Map(GUARD_SCENARIOS.map((s) => [s.id, s]));

export function getGuardScenario(id: GuardScenarioId): GuardScenario | undefined {
  return BY_ID.get(id);
}

export function isGuardScenarioId(value: string): value is GuardScenarioId {
  return BY_ID.has(value as GuardScenarioId);
}
