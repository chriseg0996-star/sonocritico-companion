"use client";

import dynamic from "next/dynamic";
import { Suspense, useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, PanelRight } from "lucide-react";
import type { CompanionLayoutHints } from "@/lib/layout-context";
import {
  loadSidePanelState,
  saveSidePanelOpen,
  saveSidePanelWidth,
  SIDE_PANEL_MAX_WIDTH,
  SIDE_PANEL_MIN_WIDTH,
} from "@/lib/layout-context";
import styles from "@/components/companion/companion-side-panel.module.css";

const CompanionPanelBody = dynamic(() => import("@/components/companion/panel/CompanionPanelBody"), {
  ssr: false,
  loading: () => <p className={styles.empty}>Cargando contexto…</p>,
});

type Props = {
  hints?: CompanionLayoutHints;
};

export function CompanionSidePanel({ hints }: Props) {
  const [open, setOpen] = useState(true);
  const [width, setWidth] = useState(280);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loadContent, setLoadContent] = useState(false);

  useEffect(() => {
    const stored = loadSidePanelState();
    setOpen(stored.open);
    setWidth(stored.width);
  }, []);

  useEffect(() => {
    if (open || mobileOpen) setLoadContent(true);
  }, [open, mobileOpen]);

  useEffect(() => {
    const refresh = () => setLoadContent(true);
    window.addEventListener("sonocritico-guardia-reset", refresh);
    return () => window.removeEventListener("sonocritico-guardia-reset", refresh);
  }, []);

  const toggleDesktop = useCallback(() => {
    setOpen((prev) => {
      const next = !prev;
      saveSidePanelOpen(next);
      return next;
    });
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const openMobile = useCallback(() => {
    setLoadContent(true);
    setMobileOpen(true);
  }, []);

  const onResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const startX = e.clientX;
      const startW = width;

      const onMove = (ev: MouseEvent) => {
        const delta = startX - ev.clientX;
        const next = Math.min(SIDE_PANEL_MAX_WIDTH, Math.max(SIDE_PANEL_MIN_WIDTH, startW + delta));
        setWidth(next);
      };

      const onUp = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        setWidth((w) => {
          saveSidePanelWidth(w);
          return w;
        });
      };

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    [width],
  );

  const panelBody = loadContent ? (
    <Suspense fallback={<p className={styles.empty}>Cargando contexto…</p>}>
      <CompanionPanelBody hints={hints} onNavigate={closeMobile} />
    </Suspense>
  ) : null;

  return (
    <>
      {!open ? (
        <button type="button" className={styles.desktopToggle} onClick={toggleDesktop} aria-label="Abrir companion">
          Companion
        </button>
      ) : null}

      <aside
        className={`${styles.desktopPanel}${open ? "" : ` ${styles["desktopPanel--collapsed"]}`}`}
        style={open ? { width } : undefined}
        aria-label="Panel companion"
        aria-hidden={!open}
      >
        {open ? (
          <>
            <div className={styles.resizeHandle} onMouseDown={onResizeStart} aria-hidden />
            <div className={styles.panelHead}>
              <h2 className={styles.panelTitle}>Companion</h2>
              <button
                type="button"
                className={styles.iconBtn}
                onClick={toggleDesktop}
                aria-label="Colapsar panel"
              >
                <ChevronRight size={16} aria-hidden />
              </button>
            </div>
            <div className={styles.panelBody}>{panelBody}</div>
          </>
        ) : null}
      </aside>

      <button
        type="button"
        className={styles.mobileFab}
        onClick={openMobile}
        aria-expanded={mobileOpen}
        aria-label="Abrir companion"
      >
        <PanelRight size={14} style={{ marginRight: 6 }} aria-hidden />
        Companion
      </button>

      {mobileOpen ? (
        <>
          <button type="button" className={styles.sheetBackdrop} aria-label="Cerrar" onClick={closeMobile} />
          <div className={styles.sheet} role="dialog" aria-modal="true" aria-label="Companion móvil">
            <div className={styles.panelHead}>
              <h2 className={styles.panelTitle}>Companion</h2>
              <button type="button" className={styles.iconBtn} onClick={closeMobile} aria-label="Cerrar">
                <ChevronLeft size={16} aria-hidden />
              </button>
            </div>
            <div className={styles.panelBody}>{panelBody}</div>
          </div>
        </>
      ) : null}
    </>
  );
}
