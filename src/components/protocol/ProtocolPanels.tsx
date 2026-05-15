"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckSquare, ChevronRight, X } from "lucide-react";
import { EchoMedia } from "@/components/media/EchoMedia";
import { getStudyHref } from "@/lib/study-links";
import { ScanLineCard, Badge, Btn } from "@/components/ui/base";
import { getImage, quizQuestions } from "@/lib/mock-data";
import { getProgress, toggleChecklistItem, completeProtocol, completeModule, saveQuizResult } from "@/lib/auth";
import type { FlowNode, Protocol } from "@/types";
import type { LocalProgress } from "@/lib/auth";
import { nodeColors, nodeBadgeVariant } from "@/components/protocol/protocol-theme";
import { theme } from "@/lib/theme";

export function ProtocolFlowDesktop({ nodes, onNodeClick }: { nodes: FlowNode[]; onNodeClick: (n: FlowNode) => void }) {
  const maxX = Math.max(...nodes.map((n) => (n.x ?? 0) + 180));
  const maxY = Math.max(...nodes.map((n) => (n.y ?? 0) + 60));
  const vw = Math.max(600, maxX + 40);
  const vh = maxY + 80;

  return (
    <div style={{ overflowX: "auto", width: "100%" }}>
      <svg width={vw} height={vh} viewBox={`0 0 ${vw} ${vh}`} style={{ display: "block" }}>
        <defs>
          <marker id="flow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke={theme.bg.border} strokeWidth="1.5" />
          </marker>
        </defs>
        {nodes.map((node) =>
          node.children.map((childId) => {
            const child = nodes.find((n) => n.id === childId);
            if (!child) return null;
            const x1 = (node.x ?? 0) + 90;
            const y1 = (node.y ?? 0) + 44;
            const x2 = (child.x ?? 0) + 90;
            const y2 = child.y ?? 0;
            const mid = (y1 + y2) / 2;
            return (
              <path
                key={`${node.id}-${childId}`}
                d={`M${x1},${y1} C${x1},${mid} ${x2},${mid} ${x2},${y2}`}
                fill="none"
                stroke={theme.bg.border}
                strokeWidth="1.5"
                markerEnd="url(#flow-arrow)"
              />
            );
          })
        )}
        {nodes.map((node) => {
          const c = nodeColors[node.type];
          const nx = node.x ?? 0;
          const ny = node.y ?? 0;
          return (
            <g key={node.id} style={{ cursor: "pointer" }} onClick={() => onNodeClick(node)}>
              <rect x={nx} y={ny} width={180} height={44} rx={8} fill={c.bg} stroke={c.border} strokeWidth={1} />
              <text
                x={nx + 90}
                y={ny + 22}
                textAnchor="middle"
                dominantBaseline="central"
                fill={c.text}
                fontSize={11}
                fontFamily="'IBM Plex Sans', sans-serif"
                fontWeight={500}
              >
                {node.label.length > 22 ? `${node.label.slice(0, 22)}…` : node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function ProtocolFlowMobile({ nodes, onNodeClick }: { nodes: FlowNode[]; onNodeClick: (n: FlowNode) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {nodes.map((node, i) => {
        const c = nodeColors[node.type];
        return (
          <div key={node.id}>
            <div
              onClick={() => onNodeClick(node)}
              style={{
                background: c.bg,
                border: `1px solid ${c.border}`,
                borderRadius: 8,
                padding: "10px 14px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ fontSize: 10, color: c.text, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 2 }}>
                  {node.type.toUpperCase()}
                </div>
                <div style={{ fontSize: 13, color: theme.text.primary, fontWeight: 500 }}>{node.label}</div>
              </div>
              <ChevronRight size={14} strokeWidth={1.5} color={c.text} />
            </div>
            {i < nodes.length - 1 && (
              <div style={{ width: 2, height: 16, background: theme.bg.border, margin: "0 auto" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function ProtocolNodeDrawer({ node, onClose }: { node: FlowNode; onClose: () => void }) {
  const image = node.imageId ? getImage(node.imageId) : null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)" }} />
      <div
        className="scan-line"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 600,
          background: theme.bg.card,
          borderRadius: "16px 16px 0 0",
          border: `1px solid ${theme.bg.border}`,
          padding: 20,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <Badge variant={nodeBadgeVariant(node.type)}>{node.type}</Badge>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 22,
                color: theme.text.primary,
                marginTop: 6,
              }}
            >
              {node.label}
            </div>
          </div>
          <div onClick={onClose} style={{ cursor: "pointer", padding: 4 }}>
            <X size={18} color={theme.text.muted} />
          </div>
        </div>
        {image && (
          <div
            style={{
              background: theme.bg.primary,
              borderRadius: 8,
              border: `1px solid ${theme.bg.border}`,
              padding: 12,
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 10, color: theme.text.muted, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 6 }}>
              {image.window} · {image.finding}
            </div>
            <div
              style={{
                background: theme.bg.elevated,
                borderRadius: 6,
                height: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 11, color: theme.text.muted }}>{image.finding}</span>
            </div>
          </div>
        )}
        {node.description && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: theme.text.muted, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 4 }}>
              HALLAZGO
            </div>
            <div style={{ fontSize: 13, color: theme.text.secondary, lineHeight: 1.6 }}>{node.description}</div>
          </div>
        )}
        {node.clinicalAction && (
          <div
            style={{
              background: theme.accent.muted,
              border: `1px solid ${theme.accent.border}`,
              borderRadius: 8,
              padding: 12,
            }}
          >
            <div style={{ fontSize: 10, color: theme.accent.soft, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 4 }}>
              ACCIÓN CLÍNICA
            </div>
            <div style={{ fontSize: 13, color: theme.text.primary, lineHeight: 1.6 }}>{node.clinicalAction}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ProtocolFlowPanel({
  proto,
  activeNode,
  onNodeClick,
  onCloseNode,
}: {
  proto: Protocol;
  activeNode: FlowNode | null;
  onNodeClick: (n: FlowNode) => void;
  onCloseNode: () => void;
}) {
  return (
    <>
      <ScanLineCard style={{ padding: 16, overflowX: "auto" }}>
        <div className="hidden md:block">
          <ProtocolFlowDesktop nodes={proto.flowNodes} onNodeClick={onNodeClick} />
        </div>
        <div className="block md:hidden">
          <ProtocolFlowMobile nodes={proto.flowNodes} onNodeClick={onNodeClick} />
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
          {Object.entries(nodeColors).map(([type, c]) => (
            <div key={type} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: c.text }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: c.bg, border: `1px solid ${c.border}` }} />
              {type}
            </div>
          ))}
        </div>
      </ScanLineCard>
      {activeNode && <ProtocolNodeDrawer node={activeNode} onClose={onCloseNode} />}
    </>
  );
}

export function ProtocolChecklistPanel({
  proto,
  progress,
  onProgressChange,
}: {
  proto: Protocol;
  progress: LocalProgress;
  onProgressChange: (p: LocalProgress) => void;
}) {
  const checkStatus = progress.checklistStatus[proto.slug] || {};
  const doneCount = proto.checklistItems.filter((i) => checkStatus[i.id]).length;
  const pct = Math.round((doneCount / proto.checklistItems.length) * 100);

  function handleToggle(itemId: string, val: boolean) {
    toggleChecklistItem(proto.slug, itemId, val);
    const updated = getProgress();
    if (proto.checklistItems.every((i) => (updated.checklistStatus[proto.slug] || {})[i.id])) {
      completeProtocol(proto.slug);
      if (proto.slug.startsWith("mod-")) {
        completeModule(proto.slug.slice(4));
      }
    }
    onProgressChange(getProgress());
  }

  return (
    <ScanLineCard style={{ padding: 16 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {proto.checklistItems.map((item) => {
          const done = checkStatus[item.id] || false;
          return (
            <div
              key={item.id}
              onClick={() => handleToggle(item.id, !done)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 8,
                border: `1px solid ${done ? theme.accent.border : theme.bg.border}`,
                background: done ? theme.accent.muted : "transparent",
                cursor: "pointer",
              }}
            >
              <CheckSquare size={16} color={done ? theme.brand.primary : theme.text.muted} style={{ flexShrink: 0, marginTop: 1 }} />
              <div>
                <div
                  style={{
                    fontSize: 13,
                    color: done ? theme.text.primary : theme.text.secondary,
                    textDecoration: done ? "line-through" : "none",
                    lineHeight: 1.4,
                  }}
                >
                  {item.label}
                </div>
                {item.required && (
                  <span style={{ fontSize: 9, color: theme.text.muted, fontFamily: "'IBM Plex Mono', monospace" }}>
                    requerido
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {pct === 100 && (
        <div
          style={{
            marginTop: 14,
            background: theme.accent.muted,
            border: `1px solid ${theme.accent.border}`,
            borderRadius: 8,
            padding: 12,
            textAlign: "center",
            fontSize: 13,
            color: theme.brand.primary,
          }}
        >
          Checklist completo
        </div>
      )}
    </ScanLineCard>
  );
}

export function ProtocolQuizPanel({ protocolSlug }: { protocolSlug: string }) {
  const router = useRouter();
  const pQuestions = quizQuestions.filter((q) => q.protocolRef === protocolSlug);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (answered || !pQuestions.length || finished) return;
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(t);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [current, answered, finished, pQuestions.length]);

  if (!pQuestions.length) {
    return (
      <ScanLineCard style={{ padding: 16 }}>
        <p style={{ fontSize: 13, color: theme.text.secondary }}>No hay preguntas para este módulo.</p>
      </ScanLineCard>
    );
  }

  if (finished) {
    return (
      <ScanLineCard style={{ padding: 20, textAlign: "center" }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: theme.brand.primary }}>Quiz completado</div>
        <div style={{ fontSize: 12, color: theme.text.muted, marginTop: 8 }}>Revisa tu progreso en la sección Progreso.</div>
      </ScanLineCard>
    );
  }

  const q = pQuestions[current];

  function submitAnswer(idx: number) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const correct = idx === q.correctIndex;
    saveQuizResult({
      quizId: q.id,
      protocolRef: protocolSlug,
      score: correct ? 100 : 0,
      answers: [idx],
      completedAt: new Date().toISOString(),
      timeSpentSeconds: 60 - timeLeft,
    });
  }

  function next() {
    if (current + 1 >= pQuestions.length) setFinished(true);
    else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
      setTimeLeft(60);
    }
  }

  const timerColor =
    timeLeft > 30 ? theme.text.primary : timeLeft > 15 ? theme.text.secondary : theme.brand.red;

  return (
    <ScanLineCard style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontSize: 10, color: theme.brand.red, fontFamily: "'IBM Plex Mono', monospace" }}>
          QUIZ · {current + 1}/{pQuestions.length}
        </span>
        <span style={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", color: timerColor }}>{timeLeft}s</span>
      </div>
      <p style={{ fontSize: 13, color: theme.text.primary, lineHeight: 1.6, marginBottom: 14 }}>{q.question}</p>
      {q.imageId && (() => {
        const qImg = getImage(q.imageId);
        return qImg ? (
          <div style={{ marginBottom: 12, borderRadius: 8, overflow: "hidden", border: `1px solid ${theme.bg.border}` }}>
            <EchoMedia image={qImg} maxHeight={140} />
          </div>
        ) : null;
      })()}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {q.options.map((opt, i) => {
          let border: string = theme.bg.border;
          let color: string = theme.text.secondary;
          let bg: string = "transparent";
          if (answered) {
            if (i === q.correctIndex) {
              border = theme.brand.red;
              color = theme.brand.red;
              bg = theme.brand.redMuted;
            } else if (i === selected) {
              border = theme.text.muted;
              color = theme.text.muted;
            }
          }
          return (
            <div
              key={i}
              onClick={() => !answered && submitAnswer(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 12px",
                borderRadius: 8,
                border: `1px solid ${border}`,
                background: bg,
                cursor: answered ? "default" : "pointer",
                color,
                fontSize: 12,
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  background: theme.bg.elevated,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
              >
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </div>
          );
        })}
      </div>
      {answered && (
        <div>
          <div
            style={{
              marginTop: 12,
              padding: 12,
              borderRadius: 8,
              border: `1px solid ${theme.bg.border}`,
              fontSize: 12,
              color: theme.text.secondary,
              lineHeight: 1.6,
            }}
          >
            {q.explanation}
          </div>
          {selected !== null && selected !== q.correctIndex && (
            <Btn
              variant="ghost"
              fullWidth
              style={{ marginTop: 8, fontSize: 11 }}
              onClick={() => router.push(getStudyHref({ protocolRef: protocolSlug, imageId: q.imageId }))}
            >
              Repasar en el módulo →
            </Btn>
          )}
          <Btn variant="primary" onClick={next} fullWidth style={{ marginTop: 10 }}>
            {current + 1 >= pQuestions.length ? "Finalizar quiz" : "Siguiente →"}
          </Btn>
        </div>
      )}
    </ScanLineCard>
  );
}
