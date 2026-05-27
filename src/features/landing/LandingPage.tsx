import Link from "next/link";
import styles from "@/features/landing/landing.module.css";

const PROBLEMS = [
  {
    title: "4 pantallas, 0 segundos",
    text: "En guardia no hay tiempo para saltar entre PDFs, chats y galerías de imágenes sueltas.",
  },
  {
    title: "Protocolos dispersos",
    text: "BLUE, FAST, VExUS y RUSH viven en lugares distintos — sin un hilo clínico común.",
  },
  {
    title: "Sin guía en tiempo real",
    text: "Falta un companion que oriente hallazgos, diferencial y siguiente paso al pie del paciente.",
  },
] as const;

const SOLUTIONS = [
  {
    title: "Atlas USG interactivo",
    text: "Hallazgos normales y patológicos con viewer POCUS, filmstrip y búsqueda clínica.",
  },
  {
    title: "Protocolos BLUE / FAST / VExUS / RUSH",
    text: "Árboles de decisión y checklists alineados a la práctica en UCI y urgencias.",
  },
  {
    title: "Companion de guardia",
    text: "Modo guardia: queja → protocolo → atlas o calculadora sin perder contexto.",
  },
] as const;

export function LandingPage() {
  return (
    <div className={styles.landingPage}>
      <main className={styles.landingMain}>
        <section className={styles.landingHero} aria-labelledby="landing-hero-title">
          <span className={styles.landingHeroLogo} aria-hidden>
            🫁
          </span>
          <h1 className={styles.landingHeroTitle} id="landing-hero-title">
            SONOCRÍTICO
          </h1>
          <p className={styles.landingHeroTagline}>Visualiza el problema. Actúa con certeza.</p>
          <Link href="/dashboard" className={styles.landingBtnPrimary}>
            Abrir app
          </Link>
        </section>

        <section className={styles.landingSection} aria-labelledby="landing-problem-title">
          <p className={styles.landingSectionLabel}>El problema</p>
          <h2 className={styles.landingSectionHeading} id="landing-problem-title">
            POCUS en guardia, sin sistema
          </h2>
          <div className={styles.landingGrid}>
            {PROBLEMS.map((item) => (
              <article key={item.title} className={styles.landingCard}>
                <h3 className={styles.landingCardTitle}>{item.title}</h3>
                <p className={styles.landingCardText}>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.landingSection} aria-labelledby="landing-solution-title">
          <p className={styles.landingSectionLabel}>La solución</p>
          <h2 className={styles.landingSectionHeading} id="landing-solution-title">
            Companion USG en una sola app
          </h2>
          <div className={styles.landingGrid}>
            {SOLUTIONS.map((item) => (
              <article
                key={item.title}
                className={`${styles.landingCard} ${styles.landingCardAccent}`}
              >
                <h3 className={styles.landingCardTitle}>{item.title}</h3>
                <p className={styles.landingCardText}>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.landingCta} aria-labelledby="landing-cta-title">
          <h2 className={styles.landingCtaTitle} id="landing-cta-title">
            Listo para usarlo en guardia
          </h2>
          <div className={styles.landingCtaActions}>
            <Link href="/dashboard" className={styles.landingBtnPrimary}>
              Abrir app
            </Link>
            <Link href="/login" className={styles.landingLinkSecondary}>
              Iniciar sesión
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
