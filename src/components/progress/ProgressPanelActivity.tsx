"use client";

import { getActivityTypeLabel, type RecentActivityItem } from "@/lib/progreso";
import styles from "@/components/progress/progress-page.module.css";

type Props = {
  items: RecentActivityItem[];
  className?: string;
};

export function ProgressPanelActivity({ items, className }: Props) {
  return (
    <section
      className={`${styles.panelCard} ${styles.orderActivity} ${className ?? ""}`}
      aria-labelledby="panel-activity-title"
    >
      <h2 className={styles.panelEyebrow} id="panel-activity-title">
        Actividad reciente
      </h2>
      <ul className={styles.activityFeed}>
        {items.length === 0 ? (
          <li className={styles.activityEmpty}>Aún no hay actividad registrada.</li>
        ) : (
          items.map((item) => (
            <li key={item.id} className={styles.activityFeedItem}>
              <span className={styles.activityType}>{getActivityTypeLabel(item.type)}</span>
              <span className={styles.activityTitle}>{item.title}</span>
              {item.meta ? <span className={styles.activityMeta}>{item.meta}</span> : null}
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
