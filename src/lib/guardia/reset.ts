import { clearDifferentialHistory } from "@/lib/engine/storage";
import { clearWorkflowLastFlow } from "@/lib/workflow/storage";

export const GUARDIA_RESET_EVENT = "sonocritico-guardia-reset";

/** Reinicia flujos guardia (workflow + diferencial) y notifica paneles. */
export function restartGuardiaFlow(): void {
  clearWorkflowLastFlow();
  clearDifferentialHistory();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(GUARDIA_RESET_EVENT));
  }
}
