# Atlas MVP — Fase 2 (v0.4.0)

**SONOCRÍTICO Companion** deja de ser solo un dashboard de curso y pasa a funcionar como **workstation clínica**: biblioteca POCUS consultable en guardia, con búsqueda global y uso offline del atlas.

| Campo | Valor |
|-------|--------|
| Versión app | `0.4.0` |
| Fase | `F2.8` — cierre Fase 2 |
| Badge UI | **Atlas MVP** |
| Ruta principal | `/biblioteca` |

---

## Checklist Fase 2 (completo)

| # | Entrega | Estado |
|---|---------|--------|
| F2.1 | Media detectada (`public/media/`, tipos, hook) | ✓ |
| F2.2 | Manifests generados (`npm run media:manifest`) | ✓ |
| F2.3 | Grid biblioteca (módulos, filtros, cards) | ✓ |
| F2.4 | Viewer clínico fullscreen | ✓ |
| F2.5 | Metadata docente (`media.meta.json`, acordeón visor) | ✓ |
| F2.6 | Búsqueda clínica (Ctrl+K → atlas) | ✓ |
| F2.7 | Offline (thumb + still precache, clip on-demand) | ✓ |
| F2.8 | Release MVP + documentación | ✓ |

---

## Estructura del atlas

```
public/media/
├── {module}/              # lung | fast | cardiac | vexus (+ vascular, procedures reservados)
│   └── {hallazgo}/        # slug kebab-case (ej. a-lines, ruq-fluid)
│       ├── still.webp     # imagen fija (o still.svg en MVP actual)
│       ├── clip.webm      # opcional — loop / clip
│       ├── thumb.webp     # opcional — grid; si falta → still
│       └── media.meta.json
```

**Código (no editar manifests a mano):**

| Área | Ruta |
|------|------|
| Tipos y hook | `src/lib/media/` |
| Manifests TS | `src/generated/*-media-manifest.ts` |
| UI biblioteca | `src/components/atlas/` |
| Visor | `src/components/viewer/` |
| Búsqueda | `src/lib/search/` + `src/lib/media/search-media.ts` |
| Offline | `src/lib/offline/`, `public/sw.js` (generado) |

**Flujo clínico:** Biblioteca → card → visor (still + metadata + clip) · o **Ctrl+K** → resultado → `/biblioteca?media={id}`.

---

## Media

### Inventario MVP (manifest)

| Módulo | Ítems en manifest |
|--------|-------------------|
| Pulmón (`lung`) | 6 |
| FAST (`fast`) | 11 |
| Cardiac (`cardiac`) | 11 |
| VExUS (`vexus`) | 9 |
| **Total** | **37** hallazgos |

### Generación de manifests

```bash
npm run media:manifest
```

Escanea `public/media/{lung,fast,cardiac,vexus}/`, valida `media.meta.json` y escribe `src/generated/<module>-media-manifest.ts`.

Build Pages (GitHub Pages):

```bash
npm run build:pages
```

Incluye `generate:sw` para service worker con rutas bajo `NEXT_PUBLIC_BASE_PATH`.

### Campos clínicos (`media.meta.json`)

`finding`, `probe`, `plane`, `what_you_see`, `meaning`, `diagnosis[]`, `pitfalls[]`, `clinical_use` — mostrados en el visor (panel docente F2.5).

### Formatos objetivo vs MVP

| Tipo | Producción objetivo | MVP actual |
|------|---------------------|------------|
| Still | WebP | SVG placeholder en muchos ítems |
| Thumb | WebP | Usa `still` si no hay thumb |
| Clip | WebM | SVG / assets ligeros de demo |

Ver también `public/media/README.md` para convenciones de subida.

---

## Limitaciones (MVP)

1. **Contenido:** placeholders SVG en varios hallazgos; no sustituyen estudios reales de paciente.
2. **Módulos:** `vascular` y `procedures` existen como carpetas pero **no** están en el grid ni en manifests.
3. **Offline:** requiere al menos una visita online a Biblioteca para precache (thumb/still). Clips solo offline si ya se cargaron antes. Sin sincronización entre dispositivos.
4. **Service worker:** HTTPS o `localhost`; en dev sin SW la app sigue online-only para media.
5. **Búsqueda:** prioriza atlas + índice legacy; no cubre todos los módulos teóricos del curso.
6. **i18n:** metadata y UI de atlas mayormente en español.
7. **HUD / dashboard:** congelados por diseño; el MVP vive en **Biblioteca**, no rediseña Inicio.
8. **Casos / progreso / calculadoras:** fuera del alcance Fase 2; Fase 3+.

---

## Workstation clínica — qué significa

| Antes (F1) | Atlas MVP (F2) |
|------------|----------------|
| Navegación tipo curso | Biblioteca por protocolo/hallazgo |
| Imágenes dispersas | Manifest único + visor PACS ligero |
| Solo online | Still/thumb offline en guardia |
| Buscar en menús | Ctrl+K → hallazgo → visor |

**Uso recomendado en guardia:** abrir Biblioteca con red → esperar **Disponible offline** → desconectar y consultar hallazgos, metadata y still; reproducir clips cuando ya estén en caché.

---

## Mantenimiento

1. Añadir carpeta bajo `public/media/{module}/{hallazgo}/`.
2. `media.meta.json` + assets.
3. `npm run media:manifest`
4. `npm run generate:sw` (o `npm run build`)
5. Probar grid, visor, búsqueda y offline.

---

*SONOCRÍTICO Companion · Atlas MVP v0.4.0 · F2.8 — Christopher Godínez*
