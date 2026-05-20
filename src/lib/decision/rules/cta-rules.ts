import type { CtaRule } from "@/lib/decision/rules/types";

export const CTA_RULES: CtaRule[] = [
  {
    when: { symptoms: ["disnea"], findings: ["b-lines"] },
    ctas: {
      protocol: { label: "Ver protocolo BLUE", href: "/protocolos/blue" },
      atlas: { label: "Ver atlas líneas B", href: "/viewer/lung-b-lines?module=lung" },
      calculator: { label: "Abrir calculadora LUS", href: "/herramientas/lus" },
      case: { label: "Abrir caso disnea", href: "/casos/disnea-aguda" },
    },
    defaultNextStudy: "BLUE completo en 6–8 campos.",
  },
  {
    when: { symptoms: ["disnea"], findings: ["consolidacion"] },
    ctas: {
      protocol: { label: "Ver protocolo BLUE", href: "/protocolos/blue" },
      atlas: { label: "Ver atlas consolidación", href: "/viewer/lung-consolidation?module=lung" },
      calculator: { label: "Abrir calculadora LUS", href: "/herramientas/lus" },
      case: { label: "Abrir caso disnea", href: "/casos/disnea-aguda" },
    },
  },
  {
    when: { symptoms: ["choque"] },
    ctas: {
      protocol: { label: "Ver protocolo RUSH", href: "/protocolos/rush" },
      atlas: { label: "Ver atlas cardíaco", href: "/viewer/cardiac-fevi-hyperdynamic?module=cardiac" },
      calculator: { label: "Abrir calculadora shock", href: "/herramientas/shock" },
      case: { label: "Abrir caso shock", href: "/casos/case-02" },
    },
  },
  {
    when: { symptoms: ["hipoxemia"] },
    ctas: {
      protocol: { label: "Ver protocolo BLUE", href: "/protocolos/blue" },
      atlas: { label: "Ver atlas pulmonar", href: "/viewer/lung-b-lines?module=lung" },
      calculator: { label: "Abrir calculadora LUS", href: "/herramientas/lus" },
      case: { label: "Abrir caso hipoxemia", href: "/casos/case-01" },
    },
  },
  {
    when: { symptoms: ["trauma"] },
    ctas: {
      protocol: { label: "Ver protocolo FAST", href: "/protocolos/fast" },
      atlas: { label: "Ver atlas eFAST", href: "/viewer/fast-pneumothorax?module=fast" },
      calculator: { label: "Abrir calculadora shock", href: "/herramientas/shock" },
      case: { label: "Abrir caso trauma", href: "/casos/case-03" },
    },
  },
  {
    when: { symptoms: ["oliguria"] },
    ctas: {
      protocol: { label: "Ver protocolo VExUS", href: "/protocolos/vexus" },
      atlas: { label: "Ver atlas VExUS", href: "/viewer/vexus-portal-pulsatile?module=vexus" },
      calculator: { label: "Abrir calculadora VExUS", href: "/herramientas/vexus" },
      case: { label: "Abrir caso congestión", href: "/casos/case-04" },
    },
  },
];

export const DEFAULT_CTAS: CtaRule["ctas"] = {
  protocol: { label: "Ver protocolos", href: "/protocolos" },
  atlas: { label: "Ver biblioteca", href: "/biblioteca" },
  calculator: { label: "Abrir calculadoras", href: "/herramientas" },
  case: { label: "Abrir casos", href: "/casos" },
};
