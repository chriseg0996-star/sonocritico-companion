import type {
  WorkflowAnswer,
  WorkflowComplaint,
  WorkflowComplaintId,
  WorkflowQuestion,
  WorkflowRoute,
} from "@/lib/workflow/types";
import { WORKFLOW_COMPLAINTS, getWorkflowComplaint } from "@/lib/workflow/protocols";

export function listWorkflowComplaints(): WorkflowComplaint[] {
  return WORKFLOW_COMPLAINTS;
}

export function isWorkflowComplaintId(value: string): value is WorkflowComplaintId {
  return WORKFLOW_COMPLAINTS.some((c) => c.id === value);
}

export function buildRouteKey(answers: WorkflowAnswer, questionIds: string[]): string {
  return questionIds.map((id) => answers[id] ?? "_").join("|");
}

export function getNextQuestion(
  complaint: WorkflowComplaint,
  answers: WorkflowAnswer,
): WorkflowQuestion | null {
  return complaint.questions.find((q) => answers[q.id] === undefined) ?? null;
}

export function isWorkflowComplete(
  complaint: WorkflowComplaint,
  answers: WorkflowAnswer,
): boolean {
  return complaint.questions.every((q) => answers[q.id] !== undefined);
}

export function getStepsRemaining(
  complaint: WorkflowComplaint,
  answers: WorkflowAnswer,
): number {
  return complaint.questions.filter((q) => answers[q.id] === undefined).length;
}

export function resolveRoute(
  complaint: WorkflowComplaint,
  answers: WorkflowAnswer,
): WorkflowRoute | null {
  if (!isWorkflowComplete(complaint, answers)) return null;
  const key = buildRouteKey(
    answers,
    complaint.questions.map((q) => q.id),
  );
  return complaint.routes[key] ?? complaint.routes[complaint.defaultRouteId] ?? null;
}

export function getEstimatedMinutes(
  complaint: WorkflowComplaint,
  answers: WorkflowAnswer,
): number | null {
  const route = resolveRoute(complaint, answers);
  if (route) return route.estimatedMinutes;
  const remaining = getStepsRemaining(complaint, answers);
  if (remaining === 0) return null;
  const base = complaint.routes[complaint.defaultRouteId]?.estimatedMinutes ?? 5;
  return base + Math.max(0, remaining - 1);
}

export function getWorkflowComplaintById(id: WorkflowComplaintId): WorkflowComplaint | undefined {
  return getWorkflowComplaint(id);
}
