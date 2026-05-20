"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import {
  WORKFLOW_OUTPUT_LABELS,
  WORKFLOW_OUTPUT_ORDER,
  getEstimatedMinutes,
  getNextQuestion,
  getStepsRemaining,
  getWorkflowComplaintById,
  isWorkflowComplete,
  isWorkflowComplaintId,
  listWorkflowComplaints,
  loadWorkflowLastFlow,
  resolveRoute,
  saveWorkflowLastFlow,
  type WorkflowAnswer,
  type WorkflowComplaintId,
} from "@/lib/workflow";
import styles from "@/components/guardia/guardia-workflow.module.css";

type Props = {
  /** Queja inicial (p. ej. /guardia?escenario=disnea). */
  initialComplaintId?: string | null;
};

/** Flujo clínico guardia — queja → ≤3 preguntas → ruta ordenada. */
export function GuardiaWorkflowPanel({ initialComplaintId = null }: Props) {
  const router = useRouter();
  const complaints = listWorkflowComplaints();
  const [complaintId, setComplaintId] = useState<WorkflowComplaintId | null>(null);
  const [answers, setAnswers] = useState<WorkflowAnswer>({});

  useEffect(() => {
    const fromUrl =
      initialComplaintId && isWorkflowComplaintId(initialComplaintId)
        ? initialComplaintId
        : null;
    const stored = loadWorkflowLastFlow();
    const id = fromUrl ?? stored?.complaintId ?? null;
    setComplaintId(id);
    setAnswers(id && stored?.complaintId === id ? stored.answers : {});
  }, [initialComplaintId]);

  const complaint = complaintId ? getWorkflowComplaintById(complaintId) : null;
  const nextQuestion = complaint ? getNextQuestion(complaint, answers) : null;
  const route =
    complaint && isWorkflowComplete(complaint, answers) ? resolveRoute(complaint, answers) : null;
  const stepsRemaining = complaint ? getStepsRemaining(complaint, answers) : 0;
  const estimatedMinutes = complaint ? getEstimatedMinutes(complaint, answers) : null;

  const persist = useCallback(
    (id: WorkflowComplaintId, nextAnswers: WorkflowAnswer, routeId?: string) => {
      saveWorkflowLastFlow(id, nextAnswers, routeId);
    },
    [],
  );

  const selectComplaint = useCallback(
    (id: WorkflowComplaintId) => {
      setComplaintId(id);
      setAnswers({});
      persist(id, {});
    },
    [persist],
  );

  const answerQuestion = useCallback(
    (questionId: string, optionId: string) => {
      if (!complaintId || !complaint) return;
      const nextAnswers = { ...answers, [questionId]: optionId };
      setAnswers(nextAnswers);
      const resolved = isWorkflowComplete(complaint, nextAnswers)
        ? resolveRoute(complaint, nextAnswers)
        : null;
      persist(complaintId, nextAnswers, resolved?.id);
    },
    [answers, complaint, complaintId, persist],
  );

  const resetFlow = useCallback(() => {
    setComplaintId(null);
    setAnswers({});
  }, []);

  const backStep = useCallback(() => {
    if (!complaint) return;
    if (route) {
      const lastQ = complaint.questions[complaint.questions.length - 1];
      if (!lastQ) return;
      const trimmed = { ...answers };
      delete trimmed[lastQ.id];
      setAnswers(trimmed);
      if (complaintId) persist(complaintId, trimmed);
      return;
    }
    if (nextQuestion) {
      const idx = complaint.questions.findIndex((q) => q.id === nextQuestion.id);
      if (idx <= 0) {
        setAnswers({});
        if (complaintId) persist(complaintId, {});
        return;
      }
      const prev = complaint.questions[idx - 1];
      const trimmed = { ...answers };
      delete trimmed[prev.id];
      delete trimmed[nextQuestion.id];
      setAnswers(trimmed);
      if (complaintId) persist(complaintId, trimmed);
    }
  }, [answers, complaint, complaintId, nextQuestion, persist, route]);

  const metaLine = useMemo(() => {
    if (!complaint) return null;
    if (route && estimatedMinutes != null) {
      return `~${estimatedMinutes} min · ruta lista`;
    }
    const steps = stepsRemaining;
    const est = estimatedMinutes != null ? `~${estimatedMinutes} min` : "";
    return [
      est,
      steps > 0 ? `${steps} paso${steps === 1 ? "" : "s"} restante${steps === 1 ? "" : "s"}` : null,
    ]
      .filter(Boolean)
      .join(" · ");
  }, [complaint, estimatedMinutes, route, stepsRemaining]);

  const openLink = (href: string) => {
    router.push(href);
  };

  return (
    <section className={styles.panel} aria-labelledby="guardia-workflow-title">
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Modo guardia</p>
          <h2 className={styles.title} id="guardia-workflow-title">
            Flujo clínico
          </h2>
        </div>
        <div className={styles.meta}>
          <span>{metaLine ?? "≤3 preguntas"}</span>
        </div>
      </div>

      <p className={styles.prompt}>Tengo…</p>

      <div className={styles.chips} role="tablist" aria-label="Presentación clínica">
        {complaints.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={complaintId === c.id}
            className={`${styles.chip}${complaintId === c.id ? ` ${styles.chipActive}` : ""}`}
            onClick={() => selectComplaint(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {complaint && nextQuestion ? (
        <div className={styles.questionBlock}>
          <p className={styles.questionLabel}>{nextQuestion.prompt}</p>
          <div className={styles.chips} role="group" aria-label={nextQuestion.prompt}>
            {nextQuestion.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={styles.chip}
                onClick={() => answerQuestion(nextQuestion.id, opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {complaint && route ? (
        <>
          <p className={styles.routeSummary}>{route.summary}</p>
          <div className={styles.suggestions}>
            {WORKFLOW_OUTPUT_ORDER.map((kind) => {
              const output = route.outputs.find((o) => o.kind === kind);
              if (!output) return null;
              return (
                <div key={kind} className={styles.row}>
                  <span className={styles.rowLabel}>{WORKFLOW_OUTPUT_LABELS[kind]}</span>
                  <button
                    type="button"
                    className={styles.rowLink}
                    onClick={() => openLink(output.href)}
                  >
                    <span>{output.label}</span>
                    <ChevronRight size={14} aria-hidden />
                  </button>
                </div>
              );
            })}
          </div>
        </>
      ) : !complaint ? (
        <p className={styles.hint}>Elige una queja para iniciar el flujo clínico.</p>
      ) : null}

      {complaint ? (
        <div className={styles.actions}>
          <button type="button" className={styles.ghostBtn} onClick={backStep}>
            Atrás
          </button>
          <button type="button" className={styles.ghostBtn} onClick={resetFlow}>
            Nueva queja
          </button>
        </div>
      ) : null}
    </section>
  );
}
