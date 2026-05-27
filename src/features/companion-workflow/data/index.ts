import type { WorkflowProtocol } from "@/features/companion-workflow/types";
import { BLUE_WORKFLOW } from "@/features/companion-workflow/data/blue";

const PROTOCOLS: Record<string, WorkflowProtocol> = {
  blue: BLUE_WORKFLOW,
};

export function getWorkflowProtocol(protocolId: string): WorkflowProtocol | undefined {
  return PROTOCOLS[protocolId];
}

export { BLUE_WORKFLOW, BLUE_RESULT_LINKS } from "@/features/companion-workflow/data/blue";
export {
  getDifferentials,
  getDifferentialRedFlags,
  getDifferentialAtlasContext,
  buildAtlasSearchHref,
  type DiagnosticAlternative,
  type DifferentialBundle,
} from "@/features/companion-workflow/data/differentials";
