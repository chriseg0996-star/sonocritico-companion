import {
  Brain,
  Heart,
  Scan,
  Syringe,
  Waves,
  Wind,
  type LucideIcon,
} from "lucide-react";
import type { KnowledgeDomainId } from "@/lib/progreso";

export const DOMAIN_ICONS: Record<KnowledgeDomainId, LucideIcon> = {
  pulmon: Wind,
  fast: Scan,
  eco: Heart,
  vexus: Waves,
  neuro: Brain,
  procedimientos: Syringe,
};
