"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Image } from "lucide-react";
import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
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
import { theme } from "@/lib/theme";
import type { LocalProgress } from "@/lib/auth";

const statusLabel = {
  "not-started": "No iniciado",
  "in-progress": "En curso",
  complete: "Completado",
};

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
  const activeSlug =
    mockCourse.activeModuleId ??
    courseModules.find((m) => getModuleStatus(m.slug, progress) !== "complete")?.slug ??
    courseModules[0].slug;
  const activeModule = courseModules.find((m) => m.slug === activeSlug);
  const resume = findResumeTarget(progress.completedSteps);
  const resumeModule = resume ? courseModules.find((m) => m.slug === resume.moduleSlug) : activeModule;
  const resumeHref = resume
    ? `/modulos/${resume.moduleSlug}?step=${resume.stepIndex}`
    : activeModule
      ? `/modulos/${activeModule.slug}?step=0`
      : "/modulos";
  const completedCount = progress.completedModules.length;

  return (
    <AppLayout user={user}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "16px 16px 24px" }}>
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 26,
              letterSpacing: 1,
              color: theme.text.primary,
            }}
          >
            Hola, {user.name.split(" ")[0]}
          </div>
          <div style={{ fontSize: 12, color: theme.text.secondary, marginTop: 4 }}>
            {mockCourse.name} · {mockCourse.tagline}
          </div>
          <div style={{ marginTop: 8 }}>
            <Badge variant="brand">{mockCourse.accessCode}</Badge>
          </div>
        </div>

        {resumeModule && (
          <ScanLineCard
            glow
            onClick={() => router.push(resumeHref)}
            style={{ padding: 16, marginBottom: 16 }}
          >
            <div
              style={{
                fontSize: 9,
                color: theme.brand.red,
                fontFamily: "'IBM Plex Mono', monospace",
                letterSpacing: 1,
                marginBottom: 4,
              }}
            >
              ▶ CONTINUAR APRENDIENDO
            </div>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 24,
                letterSpacing: 1,
                color: theme.text.primary,
                lineHeight: 1.1,
              }}
            >
              {resumeModule.order}. {resumeModule.title}
            </div>
            <div style={{ fontSize: 11, color: theme.text.muted, marginTop: 4, marginBottom: 12 }}>
              {resume ? `Paso: ${resume.stepTitle}` : resumeModule.subtitle}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 10,
                  color: theme.brand.red,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <ChevronRight size={11} /> Abrir módulo
              </span>
              <span style={{ fontSize: 10, color: theme.text.muted }}>
                {getModulePercent(resumeModule.slug, progress)}% completado
              </span>
            </div>
          </ScanLineCard>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 16 }}>
          <StatCard
            value={`${coursePct}%`}
            label="curso"
            sub={`${completedCount} de ${courseModules.length} módulos`}
            color={theme.brand.red}
          />
          <StatCard
            value={progress.completedCases.length}
            label="casos"
            sub={`de ${clinicalCases.length}`}
            color={theme.text.primary}
          />
          <StatCard
            value={quizAvg > 0 ? `${quizAvg}%` : "—"}
            label="quizzes"
            sub={`${progress.quizResults.length} realizados`}
            color={theme.text.secondary}
          />
        </div>

        <div
          style={{
            fontSize: 10,
            color: theme.text.muted,
            fontFamily: "'IBM Plex Mono', monospace",
            letterSpacing: 1,
            marginBottom: 8,
          }}
        >
          CURSO · {courseModules.length} MÓDULOS
        </div>

        <ScanLineCard style={{ padding: 8, marginBottom: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {courseModules.map((mod) => {
              const status = getModuleStatus(mod.slug, progress);
              const pct = getModulePercent(mod.slug, progress);
              const Icon = getModuleIcon(mod.icon);
              const barColor =
                status === "complete"
                  ? theme.text.primary
                  : status === "in-progress"
                    ? theme.brand.red
                    : theme.text.muted;

              return (
                <div
                  key={mod.slug}
                  onClick={() => router.push(`/modulos/${mod.slug}`)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 8px",
                    cursor: "pointer",
                    borderRadius: 8,
                  }}
                >
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 6,
                      background: theme.brand.redMuted,
                      border: `1px solid ${theme.bg.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 10,
                      color: theme.text.muted,
                    }}
                  >
                    {mod.order}
                  </div>
                  <Icon size={16} strokeWidth={1.5} color={theme.text.secondary} style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
                      <span
                        style={{
                          fontSize: 12,
                          color: theme.text.primary,
                          lineHeight: 1.35,
                        }}
                      >
                        {mod.title}
                      </span>
                      <span
                        style={{
                          fontSize: 9,
                          color: theme.text.muted,
                          fontFamily: "'IBM Plex Mono', monospace",
                          flexShrink: 0,
                        }}
                      >
                        {statusLabel[status]}
                      </span>
                    </div>
                    <ProgressBar value={pct} color={barColor} height={3} />
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      color: theme.text.muted,
                      fontFamily: "'IBM Plex Mono', monospace",
                      width: 32,
                      textAlign: "right",
                      flexShrink: 0,
                    }}
                  >
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>
        </ScanLineCard>

        <div
          style={{
            fontSize: 10,
            color: theme.text.muted,
            fontFamily: "'IBM Plex Mono', monospace",
            letterSpacing: 1,
            marginBottom: 8,
          }}
        >
          ACCESO RÁPIDO
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          <ScanLineCard onClick={() => router.push("/modulos")} style={{ padding: "12px 14px" }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: theme.text.primary }}>Todos los módulos</div>
            <div style={{ fontSize: 10, color: theme.text.muted, marginTop: 2 }}>Ver currículo completo</div>
          </ScanLineCard>
          <ScanLineCard onClick={() => router.push("/imagenes")} style={{ padding: "12px 14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Image size={14} color={theme.text.secondary} />
              <span style={{ fontSize: 12, fontWeight: 500, color: theme.text.primary }}>Biblioteca</span>
            </div>
            <div style={{ fontSize: 10, color: theme.text.muted, marginTop: 2 }}>Imágenes anotadas</div>
          </ScanLineCard>
        </div>
      </div>
    </AppLayout>
  );
}
