"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { clinicalCases, calcQuizAvg } from "@/lib/mock-data";
import { courseModules } from "@/lib/course-modules";
import { getCoursePercent, getModulePercent, getModuleStatus } from "@/lib/module-progress";
import { findResumeTarget } from "@/lib/module-steps";
import { type } from "@/lib/typography";
import { theme } from "@/lib/theme";
import type { LocalProgress } from "@/lib/auth";

export interface CourseProgressProps {
  progress: LocalProgress;
}

/** Bloque E — resumen de progreso del curso. */
export function CourseProgress({ progress }: CourseProgressProps) {
  const router = useRouter();
  const coursePct = getCoursePercent(progress);
  const quizAvg = calcQuizAvg(progress.quizResults);
  const completedCount = progress.completedModules.length;
  const resume = findResumeTarget(progress.completedSteps);
  const resumeModule = resume
    ? courseModules.find((m) => m.slug === resume.moduleSlug)
    : courseModules.find((m) => getModuleStatus(m.slug, progress) !== "complete");

  return (
    <>
      <SectionTitle>Progreso del curso</SectionTitle>
      <Card style={{ padding: "14px 18px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px 24px" }}>
            <span style={{ ...type.caption, color: theme.text.secondary }}>
              <strong style={{ color: theme.text.primary, fontWeight: 600 }}>{coursePct}%</strong> curso ·{" "}
              {completedCount}/{courseModules.length} módulos
            </span>
            <span style={{ ...type.caption, color: theme.text.secondary }}>
              <strong style={{ color: theme.text.primary, fontWeight: 600 }}>{progress.completedCases.length}</strong>/
              {clinicalCases.length} casos
            </span>
            <span style={{ ...type.caption, color: theme.text.secondary }}>
              Quizzes{" "}
              <strong style={{ color: theme.text.primary, fontWeight: 600 }}>
                {quizAvg > 0 ? `${quizAvg}%` : "—"}
              </strong>
              {progress.quizResults.length > 0 && ` · ${progress.quizResults.length} eval.`}
            </span>
            {resumeModule && (
              <span style={{ ...type.caption, color: theme.text.muted }}>
                Módulo activo: {getModulePercent(resumeModule.slug, progress)}%
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => router.push("/progreso")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              color: theme.accent.primary,
              fontFamily: "'IBM Plex Sans', sans-serif",
            }}
          >
            Ver detalle <ChevronRight size={14} />
          </button>
        </div>
      </Card>
    </>
  );
}
