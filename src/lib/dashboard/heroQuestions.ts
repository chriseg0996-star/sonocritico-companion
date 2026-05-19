export const HERO_QUESTION_FALLBACK = "¿Qué necesitas consultar ahorita?";

export const HERO_QUESTIONS = [
  "¿Qué necesitas consultar ahorita?",
  "¿Qué ventana quieres explorar?",
  "¿Qué está pasando con tu paciente?",
  "¿Qué protocolo necesitas?",
  "¿Qué hallazgo estás buscando?",
  "¿Qué te está diciendo el ultrasonido?",
  "¿Qué necesitas resolver?",
  "¿Qué necesitas confirmar?",
  "¿Qué quieres revisar antes del procedimiento?",
  "¿Qué patrón estás viendo?",
  "¿Dónde está el problema?",
  "¿Qué quieres descartar?",
  "¿Qué quieres aprender hoy?",
  "¿Qué quieres validar?",
  "¿Qué necesitas decidir?",
];

/** Pregunta fija por carga de página (no persiste en sessionStorage — nuevo al recargar). */
let sessionHeroQuestion: string | null = null;

function pickRandomQuestion(): string {
  if (HERO_QUESTIONS.length === 0) return HERO_QUESTION_FALLBACK;
  const index = Math.floor(Math.random() * HERO_QUESTIONS.length);
  return HERO_QUESTIONS[index] ?? HERO_QUESTION_FALLBACK;
}

/** Una pregunta por sesión de página; estable entre re-renders y navegación cliente. */
export function getSessionHeroQuestion(): string {
  if (sessionHeroQuestion) return sessionHeroQuestion;
  sessionHeroQuestion = pickRandomQuestion();
  return sessionHeroQuestion;
}
