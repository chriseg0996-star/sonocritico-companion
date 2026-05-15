import type { LocalProgress } from "@/lib/auth";
import { clinicalCases, protocols, quizQuestions } from "@/lib/mock-data";
import {
  courseModules,
  getModule,
  PROTOCOL_TO_MODULES,
} from "@/lib/course-modules";
import { getModulePractice } from "@/lib/module-practice";
import { getModuleStepsPercent } from "@/lib/module-step-progress";

export type ModuleStatus = "not-started" | "in-progress" | "complete";

export interface ModuleProgressBreakdown {
  steps: number;
  checklist: number;
  quiz: number;
  overall: number;
}

export function migrateProgress(progress: LocalProgress): LocalProgress {
  const completedModules = [...(progress.completedModules ?? [])];

  for (const slug of progress.completedProtocols) {
    for (const moduleSlug of PROTOCOL_TO_MODULES[slug] ?? []) {
      if (!completedModules.includes(moduleSlug)) {
        completedModules.push(moduleSlug);
      }
    }
  }

  return { ...progress, completedModules };
}

function getChecklistStorageKey(moduleSlug: string, protocolSlugs: string[]): string {
  if (protocolSlugs[0]) return protocolSlugs[0];
  return `mod-${moduleSlug}`;
}

function getChecklistItems(moduleSlug: string, protocolSlugs: string[]) {
  if (protocolSlugs[0]) {
    const proto = protocols.find((p) => p.slug === protocolSlugs[0]);
    return proto?.checklistItems ?? [];
  }
  return getModulePractice(moduleSlug)?.checklistItems ?? [];
}

function getQuizRef(moduleSlug: string, protocolSlugs: string[]): string {
  return protocolSlugs[0] ?? `mod-${moduleSlug}`;
}

export function getModuleChecklistPercent(
  moduleSlug: string,
  progress: LocalProgress
): number {
  const mod = getModule(moduleSlug);
  if (!mod) return 0;

  const items = getChecklistItems(moduleSlug, mod.protocolSlugs);
  if (items.length === 0) return 0;

  const key = getChecklistStorageKey(moduleSlug, mod.protocolSlugs);
  const cl = progress.checklistStatus[key] ?? {};
  const done = items.filter((i) => cl[i.id]).length;
  return Math.round((done / items.length) * 100);
}

export function getModuleQuizPercent(moduleSlug: string, progress: LocalProgress): number {
  const mod = getModule(moduleSlug);
  if (!mod) return 0;

  const ref = getQuizRef(moduleSlug, mod.protocolSlugs);
  const questions = quizQuestions.filter((q) => q.protocolRef === ref);
  if (questions.length === 0) return 0;

  const answered = questions.filter((q) =>
    progress.quizResults.some((r) => r.quizId === q.id)
  ).length;
  return Math.round((answered / questions.length) * 100);
}

export function getModuleProgressBreakdown(
  moduleSlug: string,
  progress: LocalProgress
): ModuleProgressBreakdown {
  const mod = getModule(moduleSlug);
  if (!mod) return { steps: 0, checklist: 0, quiz: 0, overall: 0 };

  const steps = getModuleStepsPercent(moduleSlug, progress);

  if (progress.completedModules.includes(moduleSlug)) {
    return { steps: 100, checklist: 100, quiz: 100, overall: 100 };
  }

  if (mod.isCapstone) {
    const casesPct =
      clinicalCases.length === 0
        ? 0
        : Math.round((progress.completedCases.length / clinicalCases.length) * 100);
    const checklist = getModuleChecklistPercent(moduleSlug, progress);
    const quiz = getModuleQuizPercent(moduleSlug, progress);
    const overall = Math.round((steps + casesPct + checklist + quiz) / 4);
    return { steps, checklist: Math.max(checklist, casesPct), quiz, overall };
  }

  const checklist = getModuleChecklistPercent(moduleSlug, progress);
  const quiz = getModuleQuizPercent(moduleSlug, progress);

  if (mod.protocolSlugs.some((s) => progress.completedProtocols.includes(s))) {
    return { steps: Math.max(steps, 100), checklist: Math.max(checklist, 100), quiz: Math.max(quiz, 100), overall: 100 };
  }

  const parts: number[] = [steps];
  if (getChecklistItems(moduleSlug, mod.protocolSlugs).length > 0) parts.push(checklist);
  if (quizQuestions.filter((q) => q.protocolRef === getQuizRef(moduleSlug, mod.protocolSlugs)).length > 0) {
    parts.push(quiz);
  }

  const overall =
    parts.length === 0 ? 0 : Math.round(parts.reduce((a, b) => a + b, 0) / parts.length);

  return { steps, checklist, quiz, overall };
}

export function getModuleStatus(
  moduleSlug: string,
  progress: LocalProgress
): ModuleStatus {
  if (progress.completedModules.includes(moduleSlug)) return "complete";

  const pct = getModulePercent(moduleSlug, progress);
  if (pct > 0) return "in-progress";
  return "not-started";
}

export function getModulePercent(moduleSlug: string, progress: LocalProgress): number {
  return getModuleProgressBreakdown(moduleSlug, progress).overall;
}

export function getCoursePercent(progress: LocalProgress): number {
  const pcts = courseModules.map((m) => getModulePercent(m.slug, progress));
  return Math.round(pcts.reduce((a, b) => a + b, 0) / courseModules.length);
}

export function completeModule(slug: string, progress: LocalProgress): LocalProgress {
  const completedModules = progress.completedModules.includes(slug)
    ? progress.completedModules
    : [...progress.completedModules, slug];
  return { ...progress, completedModules };
}
