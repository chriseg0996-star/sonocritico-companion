"use client";

import { Pause, Play, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { useCompareSync } from "@/components/compare/CompareSyncContext";
import styles from "@/components/compare/compare.module.css";

export function CompareSyncBar() {
  const { playing, togglePlay, zoomIn, zoomOut, resetZoom, zoom } = useCompareSync();

  return (
    <div className={styles.syncBar} role="toolbar" aria-label="Sincronización">
      <button type="button" className={styles.syncBtn} onClick={togglePlay} aria-label={playing ? "Pausar" : "Reproducir"}>
        {playing ? <Pause size={18} strokeWidth={1.5} /> : <Play size={18} strokeWidth={1.5} />}
        <span>{playing ? "Pausar" : "Play"}</span>
      </button>
      <button type="button" className={styles.syncBtn} onClick={zoomOut} aria-label="Alejar" disabled={zoom <= 1}>
        <ZoomOut size={18} strokeWidth={1.5} />
      </button>
      <span className={styles.zoomLabel}>{Math.round(zoom * 100)}%</span>
      <button type="button" className={styles.syncBtn} onClick={zoomIn} aria-label="Acercar" disabled={zoom >= 3}>
        <ZoomIn size={18} strokeWidth={1.5} />
      </button>
      <button type="button" className={styles.syncBtn} onClick={resetZoom} aria-label="Restablecer zoom">
        <RotateCcw size={16} strokeWidth={1.5} />
      </button>
    </div>
  );
}
