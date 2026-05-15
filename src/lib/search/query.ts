import { clinicalSearchIndex } from "@/lib/search/clinical-index";
import { matchesDomainFilter } from "@/lib/search/domains";
import type { ClinicalDomainFilter, ClinicalSearchGroup, ClinicalSearchResult } from "@/lib/search/types";

function matchesQuery(item: ClinicalSearchResult, q: string): boolean {
  if (!q) return true;
  const blob = [
    item.title,
    item.subtitle,
    item.moduleLabel,
    item.category,
    item.moduleSlug,
    item.protocolSlug,
    ...item.tags,
  ]
    .join(" ")
    .toLowerCase();
  return blob.includes(q);
}

export type GroupedClinicalResults = {
  group: ClinicalSearchGroup;
  label: string;
  items: ClinicalSearchResult[];
}[];

const GROUP_LABELS: Record<ClinicalSearchGroup, string> = {
  hallazgo: "Hallazgos",
  clip: "Clips",
  protocolo: "Protocolos",
  bibliografia: "Bibliografía",
  modulo: "Módulos",
};

const GROUP_ORDER: ClinicalSearchGroup[] = ["hallazgo", "clip", "protocolo", "bibliografia", "modulo"];

export function searchClinicalIndex(
  query: string,
  domainFilter: ClinicalDomainFilter
): ClinicalSearchResult[] {
  const q = query.trim().toLowerCase();
  return clinicalSearchIndex.filter(
    (item) =>
      matchesQuery(item, q) &&
      matchesDomainFilter(domainFilter, {
        protocolSlug: item.protocolSlug,
        moduleSlug: item.moduleSlug,
        isPathological: item.isPathological,
      })
  );
}

export function groupClinicalResults(results: ClinicalSearchResult[]): GroupedClinicalResults {
  return GROUP_ORDER.map((group) => ({
    group,
    label: GROUP_LABELS[group],
    items: results.filter((r) => r.group === group),
  })).filter((g) => g.items.length > 0);
}
