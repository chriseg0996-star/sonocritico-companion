import type { CaseResourceLink } from "@/lib/cases/types";
import { getInteractiveProtocol } from "@/lib/protocols/registry";
import { protocolHref } from "@/lib/cases/case-links";

export function caseProtocolLabel(link: CaseResourceLink): string | null {
  if (!link.protocolSlug) return null;
  const protocol = getInteractiveProtocol(link.protocolSlug);
  return protocol?.title ?? link.protocolSlug.toUpperCase();
}

export function caseProtocolUrl(link: CaseResourceLink): string | null {
  return protocolHref(link);
}
