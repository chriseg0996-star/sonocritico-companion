"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card, Chip, ProgressBar } from "@/components/ui";
import {
  formatUltimaActividad,
  getModuleProgressPct,
} from "@/features/instructor/data/mockStudents";
import type { InstructorProtocol, StudentProgress } from "@/features/instructor/types";
import styles from "@/features/instructor/instructor.module.css";

const PROTOCOL_ORDER: InstructorProtocol[] = ["BLUE", "FAST", "VExUS", "RUSH"];

function initialsFromName(nombre: string): string {
  const parts = nombre.replace(/^(Dr\.|Dra\.)\s*/i, "").split(/\s+/);
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function nivelChipVariant(nivel: StudentProgress["nivel"]): "brand" | "gray" | "white" {
  if (nivel === "R4" || nivel === "R5") return "white";
  if (nivel === "R2" || nivel === "R3") return "brand";
  return "gray";
}

type Props = {
  student: StudentProgress;
};

export function StudentRow({ student }: Props) {
  const [expanded, setExpanded] = useState(false);
  const progressPct = getModuleProgressPct(student);

  return (
    <li>
      <button
        type="button"
        className={styles.instructorRowBtn}
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
      >
        <Card className={styles.instructorRowCard}>
          <div className={styles.instructorRowMain}>
            <span className={styles.instructorAvatar} aria-hidden>
              {initialsFromName(student.nombre)}
            </span>
            <div className={styles.instructorRowBody}>
              <div className={styles.instructorRowTop}>
                <div>
                  <p className={styles.instructorName}>{student.nombre}</p>
                  <p className={styles.instructorMeta}>
                    {student.especialidad ?? "Residente"}
                    {student.email ? ` · ${student.email}` : ""}
                  </p>
                </div>
                <Chip variant={nivelChipVariant(student.nivel)}>{student.nivel}</Chip>
              </div>
              <div className={styles.instructorRowMetrics}>
                <div className={styles.instructorProgressWrap}>
                  <div className={styles.instructorProgressLabel}>
                    <span>Módulos</span>
                    <span>
                      {student.modulosCompletados}/{student.modulosTotal} · {progressPct}%
                    </span>
                  </div>
                  <ProgressBar value={progressPct} />
                </div>
                <span className={styles.instructorScore}>Score {student.scorePromedio}%</span>
                <span className={styles.instructorActivity}>
                  {formatUltimaActividad(student.ultimaActividad)}
                </span>
                <ChevronDown
                  size={18}
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform var(--motion-fast)",
                    color: "var(--text-muted)",
                  }}
                />
              </div>
              {expanded ? (
                <div className={styles.instructorDetail}>
                  <div className={styles.instructorDetailGrid}>
                    <p className={styles.instructorDetailBlock}>
                      <strong>Casos clínicos</strong>
                      {student.casos} de {student.casosTotal} completados
                    </p>
                    <p className={styles.instructorDetailBlock}>
                      <strong>Última actividad</strong>
                      {new Date(student.ultimaActividad).toLocaleString("es-MX", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <div className={styles.instructorProtocolTags}>
                    {PROTOCOL_ORDER.map((protocolo) => (
                      <Chip key={protocolo} variant="gray">
                        {protocolo} {student.protocolos[protocolo]}%
                      </Chip>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </Card>
      </button>
    </li>
  );
}
