"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";
import type { MediaItem } from "@/lib/media/types";
import { getMediaPreviewSrc, MEDIA_MODULE_LABELS } from "@/lib/media/atlas-filters";
import { withBasePath } from "@/lib/paths";
import styles from "@/components/atlas/atlas-library.module.css";
import { cn } from "@/lib/utils";

type Props = {
  item: MediaItem;
  onOpen?: (item: MediaItem) => void;
};

function PreviewFallback({ label }: { label: string }) {
  return (
    <div className={styles.fallback} aria-hidden>
      <ImageOff size={18} strokeWidth={1.5} />
      <span>{label}</span>
    </div>
  );
}

function MediaPreview({ item }: Pick<Props, "item">) {
  const [broken, setBroken] = useState(false);
  const src = getMediaPreviewSrc(item);
  const resolved = src ? withBasePath(src) : undefined;

  if (!resolved || broken) {
    return <PreviewFallback label={resolved ? "No disponible" : "Sin preview"} />;
  }

  return (
    <img
      src={resolved}
      alt=""
      className={styles.previewImg}
      loading="lazy"
      decoding="async"
      onError={() => setBroken(true)}
    />
  );
}

/** Card de hallazgo desde manifest (biblioteca). */
export function AtlasCard({ item, onOpen }: Props) {
  const moduleLabel = MEDIA_MODULE_LABELS[item.module as keyof typeof MEDIA_MODULE_LABELS] ?? item.module;
  const finding = item.metadata?.finding ?? item.category.replace(/-/g, " ");

  const content = (
    <>
      <div className={styles.preview}>
        <MediaPreview item={item} />
      </div>
      <div className={styles.body}>
        <div className={styles.metaRow}>
          <h3 className={styles.title}>{item.title}</h3>
          <span className={styles.moduleTag}>{moduleLabel}</span>
        </div>
        <p className={styles.finding}>{finding}</p>
      </div>
    </>
  );

  if (onOpen) {
    return (
      <button
        type="button"
        className={cn(styles.card, styles.cardInteractive)}
        aria-label={`Abrir ${item.title}`}
        onClick={() => onOpen(item)}
      >
        {content}
      </button>
    );
  }

  return (
    <article className={styles.card} aria-label={item.title}>
      {content}
    </article>
  );
}
