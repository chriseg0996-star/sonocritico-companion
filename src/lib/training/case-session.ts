/** Progreso de casos interactivos — reexport desde motor de casos. */
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
