import type { LearningScoreSnapshot } from "@/lib/learning";
import styles from "@/components/progress/progress-page.module.css";

type Props = {
  learning: LearningScoreSnapshot;
  className?: string;
};

export function ProgressPageHeader({ learning, className }: Props) {
  return (
    <header className={`${styles.header} ${className ?? ""}`}>
      <div className={styles.headerTop}>
        <h1 className={styles.headerTitle}>Mi progreso</h1>
        <p className={styles.headerSubtitle}>Tu mapa clínico evoluciona con cada caso.</p>
      </div>
      <div className={styles.chips}>
        <span className={styles.chip}>
          Nivel actual <strong>{learning.level.label}</strong>
        </span>
        <span className={styles.chip}>
          Score <strong>{learning.total}</strong>
        </span>
        <span className={styles.chip}>
          Racha <strong>{learning.streakDays}d</strong>
        </span>
      </div>
    </header>
  );
}
