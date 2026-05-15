"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Brain, Image } from "lucide-react";
import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContinueHeroCard } from "@/components/dashboard/ContinueHeroCard";
import { ScanLineCard, Badge, ProgressBar, StatCard } from "@/components/ui/base";
import { clinicalCases, mockCourse } from "@/lib/mock-data";
import { getProgress } from "@/lib/auth";
import { calcQuizAvg } from "@/lib/mock-data";
import { courseModules, getModuleIcon } from "@/lib/course-modules";
import {
  getCoursePercent,
  getModulePercent,
  getModuleStatus,
} from "@/lib/module-progress";
import { findResumeTarget } from "@/lib/module-steps";
import { type } from "@/lib/typography";
import { theme } from "@/lib/theme";
import type { LocalProgress } from "@/lib/auth";

const statusLabel = {
  "not-started": "Pendiente",
  "in-progress": "En curso",
  complete: "Completado",
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ ...type.eyebrow, color: theme.text.muted, margin: "0 0 12px" }}>{children}</h2>
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
        <PageHeader
          eyebrow={mockCourse.name}
          title={`Hola, ${user.name.split(" ")[0]}`}
          subtitle={mockCourse.tagline}
          action={<Badge variant="brand">{mockCourse.accessCode}</Badge>}
        />

        {resumeModule && (
          <ContinueHeroCard
            module={resumeModule}
            stepTitle={resume?.stepTitle}
            modulePercent={getModulePercent(resumeModule.slug, progress)}
            coursePercent={coursePct}
            icon={ResumeIcon}
            onContinue={() => router.push(resumeHref)}
          />
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <StatCard
            value={`${coursePct}%`}
            label="Progreso del curso"
            sub={`${completedCount} de ${courseModules.length} modulos`}
            color={theme.brand.red}
          />
          <StatCard
            value={progress.completedCases.length}
            label="Casos completados"
            sub={`de ${clinicalCases.length} disponibles`}
            color={theme.text.primary}
          />
          <StatCard
            value={quizAvg > 0 ? `${quizAvg}%` : "-"}
            label="Promedio en quizzes"
            sub={`${progress.quizResults.length} evaluaciones`}
            color={theme.text.secondary}
          />
        </div>

        <SectionTitle>Currículo del curso</SectionTitle>
        <ScanLineCard style={{ padding: 10, marginBottom: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {courseModules.map((mod) => {
              const status = getModuleStatus(mod.slug, progress);
              const pct = getModulePercent(mod.slug, progress);
              const Icon = getModuleIcon(mod.icon);
              const barColor =
                status === "complete"
                  ? theme.text.primary
                  : status === "in-progress"
                    ? theme.brand.red
                    : theme.bg.border;

              return (
                <div
                  key={mod.slug}
                  role="button"
                  tabIndex={0}
                  onClick={() => router.push(`/modulos/${mod.slug}?step=0`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") router.push(`/modulos/${mod.slug}?step=0`);
                  }}
                  className="module-row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 10px",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: theme.brand.redMuted,
                      border: `1px solid ${theme.bg.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: 12,
                      fontWeight: 600,
                      color: theme.brand.red,
                      fontFamily: type.body.fontFamily,
                    }}
                  >
                    {mod.order}
                  </div>
                  <Icon size={18} strokeWidth={1.5} color={theme.text.secondary} style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 8,
                        marginBottom: 6,
                        alignItems: "baseline",
                      }}
                    >
                      <span style={{ ...type.bodySm, color: theme.text.primary, fontWeight: 500 }}>
                        {mod.title}
                      </span>
                      <Badge
                        variant={
                          status === "complete" ? "white" : status === "in-progress" ? "brand" : "gray"
                        }
                      >
                        {statusLabel[status]}
                      </Badge>
                    </div>
                    <ProgressBar value={pct} color={barColor} height={4} />
                  </div>
                  <span
                    style={{
                      ...type.caption,
                      color: theme.text.muted,
                      width: 36,
                      textAlign: "right",
                      flexShrink: 0,
                      fontWeight: 500,
                    }}
                  >
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>
        </ScanLineCard>

        <SectionTitle>Acceso rápido</SectionTitle>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 12,
          }}
        >
          <ScanLineCard onClick={() => router.push("/modulos")} style={{ padding: "16px 18px" }}>
            <BookOpen size={20} color={theme.brand.red} style={{ marginBottom: 10 }} />
            <div style={{ ...type.titleSm, color: theme.text.primary, marginBottom: 4 }}>Todos los modulos</div>
            <p style={{ ...type.caption, color: theme.text.muted, margin: 0 }}>Curriculo completo en orden</p>
          </ScanLineCard>
          <ScanLineCard onClick={() => router.push("/repaso")} style={{ padding: "16px 18px" }}>
            <Brain size={20} color={theme.brand.red} style={{ marginBottom: 10 }} />
            <div style={{ ...type.titleSm, color: theme.text.primary, marginBottom: 4 }}>Repaso flashcards</div>
            <p style={{ ...type.caption, color: theme.text.muted, margin: 0 }}>Tarjetas por protocolo</p>
          </ScanLineCard>
          <ScanLineCard onClick={() => router.push("/imagenes")} style={{ padding: "16px 18px" }}>
            <Image size={20} color={theme.brand.red} style={{ marginBottom: 10 }} />
            <div style={{ ...type.titleSm, color: theme.text.primary, marginBottom: 4 }}>Biblioteca</div>
            <p style={{ ...type.caption, color: theme.text.muted, margin: 0 }}>Imágenes anotadas</p>
          </ScanLineCard>
        </div>
      </PageShell>
    </AppLayout>
  );
}
