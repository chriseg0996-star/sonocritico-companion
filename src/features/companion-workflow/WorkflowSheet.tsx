"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, X } from "lucide-react";
import { Btn, ProgressBar } from "@/components/ui";
import { DifferentialPanel } from "@/features/companion-workflow/DifferentialPanel";
import { useWorkflow } from "@/features/companion-workflow/useWorkflow";
import styles from "@/features/companion-workflow/workflow-sheet.module.css";

type Props = {
  protocolId: string;
  open: boolean;
  onClose: () => void;
};

const PROTOCOL_LABELS: Record<string, string> = {
  blue: "Protocolo BLUE",
  fast: "FAST / eFAST",
  vexus: "VExUS",
  rush: "RUSH",
};

export function WorkflowSheet({ protocolId, open, onClose }: Props) {
  const router = useRouter();
  const {
    protocol,
    phase,
    currentStep,
    resultKey,
    resultado,
    progressPct,
    start,
    answer,
    goBack,
    reset,
  } = useWorkflow(protocolId);

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!protocol) {
    const title = PROTOCOL_LABELS[protocolId] ?? "Protocolo";
    return (
      <div
        className={`${styles.overlay} ${styles.overlayOpen}`}
        role="presentation"
      >
        <button type="button" className={styles.scrim} aria-label="Cerrar" onClick={handleClose} />
        <div
          className={`${styles.sheet} ${styles.sheetOpen}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="workflow-sheet-title"
        >
          <header className={styles.header}>
            <div>
              <p className={styles.eyebrow}>Flujo clínico</p>
              <h2 className={styles.title} id="workflow-sheet-title">
                {title}
              </h2>
            </div>
            <button type="button" className={styles.closeBtn} onClick={handleClose} aria-label="Cerrar">
              <X size={20} aria-hidden />
            </button>
          </header>
          <div className={styles.body}>
            <p className={styles.introText}>
              El árbol interactivo para este protocolo estará disponible pronto. Puedes abrir la
              guía completa sin salir del modo guardia.
            </p>
            <Btn
              variant="primary"
              fullWidth
              onClick={() => {
                handleClose();
                router.push(`/protocolos/${protocolId}`);
              }}
            >
              Abrir protocolo completo
            </Btn>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.overlay}${open ? ` ${styles.overlayOpen}` : ""}`}
      role="presentation"
      aria-hidden={!open}
    >
      <button type="button" className={styles.scrim} aria-label="Cerrar" onClick={handleClose} />
      <div
        className={`${styles.sheet}${open ? ` ${styles.sheetOpen}` : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="workflow-sheet-title"
      >
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Flujo clínico</p>
            <h2 className={styles.title} id="workflow-sheet-title">
              {protocol.title}
            </h2>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Cerrar"
          >
            <X size={20} aria-hidden />
          </button>
        </header>

        <div className={styles.body}>
          <div className={styles.progressWrap}>
            <ProgressBar value={progressPct} />
          </div>
          {phase === "intro" ? (
            <>
              <p className={styles.introText}>{protocol.intro}</p>
              <Btn variant="primary" fullWidth onClick={start}>
                Iniciar protocolo
              </Btn>
            </>
          ) : null}

          {phase === "steps" && currentStep ? (
            <>
              <p className={styles.question}>{currentStep.pregunta}</p>
              <div className={styles.options} role="group" aria-label={currentStep.pregunta}>
                {currentStep.opciones.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={styles.optionBtn}
                    onClick={() => answer(opt.value, opt.next)}
                  >
                    <span>{opt.label}</span>
                    <ChevronRight size={16} aria-hidden />
                  </button>
                ))}
              </div>
            </>
          ) : null}

          {phase === "result" && resultado ? (
            <DifferentialPanel
              resultado={resultado}
              resultKey={resultKey}
              onNavigate={handleClose}
            />
          ) : null}
        </div>

        {phase !== "intro" ? (
          <footer className={styles.footer}>
            <Btn variant="ghost" onClick={goBack}>
              Atrás
            </Btn>
            {phase === "result" ? (
              <Btn variant="secondary" onClick={handleClose}>
                Listo
              </Btn>
            ) : null}
          </footer>
        ) : null}
      </div>
    </div>
  );
}
