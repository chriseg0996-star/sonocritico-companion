import type { ClinicalDomainFilter } from "@/lib/search/types";

const PROTOCOL_DOMAIN: Record<string, ClinicalDomainFilter> = {
  blue: "pulmon",
  fast: "fast",
  rush: "cardio",
  vexus: "vexus",
  "eco-basica": "cardio",
  "acceso-vascular": "fast",
  dvt: "fast",
};

const MODULE_DOMAIN: Record<string, ClinicalDomainFilter> = {
  "pulmonar-blue": "pulmon",
  "fast-efast": "fast",
  "eco-critico": "cardio",
  vexus: "vexus",
  "respuesta-volumen": "cardio",
};

export function domainFromProtocol(protocolRef: string): ClinicalDomainFilter {
  const key = protocolRef.toLowerCase();
  if (key === "lus" || key === "plaps" || key === "blue") return "pulmon";
  return PROTOCOL_DOMAIN[key] ?? "all";
}

export function domainFromModuleSlug(slug: string): ClinicalDomainFilter {
  return MODULE_DOMAIN[slug] ?? "all";
}

export function matchesDomainFilter(
  filter: ClinicalDomainFilter,
  opts: {
    protocolSlug?: string;
    moduleSlug?: string;
    isPathological?: boolean;
  }
): boolean {
  if (filter === "all") return true;
  if (filter === "normal") return opts.isPathological === false;
  if (filter === "patologico") return opts.isPathological === true;
  const domain =
    (opts.moduleSlug && domainFromModuleSlug(opts.moduleSlug)) ||
    (opts.protocolSlug && domainFromProtocol(opts.protocolSlug)) ||
    "all";
  if (filter === "pulmon") return domain === "pulmon";
  if (filter === "fast") return domain === "fast";
  if (filter === "cardio") return domain === "cardio";
  if (filter === "vexus") return domain === "vexus";
  return true;
}
