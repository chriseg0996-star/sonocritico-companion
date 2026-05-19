export type { MediaComparisonPair } from "@/lib/compare/types";
export { LUNG_MEDIA_COMPARISONS } from "@/lib/compare/lung-comparisons";
export {
  getAllComparisonPairs,
  getComparisonPairById,
  findComparisonForMediaId,
  getComparisonPairsForModule,
} from "@/lib/compare/registry";
export {
  loadCompareSession,
  saveCompareSession,
  type CompareSession,
} from "@/lib/compare/compare-session";
export { buildComparePath } from "@/lib/compare/compare-navigation";
