// hooks/useHydrateSearchStores.ts
import { useEffect } from 'react';
import { useSearchStore } from '@/stores/useSearchStore';
import { usePaginationStore } from '@/stores/usePaginationStore';
import type { SearchQueryParams } from '@/types/search';

export function useHydrateSearchStores(queryParams: SearchQueryParams) {
    useEffect(() => {
        const search = useSearchStore.getState();
        const paging = usePaginationStore.getState();
        search.hydrate(queryParams);
        paging.hydrate(queryParams);
    }, [queryParams]);
}
