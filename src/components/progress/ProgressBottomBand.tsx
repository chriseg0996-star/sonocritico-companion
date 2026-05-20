import type { DomainStats, EvolutionMilestone, KnowledgeDomainId } from "@/lib/progreso";
import { ProgressDomainsStrip } from "@/components/progress/ProgressDomainsStrip";
import { ProgressPanelEvolution } from "@/components/progress/ProgressPanelEvolution";
import styles from "@/components/progress/progress-page.module.css";

type Props = {
  domains: DomainStats[];
  activeId: KnowledgeDomainId | null;
  evolutionMilestones: EvolutionMilestone[];
  onSelectDomain: (id: KnowledgeDomainId) => void;
  className?: string;
};

export function ProgressBottomBand({
  domains,
  activeId,
  evolutionMilestones,
  onSelectDomain,
  className,
}: Props) {
  return (
    <div className={`${styles.bottomBand} ${className ?? ""}`}>
      <ProgressDomainsStrip domains={domains} activeId={activeId} onSelect={onSelectDomain} />
      <ProgressPanelEvolution milestones={evolutionMilestones} />
    </div>
  );
}
