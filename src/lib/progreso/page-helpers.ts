import type { LocalProgress } from "@/lib/auth";
import { clinicalCases } from "@/lib/mock-data";
import { getEngineCase } from "@/lib/cases";
import type { DomainStats } from "@/lib/progreso/compute";

export type RecentActivityItem = {
  id: string;
  type: "clip" | "case" | "protocol" | "quiz";
  whenLabel: string;
  detail: string;
};

export type EvolutionMilestone = {
  id: string;
  label: string;
  state: "done" | "current" | "pending";
};

export type ObjectiveChecklist = {
  case: boolean;
  clip: boolean;
  protocol: boolean;
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

export function getObjectiveChecklist(domain: DomainStats): ObjectiveChecklist {
  return {
    case: domain.cases >= 1,
    clip: domain.clips >= 1,
    protocol: domain.protocols >= 1,
  };
}

export function getObjectiveProgress(check: ObjectiveChecklist): number {
  const done = [check.case, check.clip, check.protocol].filter(Boolean).length;
  return Math.round((done / 3) * 100);
}

/** Hitos de trayectoria global (panel inferior). */
export function getEvolutionMilestones(globalPercent: number): EvolutionMilestone[] {
  const p = Math.round(globalPercent);
  const stages = [
    { id: "inicio", label: "Inicio", min: 0 },
    { id: "explorando", label: "Explorando", min: 25 },
    { id: "consolidando", label: "Consolidando", min: 50 },
    { id: "dominio", label: "Dominio", min: 75 },
  ];

  let currentIdx = 0;
  if (p >= 75) currentIdx = 3;
  else if (p >= 50) currentIdx = 2;
  else if (p >= 25) currentIdx = 1;

  return stages.map((s, i) => ({
    id: s.id,
    label: s.label,
    state: i < currentIdx ? "done" : i === currentIdx ? "current" : "pending",
  }));
}

function formatWhenLabel(iso?: string, fallbackIndex = 0): string {
  if (iso) {
    const then = new Date(iso).getTime();
    if (!Number.isNaN(then)) {
      const days = Math.floor((Date.now() - then) / 86400000);
      if (days <= 0) return "Hoy";
      if (days === 1) return "Ayer";
      return `Hace ${days} días`;
    }
  }
  return ["Hoy", "Ayer", "Hace 3 días"][fallbackIndex] ?? "Reciente";
}

function activityDetail(type: RecentActivityItem["type"], title: string): string {
  switch (type) {
    case "clip":
      return title.length > 28 ? "Clip revisado" : title;
    case "case":
      return title.length > 28 ? "Caso completado" : title;
    case "protocol":
      return title.length > 28 ? "Protocolo abierto" : title;
    default:
      return title;
  }
}

export function getRecentActivity(progress: LocalProgress): RecentActivityItem[] {
  const raw: { type: RecentActivityItem["type"]; title: string; iso?: string }[] = [];

  for (const q of [...progress.quizResults].reverse().slice(0, 1)) {
    raw.push({ type: "clip", title: q.protocolRef, iso: q.completedAt });
  }

  for (const caseId of [...progress.completedCases].reverse().slice(0, 1)) {
    const legacy = clinicalCases.find((c) => c.id === caseId);
    const engine = getEngineCase(caseId);
    raw.push({
      type: "case",
      title: legacy?.title ?? engine?.title ?? "Caso clínico",
    });
  }

  for (const slug of [...progress.completedProtocols].reverse().slice(0, 1)) {
    raw.push({ type: "protocol", title: slug });
  }

  if (raw.length < 3 && progress.completedModules.length > 0) {
    const mod = progress.completedModules[progress.completedModules.length - 1]!;
    raw.push({ type: "clip", title: mod });
  }

  return raw.slice(0, 3).map((item, i) => ({
    id: `act-${i}-${item.type}`,
    type: item.type,
    whenLabel: formatWhenLabel(item.iso, i),
    detail: activityDetail(item.type, item.title),
  }));
}
