// stores/usePaginationStore.ts
import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import { SearchQueryParams } from '@/types/search';
import { DEFAULT_PAGE_SIZE } from '@/consts/paginationConfig';

interface PaginationState {
    page: number;
    pageSize: number;
    setPage: (page: number) => void;
    setPageSize: (size: number) => void;
    resetPagination: () => void;
    hydrate: (params: SearchQueryParams) => void;
}

export const usePaginationStore = createWithEqualityFn<PaginationState>()(
    (set, get) => ({
        page: 1,
        pageSize: DEFAULT_PAGE_SIZE,
        setPage: (page) => set({ page }),
        setPageSize: (size) => set({ pageSize: size }),
        resetPagination: () => set({ page: 1 }),

        hydrate: ({ page, page_size }) => {
            set((state) => ({
                page: page ?? state.page,
                pageSize: page_size ?? state.pageSize,
            }));
        },
    }),
    shallow
);
