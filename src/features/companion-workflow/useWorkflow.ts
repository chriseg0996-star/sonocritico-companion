"use client";

import { useCallback, useMemo, useState } from "react";
import { getWorkflowProtocol } from "@/features/companion-workflow/data";
import type {
  WorkflowPhase,
  WorkflowResult,
  WorkflowState,
  WorkflowStep,
} from "@/features/companion-workflow/types";

function isResultKey(next: string): boolean {
  return next.startsWith("result-");
}

export function useWorkflow(protocolId: string) {
  const protocol = useMemo(() => getWorkflowProtocol(protocolId), [protocolId]);

  const [phase, setPhase] = useState<WorkflowPhase>("intro");
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);
  const [resultKey, setResultKey] = useState<string | null>(null);
  const [state, setState] = useState<WorkflowState>({
    pasosCompletados: [],
    respuestas: {},
    resultado: null,
  });

  const currentStep: WorkflowStep | null =
    protocol && currentStepId ? (protocol.steps[currentStepId] ?? null) : null;

  const resultado: WorkflowResult | null =
    state.resultado ??
    (protocol && resultKey ? (protocol.results[resultKey] ?? null) : null);

  const progressPct = useMemo(() => {
    if (phase === "intro") return 0;
    if (phase === "result") return 100;
    const answered = state.pasosCompletados.length;
    return Math.round((answered / 3) * 100);
  }, [phase, state.pasosCompletados.length]);

  const reset = useCallback(() => {
    setPhase("intro");
    setCurrentStepId(null);
    setResultKey(null);
    setState({ pasosCompletados: [], respuestas: {}, resultado: null });
  }, []);

  const start = useCallback(() => {
    if (!protocol) return;
    setPhase("steps");
    setCurrentStepId(protocol.firstStepId);
    setResultKey(null);
    setState({ pasosCompletados: [], respuestas: {}, resultado: null });
  }, [protocol]);

  const answer = useCallback(
    (value: string, next: string) => {
      if (!protocol || !currentStepId) return;

      setState((prev) => {
        const nextState: WorkflowState = {
          pasosCompletados: [...prev.pasosCompletados, currentStepId],
          respuestas: { ...prev.respuestas, [currentStepId]: value },
          resultado: null,
        };

        if (isResultKey(next)) {
          const result = protocol.results[next] ?? null;
          setResultKey(next);
          setCurrentStepId(null);
          setPhase("result");
          return { ...nextState, resultado: result };
        }

        setCurrentStepId(next);
        return nextState;
      });
    },
    [currentStepId, protocol],
  );

  const goBack = useCallback(() => {
    if (phase === "result") {
      const lastStepId = state.pasosCompletados[state.pasosCompletados.length - 1];
      if (!lastStepId) {
        reset();
        return;
      }
      const trimmedCompleted = state.pasosCompletados.slice(0, -1);
      const trimmedAnswers = { ...state.respuestas };
      delete trimmedAnswers[lastStepId];
      setState({
        pasosCompletados: trimmedCompleted,
        respuestas: trimmedAnswers,
        resultado: null,
      });
      setResultKey(null);
      setCurrentStepId(lastStepId);
      setPhase("steps");
      return;
    }

    if (phase === "steps") {
      const completed = state.pasosCompletados;
      if (completed.length === 0) {
        setPhase("intro");
        setCurrentStepId(null);
        return;
      }
      const lastId = completed[completed.length - 1];
      const trimmedCompleted = completed.slice(0, -1);
      const trimmedAnswers = { ...state.respuestas };
      delete trimmedAnswers[lastId];
      setState({
        pasosCompletados: trimmedCompleted,
        respuestas: trimmedAnswers,
        resultado: null,
      });
      setCurrentStepId(lastId);
    }
  }, [phase, reset, state.pasosCompletados, state.respuestas]);

  return {
    protocol,
    phase,
    currentStep,
    currentStepId,
    resultKey,
    state,
    resultado,
    progressPct,
    start,
    answer,
    goBack,
    reset,
  };
}
