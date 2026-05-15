"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock, Mail, Shield } from "lucide-react";
import { login } from "@/lib/auth";
import { Btn } from "@/components/ui/base";
import { theme } from "@/lib/theme";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");
    if (!email || !password || !code) {
      setError("Completa todos los campos.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = login(email, password, code.toUpperCase());
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    const role = result.user!.role;
    router.push(role === "instructor" ? "/instructor" : "/dashboard");
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: theme.bg.primary,
    border: `1px solid ${theme.bg.border}`,
    borderRadius: theme.radius.sm,
    padding: "11px 12px 11px 40px",
    fontSize: 13,
    color: theme.text.primary,
    fontFamily: "'IBM Plex Sans', sans-serif",
    outline: "none",
    transition: "border-color 200ms ease-out",
  };

  const focusBorder = theme.accent.borderStrong;
  const blurBorder = theme.bg.border;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: theme.bg.primary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.006) 3px, rgba(255,255,255,0.006) 4px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ width: "100%", maxWidth: 420, position: "relative" }}>
        <header style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: theme.radius.md,
              background: theme.accent.muted,
              border: `1px solid ${theme.accent.border}`,
              marginBottom: 18,
            }}
          >
            <Shield size={26} color={theme.accent.primary} strokeWidth={1.5} />
          </div>
          <p className="brand-wordmark" style={{ fontSize: 14, marginBottom: 8 }}>
            SONOCRÍTICO
          </p>
          <p className="brand-tagline" style={{ margin: 0, textAlign: "center" }}>
            Visualiza el problema. Actúa con certeza.
          </p>
        </header>

        <div
          className="scan-line"
          style={{
            background: theme.bg.card,
            border: `1px solid ${theme.bg.border}`,
            borderRadius: theme.radius.lg,
            padding: 28,
            boxShadow: theme.shadow.card,
          }}
        >
          <h1 style={{ fontSize: 16, fontWeight: 600, color: theme.text.primary, margin: "0 0 4px" }}>
            Acceso al curso
          </h1>
          <p style={{ fontSize: 12, color: theme.text.muted, margin: "0 0 22px" }}>
            Credenciales y código de curso
          </p>

          <label style={{ display: "block", marginBottom: 12 }}>
            <span style={{ fontSize: 10, color: theme.text.secondary, letterSpacing: "0.06em", fontWeight: 600 }}>
              EMAIL
            </span>
            <div style={{ position: "relative", marginTop: 6 }}>
              <Mail
                size={15}
                strokeWidth={1.5}
                style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: theme.text.muted }}
              />
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = focusBorder)}
                onBlur={(e) => (e.target.style.borderColor = blurBorder)}
              />
            </div>
            <span style={{ fontSize: 10, color: theme.text.muted, marginTop: 4, display: "block" }}>
              instructor@... para rol instructor
            </span>
          </label>

          <label style={{ display: "block", marginBottom: 12 }}>
            <span style={{ fontSize: 10, color: theme.text.secondary, letterSpacing: "0.06em", fontWeight: 600 }}>
              CONTRASEÑA
            </span>
            <div style={{ position: "relative", marginTop: 6 }}>
              <Lock
                size={15}
                strokeWidth={1.5}
                style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: theme.text.muted }}
              />
              <input
                type={showPwd ? "text" : "password"}
                placeholder="········"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                style={{ ...inputStyle, paddingRight: 40 }}
                onFocus={(e) => (e.target.style.borderColor = focusBorder)}
                onBlur={(e) => (e.target.style.borderColor = blurBorder)}
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: theme.text.muted,
                  background: "none",
                  border: "none",
                  padding: 0,
                }}
              >
                {showPwd ? <EyeOff size={15} strokeWidth={1.5} /> : <Eye size={15} strokeWidth={1.5} />}
              </button>
            </div>
          </label>

          <label style={{ display: "block", marginBottom: 20 }}>
            <span style={{ fontSize: 10, color: theme.text.secondary, letterSpacing: "0.06em", fontWeight: 600 }}>
              CÓDIGO DE CURSO
            </span>
            <div style={{ position: "relative", marginTop: 6 }}>
              <Shield
                size={15}
                strokeWidth={1.5}
                style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: theme.text.muted }}
              />
              <input
                type="text"
                placeholder="SONO2024"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                style={{ ...inputStyle, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: 2 }}
                onFocus={(e) => (e.target.style.borderColor = focusBorder)}
                onBlur={(e) => (e.target.style.borderColor = blurBorder)}
              />
            </div>
          </label>

          {error && (
            <div
              style={{
                background: theme.state.errorMuted,
                border: `1px solid ${theme.state.errorBorder}`,
                borderRadius: theme.radius.sm,
                padding: "8px 12px",
                fontSize: 12,
                color: theme.state.error,
                marginBottom: 16,
              }}
            >
              {error}
            </div>
          )}

          <Btn variant="primary" fullWidth onClick={handleLogin} disabled={loading}>
            {loading ? (
              <>
                <Loader2 size={15} strokeWidth={1.5} style={{ animation: "spin 1s linear infinite" }} />
                Verificando...
              </>
            ) : (
              "Ingresar al curso"
            )}
          </Btn>
        </div>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 10, color: theme.text.muted }}>
          Companion USG · UCI
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}
