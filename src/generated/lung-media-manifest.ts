/** Auto-generated — npm run media:manifest — no editar a mano */
import type { MediaItem } from "@/lib/media/types";

export const media: MediaItem[] = [
  {
    "id": "lung-a-lines",
    "module": "lung",
    "category": "a-lines",
    "title": "Líneas A",
    "still": "/media/lung/a-lines/still.png",
    "clip": "/media/lung/a-lines/clip.svg",
    "metadata": {
      "finding": "Patrón A — líneas horizontales paralelas al pleura",
      "probe": "Lineal",
      "plane": "Intercostal anterior",
      "what_you_see": "Líneas ecogénicas horizontales, equidistantes, perpendiculares a las líneas pleurales. Deslizamiento pleural presente.",
      "meaning": "Aire alveolar predominante; patrón de normalidad o enfermedad obstructiva sin edema intersticial.",
      "clinical_use": "Baseline en BLUE; comparar con aparición de líneas B en zonas homólogas.",
      "diagnosis": [
        "Pulmón normal",
        "EPOC / obstrucción sin edema",
        "Neumotórax excluido si hay sliding"
      ],
      "pitfalls": [
        "Confundir con artefactos de reverberación en pared",
        "Zona no explorada puede ocultar consolidación"
      ]
    }
  },
  {
    "id": "lung-b-lines",
    "module": "lung",
    "category": "b-lines",
    "title": "B Lines",
    "still": "/media/lung/b-lines/still.svg",
    "clip": "/media/lung/b-lines/clip.svg"
  },
  {
    "id": "lung-consolidation",
    "module": "lung",
    "category": "consolidation",
    "title": "Consolidation",
    "still": "/media/lung/consolidation/still.svg",
    "clip": "/media/lung/consolidation/clip.svg"
  },
  {
    "id": "lung-lung-point",
    "module": "lung",
    "category": "lung-point",
    "title": "Lung Point",
    "still": "/media/lung/lung-point/still.svg",
    "clip": "/media/lung/lung-point/clip.svg"
  },
  {
    "id": "lung-plaps",
    "module": "lung",
    "category": "plaps",
    "title": "Plaps",
    "still": "/media/lung/plaps/still.svg"
  },
  {
    "id": "lung-pleural-effusion",
    "module": "lung",
    "category": "pleural-effusion",
    "title": "Pleural Effusion",
    "still": "/media/lung/pleural-effusion/still.svg"
  }
];
