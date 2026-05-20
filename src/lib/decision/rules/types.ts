import type { ContextId, DiagnosisId, FindingId, SymptomId } from "@/lib/decision/types";
import type { DifferentialCtas } from "@/lib/decision/types";

export type ScoreRule = {
  id: string;
  when: {
    symptoms?: SymptomId[];
    findings?: FindingId[];
    contexts?: ContextId[];
  };
  add: Partial<Record<DiagnosisId, number>>;
  dontMiss?: DiagnosisId[];
  nextStudy?: string;
};

export type CtaRule = {
  when: {
    symptoms?: SymptomId[];
    findings?: FindingId[];
  };
  ctas: DifferentialCtas;
  defaultNextStudy?: string;
};
