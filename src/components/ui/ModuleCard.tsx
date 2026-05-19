"use client";

import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { ModuleStatus } from "@/lib/module-progress";
import { theme } from "@/lib/theme";

export interface ModuleCardProps {
  order: number;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  percent: number;
  status: ModuleStatus;
  icon: LucideIcon;
  onClick: () => void;
}

function statusChipVariant(status: ModuleStatus): "white" | "brand" | "gray" {
  if (status === "complete") return "white";
  if (status === "in-progress") return "brand";
  return "gray";
}

function statusLabel(status: ModuleStatus): string {
  if (status === "complete") return "Listo";
  if (status === "in-progress") return "En curso";
  return "Pendiente";
}

/** Fila de módulo del curso (listado /modulos). */
export function ModuleCard({
  order,
  title,
  subtitle,
  estimatedMinutes,
  percent,
  status,
  icon: Icon,
  onClick,
}: ModuleCardProps) {
  return (
    <Card onClick={onClick} style={{ padding: "14px 16px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: theme.accent.muted,
            border: `1px solid ${theme.accent.borderSubtle}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 12,
            color: theme.brand.primary,
          }}
        >
          {order}
        </div>
        <Icon size={20} strokeWidth={1.5} color={theme.text.secondary} style={{ marginTop: 8 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: theme.text.primary }}>{title}</div>
              <div style={{ fontSize: 11, color: theme.text.muted, marginTop: 2 }}>{subtitle}</div>
            </div>
            <Chip variant={statusChipVariant(status)}>{statusLabel(status)}</Chip>
          </div>
          <div style={{ marginTop: 10 }}>
            <ProgressBar value={percent} height={3} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 6,
              fontSize: 10,
              color: theme.text.muted,
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          >
            <span>~{estimatedMinutes} min</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, color: theme.brand.primary }}>
              Abrir <ChevronRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
