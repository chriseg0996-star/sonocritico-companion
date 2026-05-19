import type { Protocol, ProtocolDecision, ProtocolStep } from "@/lib/protocols/types";

export function getProtocolStep(protocol: Protocol, stepId: string): ProtocolStep | undefined {
  return protocol.steps[stepId];
}

export function getStartStep(protocol: Protocol): ProtocolStep {
  const step = protocol.steps[protocol.startStepId];
  if (!step) throw new Error(`Protocol ${protocol.id}: missing start step ${protocol.startStepId}`);
  return step;
}

export function resolveDecision(
  protocol: Protocol,
  stepId: string,
  decisionId: string,
): { decision: ProtocolDecision; nextStep: ProtocolStep } | null {
  const step = getProtocolStep(protocol, stepId);
  const decision = step?.decisions?.find((d) => d.id === decisionId);
  if (!decision) return null;
  const nextStep = getProtocolStep(protocol, decision.nextStepId);
  if (!nextStep) return null;
  return { decision, nextStep };
}

export function listStepOrder(protocol: Protocol): string[] {
  const ordered: string[] = [];
  const seen = new Set<string>();
  let currentId: string | null = protocol.startStepId;

  while (currentId && !seen.has(currentId)) {
    seen.add(currentId);
    ordered.push(currentId);
    const step: ProtocolStep | undefined = protocol.steps[currentId];
    if (!step || step.kind === "result" || !step.decisions?.length) break;
    currentId = step.decisions[0]?.nextStepId ?? null;
  }

  return ordered;
}

export function stepIndexInTrail(trail: string[], stepId: string): number {
  const i = trail.indexOf(stepId);
  return i >= 0 ? i : trail.length;
}
