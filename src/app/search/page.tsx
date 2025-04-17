import { getSearchResults } from '@/lib/queries/products/getSearchResults';
import { QueryClient } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/react-query';
import SearchPage from '@/components/search/SearchPage'; // A client component for rendering
import { parseQueryParams } from '@/utils/navigation/serializeQueryParams';
import type { SearchQueryParams, RawQueryParams } from '@/types/search';

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<RawQueryParams>;
}) {
    const raw: RawQueryParams = await searchParams;
    const parsedParams: SearchQueryParams = parseQueryParams(raw);

    const queryClient = new QueryClient();
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
