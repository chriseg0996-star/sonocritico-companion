import { getModule } from "@/lib/course-modules";
import { loadSmartResumeState } from "@/lib/resume/storage";
import type { ResumePointer } from "@/lib/resume/types";

function modulePointer(state: ReturnType<typeof loadSmartResumeState>): ResumePointer | null {
  const m = state.module;
  if (!m) return null;
  const mod = getModule(m.slug);
  return {
    kind: "module",
    label: mod?.title ?? m.slug,
    sublabel: m.stepTitle ?? `Paso ${m.stepIndex + 1}`,
    href: m.href,
    at: m.at,
  };
}

function clipPointer(state: ReturnType<typeof loadSmartResumeState>): ResumePointer | null {
  const c = state.clip;
  if (!c) return null;
  return {
    kind: "clip",
    label: c.label,
    sublabel: "Visor",
    href: c.href,
    at: c.at,
  };
}

function casePointer(state: ReturnType<typeof loadSmartResumeState>): ResumePointer | null {
  const c = state.case;
  if (!c) return null;
  return {
    kind: "case",
    label: c.label,
    sublabel: "Caso clínico",
    href: c.href,
    at: c.at,
  };
}

function searchPointer(state: ReturnType<typeof loadSmartResumeState>): ResumePointer | null {
  const s = state.search;
  if (!s) return null;
  return {
    kind: "search",
    label: s.query,
    sublabel: "Búsqueda",
    href: s.href,
    at: s.at,
  };
}

/** Punto de reanudación más reciente (módulo, clip, caso o búsqueda). */
export function getSmartResumeTarget(): ResumePointer | null {
  const state = loadSmartResumeState();
  const candidates = [
    modulePointer(state),
    clipPointer(state),
    casePointer(state),
    searchPointer(state),
  ].filter((p): p is ResumePointer => Boolean(p));

  if (candidates.length === 0) return null;

  candidates.sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());
  return candidates[0] ?? null;
}
