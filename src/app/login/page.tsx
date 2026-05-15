"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock, Mail, Shield } from "lucide-react";
import { login } from "@/lib/auth";

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
    background: "#000000",
    border: "1px solid #2A2A2A",
    borderRadius: 8,
    padding: "11px 12px 11px 40px",
    fontSize: 13,
    color: "#FFFFFF",
    fontFamily: "'IBM Plex Sans', sans-serif",
    outline: "none",
    transition: "border-color 200ms ease-out",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      {/* Scanline bg */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(220,38,38,0.008) 3px, rgba(220,38,38,0.008) 4px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ width: "100%", maxWidth: 400, position: "relative" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "rgba(220,38,38,0.1)",
              border: "1px solid rgba(220,38,38,0.25)",
              marginBottom: 16,
            }}
          >
            <Shield size={26} color="#DC2626" strokeWidth={1.5} />
          </div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, letterSpacing: 3, color: "#DC2626", lineHeight: 1 }}>
            SONOCRÍTICO
          </div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, letterSpacing: 5, color: "#525252", marginTop: -2 }}>
            MX
          </div>
          <div style={{ fontSize: 12, color: "#525252", marginTop: 8, fontStyle: "italic" }}>
            "Visualiza el problema. Actúa con certeza."
          </div>
        </div>

        {/* Card */}
        <div
          className="scan-line"
          style={{
            background: "#0F0F0F",
            border: "1px solid #2A2A2A",
            borderRadius: 12,
            padding: 24,
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 500, color: "#FFFFFF", marginBottom: 4 }}>
            Acceso al curso
          </div>
          <div style={{ fontSize: 12, color: "#525252", marginBottom: 20 }}>
            Ingresa con tus credenciales y código de curso
          </div>

          {/* Email */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#A3A3A3", marginBottom: 6, fontFamily: "'IBM Plex Mono', monospace" }}>
              EMAIL
            </div>
            <div style={{ position: "relative" }}>
              <Mail size={15} strokeWidth={1.5} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#525252" }} />
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "rgba(220,38,38,0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "#2A2A2A")}
              />
            </div>
            <div style={{ fontSize: 10, color: "#525252", marginTop: 4 }}>
              Tip: usa &ldquo;instructor@...&rdquo; para acceso como instructor
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#A3A3A3", marginBottom: 6, fontFamily: "'IBM Plex Mono', monospace" }}>
              CONTRASEÑA
            </div>
            <div style={{ position: "relative" }}>
              <Lock size={15} strokeWidth={1.5} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#525252" }} />
              <input
                type={showPwd ? "text" : "password"}
                placeholder="········"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                style={{ ...inputStyle, paddingRight: 40 }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(220,38,38,0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "#2A2A2A")}
              />
              <div
                onClick={() => setShowPwd(!showPwd)}
                style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#525252" }}
              >
                {showPwd ? <EyeOff size={15} strokeWidth={1.5} /> : <Eye size={15} strokeWidth={1.5} />}
              </div>
            </div>
          </div>

          {/* Course code */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: "#A3A3A3", marginBottom: 6, fontFamily: "'IBM Plex Mono', monospace" }}>
              CÓDIGO DE CURSO
            </div>
            <div style={{ position: "relative" }}>
              <Shield size={15} strokeWidth={1.5} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#525252" }} />
              <input
                type="text"
                placeholder="SONO2024"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                style={{ ...inputStyle, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: 2 }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(220,38,38,0.4)")}
                onBlur={(e) => (e.target.style.borderColor = "#2A2A2A")}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.25)",
                borderRadius: 8,
                padding: "8px 12px",
                fontSize: 12,
                color: "#EF4444",
                marginBottom: 16,
              }}
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <div
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 8,
              background: loading ? "rgba(220,38,38,0.05)" : "rgba(220,38,38,0.12)",
              border: "1px solid rgba(220,38,38,0.3)",
              color: "#DC2626",
              fontSize: 13,
              fontWeight: 500,
              fontFamily: "'IBM Plex Sans', sans-serif",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "all 200ms ease-out",
              userSelect: "none",
            }}
          >
            {loading ? (
              <>
                <Loader2 size={15} strokeWidth={1.5} style={{ animation: "spin 1s linear infinite" }} />
                Verificando...
              </>
            ) : (
              "Ingresar al curso"
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 20, fontSize: 10, color: "#2A2A2A" }}>
          SonoCrítico MX · Ultrasonografía Crítica
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
