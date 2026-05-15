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
        background: glow ? theme.bg.elevated : theme.bg.card,
        border: `1px solid ${theme.bg.border}`,
        borderRadius: theme.radius.md,
        position: "relative",
        overflow: "hidden",
        boxShadow: glow ? theme.shadow.card : theme.shadow.inset,
        transition: `transform ${theme.motion.base}, border-color ${theme.motion.base}, background ${theme.motion.base}, box-shadow ${theme.motion.base}`,
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
      className={cn("scan-line", onClick && "card-interactive", className)}
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
    brand: { bg: theme.accent.muted, border: "transparent", color: theme.accent.soft },
    red: { bg: theme.state.errorMuted, border: "transparent", color: theme.state.danger },
    white: { bg: theme.state.completeMuted, border: "transparent", color: theme.text.secondary },
    gray: { bg: theme.surface.glass, border: "transparent", color: theme.text.muted },
    muted: { bg: "transparent", border: "transparent", color: theme.text.faint },
    green: { bg: "rgba(111, 174, 149, 0.08)", border: "transparent", color: theme.state.success },
    cyan: { bg: theme.accent.muted, border: "transparent", color: theme.accent.soft },
    orange: { bg: "rgba(212, 163, 115, 0.1)", border: "transparent", color: theme.state.warning },
    amber: { bg: theme.surface.glass, border: "transparent", color: theme.text.muted },
  };
  const c = colors[variant] ?? colors.gray;
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        padding: "2px 7px",
        borderRadius: 5,
        fontSize: 9,
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontWeight: 500,
        letterSpacing: "0.02em",
        background: c.bg,
        border: c.border === "transparent" ? "none" : `1px solid ${c.border}`,
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

export function ProgressBar({ value, color = theme.accent.primary, height = 3 }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, Math.round(value)));
  return (
    <div style={{ width: "100%", height, background: theme.surface.soft, borderRadius: height }}>
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: color,
          borderRadius: height,
          transition: "width 400ms cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: 0.85,
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

export function StatCard({ value, label, sub, color = theme.accent.primary }: StatCardProps) {
  return (
    <div
      className="ws-surface"
      style={{
        padding: "16px 18px",
        textAlign: "center",
        transition: `transform ${theme.motion.base}, box-shadow ${theme.motion.base}`,
      }}
    >
      <div
        style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 24,
          fontWeight: 500,
          lineHeight: 1,
          color,
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 11, color: theme.text.muted, marginTop: 8 }}>{label}</div>
      {sub && <div style={{ fontSize: 10, color: theme.text.faint, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

interface BtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "danger" | "secondary";
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function Btn({ children, onClick, variant = "ghost", fullWidth, disabled, className, style }: BtnProps) {
  const variants = {
    primary: {
      bg: theme.button.primaryBg,
      border: "transparent",
      color: theme.button.primaryText,
    },
    secondary: {
      bg: theme.surface.glass,
      border: "transparent",
      color: theme.button.secondaryText,
    },
    ghost: { bg: "transparent", border: "transparent", color: theme.text.muted },
    danger: {
      bg: theme.state.errorMuted,
      border: "transparent",
      color: theme.state.error,
    },
  };
  const v = variants[variant];
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: variant === "ghost" ? "8px 12px" : "9px 16px",
        borderRadius: theme.radius.sm,
        fontSize: 12,
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontWeight: 500,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: `background ${theme.motion.fast}, color ${theme.motion.fast}, opacity ${theme.motion.fast}`,
        background: v.bg,
        border: v.border === "transparent" ? "none" : `1px solid ${v.border}`,
        color: disabled ? theme.text.faint : v.color,
        width: fullWidth ? "100%" : "auto",
        opacity: disabled ? 0.45 : 1,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (disabled || variant !== "ghost") return;
        e.currentTarget.style.color = theme.text.secondary;
        e.currentTarget.style.background = theme.surface.glassHover;
      }}
      onMouseLeave={(e) => {
        if (disabled || variant !== "ghost") return;
        e.currentTarget.style.color = theme.text.muted;
        e.currentTarget.style.background = "transparent";
      }}
    >
      {children}
    </button>
  );
}
