import { getModuleSlugForProtocol } from "@/lib/course-modules";

export function getStudyHref(opts: {
  protocolRef: string;
  imageId?: string;
  tab?: "hallazgos" | "resumen" | "protocolo";
}): string {
  if (opts.imageId) return `/imagenes?id=${opts.imageId}`;
  const modSlug = getModuleSlugForProtocol(opts.protocolRef);
  if (modSlug) return `/modulos/${modSlug}?tab=${opts.tab ?? "hallazgos"}`;
  return "/modulos";
}
