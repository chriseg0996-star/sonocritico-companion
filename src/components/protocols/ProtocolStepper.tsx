"use client";

import type { Protocol, ProtocolStep, ProtocolTrailEntry } from "@/lib/protocols/types";
import styles from "@/components/protocols/protocol.module.css";
import { cn } from "@/lib/utils";

type Props = {
  protocol: Protocol;
  trail: ProtocolTrailEntry[];
  currentStep: ProtocolStep;
};

function stepperKeyFor(step: ProtocolStep): string {
  return step.stepperId ?? step.id;
}

/** Stepper vertical — progreso del protocolo (mobile-first). */
export function ProtocolStepper({ protocol, trail, currentStep }: Props) {
  const labelById = Object.fromEntries(protocol.stepperSteps.map((s) => [s.id, s.label]));
  const isResult = currentStep.kind === "result";
  const currentKey = stepperKeyFor(currentStep);

  const stepDone = (stepperId: string) => {
    if (currentKey === stepperId) return false;
    return trail.some((entry) => {
      const step = protocol.steps[entry.stepId];
      return step ? stepperKeyFor(step) === stepperId : entry.stepId === stepperId;
    });
  };

  return (
    <ol className={styles.stepper} aria-label="Progreso del protocolo">
      {protocol.stepperSteps.map((item, index) => {
        const active = currentKey === item.id;
        const done = stepDone(item.id);

        return (
          <li key={item.id} className={styles.stepperItem}>
            <div className={styles.stepperRail} aria-hidden>
              <span
                className={cn(
                  styles.stepperDot,
                  done && styles.stepperDotDone,
                  active && styles.stepperDotActive,
                )}
              />
              {index < protocol.stepperSteps.length - 1 && <span className={styles.stepperLine} />}
            </div>
            <span
              className={cn(
                styles.stepperLabel,
                active && styles.stepperLabelActive,
                done && styles.stepperLabelDone,
              )}
            >
              {labelById[item.id] ?? item.label}
            </span>
          </li>
        );
      })}
      {isResult && (
        <li className={styles.stepperItem}>
          <div className={styles.stepperRail} aria-hidden>
            <span className={cn(styles.stepperDot, styles.stepperDotActive)} />
          </div>
          <span className={cn(styles.stepperLabel, styles.stepperLabelActive)}>Conducta</span>
        </li>
      )}
    </ol>
  );
}
