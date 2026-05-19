<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Mobile-first (obligatorio)

Diseño **mobile-first** (390px). Desktop es secundario. Touch ≥44px, sin hover, fullscreen viewer, comparaciones stacked en móvil. Ver `.cursor/rules/mobile-first.mdc`.

## Visual baseline (congelado)

**Commit ancla:** `ea27bc6`. No modificar shell, sidebar, Hero, tokens `:root`, ni composición del dashboard HUD. Nuevas features en componentes aislados con estilos scoped.

Ver `.cursor/rules/visual-baseline.mdc` y `BASELINE-UI.md`.
