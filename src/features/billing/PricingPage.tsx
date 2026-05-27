"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Btn, Card, Chip } from "@/components/ui";
import { useAuthOptional } from "@/features/auth/AuthProvider";
import { PLANS } from "@/features/billing/data/plans";
import styles from "@/features/billing/billing.module.css";

export function PricingPage() {
  const router = useRouter();
  const auth = useAuthOptional();

  const startFree = () => {
    if (!auth?.isAuthenticated) {
      auth?.loginAsGuest();
    }
    router.push("/dashboard");
  };

  const handleUpgrade = () => {
    if (!auth) return;
    if (auth.isAuthenticated) {
      auth.setPlan("pro");
    } else {
      const result = auth.login("pro@demo.com", "demo");
      if (!result.ok) return;
      auth.setPlan("pro");
    }
    router.push("/dashboard");
  };

  return (
    <div className={styles.billingPage}>
      <header className={styles.billingHeader}>
        <p className={styles.billingEyebrow}>Planes</p>
        <h1 className={styles.billingTitle}>Elige tu acceso</h1>
        <p className={styles.billingSubtitle}>
          Demo sin pago real — la arquitectura está lista para billing con API.
        </p>
      </header>

      <div className={styles.billingGrid}>
        {PLANS.map((plan) => {
          const isPro = plan.id === "pro";
          return (
            <Card
              key={plan.id}
              className={`${styles.billingPlanCard}${isPro ? ` ${styles.billingPlanCardPro}` : ""}`}
              glow={isPro}
            >
              <div className={styles.billingPlanHead}>
                <div>
                  <h2 className={styles.billingPlanName}>{plan.nombre}</h2>
                  <p className={styles.billingPrice}>
                    {plan.precio === 0 ? (
                      "Gratis"
                    ) : (
                      <>
                        ${plan.precio}
                        <span className={styles.billingPriceUnit}> MXN / mes</span>
                      </>
                    )}
                  </p>
                </div>
                {isPro ? <Chip variant="brand">Recomendado</Chip> : <Chip variant="gray">Básico</Chip>}
              </div>
              <ul className={styles.billingFeatures}>
                {plan.features.map((feature) => (
                  <li key={feature} className={styles.billingFeature}>
                    <Check size={14} className={styles.billingFeatureMark} aria-hidden />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {isPro ? (
                <Btn variant="primary" fullWidth onClick={handleUpgrade}>
                  Upgrade a Pro
                </Btn>
              ) : (
                <Btn variant="secondary" fullWidth onClick={startFree}>
                  Comenzar gratis
                </Btn>
              )}
            </Card>
          );
        })}
      </div>

      <p className={styles.billingNote}>
        Los pagos se conectarán en una fase posterior (Stripe / Supabase). Por ahora solo se
        actualiza el plan en localStorage.
      </p>
    </div>
  );
}
