"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import styles from "@/components/viewer/clinical-viewer.module.css";

type Props = {
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
};

/** Barra superior: cerrar + navegación entre hallazgos. */
export function ViewerToolbar({ index, total, onClose, onPrev, onNext, canPrev, canNext }: Props) {
  return (
    <header className={styles.toolbar}>
      <button type="button" className={styles.toolbarBtnPrimary} onClick={onClose} aria-label="Cerrar visor">
        <X size={18} strokeWidth={1.5} />
        <span>Cerrar</span>
      </button>

      <span className={styles.counter} aria-live="polite">
        {index + 1} / {total}
      </span>

      <div className={styles.toolbarGroup}>
        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={onPrev}
          disabled={!canPrev}
          aria-label="Hallazgo anterior"
        >
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>
        <button
          type="button"
          className={styles.toolbarBtn}
          onClick={onNext}
          disabled={!canNext}
          aria-label="Siguiente hallazgo"
        >
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
