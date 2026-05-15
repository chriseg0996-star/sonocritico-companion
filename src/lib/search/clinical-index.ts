import { courseModules } from "@/lib/course-modules";
import { protocols, echoImages } from "@/lib/mock-data";
import { pulmonAtlasEntries, getAtlasEntryById } from "@/lib/modules/pulmon-atlas";
import {
  bibliography,
  normalFindings,
  pathologyFindings,
  PULMON_BLUE_SLUG,
} from "@/lib/modules/pulmonar-blue-reference";
import type { ClinicalSearchResult } from "@/lib/search/types";

function haystack(parts: (string | undefined)[]): string {
  return parts.filter(Boolean).join(" ").toLowerCase();
}

function atlasToResult(entry: (typeof pulmonAtlasEntries)[0]): ClinicalSearchResult {
  const group = entry.kind === "clip" ? "clip" : "hallazgo";
  return {
    id: `atlas-${entry.id}`,
    group,
    title: entry.title,
    subtitle: `${entry.window} · ${entry.protocol}`,
    moduleLabel: "Pulmón / BLUE",
    moduleSlug: PULMON_BLUE_SLUG,
    category: entry.isPathological ? "Patológico" : "Normal",
    tags: entry.tags,
    href: `/modulos/${PULMON_BLUE_SLUG}#atlas`,
    atlasEntryId: entry.id,
    protocolSlug: entry.protocol.toLowerCase() === "lus" ? "blue" : entry.protocol.toLowerCase(),
    isPathological: entry.isPathological,
    thumbnailKey: entry.id,
  };
}

function moduleSlugForProtocol(protocolRef: string): string | undefined {
  const mod = courseModules.find((m) => m.protocolSlugs.includes(protocolRef));
  return mod?.slug;
}

function buildIndex(): ClinicalSearchResult[] {
  const items: ClinicalSearchResult[] = [];

  for (const entry of pulmonAtlasEntries) {
    items.push(atlasToResult(entry));
  }

  for (const img of echoImages) {
    const modSlug = moduleSlugForProtocol(img.protocolRef);
    items.push({
      id: `img-${img.id}`,
      group: "hallazgo",
      title: img.finding,
      subtitle: img.window,
      moduleLabel: img.protocolRef.toUpperCase(),
      moduleSlug: modSlug,
      category: img.isPathological ? "Patológico" : "Normal",
      tags: [img.protocolRef, img.window, img.isPathological ? "patológico" : "normal"],
      href: `/imagenes`,
      protocolSlug: img.protocolRef,
      isPathological: img.isPathological,
    });
  }

  for (const f of normalFindings) {
    items.push({
      id: `pulmon-norm-${f.title}`,
      group: "hallazgo",
      title: f.title,
      subtitle: f.appearance.slice(0, 72),
      moduleLabel: "Pulmón / BLUE",
      moduleSlug: PULMON_BLUE_SLUG,
      category: "Normal",
      tags: ["normal", "BLUE", "pulmón", f.title],
      href: `/modulos/${PULMON_BLUE_SLUG}#normal`,
      protocolSlug: "blue",
      isPathological: false,
      atlasEntryId: matchAtlasByTitle(f.title),
    });
  }

  for (const f of pathologyFindings) {
    items.push({
      id: `pulmon-path-${f.title}`,
      group: "hallazgo",
      title: f.title,
      subtitle: f.clinical.slice(0, 72),
      moduleLabel: "Pulmón / BLUE",
      moduleSlug: PULMON_BLUE_SLUG,
      category: "Patológico",
      tags: ["patológico", "BLUE", "pulmón", f.title],
      href: `/modulos/${PULMON_BLUE_SLUG}#patologico`,
      protocolSlug: "blue",
      isPathological: true,
      atlasEntryId: matchAtlasByTitle(f.title),
    });
  }

  for (const p of protocols) {
    const modSlug = moduleSlugForProtocol(p.slug);
    items.push({
      id: `proto-${p.slug}`,
      group: "protocolo",
      title: p.title,
      subtitle: p.indication,
      moduleLabel: modSlug ? courseModules.find((m) => m.slug === modSlug)?.title ?? "Curso" : "Protocolo",
      moduleSlug: modSlug,
      category: p.category,
      tags: [p.slug, p.category, p.indication],
      href: modSlug ? `/modulos/${modSlug}?tab=protocolo` : `/protocolos/${p.slug}`,
      protocolSlug: p.slug,
    });
  }

  for (const m of courseModules) {
    items.push({
      id: `mod-${m.slug}`,
      group: "modulo",
      title: m.title,
      subtitle: m.subtitle,
      moduleLabel: "Módulo",
      moduleSlug: m.slug,
      category: "Curso",
      tags: [...m.protocolSlugs, m.slug],
      href: `/modulos/${m.slug}`,
      protocolSlug: m.protocolSlugs[0],
    });
  }

  bibliography.forEach((b, i) => {
    items.push({
      id: `bib-${i}`,
      group: "bibliografia",
      title: b.citation.slice(0, 80),
      subtitle: b.note ?? "Referencia",
      moduleLabel: "Pulmón / BLUE",
      moduleSlug: PULMON_BLUE_SLUG,
      category: "Evidencia",
      tags: ["bibliografía", "LUS", "BLUE"],
      href: `/modulos/${PULMON_BLUE_SLUG}#bibliografia`,
      protocolSlug: "blue",
    });
  });

  return items;
}

function matchAtlasByTitle(title: string): string | undefined {
  const t = title.toLowerCase();
  const found = pulmonAtlasEntries.find((e) => {
    const et = e.title.toLowerCase();
    return et.includes(t) || t.includes(et) || e.tags.some((tag) => t.includes(tag.toLowerCase()));
  });
  return found?.id;
}

export const clinicalSearchIndex: ClinicalSearchResult[] = buildIndex();

export { getAtlasEntryById };
