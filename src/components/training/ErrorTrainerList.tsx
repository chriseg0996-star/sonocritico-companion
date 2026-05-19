"use client";

import type { FrequentErrorTraining } from "@/lib/training/types";
import { ErrorTrainerAccordion } from "@/components/training/ErrorTrainerAccordion";
import styles from "@/components/training/error-trainer.module.css";

type Props = {
  errors: FrequentErrorTraining[];
  title?: string;
  emptyMessage?: string;
  defaultOpenFirst?: boolean;
};

/** Lista de errores frecuentes — acordeón móvil. */
export function ErrorTrainerList({
  errors,
  title = "Errores frecuentes",
  emptyMessage = "Sin errores documentados para este módulo.",
  defaultOpenFirst = false,
}: Props) {
  if (errors.length === 0) {
    return <p className={styles.empty}>{emptyMessage}</p>;
  }

  return (
    <section className={styles.section} aria-label={title}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <ul className={styles.list}>
        {errors.map((entry, index) => (
          <ErrorTrainerAccordion
            key={entry.id}
            error={entry}
            defaultOpen={defaultOpenFirst && index === 0}
          />
        ))}
      </ul>
    </section>
  );
}
