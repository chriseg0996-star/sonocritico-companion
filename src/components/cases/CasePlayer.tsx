"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { CaseOutcome, CaseRouteEntry, InteractiveClinicalCase } from "@/lib/cases/types";
import { isAdaptiveCase } from "@/lib/cases/types";
import {
  appendRouteEntry,
  computePartialScore,
  getDecisionNode,
  pickOutcomeForRoute,
  resolveTransition,
} from "@/lib/cases/flow-engine";
import {
  markCaseStarted,
  markCaseCompleted,
  saveCaseRoute,
  loadCaseRoute,
} from "@/lib/cases/case-storage";
import { scoreCaseChoices } from "@/lib/cases/scoring";
import { CaseStep } from "@/components/cases/CaseStep";
import { CaseSummary } from "@/components/cases/CaseSummary";
import styles from "@/components/cases/cases.module.css";

const FLOW_LABELS = ["Paciente", "Protocolo", "Ventana", "Hallazgo", "Conducta", "Resultado"];

type Props = {
  caseDef: InteractiveClinicalCase;
};

export function CasePlayer({ caseDef }: Props) {
  if (isAdaptiveCase(caseDef)) {
    return <AdaptiveCasePlayer caseDef={caseDef} />;
  }
  return <LinearCasePlayer caseDef={caseDef} />;
}

function AdaptiveCasePlayer({
  caseDef,
}: {
  caseDef: InteractiveClinicalCase & { graph: NonNullable<InteractiveClinicalCase["graph"]> };
}) {
  const router = useRouter();
  const graph = caseDef.graph;

  const [currentNodeId, setCurrentNodeId] = useState(graph.startNodeId);
  const [route, setRoute] = useState<CaseRouteEntry[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [finished, setFinished] = useState(false);
  const [outcome, setOutcome] = useState<CaseOutcome | null>(null);
  const [score, setScore] = useState(0);

  const current = getDecisionNode(graph, currentNodeId);
  const partialScore = computePartialScore(route, graph);

  const progressIndex = useMemo(() => {
    if (!current) return 0;
    const order: Record<string, number> = {
      presentation: 0,
      protocol: 1,
      window: 2,
      finding: 3,
      conduct: 4,
      summary: 5,
    };
    return order[current.kind] ?? 2;
  }, [current]);

  useEffect(() => {
    markCaseStarted(caseDef.id);
    const saved = loadCaseRoute(caseDef.id);
    if (saved.length > 0) setRoute(saved);
  }, [caseDef.id]);

  const handleSelect = useCallback(
    (choiceId: string) => {
      if (!current) return;
      setSelectedId(choiceId);
      setShowFeedback(true);
      const nextRoute = appendRouteEntry(route, current, choiceId);
      setRoute(nextRoute);
      saveCaseRoute(caseDef.id, nextRoute);
    },
    [caseDef.id, current, route],
  );

  const finishCase = useCallback(
    (outcomeId: string | undefined, finalRoute: CaseRouteEntry[]) => {
      const finalScore = computePartialScore(finalRoute, graph);
      const resolved = pickOutcomeForRoute(caseDef, finalRoute, outcomeId);
      setScore(finalScore);
      setOutcome(resolved);
      setFinished(true);
      markCaseCompleted(caseDef.id, finalScore, finalRoute);
    },
    [caseDef, graph],
  );

  const handleNext = useCallback(() => {
    if (!current) return;
    const choiceId =
      selectedId ?? (current.kind === "presentation" ? "ready" : null);
    if (!choiceId) return;

    if (current.kind === "presentation" && !selectedId) {
      const nextRoute = appendRouteEntry(route, current, choiceId);
      setRoute(nextRoute);
      saveCaseRoute(caseDef.id, nextRoute);
    }

    const transition = resolveTransition(graph, currentNodeId, choiceId);
    if (!transition) {
      finishCase(undefined, route);
      return;
    }

    if (transition.type === "outcome") {
      finishCase(transition.outcomeId, route);
      return;
    }

    setCurrentNodeId(transition.nodeId);
    setSelectedId(null);
    setShowFeedback(false);
  }, [caseDef.id, current, currentNodeId, finishCase, graph, route, selectedId]);

  const canAdvance = showFeedback || current?.kind === "presentation";

  if (finished && outcome) {
    return (
      <CasePlayerShell progressIndex={5} onBack={() => router.push("/casos")}>
        <CaseSummary
          caseDef={caseDef}
          outcome={outcome}
          score={score}
          route={route}
          onClose={() => router.push("/casos")}
        />
      </CasePlayerShell>
    );
  }

  if (!current) {
    return (
      <CasePlayerShell progressIndex={0} onBack={() => router.push("/casos")}>
        <p className={styles.empty}>Nodo no encontrado.</p>
      </CasePlayerShell>
    );
  }

  const stepView = {
    id: current.id,
    kind: current.kind,
    title: current.title,
    prompt: current.prompt,
    choices: current.choices,
  };

  return (
    <CasePlayerShell progressIndex={progressIndex} onBack={() => router.push("/casos")}>
      <p className={styles.partialScore} aria-live="polite">
        Score parcial: {partialScore}%
      </p>
      <CaseStep
        step={stepView}
        caseDef={caseDef}
        selectedId={selectedId}
        showFeedback={showFeedback}
        onSelect={handleSelect}
        difficulty={current.difficulty}
      />
      <button
        type="button"
        className={styles.nextBtn}
        disabled={!canAdvance}
        onClick={handleNext}
      >
        Siguiente
      </button>
    </CasePlayerShell>
  );
}

function LinearCasePlayer({ caseDef }: { caseDef: InteractiveClinicalCase }) {
  const router = useRouter();
  const steps = caseDef.steps ?? [];
  const flowSteps = useMemo(
    () => [...steps, { id: "summary", kind: "summary" as const, title: "Resultado", prompt: "", choices: [] }],
    [steps],
  );

  const [stepIndex, setStepIndex] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const current = flowSteps[stepIndex];

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
      const finalScore = scoreCaseChoices(steps, selections);
      setScore(finalScore);
      markCaseCompleted(caseDef.id, finalScore);
      setFinished(true);
    }

    setStepIndex(nextIndex);
    setShowFeedback(false);
  }, [caseDef.id, current, flowSteps, selections, stepIndex, steps]);

  const legacyOutcome: CaseOutcome | null = caseDef.outcome
    ? {
        id: "legacy",
        title: caseDef.outcome.title,
        explanation: caseDef.outcome.explanation,
        teachingPoint: caseDef.outcome.teachingPoint,
        pathType: score >= 75 ? "optimal" : score >= 50 ? "partial" : "incorrect",
        resources: caseDef.defaultResources,
      }
    : null;

  if (flowSteps[stepIndex]?.kind === "summary" && finished && legacyOutcome) {
    return (
      <CasePlayerShell progressIndex={5} onBack={() => router.push("/casos")}>
        <CaseSummary
          caseDef={caseDef}
          outcome={legacyOutcome}
          score={score}
          onClose={() => router.push("/casos")}
        />
      </CasePlayerShell>
    );
  }

  if (current && current.kind !== "summary") {
    return (
      <CasePlayerShell
        progressIndex={Math.min(stepIndex, 5)}
        onBack={() => router.push("/casos")}
      >
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
          disabled={!showFeedback && current.kind !== "presentation"}
          onClick={handleNext}
        >
          {stepIndex + 1 >= flowSteps.length - 1 ? "Ver resultado" : "Siguiente"}
        </button>
      </CasePlayerShell>
    );
  }

  return null;
}

function CasePlayerShell({
  children,
  progressIndex,
  onBack,
}: {
  children: React.ReactNode;
  progressIndex: number;
  onBack: () => void;
}) {
  return (
    <div className={styles.player}>
      <button type="button" className={styles.backRow} onClick={onBack}>
        <ArrowLeft size={14} strokeWidth={1.5} />
        Casos clínicos
      </button>
      <div className={styles.progress} aria-hidden>
        {FLOW_LABELS.map((label, i) => (
          <div
            key={label}
            className={`${styles.progressSeg}${
              i < progressIndex ? ` ${styles.progressSegDone}` : ""
            }${i === progressIndex ? ` ${styles.progressSegActive}` : ""}`}
          />
        ))}
      </div>
      {children}
    </div>
  );
}
