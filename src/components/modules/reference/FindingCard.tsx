"use client";

import { theme } from "@/lib/theme";
import { type } from "@/lib/typography";

type NormalProps = {
  variant: "normal";
  title: string;
  appearance: string;
  meaning: string;
  pitfall: string;
};

type PathologyProps = {
  variant: "pathology";
  title: string;
  appearance: string;
  clinical: string;
  action: string;
};

type Props = NormalProps | PathologyProps;

export function FindingCard(props: Props) {
  const isPathology = props.variant === "pathology";
  const accent = isPathology ? theme.state.danger : theme.brand.primary;

  return (
    <article
      style={{
        background: theme.bg.card,
        border: "none",
        borderLeft: `2px solid ${accent}`,
        borderRadius: theme.radius.sm,
        padding: "12px 14px",
        boxShadow: theme.shadow.inset,
        transition: `background ${theme.motion.base}, transform ${theme.motion.base}, box-shadow ${theme.motion.base}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = theme.bg.elevated;
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.boxShadow = theme.shadow.card;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = theme.bg.card;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = theme.shadow.inset;
      }}
    >
      <h3
        style={{
          ...type.titleSm,
          color: theme.text.primary,
          margin: "0 0 10px",
          fontSize: 13,
          fontWeight: 500,
        }}
      >
        {props.title}
      </h3>
      {props.variant === "normal" ? (
        <>
          <Row label="Qué se ve" value={props.appearance} />
          <Row label="Significado" value={props.meaning} />
          <Row label="Error frecuente" value={props.pitfall} muted />
        </>
      ) : (
        <>
          <Row label="Apariencia" value={props.appearance} />
          <Row label="Clínica" value={props.clinical} />
          <Row label="Siguiente paso" value={props.action} highlight />
        </>
      )}
    </article>
  );
}

function Row({
  label,
  value,
  muted,
  highlight,
}: {
  label: string;
  value: string;
  muted?: boolean;
  highlight?: boolean;
}) {
  return (
    <div style={{ marginBottom: 8 }}>
      <span
        style={{
          ...type.eyebrow,
          color: theme.text.faint,
          fontSize: 9,
          display: "block",
          marginBottom: 3,
        }}
      >
        {label}
      </span>
      <p
        style={{
          ...type.bodySm,
          color: highlight ? theme.state.danger : muted ? theme.text.faint : theme.text.secondary,
          margin: 0,
          fontSize: 12,
          lineHeight: 1.48,
        }}
      >
        {value}
      </p>
    </div>
  );
}
