// stores/useSearchStore.ts
import { create } from 'zustand';

export type WeightOption = "250" | "1000";
export type ViewMode = "grid" | "list";
export type SortOption = "price_low" | "price_high" | "cup_score_high";

type SearchState = {
    isSearchOpen: boolean;
    query: string;
    filters: Record<string, string>; // or a custom type
    openSearch: () => void;
    closeSearch: () => void;
    toggleSearch: () => void;
    setQuery: (q: string) => void;
    setFilters: (filters: Record<string, string>) => void;

    selectedWeight: WeightOption;
    setSelectedWeight: (weight: WeightOption) => void;

    selectedView: ViewMode;
    setSelectedView: (view: ViewMode) => void;

    sortedBy: SortOption;
    setSortedBy: (sort: SortOption) => void;

};

export const useSearchStore = create<SearchState>((set) => ({
    isSearchOpen: false,
    query: '',
    filters: {
        is_organic: "",
        is_decaf: "",
        is_mycotoxin_free: "",
        is_single_origin: "",
    },
    openSearch: () => set({ isSearchOpen: true }),
    closeSearch: () => set({ isSearchOpen: false }),
    toggleSearch: () => set((s) => ({ isSearchOpen: !s.isSearchOpen })),
    setQuery: (query) => set({ query }),
    setFilters: (filters) => set({ filters }),

    selectedWeight: "250",
    setSelectedWeight: (weight) => set({ selectedWeight: weight }),

    selectedView: "list",
    setSelectedView: (view) => set({ selectedView: view }),

    sortedBy: "price_low",
    setSortedBy: (sort) => set({ sortedBy: sort }),


}));
