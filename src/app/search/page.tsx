// app/search/page.tsx
import { getSearchResults } from '@/lib/queries/products/getSearchResults';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import SearchPageClient from '@/components/search/SearchPageClient';
import { parseQueryParams } from '@/utils/navigation/serializeQueryParams';
import type { RawQueryParams } from '@/types/search';

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<RawQueryParams>;
}) {

    const parsedParams = parseQueryParams(await searchParams);
    const plainParsedParams = JSON.parse(JSON.stringify(parsedParams));
    const queryClient = new QueryClient();

    // Prefetch with the same cache key
    await queryClient.prefetchInfiniteQuery({
        queryKey: ['search', plainParsedParams],
        queryFn: ({ pageParam = 1 }) => getSearchResults({ ...plainParsedParams, page: pageParam }),
        initialPageParam: 1,
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <SearchPageClient
            dehydratedState={dehydratedState}
            queryParams={plainParsedParams}
        />
    );
}
