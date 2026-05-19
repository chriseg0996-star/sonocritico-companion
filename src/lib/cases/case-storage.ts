const STORAGE_KEY = "sonocritico-cases-progress";

export type CaseAttemptRecord = {
  startedAt: string;
  completedAt?: string;
  score?: number;
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
  store.started[caseId] = { startedAt: new Date().toISOString() };
  save(store);
}

export function markCaseCompleted(caseId: string, score: number): void {
  const store = loadCasesProgress();
  const now = new Date().toISOString();
  store.started[caseId] = store.started[caseId] ?? { startedAt: now };
  store.completed[caseId] = {
    startedAt: store.started[caseId].startedAt,
    completedAt: now,
    score,
  };
  save(store);
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
