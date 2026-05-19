import type { LearningScoreStore } from "@/lib/learning/types";

const STORAGE_KEY = "sonocritico-learning-score";

export const EMPTY_LEARNING_STORE: LearningScoreStore = {
  xp: 0,
  streakDays: 0,
  lastActiveDate: null,
  repasoCards: 0,
  precisionCorrect: 0,
  precisionTotal: 0,
};

export function loadLearningStore(): LearningScoreStore {
  if (typeof window === "undefined") return { ...EMPTY_LEARNING_STORE };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY_LEARNING_STORE };
    const parsed = JSON.parse(raw) as Partial<LearningScoreStore>;
    return {
      xp: parsed.xp ?? 0,
      streakDays: parsed.streakDays ?? 0,
      lastActiveDate: parsed.lastActiveDate ?? null,
      repasoCards: parsed.repasoCards ?? 0,
      precisionCorrect: parsed.precisionCorrect ?? 0,
      precisionTotal: parsed.precisionTotal ?? 0,
    };
  } catch {
    return { ...EMPTY_LEARNING_STORE };
  }
}

export function saveLearningStore(store: LearningScoreStore): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    /* quota */
  }
}
