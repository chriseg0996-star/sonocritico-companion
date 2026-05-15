import { theme } from "@/lib/theme";
import { type } from "@/lib/typography";

type Step = { condition: string; arrow: string; outcome: string };

type Props = { steps: Step[] };

export function AlgorithmCard({ steps }: Props) {
  return (
    <div
      style={{
        background: theme.bg.elevated,
        border: "none",
        borderRadius: theme.radius.md,
        padding: "2px 0",
        overflow: "hidden",
        boxShadow: theme.shadow.inset,
      }}
    >
      {steps.map((step, i) => (
        <div
          key={step.condition}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            gap: "6px 10px",
            padding: "11px 16px",
            borderTop: i > 0 ? `1px solid ${theme.bg.border}` : undefined,
          }}
        >
          <span
            style={{
              ...type.bodySm,
              color: theme.text.primary,
              fontWeight: 500,
              flex: "1 1 140px",
              fontSize: 12,
            }}
          >
            {step.condition}
          </span>
          <span style={{ color: theme.accent.soft, fontWeight: 500, fontSize: 13 }} aria-hidden>
            {step.arrow}
          </span>
          <span style={{ ...type.bodySm, color: theme.text.muted, flex: "1 1 160px", fontSize: 12 }}>
            {step.outcome}
          </span>
        </div>
      ))}
    </div>
  );
}
