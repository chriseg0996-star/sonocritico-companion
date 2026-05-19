/** Módulos del atlas POCUS (carpeta bajo `public/media/`). */
export type MediaModuleId = "lung" | "fast" | "cardiac" | "vexus" | "vascular" | "procedures";

/** Campos clínicos educativos (media.meta.json + manifest). */
export type MediaClinicalMetadata = {
  finding?: string;
  probe?: string;
  plane?: string;
  what_you_see?: string;
  meaning?: string;
  diagnosis?: string[];
  pitfalls?: string[];
  clinical_use?: string;
};

export type MediaItem = {
  id: string;
  module: string;
  category: string;
  title: string;
  still?: string;
  clip?: string;
  thumb?: string;
  metadata?: MediaClinicalMetadata;
};

/** Formato canónico de `public/media/{module}/{hallazgo}/media.meta.json` */
export type MediaMetaFile = {
  id?: string;
  title?: string;
  finding?: string;
  probe?: string;
  plane?: string;
  what_you_see?: string;
  meaning?: string;
  diagnosis?: string[];
  pitfalls?: string[];
  clinical_use?: string;
};
