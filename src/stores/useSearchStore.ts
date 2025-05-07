// stores/useSearchStore.ts
import { FilterKey, filterConfig } from '@/consts/filterConfig';
import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { SearchQueryParams } from '@/types/search';
import { useHydrateFilters } from '@/hooks/useHydrateFilterParams';
import { cupScoreRange as cupScoreConfig } from '@/consts/rangeConfig';

export type WeightOption = "250" | "1000";
export type ViewMode = "grid" | "list";
export type SortOption = "price_low" | "price_high" | "cup_score_high";

const defaultCupScoreRange: [number, number] = [cupScoreConfig.min, cupScoreConfig.max];
const outOfBoundsCupScore = [(defaultCupScoreRange[0] - 1), (defaultCupScoreRange[1] + 1)] as [number, number]

type SearchState = {
    isSearchOpen: boolean;
    openSearch: () => void;
    closeSearch: () => void;
    toggleSearch: () => void;

    areFiltersOpen: boolean;
    openFilters: () => void;
    closeFilters: () => void;
    toggleFilters: () => void;

    query: string;
    setQuery: (q: string) => void;

    totalResults: number;
    setTotalResults: (results: number) => void;

    filters: Record<FilterKey, boolean>; // Base attribute filters - Organic etc
    setFilters: (
        update:
            | Record<FilterKey, boolean>
            | ((prev: Record<FilterKey, boolean>) => Record<FilterKey, boolean>)
    ) => void;

    varietalFilters: string[];
    setVarietalFilters: (filters: string[]) => void;
    toggleVarietalFilter: (key: string) => void;

    cupScoreRange: [number, number];
    setCupScoreRange: (range: [number, number]) => void;

    selectedWeight: WeightOption;
    setSelectedWeight: (weight: WeightOption) => void;

    selectedView: ViewMode;
    setSelectedView: (view: ViewMode) => void;

    sortedBy: SortOption;
    setSortedBy: (sort: SortOption) => void;

    hydrate: (params: SearchQueryParams) => void;

    clearAllFilters: () => void;
};

export const initialFilters: Record<FilterKey, boolean> = Object.keys(filterConfig).reduce((acc, key) => {
    acc[key as FilterKey] = false;
    return acc;
}, {} as Record<FilterKey, boolean>);

export const useSearchStore = createWithEqualityFn<SearchState>()(
    (set, get) => ({
        isSearchOpen: false,
        openSearch: () => set({ isSearchOpen: true }),
        closeSearch: () => set({ isSearchOpen: false }),
        toggleSearch: () => set((s) => ({ isSearchOpen: !s.isSearchOpen })),

        areFiltersOpen: false,
        openFilters: () => set({ areFiltersOpen: true }),
        closeFilters: () => set({ areFiltersOpen: false }),
        toggleFilters: () => set((s) => ({ areFiltersOpen: !s.areFiltersOpen })),

        query: '',
        setQuery: (query: string) => set({ query: query.trim() }),

        totalResults: 0,
        setTotalResults: (results) => set({ totalResults: results }),

        filters: initialFilters,
        setFilters: (update) =>
            set((state) => ({
                filters:
                    typeof update === "function"
                        ? update(state.filters)
                        : update,
            })),

        varietalFilters: [],
        setVarietalFilters: (filters) => set({ varietalFilters: filters }),
        toggleVarietalFilter: (key) =>
            set((state) => {
                const exists = state.varietalFilters.includes(key);
                return {
                    varietalFilters: exists
                        ? state.varietalFilters.filter((k) => k !== key)
                        : [...state.varietalFilters, key],
                };
            }),

        cupScoreRange: outOfBoundsCupScore,
        setCupScoreRange: (range) => set({ cupScoreRange: range }),

        selectedWeight: "250",
        setSelectedWeight: (weight) => set({ selectedWeight: weight }),

        selectedView: "list",
        setSelectedView: (view) => set({ selectedView: view }),

        sortedBy: "price_low",
        setSortedBy: (sort) => set({ sortedBy: sort }),

        hydrate: (params) => {
            const { q, sort_by, cup_score_min, cup_score_max, ...rest } = params;

            const cupScoreRange: [number, number] = [
                cup_score_min != null ? Number(cup_score_min) : outOfBoundsCupScore[0],
                cup_score_max != null ? Number(cup_score_max) : outOfBoundsCupScore[1],
            ];

            set({
                query: q ?? get().query,
                sortedBy: sort_by ?? get().sortedBy,
                filters: useHydrateFilters(params),
                cupScoreRange,
            });
        },

        clearAllFilters: () => {
            set({
                filters: initialFilters,
                cupScoreRange: outOfBoundsCupScore,
            });
        }
    }),
    shallow
);
