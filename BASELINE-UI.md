# Baseline UI — SONOCRÍTICO Companion

**Commit ancla:** `ea27bc6`  
**Objetivo:** Preservar la esencia visual del HUD restaurado. Las nuevas entregas son **funcionalidad clínica** en piezas aisladas.

## Qué define el baseline

- Sidebar oscuro + búsqueda clínica + nav por secciones
- Hero: tagline, título «¿Qué necesitas consultar ahorita?», CTAs, buscador
- Accesos rápidos (grid `ScanLineCard`)
- Consulta rápida (tiles por módulo)
- Reanudar curso + barra de progreso resumida
- Tokens `:root` en `globals.css` (slate / `#0b0e12`, acento `#8fa7c4`)

## Archivos congelados

```
src/components/layout/AppLayout.tsx
src/components/layout/PageShell.tsx          # cuando envuelve /dashboard
src/components/dashboard/CompanionHero.tsx
src/components/dashboard/QuickAccessRow.tsx
src/components/dashboard/ConsultQuickCard.tsx
src/components/dashboard/ContinueCompactCard.tsx
src/app/dashboard/page.tsx
src/app/globals.css                          # :root + .app-sidebar* + .companion-hero* + .app-bottom-nav*
src/lib/theme.ts
src/lib/typography.ts
```

## `globals.css` — alcance del freeze

| Permitido | Prohibido |
|-----------|-----------|
| Estilos para **rutas nuevas** bajo clases `feature-*` / `clinical-*` | Cambiar valores en `:root` |
| Archivo CSS separado importado desde una página | Editar bloques `.app-sidebar`, `.companion-hero`, `.app-bottom-nav` |
| Utilidades solo usadas por componentes nuevos | Refactors globales de spacing o tipografía |

## Cómo añadir funcionalidad

1. Crear feature en `src/features/<nombre>/` o `src/components/clinical/<nombre>/`.
2. Usar `theme` / tokens existentes vía props o CSS variables **sin** cambiar `theme.ts`.
3. Conectar en una ruta dedicada (`/herramientas/...`, `/modulos/...`) o, si el sprint lo exige, un único slot nuevo al final del dashboard.
4. No mover, rediseñar ni sustituir Hero, sidebar ni filas del HUD.

## Sprints que NO reactivar sin PO

- Footer institucional global en dashboard
- `surface-hierarchy.css` / rebalanceos masivos de cards
- Sidebar typography rebalance (16px nav)
- Premium hero / workstation frame que sustituya el layout actual

## Referencia visual

Deploy de referencia: rama `main` en `ea27bc6` → GitHub Pages tras el reset acordado.

---

*Documento operativo para agentes y desarrollo por fases. Actualizar solo si el PO fija un nuevo commit ancla.*
