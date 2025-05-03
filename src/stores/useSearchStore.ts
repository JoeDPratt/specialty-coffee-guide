// stores/useSearchStore.ts
import { FilterKey, filterConfig } from '@/consts/filterConfig';
import { create } from 'zustand';

export type WeightOption = "250" | "1000";
export type ViewMode = "grid" | "list";
export type SortOption = "price_low" | "price_high" | "cup_score_high";

type SearchState = {
    isSearchOpen: boolean;
    query: string;

    openSearch: () => void;
    closeSearch: () => void;
    toggleSearch: () => void;
    setQuery: (q: string) => void;

    totalResults: number;
    setTotalResults: (results: number) => void;

    filters: Record<FilterKey, boolean>; // or a custom type
    setFilters: (filters: Record<FilterKey, boolean>) => void;

    selectedWeight: WeightOption;
    setSelectedWeight: (weight: WeightOption) => void;

    selectedView: ViewMode;
    setSelectedView: (view: ViewMode) => void;

    sortedBy: SortOption;
    setSortedBy: (sort: SortOption) => void;

};

const initialFilters = Object.keys(filterConfig).reduce((acc, key) => {
    acc[key as FilterKey] = false;
    return acc;
}, {} as Record<FilterKey, boolean>);

export const useSearchStore = create<SearchState>((set) => ({
    isSearchOpen: false,
    query: '',

    openSearch: () => set({ isSearchOpen: true }),
    closeSearch: () => set({ isSearchOpen: false }),
    toggleSearch: () => set((s) => ({ isSearchOpen: !s.isSearchOpen })),
    setQuery: (query) => set({ query }),

    totalResults: 0,
    setTotalResults: (results) => set({ totalResults: results }),

    filters: initialFilters,
    setFilters: (filters) => set({ filters }),

    selectedWeight: "250",
    setSelectedWeight: (weight) => set({ selectedWeight: weight }),

    selectedView: "list",
    setSelectedView: (view) => set({ selectedView: view }),

    sortedBy: "price_low",
    setSortedBy: (sort) => set({ sortedBy: sort }),


}));
