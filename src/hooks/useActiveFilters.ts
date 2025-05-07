import { cupScoreRange as cupScoreRangeDefaults } from "@/consts/rangeConfig";
import { useSearchStore } from "@/stores/useSearchStore";

// Provides the active filter states and count
export function useActiveFilters() {

    // importing filters from search store
    const {
        filters,
        varietalFilters,
        cupScoreRange
    } = useSearchStore((s) => ({
        filters: s.filters,
        varietalFilters: s.varietalFilters,
        cupScoreRange: s.cupScoreRange
    }));

    // Active state of quality and sourcing filters
    const activeSQFilterKeys = Object.entries(filters)
        .filter(([_, value]) => value)
        .map(([key]) => key);
    const isSQFilterSet = activeSQFilterKeys.length > 0;

    // Active state of Cup Score filter
    const { min: minCup, max: maxCup } = cupScoreRangeDefaults;
    const isCupScoreSet = cupScoreRange[0] >= minCup || cupScoreRange[1] <= maxCup;
    const cupScoreCount = isCupScoreSet ? 1 : 0;

    //Active state of varietal filters
    const areVarietalsSet = Boolean(varietalFilters.length);
    const varietalCount = areVarietalsSet ? 1 : 0;

    // Active state of all filters
    const filterCount = activeSQFilterKeys.length + cupScoreCount + varietalCount;
    const isAnyFilterSet = filterCount > 0;

    return {
        activeSQFilterKeys,
        isSQFilterSet,
        isCupScoreSet,
        areVarietalsSet,
        isAnyFilterSet,
        filterCount
    }

}
