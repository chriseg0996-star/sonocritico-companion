"use client";

import { cn } from "@/lib/utils";

export type BtnVariant = "primary" | "ghost" | "secondary";

export interface BtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: BtnVariant;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function Btn({
  children,
  onClick,
  variant = "ghost",
  fullWidth,
  disabled,
  className,
  style,
}: BtnProps) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cn("ui-btn", `ui-btn--${variant}`, className)}
      style={{
        width: fullWidth ? "100%" : "auto",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
