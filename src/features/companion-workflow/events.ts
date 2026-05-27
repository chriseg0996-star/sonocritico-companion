export type CompanionProtocolId = "blue" | "fast" | "vexus" | "rush";

export const COMPANION_OPEN_WORKFLOW_EVENT = "companion:open-workflow";

export type CompanionOpenWorkflowDetail = {
  protocolId: CompanionProtocolId;
};

const PROTOCOL_IDS: CompanionProtocolId[] = ["blue", "fast", "vexus", "rush"];

export function isCompanionProtocolId(value: unknown): value is CompanionProtocolId {
  return typeof value === "string" && PROTOCOL_IDS.includes(value as CompanionProtocolId);
}

export function dispatchCompanionOpenWorkflow(protocolId: CompanionProtocolId): void {
  document.dispatchEvent(
    new CustomEvent<CompanionOpenWorkflowDetail>(COMPANION_OPEN_WORKFLOW_EVENT, {
      detail: { protocolId },
    }),
  );
}
