import type { Plan } from "@/features/billing/types";

export const PLANS: Plan[] = [
  {
    id: "free",
    nombre: "Free",
    precio: 0,
    features: [
      "Acceso básico al companion",
      "3 protocolos (BLUE, FAST, Eco básica)",
      "Casos clínicos limitados",
      "Atlas pulmonar esencial",
    ],
  },
  {
    id: "pro",
    nombre: "Pro",
    precio: 499,
    features: [
      "Acceso completo a todos los módulos",
      "Todos los protocolos y calculadoras",
      "Casos clínicos ilimitados",
      "Panel instructor y heatmap",
      "Modo guardia + flujos interactivos",
      "Soporte prioritario (cuando haya API)",
    ],
  },
];

export function getPlan(id: Plan["id"]): Plan {
  return PLANS.find((p) => p.id === id) ?? PLANS[0]!;
}
