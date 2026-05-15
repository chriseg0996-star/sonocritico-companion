import type { ReactNode } from "react";
import { type } from "@/lib/typography";
import { theme } from "@/lib/theme";

export type ModuleSectionSurface = "plain" | "panel";

type Props = {
  id?: string;
  /** Label superior: REFERENCIA RÁPIDA */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Superficie tenue alternada — sin bordes */
  surface?: ModuleSectionSurface;
  /** Segunda parte de un bloque clínico (menos aire arriba, sin eyebrow) */
  continued?: boolean;
  /** Dentro de ModuleClinicalBlock — sin padding exterior de sección */
  inset?: boolean;
  children: ReactNode;
};

const SECTION_SCROLL_MARGIN = 56;

export function ModuleClinicalBlock({
  variant = "panel",
  children,
}: {
  variant?: "panel" | "plain";
  children: ReactNode;
}) {
  return (
    <div
      className={variant === "panel" ? "ws-clinical-block" : "ws-clinical-block ws-clinical-block--plain"}
    >
      {children}
    </div>
  );
}

export function ModuleSection({
  id,
  eyebrow,
  title,
  subtitle,
  surface = "plain",
  continued = false,
  inset = false,
  children,
}: Props) {
  const showEyebrow = Boolean(eyebrow) && !continued;

  const className = [
    "ws-module-section",
    surface === "panel" && !inset && "ws-module-section--panel",
    continued && "ws-module-section--continued",
    inset && "ws-module-section--inset",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={className} style={{ scrollMarginTop: SECTION_SCROLL_MARGIN }}>
      <header className="ws-module-header">
        {showEyebrow && <p className="ws-module-eyebrow">{eyebrow}</p>}
        <h2 className="ws-module-title" style={{ ...type.titleSm, color: theme.text.primary }}>
          {title}
        </h2>
        {subtitle && <p className="ws-module-subtitle">{subtitle}</p>}
      </header>
      <div className="ws-module-body">{children}</div>
    </section>
  );
}
