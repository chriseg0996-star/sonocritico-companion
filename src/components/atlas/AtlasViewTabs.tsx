"use client";

import styles from "@/components/atlas/atlas-library.module.css";

export type AtlasLibraryView = "findings" | "errors";

type Props = {
  active: AtlasLibraryView;
  onChange: (view: AtlasLibraryView) => void;
};

/** Pestañas biblioteca — Hallazgos | Errores. */
export function AtlasViewTabs({ active, onChange }: Props) {
  return (
    <div className={styles.viewTabs} role="tablist" aria-label="Vista biblioteca">
      <button
        type="button"
        role="tab"
        aria-selected={active === "findings"}
        className={`${styles.viewTab}${active === "findings" ? ` ${styles.viewTabActive}` : ""}`}
        onClick={() => onChange("findings")}
      >
        Hallazgos
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={active === "errors"}
        className={`${styles.viewTab}${active === "errors" ? ` ${styles.viewTabActive}` : ""}`}
        onClick={() => onChange("errors")}
      >
        Errores
      </button>
    </div>
  );
}
