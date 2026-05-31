"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatPrecio, getCursoBySlug } from "@/features/cursos/cursosData";
import styles from "@/features/cursos/cursos.module.css";

type SubmitState = "idle" | "sending" | "success" | "error";

type FormState = {
  nombre: string;
  especialidad: string;
  institucion: string;
  email: string;
  whatsapp: string;
  esResidente: boolean;
  codigoDescuento: string;
};

const INITIAL_FORM: FormState = {
  nombre: "",
  especialidad: "",
  institucion: "",
  email: "",
  whatsapp: "",
  esResidente: false,
  codigoDescuento: "",
};

type Props = {
  slug: string;
};

function generateReferencia(): string {
  const digits = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `SONO-${digits}`;
}

export function CursoInscripcionPage({ slug }: Props) {
  const curso = useMemo(() => getCursoBySlug(slug), [slug]);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [referencia, setReferencia] = useState("");

  if (!curso) {
    return (
      <div className={styles.cursoPage}>
        <div className={styles.cursoShell}>
          <div className={styles.cursoNotFound}>
            <h1 className={styles.cursoNotFoundTitle}>Curso no encontrado</h1>
            <p className={styles.cursoNotFoundText}>
              No existe inscripción para &quot;{slug}&quot;.
            </p>
            <Link href="/" className={styles.cursoBack}>
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const precioActual = form.esResidente ? curso.precioResidente : curso.precio;
  const pagoUrl = form.esResidente ? curso.pagoUrlResidente : curso.pagoUrl;

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    if (!curso) return;

    const webhookUrl =
      "https://script.google.com/macros/s/AKfycbzMJh_7UaHXP1v-MvHlMN_Vql0Q8G-61ab_LY2A-PuG0CNDxUxo-v78dmCZVY3IQzw-oQ/exec";

    if (!form.nombre.trim() || !form.email.trim()) {
      setSubmitState("error");
      setErrorMessage("Completa nombre y email.");
      return;
    }

    setSubmitState("sending");

    const referenciaPago = generateReferencia();

    const payload = {
      nombre: form.nombre.trim(),
      especialidad: form.especialidad.trim(),
      institucion: form.institucion.trim(),
      email: form.email.trim(),
      whatsapp: `+52${form.whatsapp.replace(/\D/g, "")}`,
      esResidente: form.esResidente,
      codigoDescuento: form.codigoDescuento.trim(),
      referencia: referenciaPago,
      curso: curso.titulo,
      slug: curso.slug,
      precio: precioActual,
    };

    try {
      await fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Con no-cors la respuesta es opaca; asumir éxito si no hay excepción
      setReferencia(referenciaPago);
      setSubmitState("success");
    } catch (err) {
      setSubmitState("error");
      setErrorMessage(err instanceof Error ? err.message : "No se pudo enviar la inscripción.");
    }
  }

  return (
    <div className={styles.cursoPage}>
      <div className={styles.cursoShell}>
        <Link href="/" className={styles.cursoBack}>
          ← SONOCRÍTICO
        </Link>

        <header className={styles.cursoHero}>
          <p className={styles.cursoEyebrow}>Inscripción presencial</p>
          <h1 className={styles.cursoTitle}>{curso.titulo}</h1>
          <p className={styles.cursoDesc}>{curso.descripcion}</p>

          <div className={styles.cursoMetaGrid}>
            <div className={styles.cursoMetaItem}>
              <span className={styles.cursoMetaLabel}>Fecha</span>
              <span className={styles.cursoMetaValue}>{curso.fecha}</span>
            </div>
            <div className={styles.cursoMetaItem}>
              <span className={styles.cursoMetaLabel}>Horario</span>
              <span className={styles.cursoMetaValue}>{curso.horario}</span>
            </div>
            <div className={styles.cursoMetaItem}>
              <span className={styles.cursoMetaLabel}>Sede</span>
              <span className={styles.cursoMetaValue}>{curso.sede}</span>
            </div>
            <div className={styles.cursoMetaItem}>
              <span className={styles.cursoMetaLabel}>Cupo</span>
              <span className={styles.cursoMetaValue}>{curso.cupoMax} lugares</span>
            </div>
          </div>

          <div className={styles.cursoPriceBlock}>
            <div className={styles.cursoPrice}>{formatPrecio(precioActual)}</div>
            <p className={styles.cursoPriceNote}>
              {form.esResidente ? "Tarifa residente" : "Tarifa general"}
              {form.esResidente ? ` · General ${formatPrecio(curso.precio)}` : ""}
            </p>
          </div>
        </header>

        <section className={styles.cursoSection} aria-labelledby="curso-temario-title">
          <h2 className={styles.cursoSectionTitle} id="curso-temario-title">
            Temario
          </h2>
          <ul className={styles.cursoTemario}>
            {curso.temario.map((item) => (
              <li key={item} className={styles.cursoTemarioItem}>
                <span className={styles.cursoTemarioBullet} aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.cursoSection} aria-labelledby="curso-form-title">
          <h2 className={styles.cursoSectionTitle} id="curso-form-title">
            Formulario de inscripción
          </h2>

          <form className={styles.cursoForm} onSubmit={handleSubmit} noValidate>
            <div className={styles.cursoField}>
              <label className={styles.cursoLabel} htmlFor="curso-nombre">
                Nombre completo
              </label>
              <input
                id="curso-nombre"
                className={styles.cursoInput}
                type="text"
                autoComplete="name"
                required
                value={form.nombre}
                onChange={(e) => updateField("nombre", e.target.value)}
              />
            </div>

            <div className={styles.cursoField}>
              <label className={styles.cursoLabel} htmlFor="curso-especialidad">
                Especialidad
              </label>
              <input
                id="curso-especialidad"
                className={styles.cursoInput}
                type="text"
                value={form.especialidad}
                onChange={(e) => updateField("especialidad", e.target.value)}
                placeholder="Ej. Medicina crítica"
              />
            </div>

            <div className={styles.cursoField}>
              <label className={styles.cursoLabel} htmlFor="curso-institucion">
                Institución
              </label>
              <input
                id="curso-institucion"
                className={styles.cursoInput}
                type="text"
                value={form.institucion}
                onChange={(e) => updateField("institucion", e.target.value)}
                placeholder="Hospital o universidad"
              />
            </div>

            <div className={styles.cursoField}>
              <label className={styles.cursoLabel} htmlFor="curso-email">
                Email
              </label>
              <input
                id="curso-email"
                className={styles.cursoInput}
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </div>

            <div className={styles.cursoField}>
              <label className={styles.cursoLabel} htmlFor="curso-whatsapp">
                WhatsApp
              </label>
              <div className={styles.cursoPhoneRow}>
                <span className={styles.cursoPhonePrefix} aria-hidden>
                  +52
                </span>
                <input
                  id="curso-whatsapp"
                  className={styles.cursoInput}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  value={form.whatsapp}
                  onChange={(e) => updateField("whatsapp", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="55 1234 5678"
                />
              </div>
            </div>

            <div className={styles.cursoToggleRow}>
              <div>
                <span className={styles.cursoToggleLabel}>¿Eres residente?</span>
                <span className={styles.cursoToggleHint}>
                  Aplica tarifa {formatPrecio(curso.precioResidente)}
                </span>
              </div>
              <button
                type="button"
                className={`${styles.cursoToggle} ${form.esResidente ? styles.cursoToggleOn : ""}`}
                role="switch"
                aria-checked={form.esResidente}
                aria-label="¿Eres residente?"
                onClick={() => updateField("esResidente", !form.esResidente)}
              >
                <span className={styles.cursoToggleKnob} />
              </button>
            </div>

            {form.esResidente ? (
              <p className={styles.cursoResidentPrice}>
                Precio residente: <strong>{formatPrecio(curso.precioResidente)}</strong>
              </p>
            ) : null}

            <div className={styles.cursoField}>
              <label className={styles.cursoLabel} htmlFor="curso-codigo">
                Código de descuento (opcional)
              </label>
              <input
                id="curso-codigo"
                className={styles.cursoInput}
                type="text"
                value={form.codigoDescuento}
                onChange={(e) => updateField("codigoDescuento", e.target.value)}
                placeholder="Ej. SONO2026"
              />
            </div>

            {submitState === "sending" ? (
              <p className={`${styles.cursoStatus} ${styles.cursoStatusSending}`} role="status">
                Enviando inscripción…
              </p>
            ) : null}

            {submitState === "success" ? (
              <div className={styles.cursoSuccessBlock} role="status">
                <p className={`${styles.cursoStatus} ${styles.cursoStatusSuccess}`}>
                  Inscripción registrada exitosamente
                </p>
                <div className={styles.cursoReferenciaCard}>
                  <p className={styles.cursoReferenciaLabel}>Tu número de referencia de pago</p>
                  <p className={styles.cursoReferenciaCode}>{referencia}</p>
                  <p className={styles.cursoReferenciaHint}>
                    Anota este número. Al pagar en Mercado Pago, escríbelo en el campo
                    &quot;Concepto&quot; o &quot;Referencia&quot;
                  </p>
                </div>
              </div>
            ) : null}

            {submitState === "error" ? (
              <p className={`${styles.cursoStatus} ${styles.cursoStatusError}`} role="alert">
                {errorMessage || "Error al enviar. Intenta de nuevo."}
              </p>
            ) : null}

            {submitState !== "success" ? (
              <button
                type="submit"
                className={styles.cursoSubmit}
                disabled={submitState === "sending"}
              >
                {submitState === "sending" ? "Enviando…" : "Enviar inscripción"}
              </button>
            ) : (
              <a
                href={pagoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cursoPayBtn}
              >
                Pagar inscripción →
              </a>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}
