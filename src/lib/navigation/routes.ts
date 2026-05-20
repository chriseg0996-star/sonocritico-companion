import { getNavRoute } from "@/config/navigation";

export const QUICK_NAV = {
  guardia: "/guardia",
  casos: getNavRoute("casos"),
  atlas: getNavRoute("biblioteca"),
  calculadoras: getNavRoute("calculadoras"),
  companion: "/guardia",
  dashboard: getNavRoute("inicio"),
} as const;
