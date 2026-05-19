"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ViewerBreadcrumbItem } from "@/lib/viewer/breadcrumb";
import styles from "@/components/viewer/clinical-viewer.module.css";

type Props = {
  items: ViewerBreadcrumbItem[];
};

export function ViewerBreadcrumb({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <nav className={styles.breadcrumb} aria-label="Ruta clínica">
      <ol className={styles.breadcrumbList}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className={styles.breadcrumbItem}>
              {index > 0 && (
                <ChevronRight size={12} strokeWidth={1.5} className={styles.breadcrumbSep} aria-hidden />
              )}
              {item.href && !isLast ? (
                <Link href={item.href} className={styles.breadcrumbLink}>
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? styles.breadcrumbCurrent : styles.breadcrumbMuted}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
