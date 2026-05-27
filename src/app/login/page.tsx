"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.border = "1px solid #4A9EFF";
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.border = "1px solid #2E2E2E";
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    if (typeof window !== "undefined") {
      const role = email === "instructor@demo.com" ? "instructor" : "estudiante";
      localStorage.setItem(
        "sc_user",
        JSON.stringify({
          email,
          nombre: email.split("@")[0],
          rol: role,
          plan: "free",
        }),
      );
    }
    router.push("/dashboard");
  };

  const handleGuest = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "sc_user",
        JSON.stringify({
          email: "",
          nombre: "Invitado",
          rol: "estudiante",
          plan: "free",
        }),
      );
    }
    router.push("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080808",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
        padding: "0 24px 24px",
        boxSizing: "border-box",
        width: "100%",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: "40px", textAlign: "center" }}>
        <div style={{ fontSize: "40px", marginBottom: "8px" }}>🫁</div>
        <div
          style={{
            fontSize: "18px",
            fontWeight: "700",
            color: "#F0F4F8",
            letterSpacing: "0.5px",
          }}
        >
          SONOCRÍTICO
        </div>
        <div style={{ fontSize: "13px", color: "#6B7A8D", marginTop: "4px" }}>
          Companion USG Crítico
        </div>
      </div>

      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#111111",
          border: "1px solid #242424",
          borderRadius: "24px",
          padding: "32px",
        }}
      >
        <h1
          style={{
            fontSize: "22px",
            fontWeight: "700",
            color: "#F0F4F8",
            margin: "0 0 6px",
          }}
        >
          Iniciar sesión
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "#6B7A8D",
            margin: "0 0 28px",
          }}
        >
          Companion USG Crítico
        </p>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                color: "#8FA7C4",
                marginBottom: "8px",
                fontWeight: "500",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="tu@hospital.mx"
              style={{
                width: "100%",
                background: "#1A1A1A",
                border: "1px solid #2E2E2E",
                borderRadius: "10px",
                padding: "12px 16px",
                fontSize: "15px",
                color: "#F0F4F8",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                color: "#8FA7C4",
                marginBottom: "8px",
                fontWeight: "500",
              }}
            >
              Contraseña
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  background: "#1A1A1A",
                  border: "1px solid #2E2E2E",
                  borderRadius: "10px",
                  padding: "12px 44px 12px 16px",
                  fontSize: "15px",
                  color: "#F0F4F8",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#6B7A8D",
                  cursor: "pointer",
                  fontSize: "16px",
                  padding: "4px",
                }}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
            <p
              style={{
                fontSize: "12px",
                color: "#444",
                margin: "8px 0 0",
              }}
            >
              Demo instructor: instructor@demo.com + cualquier contraseña
            </p>
          </div>

          {/* Botón principal */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: loading ? "#2A2A2A" : "#4A9EFF",
              color: loading ? "#666" : "white",
              border: "none",
              borderRadius: "10px",
              padding: "14px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              marginBottom: "12px",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

          {/* Invitado */}
          <button
            type="button"
            onClick={handleGuest}
            style={{
              width: "100%",
              background: "transparent",
              color: "#8FA7C4",
              border: "1px solid #2E2E2E",
              borderRadius: "10px",
              padding: "13px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              marginTop: "12px",
            }}
          >
            Continuar como invitado
          </button>
        </form>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "24px",
          fontSize: "13px",
          color: "#444",
          textAlign: "center",
        }}
      >
        <a href="/planes" style={{ color: "#6B7A8D", textDecoration: "none" }}>
          Ver planes Free y Pro
        </a>
        {" · "}
        <a href="/" style={{ color: "#6B7A8D", textDecoration: "none" }}>
          Inicio
        </a>
      </div>
    </div>
  );
}
