"use client";

import { ChevronRight, Play } from "lucide-react";
import { ProgressBar, ScanLineCard } from "@/components/ui/base";
import { type } from "@/lib/typography";
import { theme } from "@/lib/theme";
import type { CourseModule } from "@/types";
import type { LucideIcon } from "lucide-react";

export function ContinueHeroCard({
  module: mod,
  stepTitle,
  modulePercent,
  coursePercent,
  icon: Icon,
  onContinue,
}: {
  module: CourseModule;
  stepTitle?: string;
  modulePercent: number;
  coursePercent: number;
  icon: LucideIcon;
  onContinue: () => void;
}) {
  return (
    <ScanLineCard
      glow
      onClick={onContinue}
      className="continue-hero"
      style={{
        padding: 0,
        marginBottom: 28,
        borderRadius: theme.radius.lg,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${theme.accent.muted} 0%, transparent 60%)`,
          padding: "22px 24px 24px",
        }}
      >
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: theme.radius.md,
              background: theme.bg.elevated,
              border: `1px solid ${theme.accent.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={26} color={theme.accent.primary} strokeWidth={1.5} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                ...type.eyebrow,
                color: theme.accent.primary,
                margin: "0 0 8px",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Play size={12} fill="currentColor" />
              Reanudar
            </p>
            <h2 style={{ ...type.titleSm, color: theme.text.primary, margin: "0 0 4px", fontSize: "1.2rem" }}>
              {mod.title}
            </h2>
            <p style={{ ...type.bodySm, color: theme.text.secondary, margin: "0 0 14px" }}>
              {stepTitle ? (
                <>
                  Siguiente: <strong style={{ color: theme.text.primary, fontWeight: 500 }}>{stepTitle}</strong>
                </>
              ) : (
                mod.subtitle
              )}
            </p>
            <ProgressBar value={modulePercent} height={5} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                marginTop: 14,
              }}
            >
              <span style={{ ...type.caption, color: theme.text.muted }}>
                Módulo {modulePercent}% · Curso {coursePercent}%
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "9px 16px",
                  borderRadius: theme.radius.sm,
                  fontSize: 12,
                  fontWeight: 600,
                  background: theme.button.primaryBg,
                  color: theme.button.primaryText,
                }}
              >
                Continuar <ChevronRight size={15} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </ScanLineCard>
  );
}
