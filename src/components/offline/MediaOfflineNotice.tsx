"use client";

import { CloudOff } from "lucide-react";
import styles from "@/components/offline/offline.module.css";

type Props = {
  message?: string;
};

/** Aviso cuando el clip no está en caché y no hay red. */
export function MediaOfflineNotice({
  message = "Clip no descargado. Conéctate una vez para reproducirlo offline después.",
}: Props) {
  return (
    <div className={styles.clipNotice} role="note">
      <CloudOff size={16} strokeWidth={1.5} aria-hidden />
      <span>{message}</span>
    </div>
  );
}
