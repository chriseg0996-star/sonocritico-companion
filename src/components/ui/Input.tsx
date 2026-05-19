"use client";

import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "style"> {
  className?: string;
  style?: React.CSSProperties;
  /** Icono a la izquierda (posición absoluta, padding 40px). */
  iconLeft?: React.ReactNode;
  /** Contenido a la derecha (ej. toggle contraseña). */
  adornmentRight?: React.ReactNode;
}

const baseStyle: React.CSSProperties = {
  width: "100%",
  background: theme.bg.primary,
  border: `1px solid ${theme.bg.border}`,
  borderRadius: theme.radius.sm,
  padding: "11px 12px 11px 40px",
  fontSize: 13,
  color: theme.text.primary,
  fontFamily: "'IBM Plex Sans', sans-serif",
  outline: "none",
  transition: "border-color 200ms ease-out",
};

export function Input({ className, style, iconLeft, adornmentRight, onFocus, onBlur, ...props }: InputProps) {
  const focusBorder = theme.accent.borderStrong;
  const blurBorder = theme.bg.border;

  return (
    <div style={{ position: "relative" }}>
      {iconLeft}
      <input
        {...props}
        className={cn(className)}
        style={{ ...baseStyle, paddingRight: adornmentRight ? 40 : 12, ...style }}
        onFocus={(e) => {
          e.target.style.borderColor = focusBorder;
          onFocus?.(e);
        }}
        onBlur={(e) => {
          e.target.style.borderColor = blurBorder;
          onBlur?.(e);
        }}
      />
      {adornmentRight}
    </div>
  );
}
