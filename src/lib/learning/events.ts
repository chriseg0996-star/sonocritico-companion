import { loadLearningStore, saveLearningStore } from "@/lib/learning/storage";

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

/** Actualiza racha de días activos. */
export function touchLearningActivity(): void {
  const store = loadLearningStore();
  const today = todayKey();
  if (store.lastActiveDate === today) {
    saveLearningStore(store);
    return;
  }
  if (store.lastActiveDate === yesterdayKey()) {
    store.streakDays = Math.max(1, store.streakDays + 1);
  } else {
    store.streakDays = 1;
  }
  store.lastActiveDate = today;
  saveLearningStore(store);
}

function awardXp(amount: number): void {
  if (amount <= 0) return;
  const store = loadLearningStore();
  store.xp += amount;
  saveLearningStore(store);
}

function addPrecision(correct: number, total: number): void {
  if (total <= 0) return;
  const store = loadLearningStore();
  store.precisionCorrect += correct;
  store.precisionTotal += total;
  saveLearningStore(store);
}

export function recordFindingSaved(): void {
  touchLearningActivity();
  awardXp(10);
}

export function recordErrorReviewed(): void {
  touchLearningActivity();
  awardXp(15);
}

export function recordRepasoCard(): void {
  touchLearningActivity();
  const store = loadLearningStore();
  store.repasoCards += 1;
  saveLearningStore(store);
  awardXp(5);
}

export function recordCaseCompleted(
  _caseId: string,
  score: number,
  optimalChoices = 0,
  totalChoices = 0,
): void {
  touchLearningActivity();
  addPrecision(optimalChoices, totalChoices);
  awardXp(Math.max(20, Math.round(score / 2)));
}

export function recordQuizCompleted(score: number): void {
  touchLearningActivity();
  addPrecision(score >= 80 ? 1 : 0, 1);
  awardXp(Math.max(8, Math.round(score / 5)));
}
