// stores/useSearchStore.ts
import { FilterKey, filterConfig } from '@/consts/filterConfig';
import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { SearchQueryParams } from '@/types/search';
import { useHydrateFilters } from '@/hooks/useHydrateFilterParams';

export type WeightOption = "250" | "1000";
export type ViewMode = "grid" | "list";
export type SortOption = "price_low" | "price_high" | "cup_score_high";

type SearchState = {
    isSearchOpen: boolean;
    openSearch: () => void;
    closeSearch: () => void;
    toggleSearch: () => void;

    query: string;
    setQuery: (q: string) => void;

    totalResults: number;
    setTotalResults: (results: number) => void;

    filters: Record<FilterKey, boolean>;
    setFilters: (filters: Record<FilterKey, boolean>) => void;

    cupScoreRange: [number, number];
    setCupScoreRange: (range: [number, number]) => void;

    selectedWeight: WeightOption;
    setSelectedWeight: (weight: WeightOption) => void;

    selectedView: ViewMode;
    setSelectedView: (view: ViewMode) => void;

    sortedBy: SortOption;
    setSortedBy: (sort: SortOption) => void;

    hydrate: (params: SearchQueryParams) => void;
};

const initialFilters: Record<FilterKey, boolean> = Object.keys(filterConfig).reduce((acc, key) => {
    acc[key as FilterKey] = false;
    return acc;
}, {} as Record<FilterKey, boolean>);

export const useSearchStore = createWithEqualityFn<SearchState>()(
    (set, get) => ({
        isSearchOpen: false,
        openSearch: () => set({ isSearchOpen: true }),
        closeSearch: () => set({ isSearchOpen: false }),
        toggleSearch: () => set((s) => ({ isSearchOpen: !s.isSearchOpen })),

        query: '',
        setQuery: (query) => set({ query }),

        totalResults: 0,
        setTotalResults: (results) => set({ totalResults: results }),

        filters: initialFilters,
        setFilters: (filters) => set({ filters }),

        cupScoreRange: [74, 101],
        setCupScoreRange: (range) => set({ cupScoreRange: range }),

        selectedWeight: "250",
        setSelectedWeight: (weight) => set({ selectedWeight: weight }),

        selectedView: "list",
        setSelectedView: (view) => set({ selectedView: view }),

        sortedBy: "price_low",
        setSortedBy: (sort) => set({ sortedBy: sort }),

        hydrate: (params) => {
            const { q, sort_by, cup_score_min, cup_score_max, ...rest } = params;
            set((s) => ({
                query: q ?? s.query,
                sortedBy: sort_by ?? s.sortedBy,
                filters: useHydrateFilters(params),
                cupScore: [
                    cup_score_min ?? s.cupScoreRange[0],
                    cup_score_max ?? s.cupScoreRange[1],
                ],
            }));
        }
    }),
    shallow
);
