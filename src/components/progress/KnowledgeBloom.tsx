"use client";

import { useMemo, useState } from "react";
import {
  DOMAIN_VERTEX_ANGLES,
  growthFactor,
  type DomainStats,
  type KnowledgeDomainId,
} from "@/lib/progreso";
import styles from "@/components/progress/knowledge-bloom.module.css";

type Props = {
  globalPercent: number;
  domains: DomainStats[];
  activeId: KnowledgeDomainId | null;
  onDomainSelect: (id: KnowledgeDomainId) => void;
};

const SIZE = 400;
const CX = SIZE / 2;
const CY = SIZE / 2;
const MAX_R = SIZE * 0.4;
const MIN_R = SIZE * 0.08;
const SEED_R = SIZE * 0.045;

function polar(radius: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
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

export function KnowledgeBloom({
  globalPercent,
  domains,
  activeId,
  onDomainSelect,
}: Props) {
  const [hoveredId, setHoveredId] = useState<KnowledgeDomainId | null>(null);
  const highlightId = hoveredId ?? activeId;

  const perimeter = useMemo(() => {
    return domains.map((d) => {
      const angle = DOMAIN_VERTEX_ANGLES[d.id];
      const r = MIN_R + (MAX_R - MIN_R) * growthFactor(d.percent);
      return { domain: d, angle, r, ...polar(r, angle) };
    });
  }, [domains]);

  const bodyPath = useMemo(() => smoothClosedPath(perimeter.map((p) => ({ x: p.x, y: p.y }))), [perimeter]);

  const handleHover = (id: KnowledgeDomainId | null) => {
    setHoveredId(id);
  };

  return (
    <div className={styles.bloomStage}>
      <svg
        className={styles.bloomSvg}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label={`Conocimiento global ${globalPercent} por ciento`}
      >
        <defs>
          <filter id="knowledge-bloom-blur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="knowledge-bloom-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a2030" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#11151b" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        <g className={styles.bloomLayers} filter="url(#knowledge-bloom-blur)">
          {perimeter.map((p) => {
            const push = MIN_R + (MAX_R - MIN_R) * growthFactor(p.domain.percent);
            const tip = polar(push * 0.92, p.angle);
            const isActive = highlightId === p.domain.id;
            return (
              <ellipse
                key={p.domain.id}
                className={`${styles.domainBlob} ${isActive ? styles.domainBlobActive : ""}`}
                cx={(CX + tip.x) / 2}
                cy={(CY + tip.y) / 2}
                rx={push * 0.55}
                ry={push * 0.38}
                fill={p.domain.color}
                opacity={isActive ? 0.32 : 0.14}
                transform={`rotate(${p.angle} ${CX} ${CY})`}
                onMouseEnter={() => handleHover(p.domain.id)}
                onMouseLeave={() => handleHover(null)}
                onClick={() => onDomainSelect(p.domain.id)}
              />
            );
          })}
          <path d={bodyPath} fill="url(#knowledge-bloom-core)" opacity={0.55} pointerEvents="none" />
        </g>

        <circle cx={CX} cy={CY} r={SEED_R} fill="#1e2430" opacity={0.95} pointerEvents="none" />
        <circle cx={CX} cy={CY} r={SEED_R * 1.8} fill="#8fa7c4" opacity={0.06} pointerEvents="none" />
      </svg>

      <div className={styles.bloomCenter}>
        <span className={styles.bloomPercent}>{globalPercent}%</span>
        <span className={styles.bloomCaption}>
          Conocimiento
          <br />
          global
        </span>
      </div>
    </div>
  );
}
