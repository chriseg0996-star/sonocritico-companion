"use client";

import { useEffect, useState } from "react";
import type { AtlasEntry } from "@/lib/atlas/types";
import { resolveAtlasMedia } from "@/lib/atlas/resolve-media";
import { placeholderGradients } from "@/lib/atlas/placeholders";
import { ViewerOverlays } from "@/components/atlas/viewer/ViewerOverlays";
import { useViewerZoomPan } from "@/hooks/useViewerZoomPan";
import { theme } from "@/lib/theme";

type Props = {
  entry: AtlasEntry;
  compact?: boolean;
};

export function ViewerViewport({ entry, compact }: Props) {
  const media = resolveAtlasMedia(entry);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const showPlaceholder = media.isPlaceholder || failed;
  const ph = placeholderGradients[entry.placeholderVariant ?? "pattern-a"];
  const useVideo = Boolean(media.isRasterClip && media.src);
  const useImage = Boolean(!useVideo && media.src && !showPlaceholder);
  const zoomPan = useViewerZoomPan(useImage);

  useEffect(() => {
    setFailed(false);
    setLoaded(false);
    zoomPan.reset();
  }, [entry.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`us-viewport${compact ? " us-viewport--compact" : ""}`}>
      <div
        className="us-viewport-stage"
        onWheel={zoomPan.onWheel}
        onPointerDown={zoomPan.onPointerDown}
        onPointerMove={zoomPan.onPointerMove}
        onPointerUp={zoomPan.onPointerUp}
        onPointerLeave={zoomPan.onPointerUp}
        style={{ cursor: zoomPan.canPan ? "grab" : "default" }}
      >
        {!loaded && !showPlaceholder && <div className="us-viewport-skeleton" aria-hidden />}

        {useVideo ? (
          <video
            key={entry.id}
            className="us-viewport-media"
            src={media.src}
            poster={media.posterSrc}
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        ) : useImage ? (
          <img
            key={entry.id}
            className="us-viewport-media"
            src={media.src}
            alt={media.alt}
            draggable={false}
            style={{ transform: zoomPan.transform, transition: loaded ? "opacity 160ms ease" : undefined, opacity: loaded ? 1 : 0 }}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        ) : (
          <div
            className="us-viewport-placeholder"
            style={{ background: ph.gradient }}
          >
            <span>{ph.label}</span>
          </div>
        )}

        {!showPlaceholder && loaded && <ViewerOverlays entry={entry} compact={compact} />}
      </div>

      {useImage && zoomPan.zoom > 1 && (
        <button type="button" className="us-viewport-reset-zoom" onClick={zoomPan.reset}>
          Restablecer zoom
        </button>
      )}
    </div>
  );
}
