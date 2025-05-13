// hooks/useSearchParams.ts
import { useMemo } from "react";
import { useSearchStore } from "@/stores/useSearchStore";
import { usePaginationStore } from "@/stores/usePaginationStore";
import type { SearchQueryParams } from "@/types/search";

export function useSearchParams(): Omit<SearchQueryParams, 'page' | 'page_size'> & {
    page: number;
    page_size: number;
} {
    const [cupScoreRange, query, filters, sortedBy, varietalFilters, processFilters, countryFilters] = useSearchStore(
        s => [s.cupScoreRange, s.query, s.filters, s.sortedBy, s.varietalFilters, s.processFilters, s.countryFilters] as const
    );

    const [page, pageSize] = usePaginationStore(
        s => [s.page, s.pageSize] as const
    );

    return useMemo(() => ({
        q: query || undefined,
        ...filters,
        varietals: varietalFilters,
        processes: processFilters,
        countries: countryFilters,
        sort_by: sortedBy,
        page,
        page_size: pageSize,
        cup_score_min: cupScoreRange[0],
        cup_score_max: cupScoreRange[1],
    }), [query, filters, sortedBy, page, pageSize, cupScoreRange, varietalFilters, processFilters, countryFilters]);
}
