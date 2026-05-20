import { DOMINIO_LEGEND } from "@/lib/progreso";
import styles from "@/components/progress/knowledge-bloom.module.css";

export function DominioLegend() {
  return (
    <nav className={styles.dominioLegend} aria-label="Nivel de dominio">
      <p className={styles.dominioLegendTitle}>Nivel de dominio</p>
      <ul className={styles.dominioLegendList}>
        {DOMINIO_LEGEND.map((band) => (
          <li key={band.label} className={styles.dominioLegendItem}>
            <span className={styles.dominioSwatch} style={{ background: band.color }} aria-hidden />
            <span>
              {band.min}–{band.max}% · {band.label}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
