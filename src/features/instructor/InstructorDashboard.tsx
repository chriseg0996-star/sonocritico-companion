"use client";

import { StatsOverview } from "@/features/instructor/components/StatsOverview";
import { ProtocolHeatmap } from "@/features/instructor/components/ProtocolHeatmap";
import { StudentRow } from "@/features/instructor/components/StudentRow";
import {
  MOCK_STUDENTS,
  getCourseStats,
  getProtocolHeatmap,
} from "@/features/instructor/data/mockStudents";
import styles from "@/features/instructor/instructor.module.css";

export function InstructorDashboard() {
  const stats = getCourseStats(MOCK_STUDENTS);
  const heatmap = getProtocolHeatmap(MOCK_STUDENTS);

  return (
    <div className={styles.instructorPage}>
      <header className={styles.instructorHeader}>
        <p className={styles.instructorEyebrow}>Panel instructor</p>
        <h1 className={styles.instructorTitle}>Progreso de residentes</h1>
        <p className={styles.instructorSubtitle}>
          Vista consolidada del curso SONOCRÍTICO · datos mock listos para API
        </p>
      </header>

      <StatsOverview stats={stats} />

      <ProtocolHeatmap rows={heatmap} />

      <section aria-labelledby="instructor-students-title">
        <h2 className={styles.instructorSectionTitle} id="instructor-students-title">
          Residentes ({MOCK_STUDENTS.length})
        </h2>
        <ul className={styles.instructorStudentList}>
          {MOCK_STUDENTS.map((student) => (
            <StudentRow key={student.id} student={student} />
          ))}
        </ul>
      </section>
    </div>
  );
}
