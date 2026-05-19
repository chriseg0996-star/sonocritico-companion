"use client";

import { useCallback, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FrequentErrorTraining } from "@/lib/training/types";
import { isErrorSeen, markErrorSeen } from "@/lib/training/error-trainer-storage";
import { findMediaItemById } from "@/lib/media/manifests";
import { getMediaPreviewSrc } from "@/lib/media/atlas-filters";
import { withBasePath } from "@/lib/paths";
import styles from "@/components/training/error-trainer.module.css";

type Props = {
  error: FrequentErrorTraining;
  defaultOpen?: boolean;
  onOpen?: (errorId: string) => void;
};

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className={styles.bullets}>
      {items.slice(0, 3).map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );
}

/** Acordeón compacto — un error frecuente. */
export function ErrorTrainerAccordion({ error, defaultOpen = false, onOpen }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const [seen, setSeen] = useState(() => isErrorSeen(error.id));

  const toggle = useCallback(() => {
    setOpen((prev) => {
      const next = !prev;
      if (next) {
        markErrorSeen(error.id);
        setSeen(true);
        onOpen?.(error.id);
      }
      return next;
    });
  }, [error.id, onOpen]);

  const exampleId = error.exampleMediaId ?? error.mediaIds[0];
  const example = exampleId ? findMediaItemById(exampleId) : null;
  const previewSrc = example?.item
    ? getMediaPreviewSrc(example.item)
    : undefined;

  return (
    <li className={`${styles.item}${seen ? ` ${styles.itemSeen}` : ""}`}>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        onClick={toggle}
      >
        <span className={styles.toggleLabel}>{error.error}</span>
        {!seen && <span className={`${styles.badge} ${styles.badgeNew}`}>Nuevo</span>}
        {seen && <span className={styles.badge}>Visto</span>}
        <ChevronDown
          size={16}
          strokeWidth={1.5}
          className={open ? styles.chevronOpen : styles.chevron}
          aria-hidden
        />
      </button>

      {open && (
        <div className={styles.body}>
          <div className={styles.block}>
            <p className={styles.blockTitle}>Por qué ocurre</p>
            <BulletList items={error.why} />
          </div>
          <div className={styles.block}>
            <p className={styles.blockTitle}>Cómo evitarlo</p>
            <BulletList items={error.avoid} />
          </div>

          {previewSrc && example?.item && (
            <div className={styles.visual}>
              <img
                src={withBasePath(previewSrc)}
                alt={`Ejemplo — ${example.item.title}`}
                className={styles.visualImg}
                loading="lazy"
                decoding="async"
              />
              <p className={styles.visualCaption}>Ejemplo: {example.item.title}</p>
            </div>
          )}
        </div>
      )}
    </li>
  );
}
