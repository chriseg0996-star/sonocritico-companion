/** Versión de release — incrementar por sprint (ver VISUAL_AUDIT / PROJECT docs). */
export const APP_VERSION = "0.6.5";
export const APP_PHASE = "F5.5";

export const APP_AUTHOR = "Christopher Godínez";

/** Etiqueta de build; sustituir por hash en CI cuando exista NEXT_PUBLIC_BUILD_SHA. */
export function getBuildLabel(): string {
  const sha = process.env.NEXT_PUBLIC_BUILD_SHA?.trim();
  if (sha && sha.length >= 7) {
    return sha.slice(0, 7);
  }
  return "AUTO";
}

export function formatReleaseVersionLine(): string {
  return `v${APP_VERSION} · ${APP_PHASE} · Build ${getBuildLabel()}`;
}
