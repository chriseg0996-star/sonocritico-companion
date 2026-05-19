export type {
  SonocriticLevelId,
  SonocriticLevel,
  LearningScorePillars,
  LearningScoreSnapshot,
  LearningScoreStore,
} from "@/lib/learning/types";
export { SONOCRITIC_LEVELS, getLevelForXp, getNextLevel } from "@/lib/learning/levels";
export { loadLearningStore, saveLearningStore, EMPTY_LEARNING_STORE } from "@/lib/learning/storage";
export { computeLearningScore } from "@/lib/learning/compute";
export {
  touchLearningActivity,
  recordFindingSaved,
  recordErrorReviewed,
  recordRepasoCard,
  recordCaseCompleted,
  recordQuizCompleted,
} from "@/lib/learning/events";
