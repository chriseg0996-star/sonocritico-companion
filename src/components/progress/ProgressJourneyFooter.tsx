import { BookOpen, ClipboardCheck, GraduationCap, Stethoscope } from "lucide-react";
import styles from "@/components/progress/knowledge-bloom.module.css";

const STEPS = [
  {
    icon: BookOpen,
    title: "Estudia",
    text: "Repasa protocolos y clips del dominio que elijas.",
  },
  {
    icon: Stethoscope,
    title: "Practica",
    text: "Completa casos clínicos guiados en el simulador.",
  },
  {
    icon: ClipboardCheck,
    title: "Evalúa",
    text: "Mide precisión en quizzes y rutas de decisión.",
  },
  {
    icon: GraduationCap,
    title: "Domina",
    text: "Consolida el área hasta alcanzar dominio alto.",
  },
] as const;

export function ProgressJourneyFooter() {
  return (
    <footer className={styles.journeyFooter}>
      <p className={styles.journeyExplain}>
        El porcentaje global combina avance en módulos, casos completados, clips revisados y protocolos
        marcados. Cada vértice del radar refleja un dominio clínico de SONOCRÍTICO Companion.
      </p>

      <ol className={styles.journeySteps}>
        {STEPS.map(({ icon: Icon, title, text }) => (
          <li key={title} className={styles.journeyStep}>
            <span className={styles.journeyStepIcon} aria-hidden>
              <Icon size={16} strokeWidth={1.5} />
            </span>
            <div>
              <p className={styles.journeyStepTitle}>{title}</p>
              <p className={styles.journeyStepText}>{text}</p>
            </div>
          </li>
        ))}
      </ol>

      <blockquote className={styles.journeyQuote}>
        <p>«El ultrasonido en cabecera no premia la velocidad: premite la repetición con criterio.»</p>
      </blockquote>
    </footer>
  );
}
