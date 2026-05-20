import type { CatalogOption, ContextId, FindingId, SymptomId } from "@/lib/decision/types";

export const SYMPTOM_OPTIONS: CatalogOption<SymptomId>[] = [
  { id: "disnea", label: "Disnea" },
  { id: "choque", label: "Choque" },
  { id: "hipoxemia", label: "Hipoxemia" },
  { id: "trauma", label: "Trauma" },
  { id: "oliguria", label: "Oliguria" },
];

export const FINDING_OPTIONS: CatalogOption<FindingId>[] = [
  { id: "b-lines", label: "Líneas B" },
  { id: "consolidacion", label: "Consolidación" },
  { id: "a-lines", label: "Líneas A" },
  { id: "pleural-effusion", label: "Derrame pleural" },
  { id: "lung-point", label: "Lung point" },
  { id: "ivc-plethoric", label: "VCI plethórica" },
  { id: "ivc-collapsed", label: "VCI colapsada" },
  { id: "free-fluid", label: "Líquido libre" },
  { id: "pneumothorax", label: "Neumotórax" },
  { id: "pericardial-effusion", label: "Derrame pericárdico" },
  { id: "portal-pulsatile", label: "Porta pulsátil" },
];

export const CONTEXT_OPTIONS: CatalogOption<ContextId>[] = [
  { id: "agudo", label: "Agudo" },
  { id: "cronico", label: "Crónico" },
  { id: "ventilado", label: "Ventilado" },
  { id: "postop", label: "Postoperatorio" },
  { id: "trauma", label: "Trauma" },
  { id: "septico", label: "Séptico" },
];

const SYMPTOM_MAP = new Map(SYMPTOM_OPTIONS.map((o) => [o.id, o]));
const FINDING_MAP = new Map(FINDING_OPTIONS.map((o) => [o.id, o]));
const CONTEXT_MAP = new Map(CONTEXT_OPTIONS.map((o) => [o.id, o]));

export function getSymptomLabel(id: SymptomId): string {
  return SYMPTOM_MAP.get(id)?.label ?? id;
}

export function getFindingLabel(id: FindingId): string {
  return FINDING_MAP.get(id)?.label ?? id;
}

export function getContextLabel(id: ContextId): string {
  return CONTEXT_MAP.get(id)?.label ?? id;
}
