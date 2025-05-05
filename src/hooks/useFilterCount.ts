import { cupScoreRange as cupScoreRangeDefaults } from "@/consts/rangeConfig";
import { useSearchStore } from "@/stores/useSearchStore";

export function useFilterCount() {

    const { filters, cupScoreRange } = useSearchStore((s) => ({
        filters: s.filters,
        cupScoreRange: s.cupScoreRange
    }));
    const { min: minCup, max: maxCup } = cupScoreRangeDefaults

    const filterCount = Object.values(filters).filter(Boolean).length
    const cupScoreCount = cupScoreRange[0] >= minCup || cupScoreRange[1] <= maxCup ? 1 : 0;

    const totalCount = filterCount + cupScoreCount
    return totalCount

}
