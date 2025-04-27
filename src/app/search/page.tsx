// app/search/page.tsx
import { getSearchResults } from '@/lib/queries/products/getSearchResults';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import SearchPageClient from '@/components/search/SearchPageClient';
import { parseQueryParams } from '@/utils/navigation/serializeQueryParams';
import type { RawQueryParams, SearchQueryParams, SearchResultsResponse } from '@/types/search';

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<RawQueryParams>;
}) {
    const parsedParams = parseQueryParams(await searchParams);
    const plainParams = JSON.parse(JSON.stringify(parsedParams));
    const queryClient = new QueryClient();

    // Prefetch page 1
    await queryClient.prefetchQuery<
        SearchResultsResponse,
        Error,
        SearchResultsResponse,
        readonly ['search', SearchQueryParams]
    >({
        queryKey: ['search', { ...plainParams, page: 1, page_size: plainParams.page_size ?? 24 }] as const,
        queryFn: () => getSearchResults({ ...plainParams, page: 1 }),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <SearchPageClient
            dehydratedState={dehydratedState}
            queryParams={plainParams}
        />
    );
}
