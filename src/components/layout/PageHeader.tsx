"use client";

import { type } from "@/lib/typography";
import { theme } from "@/lib/theme";

export function PageHeader({
  title,
  subtitle,
  eyebrow,
  action,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  action?: React.ReactNode;
}) {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 16,
        marginBottom: 28,
      }}
    >
      <div style={{ minWidth: 0 }}>
        {eyebrow && (
          <p
            style={{
              ...type.eyebrow,
              color: theme.brand.red,
              margin: "0 0 6px",
            }}
          >
            {eyebrow}
          </p>
        )}
        <h1
          style={{
            ...type.title,
            color: theme.text.primary,
            margin: 0,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              ...type.body,
              color: theme.text.secondary,
              margin: "8px 0 0",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </header>
  );
}
