import type { InteractiveClinicalCase } from "@/lib/cases/types";

/** Contexto breve para UI de casos (sin texto largo). */
export function getCaseBrief(caseDef: InteractiveClinicalCase) {
  return {
    title: caseDef.title,
    tagline: caseDef.tagline,
    tags: caseDef.tags,
    vitals: caseDef.vitals,
  };
}
