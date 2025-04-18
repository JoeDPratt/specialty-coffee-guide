// stores/useSearchStore.ts
import { create } from 'zustand';

type SearchState = {
    isSearchOpen: boolean;
    query: string;
    filters: Record<string, string>; // or a custom type
    openSearch: () => void;
    closeSearch: () => void;
    toggleSearch: () => void;
    setQuery: (q: string) => void;
    setFilters: (filters: Record<string, string>) => void;
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
}));
