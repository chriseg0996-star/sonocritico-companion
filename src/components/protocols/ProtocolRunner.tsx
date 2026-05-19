"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { Protocol, ProtocolTrailEntry } from "@/lib/protocols/types";
import { getStartStep, resolveDecision } from "@/lib/protocols/engine";
import { buildAtlasMediaUrl } from "@/lib/protocols/protocol-navigation";
import { useProtocolContext } from "@/components/protocols/ProtocolContext";
import { ProtocolPathTrail } from "@/components/protocols/ProtocolPathTrail";
import { ProtocolStepCard } from "@/components/protocols/ProtocolStepCard";
import { ProtocolStepper } from "@/components/protocols/ProtocolStepper";
import styles from "@/components/protocols/protocol.module.css";

type Props = {
  protocol: Protocol;
  /** Paso inicial (desde atlas o URL). */
  initialStepId?: string | null;
  /** Media de retorno al atlas. */
  returnMediaId?: string | null;
};

/** Navegación paso a paso de un protocolo interactivo. */
export function ProtocolRunner({ protocol, initialStepId, returnMediaId }: Props) {
  const { returnToProtocol, saveLastVisit, clearReturn } = useProtocolContext();
  const startId =
    initialStepId && protocol.steps[initialStepId] ? initialStepId : protocol.startStepId;

  const [currentStepId, setCurrentStepId] = useState(startId);
  const [trail, setTrail] = useState<ProtocolTrailEntry[]>([]);

  const currentStep = protocol.steps[currentStepId] ?? getStartStep(protocol);

  useEffect(() => {
    if (initialStepId && protocol.steps[initialStepId]) {
      setCurrentStepId(initialStepId);
      setTrail([]);
    }
  }, [initialStepId, protocol]);

  useEffect(() => {
    saveLastVisit(protocol.slug, currentStepId, returnMediaId ?? returnToProtocol?.mediaId);
  }, [protocol.slug, currentStepId, returnMediaId, returnToProtocol?.mediaId, saveLastVisit]);

  const handleChoose = useCallback(
    (decisionId: string) => {
      const resolved = resolveDecision(protocol, currentStepId, decisionId);
      if (!resolved) return;
      setTrail((prev) => [
        ...prev,
        {
          stepId: currentStepId,
          stepTitle: currentStep.title,
          decisionLabel: resolved.decision.label,
        },
      ]);
      setCurrentStepId(resolved.nextStep.id);
    },
    [protocol, currentStepId, currentStep.title],
  );

  const handleReset = useCallback(() => {
    setCurrentStepId(protocol.startStepId);
    setTrail([]);
  }, [protocol.startStepId]);

  const handleBack = useCallback(() => {
    if (trail.length === 0) return;
    const prev = [...trail];
    const last = prev.pop();
    if (!last) return;
    setTrail(prev);
    setCurrentStepId(last.stepId);
  }, [trail]);

  const atlasReturn =
    returnMediaId ??
    returnToProtocol?.mediaId ??
    (returnToProtocol?.protocolSlug === protocol.slug ? returnToProtocol.mediaId : null);

  const atlasHref =
    atlasReturn && currentStepId
      ? buildAtlasMediaUrl(atlasReturn, {
          protocolSlug: protocol.slug,
          stepId: currentStepId,
        })
      : null;

  return (
    <div className={styles.shell}>
      <ProtocolStepper protocol={protocol} trail={trail} currentStep={currentStep} />
      <ProtocolPathTrail entries={trail} currentTitle={currentStep.title} />
      {atlasHref && (
        <Link
          href={atlasHref}
          className={styles.textBtn}
          style={{ alignSelf: "flex-start", textDecoration: "none" }}
          onClick={() => clearReturn()}
        >
          ← Volver al atlas
        </Link>
      )}
      <ProtocolStepCard
        step={currentStep}
        protocolSlug={protocol.slug}
        protocolStepId={currentStepId}
        onChoose={currentStep.kind === "question" ? handleChoose : undefined}
      />
      <div className={styles.toolbar}>
        {trail.length > 0 && (
          <button type="button" className={styles.textBtn} onClick={handleBack}>
            ← Paso anterior
          </button>
        )}
        <button type="button" className={styles.textBtn} onClick={handleReset}>
          Reiniciar protocolo
        </button>
      </div>
    </div>
  );
}
