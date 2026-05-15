import type { LocalProgress } from "@/lib/auth";
import { getModuleSteps } from "@/lib/module-steps";

export function getModuleStepsPercent(moduleSlug: string, progress: LocalProgress): number {
  const steps = getModuleSteps(moduleSlug);
  if (steps.length === 0) return 0;
  const done = progress.completedSteps[moduleSlug] ?? [];
  const unique = new Set(done);
  return Math.round((unique.size / steps.length) * 100);
}

export function isStepComplete(
  moduleSlug: string,
  stepId: string,
  progress: LocalProgress
): boolean {
  return (progress.completedSteps[moduleSlug] ?? []).includes(stepId);
}
