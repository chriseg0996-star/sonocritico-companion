export type { FrequentErrorTraining } from "@/lib/training/types";
export { LUNG_FREQUENT_ERRORS } from "@/lib/training/lung-errors";
export {
  getErrorsForModule,
  getErrorById,
  getErrorsForMediaId,
  hasErrorsForMediaId,
} from "@/lib/training/registry";
export {
  loadSeenErrorIds,
  isErrorSeen,
  markErrorSeen,
  markErrorsSeen,
} from "@/lib/training/error-trainer-storage";
export {
  loadCasesProgress,
  markCaseStarted,
  markCaseCompleted,
  getCaseProgress,
} from "@/lib/training/case-session";
