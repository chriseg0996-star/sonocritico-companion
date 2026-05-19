import type { User } from "@/types";
import { PROTOCOL_TO_MODULES } from "@/lib/course-modules";
import { recordCaseCompleted, recordQuizCompleted } from "@/lib/learning/events";
import { migrateProgress } from "@/lib/module-progress";
import { mockCourse } from "./mock-data";

const STORAGE_KEY = "sonocritico_user";

export function login(
  email: string,
  _password: string,
  courseCode: string
): { user: User; error?: never } | { user?: never; error: string } {
  if (courseCode !== mockCourse.accessCode) {
    return { error: "Código de curso inválido. Usa SONO2024." };
  }
  if (!email || email.length < 3) {
    return { error: "Email inválido." };
  }

  const role = email.includes("instructor") ? "instructor" : "student";
  const namePart = email.split("@")[0].replace(/[._]/g, " ");
  const name = namePart
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const user: User = {
    id: `user-${Date.now()}`,
    email,
    name,
    initials,
    role,
    courseCode,
    specialty: "urgencias",
  };

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }

  return { user };
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("sonocritico_progress");
  }
}

const PROGRESS_KEY = "sonocritico_progress";

export interface LocalProgress {
  completedModules: string[];
  completedProtocols: string[];
  completedCases: string[];
  /** step ids completed per module slug */
  completedSteps: Record<string, string[]>;
  checklistStatus: Record<string, Record<string, boolean>>;
  quizResults: Array<{ quizId: string; protocolRef: string; score: number; answers: number[]; completedAt: string; timeSpentSeconds: number }>;
}

const defaultProgress: LocalProgress = {
  completedModules: ["fast-efast"],
  completedProtocols: ["fast", "eco-basica"],
  completedCases: ["case-01"],
  completedSteps: {
    "fast-efast": ["fast-efast-intro", "fast-efast-acq", "fast-efast-find"],
  },
  checklistStatus: {
    fast: {
      "fast-1": true, "fast-2": true, "fast-3": true, "fast-4": true,
      "fast-5": false, "fast-6": false, "fast-7": false,
    },
    "eco-basica": {
      "eco-1": true, "eco-2": true, "eco-3": true, "eco-4": true,
      "eco-5": true, "eco-6": true, "eco-7": false, "eco-8": true,
    },
  },
  quizResults: [
    { quizId: "q-01", protocolRef: "fast", score: 100, answers: [1], completedAt: new Date().toISOString(), timeSpentSeconds: 45 },
    { quizId: "q-02", protocolRef: "fast", score: 100, answers: [1], completedAt: new Date().toISOString(), timeSpentSeconds: 32 },
    { quizId: "q-04", protocolRef: "blue", score: 100, answers: [1], completedAt: new Date().toISOString(), timeSpentSeconds: 55 },
  ],
};

function normalizeProgress(raw: LocalProgress): LocalProgress {
  const withModules: LocalProgress = {
    ...raw,
    completedModules: raw.completedModules ?? [],
    completedSteps: raw.completedSteps ?? {},
  };
  return migrateProgress(withModules);
}

export function getProgress(): LocalProgress {
  if (typeof window === "undefined") return defaultProgress;
  const raw = localStorage.getItem(PROGRESS_KEY);
  if (!raw) return defaultProgress;
  try {
    return normalizeProgress(JSON.parse(raw) as LocalProgress);
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: LocalProgress) {
  if (typeof window !== "undefined") {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }
}

export function completeProtocol(slug: string) {
  const p = getProgress();
  if (!p.completedProtocols.includes(slug)) {
    p.completedProtocols.push(slug);
  }
  for (const moduleSlug of PROTOCOL_TO_MODULES[slug] ?? []) {
    if (!p.completedModules.includes(moduleSlug)) {
      p.completedModules.push(moduleSlug);
    }
  }
  saveProgress(p);
}

export function toggleChecklistItem(protocolSlug: string, itemId: string, value: boolean) {
  const p = getProgress();
  if (!p.checklistStatus[protocolSlug]) p.checklistStatus[protocolSlug] = {};
  p.checklistStatus[protocolSlug][itemId] = value;
  saveProgress(p);
}

export function saveQuizResult(result: LocalProgress["quizResults"][0]) {
  const p = getProgress();
  const existing = p.quizResults.findIndex((r) => r.quizId === result.quizId);
  const prevScore = existing >= 0 ? p.quizResults[existing]!.score : 0;
  const isNew = existing < 0;
  if (existing >= 0) p.quizResults[existing] = result;
  else p.quizResults.push(result);
  saveProgress(p);
  if (isNew || result.score > prevScore) {
    recordQuizCompleted(result.score);
  }
}

export function completeCase(caseId: string) {
  const p = getProgress();
  if (!p.completedCases.includes(caseId)) {
    p.completedCases.push(caseId);
    saveProgress(p);
    recordCaseCompleted(caseId, 70, 0, 0);
  } else {
    saveProgress(p);
  }
}

export function completeModule(moduleSlug: string) {
  const p = getProgress();
  if (!p.completedModules.includes(moduleSlug)) {
    p.completedModules.push(moduleSlug);
  }
  saveProgress(p);
}

export function completeModuleStep(moduleSlug: string, stepId: string) {
  const p = getProgress();
  if (!p.completedSteps[moduleSlug]) p.completedSteps[moduleSlug] = [];
  if (!p.completedSteps[moduleSlug].includes(stepId)) {
    p.completedSteps[moduleSlug].push(stepId);
  }
  saveProgress(p);
}
