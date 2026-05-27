"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { PageShell } from "@/components/layout/PageShell";
import { InstructorDashboard } from "@/features/instructor";
import type { User } from "@/types";

/** Usuario demo — sin auth hasta conectar backend. */
const DEMO_INSTRUCTOR: User = {
  id: "instructor-demo",
  email: "instructor@sonocritico.mx",
  name: "Dr. Instructor Demo",
  specialty: "uci",
  role: "instructor",
  courseCode: "SONO-2024",
  initials: "ID",
};

export default function InstructorPage() {
  return (
    <AppLayout user={DEMO_INSTRUCTOR}>
      <PageShell>
        <InstructorDashboard />
      </PageShell>
    </AppLayout>
  );
}
