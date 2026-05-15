"use client";
import { cn } from "@/lib/utils";
import { theme } from "@/lib/theme";
import type { BadgeVariant } from "@/lib/theme";

interface ScanLineCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function ScanLineCard({ children, className, glow, onClick, style }: ScanLineCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: theme.bg.card,
        border: `1px solid ${glow ? theme.brand.redBorder : theme.bg.border}`,
        borderRadius: "10px",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 200ms ease-out, background 200ms ease-out",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
      className={cn("scan-line", className)}
    >
      {children}
    </div>
  );
}

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant | "green" | "cyan" | "orange" | "amber";
  className?: string;
}

export function Badge({ children, variant = "gray", className }: BadgeProps) {
  const colors: Record<string, { bg: string; border: string; color: string }> = {
    brand: { bg: theme.brand.redMuted, border: theme.brand.redBorder, color: theme.brand.red },
    red: { bg: theme.brand.redMuted, border: theme.brand.redBorder, color: theme.brand.red },
    white: { bg: "rgba(255,255,255,0.1)", border: "rgba(255,255,255,0.25)", color: theme.text.primary },
    gray: { bg: "rgba(255,255,255,0.05)", border: theme.bg.border, color: theme.text.secondary },
    muted: { bg: "transparent", border: theme.bg.border, color: theme.text.muted },
    green: { bg: theme.brand.redMuted, border: theme.brand.redBorder, color: theme.text.primary },
    cyan: { bg: theme.brand.redMuted, border: theme.brand.redBorder, color: theme.brand.red },
    orange: { bg: theme.brand.redMuted, border: theme.brand.redBorder, color: theme.brand.red },
    amber: { bg: "rgba(255,255,255,0.08)", border: theme.bg.border, color: theme.text.secondary },
  };
  const c = colors[variant] ?? colors.gray;
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 8px",
        borderRadius: 20,
        fontSize: 10,
        fontFamily: "'IBM Plex Mono', monospace",
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.color,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

interface ProgressBarProps {
  value: number;
  color?: string;
  height?: number;
}

export function ProgressBar({ value, color = theme.brand.red, height = 4 }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, Math.round(value)));
  return (
    <div style={{ width: "100%", height, background: theme.bg.border, borderRadius: height }}>
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: color,
          borderRadius: height,
          transition: "width 400ms ease-out",
        }}
      />
    </div>
  );
}

interface StatCardProps {
  value: string | number;
  label: string;
  sub?: string;
  color?: string;
}

export function StatCard({ value, label, sub, color = theme.brand.red }: StatCardProps) {
  return (
    <div
      style={{
        background: theme.bg.card,
        border: `1px solid ${theme.bg.border}`,
        borderRadius: 10,
        padding: "10px 12px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 28,
          lineHeight: 1,
          color,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 10, color: theme.text.secondary, marginTop: 3 }}>{label}</div>
      {sub && (
        <div
          style={{
            fontSize: 9,
            color: theme.text.muted,
            marginTop: 1,
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

interface BtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "danger";
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function Btn({ children, onClick, variant = "ghost", fullWidth, disabled, className, style }: BtnProps) {
  const variants = {
    primary: { bg: theme.brand.redMuted, border: theme.brand.redBorder, color: theme.brand.red },
    ghost: { bg: "transparent", border: theme.bg.border, color: theme.text.secondary },
    danger: { bg: theme.brand.redMuted, border: theme.brand.redBorder, color: theme.brand.red },
  };
  const v = variants[variant];
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: "8px 16px",
        borderRadius: 8,
        fontSize: 12,
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontWeight: 500,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 200ms ease-out",
        background: v.bg,
        border: `1px solid ${v.border}`,
        color: disabled ? theme.text.muted : v.color,
        width: fullWidth ? "100%" : "auto",
        opacity: disabled ? 0.5 : 1,
        userSelect: "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
