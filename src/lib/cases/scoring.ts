import type { CaseFlowStep } from "@/lib/cases/types";

const GRADED_KINDS = new Set(["protocol", "window", "finding", "conduct"]);

/** Score 0–100 según decisiones óptimas en pasos graduados. */
export function scoreCaseChoices(
  steps: CaseFlowStep[],
  selections: Record<string, string>,
): number {
  const graded = steps.filter((s) => GRADED_KINDS.has(s.kind));
  if (graded.length === 0) return 100;

  let optimal = 0;
  for (const step of graded) {
    const choiceId = selections[step.id];
    const choice = step.choices.find((c) => c.id === choiceId);
    if (choice?.isOptimal) optimal += 1;
  }

  return Math.round((optimal / graded.length) * 100);
}
