"use client";

import { ChevronRight } from "lucide-react";
import { ScanLineCard } from "@/components/ui/base";
import { type } from "@/lib/typography";
import { theme } from "@/lib/theme";
import type { CourseModule } from "@/types";
import type { LucideIcon } from "lucide-react";

export function ContinueCompactCard({
  module: mod,
  stepTitle,
  icon: Icon,
  onContinue,
}: {
  module: CourseModule;
  stepTitle?: string;
  icon: LucideIcon;
  onContinue: () => void;
}) {
  return (
    <ScanLineCard
      onClick={onContinue}
      style={{
        padding: "14px 16px",
        marginBottom: 28,
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: theme.radius.sm,
            background: theme.accent.muted,
            border: `1px solid ${theme.accent.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={20} color={theme.accent.primary} strokeWidth={1.5} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ ...type.eyebrow, color: theme.text.muted, margin: "0 0 4px" }}>Reanudar curso</p>
          <p style={{ ...type.bodySm, color: theme.text.primary, fontWeight: 600, margin: 0 }}>
            {mod.title}
          </p>
          {stepTitle && (
            <p style={{ ...type.caption, color: theme.text.secondary, margin: "4px 0 0" }}>
              {stepTitle}
            </p>
          )}
        </div>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: 12,
            fontWeight: 600,
            color: theme.accent.primary,
            flexShrink: 0,
          }}
        >
          Continuar <ChevronRight size={14} />
        </span>
      </div>
    </ScanLineCard>
  );
}
