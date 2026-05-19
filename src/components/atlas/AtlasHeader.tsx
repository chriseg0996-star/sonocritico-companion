"use client";

import { AtlasOfflineStatus } from "@/components/offline/AtlasOfflineStatus";
import { ATLAS_MVP_BADGE } from "@/lib/atlas/release";
import styles from "@/components/atlas/atlas-library.module.css";

/** Encabezado de la biblioteca atlas. */
export function AtlasHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.headerTitleRow}>
        <h1 className={styles.headerTitle}>Biblioteca atlas</h1>
        <span className={styles.mvpBadge}>{ATLAS_MVP_BADGE}</span>
      </div>
      <p className={styles.headerDesc}>
        Hallazgos POCUS por módulo — imágenes y clips desde el manifest de media.
      </p>
      <AtlasOfflineStatus />
    </header>
  );
}
