"use client";

import { useRouter } from "next/navigation";
import { ContinueCompactCard } from "@/components/dashboard/ContinueCompactCard";
import { courseModules, getModuleIcon } from "@/lib/course-modules";
import { getModuleStatus } from "@/lib/module-progress";
import { findResumeTarget } from "@/lib/module-steps";
import type { LocalProgress } from "@/lib/auth";

export interface ContinueCourseProps {
  progress: LocalProgress;
}

/** Bloque D — reanudar curso según progreso local. */
export function ContinueCourse({ progress }: ContinueCourseProps) {
  const router = useRouter();
  const resume = findResumeTarget(progress.completedSteps);
  const resumeModule = resume
    ? courseModules.find((m) => m.slug === resume.moduleSlug)
    : courseModules.find((m) => getModuleStatus(m.slug, progress) !== "complete");

  if (!resumeModule) return null;

  const resumeHref = resume
    ? `/modulos/${resume.moduleSlug}?step=${resume.stepIndex}`
    : `/modulos/${resumeModule.slug}?step=0`;
  const ResumeIcon = getModuleIcon(resumeModule.icon);

  return (
    <ContinueCompactCard
      module={resumeModule}
      stepTitle={resume?.stepTitle}
      icon={ResumeIcon}
      onContinue={() => router.push(resumeHref)}
    />
  );
}
