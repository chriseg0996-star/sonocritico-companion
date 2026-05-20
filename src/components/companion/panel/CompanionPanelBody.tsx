"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { buildCompanionPanelModel } from "@/lib/companion/panel-model";
import type { CompanionLayoutHints } from "@/lib/layout-context";
import { mergeCompanionHints } from "@/lib/layout-context";
import styles from "@/components/companion/companion-side-panel.module.css";

type Props = {
  hints?: CompanionLayoutHints;
  onNavigate?: () => void;
};

export default function CompanionPanelBody({ hints, onNavigate }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const merged = useMemo(() => {
    const base = mergeCompanionHints(pathname, hints);
    if (base.screen === "protocol" && !base.protocolStepId) {
      base.protocolStepId = searchParams.get("step");
    }
    return base;
  }, [pathname, hints, searchParams]);

  const model = useMemo(
    () => buildCompanionPanelModel(merged.screen, merged),
    [merged],
  );

  if (!model) {
    return <p className={styles.empty}>Sin contexto companion para esta pantalla.</p>;
  }

  const go = (href: string) => {
    onNavigate?.();
    router.push(href);
  };

  return (
    <>
      <h3 className={styles.contentTitle}>{model.title}</h3>
      {model.subtitle ? <p className={styles.contentSub}>{model.subtitle}</p> : null}

      {model.sections.map((section) => (
        <div key={section.title} className={styles.section}>
          <p className={styles.sectionLabel}>{section.title}</p>
          <ul className={styles.linkList}>
            {section.items.map((item) => (
              <li key={`${section.title}-${item.href}-${item.label}`}>
                <button type="button" className={styles.linkBtn} onClick={() => go(item.href)}>
                  <span>{item.label}</span>
                  {item.meta ? <span className={styles.linkMeta}>{item.meta}</span> : null}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {model.footnote ? <p className={styles.footnote}>{model.footnote}</p> : null}
    </>
  );
}
