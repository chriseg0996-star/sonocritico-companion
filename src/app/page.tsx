'use client'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div
      style={{
        background: '#080808',
        color: '#F0F4F8',
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        margin: 0,
        padding: 0,
      }}
    >
      {/* ── NAVBAR ── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'rgba(8,8,8,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #141414',
          padding: '0 24px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>🫁</span>
          <span
            style={{
              fontSize: '15px',
              fontWeight: '700',
              color: '#F0F4F8',
              letterSpacing: '0.5px',
            }}
          >
            SONOCRÍTICO
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            href="/login"
            style={{
              fontSize: '14px',
              color: '#6B7A8D',
              textDecoration: 'none',
            }}
          >
            Iniciar sesión
          </Link>
          <Link
            href="/dashboard"
            style={{
              background: '#4A9EFF',
              color: 'white',
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none',
            }}
          >
            Abrir app →
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div
        style={{
          paddingTop: '140px',
          paddingBottom: '100px',
          textAlign: 'center',
          maxWidth: '720px',
          margin: '0 auto',
          padding: '140px 24px 100px',
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#0D1B2E',
            border: '1px solid #1A3A5C',
            borderRadius: '20px',
            padding: '6px 16px',
            fontSize: '13px',
            color: '#4A9EFF',
            marginBottom: '32px',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#4A9EFF',
              display: 'inline-block',
            }}
          />
          Companion USG para UCI · v0.6.4
        </div>

        <h1
          style={{
            fontSize: 'clamp(52px, 9vw, 88px)',
            fontWeight: '800',
            letterSpacing: '-3px',
            margin: '0 0 24px',
            color: '#F0F4F8',
            lineHeight: '1',
          }}
        >
          SONOCRÍTICO
        </h1>

        <p
          style={{
            fontSize: 'clamp(18px, 2.5vw, 22px)',
            color: '#8FA7C4',
            margin: '0 0 12px',
            lineHeight: '1.5',
          }}
        >
          Protocolos POCUS · Atlas USG · Casos clínicos
        </p>
        <p
          style={{
            fontSize: '16px',
            color: '#4A4A5A',
            margin: '0 0 40px',
            lineHeight: '1.5',
          }}
        >
          Todo lo que necesitas en guardia. En una sola pantalla.
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/dashboard"
            style={{
              background: '#4A9EFF',
              color: 'white',
              padding: '14px 32px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Abrir app gratis →
          </Link>
          <Link
            href="/planes"
            style={{
              background: 'transparent',
              color: '#8FA7C4',
              padding: '14px 32px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '500',
              textDecoration: 'none',
              border: '1px solid #1E1E1E',
              display: 'inline-block',
            }}
          >
            Ver planes
          </Link>
        </div>

        {/* Social proof */}
        <p
          style={{
            fontSize: '13px',
            color: '#3A3A4A',
            marginTop: '20px',
          }}
        >
          Gratis · Sin registro · Funciona en móvil
        </p>
      </div>

      {/* ── STATS BAR ── */}
      <div style={{ borderTop: '1px solid #111', borderBottom: '1px solid #111', padding: '32px 24px' }}>
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '32px',
            textAlign: 'center',
          }}
        >
          {[
            { num: '14', label: 'Vistas clínicas' },
            { num: '8', label: 'Protocolos POCUS' },
            { num: '12+', label: 'Casos adaptativos' },
            { num: '4', label: 'Módulos core' },
          ].map(({ num, label }) => (
            <div key={label}>
              <div style={{ fontSize: '36px', fontWeight: '800', color: '#4A9EFF', lineHeight: '1' }}>{num}</div>
              <div style={{ fontSize: '13px', color: '#6B7A8D', marginTop: '6px' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── EL PROBLEMA ── */}
      <div style={{ padding: '80px 24px', maxWidth: '960px', margin: '0 auto' }}>
        <p
          style={{
            fontSize: '12px',
            color: '#4A9EFF',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '12px',
          }}
        >
          El problema
        </p>
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: '48px',
            color: '#F0F4F8',
            letterSpacing: '-1px',
          }}
        >
          POCUS en guardia, sin sistema
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {[
            {
              icon: '⏱',
              title: '4 pantallas, 0 segundos',
              desc: 'En guardia no hay tiempo para saltar entre PDFs, chats y galerías de imágenes sueltas.',
            },
            {
              icon: '📋',
              title: 'Protocolos dispersos',
              desc: 'BLUE, FAST, VExUS y RUSH viven en lugares distintos — sin un hilo clínico común.',
            },
            {
              icon: '🔍',
              title: 'Sin guía en tiempo real',
              desc: 'Falta un companion que oriente hallazgos, diferencial y siguiente paso al pie del paciente.',
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              style={{
                background: '#0E0E0E',
                border: '1px solid #1A1A1A',
                borderRadius: '20px',
                padding: '28px',
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>{icon}</div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#F0F4F8', margin: '0 0 10px' }}>
                {title}
              </h3>
              <p style={{ fontSize: '14px', color: '#5A6A7A', lineHeight: '1.6', margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── LA SOLUCIÓN ── */}
      <div style={{ padding: '0 24px 80px', maxWidth: '960px', margin: '0 auto' }}>
        <p
          style={{
            fontSize: '12px',
            color: '#4A9EFF',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '12px',
          }}
        >
          La solución
        </p>
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: '48px',
            color: '#F0F4F8',
            letterSpacing: '-1px',
          }}
        >
          Un solo flujo. Todo el paciente.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {[
            {
              icon: '🫁',
              color: '#4A9EFF',
              title: 'Atlas USG interactivo',
              desc: '14 vistas clínicas con hallazgos normales y patológicos. Filmstrip y búsqueda clínica.',
            },
            {
              icon: '📡',
              color: '#3ECF8E',
              title: 'Protocolos guiados',
              desc: 'BLUE · FAST · VExUS · RUSH. Árboles de decisión paso a paso adaptados a UCI.',
            },
            {
              icon: '⚡',
              color: '#F5A623',
              title: 'Companion en guardia',
              desc: 'Selecciona el síntoma → protocolo → atlas → diagnóstico diferencial en segundos.',
            },
          ].map(({ icon, color, title, desc }) => (
            <div
              key={title}
              style={{
                background: '#0E0E0E',
                border: `1px solid ${color}22`,
                borderTop: `3px solid ${color}`,
                borderRadius: '20px',
                padding: '28px',
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '16px' }}>{icon}</div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#F0F4F8', margin: '0 0 10px' }}>{title}</h3>
              <p style={{ fontSize: '14px', color: '#5A6A7A', lineHeight: '1.6', margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA FINAL ── */}
      <div style={{ borderTop: '1px solid #111', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🫁</div>
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: '800',
            color: '#F0F4F8',
            margin: '0 0 12px',
            letterSpacing: '-1px',
          }}
        >
          Listo para tu próxima guardia
        </h2>
        <p style={{ fontSize: '16px', color: '#6B7A8D', margin: '0 0 40px' }}>
          Gratis. Sin registro. Desde tu móvil.
        </p>

        <Link
          href="/dashboard"
          style={{
            display: 'inline-block',
            background: '#4A9EFF',
            color: 'white',
            padding: '16px 40px',
            borderRadius: '14px',
            fontSize: '17px',
            fontWeight: '700',
            textDecoration: 'none',
          }}
        >
          Abrir SONOCRÍTICO →
        </Link>

        <p style={{ fontSize: '13px', color: '#2A2A3A', marginTop: '24px' }}>
          © Christopher Godínez · Medicina Crítica · sonocritico.com
        </p>
      </div>
    </div>
  )
}
