export type {
  InteractiveClinicalCase,
  CaseFlowStep,
  CaseStepKind,
  CaseChoice,
  CaseResourceLink,
  CaseVitals,
  DecisionNode,
  CaseBranch,
  CaseOutcome,
  CaseRouteEntry,
  AdaptiveCaseGraph,
  CaseDifficulty,
} from "@/lib/cases/types";
export { isAdaptiveCase } from "@/lib/cases/types";
export {
  resolveTransition,
  computePartialScore,
  appendRouteEntry,
  pickOutcomeForRoute,
  getDecisionNode,
} from "@/lib/cases/flow-engine";
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
  saveCaseRoute,
  loadCaseRoute,
  type CasesProgressStore,
  type CaseAttemptRecord,
} from "@/lib/cases/case-storage";
export { scoreCaseChoices } from "@/lib/cases/scoring";
export { atlasHref, viewerHref, protocolHref } from "@/lib/cases/case-links";
