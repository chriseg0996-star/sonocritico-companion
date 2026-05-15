import type { ModuleTabId } from "@/lib/module-tabs";
import { courseModules, getModule } from "@/lib/course-modules";

export interface ModuleStep {
  id: string;
  tab: ModuleTabId;
  title: string;
  durationMin: number;
}

export function getModuleSteps(moduleSlug: string): ModuleStep[] {
  const mod = getModule(moduleSlug);
  if (!mod) return [];

  const steps: ModuleStep[] = [
    {
      id: `${moduleSlug}-intro`,
      tab: "resumen",
      title: "Introducción",
      durationMin: 2,
    },
    {
      id: `${moduleSlug}-acq`,
      tab: "adquisicion",
      title: "Adquisición",
      durationMin: 3,
    },
    {
      id: `${moduleSlug}-find`,
      tab: "hallazgos",
      title: "Hallazgos clave",
      durationMin: 4,
    },
  ];

  if (mod.protocolSlugs.length > 0) {
    steps.push({
      id: `${moduleSlug}-proto`,
      tab: "protocolo",
      title: "Protocolo",
      durationMin: 4,
    });
  }

  steps.push(
    {
      id: `${moduleSlug}-check`,
      tab: "checklist",
      title: "Checklist",
      durationMin: 3,
    },
    {
      id: `${moduleSlug}-quiz`,
      tab: "quiz",
      title: "Evaluación",
      durationMin: 5,
    },
    {
      id: `${moduleSlug}-pocket`,
      tab: "pocket",
      title: "Resumen rápido",
      durationMin: 1,
    }
  );

  return steps;
}

export function getModuleStepIndex(moduleSlug: string, stepId: string): number {
  const steps = getModuleSteps(moduleSlug);
  return steps.findIndex((s) => s.id === stepId);
}

export function getEstimatedLessonMinutes(moduleSlug: string): number {
  return getModuleSteps(moduleSlug).reduce((sum, s) => sum + s.durationMin, 0);
}

export interface ResumeTarget {
  moduleSlug: string;
  stepIndex: number;
  stepTitle: string;
}

export function findResumeTarget(
  completedSteps: Record<string, string[]>
): ResumeTarget | null {
  for (const mod of courseModules) {
    const steps = getModuleSteps(mod.slug);
    const done = new Set(completedSteps[mod.slug] ?? []);
    const nextIndex = steps.findIndex((s) => !done.has(s.id));
    if (nextIndex >= 0) {
      return {
        moduleSlug: mod.slug,
        stepIndex: nextIndex,
        stepTitle: steps[nextIndex]!.title,
      };
    }
  }
  return null;
}
