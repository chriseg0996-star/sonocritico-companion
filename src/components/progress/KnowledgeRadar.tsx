"use client";

import { useMemo } from "react";
import { DOMAIN_VERTEX_ANGLES, type DomainStats, type KnowledgeDomainId } from "@/lib/progreso";
import { DOMAIN_ICONS } from "@/components/progress/domain-icons";
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
const MAX_R = SIZE * 0.34;
const GRID_LEVELS = [0.25, 0.5, 0.75, 1];

const DOMAIN_ORDER: KnowledgeDomainId[] = [
  "pulmon",
  "fast",
  "eco",
  "vexus",
  "neuro",
  "procedimientos",
];

function polar(radius: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

function hexPath(radius: number) {
  return DOMAIN_ORDER.map((id, i) => {
    const { x, y } = polar(radius, DOMAIN_VERTEX_ANGLES[id]);
    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
  })
    .join(" ")
    .concat(" Z");
}

export function KnowledgeRadar({
  globalPercent,
  domains,
  activeId,
  onDomainSelect,
}: Props) {
  const dataPoints = useMemo(() => {
    return domains.map((d) => {
      const angle = DOMAIN_VERTEX_ANGLES[d.id];
      const r = (d.percent / 100) * MAX_R;
      return { domain: d, angle, ...polar(r, angle) };
    });
  }, [domains]);

  const polygonPath = useMemo(() => {
    if (dataPoints.length === 0) return "";
    return dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
  }, [dataPoints]);

  return (
    <section className={styles.radarSection} aria-labelledby="radar-overview-title">
      <p className={styles.sectionEyebrow} id="radar-overview-title">
        Visión general
      </p>

      <div className={styles.radarStage}>
        <svg
          className={styles.radarSvg}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          role="img"
          aria-label={`Conocimiento global ${globalPercent} por ciento`}
        >
          <defs>
            <radialGradient id="radar-fill-gradient" cx="50%" cy="50%" r="55%">
              {dataPoints.map((p, i) => (
                <stop
                  key={p.domain.id}
                  offset={`${(i / Math.max(dataPoints.length - 1, 1)) * 100}%`}
                  stopColor={p.domain.color}
                  stopOpacity={0.45}
                />
              ))}
            </radialGradient>
            <linearGradient id="radar-stroke-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              {dataPoints.map((p, i) => (
                <stop
                  key={`s-${p.domain.id}`}
                  offset={`${(i / Math.max(dataPoints.length - 1, 1)) * 100}%`}
                  stopColor={p.domain.color}
                />
              ))}
            </linearGradient>
            <filter id="radar-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {GRID_LEVELS.map((level) => (
            <path
              key={level}
              d={hexPath(MAX_R * level)}
              className={styles.radarGrid}
              fill="none"
            />
          ))}

          {dataPoints.map((p) => {
            const outer = polar(MAX_R, p.angle);
            return (
              <line
                key={`axis-${p.domain.id}`}
                x1={CX}
                y1={CY}
                x2={outer.x}
                y2={outer.y}
                className={styles.radarAxis}
              />
            );
          })}

          <path
            d={polygonPath}
            className={styles.radarFill}
            fill="url(#radar-fill-gradient)"
            filter="url(#radar-glow)"
          />
          <path
            d={polygonPath}
            className={styles.radarStroke}
            fill="none"
            stroke="url(#radar-stroke-gradient)"
          />

          {dataPoints.map((p) => {
            const isActive = activeId === p.domain.id;
            return (
              <circle
                key={`pt-${p.domain.id}`}
                cx={p.x}
                cy={p.y}
                r={isActive ? 7 : 5}
                fill={p.domain.color}
                className={styles.radarVertex}
                style={{
                  filter: isActive ? `drop-shadow(0 0 8px ${p.domain.color})` : undefined,
                }}
                onClick={() => onDomainSelect(p.domain.id)}
              />
            );
          })}

          <circle cx={CX} cy={CY} r={36} className={styles.radarCenterRing} />
        </svg>

        <div className={styles.radarCenter}>
          <span className={styles.radarPercent}>{globalPercent}%</span>
          <span className={styles.radarCaption}>Conocimiento global</span>
        </div>

        <div className={styles.radarLabels}>
          {dataPoints.map((p) => {
            const Icon = DOMAIN_ICONS[p.domain.id];
            const labelPos = polar(MAX_R + 44, p.angle);
            const isActive = activeId === p.domain.id;
            return (
              <button
                key={p.domain.id}
                type="button"
                className={`${styles.radarChip} ${isActive ? styles.radarChipActive : ""}`}
                style={{
                  left: `${(labelPos.x / SIZE) * 100}%`,
                  top: `${(labelPos.y / SIZE) * 100}%`,
                }}
                onClick={() => onDomainSelect(p.domain.id)}
                aria-label={`${p.domain.label} ${p.domain.percent} por ciento`}
              >
                <span className={styles.radarChipIcon} style={{ color: p.domain.color }}>
                  <Icon size={14} strokeWidth={1.5} aria-hidden />
                </span>
                <span className={styles.radarChipLabel}>{p.domain.shortLabel}</span>
                <span className={styles.radarChipPct} style={{ color: p.domain.color }}>
                  {p.domain.percent}%
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
