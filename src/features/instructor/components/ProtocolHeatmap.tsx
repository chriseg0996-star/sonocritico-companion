"use client";

import type { HeatmapRow, ResidentLevel } from "@/features/instructor/types";
import styles from "@/features/instructor/instructor.module.css";

const LEVELS: ResidentLevel[] = ["R1", "R2", "R3", "R4", "R5"];

function cellClass(pct: number): string {
  if (pct >= 70) return styles.instructorHeatmapCellAlta;
  if (pct >= 40) return styles.instructorHeatmapCellMedia;
  return styles.instructorHeatmapCellBaja;
}

type Props = {
  rows: HeatmapRow[];
};

export function ProtocolHeatmap({ rows }: Props) {
  return (
    <section aria-labelledby="instructor-heatmap-title">
      <h2 className={styles.instructorSectionTitle} id="instructor-heatmap-title">
        Mapa por protocolo y nivel
      </h2>
      <div className={styles.instructorHeatmapWrap}>
        <table className={styles.instructorHeatmap}>
          <thead>
            <tr>
              <th scope="col">Protocolo</th>
              {LEVELS.map((nivel) => (
                <th key={nivel} scope="col">
                  {nivel}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.protocolo}>
                <th scope="row">{row.protocolo}</th>
                {LEVELS.map((nivel) => {
                  const pct = row.celdas[nivel];
                  return (
                    <td key={nivel}>
                      <div
                        className={`${styles.instructorHeatmapCell} ${cellClass(pct)}`}
                        title={`${row.protocolo} · ${nivel}: ${pct}%`}
                      >
                        {pct}%
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
