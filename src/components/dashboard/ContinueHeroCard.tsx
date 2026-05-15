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
        borderRadius: 14,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${theme.brand.redMuted} 0%, transparent 55%)`,
          padding: "20px 22px 22px",
        }}
      >
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: theme.bg.elevated,
              border: `1px solid ${theme.brand.redBorder}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={26} color={theme.brand.red} strokeWidth={1.5} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                ...type.eyebrow,
                color: theme.brand.red,
                margin: "0 0 8px",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Play size={12} fill="currentColor" />
              Continuar aprendiendo
            </p>
            <h2
              style={{
                ...type.titleSm,
                color: theme.text.primary,
                margin: "0 0 4px",
                fontSize: "1.25rem",
              }}
            >
              Módulo {mod.order}: {mod.title}
            </h2>
            <p style={{ ...type.bodySm, color: theme.text.secondary, margin: "0 0 14px" }}>
              {stepTitle ? (
                <>
                  Siguiente paso:{" "}
                  <strong style={{ color: theme.text.primary, fontWeight: 500 }}>{stepTitle}</strong>
                </>
              ) : (
                mod.subtitle
              )}
            </p>
            <div style={{ marginBottom: 8 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                  ...type.caption,
                  color: theme.text.muted,
                }}
              >
                <span>Progreso del módulo</span>
                <span>{modulePercent}%</span>
              </div>
              <ProgressBar value={modulePercent} height={6} />
            </div>
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
                Curso general: {coursePercent}%
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "10px 18px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  background: theme.brand.redMuted,
                  border: `1px solid ${theme.brand.redBorder}`,
                  color: theme.brand.red,
                }}
              >
                Continuar <ChevronRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </ScanLineCard>
  );
}
