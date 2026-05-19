"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ImageOff } from "lucide-react";
import type { MediaItem } from "@/lib/media/types";
import { MediaOfflineNotice } from "@/components/offline/MediaOfflineNotice";
import { isClipCached, prefetchClip } from "@/lib/offline/prefetch-clip";
import { useNetworkOnline } from "@/lib/offline/use-network-online";
import { ViewerBreadcrumb } from "@/components/viewer/ViewerBreadcrumb";
import { ViewerMetadata } from "@/components/viewer/ViewerMetadata";
import { ViewerNavFooter } from "@/components/viewer/ViewerNavFooter";
import { ViewerQuickActions } from "@/components/viewer/ViewerQuickActions";
import { ViewerToolbar } from "@/components/viewer/ViewerToolbar";
import type { ViewerBreadcrumbItem } from "@/lib/viewer/breadcrumb";
import { withBasePath } from "@/lib/paths";
import styles from "@/components/viewer/clinical-viewer.module.css";

export type ClinicalViewerProps = {
  items: MediaItem[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  fromProtocol?: string | null;
  fromStep?: string | null;
  mode?: "overlay" | "page";
  breadcrumbItems?: ViewerBreadcrumbItem[];
  onBack?: () => void;
  autoplayClip?: boolean;
};

function isVideoSrc(src: string) {
  return /\.(webm|mp4)(\?|$)/i.test(src);
}

function MediaStage({ item, autoplayClip = false }: { item: MediaItem; autoplayClip?: boolean }) {
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
    <div className={styles.viewport} data-clinical-viewport>
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
              autoPlay={autoplayClip}
              preload={autoplayClip ? "auto" : "metadata"}
              ref={(el) => {
                if (autoplayClip && el) void el.play().catch(() => undefined);
              }}
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
export function ClinicalViewer({
  items,
  index,
  onClose,
  onIndexChange,
  fromProtocol,
  fromStep,
  mode = "overlay",
  breadcrumbItems = [],
  onBack,
  autoplayClip = false,
}: ClinicalViewerProps) {
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

  const isPage = mode === "page";
  const shellClass = isPage ? styles.pageShell : styles.overlay;

  return (
    <div
      className={shellClass}
      role={isPage ? "main" : "dialog"}
      aria-modal={isPage ? undefined : true}
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
      {isPage ? (
        <header className={styles.pageHeader}>
          <div className={styles.pageHeaderMain}>
            <ViewerBreadcrumb items={breadcrumbItems} />
          </div>
          <ViewerQuickActions item={item} />
        </header>
      ) : (
        <ViewerToolbar
          index={index}
          total={items.length}
          onClose={onClose}
          onPrev={goPrev}
          onNext={goNext}
          canPrev={canPrev}
          canNext={canNext}
        />
      )}

      <div className={styles.body}>
        <MediaStage item={item} autoplayClip={autoplayClip} />
        <ViewerMetadata item={item} fromProtocol={fromProtocol} fromStep={fromStep} />
      </div>

      {isPage && (
        <ViewerNavFooter
          canPrev={canPrev}
          canNext={canNext}
          onPrev={goPrev}
          onNext={goNext}
          onBack={onBack ?? onClose}
        />
      )}
    </div>
  );
}
