import type { LocalProgress } from "@/lib/auth";
import { clinicalCases } from "@/lib/mock-data";
import { getEngineCase, getEngineCaseIds } from "@/lib/cases";
import { getMediaForModule } from "@/lib/media/manifests";
import {
  KNOWLEDGE_DOMAINS,
  type KnowledgeDomainConfig,
  type KnowledgeDomainId,
} from "@/lib/progreso/domains";
import { getModulePercent, getCoursePercent } from "@/lib/module-progress";
import { getInteractiveProtocols } from "@/lib/protocols";

export type DomainStats = {
  id: KnowledgeDomainId;
  label: string;
  shortLabel: string;
  color: string;
  percent: number;
  cases: number;
  casesTotal: number;
  clips: number;
  clipsTotal: number;
  protocols: number;
  protocolsTotal: number;
};

export type KnowledgeHexSnapshot = {
  globalPercent: number;
  domains: DomainStats[];
  primary: DomainStats;
};

export type KnowledgeRecommendation = {
  kind: "case" | "clip" | "protocol";
  label: string;
  href: string;
};

function averageModulePercent(slugs: string[], progress: LocalProgress): number {
  if (slugs.length === 0) return 0;
  const sum = slugs.reduce((acc, slug) => acc + getModulePercent(slug, progress), 0);
  return Math.round(sum / slugs.length);
}

function countCases(domain: KnowledgeDomainConfig, progress: LocalProgress): { done: number; total: number } {
  const refs = new Set(domain.protocolSlugs);
  const legacy = clinicalCases.filter((c) => c.protocolRefs.some((r) => refs.has(r)));
  const engineIds = getEngineCaseIds().filter((id) => {
    const def = getEngineCase(id);
    const slug = def?.defaultResources?.protocolSlug;
    return slug && refs.has(slug);
  });
  const total = legacy.length + engineIds.length;
  const done = [
    ...legacy.filter((c) => progress.completedCases.includes(c.id)),
    ...engineIds.filter((id) => progress.completedCases.includes(id)),
  ].length;
  return { done, total: Math.max(total, 1) };
}

function countClips(domain: KnowledgeDomainConfig, progress: LocalProgress): { done: number; total: number } {
  if (domain.mediaModule) {
    const items = getMediaForModule(domain.mediaModule);
    const total = items.filter((i) => i.clip || i.still).length;
    const pct = averageModulePercent(domain.moduleSlugs, progress);
    const stepsBonus = domain.moduleSlugs.reduce(
      (n, slug) => n + (progress.completedSteps[slug]?.length ?? 0),
      0,
    );
    const done = Math.min(total, Math.max(Math.round((total * pct) / 100), stepsBonus));
    return { done, total: Math.max(total, 1) };
  }

  const capacity = domain.clipCapacity ?? 10;
  const pct = averageModulePercent(domain.moduleSlugs, progress);
  const done = Math.min(capacity, Math.round((capacity * pct) / 100));
  return { done, total: capacity };
}

function countProtocols(domain: KnowledgeDomainConfig, progress: LocalProgress): { done: number; total: number } {
  const interactive = getInteractiveProtocols().map((p) => p.slug);
  const slugs = domain.protocolSlugs.filter((s) => interactive.includes(s));
  const total = Math.max(slugs.length, domain.protocolSlugs.length, 1);
  const done = slugs.filter((s) => progress.completedProtocols.includes(s)).length;
  return { done, total };
}

function buildDomainStats(domain: KnowledgeDomainConfig, progress: LocalProgress): DomainStats {
  const cases = countCases(domain, progress);
  const clips = countClips(domain, progress);
  const protocols = countProtocols(domain, progress);

  return {
    id: domain.id,
    label: domain.label,
    shortLabel: domain.shortLabel,
    color: domain.color,
    percent: averageModulePercent(domain.moduleSlugs, progress),
    cases: cases.done,
    casesTotal: cases.total,
    clips: clips.done,
    clipsTotal: clips.total,
    protocols: protocols.done,
    protocolsTotal: protocols.total,
  };
}

export function computeKnowledgeHex(progress: LocalProgress): KnowledgeHexSnapshot {
  const domains = KNOWLEDGE_DOMAINS.map((d) => buildDomainStats(d, progress));
  const primary = [...domains].sort((a, b) => b.percent - a.percent)[0]!;
  return {
    globalPercent: getCoursePercent(progress),
    domains,
    primary,
  };
}

export function getKnowledgeRecommendations(
  primary: DomainStats,
  progress: LocalProgress,
): KnowledgeRecommendation[] {
  const domain = KNOWLEDGE_DOMAINS.find((d) => d.id === primary.id)!;
  const recs: KnowledgeRecommendation[] = [];

  const casePending = clinicalCases.find(
    (c) =>
      !progress.completedCases.includes(c.id) &&
      c.protocolRefs.some((r) => domain.protocolSlugs.includes(r)),
  );
  if (casePending) {
    recs.push({ kind: "case", label: casePending.title, href: `/casos/${casePending.id}` });
  } else {
    const engineId = getEngineCaseIds().find((id) => !progress.completedCases.includes(id));
    if (engineId) {
      recs.push({ kind: "case", label: "Caso adaptativo", href: `/casos/${engineId}` });
    }
  }

  if (domain.mediaModule) {
    const item = getMediaForModule(domain.mediaModule)[0];
    if (item) {
      recs.push({
        kind: "clip",
        label: item.title,
        href: `/viewer/${item.id}?module=${domain.mediaModule}`,
      });
    }
  } else {
    recs.push({ kind: "clip", label: `Módulo ${domain.moduleSlugs[0]}`, href: `/modulos/${domain.moduleSlugs[0]}` });
  }

  const protoSlug =
    domain.protocolSlugs.find((s) => !progress.completedProtocols.includes(s)) ??
    domain.protocolSlugs[0];
  if (protoSlug) {
    recs.push({ kind: "protocol", label: `Protocolo ${protoSlug}`, href: `/protocolos/${protoSlug}` });
  }

  return recs.slice(0, 3);
}

/** Radio relativo 0–1 según bandas de madurez visual. */
export function growthFactor(percent: number): number {
  if (percent <= 20) return 0.12 + (percent / 20) * 0.18;
  if (percent <= 40) return 0.3 + ((percent - 20) / 20) * 0.2;
  if (percent <= 60) return 0.5 + ((percent - 40) / 20) * 0.18;
  if (percent <= 80) return 0.68 + ((percent - 60) / 20) * 0.2;
  return 0.88 + ((percent - 80) / 20) * 0.12;
}
