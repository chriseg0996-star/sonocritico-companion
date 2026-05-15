"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { AtlasEntry } from "@/lib/atlas/types";
import { AtlasThumbnail } from "@/components/atlas/AtlasThumbnail";
import { resolveAtlasMedia } from "@/lib/atlas/resolve-media";
import { placeholderGradients } from "@/lib/atlas/placeholders";
import { theme } from "@/lib/theme";
import { type } from "@/lib/typography";

type Props = {
  entry: AtlasEntry | null;
  entries: AtlasEntry[];
  onClose: () => void;
  onNavigate: (entry: AtlasEntry) => void;
};

export function MediaViewerModal({ entry, entries, onClose, onNavigate }: Props) {
  const [mediaFailed, setMediaFailed] = useState(false);

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
    if (!entry) return;
    setMediaFailed(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [entry, onClose, goPrev, goNext]);

  if (!entry) return null;

  const media = resolveAtlasMedia(entry);
  const isVideo = entry.kind === "clip" || entry.mediaType === "video";
  const showPlaceholder = media.isPlaceholder || mediaFailed;
  const ph = placeholderGradients[entry.placeholderVariant ?? "pattern-a"];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={entry.title}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        background: "rgba(5, 7, 10, 0.88)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        animation: "atlasViewerIn 160ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes atlasViewerIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 960,
          maxHeight: "min(92vh, 900px)",
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "auto 1fr auto",
          background: theme.bg.elevated,
          borderRadius: theme.radius.lg,
          boxShadow: "0 24px 80px rgba(0,0,0,0.55)",
          border: `1px solid ${theme.bg.border}`,
          overflow: "hidden",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
            padding: "14px 16px",
            borderBottom: `1px solid ${theme.bg.border}`,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  padding: "2px 7px",
                  borderRadius: 4,
                  background: entry.isPathological ? theme.state.errorMuted : theme.accent.muted,
                  color: entry.isPathological ? theme.state.danger : theme.accent.soft,
                }}
              >
                {entry.isPathological ? "Patológico" : "Normal"}
              </span>
              {isVideo && (
                <span style={{ fontSize: 9, color: theme.text.faint }}>
                  CLIP {entry.duration ?? ""}
                </span>
              )}
              <span style={{ fontSize: 10, color: theme.text.faint }}>{entry.window}</span>
            </div>
            <h2 style={{ ...type.titleSm, fontSize: 16, fontWeight: 500, margin: 0, color: theme.text.primary }}>
              {entry.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            style={{
              background: theme.surface.glass,
              border: "none",
              borderRadius: 6,
              padding: 8,
              cursor: "pointer",
              color: theme.text.secondary,
              flexShrink: 0,
            }}
          >
            <X size={18} />
          </button>
        </header>

        <div
          style={{
            position: "relative",
            minHeight: 200,
            maxHeight: "50vh",
            background: "#050608",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!showPlaceholder && isVideo && media.src ? (
            <video
              key={entry.id}
              src={media.src}
              poster={media.posterSrc}
              autoPlay
              muted
              loop
              playsInline
              controls
              style={{ width: "100%", maxHeight: "50vh", objectFit: "contain" }}
              onError={() => setMediaFailed(true)}
            />
          ) : !showPlaceholder && media.src ? (
            <img
              key={entry.id}
              src={media.src}
              alt={media.alt}
              style={{ width: "100%", maxHeight: "50vh", objectFit: "contain" }}
              onError={() => setMediaFailed(true)}
            />
          ) : (
            <div
              style={{
                width: "100%",
                minHeight: 220,
                background: ph.gradient,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: theme.text.faint,
                fontSize: 12,
              }}
            >
              Vista previa pendiente de carga
            </div>
          )}

          {hasPrev && (
            <NavBtn side="left" onClick={goPrev} label="Anterior" />
          )}
          {hasNext && (
            <NavBtn side="right" onClick={goNext} label="Siguiente" />
          )}
        </div>

        <div style={{ padding: "14px 16px 16px", overflowY: "auto", maxHeight: "32vh" }}>
          <p style={{ ...type.bodySm, color: theme.text.secondary, margin: "0 0 12px", fontSize: 13 }}>
            {entry.description}
          </p>
          <MetaBlock label="Interpretación clínica" value={entry.clinicalInterpretation} />
          {entry.clinicalAction && <MetaBlock label="Siguiente paso" value={entry.clinicalAction} highlight />}
          {entry.frequentError && (
            <MetaBlock label="Error frecuente" value={entry.frequentError} warning />
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 10 }}>
            {entry.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 9,
                  padding: "2px 6px",
                  borderRadius: 3,
                  background: theme.surface.glass,
                  color: theme.text.faint,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <p style={{ fontSize: 10, color: theme.text.faint, marginTop: 12, textAlign: "center" }}>
            {index + 1} / {entries.length} · ← → navegar · ESC cerrar
          </p>
        </div>
      </div>
    </div>
  );
}

function NavBtn({ side, onClick, label }: { side: "left" | "right"; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={{
        position: "absolute",
        top: "50%",
        ...(side === "left" ? { left: 8 } : { right: 8 }),
        transform: "translateY(-50%)",
        background: "rgba(11, 14, 18, 0.75)",
        backdropFilter: "blur(6px)",
        border: `1px solid ${theme.bg.border}`,
        borderRadius: 8,
        padding: 10,
        cursor: "pointer",
        color: theme.text.primary,
      }}
    >
      {side === "left" ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </button>
  );
}

function MetaBlock({
  label,
  value,
  highlight,
  warning,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  warning?: boolean;
}) {
  return (
    <div style={{ marginBottom: 10 }}>
      <span style={{ ...type.eyebrow, fontSize: 9, color: theme.text.faint, display: "block", marginBottom: 4 }}>
        {label}
      </span>
      <p
        style={{
          margin: 0,
          fontSize: 12,
          lineHeight: 1.5,
          color: warning ? theme.state.warning : highlight ? theme.state.danger : theme.text.muted,
        }}
      >
        {value}
      </p>
    </div>
  );
}
