"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Activity, CheckCircle2, ChevronRight, Clock } from "lucide-react";
import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { ScanLineCard, Badge } from "@/components/ui/base";
import { clinicalCases } from "@/lib/mock-data";
import { getProgress } from "@/lib/auth";
import { theme } from "@/lib/theme";
import type { LocalProgress } from "@/lib/auth";

const difficultyLabels = ["", "Básico", "Intermedio", "Avanzado"];

export default function CasosPage() {
  const { user, loading } = useAuth("student");
  const router = useRouter();
  const [progress, setProgress] = useState<LocalProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  if (loading || !user || !progress) return <LoadingScreen />;

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
            Casos clínicos
          </div>
          <div style={{ fontSize: 12, color: theme.text.secondary }}>
            {progress.completedCases.length} de {clinicalCases.length} completados · Módulo 10
          </div>
        </div>

        {clinicalCases.length === 0 ? (
          <ScanLineCard style={{ padding: 24, textAlign: "center" }}>
            <p style={{ fontSize: 13, color: theme.text.secondary }}>No hay casos disponibles.</p>
          </ScanLineCard>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {clinicalCases.map((c) => {
              const done = progress.completedCases.includes(c.id);
              return (
                <ScanLineCard
                  key={c.id}
                  onClick={() => router.push(`/casos/${c.id}`)}
                  glow={!done}
                  style={{ padding: "14px 16px", cursor: "pointer" }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        background: done ? theme.brand.redMuted : theme.bg.elevated,
                        border: `1px solid ${done ? theme.brand.redBorder : theme.bg.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {done ? (
                        <CheckCircle2 size={20} strokeWidth={1.5} color={theme.brand.red} />
                      ) : (
                        <Activity size={20} strokeWidth={1.5} color={theme.text.secondary} />
                      )}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 4,
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: 16,
                            letterSpacing: 0.5,
                            color: theme.text.primary,
                          }}
                        >
                          {c.title}
                        </span>
                        {done && <Badge variant="white">Completado</Badge>}
                      </div>
                      <p
                        style={{
                          fontSize: 11,
                          color: theme.text.secondary,
                          marginBottom: 8,
                          lineHeight: 1.55,
                        }}
                      >
                        {c.scenario}
                      </p>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 3,
                            fontSize: 10,
                            color: theme.brand.red,
                          }}
                        >
                          <div
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: theme.brand.red,
                            }}
                          />
                          {difficultyLabels[c.difficulty]}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 3,
                            fontSize: 10,
                            color: theme.text.muted,
                          }}
                        >
                          <Clock size={10} strokeWidth={1.5} />
                          {c.questions.length} preguntas
                        </div>
                        {c.protocolRefs.map((ref) => (
                          <Badge key={ref} variant="gray">
                            {ref}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <ChevronRight
                      size={16}
                      strokeWidth={1.5}
                      color={theme.text.muted}
                      style={{ flexShrink: 0, marginTop: 4 }}
                    />
                  </div>

                  <div
                    style={{
                      marginTop: 10,
                      display: "flex",
                      gap: 12,
                      paddingTop: 10,
                      borderTop: `1px solid ${theme.bg.border}`,
                      flexWrap: "wrap",
                    }}
                  >
                    {[
                      { label: "FC", value: `${c.vitals.hr} lpm` },
                      { label: "TA", value: c.vitals.bp },
                      { label: "FR", value: `${c.vitals.rr}/min` },
                      { label: "SpO2", value: `${c.vitals.spo2}%` },
                      ...(c.vitals.map ? [{ label: "MAP", value: `${c.vitals.map} mmHg` }] : []),
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <div
                          style={{
                            fontSize: 9,
                            color: theme.text.muted,
                            fontFamily: "'IBM Plex Mono', monospace",
                          }}
                        >
                          {label}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: theme.text.primary,
                            fontFamily: "'IBM Plex Mono', monospace",
                          }}
                        >
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScanLineCard>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
