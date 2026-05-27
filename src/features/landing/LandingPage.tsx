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
    icon: "🖼",
    title: "Atlas USG interactivo",
    text: "Hallazgos normales y patológicos con viewer POCUS, filmstrip y búsqueda clínica.",
  },
  {
    icon: "📋",
    title: "Protocolos BLUE / FAST / VExUS / RUSH",
    text: "Árboles de decisión y checklists alineados a la práctica en UCI y urgencias.",
  },
  {
    icon: "🩺",
    title: "Companion de guardia",
    text: "Modo guardia: queja → protocolo → atlas o calculadora sin perder contexto.",
  },
] as const;

export function LandingPage() {
  return (
    <div className={styles.landingPage}>
      <main className={styles.landingMain}>
        <section className={styles.landingHero} aria-labelledby="landing-hero-title">
          <span className={styles.landingHeroEmoji} aria-hidden>
            🫁
          </span>
          <h1 className={styles.landingHeroTitle} id="landing-hero-title">
            <span className={styles.landingHeroAccent}>SONO</span>CRÍTICO
          </h1>
          <p className={styles.landingTagline}>Visualiza el problema. Actúa con certeza.</p>
          <Link href="/dashboard" className={`${styles.landingBtn} ${styles.landingBtnPrimary}`}>
            Abrir app
          </Link>
        </section>

        <section className={styles.landingSection} aria-labelledby="landing-problem-title">
          <p className={styles.landingSectionTitle}>El problema</p>
          <h2 className={styles.landingSectionHeadline} id="landing-problem-title">
            POCUS en guardia, sin sistema
          </h2>
          <div className={styles.landingCardGrid}>
            {PROBLEMS.map((item) => (
              <article key={item.title} className={styles.landingCard}>
                <h3 className={styles.landingCardTitle}>{item.title}</h3>
                <p className={styles.landingCardText}>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.landingSection} aria-labelledby="landing-solution-title">
          <p className={styles.landingSectionTitle}>La solución</p>
          <h2 className={styles.landingSectionHeadline} id="landing-solution-title">
            Companion USG en una sola app
          </h2>
          <ul className={styles.landingFeatureList}>
            {SOLUTIONS.map((item) => (
              <li key={item.title} className={styles.landingFeature}>
                <span className={styles.landingFeatureIcon} aria-hidden>
                  {item.icon}
                </span>
                <div className={styles.landingFeatureBody}>
                  <h3 className={styles.landingFeatureTitle}>{item.title}</h3>
                  <p className={styles.landingFeatureText}>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.landingCta} aria-labelledby="landing-cta-title">
          <h2 className={styles.landingCtaTitle} id="landing-cta-title">
            Listo para la guardia
          </h2>
          <p className={styles.landingCtaText}>
            Acceso demo sin backend — mismo HUD clínico en tu bolsillo.
          </p>
          <Link href="/dashboard" className={`${styles.landingBtn} ${styles.landingBtnPrimary}`}>
            Comenzar gratis
          </Link>
          <p style={{ marginTop: 14 }}>
            <Link href="/login" className={`${styles.landingBtn} ${styles.landingBtnGhost}`}>
              Iniciar sesión
            </Link>
          </p>
        </section>

        <footer className={styles.landingFooter}>SONOCRÍTICO Companion · USG crítico</footer>
      </main>
    </div>
  );
}
