import type { WorkflowAnswer, WorkflowComplaintId, WorkflowLastFlow } from "@/lib/workflow/types";

const LOCAL_KEY = "sonocritico-workflow-last";
const SESSION_KEY = "sonocritico-workflow-last-session";

function read(key: string): WorkflowLastFlow | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window[key === SESSION_KEY ? "sessionStorage" : "localStorage"].getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as WorkflowLastFlow;
  } catch {
    return null;
  }
}

function write(key: string, record: WorkflowLastFlow): void {
  if (typeof window === "undefined") return;
  try {
    window[key === SESSION_KEY ? "sessionStorage" : "localStorage"].setItem(key, JSON.stringify(record));
  } catch {
    /* quota */
  }
}

export function loadWorkflowLastFlow(): WorkflowLastFlow | null {
  const local = read(LOCAL_KEY);
  const session = read(SESSION_KEY);
  if (!local) return session;
  if (!session) return local;
  return new Date(session.at).getTime() >= new Date(local.at).getTime() ? session : local;
}

export function saveWorkflowLastFlow(
  complaintId: WorkflowComplaintId,
  answers: WorkflowAnswer,
  routeId?: string,
): void {
  const record: WorkflowLastFlow = {
    complaintId,
    answers,
    routeId,
    at: new Date().toISOString(),
  };
  write(LOCAL_KEY, record);
  write(SESSION_KEY, record);
}

export function clearWorkflowLastFlow(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(LOCAL_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}
