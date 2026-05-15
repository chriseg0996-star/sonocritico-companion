"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, ChevronRight } from "lucide-react";
import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/PageShell";
import { CompanionHero } from "@/components/dashboard/CompanionHero";
import { QuickAccessRow } from "@/components/dashboard/QuickAccessRow";
import { ConsultQuickCard } from "@/components/dashboard/ConsultQuickCard";
import { ContinueCompactCard } from "@/components/dashboard/ContinueCompactCard";
import { ScanLineCard } from "@/components/ui/base";
import { clinicalCases } from "@/lib/mock-data";
import { getProgress } from "@/lib/auth";
import { calcQuizAvg } from "@/lib/mock-data";
import { courseModules, getModuleIcon } from "@/lib/course-modules";
import { consultTiles } from "@/lib/dashboard-modules";
import { getCoursePercent, getModulePercent, getModuleStatus } from "@/lib/module-progress";
import { findResumeTarget } from "@/lib/module-steps";
import { type } from "@/lib/typography";
import { theme } from "@/lib/theme";
import type { LocalProgress } from "@/lib/auth";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ ...type.eyebrow, color: theme.accent.primary, margin: "0 0 14px" }}>{children}</h2>
  );
}

export default function DashboardPage() {
  const { user, loading } = useAuth("student");
  const router = useRouter();
  const [progress, setProgress] = useState<LocalProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  if (loading || !user || !progress) return <LoadingScreen />;

  const coursePct = getCoursePercent(progress);
  const quizAvg = calcQuizAvg(progress.quizResults);
  const resume = findResumeTarget(progress.completedSteps);
  const resumeModule = resume
    ? courseModules.find((m) => m.slug === resume.moduleSlug)
    : courseModules.find((m) => getModuleStatus(m.slug, progress) !== "complete");
  const resumeHref = resume
    ? `/modulos/${resume.moduleSlug}?step=${resume.stepIndex}`
    : resumeModule
      ? `/modulos/${resumeModule.slug}?step=0`
      : "/modulos";
  const completedCount = progress.completedModules.length;
  const ResumeIcon = resumeModule ? getModuleIcon(resumeModule.icon) : BookOpen;

  return (
    <AppLayout user={user}>
      <PageShell>
        {/* A. Hero */}
        <CompanionHero />

        {/* B. Accesos rápidos */}
        <SectionTitle>Accesos rápidos</SectionTitle>
        <QuickAccessRow />

        {/* C. Consulta rápida */}
        <SectionTitle>Consulta rápida</SectionTitle>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 12,
            marginBottom: 32,
          }}
        >
          {consultTiles.map((tile) => (
            <ConsultQuickCard key={tile.label} tile={tile} />
          ))}
        </div>

        {/* D. Reanudar curso */}
        {resumeModule && (
          <>
            <ContinueCompactCard
              module={resumeModule}
              stepTitle={resume?.stepTitle}
              icon={ResumeIcon}
              onContinue={() => router.push(resumeHref)}
            />
          </>
        )}

        {/* E. Progreso resumido */}
        <SectionTitle>Progreso del curso</SectionTitle>
        <ScanLineCard style={{ padding: "14px 18px" }}>
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
                <strong style={{ color: theme.text.primary, fontWeight: 600 }}>
                  {progress.completedCases.length}
                </strong>
                /{clinicalCases.length} casos
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
        </ScanLineCard>
      </PageShell>
    </AppLayout>
  );
}
