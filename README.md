# 🫁 SONOCRÍTICO — Companion USG Crítico

> Visualiza el problema. Actúa con certeza. Marca la diferencia.

Companion clínico de decisión para médicos en cuidados intensivos.  
Protocolos · Atlas · Entrenamiento · Guía en tiempo real — en un solo flujo.

**Demo en vivo → [chriseg0996-star.github.io/sonocritico-companion](https://chriseg0996-star.github.io/sonocritico-companion/dashboard/)**

---

## Qué hace

SONOCRÍTICO conecta protocolos de ultrasonido point-of-care, atlas anatómico,
casos clínicos adaptativos y un companion en tiempo real en un solo flujo diagnóstico —
diseñado para médicos intensivistas que tienen 4 pantallas y 0 segundos.

---

## Roadmap

| Fase | Nombre | Estado |
|------|--------|--------|
| F1 | Foundation — HUD, Dashboard, Sidebar | ✅ 100% |
| F2 | Atlas & Viewer — 14 vistas clínicas | ✅ 100% |
| F3 | Motor de Protocolos — BLUE, FAST, VExUS, RUSH | ✅ 100% |
| F4 | Training — Casos adaptativos, scoring, progreso | ✅ 100% |
| F5 | Companion — Guard mode, workflow, diagnóstico diferencial | 🟡 60% |
| F6 | Dashboard Instructor | ⚪ Pendiente |
| F7 | SaaS — Auth, billing, multi-tenant | ⚪ Pendiente |

**Versión actual: v0.6.4** — F5.4 Multi-window Companion en desarrollo.

---

## Stack tecnológico

- **Next.js** (App Router) · TypeScript · Tailwind CSS
- Export estático → GitHub Pages
- Mobile-first (390px) · UI dark estilo workstation clínico

---

## Desarrollo local

```bash
npm install
npm run dev       # localhost:3000
npm run build     # export estático — verificar antes de cada push
```

---

## Reglas de arquitectura

Las nuevas features van en `src/features/<nombre>/` o `src/components/clinical/<nombre>/`.  
El shell, sidebar, Hero y tokens CSS están congelados en el commit `ea27bc6`.  
Leer `AGENTS.md`, `BASELINE-UI.md` y `UI_REGISTRY.md` antes de contribuir.

---

## Autor

**Christopher Godínez** · Medicina Crítica  
Construido con Claude + Cursor

---

*SONOCRÍTICO es una herramienta de educación clínica, no un sustituto del juicio médico.*
