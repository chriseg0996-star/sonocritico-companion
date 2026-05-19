import { getProgress } from "@/lib/auth";
import { loadCasesProgress } from "@/lib/cases/case-storage";
import { getEngineCaseIds } from "@/lib/cases/registry";
import { calcQuizAvg } from "@/lib/mock-data";
import { clinicalCases } from "@/lib/mock-data";
import {
  getLevelForXp,
  getNextLevel,
  levelProgressPercent,
} from "@/lib/learning/levels";
import { loadLearningStore } from "@/lib/learning/storage";
import type { LearningScorePillars, LearningScoreSnapshot } from "@/lib/learning/types";
import { loadSeenErrorIds } from "@/lib/training/error-trainer-storage";
import { loadSavedFindings } from "@/lib/viewer/viewer-session";

const TARGET_SAVED_FINDINGS = 8;
const TARGET_ERRORS = 5;
const TARGET_REPASO = 30;
const TARGET_CASES = Math.max(getEngineCaseIds().length + clinicalCases.length, 1);

function clampScore(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function scoreHallazgos(): number {
  const saved = loadSavedFindings().length;
  const errors = loadSeenErrorIds().length;
  const savedPct = (saved / TARGET_SAVED_FINDINGS) * 100;
  const errorsPct = (errors / TARGET_ERRORS) * 100;
  return clampScore((savedPct + errorsPct) / 2);
}

function scoreCasos(): number {
  const engine = loadCasesProgress();
  const legacy = getProgress();
  const engineIds = new Set(Object.keys(engine.completed));
  const legacyIds = new Set(legacy.completedCases);
  const completedCount = new Set([...engineIds, ...legacyIds]).size;

  const engineScores = Object.values(engine.completed)
    .map((r) => r.score)
    .filter((s): s is number => typeof s === "number");
  const avgEngine =
    engineScores.length > 0
      ? engineScores.reduce((a, b) => a + b, 0) / engineScores.length
      : 0;

  const coverage = (completedCount / TARGET_CASES) * 100;
  const quality = avgEngine > 0 ? avgEngine : coverage > 0 ? 50 : 0;
  return clampScore(coverage * 0.55 + quality * 0.45);
}

function scoreRepaso(store: ReturnType<typeof loadLearningStore>): number {
  return clampScore((store.repasoCards / TARGET_REPASO) * 100);
}

function scorePrecision(store: ReturnType<typeof loadLearningStore>): number {
  const progress = getProgress();
  const quizAvg = calcQuizAvg(progress.quizResults);

  let casePct = 0;
  if (store.precisionTotal > 0) {
    casePct = (store.precisionCorrect / store.precisionTotal) * 100;
  } else {
    const engine = loadCasesProgress();
    const routes = Object.values(engine.completed)
      .map((r) => r.route)
      .filter((route): route is NonNullable<typeof route> => Boolean(route?.length));
    if (routes.length > 0) {
      let correct = 0;
      let total = 0;
      for (const route of routes) {
        for (const entry of route) {
          total += 1;
          if (entry.isOptimal) correct += 1;
        }
      }
      casePct = total > 0 ? (correct / total) * 100 : 0;
    }
  }

  const quizPart = quizAvg > 0 ? quizAvg : casePct;
  const casePart = casePct > 0 ? casePct : quizAvg;
  if (quizPart === 0 && casePart === 0) return 0;
  if (quizPart === 0) return clampScore(casePart);
  if (casePart === 0) return clampScore(quizPart);
  return clampScore(quizPart * 0.4 + casePart * 0.6);
}

function weightedTotal(pillars: LearningScorePillars): number {
  return clampScore(
    pillars.hallazgos * 0.25 +
      pillars.casos * 0.3 +
      pillars.repaso * 0.2 +
      pillars.precision * 0.25,
  );
}

export function computeLearningScore(): LearningScoreSnapshot {
  const store = loadLearningStore();
  const pillars: LearningScorePillars = {
    hallazgos: scoreHallazgos(),
    casos: scoreCasos(),
    repaso: scoreRepaso(store),
    precision: scorePrecision(store),
  };
  const level = getLevelForXp(store.xp);
  const nextLevel = getNextLevel(level.id);
  const xpToNext = nextLevel ? Math.max(0, nextLevel.minXp - store.xp) : 0;

  return {
    total: weightedTotal(pillars),
    pillars,
    xp: store.xp,
    level,
    nextLevel,
    xpToNext,
    levelProgress: levelProgressPercent(store.xp, level, nextLevel),
    streakDays: store.streakDays,
  };
}
