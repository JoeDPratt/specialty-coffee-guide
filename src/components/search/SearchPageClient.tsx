// components/search/SearchPageClient.tsx
'use client';

import { HydrationBoundary } from '@tanstack/react-query';
import SearchResults from '@/components/search/SearchResults';
import type { SearchQueryParams } from '@/types/search';
import { cn } from '@/utils/classes/merge';
import SearchFilterMenu from '@/components/search/SearchFilterMenu';
import { useHydrateSearchStores } from '@/hooks/useHydrateSearchStores';
import SearchViewMenu from './SearchViewMenu';

export default function SearchPageClient({
    dehydratedState,
    queryParams
}: {
    dehydratedState: unknown;
    queryParams: SearchQueryParams;
}) {
    console.count("SearchResults render");
    // hydrate the stores with the query params
    useHydrateSearchStores(queryParams);

    return (
        <HydrationBoundary state={dehydratedState}>
            <div className={cn(
                "flex flex-col gap-3 p-0 my-0 max-w-[1920px] mx-auto overflow-hidden h-full",
                "sm:gap-6",
                "lg:flex-row flex-nowrap lg:gap-0")
            } >
                <SearchFilterMenu className="lg:pt-8" />
                <div className="@container/grid flex flex-col flex-1 min-h-0">
                    <SearchViewMenu />
                    <SearchResults className="relative flex-1 min-h-0 shadow-[inset_0_2px_5px_rgba(0,0,0,0.02)]" />
                </div>
            </div>
        </HydrationBoundary>
    );
}
