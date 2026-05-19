"use client";

import { useEffect, useRef, useState } from "react";
import { ImageOff } from "lucide-react";
import type { MediaItem } from "@/lib/media/types";
import { getMediaLibraryContext } from "@/lib/library/media-context";
import { withBasePath } from "@/lib/paths";
import { useCompareSync } from "@/components/compare/CompareSyncContext";
import { CompareContextStrip } from "@/components/compare/CompareContextStrip";
import styles from "@/components/compare/compare.module.css";

type Props = {
  item: MediaItem;
  label: string;
  role: "reference" | "compare";
  preferClip?: boolean;
  isMaster?: boolean;
};

function isVideoSrc(src: string) {
  return /\.(webm|mp4)(\?|$)/i.test(src);
}

/** Panel compare — still primero; clip bajo demanda (no precarga ambos). */
export function ComparePane({ item, label, role, preferClip = false, isMaster = false }: Props) {
  const { playing, transform, registerVideo, onMasterTimeUpdate } = useCompareSync();
  const [clipActive, setClipActive] = useState(false);
  const context = getMediaLibraryContext(item, { preferClip });

  const stillSrc = item.still ? withBasePath(item.still) : undefined;
  const clipSrc = item.clip ? withBasePath(item.clip) : undefined;
  const showClip = Boolean(clipSrc) && (clipActive || (playing && preferClip));
  const clipIsVideo = clipSrc ? isVideoSrc(clipSrc) : false;

  useEffect(() => {
    if (playing && preferClip && clipSrc) setClipActive(true);
  }, [playing, preferClip, clipSrc]);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!showClip || !clipIsVideo || !videoRef.current) return;
    return registerVideo(videoRef.current);
  }, [showClip, clipIsVideo, registerVideo, clipSrc]);

  return (
    <article className={styles.pane} data-compare-role={role}>
      <CompareContextStrip label={label} role={role} context={context} />
      <div className={styles.mediaStage}>
        <div
          className={styles.mediaInner}
          style={{ transform, transformOrigin: "center center" }}
        >
          {!showClip && (
            <div className={styles.stillWrap}>
              {stillSrc ? (
                <img src={stillSrc} alt={item.title} className={styles.stillImg} decoding="async" loading="lazy" />
              ) : (
                <div className={styles.fallback}>
                  <ImageOff size={24} strokeWidth={1.5} />
                  <span>Sin imagen</span>
                </div>
              )}
            </div>
          )}

          {showClip && clipSrc && (
            clipIsVideo ? (
              <video
                ref={videoRef}
                className={styles.clipVideo}
                src={clipSrc}
                playsInline
                muted
                loop
                preload="none"
                onTimeUpdate={
                  isMaster
                    ? (e) => onMasterTimeUpdate(e.currentTarget.currentTime)
                    : undefined
                }
              />
            ) : (
              <img src={clipSrc} alt={`Clip — ${item.title}`} className={styles.stillImg} loading="lazy" decoding="async" />
            )
          )}
        </div>

        {clipSrc && !clipActive && !playing && (
          <button
            type="button"
            className={styles.loadClipBtn}
            onClick={() => setClipActive(true)}
          >
            Cargar clip
          </button>
        )}
      </div>
    </article>
  );
}
