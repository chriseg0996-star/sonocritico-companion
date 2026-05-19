"use client";

import Link from "next/link";
import type {
  CaseFlowStep,
  CaseChoice,
  CaseDifficulty,
  InteractiveClinicalCase,
} from "@/lib/cases/types";
import { atlasHref, protocolHref, viewerHref } from "@/lib/cases/case-links";
import styles from "@/components/cases/cases.module.css";

type Props = {
  step: CaseFlowStep;
  caseDef: InteractiveClinicalCase;
  selectedId: string | null;
  showFeedback: boolean;
  onSelect: (choiceId: string) => void;
  difficulty?: CaseDifficulty;
};

const DIFFICULTY_LABEL: Record<CaseDifficulty, string> = {
  basico: "Básico",
  intermedio: "Intermedio",
};

function ResourceLinks({ choice }: { choice: CaseChoice }) {
  if (!choice.resource) return null;
  const atlas = atlasHref(choice.resource);
  const viewer = viewerHref(choice.resource);
  const protocol = protocolHref(choice.resource);

  return (
    <div className={styles.links}>
      {protocol && (
        <Link href={protocol} className={styles.linkBtn}>
          Protocolo
        </Link>
      )}
      {viewer && (
        <Link href={viewer} className={styles.linkBtn}>
          Visor
        </Link>
      )}
      {atlas && (
        <Link href={atlas} className={styles.linkBtn}>
          Atlas
        </Link>
      )}
    </div>
  );
}

export function CaseStep({
  step,
  caseDef,
  selectedId,
  showFeedback,
  onSelect,
  difficulty,
}: Props) {
  const selected = step.choices.find((c) => c.id === selectedId);

  return (
    <article className={styles.stepCard}>
      <div className={styles.stepHeader}>
        <p className={styles.stepEyebrow}>
          {step.kind === "presentation" ? "Presentación" : step.title}
        </p>
        {difficulty && step.kind !== "presentation" && (
          <span className={styles.difficultyBadge}>{DIFFICULTY_LABEL[difficulty]}</span>
        )}
      </div>
      <h2 className={styles.stepTitle}>
        {step.kind === "presentation" ? caseDef.title : step.title}
      </h2>

      {step.kind === "presentation" ? (
        <>
          <p className={styles.scenario}>{caseDef.presentation}</p>
          <dl className={styles.vitals}>
            <div>
              <span className={styles.vitalLabel}>FC</span>
              <span className={styles.vitalValue}>{caseDef.vitals.hr} lpm</span>
            </div>
            <div>
              <span className={styles.vitalLabel}>TA</span>
              <span className={styles.vitalValue}>{caseDef.vitals.bp}</span>
            </div>
            <div>
              <span className={styles.vitalLabel}>FR</span>
              <span className={styles.vitalValue}>{caseDef.vitals.rr}/min</span>
            </div>
            <div>
              <span className={styles.vitalLabel}>SpO2</span>
              <span className={styles.vitalValue}>{caseDef.vitals.spo2}%</span>
            </div>
          </dl>
        </>
      ) : (
        <p className={styles.stepPrompt}>{step.prompt}</p>
      )}

      <div className={styles.choices}>
        {step.choices.map((choice) => {
          const isSelected = selectedId === choice.id;
          const stateClass =
            showFeedback && isSelected
              ? choice.isOptimal
                ? styles.choiceOptimal
                : styles.choiceSuboptimal
              : isSelected
                ? styles.choiceSelected
                : "";

          return (
            <button
              key={choice.id}
              type="button"
              className={`${styles.choice} ${stateClass}`}
              disabled={showFeedback}
              onClick={() => onSelect(choice.id)}
            >
              <span>{choice.label}</span>
              {choice.hint && <span className={styles.choiceHint}>{choice.hint}</span>}
            </button>
          );
        })}
      </div>

      {showFeedback && selected && (
        <>
          <p className={styles.feedback}>{selected.feedback}</p>
          <ResourceLinks choice={selected} />
        </>
      )}
    </article>
  );
}
