"use client";

import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, Columns2, X } from "lucide-react";
import type { AtlasComparisonPair, AtlasEntry } from "@/lib/atlas/types";
import { preloadAtlasMedia } from "@/lib/atlas/resolve-media";
import { ViewerFilmstrip } from "@/components/atlas/viewer/ViewerFilmstrip";
import { ViewerViewport } from "@/components/atlas/viewer/ViewerViewport";
import { ViewerCompare } from "@/components/atlas/viewer/ViewerCompare";
import { theme } from "@/lib/theme";
import { type } from "@/lib/typography";

export type ViewerMode =
  | { type: "single"; entry: AtlasEntry }
  | { type: "compare"; pair: AtlasComparisonPair };

type Props = {
  mode: ViewerMode | null;
  entries: AtlasEntry[];
  onClose: () => void;
  onNavigate: (entry: AtlasEntry) => void;
};

export function UltrasoundViewer({ mode, entries, onClose, onNavigate }: Props) {
  const entry = mode?.type === "single" ? mode.entry : null;
  const comparePair = mode?.type === "compare" ? mode.pair : null;

  const index = entry ? entries.findIndex((e) => e.id === entry.id) : -1;
  const hasPrev = index > 0;
  const hasNext = index >= 0 && index < entries.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(entries[index - 1]);
  }, [hasPrev, index, entries, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(entries[index + 1]);
  }, [hasNext, index, entries, onNavigate]);

  useEffect(() => {
    if (!mode) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (mode.type === "single") {
        if (e.key === "ArrowLeft") goPrev();
        if (e.key === "ArrowRight") goNext();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mode, onClose, goPrev, goNext]);

  useEffect(() => {
    if (entry && index >= 0) preloadAtlasMedia(entries, index);
  }, [entry?.id, index, entries]);

  if (!mode) return null;

  const isCompare = mode.type === "compare";

  return (
    <div className="us-viewer-backdrop us-viewer-backdrop--fullscreen" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="us-viewer-shell" onClick={(e) => e.stopPropagation()}>
        <header className="us-viewer-header">
          <div className="us-viewer-header-main">
            {isCompare ? (
              <>
                <Columns2 size={14} color={theme.brand.primary} />
                <h2 className="us-viewer-title">{comparePair!.title}</h2>
              </>
            ) : (
              <>
                <h2 className="us-viewer-title">{entry!.title}</h2>
                <span className="us-viewer-header-meta">
                  {entry!.isPathological ? "Patológico" : "Normal"} · {entry!.protocol}
                </span>
              </>
            )}
          </div>
          <button type="button" className="us-viewer-close" onClick={onClose} aria-label="Cerrar">
            <X size={20} />
          </button>
        </header>

        <div className="us-viewer-body">
          {isCompare && comparePair ? (
            <ViewerCompare pair={comparePair} />
          ) : entry ? (
            <>
              <div className="us-viewer-stage-wrap">
                <ViewerViewport entry={entry} onSwipePrev={hasPrev ? goPrev : undefined} onSwipeNext={hasNext ? goNext : undefined} />
                {hasPrev && <NavBtn side="left" onClick={goPrev} label="Anterior" />}
                {hasNext && <NavBtn side="right" onClick={goNext} label="Siguiente" />}
              </div>
              <aside className="us-viewer-meta">
                <MetaTags entry={entry} />
                <p className="us-viewer-desc">{entry.description}</p>
                <Meta label="Interpretación" value={entry.clinicalInterpretation} />
                {entry.clinicalAction && <Meta label="Siguiente paso" value={entry.clinicalAction} danger />}
                {entry.frequentError && <Meta label="Error frecuente" value={entry.frequentError} warn />}
              </aside>
            </>
          ) : null}
        </div>

        {!isCompare && entry && entries.length > 1 && (
          <ViewerFilmstrip entries={entries} activeId={entry.id} onSelect={onNavigate} />
        )}

        {!isCompare && entry && (
          <div className="us-viewer-mobile-nav" aria-hidden={false}>
            <button type="button" className="us-viewer-mobile-btn" disabled={!hasPrev} onClick={goPrev} aria-label="Anterior">
              <ChevronLeft size={22} />
            </button>
            <span className="us-viewer-mobile-count">
              {index + 1} / {entries.length}
            </span>
            <button type="button" className="us-viewer-mobile-btn" disabled={!hasNext} onClick={goNext} aria-label="Siguiente">
              <ChevronRight size={22} />
            </button>
          </div>
        )}

        <footer className="us-viewer-footer us-viewer-footer--desktop">
          {!isCompare && entry && <span>{index + 1} / {entries.length}</span>}
          <span>Desliza · ← → · ESC</span>
        </footer>
      </div>
    </div>
  );
}

function MetaTags({ entry }: { entry: AtlasEntry }) {
  return (
    <div className="us-viewer-tags">
      <span className={`us-viewer-tag${entry.isPathological ? " us-viewer-tag--path" : ""}`}>
        {entry.isPathological ? "Patológico" : "Normal"}
      </span>
      <span className="us-viewer-tag">{entry.window}</span>
      <span className="us-viewer-tag">{entry.kind === "clip" ? "CLIP" : "IMG"}</span>
      {entry.tags.slice(0, 2).map((t) => (
        <span key={t} className="us-viewer-tag us-viewer-tag--muted">
          {t}
        </span>
      ))}
    </div>
  );
}

function NavBtn({ side, onClick, label }: { side: "left" | "right"; onClick: () => void; label: string }) {
  return (
    <button type="button" className={`us-viewer-nav us-viewer-nav--${side} us-viewer-nav--desktop`} aria-label={label} onClick={onClick}>
      {side === "left" ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
    </button>
  );
}

function Meta({ label, value, danger, warn }: { label: string; value: string; danger?: boolean; warn?: boolean }) {
  return (
    <div className="us-viewer-meta-block">
      <span style={{ ...type.eyebrow, fontSize: 9, color: theme.text.faint }}>{label}</span>
      <p
        style={{
          margin: "4px 0 0",
          fontSize: 12,
          lineHeight: 1.5,
          color: warn ? theme.state.warning : danger ? theme.state.danger : theme.text.muted,
        }}
      >
        {value}
      </p>
    </div>
  );
}
