import { GROWTH_LEGEND } from "@/lib/progreso";
import styles from "@/components/progress/knowledge-bloom.module.css";

export function KnowledgeGrowthLegend() {
  return (
    <nav className={styles.legend} aria-label="Escala de madurez">
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
