export type {
  WorkflowStep,
  WorkflowResult,
  WorkflowState,
  WorkflowPhase,
  WorkflowProtocol,
  WorkflowOption,
} from "@/features/companion-workflow/types";
export { WorkflowSheet } from "@/features/companion-workflow/WorkflowSheet";
export { useWorkflow } from "@/features/companion-workflow/useWorkflow";
export { WorkflowController } from "@/features/companion-workflow/WorkflowController";
export {
  COMPANION_OPEN_WORKFLOW_EVENT,
  dispatchCompanionOpenWorkflow,
  isCompanionProtocolId,
  type CompanionProtocolId,
  type CompanionOpenWorkflowDetail,
} from "@/features/companion-workflow/events";
/** @deprecated Usar WorkflowController + evento companion:open-workflow */
export { DashboardCompanionWorkflow } from "@/features/companion-workflow/DashboardCompanionWorkflow";
export { getWorkflowProtocol, BLUE_WORKFLOW } from "@/features/companion-workflow/data";
export { DifferentialPanel } from "@/features/companion-workflow/DifferentialPanel";
export {
  getDifferentials,
  getDifferentialRedFlags,
  buildAtlasSearchHref,
  type DiagnosticAlternative,
} from "@/features/companion-workflow/data/differentials";
