import { create } from 'zustand';

interface PaginationState {
    page: number;
    pageSize: number;
    setPage: (page: number) => void;
    setPageSize: (size: number) => void;
    resetPagination: () => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
    page: 1,
    pageSize: 4, // or whatever your default is
    setPage: (page) => set({ page }),
    setPageSize: (size) => set({ pageSize: size }),
    resetPagination: () => set({ page: 1 }),
}));
