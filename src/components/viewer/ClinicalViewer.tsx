"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ImageOff } from "lucide-react";
import type { MediaItem } from "@/lib/media/types";
import { MediaOfflineNotice } from "@/components/offline/MediaOfflineNotice";
import { isClipCached, prefetchClip } from "@/lib/offline/prefetch-clip";
import { useNetworkOnline } from "@/lib/offline/use-network-online";
import { ViewerMetadata } from "@/components/viewer/ViewerMetadata";
import { ViewerToolbar } from "@/components/viewer/ViewerToolbar";
import { withBasePath } from "@/lib/paths";
import styles from "@/components/viewer/clinical-viewer.module.css";

export type ClinicalViewerProps = {
  items: MediaItem[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

function isVideoSrc(src: string) {
  return /\.(webm|mp4)(\?|$)/i.test(src);
}

function MediaStage({ item }: { item: MediaItem }) {
  const online = useNetworkOnline();
  const [clipReady, setClipReady] = useState<boolean | null>(null);
  const stillSrc = item.still ? withBasePath(item.still) : undefined;
  const clipSrc = item.clip ? withBasePath(item.clip) : undefined;
  const clipIsVideo = clipSrc ? isVideoSrc(clipSrc) : false;

  useEffect(() => {
    if (!item.clip) {
      setClipReady(null);
      return;
    }
    let cancelled = false;
    (async () => {
      if (await isClipCached(item.clip!)) {
        if (!cancelled) setClipReady(true);
        return;
      }
      if (!online) {
        if (!cancelled) setClipReady(false);
        return;
      }
      const ok = await prefetchClip(item.clip!);
      if (!cancelled) setClipReady(ok);
    })();
    return () => {
      cancelled = true;
    };
  }, [item.clip, item.id, online]);

  return (
    <div className={styles.viewport}>
      <div className={styles.stillWrap}>
        {stillSrc ? (
          <img src={stillSrc} alt={item.title} className={styles.stillImg} decoding="async" />
        ) : (
          <div className={styles.fallback}>
            <ImageOff size={28} strokeWidth={1.5} />
            <span>Sin imagen fija</span>
          </div>
        )}
      </div>

      {clipSrc && (
        <div className={styles.clipSection}>
          <p className={styles.clipLabel}>Clip</p>
          {clipReady === false ? (
            <MediaOfflineNotice />
          ) : clipIsVideo ? (
            <video
              className={styles.clipVideo}
              src={clipSrc}
              controls
              playsInline
              muted
              loop
              preload="metadata"
            />
          ) : (
            <div className={styles.stillWrap}>
              <img src={clipSrc} alt={`Clip — ${item.title}`} className={styles.stillImg} decoding="async" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const SWIPE_THRESHOLD = 48;

/** Visor clínico fullscreen — PACS ligero para biblioteca atlas. */
export function ClinicalViewer({ items, index, onClose, onIndexChange }: ClinicalViewerProps) {
  const item = items[index];
  const touchStartX = useRef<number | null>(null);
  const canPrev = index > 0;
  const canNext = index < items.length - 1;

  const goPrev = useCallback(() => {
    if (canPrev) onIndexChange(index - 1);
  }, [canPrev, index, onIndexChange]);

  const goNext = useCallback(() => {
    if (canNext) onIndexChange(index + 1);
  }, [canNext, index, onIndexChange]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, goPrev, goNext]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (!item) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`Visor clínico — ${item.title}`}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
        const delta = endX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(delta) < SWIPE_THRESHOLD) return;
        if (delta < 0) goNext();
        else goPrev();
      }}
    >
      <ViewerToolbar
        index={index}
        total={items.length}
        onClose={onClose}
        onPrev={goPrev}
        onNext={goNext}
        canPrev={canPrev}
        canNext={canNext}
      />

      <div className={styles.body}>
        <MediaStage item={item} />
        <ViewerMetadata item={item} />
      </div>
    </div>
  );
}
