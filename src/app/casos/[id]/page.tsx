"use client";
import { theme } from "@/lib/theme";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";
import { useAuth, LoadingScreen } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import { ScanLineCard, Badge, Btn } from "@/components/ui/base";
import { getModuleSlugForProtocol } from "@/lib/course-modules";
import { EchoMedia } from "@/components/media/EchoMedia";
import { getCase, getImage } from "@/lib/mock-data";
import { completeCase, saveQuizResult } from "@/lib/auth";
import { getStudyHref } from "@/lib/study-links";
import type { QuizQuestion } from "@/types";

type CaseStep = "presentation" | "images" | "questions" | "summary";

export default function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { user, loading } = useAuth("student");
  const router = useRouter();
  const [step, setStep] = useState<CaseStep>("presentation");
  const [currentImg, setCurrentImg] = useState(0);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [qResults, setQResults] = useState<boolean[]>([]);

  useEffect(() => {
    if (step !== "questions" || answered) return;
    const t = setInterval(() => {
      setTimeLeft((p) => {
        if (p <= 1) { clearInterval(t); handleAnswer(-1); return 0; }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [step, qIndex, answered]);

  if (loading || !user) return <LoadingScreen />;
  const caseData = getCase(resolvedParams.id);
  if (!caseData) return <div style={{ padding: 24, color: theme.brand.red }}>Caso no encontrado.</div>;

  const images = caseData.imageIds.map(getImage).filter(Boolean);
  const q: QuizQuestion = caseData.questions[qIndex];

  function handleAnswer(idx: number) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const correct = idx === q.correctIndex;
    setQResults((p) => [...p, correct]);
    saveQuizResult({ quizId: q.id, protocolRef: q.protocolRef, score: correct ? 100 : 0, answers: [idx], completedAt: new Date().toISOString(), timeSpentSeconds: 60 - timeLeft });
  }

  function nextQuestion() {
    if (!caseData) return;
    if (qIndex + 1 >= caseData.questions.length) {
      completeCase(caseData.id);
      setStep("summary");
    } else {
      setQIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
      setTimeLeft(60);
    }
  }

  const vitalColor = (val: number, normal: [number, number]) =>
    val < normal[0] || val > normal[1] ? theme.brand.red : theme.text.primary;

  const score = qResults.length ? Math.round((qResults.filter(Boolean).length / qResults.length) * 100) : 0;

  const stepTitles: Record<CaseStep, string> = {
    presentation: "Presentación",
    images: "Imágenes",
    questions: "Preguntas",
    summary: "Resumen",
  };

  return (
    <AppLayout user={user}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "16px 16px 32px" }}>

        {/* Back */}
        <div onClick={() => router.push("/casos")} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", color: theme.text.muted, marginBottom: 16, fontSize: 12 }}>
          <ArrowLeft size={14} strokeWidth={1.5} /> Casos clínicos
        </div>

        {/* Progress steps */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
          {(["presentation", "images", "questions", "summary"] as CaseStep[]).map((s, i) => (
            <div key={s} style={{ flex: 1 }}>
              <div style={{ height: 3, borderRadius: 2, background: step === s ? theme.brand.primary : (["presentation", "images", "questions", "summary"].indexOf(step) > i) ? theme.text.secondary : theme.bg.border, marginBottom: 4 }} />
              <div style={{ fontSize: 9, color: step === s ? theme.brand.primary : theme.text.muted, fontFamily: "'IBM Plex Mono', monospace", textAlign: "center" }}>
                {stepTitles[s]}
              </div>
            </div>
          ))}
        </div>

        {/* STEP: PRESENTATION */}
        {step === "presentation" && (
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 1, color: theme.text.primary, marginBottom: 4 }}>
              {caseData.title}
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              <Badge variant="gray">{caseData.patientAge} años · {caseData.patientSex === "M" ? "Masculino" : "Femenino"}</Badge>
              {caseData.tags.map((t) => <Badge key={t} variant="gray">{t}</Badge>)}
            </div>

            <ScanLineCard style={{ padding: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 10, color: theme.text.muted, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 8 }}>ESCENARIO CLÍNICO</div>
              <div style={{ fontSize: 13, color: theme.text.secondary, lineHeight: 1.7 }}>{caseData.scenario}</div>
            </ScanLineCard>

            {/* Vitals */}
            <ScanLineCard style={{ padding: 14, marginBottom: 20 }}>
              <div style={{ fontSize: 10, color: theme.text.muted, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 10 }}>SIGNOS VITALES</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                {[
                  { label: "FC", value: `${caseData.vitals.hr} lpm`, normal: [60, 100] as [number, number], num: caseData.vitals.hr },
                  { label: "TA", value: caseData.vitals.bp, normal: [90, 140] as [number, number], num: parseInt(caseData.vitals.bp) },
                  { label: "FR", value: `${caseData.vitals.rr} /min`, normal: [12, 20] as [number, number], num: caseData.vitals.rr },
                  { label: "SpO2", value: `${caseData.vitals.spo2}%`, normal: [95, 100] as [number, number], num: caseData.vitals.spo2 },
                  { label: "Temp", value: `${caseData.vitals.temp}°C`, normal: [36, 38] as [number, number], num: caseData.vitals.temp },
                  ...(caseData.vitals.map ? [{ label: "MAP", value: `${caseData.vitals.map} mmHg`, normal: [65, 100] as [number, number], num: caseData.vitals.map! }] : []),
                  ...(caseData.vitals.lactate ? [{ label: "Lactato", value: `${caseData.vitals.lactate} mmol/L`, normal: [0, 2] as [number, number], num: caseData.vitals.lactate! }] : []),
                ].map(({ label, value, normal, num }) => (
                  <div key={label} style={{ background: theme.bg.primary, borderRadius: 6, padding: "8px 10px" }}>
                    <div style={{ fontSize: 9, color: theme.text.muted, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 14, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, color: vitalColor(num, normal) }}>{value}</div>
                  </div>
                ))}
              </div>
            </ScanLineCard>

            <Btn variant="primary" fullWidth onClick={() => setStep("images")}>
              Ver imágenes ecográficas →
            </Btn>
          </div>
        )}

        {/* STEP: IMAGES */}
        {step === "images" && (
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 1, color: theme.text.primary, marginBottom: 16 }}>
              Imágenes ecográficas
            </div>

            {images.length > 0 && (
              <ScanLineCard style={{ padding: 0, overflow: "hidden", marginBottom: 12 }}>
                {/* Image display */}
                <div style={{ background: theme.bg.primary, padding: 16, position: "relative" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <div>
                      <div style={{ fontSize: 10, color: theme.brand.red, fontFamily: "'IBM Plex Mono', monospace" }}>
                        {images[currentImg]!.window}
                      </div>
                      <div style={{ fontSize: 12, color: theme.text.secondary }}>{images[currentImg]!.finding}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {images[currentImg]!.isPathological && <Badge variant="orange">Patológico</Badge>}
                      <div
                        onClick={() => setShowAnnotations(!showAnnotations)}
                        style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer", fontSize: 11, color: theme.text.muted }}
                      >
                        {showAnnotations ? <Eye size={14} strokeWidth={1.5} /> : <EyeOff size={14} strokeWidth={1.5} />}
                        Anots.
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      borderRadius: 8,
                      border: `1px solid ${theme.bg.border}`,
                      position: "relative",
                      overflow: "hidden",
                      minHeight: 200,
                    }}
                  >
                    <EchoMedia
                      image={images[currentImg]!}
                      showAnnotations={showAnnotations}
                      maxHeight={240}
                    />
                  </div>

                  <div style={{ fontSize: 12, color: theme.text.muted, marginTop: 10, lineHeight: 1.5 }}>
                    {images[currentImg]!.description}
                  </div>
                </div>

                {/* Navigation */}
                {images.length > 1 && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderTop: "1px solid #1E3448" }}>
                    <div
                      onClick={() => setCurrentImg((i) => Math.max(0, i - 1))}
                      style={{ cursor: currentImg > 0 ? "pointer" : "default", opacity: currentImg > 0 ? 1 : 0.3, display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: theme.text.secondary }}
                    >
                      <ChevronLeft size={14} strokeWidth={1.5} /> Anterior
                    </div>
                    <div style={{ fontSize: 10, fontFamily: "'IBM Plex Mono', monospace", color: theme.text.muted }}>
                      {currentImg + 1} / {images.length}
                    </div>
                    <div
                      onClick={() => setCurrentImg((i) => Math.min(images.length - 1, i + 1))}
                      style={{ cursor: currentImg < images.length - 1 ? "pointer" : "default", opacity: currentImg < images.length - 1 ? 1 : 0.3, display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: theme.text.secondary }}
                    >
                      Siguiente <ChevronRight size={14} strokeWidth={1.5} />
                    </div>
                  </div>
                )}
              </ScanLineCard>
            )}

            <div style={{ display: "flex", gap: 8 }}>
              <Btn variant="ghost" onClick={() => setStep("presentation")} style={{ flex: 1 }}>← Caso</Btn>
              <Btn variant="primary" onClick={() => setStep("questions")} style={{ flex: 2 }}>Responder preguntas →</Btn>
            </div>
          </div>
        )}

        {/* STEP: QUESTIONS */}
        {step === "questions" && q && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: theme.brand.red, fontFamily: "'IBM Plex Mono', monospace" }}>
                PREGUNTA {qIndex + 1} / {caseData.questions.length}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 40, height: 4, background: theme.bg.border, borderRadius: 2 }}>
                  <div style={{ width: `${Math.round((timeLeft / 60) * 100)}%`, height: "100%", background: timeLeft > 30 ? theme.text.primary : timeLeft > 15 ? theme.text.secondary : theme.brand.red, borderRadius: 2, transition: "width 1s linear" }} />
                </div>
                <span style={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", color: timeLeft > 30 ? theme.text.primary : theme.brand.red }}>{timeLeft}s</span>
              </div>
            </div>

            <ScanLineCard style={{ padding: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 14, color: theme.text.primary, lineHeight: 1.7, marginBottom: 16 }}>{q.question}</div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {q.options.map((opt, i) => {
                  let border: string = theme.bg.border;
                  let bg: string = "transparent";
                  let color: string = theme.text.secondary;
                  if (answered) {
                    if (i === q.correctIndex) { border = theme.accent.border; bg = theme.accent.muted; color = theme.text.primary; }
                    else if (i === selected) { border = theme.brand.red; bg = theme.brand.redMuted; color = theme.brand.red; }
                  } else if (selected === i) { border = theme.brand.red; bg = theme.brand.redMuted; color = theme.brand.red; }

                  return (
                    <div
                      key={i}
                      onClick={() => !answered && handleAnswer(i)}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, border: `1px solid ${border}`, background: bg, cursor: answered ? "default" : "pointer", transition: "all 200ms ease-out", color, fontSize: 13 }}
                    >
                      <div style={{ width: 22, height: 22, borderRadius: 5, background: theme.bg.primary, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, flexShrink: 0 }}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      {opt}
                    </div>
                  );
                })}
              </div>

              {q.imageId && (() => {
                const qImg = getImage(q.imageId);
                return qImg ? (
                  <div style={{ marginBottom: 14, borderRadius: 8, overflow: "hidden", border: `1px solid ${theme.bg.border}` }}>
                    <EchoMedia image={qImg} maxHeight={160} />
                  </div>
                ) : null;
              })()}

              {answered && (
                <div>
                  <div style={{ background: theme.accent.muted, border: `1px solid ${theme.accent.border}`, borderRadius: 8, padding: 12, marginTop: 14, fontSize: 12, color: theme.text.secondary, lineHeight: 1.7 }}>
                    <div style={{ fontSize: 10, color: theme.accent.soft, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 4 }}>EXPLICACIÓN</div>
                    {q.explanation}
                  </div>
                  {selected !== q.correctIndex && (
                    <Btn
                      variant="ghost"
                      fullWidth
                      style={{ marginTop: 8, fontSize: 11 }}
                      onClick={() =>
                        router.push(
                          getStudyHref({ protocolRef: q.protocolRef, imageId: q.imageId })
                        )
                      }
                    >
                      Repasar en el módulo →
                    </Btn>
                  )}
                  <Btn variant="primary" onClick={nextQuestion} fullWidth style={{ marginTop: 12 }}>
                    {qIndex + 1 >= caseData.questions.length ? "Ver resumen →" : "Siguiente pregunta →"}
                  </Btn>
                </div>
              )}
            </ScanLineCard>
          </div>
        )}

        {/* STEP: SUMMARY */}
        {step === "summary" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 56, letterSpacing: 2, color: score >= 70 ? theme.text.primary : theme.brand.red, lineHeight: 1 }}>
                {score}%
              </div>
              <div style={{ fontSize: 14, color: theme.text.secondary, marginTop: 4 }}>
                {qResults.filter(Boolean).length} / {qResults.length} correctas
              </div>
            </div>

            <ScanLineCard style={{ padding: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 10, color: theme.text.secondary, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 8 }}>PUNTO CLAVE</div>
              <div style={{ fontSize: 14, color: theme.text.primary, lineHeight: 1.7 }}>{caseData.teachingPoint}</div>
            </ScanLineCard>

            <ScanLineCard style={{ padding: 14, marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: theme.text.muted, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 8 }}>MÓDULOS RELACIONADOS</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {caseData.protocolRefs.map((ref) => {
                  const modSlug = getModuleSlugForProtocol(ref);
                  return (
                    <span
                      key={ref}
                      onClick={() =>
                        router.push(modSlug ? `/modulos/${modSlug}?tab=protocolo` : "/modulos")
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <Badge variant="brand">{ref} →</Badge>
                    </span>
                  );
                })}
              </div>
            </ScanLineCard>

            <div style={{ display: "flex", gap: 8 }}>
              <Btn variant="ghost" onClick={() => router.push("/casos")} style={{ flex: 1 }}>← Casos</Btn>
              <Btn variant="primary" onClick={() => router.push("/progreso")} style={{ flex: 1 }}>Mi progreso →</Btn>
            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
}
