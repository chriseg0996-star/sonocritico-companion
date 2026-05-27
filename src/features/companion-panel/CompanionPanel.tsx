"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { CompanionPanelBody } from "@/features/companion-panel/CompanionPanelBody";
import type { CompanionPanelMode } from "@/features/companion-panel/usePanelState";
import styles from "@/features/companion-panel/companion-panel.module.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  mode: CompanionPanelMode;
  query?: string;
};

const MODE_TITLES: Record<CompanionPanelMode, string> = {
  atlas: "Atlas pulmonar",
  calculator: "Calculadora",
  protocol: "Protocolo",
};

function modeSubtitle(mode: CompanionPanelMode, query?: string): string | null {
  if (!query?.trim()) return null;
  if (mode === "atlas") return `Búsqueda: ${query}`;
  if (mode === "calculator") return query;
  return query;
}

export function CompanionPanel({ isOpen, onClose, mode, query }: Props) {
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtitle = modeSubtitle(mode, query);

  return (
    <div
      className={`${styles.companionPanelRoot}${isOpen ? ` ${styles.companionPanelRootOpen}` : ""}`}
      role="presentation"
    >
      <button
        type="button"
        className={styles.companionPanelBackdrop}
        aria-label="Cerrar panel"
        onClick={onClose}
      />
      <aside
        className={styles.companionPanelSheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby="companion-panel-title"
      >
        <header className={styles.companionPanelHeader}>
          <div>
            <h2 className={styles.companionPanelTitle} id="companion-panel-title">
              {MODE_TITLES[mode]}
            </h2>
            {subtitle ? <p className={styles.companionPanelSub}>{subtitle}</p> : null}
          </div>
          <button
            type="button"
            className={styles.companionPanelClose}
            onClick={onClose}
            aria-label="Cerrar"
          >
            <X size={20} aria-hidden />
          </button>
        </header>
        <div className={styles.companionPanelBody}>
          <CompanionPanelBody mode={mode} query={query} onClose={onClose} />
        </div>
      </aside>
    </div>
  );
}
