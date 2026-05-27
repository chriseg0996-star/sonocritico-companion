"use client";

import { useCallback, useEffect, useState } from "react";
import { CompanionPanelProvider, usePanelState } from "@/features/companion-panel";
import {
  COMPANION_OPEN_WORKFLOW_EVENT,
  type CompanionOpenWorkflowDetail,
  type CompanionProtocolId,
  isCompanionProtocolId,
} from "@/features/companion-workflow/events";
import { WorkflowSheet } from "@/features/companion-workflow/WorkflowSheet";

/**
 * Orquesta WorkflowSheet (F5.2/3) + CompanionPanel (F5.4) en dashboard.
 * Escucha `companion:open-workflow` desde Modo Guardia sin prop drilling.
 */
export function WorkflowController() {
  const panel = usePanelState();
  const [workflowOpen, setWorkflowOpen] = useState(false);
  const [activeProtocol, setActiveProtocol] = useState<CompanionProtocolId>("blue");
  useEffect(() => {
    const onOpenWorkflow = (event: Event) => {
      const detail = (event as CustomEvent<CompanionOpenWorkflowDetail>).detail;
      if (!isCompanionProtocolId(detail?.protocolId)) return;
      setActiveProtocol(detail.protocolId);
      setWorkflowOpen(true);
    };

    document.addEventListener(COMPANION_OPEN_WORKFLOW_EVENT, onOpenWorkflow);
    return () => document.removeEventListener(COMPANION_OPEN_WORKFLOW_EVENT, onOpenWorkflow);
  }, []);

  const closeWorkflow = useCallback(() => {
    setWorkflowOpen(false);
    panel.closePanel();
  }, [panel]);

  return (
    <CompanionPanelProvider panelState={panel}>
      {workflowOpen ? (
        <WorkflowSheet
          protocolId={activeProtocol}
          open={workflowOpen}
          onClose={closeWorkflow}
        />
      ) : null}
    </CompanionPanelProvider>
  );
}
