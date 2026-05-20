import type { CaseRouteEntry } from "@/lib/cases/types";
import { recordCaseCompleted } from "@/lib/learning/events";

const STORAGE_KEY = "sonocritico-cases-progress";

export type CaseAttemptRecord = {
  startedAt: string;
  completedAt?: string;
  score?: number;
  route?: CaseRouteEntry[];
  /** Reanudar flujo adaptativo */
  resumeNodeId?: string;
  resumeSelectedId?: string | null;
  resumeShowFeedback?: boolean;
  /** Reanudar flujo lineal */
  resumeStepIndex?: number;
};

export type CasesProgressStore = {
  started: Record<string, CaseAttemptRecord>;
  completed: Record<string, CaseAttemptRecord>;
};

const EMPTY: CasesProgressStore = { started: {}, completed: {} };

export function loadCasesProgress(): CasesProgressStore {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as CasesProgressStore;
    return {
      started: parsed.started ?? {},
      completed: parsed.completed ?? {},
    };
  } catch {
    return EMPTY;
  }
}

function save(store: CasesProgressStore): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    /* quota */
  }
}

export function markCaseStarted(caseId: string): void {
  const store = loadCasesProgress();
  if (store.started[caseId]) return;
  store.started[caseId] = { startedAt: new Date().toISOString(), route: [] };
  save(store);
}

export function saveCaseRoute(caseId: string, route: CaseRouteEntry[]): void {
  const store = loadCasesProgress();
  const existing = store.started[caseId] ?? store.completed[caseId];
  const record: CaseAttemptRecord = {
    ...existing,
    startedAt: existing?.startedAt ?? new Date().toISOString(),
    route,
  };
  store.started[caseId] = record;
  save(store);
}

export function loadCaseRoute(caseId: string): CaseRouteEntry[] {
  const store = loadCasesProgress();
  return store.started[caseId]?.route ?? store.completed[caseId]?.route ?? [];
}

export function saveCaseResume(
  caseId: string,
  data: {
    nodeId?: string;
    stepIndex?: number;
    selectedId?: string | null;
    showFeedback?: boolean;
  },
): void {
  const store = loadCasesProgress();
  const existing = store.started[caseId];
  if (!existing || store.completed[caseId]) return;
  store.started[caseId] = {
    ...existing,
    resumeNodeId: data.nodeId,
    resumeStepIndex: data.stepIndex,
    resumeSelectedId: data.selectedId,
    resumeShowFeedback: data.showFeedback,
  };
  save(store);
}

export function loadCaseResume(caseId: string): {
  nodeId?: string;
  stepIndex?: number;
  selectedId: string | null;
  showFeedback: boolean;
} | null {
  const store = loadCasesProgress();
  const record = store.started[caseId];
  if (!record || store.completed[caseId]) return null;
  if (!record.resumeNodeId && record.resumeStepIndex === undefined) return null;
  return {
    nodeId: record.resumeNodeId,
    stepIndex: record.resumeStepIndex,
    selectedId: record.resumeSelectedId ?? null,
    showFeedback: record.resumeShowFeedback ?? false,
  };
}

export function clearCaseResume(caseId: string): void {
  const store = loadCasesProgress();
  const started = store.started[caseId];
  if (!started) return;
  const { resumeNodeId, resumeStepIndex, resumeSelectedId, resumeShowFeedback, ...rest } = started;
  store.started[caseId] = rest;
  save(store);
}

export function markCaseCompleted(caseId: string, score: number, route?: CaseRouteEntry[]): void {
  const store = loadCasesProgress();
  const now = new Date().toISOString();
  const started = store.started[caseId];
  const finalRoute = route ?? started?.route;
  store.completed[caseId] = {
    startedAt: started?.startedAt ?? now,
    completedAt: now,
    score,
    route: finalRoute,
  };
  delete store.started[caseId];
  save(store);
  const optimal = finalRoute?.filter((e) => e.isOptimal).length ?? 0;
  const total = finalRoute?.length ?? 0;
  recordCaseCompleted(caseId, score, optimal, total);
}

export function getCaseProgress(caseId: string): {
  started: boolean;
  completed: boolean;
  score: number | null;
} {
  const store = loadCasesProgress();
  const completed = store.completed[caseId];
  return {
    started: Boolean(store.started[caseId] || completed),
    completed: Boolean(completed),
    score: completed?.score ?? null,
  };
}
