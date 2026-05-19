"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import type { Protocol } from "@/lib/protocols/types";
import styles from "@/components/protocols/protocol.module.css";

type Props = {
  protocols: Protocol[];
};

export function ProtocolList({ protocols }: Props) {
  const router = useRouter();

  if (protocols.length === 0) {
    return <p className={styles.empty}>No hay protocolos disponibles.</p>;
  }

  return (
    <div className={styles.list}>
      {protocols.map((protocol) => (
        <button
          key={protocol.id}
          type="button"
          className={styles.listCard}
          onClick={() => router.push(`/protocolos/${protocol.slug}`)}
        >
          <div>
            <p className={styles.listTitle}>{protocol.title}</p>
            <p className={styles.listMeta}>
              {protocol.subtitle}
              {protocol.estimatedMinutes ? ` · ~${protocol.estimatedMinutes} min` : ""}
            </p>
          </div>
          <span className={styles.tag}>{protocol.tag}</span>
          <ChevronRight size={16} strokeWidth={1.5} color="#5c6573" aria-hidden />
        </button>
      ))}
    </div>
  );
}
