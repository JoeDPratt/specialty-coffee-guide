// stores/usePaginationStore.ts
import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';

interface PaginationState {
    page: number;
    pageSize: number;
    setPage: (page: number) => void;
    setPageSize: (size: number) => void;
    resetPagination: () => void;
}

export const usePaginationStore = createWithEqualityFn<PaginationState>()(
    (set) => ({
        page: 1,
        pageSize: 24,
        setPage: (page) => set({ page }),
        setPageSize: (size) => set({ pageSize: size }),
        resetPagination: () => set({ page: 1 }),
    }),
    shallow
);
