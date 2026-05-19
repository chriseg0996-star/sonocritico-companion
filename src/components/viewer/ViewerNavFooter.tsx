"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "@/components/viewer/clinical-viewer.module.css";

type Props = {
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onBack: () => void;
};

/** Pie del visor — anterior / siguiente / volver. */
export function ViewerNavFooter({ canPrev, canNext, onPrev, onNext, onBack }: Props) {
  return (
    <footer className={styles.viewerFooter}>
      <button
        type="button"
        className={styles.footerBtn}
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Anterior"
      >
        <ChevronLeft size={18} strokeWidth={1.5} />
        <span>Anterior</span>
      </button>
      <button type="button" className={`${styles.footerBtn} ${styles.footerBtnPrimary}`} onClick={onBack}>
        Volver
      </button>
      <button
        type="button"
        className={styles.footerBtn}
        onClick={onNext}
        disabled={!canNext}
        aria-label="Siguiente"
      >
        <span>Siguiente</span>
        <ChevronRight size={18} strokeWidth={1.5} />
      </button>
    </footer>
  );
}
