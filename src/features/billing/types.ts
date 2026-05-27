export type PlanId = "free" | "pro";

export type Plan = {
  id: PlanId;
  nombre: string;
  features: string[];
  precio: number;
};
