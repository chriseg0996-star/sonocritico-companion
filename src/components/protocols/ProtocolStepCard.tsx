"use client";

import Link from "next/link";
import { BookOpen, Calculator, Play, Stethoscope } from "lucide-react";
import type { ProtocolAction, ProtocolStep, ShockClass } from "@/lib/protocols/types";
import {
  buildAtlasMediaUrl,
  parseMediaIdFromHref,
} from "@/lib/protocols/protocol-navigation";
import { useProtocolContextOptional } from "@/components/protocols/ProtocolContext";

import styles from "@/components/protocols/protocol.module.css";
import { cn } from "@/lib/utils";

const SHOCK_CLASS_LABELS: Record<ShockClass, string> = {
  hipovolemico: "Choque hipovolémico",
  distributivo: "Choque distributivo",
  obstructivo: "Choque obstructivo",
  cardiogenico: "Choque cardiogénico",
};

type Props = {
  step: ProtocolStep;
  protocolSlug?: string;
  protocolStepId?: string;
  onChoose?: (decisionId: string) => void;
};

function ActionIcon({ kind }: { kind: string }) {
  if (kind === "atlas") return <BookOpen size={14} strokeWidth={1.5} aria-hidden />;
  if (kind === "clip") return <Play size={14} strokeWidth={1.5} aria-hidden />;
  if (kind === "calculator") return <Calculator size={14} strokeWidth={1.5} aria-hidden />;
  return <Stethoscope size={14} strokeWidth={1.5} aria-hidden />;
}

function StepActions({
  actions,
  compact,
  protocolSlug,
  protocolStepId,
}: {
  actions: ProtocolAction[];
  compact?: boolean;
  protocolSlug?: string;
  protocolStepId?: string;
}) {
  const protocolCtx = useProtocolContextOptional();

  if (!actions.length) return null;
  return (
    <div className={styles.actions} style={compact ? { marginBottom: 12 } : undefined}>
      {actions.map((action) => {
        const content = (
          <>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <ActionIcon kind={action.kind} />
              {action.label}
            </span>
            {action.detail && <span className={styles.actionDetail}>{action.detail}</span>}
          </>
        );

        if (action.href) {
          const mediaId = parseMediaIdFromHref(action.href);
          const isAtlas = action.kind === "atlas" || action.kind === "clip";
          const href =
            isAtlas && mediaId && protocolSlug && protocolStepId
              ? buildAtlasMediaUrl(mediaId, { protocolSlug, stepId: protocolStepId })
              : action.href;

          return (
            <Link
              key={action.id}
              href={href}
              className={cn(styles.actionBtn, action.kind === "clinical" && styles.actionBtnClinical)}
              onClick={() => {
                if (isAtlas && mediaId && protocolSlug && protocolStepId && protocolCtx) {
                  protocolCtx.saveBeforeAtlas({
                    protocolSlug,
                    stepId: protocolStepId,
                    mediaId,
                  });
                }
              }}
            >
              {content}
            </Link>
          );
        }

        return (
          <div
            key={action.id}
            className={cn(styles.actionBtn, styles.actionBtnClinical)}
            role="note"
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}

/** Card compacta — pregunta con opciones o interpretación final. */
export function ProtocolStepCard({ step, protocolSlug, protocolStepId, onChoose }: Props) {
  const isResult = step.kind === "result";
  const actions = step.actions ?? [];

  return (
    <article className={styles.card} aria-labelledby={`protocol-step-${step.id}`}>
      <h2 id={`protocol-step-${step.id}`} className={styles.cardTitle}>
        {step.title}
      </h2>

      {step.question && <p className={styles.cardQuestion}>{step.question}</p>}
      {step.context && <p className={styles.cardContext}>{step.context}</p>}

      {step.pitfalls && step.pitfalls.length > 0 && (
        <div className={styles.pitfalls}>
          <p className={styles.pitfallsTitle}>Errores frecuentes</p>
          <ul className={styles.pitfallsList}>
            {step.pitfalls.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {isResult && step.vexusGrade !== undefined && (
        <span className={styles.gradeBadge}>VExUS grado {step.vexusGrade}</span>
      )}

      {isResult && step.shockClass && (
        <span className={styles.shockBadge}>{SHOCK_CLASS_LABELS[step.shockClass]}</span>
      )}

      {isResult && step.interpretation && (
        <p className={styles.interpretation}>{step.interpretation}</p>
      )}

      {!isResult && actions.length > 0 && (
        <StepActions
          actions={actions}
          compact
          protocolSlug={protocolSlug}
          protocolStepId={protocolStepId}
        />
      )}

      {!isResult && step.decisions && onChoose && (
        <div className={styles.options} role="group" aria-label="Opciones">
          {step.decisions.map((decision) => (
            <button
              key={decision.id}
              type="button"
              className={styles.optionBtn}
              onClick={() => onChoose(decision.id)}
            >
              <span>{decision.label}</span>
              {decision.hint && <span className={styles.optionHint}>{decision.hint}</span>}
            </button>
          ))}
        </div>
      )}

      {isResult && actions.length > 0 && (
        <StepActions
          actions={actions}
          protocolSlug={protocolSlug}
          protocolStepId={protocolStepId}
        />
      )}
    </article>
  );
}
