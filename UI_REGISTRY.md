# UI Registry — SONOCRÍTICO Companion

**Fuente:** `src/components/ui/`  
**Import recomendado:** `@/components/ui`  
**Compatibilidad:** `@/components/ui/base` reexporta el mismo barrel (deprecated).

No cambiar estilos desde este doc; solo catalogar contratos de componentes.

---

## Btn

**Archivo:** `Btn.tsx`  
**Uso:** Acciones primarias/secundarias, navegación inline, formularios.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Etiqueta del botón |
| `onClick` | `() => void` | — | Handler click |
| `variant` | `BtnVariant` | `"ghost"` | Estilo visual |
| `fullWidth` | `boolean` | — | `width: 100%` |
| `disabled` | `boolean` | — | Deshabilita interacción |
| `className` | `string` | — | Clases extra (`ui-btn`) |
| `style` | `CSSProperties` | — | Overrides inline |

**Variantes activas**

| Variant | Clase CSS | Uso típico |
|---------|-----------|------------|
| `primary` | `ui-btn--primary` | CTA principal (login, continuar caso) |
| `ghost` | `ui-btn--ghost` | Acciones secundarias, toolbar módulos |
| `secondary` | `ui-btn--secondary` | CTA alternativo (hero dashboard) |

**Variantes eliminadas (muertas):** `danger` — sin usos en app; CSS legacy en `ui-tokens.css` sin exportar en tipo.

---

## Card

**Archivo:** `Card.tsx`  
**Alias:** `ScanLineCard` (deprecated, mismo componente)  
**Uso:** Tiles dashboard, casos, herramientas, protocolos, cualquier superficie con scan-line.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Contenido |
| `glow` | `boolean` | — | `theme.bg.elevated` + sombra card (casos pendientes) |
| `onClick` | `() => void` | — | Añade `card-interactive` + cursor pointer |
| `className` | `string` | — | Ej. utilidades layout |
| `style` | `CSSProperties` | — | Padding, grid interno |

**Variantes:** una sola superficie; variación por `glow` y `onClick`.

---

## Chip

**Archivo:** `Chip.tsx`  
**Alias:** `Badge` (deprecated)  
**Uso:** Estado módulo, patología, metadata compacta.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Texto |
| `variant` | `ChipVariant` | `"gray"` | Paleta semántica |
| `className` | `string` | — | Clases extra |

**Variantes activas**

| Variant | Uso |
|---------|-----|
| `brand` | En curso, enlaces módulo |
| `white` | Completado |
| `gray` | Pendiente, metadata |
| `red` | Patológico / alerta |
| `orange` | Patológico (casos) |

**Variantes eliminadas:** `cyan`, `amber`, `muted`, `green` — sin referencias en código.

### ChipFilterGroup

Fila de filtros atlas (`role="tablist"`). Clases: `atlas-filter-chip`, `atlas-filter-chip--active`.

| Prop | Tipo | Descripción |
|------|------|-------------|
| `filters` | `AtlasFilterDef[]` | Opciones |
| `active` | `AtlasFilterId` | Selección actual |
| `onChange` | `(id) => void` | Cambio de filtro |

**Alias atlas:** `FilterChips` en `@/components/atlas/FilterChips` → reexport.

---

## Input

**Archivo:** `Input.tsx`  
**Uso:** Campos de formulario con icono (login). Extiende props nativas de `<input>`.

| Prop | Tipo | Descripción |
|------|------|-------------|
| `iconLeft` | `ReactNode` | Icono absoluto izquierda (padding 40px) |
| `adornmentRight` | `ReactNode` | Control derecha (ej. mostrar contraseña) |
| `className` / `style` | — | Overrides |
| `...input` | `InputHTMLAttributes` | `type`, `value`, `onChange`, etc. |

**Variantes:** estilo único workstation (borde focus `theme.accent.borderStrong`).

---

## Search

**Archivo:** `Search.tsx`  
**Alias:** `SearchBar` (deprecated)  
**Uso:** Búsqueda en atlas / listas con contador.

| Prop | Tipo | Descripción |
|------|------|-------------|
| `value` | `string` | Valor controlado |
| `onChange` | `(value: string) => void` | Setter |
| `placeholder` | `string` | Placeholder + `aria-label` |
| `resultCount` | `number` | Muestra meta “N resultados” |

**Variantes:** una sola; estilos en `globals.css` (`.atlas-search-*`).

---

## SectionTitle

**Archivo:** `SectionTitle.tsx`  
**Uso:** Encabezados de bloque en dashboard (`type.eyebrow` + acento).

| Prop | Tipo | Descripción |
|------|------|-------------|
| `children` | `ReactNode` | Título |
| `className` / `style` | — | Overrides puntuales |

**Variantes:** ninguna.

---

## ProgressBar

**Archivo:** `ProgressBar.tsx`  
**Uso:** Progreso módulo, curso, lecciones.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `value` | `number` | — | 0–100 (clamp interno) |
| `color` | `string` | `theme.accent.primary` | Color barra |
| `height` | `number` | `3` | Altura px |

**Variantes:** ninguna.

---

## ModuleCard

**Archivo:** `ModuleCard.tsx`  
**Uso:** Listado `/modulos` (fila con orden, icono, chip estado, barra, CTA).

| Prop | Tipo | Descripción |
|------|------|-------------|
| `order` | `number` | Número de módulo |
| `title` / `subtitle` | `string` | Textos |
| `estimatedMinutes` | `number` | Duración |
| `percent` | `number` | Progreso 0–100 |
| `status` | `ModuleStatus` | `not-started` \| `in-progress` \| `complete` |
| `icon` | `LucideIcon` | Icono del módulo |
| `onClick` | `() => void` | Navegación al módulo |

**Variantes:** chip interno según `status` (`white` / `brand` / `gray`).

---

## EmptyState

**Archivo:** `EmptyState.tsx`  
**Uso:** Listas vacías, atlas sin hallazgos, casos sin datos.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Mensaje |
| `variant` | `"default"` \| `"atlas"` | `"default"` | Estilo tipográfico |
| `className` | `string` | — | Clases extra |

| Variant | Estilo |
|---------|--------|
| `default` | 13px, `text.secondary` (casos, repaso) |
| `atlas` | 12px, faint, centrado + clase `atlas-grid-empty` |

---

## Relacionado (no en sprint base)

| Componente | Archivo | Notas |
|------------|---------|-------|
| `StatCard` | `StatCard.tsx` | Métrica en calculadoras (VExUS); considerar patrón `Card` en futuro |

---

## Mapa de imports legacy

| Antes | Ahora |
|-------|-------|
| `@/components/ui/base` → `ScanLineCard` | `@/components/ui` → `Card` |
| `@/components/ui/base` → `Badge` | `@/components/ui` → `Chip` |
| `@/components/atlas/SearchBar` | `@/components/ui` → `Search` |
| `@/components/atlas/FilterChips` | `@/components/ui` → `ChipFilterGroup` |
| `SectionTitle` local en dashboard | `@/components/ui/SectionTitle` |

---

## Reglas

1. Nuevos bloques reutilizables → archivo en `src/components/ui/` + entrada en este registro.
2. No duplicar variantes en páginas; extender el componente o `theme`.
3. HUD congelado: no alterar tokens CSS (`ui-tokens.css`) sin sprint visual.

*Última actualización: sprint UI registry.*
