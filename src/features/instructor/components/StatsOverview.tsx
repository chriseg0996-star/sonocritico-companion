"use client";

import { Card } from "@/components/ui";
import type { CourseStats, InstructorProtocol } from "@/features/instructor/types";
import styles from "@/features/instructor/instructor.module.css";

type Props = {
  stats: CourseStats;
};

function topProtocol(casosPorProtocolo: Record<InstructorProtocol, number>): {
  protocolo: InstructorProtocol;
  total: number;
} {
  const entries = Object.entries(casosPorProtocolo) as [InstructorProtocol, number][];
  const [protocolo, total] = entries.sort((a, b) => b[1] - a[1])[0] ?? ["BLUE", 0];
  return { protocolo, total };
}

export function StatsOverview({ stats }: Props) {
  const topEntry = topProtocol(stats.casosPorProtocolo);

  return (
    <section aria-labelledby="instructor-stats-title">
      <h2 className={styles.instructorSectionTitle} id="instructor-stats-title">
        Resumen del curso
      </h2>
      <div className={styles.instructorStats}>
        <Card className={styles.instructorStatCard}>
          <p className={styles.instructorStatValue}>{stats.totalEstudiantes}</p>
          <p className={styles.instructorStatLabel}>Estudiantes activos</p>
        </Card>
        <Card className={styles.instructorStatCard}>
          <p className={styles.instructorStatValue}>{stats.completadoPromedio}%</p>
          <p className={styles.instructorStatLabel}>Progreso promedio</p>
          <p className={styles.instructorStatHint}>Módulos del curso completados</p>
        </Card>
        <Card className={styles.instructorStatCard}>
          <p className={styles.instructorStatValue}>{topEntry.protocolo}</p>
          <p className={styles.instructorStatLabel}>Caso más completado</p>
          <p className={styles.instructorStatHint}>
            {topEntry.total} residente{topEntry.total === 1 ? "" : "s"} con checklist ≥80%
          </p>
        </Card>
      </div>
    </section>
  );
}
