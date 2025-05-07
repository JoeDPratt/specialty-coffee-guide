import { cupScoreRange as cupScoreRangeDefaults } from "@/consts/rangeConfig";
import { useSearchStore } from "@/stores/useSearchStore";

// Provides the active filter states and count
export function useActiveFilters() {

    const { min: minCup, max: maxCup } = cupScoreRangeDefaults
    const { filters, cupScoreRange } = useSearchStore((s) => ({
        filters: s.filters,
        cupScoreRange: s.cupScoreRange
    }));

    const activeSQFilterKeys = Object.entries(filters)
        .filter(([_, value]) => value)
        .map(([key]) => key);

    const isCupScoreSet = cupScoreRange[0] >= minCup || cupScoreRange[1] <= maxCup
    const isSQFilterSet = activeSQFilterKeys.length > 0;
    const cupScoreCount = isCupScoreSet ? 1 : 0;
    const filterCount = activeSQFilterKeys.length + cupScoreCount
    const isAnyFilterSet = filterCount > 0;

    return {
        activeSQFilterKeys,
        isSQFilterSet,
        isCupScoreSet,
        isAnyFilterSet,
        filterCount
    }

}
