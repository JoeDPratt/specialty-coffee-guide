// app/search/page.tsx
import { getSearchResults } from '@/lib/queries/products/getSearchResults';
import { getDefaultFilterOptions } from "@/lib/queries/products/getDefaultFilterOptions";
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

    await Promise.all([
        (async () => {
            try {
                const result = await getSearchResults({ ...plainParams, page: 1, page_size: plainParams.page_size ?? 24 });
                await queryClient.prefetchQuery({
                    queryKey: ['search', { ...plainParams, page: 1, page_size: plainParams.page_size ?? 24 }],
                    queryFn: () => Promise.resolve(result),
                });
            } catch (err) {
                console.error("Failed to load search results:", err);
            }
        })(),

        (async () => {
            try {
                const result = await getDefaultFilterOptions();
                await queryClient.prefetchQuery({
                    queryKey: ["default-filter-options"],
                    queryFn: () => Promise.resolve(result),
                });
            } catch (err) {
                console.error("Failed to load default filter options:", err);
            }
        })(),
    ]);

    const dehydratedState = dehydrate(queryClient);

    return (
        <SearchPageClient
            dehydratedState={dehydratedState}
            queryParams={plainParams}
        />
    );
}
