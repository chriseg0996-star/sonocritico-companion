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
import { PulmonBlueReferenceView } from "@/components/modules/PulmonBlueReferenceView";
import { courseModules, getModule, getModuleIcon } from "@/lib/course-modules";
import { PULMON_BLUE_SLUG } from "@/lib/modules/pulmonar-blue-reference";
import { getProgress, completeModule } from "@/lib/auth";
import { getModulePercent, getModuleStatus } from "@/lib/module-progress";
import { getModuleSteps } from "@/lib/module-steps";
import { parseModuleTab, type ModuleTabId } from "@/lib/module-tabs";
import { PageShell } from "@/components/layout/PageShell";
import { type } from "@/lib/typography";
import { theme } from "@/lib/theme";
import type { LocalProgress } from "@/lib/auth";

const PULMON_SECONDARY_TABS: ModuleTabId[] = ["quiz", "checklist", "protocolo"];

export default function ModuloDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { user, loading } = useAuth("student");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState<LocalProgress | null>(null);

  const tabParam = searchParams.get("tab");
  const tab = parseModuleTab(tabParam);
  const isPulmonGold = slug === PULMON_BLUE_SLUG;
  const pulmonSecondary =
    isPulmonGold && tabParam !== null && PULMON_SECONDARY_TABS.includes(tab);
  const pulmonReference = isPulmonGold && !pulmonSecondary;
  const isReference = tabParam !== null && !pulmonReference;
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
      <PageShell>
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

        {!pulmonReference && (
          <>
            <div style={{ display: "flex", gap: 12, marginBottom: 16, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 10,
                  background: theme.accent.muted,
                  border: `1px solid ${theme.accent.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={22} color={theme.brand.primary} strokeWidth={1.5} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ ...type.eyebrow, color: theme.text.muted, margin: "0 0 4px" }}>
                  Modulo {mod.order} de {courseModules.length}
                </p>
                <h1 style={{ ...type.title, color: theme.text.primary, margin: 0, lineHeight: 1.2 }}>
                  {mod.title}
                </h1>
                <div style={{ fontSize: 12, color: theme.text.secondary, marginTop: 4 }}>
                  {mod.subtitle}
                </div>
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
              <p style={{ ...type.caption, color: theme.text.muted, marginTop: 6 }}>
                {pct}% del modulo
              </p>
            </div>
          </>
        )}

        {pulmonReference ? (
          <PulmonBlueReferenceView onOpenSecondary={setTab} />
        ) : pulmonSecondary ? (
          <>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
              <Btn variant="ghost" onClick={() => router.replace(`/modulos/${slug}`)} style={{ fontSize: 11 }}>
                ← Referencia clínica
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
        ) : isReference ? (
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
            <Btn
              variant="ghost"
              onClick={() =>
                router.push(
                  `/modulos/${prev.slug}${prev.slug === PULMON_BLUE_SLUG ? "" : "?step=0"}`
                )
              }
            >
              ← {prev.title}
            </Btn>
          ) : (
            <span />
          )}
          {next && (
            <Btn
              variant="ghost"
              onClick={() =>
                router.push(
                  `/modulos/${next.slug}${next.slug === PULMON_BLUE_SLUG ? "" : "?step=0"}`
                )
              }
            >
              {next.title} →
            </Btn>
          )}
        </div>
      </PageShell>
    </AppLayout>
  );
}
