import type { WorkflowComplaint, WorkflowComplaintId } from "@/lib/workflow/types";
import { choqueWorkflow } from "@/lib/workflow/protocols/choque";
import { disneaWorkflow } from "@/lib/workflow/protocols/disnea";
import { hipoxemiaWorkflow } from "@/lib/workflow/protocols/hipoxemia";
import { oliguriaWorkflow } from "@/lib/workflow/protocols/oliguria";
import { traumaWorkflow } from "@/lib/workflow/protocols/trauma";

export const WORKFLOW_COMPLAINTS: WorkflowComplaint[] = [
  disneaWorkflow,
  choqueWorkflow,
  hipoxemiaWorkflow,
  traumaWorkflow,
  oliguriaWorkflow,
];

const BY_ID = new Map<WorkflowComplaintId, WorkflowComplaint>(
  WORKFLOW_COMPLAINTS.map((c) => [c.id, c]),
);

export function getWorkflowComplaint(id: WorkflowComplaintId): WorkflowComplaint | undefined {
  return BY_ID.get(id);
}

export {
  disneaWorkflow,
  choqueWorkflow,
  hipoxemiaWorkflow,
  traumaWorkflow,
  oliguriaWorkflow,
};
