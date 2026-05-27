"use client";

import { CompanionModePanel } from "@/components/companion/CompanionModePanel";
import { WorkflowController } from "@/features/companion-workflow/WorkflowController";

type Props = {
  initialScenarioId?: string | null;
  showFullPageLink?: boolean;
};

/** @deprecated Usar CompanionModePanel + WorkflowController en dashboard. */
export function DashboardCompanionWorkflow({
  initialScenarioId = null,
  showFullPageLink = false,
}: Props) {
  return (
    <>
      <CompanionModePanel
        initialScenarioId={initialScenarioId}
        showFullPageLink={showFullPageLink}
      />
      <WorkflowController />
    </>
  );
}
