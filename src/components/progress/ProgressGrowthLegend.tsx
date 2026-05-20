import { GROWTH_LEGEND } from "@/lib/progreso";
import styles from "@/components/progress/progress-page.module.css";

type Props = {
  className?: string;
};

export function ProgressGrowthLegend({ className }: Props) {
  return (
    <nav className={`${styles.legend} ${className ?? ""}`} aria-label="Escala de madurez">
      <ul className={styles.legendList}>
        {GROWTH_LEGEND.map((stage) => (
          <li key={stage.id} className={styles.legendItem}>
            <span className={styles.legendDot} data-stage={stage.id} aria-hidden />
            {stage.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}
