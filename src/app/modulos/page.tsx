"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { ScanLineCard, Badge, ProgressBar } from "@/components/ui/base";
import { courseModules, getModuleIcon } from "@/lib/course-modules";
import { getProgress } from "@/lib/auth";
import { getModulePercent, getModuleStatus } from "@/lib/module-progress";
import { theme } from "@/lib/theme";
import type { LocalProgress } from "@/lib/auth";

export default function ModulosPage() {
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
            Módulos del curso
          </div>
          <div style={{ fontSize: 12, color: theme.text.secondary, marginTop: 4 }}>
            SonoCrítico MX · {courseModules.length} temas en orden
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {courseModules.map((mod) => {
            const pct = getModulePercent(mod.slug, progress);
            const status = getModuleStatus(mod.slug, progress);
            const Icon = getModuleIcon(mod.icon);

            return (
              <ScanLineCard
                key={mod.slug}
                onClick={() => router.push(`/modulos/${mod.slug}?step=0`)}
                style={{ padding: "14px 16px" }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: theme.brand.redMuted,
                      border: `1px solid ${theme.bg.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 12,
                      color: theme.brand.red,
                    }}
                  >
                    {mod.order}
                  </div>
                  <Icon size={20} strokeWidth={1.5} color={theme.text.secondary} style={{ marginTop: 8 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: theme.text.primary }}>{mod.title}</div>
                        <div style={{ fontSize: 11, color: theme.text.muted, marginTop: 2 }}>{mod.subtitle}</div>
                      </div>
                      <Badge variant={status === "complete" ? "white" : status === "in-progress" ? "brand" : "gray"}>
                        {status === "complete" ? "Listo" : status === "in-progress" ? "En curso" : "Pendiente"}
                      </Badge>
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <ProgressBar value={pct} height={3} />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 6,
                        fontSize: 10,
                        color: theme.text.muted,
                        fontFamily: "'IBM Plex Mono', monospace",
                      }}
                    >
                      <span>~{mod.estimatedMinutes} min</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4, color: theme.brand.red }}>
                        Abrir <ChevronRight size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              </ScanLineCard>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
