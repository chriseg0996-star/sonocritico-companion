# Layout freeze — SONOCRÍTICO Companion

**Fuente de verdad (TS):** `src/lib/layout-config.ts`  
**Espejo CSS:** `src/styles/layout-tokens.css`  
**Baseline:** `ea27bc6` + HUD congelado (`BASELINE-UI.md`)

Objetivo: cambios futuros de **funcionalidad clínica** sin romper la estructura visual del shell.

---

## Constantes exportadas

| Constante | Valor | Uso |
|-----------|-------|-----|
| `SIDEBAR_WIDTH` | `248` | Sidebar fijo desktop, offset `app-main` |
| `CONTENT_MAX_WIDTH` | `1040` | `PageShell` dashboard y páginas estándar |
| `CARD_RADIUS` | `12` | Radio cards/tiles (`--radius-md`, `theme.radius.md`) |
| `CONTENT_GAP` | `32` | Separación entre secciones del dashboard / shell |

### Valor congelado relacionado (no duplicar)

| Nombre interno | Valor | Uso |
|----------------|-------|-----|
| `CONTENT_NARROW_MAX_WIDTH` | `720` | Módulos gold, casos, `.page-shell--narrow` |

---

## Contenedores

```
┌─────────────────────────────────────────────────────────┐
│ app-sidebar (248px fixed) │ app-main                     │
│                           │  └─ page-shell max 1040px    │
│                           │      ├─ companion-hero       │
│                           │      ├─ sections (gap 32)    │
│                           │      └─ GlobalReleaseFooter  │
└─────────────────────────────────────────────────────────┘
│ app-bottom-nav (<768px)                                 │
└─────────────────────────────────────────────────────────┘
```

| Contenedor | Clase / componente | Max width | Padding |
|------------|-------------------|-----------|---------|
| Shell app | `AppLayout` | 100vw | — |
| Sidebar | `.app-sidebar` | `SIDEBAR_WIDTH` | interno 10–12px |
| Main | `.app-main` | fluid | `padding-bottom: 72px` móvil |
| Página | `.page-shell` | `CONTENT_MAX_WIDTH` | `1.5rem` / `2rem 2.25rem 3rem` (md+) |
| Página estrecha | `.page-shell--narrow` | `720` | igual |
| Hero | `.companion-hero` | dentro shell | `32px` — **no tocar** |
| Footer release | `GlobalReleaseFooter` | 100% del shell | scoped module |

---

## Espaciados congelados (no mover a layout-config salvo sprint)

| Token | Valor | Dónde |
|-------|-------|-------|
| `CONTENT_GAP` | `32px` | Entre bloques dashboard (SectionTitle → siguiente bloque) |
| Grid consulta rápida | `12px` | `dashboard/page.tsx` grid `gap` — **freeze grid** |
| Quick access grid | `10px` | `QuickAccessRow` — **freeze grid** |
| Hero `margin-bottom` | `36px` | `.companion-hero` |
| Footer `margin-top` | `40px` / `48px` md | `GlobalReleaseFooter.module.css` |
| `page-shell` padding bottom | `2.5rem` / `3rem` md | `globals.css` |

---

## Breakpoints

| Breakpoint | Comportamiento estructural |
|------------|----------------------------|
| `< 768px` | Sidebar oculto; bottom nav; main sin `margin-left` |
| `≥ 768px` | Sidebar visible; `app-main { margin-left: SIDEBAR_WIDTH }` |
| `≥ 768px` | `page-shell` padding horizontal aumentado |

No hay breakpoint adicional para `CONTENT_MAX_WIDTH` (siempre centrado con `margin: 0 auto`).

### Excepción documentada (no es ancho de página)

| Valor | Ubicación | Motivo |
|-------|-----------|--------|
| `720px` en `max-height` | `.clinical-search-panel` (`globals.css`) | Tope de viewport del overlay de búsqueda (`min(72vh, 720px)`), no `CONTENT_NARROW_MAX_WIDTH` |

---

## Zona prohibida (estructura)

No modificar sin sprint PO:

- `AppLayout.tsx` — estructura nav / shell
- `CompanionHero.tsx` + `.companion-hero*` en `globals.css`
- `dashboard/page.tsx` — orden secciones A–E y grids
- `QuickAccessRow`, `ConsultQuickCard`, `ContinueCompactCard`
- `GlobalReleaseFooter` — posición al final del shell
- `SIDEBAR_WIDTH`, `CONTENT_MAX_WIDTH`, hero padding, grid `gap`/`minmax`

---

## Cómo usar en código nuevo

```ts
import {
  SIDEBAR_WIDTH,
  CONTENT_MAX_WIDTH,
  CARD_RADIUS,
  CONTENT_GAP,
  CONTENT_NARROW_MAX_WIDTH,
} from "@/lib/layout-config";
```

```css
/* Preferir variables CSS en estilos globales */
width: var(--layout-sidebar-width);
max-width: var(--layout-content-max);
```

Features clínicas: componentes aislados (`src/features/*`) sin alterar contenedores padre del HUD.

---

## Sincronización TS ↔ CSS

Si cambia un valor en `layout-config.ts` (solo con aprobación PO), actualizar **el mismo número** en `layout-tokens.css`.

`src/lib/typography.ts` → `layout.contentMax`, `sectionGap`, `cardRadius` reexportan desde `layout-config.ts`.

`src/lib/theme.ts` → `radius.md` usa `CARD_RADIUS`.

---

*Última congelación: sprint layout freeze.*
