import type { LocalProgress } from "@/lib/auth";
import { clinicalCases } from "@/lib/mock-data";
import { getEngineCase } from "@/lib/cases";
import type { DomainStats } from "@/lib/progreso/compute";

export type RecentActivityItem = {
  id: string;
  label: string;
  meta: string;
};

export function getNextObjective(domain: DomainStats): string {
  if (domain.cases < domain.casesTotal) {
    return `Completar 1 caso de ${domain.shortLabel}`;
  }
  if (domain.protocols < domain.protocolsTotal) {
    return `Completar 1 protocolo de ${domain.shortLabel}`;
  }
  if (domain.clips < domain.clipsTotal) {
    return `Revisar 1 clip de ${domain.shortLabel}`;
  }
  return `Profundizar en ${domain.label}`;
}

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "Reciente";
  const days = Math.floor((Date.now() - then) / 86400000);
  if (days <= 0) return "Hoy";
  if (days === 1) return "Ayer";
  return `Hace ${days} días`;
}

export function getRecentActivity(progress: LocalProgress): RecentActivityItem[] {
  const items: RecentActivityItem[] = [];

  for (const q of [...progress.quizResults].reverse().slice(0, 2)) {
    items.push({
      id: `quiz-${q.quizId}`,
      label: `Quiz · ${q.protocolRef}`,
      meta: `${q.score}% · ${formatRelative(q.completedAt)}`,
    });
  }

  for (const caseId of [...progress.completedCases].reverse().slice(0, 2)) {
    const legacy = clinicalCases.find((c) => c.id === caseId);
    const engine = getEngineCase(caseId);
    items.push({
      id: `case-${caseId}`,
      label: legacy?.title ?? engine?.title ?? `Caso ${caseId}`,
      meta: "Completado",
    });
  }

  for (const slug of [...progress.completedProtocols].reverse().slice(0, 1)) {
    items.push({
      id: `proto-${slug}`,
      label: `Protocolo ${slug}`,
      meta: "Completado",
    });
  }

  return items.slice(0, 3);
}
