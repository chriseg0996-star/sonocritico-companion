"use client";

import { getEngineCase } from "@/lib/cases";
import { CasePlayer } from "@/components/cases/CasePlayer";

type Props = {
  caseId: string;
};

export function EngineCaseScreen({ caseId }: Props) {
  const caseDef = getEngineCase(caseId);
  if (!caseDef) {
    return <p style={{ padding: 24, color: "#7e8897" }}>Caso no encontrado.</p>;
  }
  return <CasePlayer caseDef={caseDef} />;
}
