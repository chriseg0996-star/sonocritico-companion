"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, List } from "lucide-react";
import { Btn, ProgressBar } from "@/components/ui/base";
import { ModuleTabContent } from "@/components/modules/ModuleTabContent";
import { completeModuleStep, getProgress } from "@/lib/auth";
import type { LocalProgress } from "@/lib/auth";
import { getModuleSteps, getEstimatedLessonMinutes } from "@/lib/module-steps";
import { getModuleStepsPercent } from "@/lib/module-step-progress";
import { theme } from "@/lib/theme";
import type { CourseModule } from "@/types";

export function ModuleLessonFlow({
  mod,
  stepIndex,
  progress,
  onProgressChange,
  onMarkComplete,
  isComplete,
  onOpenReference,
}: {
  mod: CourseModule;
  stepIndex: number;
  progress: LocalProgress;
  onProgressChange: (p: LocalProgress) => void;
  onMarkComplete: () => void;
  isComplete: boolean;
  onOpenReference: () => void;
}) {
  const router = useRouter();
  const steps = getModuleSteps(mod.slug);
  const step = steps[stepIndex];
  const totalMin = getEstimatedLessonMinutes(mod.slug);
  const stepsPct = getModuleStepsPercent(mod.slug, progress);

  if (!step) return null;

  function goToStep(index: number) {
    router.replace(`/modulos/${mod.slug}?step=${index}`);
  }

  function handleContinue() {
    completeModuleStep(mod.slug, step.id);
    onProgressChange(getProgress());
    if (stepIndex + 1 < steps.length) {
      goToStep(stepIndex + 1);
    } else {
      onMarkComplete();
    }
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 10,
              color: theme.brand.primary,
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: 0.5,
            }}
          >
            PASO {stepIndex + 1} DE {steps.length} · ~{totalMin} MIN TOTAL
          </div>
          <div style={{ fontSize: 15, fontWeight: 500, color: theme.text.primary, marginTop: 2 }}>
            {step.title}
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenReference}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "none",
            border: `1px solid ${theme.bg.border}`,
            borderRadius: 8,
            padding: "6px 10px",
            color: theme.text.muted,
            fontSize: 11,
            cursor: "pointer",
          }}
        >
          <List size={14} /> Referencia
        </button>
      </div>

      <ProgressBar value={stepsPct} />
      <div
        style={{
          fontSize: 10,
          color: theme.text.muted,
          marginTop: 4,
          marginBottom: 14,
          fontFamily: "'IBM Plex Mono', monospace",
        }}
      >
        {stepsPct}% de la lección · ~{step.durationMin} min este paso
      </div>

      <ModuleTabContent
        mod={mod}
        tab={step.tab}
        progress={progress}
        onProgressChange={onProgressChange}
        onMarkComplete={onMarkComplete}
        isComplete={isComplete}
      />

      <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <Btn
          variant="ghost"
          onClick={() => goToStep(Math.max(0, stepIndex - 1))}
          disabled={stepIndex === 0}
          style={{ flex: 1, opacity: stepIndex === 0 ? 0.4 : 1 }}
        >
          <ChevronLeft size={14} /> Anterior
        </Btn>
        {stepIndex + 1 < steps.length ? (
          <Btn variant="primary" onClick={handleContinue} style={{ flex: 2 }}>
            Continuar <ChevronRight size={14} />
          </Btn>
        ) : (
          <Btn variant="primary" onClick={handleContinue} style={{ flex: 2 }}>
            Completar lección
          </Btn>
        )}
      </div>
    </div>
  );
}

