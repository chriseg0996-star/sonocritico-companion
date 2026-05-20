"use client";

import { useEffect, useState } from "react";
import { GuardiaDifferentialPanel } from "@/components/guardia/GuardiaDifferentialPanel";
import { GuardiaWorkflowPanel } from "@/components/guardia/GuardiaWorkflowPanel";
import { GUARDIA_RESET_EVENT } from "@/lib/guardia";
import tabStyles from "@/components/guardia/guardia-tabs.module.css";

type TabId = "flujo" | "diferencial";

type Props = {
  initialComplaintId?: string | null;
};

export function GuardiaPagePanels({ initialComplaintId = null }: Props) {
  const [tab, setTab] = useState<TabId>("flujo");
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const onReset = () => setResetKey((k) => k + 1);
    window.addEventListener(GUARDIA_RESET_EVENT, onReset);
    return () => window.removeEventListener(GUARDIA_RESET_EVENT, onReset);
  }, []);

  return (
    <>
      <div className={tabStyles.tabs} role="tablist" aria-label="Modo guardia">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "flujo"}
          className={`${tabStyles.tab}${tab === "flujo" ? ` ${tabStyles.tabActive}` : ""}`}
          onClick={() => setTab("flujo")}
        >
          Flujo clínico
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "diferencial"}
          className={`${tabStyles.tab}${tab === "diferencial" ? ` ${tabStyles.tabActive}` : ""}`}
          onClick={() => setTab("diferencial")}
        >
          Diferencial
        </button>
      </div>

      {tab === "flujo" ? (
        <GuardiaWorkflowPanel key={`wf-${resetKey}`} initialComplaintId={initialComplaintId} />
      ) : (
        <GuardiaDifferentialPanel key={`dx-${resetKey}`} />
      )}
    </>
  );
}
