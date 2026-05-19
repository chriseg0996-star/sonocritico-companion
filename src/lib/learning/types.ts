/** Niveles Sonocrítico por XP acumulado. */
export type SonocriticLevelId =
  | "novato"
  | "explorador"
  | "operador"
  | "sonocritico"
  | "instructor";

export type SonocriticLevel = {
  id: SonocriticLevelId;
  label: string;
  minXp: number;
};

export type LearningScorePillars = {
  hallazgos: number;
  casos: number;
  repaso: number;
  precision: number;
};

export type LearningScoreSnapshot = {
  total: number;
  pillars: LearningScorePillars;
  xp: number;
  level: SonocriticLevel;
  nextLevel: SonocriticLevel | null;
  xpToNext: number;
  levelProgress: number;
  streakDays: number;
};

export type LearningScoreStore = {
  xp: number;
  streakDays: number;
  lastActiveDate: string | null;
  repasoCards: number;
  precisionCorrect: number;
  precisionTotal: number;
};
