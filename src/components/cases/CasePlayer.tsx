"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { InteractiveClinicalCase } from "@/lib/cases/types";
import { markCaseStarted, markCaseCompleted } from "@/lib/cases/case-storage";
import { scoreCaseChoices } from "@/lib/cases/scoring";
import { CaseStep } from "@/components/cases/CaseStep";
import { CaseSummary } from "@/components/cases/CaseSummary";
import styles from "@/components/cases/cases.module.css";

const FLOW_LABELS = ["Paciente", "Protocolo", "Ventana", "Hallazgo", "Conducta", "Resultado"];

type Props = {
  caseDef: InteractiveClinicalCase;
};

export function CasePlayer({ caseDef }: Props) {
  const router = useRouter();
  const flowSteps = useMemo(
    () => [...caseDef.steps, { id: "summary", kind: "summary" as const, title: "Resultado", prompt: "", choices: [] }],
    [caseDef.steps],
  );

  const [stepIndex, setStepIndex] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const current = flowSteps[stepIndex];
  const isSummary = current?.kind === "summary";

  useEffect(() => {
    markCaseStarted(caseDef.id);
  }, [caseDef.id]);

  const handleSelect = useCallback(
    (choiceId: string) => {
      if (!current || current.kind === "summary") return;
      setSelections((prev) => ({ ...prev, [current.id]: choiceId }));
      setShowFeedback(true);
    },
    [current],
  );

  const handleNext = useCallback(() => {
    if (!current) return;
    const nextIndex = stepIndex + 1;
    if (nextIndex >= flowSteps.length) return;

    if (flowSteps[nextIndex]?.kind === "summary") {
      const finalScore = scoreCaseChoices(caseDef.steps, selections);
      setScore(finalScore);
      markCaseCompleted(caseDef.id, finalScore);
      setFinished(true);
    }

    setStepIndex(nextIndex);
    setShowFeedback(false);
  }, [caseDef, current, flowSteps, selections, stepIndex]);

  const canAdvance = showFeedback || current?.kind === "presentation";

  return (
    <div className={styles.player}>
      <button type="button" className={styles.backRow} onClick={() => router.push("/casos")}>
        <ArrowLeft size={14} strokeWidth={1.5} />
        Casos clínicos
      </button>

      <div className={styles.progress} aria-hidden>
        {FLOW_LABELS.map((_, i) => (
          <div
            key={FLOW_LABELS[i]}
            className={`${styles.progressSeg}${
              i < stepIndex ? ` ${styles.progressSegDone}` : ""
            }${i === stepIndex ? ` ${styles.progressSegActive}` : ""}`}
          />
        ))}
      </div>

      {isSummary && finished ? (
        <CaseSummary
          caseDef={caseDef}
          score={score}
          onClose={() => router.push("/casos")}
        />
      ) : current && current.kind !== "summary" ? (
        <>
          <CaseStep
            step={current}
            caseDef={caseDef}
            selectedId={selections[current.id] ?? null}
            showFeedback={showFeedback}
            onSelect={handleSelect}
          />
          <button
            type="button"
            className={styles.nextBtn}
            disabled={!canAdvance}
            onClick={handleNext}
          >
            {stepIndex + 1 >= flowSteps.length - 1 ? "Ver resultado" : "Siguiente"}
          </button>
        </>
      ) : null}
    </div>
  );
}
