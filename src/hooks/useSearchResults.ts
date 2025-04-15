// hooks/useSearchResults.ts
import { useQuery } from '@tanstack/react-query';
import { fetchSearchResults } from '@/lib/fetchers/products';
import type { ProductCard } from '@/types/product';
import { SearchQueryParams } from '@/types/search';

export function useSearchResults(queryParams: SearchQueryParams) {
    return useQuery<ProductCard[]>({
        queryKey: ['search', queryParams],
        queryFn: () => fetchSearchResults(queryParams),
        enabled: !!queryParams.q || Object.values(queryParams).some(Boolean),
    });
}
