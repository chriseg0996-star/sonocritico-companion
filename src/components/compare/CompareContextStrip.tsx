"use client";

import type { MediaLibraryContext } from "@/lib/library/media-context";
import styles from "@/components/compare/compare.module.css";

type Props = {
  label: string;
  role: "reference" | "compare";
  context: MediaLibraryContext;
};

export function CompareContextStrip({ label, role, context }: Props) {
  const roleLabel = role === "reference" ? "Referencia" : "Comparación";

  return (
    <div className={styles.contextStrip}>
      <p className={styles.paneRole}>{roleLabel}</p>
      <p className={styles.paneTitle}>{label}</p>
      <dl className={styles.contextGrid}>
        <div>
          <dt>Tipo</dt>
          <dd>{context.type}</dd>
        </div>
        <div>
          <dt>Ventana</dt>
          <dd>{context.window}</dd>
        </div>
        <div>
          <dt>Protocolo</dt>
          <dd>{context.protocol}</dd>
        </div>
      </dl>
    </div>
  );
}
