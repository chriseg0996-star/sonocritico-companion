"use client";

import { useCallback, useMemo, useState } from "react";
import {
  DOMAIN_VERTEX_ANGLES,
  growthFactor,
  type DomainStats,
  type KnowledgeDomainId,
} from "@/lib/progreso";
import { DOMAIN_ICONS } from "@/components/progress/domain-icons";
import styles from "@/components/progress/knowledge-bloom.module.css";

type Props = {
  globalPercent: number;
  domains: DomainStats[];
  activeId: KnowledgeDomainId | null;
  onDomainSelect: (id: KnowledgeDomainId) => void;
};

const SIZE = 480;
const CX = SIZE / 2;
const CY = SIZE / 2;
const MAX_R = SIZE * 0.41;
const MIN_R = SIZE * 0.05;
const SEED_R = SIZE * 0.04;
const ORBIT_PCT = 46;

function polar(radius: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

function orbitPosition(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    left: `${50 + ORBIT_PCT * Math.cos(rad)}%`,
    top: `${50 + ORBIT_PCT * Math.sin(rad)}%`,
  };
}

export function KnowledgeBloom({
  globalPercent,
  domains,
  activeId,
  onDomainSelect,
}: Props) {
  const [hoveredId, setHoveredId] = useState<KnowledgeDomainId | null>(null);
  const highlightId = hoveredId ?? activeId;
  const hoverDomain = domains.find((d) => d.id === hoveredId) ?? null;

  const perimeter = useMemo(() => {
    return domains.map((d) => {
      const angle = DOMAIN_VERTEX_ANGLES[d.id];
      const r = MIN_R + (MAX_R - MIN_R) * growthFactor(d.percent);
      return { domain: d, angle, r, ...polar(r, angle) };
    });
  }, [domains]);

  const hoverCardPos = useMemo(() => {
    if (!hoveredId) return null;
    const angle = DOMAIN_VERTEX_ANGLES[hoveredId];
    return orbitPosition(angle);
  }, [hoveredId]);

  const setHover = useCallback((id: KnowledgeDomainId | null) => {
    setHoveredId(id);
  }, []);

  return (
    <div className={styles.bloomStage}>
      <svg
        className={styles.bloomSvg}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label={`Conocimiento global ${globalPercent} por ciento`}
      >
        <defs>
          <filter id="knowledge-bloom-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className={styles.bloomLayers} filter="url(#knowledge-bloom-soft)">
          {perimeter.map((p) => {
            const push = MIN_R + (MAX_R - MIN_R) * growthFactor(p.domain.percent);
            const tip = polar(push * 0.9, p.angle);
            const isActive = highlightId === p.domain.id;
            const scale = isActive ? 1.14 : 1;
            return (
              <ellipse
                key={p.domain.id}
                className={`${styles.domainBlob} ${isActive ? styles.domainBlobActive : ""}`}
                cx={(CX + tip.x) / 2}
                cy={(CY + tip.y) / 2}
                rx={push * 0.58 * scale}
                ry={push * 0.42 * scale}
                fill={p.domain.color}
                opacity={isActive ? 0.28 : 0.11}
                transform={`rotate(${p.angle} ${CX} ${CY})`}
                onMouseEnter={() => setHover(p.domain.id)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(p.domain.id)}
                onBlur={() => setHover(null)}
                onClick={() => onDomainSelect(p.domain.id)}
                tabIndex={0}
              />
            );
          })}
        </g>

        <circle cx={CX} cy={CY} r={SEED_R * 2.2} fill="#8fa7c4" opacity={0.04} pointerEvents="none" />
        <circle cx={CX} cy={CY} r={SEED_R} fill="#1c222c" opacity={0.92} pointerEvents="none" />
      </svg>

      <div className={styles.bloomCenter}>
        <span className={styles.bloomPercent}>{globalPercent}%</span>
        <span className={styles.bloomCaption}>Conocimiento global</span>
      </div>

      <div className={styles.domainOrbit} aria-hidden={false}>
        {domains.map((d) => {
          const Icon = DOMAIN_ICONS[d.id];
          const pos = orbitPosition(DOMAIN_VERTEX_ANGLES[d.id]);
          const isActive = highlightId === d.id;
          return (
            <button
              key={d.id}
              type="button"
              className={`${styles.orbitChip} ${isActive ? styles.orbitChipActive : ""}`}
              style={pos}
              onMouseEnter={() => setHover(d.id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onDomainSelect(d.id)}
              aria-label={`${d.label} ${d.percent} por ciento`}
            >
              <span className={styles.orbitIcon} style={{ color: d.color }}>
                <Icon size={14} strokeWidth={1.5} aria-hidden />
              </span>
              <span className={styles.orbitLabel}>{d.shortLabel}</span>
              <span className={styles.orbitPct}>{d.percent}%</span>
            </button>
          );
        })}
      </div>

      {hoverDomain && hoverCardPos ? (
        <div
          className={styles.hoverCard}
          style={{ left: hoverCardPos.left, top: hoverCardPos.top }}
          role="tooltip"
        >
          <p className={styles.hoverCardTitle}>{hoverDomain.label}</p>
          <p className={styles.hoverCardRow}>Casos: {hoverDomain.cases}</p>
          <p className={styles.hoverCardRow}>Clips: {hoverDomain.clips}</p>
          <p className={styles.hoverCardRow}>Protocolos: {hoverDomain.protocols}</p>
        </div>
      ) : null}
    </div>
  );
}
