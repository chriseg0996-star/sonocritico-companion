import type { CaseResourceLink } from "@/lib/cases/types";
import { buildProtocolStepUrl } from "@/lib/protocols/protocol-navigation";
import { buildViewerPath } from "@/lib/viewer/viewer-session";

export function atlasHref(link: CaseResourceLink): string | null {
  if (!link.atlasModule) return null;
  const params = new URLSearchParams({ module: link.atlasModule });
  return `/biblioteca?${params.toString()}`;
}

export function viewerHref(link: CaseResourceLink): string | null {
  if (!link.mediaId) return null;
  return buildViewerPath(link.mediaId, {
    module: link.atlasModule,
    fromProtocol: link.protocolSlug,
    fromStep: link.protocolStepId,
  });
}

export function protocolHref(link: CaseResourceLink): string | null {
  if (!link.protocolSlug || !link.protocolStepId) return null;
  return buildProtocolStepUrl(link.protocolSlug, link.protocolStepId, {
    mediaId: link.mediaId,
  });
}
