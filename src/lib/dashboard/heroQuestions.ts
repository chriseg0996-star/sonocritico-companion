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

const STORAGE_KEY = "heroQuestion";
const LOAD_KEY = "heroQuestionLoad";

function pickRandomQuestion(): string {
  if (HERO_QUESTIONS.length === 0) return HERO_QUESTION_FALLBACK;
  const index = Math.floor(Math.random() * HERO_QUESTIONS.length);
  return HERO_QUESTIONS[index] ?? HERO_QUESTION_FALLBACK;
}

/**
 * Pregunta del hero — solo client-side (sessionStorage).
 * Misma frase al navegar en SPA; nueva en F5 o pestaña nueva.
 */
export function getSessionHeroQuestion(): string {
  if (typeof window === "undefined") return HERO_QUESTION_FALLBACK;

  try {
    const currentLoad = String(performance.timeOrigin);
    const storedLoad = sessionStorage.getItem(LOAD_KEY);
    const storedQuestion = sessionStorage.getItem(STORAGE_KEY);

    if (storedLoad === currentLoad && storedQuestion) {
      return storedQuestion;
    }

    const question = pickRandomQuestion();
    sessionStorage.setItem(LOAD_KEY, currentLoad);
    sessionStorage.setItem(STORAGE_KEY, question);
    return question;
  } catch {
    return pickRandomQuestion();
  }
}
