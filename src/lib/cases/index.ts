export type {
  InteractiveClinicalCase,
  CaseFlowStep,
  CaseStepKind,
  CaseChoice,
  CaseResourceLink,
  CaseVitals,
} from "@/lib/cases/types";
export { disneaAgudaCase } from "@/lib/cases/disnea-aguda";
export {
  getEngineCases,
  getEngineCase,
  isEngineCaseId,
  getEngineCaseIds,
} from "@/lib/cases/registry";
export {
  loadCasesProgress,
  markCaseStarted,
  markCaseCompleted,
  getCaseProgress,
  type CasesProgressStore,
  type CaseAttemptRecord,
} from "@/lib/cases/case-storage";
export { scoreCaseChoices } from "@/lib/cases/scoring";
export { atlasHref, viewerHref, protocolHref } from "@/lib/cases/case-links";
