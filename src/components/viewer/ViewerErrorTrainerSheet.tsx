"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import type { MediaItem } from "@/lib/media/types";
import { getErrorsForMediaId, markErrorsSeen } from "@/lib/training";
import { ErrorTrainerList } from "@/components/training/ErrorTrainerList";
import styles from "@/components/viewer/viewer-errors.module.css";

type Props = {
  item: MediaItem;
  onClose: () => void;
};

/** Hoja inferior — errores del hallazgo actual (no modifica ClinicalViewer). */
export function ViewerErrorTrainerSheet({ item, onClose }: Props) {
  const errors = getErrorsForMediaId(item.id);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    if (errors.length > 0) {
      markErrorsSeen(errors.map((e) => e.id));
    }
  }, [errors]);

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Errores frecuentes">
      <button type="button" className={styles.backdrop} aria-label="Cerrar" onClick={onClose} />
      <div className={styles.sheet}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Entrenamiento</p>
            <h2 className={styles.title}>Errores frecuentes</h2>
            <p className={styles.subtitle}>{item.title}</p>
          </div>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
            <X size={18} strokeWidth={1.5} />
          </button>
        </header>
        <div className={styles.body}>
          <ErrorTrainerList
            errors={errors}
            title=""
            emptyMessage="Sin errores documentados para este hallazgo."
            defaultOpenFirst
          />
        </div>
      </div>
    </div>
  );
}
