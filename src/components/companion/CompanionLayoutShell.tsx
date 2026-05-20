"use client";

import { usePathname } from "next/navigation";
import { CompanionSidePanel } from "@/components/companion/CompanionSidePanel";
import type { CompanionLayoutHints } from "@/lib/layout-context";
import { shouldShowCompanionPanel } from "@/lib/layout-context";
import styles from "@/components/companion/companion-side-panel.module.css";

type Props = {
  children: React.ReactNode;
  hints?: CompanionLayoutHints;
};

/** Contenedor principal + panel companion contextual (desktop / sheet móvil). */
export function CompanionLayoutShell({ children, hints }: Props) {
  const pathname = usePathname();
  const showPanel = shouldShowCompanionPanel(pathname);

  if (!showPanel) {
    return <>{children}</>;
  }

  return (
    <div
      className={`${styles.layout}${pathname.startsWith("/viewer/") ? ` ${styles.layoutViewer}` : ""}`}
    >
      <div className={styles.main}>{children}</div>
      <CompanionSidePanel hints={hints} />
    </div>
  );
}
