"use client";

import { APP_AUTHOR, formatReleaseVersionLine } from "@/lib/version";
import styles from "@/components/layout/GlobalFooter.module.css";

export function GlobalFooter() {
  return (
    <footer className={styles.root} role="contentinfo" aria-label="Información de release">
      <div className={styles.inner}>
        <p className={styles.wordmark}>SONOCRÍTICO</p>
        <p className={styles.author}>© {APP_AUTHOR}</p>
        <p className={styles.version}>{formatReleaseVersionLine()}</p>
        <p className={styles.subtext}>Companion USG · Curso USG Crítico</p>
      </div>
    </footer>
  );
}
