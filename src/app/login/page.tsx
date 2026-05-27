"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock, Mail, Shield } from "lucide-react";
import { Btn, Card, Input } from "@/components/ui";
import { useAuth } from "@/features/auth/useAuth";
import styles from "@/features/auth/auth.module.css";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAsGuest } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const result = login(email, password);
    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push("/dashboard");
  }

  function handleGuest() {
    loginAsGuest();
    router.push("/dashboard");
  }

  return (
    <main className={styles.authLoginPage}>
      <div className={styles.authLoginScan} aria-hidden />
      <div className={styles.authLoginWrap}>
        <header className={styles.authLoginHeader}>
          <div className={styles.authLoginIcon}>
            <Shield size={26} strokeWidth={1.5} />
          </div>
          <p className="brand-wordmark" style={{ fontSize: 14, marginBottom: 8 }}>
            SONOCRÍTICO
          </p>
          <p className="brand-tagline" style={{ margin: 0, textAlign: "center" }}>
            Visualiza el problema. Actúa con certeza.
          </p>
        </header>

        <Card className={styles.authLoginCard} glow>
          <h1 className={styles.authLoginTitle}>Iniciar sesión</h1>
          <p className={styles.authLoginSubtitle}>Acceso mock — listo para API</p>

          <label className={styles.authField}>
            <span className={styles.authLabel}>Email</span>
            <Input
              type="email"
              autoComplete="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              iconLeft={<Mail size={15} strokeWidth={1.5} className={styles.authIconLeft} />}
            />
          </label>

          <label className={styles.authField}>
            <span className={styles.authLabel}>Contraseña</span>
            <Input
              type={showPwd ? "text" : "password"}
              autoComplete="current-password"
              placeholder="········"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              iconLeft={<Lock size={15} strokeWidth={1.5} className={styles.authIconLeft} />}
              adornmentRight={
                <button
                  type="button"
                  className={styles.authPwdToggle}
                  onClick={() => setShowPwd((v) => !v)}
                  aria-label={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPwd ? <EyeOff size={15} strokeWidth={1.5} /> : <Eye size={15} strokeWidth={1.5} />}
                </button>
              }
            />
          </label>

          <p style={{ margin: "0 0 14px", fontSize: 11, color: "var(--text-muted)" }}>
            Demo instructor: <strong>instructor@demo.com</strong> + cualquier contraseña
          </p>

          {error ? <div className={styles.authError}>{error}</div> : null}

          <div className={styles.authActions}>
            <Btn variant="primary" fullWidth onClick={handleLogin} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 size={15} strokeWidth={1.5} style={{ animation: "auth-spin 1s linear infinite" }} />
                  Verificando…
                </>
              ) : (
                "Ingresar"
              )}
            </Btn>
            <button type="button" className={styles.authGuestLink} onClick={handleGuest}>
              Continuar como invitado
            </button>
          </div>
        </Card>

        <p className={styles.authFooterNote}>
          <Link href="/planes" style={{ color: "var(--accent)" }}>
            Ver planes Free y Pro
          </Link>
          {" · Companion USG"}
        </p>
      </div>

      <style>{`@keyframes auth-spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}
