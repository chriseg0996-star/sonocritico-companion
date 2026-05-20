"use client";

import { useCallback, useMemo, useState } from "react";
import {
  DOMAIN_VERTEX_ANGLES,
  growthFactor,
  type DomainStats,
  type KnowledgeDomainId,
} from "@/lib/progreso";
import { DOMAIN_ICONS } from "@/components/progress/domain-icons";
import styles from "@/components/progress/knowledge-constellation.module.css";

type Props = {
  globalPercent: number;
  domains: DomainStats[];
  activeId: KnowledgeDomainId | null;
  onDomainSelect: (id: KnowledgeDomainId) => void;
};

const SIZE = 400;
const CX = SIZE / 2;
const CY = SIZE / 2;
const CENTER_R = SIZE * 0.09;
const NODE_R = SIZE * 0.36;
const MAX_MEMBRANE = SIZE * 0.34;
const MIN_MEMBRANE = CENTER_R + 4;
const GUIDE_LEVELS = [0.25, 0.5, 0.75, 1];

function polar(radius: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

function nodePosition(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    left: `${50 + (NODE_R / (SIZE / 2)) * 50 * Math.cos(rad)}%`,
    top: `${50 + (NODE_R / (SIZE / 2)) * 50 * Math.sin(rad)}%`,
  };
}

function smoothClosedPath(points: { x: number; y: number }[]): string {
  const n = points.length;
  if (n < 3) return "";
  let d = `M ${points[0]!.x.toFixed(1)} ${points[0]!.y.toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n]!;
    const p1 = points[i]!;
    const p2 = points[(i + 1) % n]!;
    const p3 = points[(i + 2) % n]!;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return `${d} Z`;
}

export function KnowledgeConstellation({
  globalPercent,
  domains,
  activeId,
  onDomainSelect,
}: Props) {
  const [hoveredId, setHoveredId] = useState<KnowledgeDomainId | null>(null);
  const highlightId = hoveredId ?? activeId;

  const nodes = useMemo(() => {
    return domains.map((d) => {
      const angle = DOMAIN_VERTEX_ANGLES[d.id];
      const membraneR = MIN_MEMBRANE + (MAX_MEMBRANE - MIN_MEMBRANE) * growthFactor(d.percent);
      const nodePt = polar(NODE_R, angle);
      const membranePt = polar(membraneR, angle);
      const linkStart = polar(CENTER_R, angle);
      return { domain: d, angle, nodePt, membranePt, linkStart };
    });
  }, [domains]);

  const membranePath = useMemo(
    () => smoothClosedPath(nodes.map((n) => n.membranePt)),
    [nodes],
  );

  const setHover = useCallback((id: KnowledgeDomainId | null) => {
    setHoveredId(id);
  }, []);

  return (
    <div className={styles.constellationStage}>
      <svg
        className={styles.constellationSvg}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label={`Conocimiento global ${globalPercent} por ciento`}
      >
        <g className={styles.constellationBody}>
          {GUIDE_LEVELS.map((level) => (
            <circle
              key={level}
              className={styles.guideRing}
              cx={CX}
              cy={CY}
              r={MAX_MEMBRANE * level * 1.15}
            />
          ))}

          {nodes.map((n) => {
            const isActive = highlightId === n.domain.id;
            return (
              <line
                key={`link-${n.domain.id}`}
                className={`${styles.link} ${isActive ? styles.linkActive : ""}`}
                x1={n.linkStart.x}
                y1={n.linkStart.y}
                x2={n.nodePt.x}
                y2={n.nodePt.y}
                stroke={n.domain.color}
              />
            );
          })}

          <path
            className={`${styles.membrane} ${highlightId ? styles.membraneActive : ""}`}
            d={membranePath}
          />

          <circle className={styles.centerDisc} cx={CX} cy={CY} r={CENTER_R} />
        </g>
      </svg>

      <div className={styles.centerOverlay}>
        <span className={styles.centerPercent}>{globalPercent}%</span>
        <span className={styles.centerCaption}>Conocimiento global</span>
      </div>

      <div className={styles.nodeLayer}>
        {nodes.map((n) => {
          const Icon = DOMAIN_ICONS[n.domain.id];
          const isActive = highlightId === n.domain.id;
          return (
            <button
              key={n.domain.id}
              type="button"
              className={`${styles.nodeChip} ${isActive ? styles.nodeChipActive : ""}`}
              style={nodePosition(n.angle)}
              onMouseEnter={() => setHover(n.domain.id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onDomainSelect(n.domain.id)}
              aria-label={`${n.domain.label} ${n.domain.percent} por ciento`}
            >
              <span className={styles.nodeIcon} style={{ color: n.domain.color }}>
                <Icon size={14} strokeWidth={1.5} aria-hidden />
              </span>
              <span className={styles.nodeLabel}>{n.domain.shortLabel}</span>
              <span className={styles.nodePct} style={{ color: n.domain.color }}>
                {n.domain.percent}%
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
