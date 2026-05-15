"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Activity, BookOpen, LogOut, Users } from "lucide-react";
import { getStoredUser, logout } from "@/lib/auth";
import { ScanLineCard, Badge, ProgressBar } from "@/components/ui/base";
import { courseModules } from "@/lib/course-modules";
import { mockStudents, clinicalCases, mockCourse } from "@/lib/mock-data";
import { theme } from "@/lib/theme";
import type { User } from "@/types";

export default function InstructorPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const u = getStoredUser();
    if (!u || u.role !== "instructor") { router.push("/login"); return; }
    setUser(u);
  }, [router]);

  if (!user) return null;

  const moduleCount = courseModules.length;
  const avgModules = Math.round(
    mockStudents.reduce((s, st) => s + (st.progress.completedProtocols?.length ?? 0), 0) / mockStudents.length
  );
  const avgCases = Math.round(mockStudents.reduce((s, st) => s + st.progress.completedCases.length, 0) / mockStudents.length);

  return (
    <div style={{ minHeight: "100vh", background: theme.bg.primary, color: theme.text.primary }}>
      {/* Header */}
      <div style={{ background: theme.bg.card, borderBottom: `1px solid ${theme.bg.border}`, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 2, color: theme.text.primary }}>
            SONOCRÍTICO <span style={{ color: theme.brand.primary }}>MX</span>
          </div>
          <div style={{ fontSize: 10, color: theme.text.muted, fontFamily: "'IBM Plex Mono', monospace" }}>Panel Instructor · {mockCourse.name}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Badge variant="brand">{mockCourse.accessCode}</Badge>
          <div onClick={() => { logout(); router.push("/login"); }} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: theme.text.muted }}>
            <LogOut size={14} strokeWidth={1.5} /> Salir
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 16px 32px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 20 }}>
          {[
            { icon: Users, value: mockStudents.length, label: "Alumnos activos", color: theme.text.primary },
            { icon: BookOpen, value: avgModules, label: "Mód. promedio", color: theme.brand.primary },
            { icon: Activity, value: avgCases, label: "Casos promedio", color: theme.text.secondary },
          ].map(({ icon: Icon, value, label, color }) => (
            <ScanLineCard key={label} style={{ padding: "12px 14px", textAlign: "center" }}>
              <Icon size={18} strokeWidth={1.5} color={color} style={{ margin: "0 auto 6px" }} />
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color, lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 10, color: theme.text.muted, marginTop: 2 }}>{label}</div>
            </ScanLineCard>
          ))}
        </div>

        {/* Student table */}
        <div style={{ fontSize: 10, color: theme.text.muted, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: 1, marginBottom: 8 }}>ALUMNOS ({mockStudents.length})</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {mockStudents.map((st) => {
            const protoPct = Math.round((st.progress.completedProtocols.length / moduleCount) * 100);
            const casePct = Math.round((st.progress.completedCases.length / clinicalCases.length) * 100);
            return (
              <ScanLineCard key={st.id} style={{ padding: "12px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: theme.accent.muted, border: `1px solid ${theme.accent.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: theme.brand.primary, fontWeight: 500, flexShrink: 0 }}>
                    {st.initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 500, color: theme.text.primary }}>{st.name}</div>
                        <div style={{ fontSize: 10, color: theme.text.muted }}>{st.specialty}</div>
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <Badge variant={protoPct === 100 ? "white" : protoPct > 0 ? "brand" : "gray"}>{st.progress.completedProtocols.length}/{moduleCount} mód.</Badge>
                        <Badge variant={casePct === 100 ? "white" : casePct > 0 ? "brand" : "gray"}>{st.progress.completedCases.length}/{clinicalCases.length} casos</Badge>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <div style={{ flex: 1 }}><ProgressBar value={protoPct} color={protoPct === 100 ? theme.text.primary : theme.brand.primary} height={3} /></div>
                      <span style={{ fontSize: 9, color: theme.text.muted, fontFamily: "'IBM Plex Mono', monospace", width: 28, textAlign: "right" }}>{protoPct}%</span>
                    </div>
                  </div>
                </div>
              </ScanLineCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
