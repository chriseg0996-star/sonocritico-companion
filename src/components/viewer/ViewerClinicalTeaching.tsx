"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ClinicalTeachingSection } from "@/lib/media/clinical-meta";
import styles from "@/components/viewer/clinical-viewer.module.css";

function TeachingSection({ section, defaultOpen }: { section: ClinicalTeachingSection; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={styles.teachSection}>
      <button
        type="button"
        className={styles.teachToggle}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{section.label}</span>
        <ChevronDown size={14} strokeWidth={1.5} className={open ? styles.teachChevronOpen : styles.teachChevron} />
      </button>
      {open && (
        <div className={styles.teachBody}>
          {section.kind === "text" && section.text && <p className={styles.teachText}>{section.text}</p>}
          {section.kind === "list" && section.items && section.items.length > 0 && (
            <ul className={styles.teachList}>
              {section.items.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

type Props = {
  sections: ClinicalTeachingSection[];
};

/** Acordeón educativo clínico (colapsable, discreto). */
export function ViewerClinicalTeaching({ sections }: Props) {
  if (sections.length === 0) return null;

  return (
    <div className={styles.teachPanel} aria-label="Contenido educativo clínico">
      {sections.map((section, index) => (
        <TeachingSection key={section.id} section={section} defaultOpen={index === 0} />
      ))}
    </div>
  );
}
