"use client";
import { use, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge, Btn, ProgressBar } from "@/components/ui/base";
import { ModuleTabBar } from "@/components/modules/ModuleTabBar";
import { ModuleTabContent } from "@/components/modules/ModuleTabContent";
import { ModuleLessonFlow } from "@/components/modules/ModuleLessonFlow";
import { courseModules, getModule, getModuleIcon } from "@/lib/course-modules";
import { getProgress, completeModule } from "@/lib/auth";
import { getModulePercent, getModuleStatus } from "@/lib/module-progress";
import { getModuleSteps } from "@/lib/module-steps";
import { parseModuleTab } from "@/lib/module-tabs";
import { theme } from "@/lib/theme";
import type { LocalProgress } from "@/lib/auth";

export default function ModuloDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { user, loading } = useAuth("student");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState<LocalProgress | null>(null);

  const tabParam = searchParams.get("tab");
  const isReference = tabParam !== null;
  const tab = parseModuleTab(tabParam);
  const stepParam = searchParams.get("step");
  const steps = getModuleSteps(slug);
  const stepIndex = Math.min(
    Math.max(0, stepParam ? parseInt(stepParam, 10) : 0),
    Math.max(0, steps.length - 1)
  );

  const mod = getModule(slug);
  const modIndex = courseModules.findIndex((m) => m.slug === slug);
  const prev = modIndex > 0 ? courseModules[modIndex - 1] : null;
  const next = modIndex < courseModules.length - 1 ? courseModules[modIndex + 1] : null;

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  if (loading || !user || !progress) return <LoadingScreen />;
  if (!mod) {
    router.push("/modulos");
    return <LoadingScreen />;
  }

  const pct = getModulePercent(mod.slug, progress);
  const status = getModuleStatus(mod.slug, progress);
  const Icon = getModuleIcon(mod.icon);

  function setTab(id: ReturnType<typeof parseModuleTab>) {
    router.replace(`/modulos/${slug}?tab=${id}`);
  }

  function openLesson() {
    router.replace(`/modulos/${slug}?step=0`);
  }

  function handleMarkComplete() {
    if (!mod) return;
    completeModule(mod.slug);
    setProgress(getProgress());
  }

  return (
    <AppLayout user={user}>
      <div className="module-page" style={{ maxWidth: 900, margin: "0 auto", padding: "16px 16px 24px" }}>
        <div
          onClick={() => router.push("/modulos")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
            color: theme.text.muted,
            marginBottom: 16,
            fontSize: 12,
          }}
        >
          <ArrowLeft size={14} /> Volver a módulos
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "flex-start" }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: theme.brand.redMuted,
              border: `1px solid ${theme.brand.redBorder}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={22} color={theme.brand.red} strokeWidth={1.5} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 10, color: theme.text.muted, fontFamily: "'IBM Plex Mono', monospace" }}>
              MÓDULO {mod.order} DE {courseModules.length}
            </div>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 28,
                letterSpacing: 1,
                color: theme.text.primary,
                lineHeight: 1.1,
              }}
            >
              {mod.title}
            </div>
            <div style={{ fontSize: 12, color: theme.text.secondary, marginTop: 4 }}>{mod.subtitle}</div>
            <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
              <Badge variant={status === "complete" ? "white" : "brand"}>
                {status === "complete" ? "Completado" : status === "in-progress" ? "En curso" : "Pendiente"}
              </Badge>
              <Badge variant="gray">~{mod.estimatedMinutes} min</Badge>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <ProgressBar value={pct} />
          <div style={{ fontSize: 10, color: theme.text.muted, marginTop: 4, fontFamily: "'IBM Plex Mono', monospace" }}>
            {pct}% del módulo
          </div>
        </div>

        {isReference ? (
          <>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
              <Btn variant="ghost" onClick={openLesson} style={{ fontSize: 11 }}>
                ← Volver a lección
              </Btn>
            </div>
            <ModuleTabBar active={tab} onChange={setTab} />
            <ModuleTabContent
              mod={mod}
              tab={tab}
              progress={progress}
              onProgressChange={setProgress}
              onMarkComplete={handleMarkComplete}
              isComplete={status === "complete"}
            />
          </>
        ) : (
          <ModuleLessonFlow
            mod={mod}
            stepIndex={stepIndex}
            progress={progress}
            onProgressChange={setProgress}
            onMarkComplete={handleMarkComplete}
            isComplete={status === "complete"}
            onOpenReference={() => setTab("resumen")}
          />
        )}

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, gap: 8 }}>
          {prev ? (
            <Btn variant="ghost" onClick={() => router.push(`/modulos/${prev.slug}?step=0`)}>
              ← {prev.title}
            </Btn>
          ) : (
            <span />
          )}
          {next && (
            <Btn variant="ghost" onClick={() => router.push(`/modulos/${next.slug}?step=0`)}>
              {next.title} →
            </Btn>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
