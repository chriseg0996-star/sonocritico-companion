"use client";

import { useCallback, useMemo, useState } from "react";
import {
  DOMAIN_VERTEX_ANGLES,
  growthFactor,
  type DomainStats,
  type KnowledgeDomainId,
} from "@/lib/progreso";
import styles from "@/components/progress/knowledge-hex.module.css";

type Props = {
  globalPercent: number;
  domains: DomainStats[];
  selectedId: KnowledgeDomainId;
  onSelect: (id: KnowledgeDomainId) => void;
};

function polar(cx: number, cy: number, radius: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

export function KnowledgeHex({ globalPercent, domains, selectedId, onSelect }: Props) {
  const [hoveredId, setHoveredId] = useState<KnowledgeDomainId | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const size = 240;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.42;
  const minR = size * 0.06;

  const vertices = useMemo(() => {
    return domains.map((d) => {
      const angle = DOMAIN_VERTEX_ANGLES[d.id];
      const r = minR + (maxR - minR) * growthFactor(d.percent);
      return { domain: d, ...polar(cx, cy, r, angle), angle, r };
    });
  }, [domains, cx, cy, maxR, minR]);

  const outlinePath = useMemo(() => {
    return vertices.map((v, i) => `${i === 0 ? "M" : "L"} ${v.x.toFixed(1)} ${v.y.toFixed(1)}`).join(" ") + " Z";
  }, [vertices]);

  const sectors = useMemo(() => {
    return vertices.map((v, i) => {
      const next = vertices[(i + 1) % vertices.length]!;
      return {
        domain: v.domain,
        d: `M ${cx} ${cy} L ${v.x.toFixed(1)} ${v.y.toFixed(1)} L ${next.x.toFixed(1)} ${next.y.toFixed(1)} Z`,
      };
    });
  }, [vertices, cx, cy]);

  const active = hoveredId ? domains.find((d) => d.id === hoveredId) : null;

  const showTooltip = useCallback((id: KnowledgeDomainId, event: React.MouseEvent) => {
    const rect = (event.currentTarget as SVGElement).closest(`.${styles.hexBox}`)?.getBoundingClientRect();
    if (!rect) return;
    setHoveredId(id);
    setTooltipPos({ x: event.clientX - rect.left, y: event.clientY - rect.top - 8 });
  }, []);

  const hideTooltip = useCallback(() => {
    setHoveredId(null);
    setTooltipPos(null);
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.hexBox}>
        <svg
          className={styles.svg}
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label={`Conocimiento global ${globalPercent} por ciento`}
        >
          <g className={styles.hexGroup}>
            {sectors.map((s) => (
              <path
                key={s.domain.id}
                d={s.d}
                className={styles.sector}
                fill={s.domain.color}
                fillOpacity={selectedId === s.domain.id ? 0.22 : 0.1}
                stroke={s.domain.color}
                strokeOpacity={selectedId === s.domain.id ? 0.45 : 0.2}
                strokeWidth={1}
                tabIndex={0}
                onMouseEnter={(e) => showTooltip(s.domain.id, e)}
                onMouseLeave={hideTooltip}
                onBlur={hideTooltip}
                onClick={() => onSelect(s.domain.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(s.domain.id);
                  }
                }}
              />
            ))}
            <path
              d={outlinePath}
              fill="none"
              stroke="rgba(143, 167, 196, 0.35)"
              strokeWidth={1.5}
              pointerEvents="none"
            />
            {vertices.map((v) => {
              const labelPt = polar(cx, cy, v.r + 14, v.angle);
              return (
                <g key={v.domain.id}>
                  <circle
                    className={styles.vertexDot}
                    cx={v.x}
                    cy={v.y}
                    r={5}
                    fill={v.domain.color}
                    fillOpacity={0.85}
                    onMouseEnter={(e) => showTooltip(v.domain.id, e)}
                    onMouseLeave={hideTooltip}
                    onClick={() => onSelect(v.domain.id)}
                  />
                  <text className={styles.vertexLabel} x={labelPt.x} y={labelPt.y}>
                    {v.domain.shortLabel}
                  </text>
                </g>
              );
            })}
          </g>
          <text className={styles.centerLabel} x={cx} y={cy - 6}>
            {globalPercent}%
          </text>
          <text className={styles.centerSub} x={cx} y={cy + 14}>
            Conocimiento global
          </text>
        </svg>

        {active && tooltipPos ? (
          <div
            className={styles.tooltip}
            style={{ left: tooltipPos.x, top: tooltipPos.y, transform: "translate(-50%, -100%)" }}
          >
            <div className={styles.tooltipTitle}>{active.label}</div>
            <div className={styles.tooltipRow}>{active.percent}%</div>
            <div className={styles.tooltipRow}>
              {active.cases} casos · {active.clips} clips · {active.protocols} protocolos
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
