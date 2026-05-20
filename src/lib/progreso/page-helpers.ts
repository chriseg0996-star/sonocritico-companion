import type { LocalProgress } from "@/lib/auth";
import { clinicalCases } from "@/lib/mock-data";
import { getEngineCase } from "@/lib/cases";
import type { DomainStats } from "@/lib/progreso/compute";

export type RecentActivityItem = {
  id: string;
  type: "clip" | "case" | "protocol" | "quiz";
  title: string;
  meta: string;
};

export type EvolutionMilestone = {
  id: string;
  label: string;
  state: "done" | "current" | "goal" | "pending";
};

export function getNextObjective(domain: DomainStats): string {
  if (domain.cases < domain.casesTotal) {
    return `Completa 1 caso de ${domain.shortLabel} para consolidar dominio.`;
  }
  if (domain.protocols < domain.protocolsTotal) {
    return `Completa 1 protocolo de ${domain.shortLabel} para consolidar dominio.`;
  }
  if (domain.clips < domain.clipsTotal) {
    return `Revisa 1 clip de ${domain.shortLabel} para consolidar dominio.`;
  }
  return `Profundiza en ${domain.label} para mantener dominio alto.`;
}

export function getEvolutionMilestones(globalPercent: number): EvolutionMilestone[] {
  const p = Math.round(globalPercent);
  const step = (value: number): EvolutionMilestone["state"] => {
    if (p >= value) return "done";
    return "pending";
  };

  return [
    { id: "m20", label: "20%", state: step(20) },
    { id: "m40", label: "40%", state: step(40) },
    { id: "m60", label: "60%", state: step(60) },
    { id: "now", label: `Actual ${p}%`, state: "current" },
    { id: "goal", label: "Meta 100%", state: p >= 100 ? "done" : "goal" },
  ];
}

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "Reciente";
  const days = Math.floor((Date.now() - then) / 86400000);
  if (days <= 0) return "Hoy";
  if (days === 1) return "Ayer";
  return `Hace ${days} días`;
}

export function getActivityTypeLabel(type: RecentActivityItem["type"]): string {
  switch (type) {
    case "clip":
      return "Clip visto";
    case "case":
      return "Caso completado";
    case "protocol":
      return "Protocolo revisado";
    default:
      return "Actividad";
  }
}

export function getRecentActivity(progress: LocalProgress): RecentActivityItem[] {
  const items: RecentActivityItem[] = [];

  for (const caseId of [...progress.completedCases].reverse().slice(0, 2)) {
    const legacy = clinicalCases.find((c) => c.id === caseId);
    const engine = getEngineCase(caseId);
    items.push({
      id: `case-${caseId}`,
      type: "case",
      title: legacy?.title ?? engine?.title ?? `Caso ${caseId}`,
      meta: "Completado",
    });
  }

  for (const slug of [...progress.completedProtocols].reverse().slice(0, 2)) {
    items.push({
      id: `proto-${slug}`,
      type: "protocol",
      title: slug,
      meta: "Revisado",
    });
  }

  for (const q of [...progress.quizResults].reverse().slice(0, 1)) {
    items.push({
      id: `quiz-${q.quizId}`,
      type: "clip",
      title: `Quiz ${q.protocolRef}`,
      meta: formatRelative(q.completedAt),
    });
  }

  if (items.length < 3 && progress.completedModules.length > 0) {
    const mod = progress.completedModules[progress.completedModules.length - 1]!;
    items.push({
      id: `mod-${mod}`,
      type: "clip",
      title: mod,
      meta: "Módulo avanzado",
    });
  }

  return items.slice(0, 3);
}
