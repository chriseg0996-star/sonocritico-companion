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
export type {
  DailyTrainingKind,
  DailyTrainingItem,
  DailyTrainingPack,
  LastDailyTraining,
} from "@/lib/training/daily-training-types";
export {
  getDailyTrainingPack,
  DAILY_TRAINING_ESTIMATE_MIN,
} from "@/lib/training/daily-training";
export {
  loadLastDailyTraining,
  markDailyTrainingDone,
  isDailyKindDone,
  todayKey as dailyTrainingTodayKey,
} from "@/lib/training/daily-training-storage";
