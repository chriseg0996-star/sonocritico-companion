import { blueBasicProtocol } from "@/lib/protocols/blue-basic";
import { fastEfastProtocol } from "@/lib/protocols/fast-efast";
import { rushProtocol } from "@/lib/protocols/rush-protocol";
import { vexusProtocol } from "@/lib/protocols/vexus-protocol";
import type { Protocol } from "@/lib/protocols/types";

const PROTOCOLS: Protocol[] = [
  blueBasicProtocol,
  fastEfastProtocol,
  vexusProtocol,
  rushProtocol,
];

const BY_SLUG = new Map(PROTOCOLS.map((p) => [p.slug, p]));

export function getInteractiveProtocols(): Protocol[] {
  return PROTOCOLS;
}

export function getInteractiveProtocol(slug: string): Protocol | undefined {
  return BY_SLUG.get(slug);
}

export function getInteractiveProtocolSlugs(): string[] {
  return PROTOCOLS.map((p) => p.slug);
}
