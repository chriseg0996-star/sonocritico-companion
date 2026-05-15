"use client";

import { useState } from "react";
import { ImageIcon, Play } from "lucide-react";
import type { AtlasEntry } from "@/lib/atlas/types";
import { placeholderGradients } from "@/lib/atlas/placeholders";
import { resolveAtlasMedia } from "@/lib/atlas/resolve-media";
import { theme } from "@/lib/theme";

type Props = {
  entry: AtlasEntry;
  aspectRatio?: string;
  showPlayOverlay?: boolean;
};

export function AtlasThumbnail({ entry, aspectRatio = "4/3", showPlayOverlay }: Props) {
  const media = resolveAtlasMedia(entry);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const showPlaceholder = media.isPlaceholder || failed;
  const variant = entry.placeholderVariant ?? "pattern-a";
  const ph = placeholderGradients[variant];
  const isClip = entry.kind === "clip" || entry.mediaType === "video" || entry.mediaType === "gif";

  return (
    <div className="atlas-thumb" style={{ position: "relative", aspectRatio, background: theme.bg.primary, overflow: "hidden" }}>
      {!showPlaceholder && !loaded && <div className="atlas-thumb-skeleton" aria-hidden />}
      {!showPlaceholder ? (
        <img
          src={media.thumbnailSrc}
          alt={media.alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            opacity: loaded ? 1 : 0,
            transition: "opacity 140ms ease",
          }}
        />
      ) : (
        <div
          style={{
            height: "100%",
            minHeight: 80,
            background: ph.gradient,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <ImageIcon size={18} color={theme.text.faint} strokeWidth={1.2} />
          <span style={{ fontSize: 9, color: theme.text.faint, letterSpacing: "0.06em" }}>{ph.label}</span>
        </div>
      )}

      {(showPlayOverlay ?? isClip) && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.2)",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(11, 14, 18, 0.65)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Play size={14} color={theme.brand.primary} fill={theme.brand.primary} />
          </div>
        </div>
      )}

      <span
        style={{
          position: "absolute",
          top: 6,
          left: 6,
          fontSize: 8,
          fontWeight: 600,
          padding: "2px 6px",
          borderRadius: 4,
          background: entry.isPathological ? theme.state.errorMuted : theme.accent.muted,
          color: entry.isPathological ? theme.state.danger : theme.accent.soft,
        }}
      >
        {entry.isPathological ? "Patol." : "Normal"}
      </span>

      {isClip && entry.duration && (
        <span
          style={{
            position: "absolute",
            bottom: 6,
            right: 6,
            fontSize: 8,
            padding: "2px 6px",
            borderRadius: 4,
            background: "rgba(11, 14, 18, 0.8)",
            color: theme.text.secondary,
          }}
        >
          {entry.duration}
        </span>
      )}

      {isClip && (
        <span
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            fontSize: 8,
            fontWeight: 600,
            padding: "2px 6px",
            borderRadius: 4,
            background: "rgba(11, 14, 18, 0.75)",
            color: theme.text.secondary,
          }}
        >
          CLIP
        </span>
      )}
    </div>
  );
}
