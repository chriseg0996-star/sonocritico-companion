# Atlas POCUS — biblioteca de media

Ruta pública servida en `/media/…` (Next.js `public/`).

**Código:** `src/lib/media/` (tipos, hook) · manifests en `src/generated/*-media-manifest.ts`.

---

## Estructura de módulos

```
public/media/
├── lung/
│   ├── a-lines/
│   ├── b-lines/
│   ├── consolidation/
│   ├── pleural-effusion/
│   ├── lung-point/
│   └── plaps/
├── fast/
├── cardiac/
├── vexus/
├── vascular/
└── procedures/
```

Cada **hallazgo** es una carpeta (slug en kebab-case). Dentro van los archivos del ítem.

---

## Archivos por hallazgo

| Archivo | Obligatorio | Descripción |
|---------|-------------|-------------|
| `still.webp` | Sí* | Imagen fija principal |
| `clip.webm` | No | Loop o clip corto |
| `thumb.webp` | No | Miniatura (grid / filmstrip); si falta, usar `still` |
| `media.meta.json` | Recomendado | Metadatos clínicos e id estable |

\* En desarrollo puede existir `still.svg` legacy; producción objetivo: **WebP**.

### Ejemplo `media.meta.json`

```json
{
  "id": "lung-b-lines",
  "title": "Líneas B",
  "finding": "Patrón intersticial",
  "probe": "Lineal",
  "plane": "Anterior"
}
```

---

## Formatos

| Tipo | Formato | Notas |
|------|---------|--------|
| Imagen fija | WebP | Calidad ~80, ancho máx. 1280px |
| Miniatura | WebP | ~320px ancho |
| Video / loop | WebM (VP9) | Clips cortos, sin audio o mute |

Evitar PNG/JPEG pesados en nuevas subidas.

---

## Cómo subir media

1. Elegir módulo (`lung`, `fast`, …) y crear carpeta del hallazgo si no existe.
2. Añadir `still.webp` (y opcionalmente `clip.webm`, `thumb.webp`).
3. Añadir o actualizar `media.meta.json` con `id`, `title` y campos clínicos.
4. Regenerar manifest del módulo (script futuro) → `src/generated/<module>-media-manifest.ts`.
5. Verificar en build que la ruta responde: `/media/<module>/<hallazgo>/still.webp`.

No commitear archivos >5 MB sin optimizar.

---

## Módulos

| Carpeta | Uso clínico |
|---------|-------------|
| `lung` | BLUE / pulmonar |
| `fast` | FAST / eFAST |
| `cardiac` | Eco crítico / focos cardíacos |
| `vexus` | Congestión venosa |
| `vascular` | Accesos / DVT (futuro) |
| `procedures` | Procedimientos guiados (futuro) |

---

*Atlas MVP v0.4.0 (F2.8) — ver `ATLAS_RELEASE.md` en la raíz del repo.*
