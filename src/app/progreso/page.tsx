"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { ScanLineCard, Badge, ProgressBar, Btn } from "@/components/ui/base";
import { clinicalCases, quizQuestions } from "@/lib/mock-data";
import { getProgress } from "@/lib/auth";
import { calcQuizAvg } from "@/lib/mock-data";
import { courseModules, getModuleIcon } from "@/lib/course-modules";
import {
  getCoursePercent,
  getModuleProgressBreakdown,
  getModuleStatus,
} from "@/lib/module-progress";
import { theme } from "@/lib/theme";
import type { LocalProgress } from "@/lib/auth";

export default function ProgresoPage() {
  const { user, loading } = useAuth("student");
  const router = useRouter();
  const [progress, setProgress] = useState<LocalProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  if (loading || !user || !progress) return <LoadingScreen />;

  const coursePct = getCoursePercent(progress);
  const quizAvg = calcQuizAvg(progress.quizResults);
  const completedModules = progress.completedModules.length;
  const modulesInProgress = courseModules.filter(
    (m) => getModuleStatus(m.slug, progress) === "in-progress"
  ).length;

  return (
    <AppLayout user={user}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "16px 16px 24px" }}>
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 28,
              letterSpacing: 1,
              color: theme.text.primary,
            }}
          >
            Mi progreso
          </div>
          <div style={{ fontSize: 12, color: theme.text.secondary }}>
            Avance por módulos del curso SonoCrítico MX
          </div>
        </div>

        <ScanLineCard style={{ padding: 20, marginBottom: 16, textAlign: "center" }}>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 52,
              color: theme.brand.red,
              lineHeight: 1,
            }}
          >
            {coursePct}%
          </div>
          <div style={{ fontSize: 12, color: theme.text.muted, marginTop: 6 }}>
            Progreso general del curso
          </div>
          <div style={{ marginTop: 14 }}>
            <ProgressBar value={coursePct} />
          </div>
        </ScanLineCard>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8,
            marginBottom: 20,
          }}
        >
          {[
            { label: "Módulos", value: `${completedModules}/${courseModules.length}` },
            { label: "En curso", value: String(modulesInProgress) },
            { label: "Casos", value: `${progress.completedCases.length}/${clinicalCases.length}` },
          ].map(({ label, value }) => (
            <ScanLineCard key={label} style={{ padding: "12px 10px", textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 22,
                  color: theme.text.primary,
                  lineHeight: 1,
                }}
              >
                {value}
              </div>
              <div style={{ fontSize: 10, color: theme.text.muted, marginTop: 4 }}>{label}</div>
            </ScanLineCard>
          ))}
        </div>

        <div
          style={{
            fontSize: 10,
            color: theme.brand.red,
            fontFamily: "'IBM Plex Mono', monospace",
            letterSpacing: 1,
            marginBottom: 8,
          }}
        >
          MÓDULOS DEL CURSO
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {courseModules.map((mod) => {
            const breakdown = getModuleProgressBreakdown(mod.slug, progress);
            const status = getModuleStatus(mod.slug, progress);
            const Icon = getModuleIcon(mod.icon);

            return (
              <ScanLineCard
                key={mod.slug}
                onClick={() => router.push(`/modulos/${mod.slug}`)}
                style={{ padding: "12px 14px", cursor: "pointer" }}
              >
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <Icon size={18} color={theme.brand.red} strokeWidth={1.5} style={{ marginTop: 2, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 8,
                        alignItems: "flex-start",
                        marginBottom: 6,
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: theme.text.primary }}>
                          {mod.order}. {mod.title}
                        </div>
                        <div style={{ fontSize: 10, color: theme.text.muted, marginTop: 2 }}>
                          {mod.subtitle}
                        </div>
                      </div>
                      <Badge variant={status === "complete" ? "white" : status === "in-progress" ? "brand" : "gray"}>
                        {status === "complete" ? "Listo" : status === "in-progress" ? "En curso" : "Pendiente"}
                      </Badge>
                    </div>
                    <ProgressBar value={breakdown.overall} height={4} />
                    <div
                      style={{
                        display: "flex",
                        gap: 12,
                        marginTop: 6,
                        fontSize: 9,
                        color: theme.text.muted,
                        fontFamily: "'IBM Plex Mono', monospace",
                        flexWrap: "wrap",
                      }}
                    >
                      <span>Total {breakdown.overall}%</span>
                      <span>Checklist {breakdown.checklist}%</span>
                      <span>Quiz {breakdown.quiz}%</span>
                    </div>
                  </div>
                </div>
              </ScanLineCard>
            );
          })}
        </div>

        {progress.quizResults.length > 0 && (
          <>
            <div
              style={{
                fontSize: 10,
                color: theme.brand.red,
                fontFamily: "'IBM Plex Mono', monospace",
                letterSpacing: 1,
                marginBottom: 8,
              }}
            >
              HISTORIAL DE QUIZZES · PROMEDIO {quizAvg > 0 ? `${quizAvg}%` : "—"}
            </div>
            <ScanLineCard style={{ padding: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {progress.quizResults.map((r, i) => {
                  const q = quizQuestions.find((qq) => qq.id === r.quizId);
                  return (
                    <div
                      key={`${r.quizId}-${i}`}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "6px 0",
                        borderBottom:
                          i < progress.quizResults.length - 1
                            ? `1px solid ${theme.bg.border}`
                            : "none",
                      }}
                    >
                      <div style={{ minWidth: 0, paddingRight: 8 }}>
                        <div
                          style={{
                            fontSize: 11,
                            color: theme.text.secondary,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {q?.question ?? r.quizId}
                        </div>
                        <div
                          style={{
                            fontSize: 9,
                            color: theme.text.muted,
                            fontFamily: "'IBM Plex Mono', monospace",
                          }}
                        >
                          {r.protocolRef}
                        </div>
                      </div>
                      <Badge variant={r.score === 100 ? "white" : r.score >= 50 ? "gray" : "red"}>
                        {r.score}%
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </ScanLineCard>
          </>
        )}

        <Btn variant="ghost" onClick={() => router.push("/modulos")} style={{ marginTop: 16, width: "100%" }}>
          Ver todos los módulos
        </Btn>
      </div>
    </AppLayout>
  );
}
