import type { InteractiveClinicalCase } from "@/lib/cases/types";
import { disneaAgudaCase } from "@/lib/cases/disnea-aguda";

const ENGINE_CASES: InteractiveClinicalCase[] = [disneaAgudaCase];

const BY_ID = new Map(ENGINE_CASES.map((c) => [c.id, c]));

export function getEngineCases(): InteractiveClinicalCase[] {
  return ENGINE_CASES;
}

export function getEngineCase(id: string): InteractiveClinicalCase | null {
  return BY_ID.get(id) ?? null;
}

export function isEngineCaseId(id: string): boolean {
  return BY_ID.has(id);
}

export function getEngineCaseIds(): string[] {
  return ENGINE_CASES.map((c) => c.id);
}
