"use client";

import type { EvolutionNode } from "@/lib/progreso";
import styles from "@/components/progress/knowledge-bloom.module.css";

type Props = {
  nodes: EvolutionNode[];
};

export function KnowledgeEvolutionTimeline({ nodes }: Props) {
  return (
    <section className={styles.glassCard} aria-labelledby="evolution-title">
      <p className={styles.cardEyebrow} id="evolution-title">
        Evolución de tu conocimiento
      </p>
      <ol className={styles.timeline}>
        {nodes.map((node, i) => (
          <li key={node.id} className={styles.timelineItem}>
            <div
              className={`${styles.timelineNode} ${node.current ? styles.timelineNodeCurrent : ""}`}
              aria-current={node.current ? "step" : undefined}
            >
              <span className={styles.timelinePct}>{node.percent}%</span>
            </div>
            <span className={styles.timelineLabel}>{node.label}</span>
            {i < nodes.length - 1 ? <span className={styles.timelineConnector} aria-hidden /> : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
