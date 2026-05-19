import { getMediaProtocolLink } from "@/lib/protocols/media-links";
import { buildProtocolStepUrl } from "@/lib/protocols/protocol-navigation";
import type { FrequentErrorTraining } from "@/lib/training/types";

/** URL de protocolo para un error del trainer (prioriza datos del error). */
export function protocolUrlForError(error: FrequentErrorTraining): string | null {
  if (error.protocolSlug && error.protocolStepId) {
    return buildProtocolStepUrl(error.protocolSlug, error.protocolStepId, {
      mediaId: error.exampleMediaId,
    });
  }
  const mediaId = error.exampleMediaId ?? error.mediaIds[0];
  if (!mediaId) return null;
  const link = getMediaProtocolLink(mediaId);
  if (!link) return null;
  return buildProtocolStepUrl(link.protocolSlug, link.stepId, { mediaId });
}
