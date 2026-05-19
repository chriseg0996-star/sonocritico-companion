# F1.1 — Visual Identity Audit

**Fecha:** 2026-05-19  
**Baseline HUD:** `ea27bc6` + footer release `7988d48` (`GlobalReleaseFooter`, scoped CSS)  
**Alcance:** Solo documentación — **sin correcciones**.  
**Zona congelada (no auditar para cambio):** AppLayout, sidebar, Hero, cuerpo del dashboard (secciones A–E), navegación, spacing principal, tokens `:root` en `globals.css`.

---

## Resumen

| Categoría | Hallazgos | Riesgo alto |
|-----------|-----------|-------------|
| 1. Colores hardcodeados | 12 | 2 |
| 2. Tipografía | 8 | 3 |
| 3. Botones duplicados | 6 | 2 |
| 4. Cards | 5 | 2 |
| 5. Chips | 5 | 1 |
| 6. Inputs / search | 5 | 2 |
| 7. Hover / focus / active | 6 | 2 |
| 8. Ruptura estética HUD | 4 | 3 |

**Fuentes de verdad actuales:** `src/app/globals.css` (`:root`), `src/lib/theme.ts`, `src/lib/typography.ts`, `src/lib/version.ts` (solo release footer).

---

## 1. Colores hardcodeados fuera de theme/globals

| Hallazgo | Archivo | Riesgo visual | Recomendación mínima |
|----------|---------|---------------|----------------------|
| Borde `#1E3448` no existe en paleta slate | `src/app/casos/[id]/page.tsx` (~L200) | **Alto** — franja azulada huérfana en UI de casos | Sustituir por `theme.bg.border` o `theme.brand.deep` en F1.2 |
| Paleta neón en protocolos (`#00D4FF`, `#FF6B35`, etc.) | `src/lib/mock-data.ts` (protocolos) | **Alto** — rompe HUD monocromático si se expone en UI | Mapear a `theme.accent.*` / variantes muted; no usar en dashboard |
| Gradiente viewer `#030405` | `src/app/globals.css` (`.us-viewer-stage-wrap`) | Medio — más oscuro que `--bg-primary` | Alias CSS `--viewer-stage-bg` derivado de token |
| `rgba` en Badge green/orange fuera de `theme.state` | `src/components/ui/base.tsx` (Badge) | Bajo | Usar `theme.state.success/warning` con alpha documentado |
| Overlays atlas `rgba(11,14,18,*)` | `src/components/atlas/AtlasThumbnail.tsx` | Bajo | Token semántico `overlay-scrim` en theme (sin tocar `:root` hasta sprint) |
| Backdrop modal `rgba(0,0,0,0.75)` | `src/components/protocol/ProtocolPanels.tsx` | Bajo | Constante `theme.overlay.modal` |
| Scanline login `rgba(255,255,255,0.006)` | `src/app/login/page.tsx` | Bajo | Mantener como excepción decorativa documentada |
| Gradientes placeholder (duplicados) | `src/lib/atlas/placeholders.ts`, `MediaPlaceholderCard.tsx` | Medio — drift entre atlas y módulos | Fuente única `placeholders.ts`; card solo importa |
| Fullscreen overlay `rgba(0,0,0,0.9)` | `src/app/imagenes/page.tsx` | Bajo | Token overlay viewer |
| Sticky nav `rgba(11,14,18,0.82)` | `src/components/modules/reference/ModuleSectionNav.tsx` | Bajo | `color-mix` con `--bg-primary` |
| `theme.ts` vs `:root` duplicados (casing) | `src/lib/theme.ts` + `globals.css` | Medio — drift futuro | Tabla 1:1 en `BASELINE-UI.md`; no editar tokens en F1.1 |

---

## 2. Tipografías inconsistentes

| Hallazgo | Archivo | Riesgo visual | Recomendación mínima |
|----------|---------|---------------|----------------------|
| `typography.ts` poco adoptado; overrides `{...type.X}` + `fontSize: 12` | `EcoCriticoReferenceView.tsx`, `FastEfastReferenceView.tsx`, `VexusReferenceView.tsx`, `PulmonBlueReferenceView.tsx` | **Alto** — escala rota en módulos gold | Usar solo tokens `type.*` sin override en features clínicas |
| Escala ad hoc 9–14px + Bebas 22–56px en casos | `src/app/casos/[id]/page.tsx` | **Alto** — pantalla más “arcade” que workstation | Mapear a `type.body/bodySm/caption/stat` |
| Familias inline `'IBM Plex Sans'` (~25 archivos) | Varios en `src/app/*`, `src/components/*` | Medio | Importar `fonts` de `typography.ts` |
| Eyebrow dashboard `theme.accent.primary` vs CSS `text-faint` | `dashboard/page.tsx` `SectionTitle` vs `.clinical-section-title` | Medio | Congelar: dashboard usa accent; clínico usa faint — documentar |
| Hero input 13px; atlas search 14px; clinical 16px | `CompanionHero.tsx`, `.atlas-search-input`, `.clinical-search-input` | Medio | Clase scoped `ui-field` (F1.2) fuera del HUD |
| `StatCard` 24px sans vs `type.stat` Bebas 1.75rem | `src/components/ui/base.tsx` | Medio | Alinear `StatCard` con `type.stat` en rutas no congeladas |
| Release footer 12px subtext vs spec 12px OK | `GlobalReleaseFooter.module.css` | Bajo — alineado HUD | Mantener; no mover a globals |

---

## 3. Botones con estilos duplicados

| Hallazgo | Archivo | Riesgo visual | Recomendación mínima |
|----------|---------|---------------|----------------------|
| `Btn` sin hover en `primary` / `secondary` / `danger` | `src/components/ui/base.tsx` | **Alto** — CTAs planos en herramientas | Añadir hover vía CSS module `ui-btn` (no tocar variantes Hero inline) |
| Submit “Buscar” inline sin estados | `CompanionHero.tsx` | Bajo (congelado) | No cambiar; replicar patrón en features nuevas con `ui-btn` |
| Botones quiz custom padding/radius 8 | `casos/[id]/page.tsx` | Medio | Extraer `QuizOptionButton` scoped |
| `OptionGroup` radio-buttons 10×12 | `src/components/tools/OptionGroup.tsx` | Medio | Reutilizar `Btn` ghost o `ui-btn--option` |
| Links progreso inline 12px 600 | `dashboard/page.tsx` | Bajo (congelado) | Patrón `ui-link` para otras rutas |
| Nav / bottom nav solo CSS | `AppLayout.tsx` + `globals.css` | Bajo (congelado) | No unificar con `Btn` |

---

## 4. Cards sin patrón común

| Hallazgo | Archivo | Riesgo visual | Recomendación mínima |
|----------|---------|---------------|----------------------|
| Cuatro familias: `ScanLineCard`, `.module-tile`, `.ws-surface`, div+padding inline | `ui/base.tsx`, `globals.css`, módulos gold, protocolo | **Alto** — densidad y sombra inconsistentes | Matriz: interactivo → `ScanLineCard`; estático → `ws-surface` |
| Padding card 10×11 … 20×20 sin escala | `AtlasCard`, `FindingCard`, `instructor`, `progreso` | Medio | Escala `card-padding-sm/md` en theme layout |
| `ScanLineCard` `glow` solo en Eco | `EcoCriticoReferenceView.tsx` | Medio | Criterio: glow solo hero clínico destacado |
| `module-tile` en consulta vs `ScanLineCard` en accesos | `ConsultQuickCard.tsx`, `QuickAccessRow.tsx` | Medio (dashboard congelado) | No fusionar en F1.1; documentar dualidad HUD |
| `ContinueHeroCard` vs `ContinueCompactCard` | `ContinueHeroCard.tsx`, `ContinueCompactCard.tsx` | Bajo | Deprecar hero card si no se usa en rutas activas |

---

## 5. Chips inconsistentes

| Hallazgo | Archivo | Riesgo visual | Recomendación mínima |
|----------|---------|---------------|----------------------|
| `Badge` 9px vs `.ws-chip` 10px vs atlas 10px vs search filter 12px/40px alto | `ui/base.tsx`, `globals.css`, `FilterChips.tsx`, `.clinical-search-filter` | **Alto** — jerarquía táctil desigual | Tres roles: `chip-meta` (9–10px), `chip-filter` (12px), `chip-touch` (40px min) |
| Consulta rápida: `Badge` dentro de `<button>` sin hover | `ConsultQuickCard.tsx` | Medio (congelado) | F1.2+ solo en módulos/atlas |
| `FilterChips` inline pisa `.atlas-filter-chip` CSS | `FilterChips.tsx` + `globals.css` | Medio | Quitar inline; solo clases atlas |
| Topic chips `Badge brand` en Eco | `EcoCriticoReferenceView.tsx` | Bajo | OK como énfasis módulo |
| Chips metadata pulmonar `.ws-chip` | `globals.css` | Bajo | Referencia para chips navegación módulo |

---

## 6. Inputs / search con estilos distintos

| Hallazgo | Archivo | Riesgo visual | Recomendación mínima |
|----------|---------|---------------|----------------------|
| Hero search: sin `:focus` dedicado | `CompanionHero.tsx` | Medio (congelado) | `ui-field` en rutas nuevas |
| Login: focus vía JS border | `login/page.tsx` | Medio | Misma clase `ui-field` + `:focus-visible` |
| Atlas: `.atlas-search-input` 14px, radius 10, box-shadow focus | `globals.css` + `SearchBar.tsx` | Bajo — patrón más completo | Exportar como referencia F1.2 |
| Clinical overlay: 16px, sin borde, panel header | `globals.css` `.clinical-search-input` | Medio | Mantener para overlay; no mezclar con atlas |
| Trigger sidebar 13px / h40 card-like | `.clinical-search-trigger` | Bajo (congelado) | Documentar como patrón “fake input” |

---

## 7. Hover / active / focus no estandarizados

| Hallazgo | Archivo | Riesgo visual | Recomendación mínima |
|----------|---------|---------------|----------------------|
| Global `:focus-visible` outline accent | `globals.css` | Bajo — base OK | Extender a botones inline que hoy no lo heredan |
| `.card-interactive` / `.module-tile:hover` translateY(-1px) | `globals.css` | Bajo — patrón HUD | Reutilizar clase en cards nuevas |
| `Btn` hover solo `ghost` (JS) | `ui/base.tsx` | **Alto** | CSS `:hover` en module `ui-btn` |
| `transition: all 200ms` en quiz | `casos/[id]/page.tsx` | Medio | Usar `theme.motion.base` |
| Atlas filter active: inline + `.atlas-filter-chip--active` transform | `FilterChips.tsx` | Medio | Una sola fuente de estado activo |
| `FilterChips` sin `:focus-visible` explícito | `FilterChips.tsx` | Medio | `focus-visible` igual que `.clinical-search-filter` |

---

## 8. Componentes que rompen estética HUD actual

| Hallazgo | Archivo | Riesgo visual | Recomendación mínima |
|----------|---------|---------------|----------------------|
| Colores saturados en datos de protocolo (no slate) | `src/lib/mock-data.ts` | **Alto** si se renderizan | Auditar consumo UI; neutralizar antes de mostrar |
| Casos clínicos: tipografía display grande + rojos intensos | `casos/[id]/page.tsx` | **Alto** | Sprint dedicado casos; no mezclar con tokens dashboard |
| Instructor / repaso: posible mezcla `ScanLineCard` + badges vivos | `instructor/page.tsx`, `repaso/page.tsx` | Medio | Revisar en F1.2 con `Badge` solo gray/brand |
| Herramientas calculadoras: tablas y forms propios | `tools/*`, `ToolShell.tsx` | Medio | Envolver en `feature-tools` CSS scoped |
| `GlobalReleaseFooter` Bebas + mono — coherente con HUD | `GlobalReleaseFooter.module.css` | Bajo | Mantener scoped; no promover a globals |

---

## Componentes alineados al HUD (referencia positiva)

- `PageShell` + `layout.contentMax` (1040px) — contenedor dashboard.
- `GlobalReleaseFooter` — tokens CSS vars, borde superior sutil, sin card pesada.
- `ScanLineCard` + `.module-tile` + `.companion-hero` — núcleo visual actual.
- Paleta slate en `theme.ts` / `:root` — coherente en dashboard y sidebar.

---

## Propuesta de congelación F1 (sin implementar)

1. No nuevos hex en `src/**` salvo `theme.ts` / placeholders aprobados.
2. Features clínicas: CSS Module `feature-*` o `clinical-*` únicamente.
3. Chips: elegir familia por contexto (ver §5).
4. Cards: `ScanLineCard` vs `ws-surface` (ver §4).
5. Inputs nuevos: copiar comportamiento de `.atlas-search-input`, no del Hero inline.
6. Incrementar versión solo en `src/lib/version.ts` por sprint.

---

## Exclusiones explícitas

No se recomienda cambiar en F1.1/F1.2 salvo sprint PO:

`AppLayout.tsx`, `CompanionHero.tsx`, `dashboard/page.tsx` (secciones A–E), `QuickAccessRow.tsx`, `ConsultQuickCard.tsx`, `ContinueCompactCard.tsx`, bloques `:root` / `.app-sidebar*` / `.companion-hero*` / `.module-tile*` en `globals.css`.

---

*Auditoría F1.1 — solo lectura. Build verificado al final del sprint.*
