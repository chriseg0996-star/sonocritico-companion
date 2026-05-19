"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { buildProtocolStepUrl } from "@/lib/protocols/protocol-navigation";
import styles from "@/components/compare/compare.module.css";

type Props = {
  protocolSlug: string;
  bibliographyHref: string;
};

export function CompareFooter({ protocolSlug, bibliographyHref }: Props) {
  const router = useRouter();

  return (
    <footer className={styles.footer}>
      <Link
        href={buildProtocolStepUrl(protocolSlug, "pattern")}
        className={styles.footerBtn}
      >
        Volver al protocolo
      </Link>
      <button
        type="button"
        className={styles.footerBtnSecondary}
        onClick={() => router.push(bibliographyHref)}
      >
        Ver bibliografía
      </button>
    </footer>
  );
}
