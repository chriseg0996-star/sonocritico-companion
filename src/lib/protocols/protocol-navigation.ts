/** URLs y query params para navegación protocolo ↔ atlas. */

export type ProtocolReturnContext = {
  protocolSlug: string;
  stepId: string;
  mediaId: string;
};

export function parseMediaIdFromHref(href: string): string | null {
  if (!href.includes("media=")) return null;
  try {
    const path = href.startsWith("/") ? href : `/${href}`;
    const params = new URLSearchParams(path.split("?")[1] ?? "");
    return params.get("media");
  } catch {
    return null;
  }
}

export function buildAtlasMediaUrl(
  mediaId: string,
  from?: { protocolSlug: string; stepId: string },
): string {
  const params = new URLSearchParams({ media: mediaId });
  if (from) {
    params.set("fromProtocol", from.protocolSlug);
    params.set("fromStep", from.stepId);
  }
  return `/biblioteca?${params.toString()}`;
}

export function buildProtocolStepUrl(
  protocolSlug: string,
  stepId: string,
  options?: { mediaId?: string },
): string {
  const params = new URLSearchParams({ step: stepId });
  if (options?.mediaId) params.set("media", options.mediaId);
  return `/protocolos/${protocolSlug}?${params.toString()}`;
}
