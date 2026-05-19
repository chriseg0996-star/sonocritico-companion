# F1.1 — Visual Identity Audit

**Fecha:** 2026-05-19  
**Baseline ancla:** `ea27bc6` (+ `d8cc85a` docs freeze)  
**Alcance:** Auditoría solo — **sin correcciones** (salvo bugs obvios listados).  
**Excluido del cambio F1.2:** AppLayout, sidebar, dashboard HUD, CompanionHero, navegación, flujo UX (ver `BASELINE-UI.md`).

---

## Resumen ejecutivo

| Área | Estado | Prioridad congelar F1 |
|------|--------|------------------------|
| Tokens color (`:root` + `theme.ts`) | Duales pero alineados; drift menor | Documentar mapa único |
| Tipografía | `typography.ts` poco adoptado; muchos `fontSize` inline | Estandarizar fuera del HUD |
| Botones | `Btn` + ~40 `<button>` inline duplicados | Patrón `Btn` / clases |
| Cards | 4 patrones (`ScanLineCard`, `module-tile`, `ws-surface`, inline) | Tabla de uso |
| Chips | 4 familias (Badge, `ws-chip`, atlas filter, search filter) | Unificar en módulos/atlas |
| Inputs / search | 4 variantes visuales | Clase `ui-field` scoped |
| Hover / focus / active | Global OK; gaps en `Btn` e inputs inline | Completar estados |

**Bugs obvios (no corregidos en F1.1):**
- `src/app/casos/[id]/page.tsx` — borde hardcode `#1E3448` (no existe en `theme`/`globals`).
- `FilterChips.tsx` — estilos inline pisan clases `.atlas-filter-chip*` de `globals.css`.

---

## 1. Colores hardcodeados fuera de theme/globals

### Fuente de verdad actual
- **CSS:** `src/app/globals.css` → bloque `:root` (líneas ~5–53).
- **JS:** `src/lib/theme.ts` — espejo para componentes inline.

### Duplicación theme ↔ globals (aceptable, vigilar drift)
| Token | `globals.css` | `theme.ts` |
|-------|---------------|------------|
| bg primary | `#0b0e12` | `#0B0E12` |
| bg card | `#11151b` | `#11151B` |
| accent | `#8fa7c4` | `#8FA7C4` |

No hay `--bg-sidebar` en `theme.ts`; sidebar usa `--bg-sidebar: #080a0e` solo en CSS.

### Hardcode en TSX (fuera de theme)
| Ubicación | Detalle | Severidad |
|-----------|---------|-----------|
| `casos/[id]/page.tsx` | `borderTop: "1px solid #1E3448"` | **Alta** — color huérfano |
| `MediaPlaceholderCard.tsx` | Gradientes `#171C24`, `#34425B`, `#0B0E12`, etc. en `variantStyles` | Media — placeholders |
| `AtlasThumbnail.tsx` | `rgba(11, 14, 18, 0.65–0.8)` overlays | Baja — derivados de bg primary |
| `ProtocolPanels.tsx` | Modal backdrop `rgba(0,0,0,0.75)` | Baja — patrón modal |
| `ui/base.tsx` Badge | `rgba(111, 174, 149, 0.08)`, `rgba(212, 163, 115, 0.1)` | Media — fuera de `theme.state` |
| `protocol-theme.ts` | `rgba(255,255,255,0.06/0.08)` | Baja — semántica protocolo |
| `login/page.tsx` | Scanline `rgba(255,255,255,0.006)` | Baja — decorativo |

**Conteo aprox.:** hex en `.tsx` → 2 archivos; `rgba(` en `.tsx` → ~8 archivos (mayoría aceptable si se documentan como excepciones).

---

## 2. Tipografía inconsistente

### Tokens definidos (`src/lib/typography.ts`)
`displayLg/Md`, `title`, `titleSm`, `eyebrow`, `body`, `bodySm`, `caption`, `stat`.

### Problemas
| Problema | Ejemplos |
|----------|----------|
| **Spread + override** | `EcoCriticoReferenceView`: `{...type.title}` + `fontSize: "1.25rem"`; `{...type.bodySm}` + `fontSize: 12` |
| **Escala ad hoc 9–14px** | Casos, protocolo, instructor, tools — sin usar `type.*` |
| **Familias inline** | ~45 usos de `'IBM Plex Sans'` / `'Bebas Neue'` / `'IBM Plex Mono'` en TSX en lugar de `fonts.*` |
| **Eyebrows divergentes** | Dashboard `SectionTitle`: `type.eyebrow` + `theme.accent.primary`; globals `.clinical-section-title` / `.nav-section-label`: `text-faint` |
| **Hero** | CSS `.companion-hero__title` 1.4375rem/500; inline CTAs 13px — coherente con CSS, no con `type.title` |

### Escala de hechos (px) más usada en UI clínica
`9` · `10` · `11` · `12` · `13` · `14` · `16` + Bebas 22–56 en casos/score.

**Recomendación F1 freeze:** Mapear 9/10/11 → metadata, 12/13 → body, 14 → body-lg, sin tocar clases del HUD.

---

## 3. Botones — estilos duplicados

### Patrón canónico
`Btn` en `src/components/ui/base.tsx` — variantes `primary` | `secondary` | `ghost` | `danger`; base `fontSize: 12`, padding `9×16` / ghost `8×12`.

### Duplicación
| Patrón | Dónde |
|--------|--------|
| `Btn` + override padding | `CompanionHero` `11px 20px` (congelado) |
| `<button>` inline submit | `CompanionHero` buscar — sin hover/focus |
| Nav / layout | `AppLayout` — `nav-link`, bottom nav (CSS) |
| Casos / quiz | Opciones custom `padding 10×12`, `borderRadius 8` |
| `OptionGroup` | Radio-like buttons 10×12 |
| `FilterChips` / search filters | Chip-buttons distintos |
| `ClinicalSearchOverlay` | `.clinical-search-clear/close` 44×44 CSS |

**Hover en `Btn`:** solo implementado en `variant="ghost"` vía `onMouseEnter/Leave`. `primary` / `secondary` / `danger` **sin hover** en componente.

---

## 4. Cards — patrones no unificados

| Patrón | Implementación | Hover | Uso típico |
|--------|----------------|-------|------------|
| **A** `ScanLineCard` | `theme` inline + `.scan-line` + opcional `.card-interactive` | CSS global `.card-interactive:hover` | Quick access, progreso, instructor |
| **B** `.module-tile` | `globals.css` | `.module-tile:hover` | Consulta rápida dashboard |
| **C** `.ws-surface` | `globals.css` | Sin hover por defecto | Módulos gold (Eco, FAST, VExUS) |
| **D** Inline `div` + padding | `12×14`, `12×16`, `10×12` variados | A veces ninguno | Protocolo, bibliografía, tools |

**Padding inconsistente en cards:** `10×11`, `10×12`, `12×14`, `12×16`, `12×18`, `14×18`, `16×18`, `20×20` (module-tile).

**Glow:** solo `ScanLineCard glow={true}` en referencias Eco — resto `shadow-inset` vs `shadow-card`.

---

## 5. Chips — tamaños y familias

| Familia | Tamaño | Padding | Radio | Contexto |
|---------|--------|---------|-------|----------|
| `Badge` (`base.tsx`) | **9px** | 2×7 | 5 | Consulta rápida dashboard |
| `.ws-chip` (CSS) | **10px** | 3×8 | 6 | Nav secciones módulo pulmonar |
| `FilterChips` inline | **10px** | 4×9 | 5 | Atlas filtros |
| `.clinical-search-filter` | **12px** (0.75rem) | 0×14, h40 | pill 999px | Overlay búsqueda |
| `EcoCriticoReferenceView` | `Badge` brand | — | — | Topic chips |

**Observación:** Badge en consulta rápida (9px) es el **más pequeño**; search filters son los **más altos** (40px touch). No es bug; es inconsistencia de jerarquía.

**FilterChips:** mezcla clase CSS + `style={{}}` inline → estado activo duplicado (inline gana).

---

## 6. Inputs y búsqueda

| Superficie | Tamaño | Padding | Borde / fondo | Focus |
|------------|--------|---------|---------------|-------|
| Hero search (`CompanionHero`) | 13px | 11×12 + icon 38px | `theme.bg.elevated`, inline | **Ninguno** |
| Login inputs | 13px | 11×12 + icon 40px | `theme.bg.primary`, inline + JS border focus | JS `accent.borderStrong` |
| `.atlas-search-input` | **14px** | 12×36×40 | CSS card mix, radius 10 | CSS box-shadow + border |
| `.clinical-search-input` | **16px** (1rem) | transparent en panel | Sin borde (header panel) | Solo `:focus-visible` global |
| `.clinical-search-trigger` | 13px (0.8125rem) | h40 | Card-like button | N/A |

**Placeholder:** `text-faint` vía CSS o `theme.text.muted` inline — inconsistente.

---

## 7. Hover / active / focus

### Estandarizado en `globals.css`
- `:focus-visible` — outline accent 45% (global).
- `.card-interactive` / `.module-tile` — translateY(-1px) + elevated bg.
- `.nav-link:hover` / `--active` — glass + accent muted.
- `.ws-chip:hover` — glass hover.
- `.atlas-search-input:focus` — border + shadow dedicado.
- `.clinical-search-row:active` — fila activa búsqueda.

### Gaps
| Elemento | Gap |
|----------|-----|
| `Btn` primary/secondary | Sin hover/focus dedicado |
| Hero search + submit | Sin `:focus-visible` específico |
| `Badge` en chip-buttons consulta | Hover del botón padre vacío |
| `FilterChips` | Sin `:focus-visible`; active vía inline |
| Casos quiz options | `transition: all 200ms` (no usa `--motion-*`) |

---

## 8. Spacing general (fuera del HUD)

| Token `layout` | Valor | Adopción |
|----------------|-------|----------|
| `sectionGap` | 32 | Parcial; dashboard usa `marginBottom: 32` inline |
| `pagePadding` | 1.5rem | `.page-shell` en CSS coincide |
| `cardRadius` | 12 | = `--radius-md` |

**Márgenes frecuentes inline:** `6`, `8`, `10`, `12`, `14`, `16`, `18`, `24`, `32`, `36` — sin escala documentada.

**Módulos:** `.ws-module-section` `padding: 48px 0 44px` vs cards `12–14px` — salto grande intencional en referencias.

---

## 9. Archivos con mayor deuda visual (para F1.2+)

Trabajar **solo en rutas clínicas**, no en baseline congelado:

1. `src/app/casos/[id]/page.tsx` — tipografía y colores inline masivos.
2. `src/components/protocol/ProtocolPanels.tsx`
3. `src/components/modules/*ReferenceView.tsx`
4. `src/components/atlas/FilterChips.tsx` — alinear con CSS atlas.
5. `src/components/tools/*` — `OptionGroup`, calculadoras.
6. `src/app/login/page.tsx` — fuera del HUD; candidato a `ui-field` compartido.

---

## 10. Checklist congelación F1 (propuesta)

- [ ] Documentar mapa único `theme.ts` ↔ `:root` (1:1, sin nuevos hex en features).
- [ ] Definir escala tipográfica `9–16` + cuándo usar `type.*`.
- [ ] Patrón chip: elegir **Badge** vs **ws-chip** vs **filter-pill** por contexto.
- [ ] Patrón card: **ScanLineCard** (interactivo) vs **ws-surface** (estático) — prohibir patrón D salvo excepción.
- [ ] Clase `ui-field` / `ui-btn` scoped (nuevo archivo, no editar tokens HUD).
- [ ] Estados focus en todos los inputs nuevos.

---

## Referencia rápida — qué NO tocar en F1.2

```
AppLayout.tsx · CompanionHero.tsx · dashboard/page.tsx
QuickAccessRow · ConsultQuickCard · ContinueCompactCard
globals.css (:root, .app-sidebar*, .companion-hero*, .module-tile*, nav)
```

---

*Generado en sprint F1.1 — sin cambios de código de producción.*
