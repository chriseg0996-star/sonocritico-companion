import type { DailyTrainingKind, LastDailyTraining } from "@/lib/training/daily-training-types";

const LOCAL_KEY = "sonocritico-daily-training";
const SESSION_KEY = "sonocritico-daily-training-session";

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function read(key: string): LastDailyTraining | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window[key === SESSION_KEY ? "sessionStorage" : "localStorage"].getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as LastDailyTraining;
  } catch {
    return null;
  }
}

function write(key: string, record: LastDailyTraining): void {
  if (typeof window === "undefined") return;
  try {
    window[key === SESSION_KEY ? "sessionStorage" : "localStorage"].setItem(key, JSON.stringify(record));
  } catch {
    /* quota */
  }
}

export function loadLastDailyTraining(): LastDailyTraining | null {
  const local = read(LOCAL_KEY);
  const session = read(SESSION_KEY);
  if (!local) return session;
  if (!session) return local;
  const localAt = local.lastAt ? new Date(local.lastAt).getTime() : 0;
  const sessionAt = session.lastAt ? new Date(session.lastAt).getTime() : 0;
  return sessionAt >= localAt ? session : local;
}

export function saveLastDailyTraining(record: LastDailyTraining): void {
  write(LOCAL_KEY, record);
  write(SESSION_KEY, record);
}

export function markDailyTrainingDone(kind: DailyTrainingKind, dateKey: string): LastDailyTraining {
  const prev = loadLastDailyTraining();
  const base: LastDailyTraining =
    prev?.dateKey === dateKey
      ? prev
      : { dateKey, completedKinds: [] };

  const completedKinds = base.completedKinds.includes(kind)
    ? base.completedKinds
    : [...base.completedKinds, kind];

  const next: LastDailyTraining = {
    dateKey,
    completedKinds,
    lastKind: kind,
    lastAt: new Date().toISOString(),
  };
  saveLastDailyTraining(next);
  return next;
}

export function isDailyKindDone(kind: DailyTrainingKind, dateKey: string): boolean {
  const record = loadLastDailyTraining();
  if (!record || record.dateKey !== dateKey) return false;
  return record.completedKinds.includes(kind);
}
