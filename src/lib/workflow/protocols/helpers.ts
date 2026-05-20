import type { WorkflowOutput, WorkflowRoute } from "@/lib/workflow/types";

type OutputInput = {
  protocol: { label: string; href: string };
  atlas: { label: string; href: string };
  calculator: { label: string; href: string };
  case: { label: string; href: string };
};

export function buildRoute(
  id: string,
  summary: string,
  estimatedMinutes: number,
  links: OutputInput,
): WorkflowRoute {
  const outputs: WorkflowOutput[] = [
    { kind: "protocol", ...links.protocol },
    { kind: "atlas", ...links.atlas },
    { kind: "calculator", ...links.calculator },
    { kind: "case", ...links.case },
  ];
  return { id, summary, estimatedMinutes, outputs };
}
