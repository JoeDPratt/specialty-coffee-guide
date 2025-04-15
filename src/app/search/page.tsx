import { getSearchResults } from '@/lib/queries/products/getSearchResults';
import { QueryClient } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/react-query';
import SearchPage from '@/components/search/SearchPage'; // A client component for rendering
import { parseQueryParams } from '@/utils/navigation/serializeQueryParams';
import type { SearchQueryParams } from '@/types/search';

export default async function Page({
    searchParams,
}: {
    searchParams: {
        q?: string;
        is_organic?: string;
        is_decaf?: string;
        is_mycotoxin_free?: string;
        is_single_origin?: string;
    };
}) {
    const queryClient = new QueryClient();

    const parsedParams: SearchQueryParams = parseQueryParams(searchParams);

    // Prefetch with the same cache key
    await queryClient.prefetchQuery({
        queryKey: ['search', parsedParams],
        queryFn: () => getSearchResults(parsedParams),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <SearchPage dehydratedState={dehydratedState} queryParams={parsedParams} />
    );
}
