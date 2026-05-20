"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import {
  DAILY_TRAINING_ESTIMATE_MIN,
  getDailyTrainingPack,
} from "@/lib/training/daily-training";
import type { DailyTrainingItem, DailyTrainingKind, LastDailyTraining } from "@/lib/training/daily-training-types";
import {
  isDailyKindDone,
  loadLastDailyTraining,
  markDailyTrainingDone,
  todayKey,
} from "@/lib/training/daily-training-storage";
import styles from "@/components/dashboard/daily-training.module.css";

const KIND_LABEL: Record<DailyTrainingKind, string> = {
  case: "Caso",
  finding: "Hallazgo",
  clip: "Clip",
};

const LAST_KIND_LABEL: Record<DailyTrainingKind, string> = {
  case: "caso",
  finding: "hallazgo",
  clip: "clip",
};

function formatLastTraining(record: LastDailyTraining | null): string | null {
  if (!record?.lastKind || !record.lastAt) return null;
  const when = new Date(record.lastAt);
  const isToday = record.dateKey === todayKey();
  const time = when.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
  const day = isToday ? "hoy" : record.dateKey;
  return `Último: ${LAST_KIND_LABEL[record.lastKind]} · ${day} ${time}`;
}

/** Entrenamiento diario compacto — caso, hallazgo y clip del día (~3 min). */
export function DailyTrainingCard() {
  const router = useRouter();
  const pack = useMemo(() => getDailyTrainingPack(), []);
  const items: DailyTrainingItem[] = useMemo(
    () => [pack.case, pack.finding, pack.clip],
    [pack],
  );

  const [done, setDone] = useState<Record<DailyTrainingKind, boolean>>({
    case: false,
    finding: false,
    clip: false,
  });
  const [lastLine, setLastLine] = useState<string | null>(null);

  useEffect(() => {
    const record = loadLastDailyTraining();
    setLastLine(formatLastTraining(record));
    setDone({
      case: isDailyKindDone("case", pack.dateKey),
      finding: isDailyKindDone("finding", pack.dateKey),
      clip: isDailyKindDone("clip", pack.dateKey),
    });
  }, [pack.dateKey]);

  const handleOpen = (item: DailyTrainingItem) => {
    const next = markDailyTrainingDone(item.kind, pack.dateKey);
    setDone((prev) => ({ ...prev, [item.kind]: true }));
    setLastLine(formatLastTraining(next));
    router.push(item.href);
  };

  return (
    <section className={styles.card} aria-labelledby="daily-training-title">
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Entrenamiento diario</p>
          <h2 className={styles.title} id="daily-training-title">
            Listo en menos de 3 minutos
          </h2>
        </div>
        <span className={styles.eta}>~{DAILY_TRAINING_ESTIMATE_MIN} min</span>
      </div>

      {lastLine && <p className={styles.last}>{lastLine}</p>}

      <div className={styles.list}>
        {items.map((item) => {
          const completed = done[item.kind];
          return (
            <button
              key={item.kind}
              type="button"
              className={`${styles.row}${completed ? ` ${styles.rowDone}` : ""}`}
              onClick={() => handleOpen(item)}
            >
              <span className={styles.kind}>{KIND_LABEL[item.kind]}</span>
              <span className={styles.body}>
                <span className={styles.rowTitle}>{item.title}</span>
                <span className={styles.rowSub}>{item.subtitle}</span>
              </span>
              {completed ? (
                <span className={styles.doneMark}>Listo</span>
              ) : (
                <ChevronRight size={14} className={styles.chevron} aria-hidden />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
